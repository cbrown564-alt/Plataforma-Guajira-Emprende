import { strict as assert } from "node:assert"
import { test } from "node:test"

import {
  compareDeadlineUrgency,
  daysBetween,
  formatSpanishDate,
  getDeadlineStatus,
  isPermanent,
  parseSpanishDate,
} from "./deadlines.js"

// Fixed "now" for deterministic tests.
const NOW = new Date(2025, 2, 1) // 1 March 2025

test("isPermanent recognises the Spanish open-deadline markers", () => {
  assert.equal(isPermanent("Convocatoria Abierta"), true)
  assert.equal(isPermanent("  convocatoria abierta  "), true)
  assert.equal(isPermanent("Permanente"), true)
  assert.equal(isPermanent("Siempre abierta"), true)
  assert.equal(isPermanent("Abierta"), true)
  assert.equal(isPermanent("15 Mar 2024"), false)
  assert.equal(isPermanent(""), false)
  assert.equal(isPermanent(null), false)
  assert.equal(isPermanent(undefined), false)
})

test("parseSpanishDate handles the abbreviated Spanish format used in content", () => {
  const d = parseSpanishDate("15 Mar 2024")
  assert.ok(d instanceof Date)
  assert.equal(d.getFullYear(), 2024)
  assert.equal(d.getMonth(), 2)
  assert.equal(d.getDate(), 15)
})

test("parseSpanishDate covers every month abbreviation", () => {
  const cases = [
    ["1 Ene 2025", 0],
    ["1 Feb 2025", 1],
    ["1 Mar 2025", 2],
    ["1 Abr 2025", 3],
    ["1 May 2025", 4],
    ["1 Jun 2025", 5],
    ["1 Jul 2025", 6],
    ["1 Ago 2025", 7],
    ["1 Sep 2025", 8],
    ["1 Oct 2025", 9],
    ["1 Nov 2025", 10],
    ["1 Dic 2025", 11],
  ]
  for (const [input, expectedMonth] of cases) {
    const d = parseSpanishDate(input)
    assert.ok(d, `expected to parse ${input}`)
    assert.equal(d.getMonth(), expectedMonth, input)
  }
})

test("parseSpanishDate accepts long-form and ISO variants", () => {
  const long = parseSpanishDate("5 de marzo de 2024")
  assert.equal(long?.getDate(), 5)
  assert.equal(long?.getMonth(), 2)
  assert.equal(long?.getFullYear(), 2024)

  const iso = parseSpanishDate("2024-09-07")
  assert.equal(iso?.getDate(), 7)
  assert.equal(iso?.getMonth(), 8)
  assert.equal(iso?.getFullYear(), 2024)

  const slash = parseSpanishDate("30/01/2024")
  assert.equal(slash?.getDate(), 30)
  assert.equal(slash?.getMonth(), 0)
  assert.equal(slash?.getFullYear(), 2024)
})

test("parseSpanishDate returns null for permanent or unparseable input", () => {
  assert.equal(parseSpanishDate("Convocatoria Abierta"), null)
  assert.equal(parseSpanishDate(""), null)
  assert.equal(parseSpanishDate("próximamente"), null)
  assert.equal(parseSpanishDate("31 Feb 2024"), null) // not a real date
  assert.equal(parseSpanishDate(null), null)
})

test("formatSpanishDate emits the canonical badge format", () => {
  assert.equal(formatSpanishDate(new Date(2024, 2, 15)), "15 Mar 2024")
  assert.equal(formatSpanishDate(new Date(2025, 0, 1)), "1 Ene 2025")
})

test("daysBetween ignores hours and uses local midnight", () => {
  const now = new Date(2025, 2, 1, 23, 30)
  assert.equal(daysBetween(new Date(2025, 2, 1, 0, 1), now), 0)
  assert.equal(daysBetween(new Date(2025, 2, 2, 0, 1), now), 1)
  assert.equal(daysBetween(new Date(2025, 1, 28, 23, 59), now), -1)
  assert.equal(daysBetween(new Date(2025, 3, 1, 0, 0), now), 31)
})

test("getDeadlineStatus returns permanent for always-open markers", () => {
  const status = getDeadlineStatus("Convocatoria Abierta", NOW)
  assert.equal(status.kind, "permanent")
  assert.equal(status.daysLeft, null)
  assert.equal(status.tone, "turquoise")
  assert.equal(status.statusWord, "Abierta")
})

test("getDeadlineStatus grades active deadlines across tiers", () => {
  const openStatus = getDeadlineStatus("1 Jun 2025", NOW) // 92 days
  assert.equal(openStatus.kind, "open")
  assert.equal(openStatus.tone, "green")
  assert.ok(openStatus.daysLeft !== null && openStatus.daysLeft > 30)

  const soon = getDeadlineStatus("20 Mar 2025", NOW) // 19 days
  assert.equal(soon.kind, "closing-soon")
  assert.equal(soon.tone, "amber")
  assert.equal(soon.daysLeft, 19)

  const urgent = getDeadlineStatus("5 Mar 2025", NOW) // 4 days
  assert.equal(urgent.kind, "urgent")
  assert.equal(urgent.tone, "orange")
  assert.equal(urgent.daysLeft, 4)

  const tomorrow = getDeadlineStatus("2 Mar 2025", NOW) // 1 day
  assert.equal(tomorrow.kind, "last-day")
  assert.equal(tomorrow.label, "Cierra mañana")
  assert.equal(tomorrow.tone, "red")

  const today = getDeadlineStatus("1 Mar 2025", NOW) // 0 days
  assert.equal(today.kind, "last-day")
  assert.equal(today.label, "Cierra hoy")
  assert.equal(today.tone, "red")
})

test("getDeadlineStatus marks expired dates as closed, not active", () => {
  const status = getDeadlineStatus("15 Mar 2024", NOW)
  assert.equal(status.kind, "closed")
  assert.equal(status.tone, "gray")
  assert.equal(status.statusWord, "Cerrado")
  assert.ok((status.daysLeft ?? 0) < 0)
  assert.match(status.longLabel, /15 Mar 2024/)
})

test("getDeadlineStatus falls back cleanly on unparseable input", () => {
  const status = getDeadlineStatus("fecha por anunciar", NOW)
  assert.equal(status.kind, "unknown")
  assert.equal(status.tone, "gray")
  assert.equal(status.dateLabel, "fecha por anunciar")
})

test("compareDeadlineUrgency ranks the most actionable items first", () => {
  const today = getDeadlineStatus("1 Mar 2025", NOW)
  const urgent = getDeadlineStatus("5 Mar 2025", NOW)
  const soon = getDeadlineStatus("20 Mar 2025", NOW)
  const open = getDeadlineStatus("1 Jun 2025", NOW)
  const permanent = getDeadlineStatus("Convocatoria Abierta", NOW)
  const closed = getDeadlineStatus("1 Feb 2025", NOW)

  const sorted = [closed, permanent, open, soon, urgent, today]
    .slice()
    .sort(compareDeadlineUrgency)

  assert.deepEqual(
    sorted.map((s) => s.kind),
    ["last-day", "urgent", "closing-soon", "open", "permanent", "closed"],
  )
})
