import { strict as assert } from "node:assert"
import { test } from "node:test"

import { normalize, scoreEntry, searchEntries, tokenize } from "./search.js"

/** @type {import("./search.js").SearchEntry[]} */
const fixtures = [
  {
    id: "fondo-emprender-turismo",
    kind: "program",
    title: "Fondo Emprender Turismo",
    subtitle: "Impulsando el turismo sostenible en La Guajira",
    keywords: ["financiación", "jóvenes", "no reembolsable"],
  },
  {
    id: "escuela-turismo-wayuu",
    kind: "program",
    title: "Escuela de Turismo Wayuu",
    subtitle: "Formación en turismo cultural",
    keywords: ["formación", "beca", "wayuu"],
  },
  {
    id: "microcreditos-bancoldex",
    kind: "opportunity",
    title: "Microcréditos Bancóldex para Turismo",
    subtitle: "Créditos blandos para emprendimientos turísticos",
    keywords: ["crédito", "pyme", "bancoldex"],
  },
  {
    id: "wayuu-desert-tours",
    kind: "business",
    title: "Wayuu Desert Tours",
    subtitle: "Turismo Cultural — Uribia, La Guajira",
    keywords: ["uribia", "cultural", "ranchería"],
  },
  {
    id: "join",
    kind: "page",
    title: "Únete a la comunidad",
    keywords: ["registro", "comunidad"],
  },
]

test("normalize strips accents and lowercases", () => {
  assert.equal(normalize("Microcréditos"), "microcreditos")
  assert.equal(normalize("La Guajira"), "la guajira")
  assert.equal(normalize("  FORMACIÓN  "), "formacion")
  assert.equal(normalize(""), "")
  // @ts-expect-error deliberately passing undefined
  assert.equal(normalize(undefined), "")
})

test("tokenize splits on whitespace and removes empties", () => {
  assert.deepEqual(tokenize("fondo   emprender"), ["fondo", "emprender"])
  assert.deepEqual(tokenize(""), [])
  assert.deepEqual(tokenize("  "), [])
  assert.deepEqual(tokenize("MICROCRÉDITOS"), ["microcreditos"])
})

test("scoreEntry ranks a title prefix higher than a keyword match", () => {
  const entry = fixtures[0]
  const prefix = scoreEntry(entry, "Fondo")
  const keyword = scoreEntry(entry, "jóvenes")
  const subtitle = scoreEntry(entry, "sostenible")

  assert.ok(prefix > keyword, "title prefix should outrank keyword match")
  assert.ok(keyword > subtitle, "keyword match should outrank subtitle match")
})

test("scoreEntry ignores accents on both sides", () => {
  const entry = fixtures[2]
  assert.ok(scoreEntry(entry, "microcreditos") > 0)
  assert.ok(scoreEntry(entry, "MICROCRÉDITOS") > 0)
  assert.ok(scoreEntry(entry, "bancoldex") > 0)
  assert.ok(scoreEntry(entry, "BANCÓLDEX") > 0)
})

test("scoreEntry returns 1 for an empty query (featured default)", () => {
  assert.equal(scoreEntry(fixtures[0], ""), 1)
  assert.equal(scoreEntry(fixtures[0], "   "), 1)
})

test("scoreEntry supports multi-token queries across fields", () => {
  // "wayuu uribia" touches the title AND a keyword — should still match.
  const entry = fixtures[3]
  assert.ok(scoreEntry(entry, "wayuu uribia") > 0)
  // A token that doesn't appear anywhere should drop the match to 0.
  assert.equal(scoreEntry(entry, "wayuu parís"), 0)
})

test("scoreEntry rejects queries with no substring match anywhere", () => {
  assert.equal(scoreEntry(fixtures[0], "cafetería"), 0)
  assert.equal(scoreEntry(fixtures[4], "zzz"), 0)
})

test("searchEntries groups hits by kind and respects the per-kind cap", () => {
  const grouped = searchEntries(fixtures, "turismo", 2)
  const programs = grouped.get("program") ?? []
  const opportunities = grouped.get("opportunity") ?? []
  const businesses = grouped.get("business") ?? []

  // Both programs have "Turismo" in the title.
  assert.equal(programs.length, 2)
  // The microcrédito opportunity subtitle says "turísticos".
  assert.equal(opportunities.length, 1)
  // Wayuu Desert Tours' subtitle matches "turismo cultural".
  assert.equal(businesses.length, 1)
})

test("searchEntries returns nothing for queries that miss everything", () => {
  const grouped = searchEntries(fixtures, "berlin")
  assert.equal(grouped.size, 0)
})

test("searchEntries returns a featured default when the query is empty", () => {
  const grouped = searchEntries(fixtures, "", 1)
  // Each kind gets exactly one featured entry.
  assert.deepEqual(
    Array.from(grouped.keys()).sort(),
    ["business", "opportunity", "page", "program"],
  )
  for (const [, bucket] of grouped) {
    assert.equal(bucket.length, 1)
  }
})

test("searchEntries orders title matches ahead of subtitle matches", () => {
  const grouped = searchEntries(fixtures, "wayuu")
  const programs = grouped.get("program") ?? []
  // "Escuela de Turismo Wayuu" has "wayuu" in the title. Others only via
  // keywords. Title match should rank first.
  assert.equal(programs[0]?.id, "escuela-turismo-wayuu")
})
