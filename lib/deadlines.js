// @ts-check
/**
 * Pure, dependency-free deadline parsing and status derivation for
 * Plataforma Guajira Emprende.
 *
 * Data in this codebase stores deadlines as free-form Spanish strings
 * ("15 Mar 2024", "Convocatoria Abierta", "Permanente"). The UI previously
 * rendered them as static text alongside a hard-coded "Activo" badge, which
 * meant expired opportunities still appeared open. This module turns those
 * strings into a live status so every card, finder result, and detail page
 * reflects the actual state on the day the user visits.
 *
 * Written as plain JS + JSDoc so it can be unit-tested directly with
 * `node --test` (no build step, no extra dependencies).
 */

/**
 * @typedef {"permanent" | "open" | "closing-soon" | "urgent" | "last-day" | "closed" | "unknown"} DeadlineKind
 * @typedef {"turquoise" | "green" | "amber" | "orange" | "red" | "gray"} DeadlineTone
 *
 * @typedef {Object} DeadlineStatus
 * @property {DeadlineKind} kind
 * @property {number|null} daysLeft   Negative when closed. Null for permanent/unknown.
 * @property {Date|null} date         Parsed date, or null when none.
 * @property {string} raw             Original string, untouched.
 * @property {string} dateLabel       Pretty formatted date ("15 Mar 2024") or original fallback.
 * @property {string} label           Short label for badges ("Cierra en 5 días").
 * @property {string} longLabel       Full sentence for aria / detail ("Cierra en 5 días, el 15 Mar 2024").
 * @property {string} statusWord      Single-word status suited for small pills ("Abierto", "Cerrado"...).
 * @property {DeadlineTone} tone      Semantic color key; components map this to tailwind classes.
 * @property {number} sortKey         Ascending = more urgent/actionable, so consumers can tie-break sorts.
 */

const MONTHS_ES = {
  ene: 0, enero: 0,
  feb: 1, febrero: 1,
  mar: 2, marzo: 2,
  abr: 3, abril: 3,
  may: 4, mayo: 4,
  jun: 5, junio: 5,
  jul: 6, julio: 6,
  ago: 7, agosto: 7,
  sep: 8, sept: 8, septiembre: 8,
  oct: 9, octubre: 9,
  nov: 10, noviembre: 10,
  dic: 11, diciembre: 11,
}

const MONTH_LABELS_ES = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
]

const PERMANENT_PATTERNS = [
  /convocatoria\s+abierta/i,
  /^permanente$/i,
  /siempre\s+abierta/i,
  /^abierta$/i,
]

const MS_PER_DAY = 86_400_000

/**
 * Check if a deadline string represents an always-open opportunity.
 * @param {string | null | undefined} raw
 * @returns {boolean}
 */
export function isPermanent(raw) {
  if (!raw) return false
  const trimmed = String(raw).trim()
  if (!trimmed) return false
  return PERMANENT_PATTERNS.some((re) => re.test(trimmed))
}

/**
 * Parse Spanish short-date strings like:
 *   "15 Mar 2024", "5 de marzo de 2024", "1 ene 2025", "30/01/2024", "2024-03-15"
 * Returns null on unrecognized input or permanent markers.
 *
 * @param {string | null | undefined} raw
 * @returns {Date | null}
 */
export function parseSpanishDate(raw) {
  if (!raw) return null
  const trimmed = String(raw).trim()
  if (!trimmed || isPermanent(trimmed)) return null

  // ISO (YYYY-MM-DD)
  const iso = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(trimmed)
  if (iso) {
    const y = Number(iso[1])
    const m = Number(iso[2]) - 1
    const d = Number(iso[3])
    return buildDate(y, m, d)
  }

  // DD/MM/YYYY or DD-MM-YYYY
  const slash = /^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})$/.exec(trimmed)
  if (slash) {
    const d = Number(slash[1])
    const m = Number(slash[2]) - 1
    let y = Number(slash[3])
    if (y < 100) y += 2000
    return buildDate(y, m, d)
  }

  // Token-based: "15 Mar 2024", "5 de marzo de 2024", "1 ene 2025"
  const tokens = trimmed
    .toLowerCase()
    .replace(/\bde\b/g, " ")
    .replace(/,/g, " ")
    .split(/\s+/)
    .filter(Boolean)

  let day = null
  let month = null
  let year = null

  for (const tok of tokens) {
    if (/^\d{1,2}$/.test(tok) && day === null) {
      const n = Number(tok)
      if (n >= 1 && n <= 31) {
        day = n
        continue
      }
    }
    if (/^\d{4}$/.test(tok) && year === null) {
      year = Number(tok)
      continue
    }
    const monthKey = tok.replace(/\./g, "")
    if (month === null && Object.prototype.hasOwnProperty.call(MONTHS_ES, monthKey)) {
      month = MONTHS_ES[/** @type {keyof typeof MONTHS_ES} */ (monthKey)]
    }
  }

  if (day !== null && month !== null && year !== null) {
    return buildDate(year, month, day)
  }
  return null
}

/**
 * @param {number} y
 * @param {number} m
 * @param {number} d
 * @returns {Date | null}
 */
function buildDate(y, m, d) {
  if (Number.isNaN(y) || Number.isNaN(m) || Number.isNaN(d)) return null
  if (m < 0 || m > 11) return null
  if (d < 1 || d > 31) return null
  const date = new Date(y, m, d)
  // Guard against overflow (e.g. 31 Feb → 3 Mar).
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m ||
    date.getDate() !== d
  ) {
    return null
  }
  return date
}

/**
 * Format a parsed Date as "15 Mar 2024".
 * @param {Date} date
 * @returns {string}
 */
export function formatSpanishDate(date) {
  const d = String(date.getDate()).padStart(1, "0")
  const m = MONTH_LABELS_ES[date.getMonth()]
  const y = date.getFullYear()
  return `${d} ${m} ${y}`
}

/**
 * Number of whole calendar days between `now` and `deadline` (end-of-day inclusive).
 * A deadline today returns 0; tomorrow returns 1; yesterday returns -1.
 *
 * @param {Date} deadline
 * @param {Date} now
 * @returns {number}
 */
export function daysBetween(deadline, now) {
  const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
  return Math.round((startOfDay(deadline) - startOfDay(now)) / MS_PER_DAY)
}

/**
 * Derive the live status for a deadline string.
 *
 * @param {string | null | undefined} raw
 * @param {Date} [now]
 * @returns {DeadlineStatus}
 */
export function getDeadlineStatus(raw, now = new Date()) {
  const original = raw == null ? "" : String(raw).trim()

  if (isPermanent(original)) {
    return {
      kind: "permanent",
      daysLeft: null,
      date: null,
      raw: original,
      dateLabel: "Convocatoria abierta",
      label: "Siempre abierta",
      longLabel: "Convocatoria abierta todo el año",
      statusWord: "Abierta",
      tone: "turquoise",
      sortKey: 1_000, // below actionable dated entries, above closed
    }
  }

  const date = parseSpanishDate(original)
  if (!date) {
    return {
      kind: "unknown",
      daysLeft: null,
      date: null,
      raw: original,
      dateLabel: original || "Fecha por confirmar",
      label: original || "Fecha por confirmar",
      longLabel: original
        ? `Fecha de cierre: ${original}`
        : "Fecha de cierre por confirmar",
      statusWord: "Por confirmar",
      tone: "gray",
      sortKey: 2_000,
    }
  }

  const daysLeft = daysBetween(date, now)
  const dateLabel = formatSpanishDate(date)

  if (daysLeft < 0) {
    return {
      kind: "closed",
      daysLeft,
      date,
      raw: original,
      dateLabel,
      label: `Cerró el ${dateLabel}`,
      longLabel: `Esta convocatoria cerró el ${dateLabel}`,
      statusWord: "Cerrado",
      tone: "gray",
      sortKey: 9_000, // lowest priority in finder results
    }
  }

  if (daysLeft === 0) {
    return {
      kind: "last-day",
      daysLeft: 0,
      date,
      raw: original,
      dateLabel,
      label: "Cierra hoy",
      longLabel: `Último día para postular: hoy (${dateLabel})`,
      statusWord: "Último día",
      tone: "red",
      sortKey: 0,
    }
  }

  if (daysLeft === 1) {
    return {
      kind: "last-day",
      daysLeft: 1,
      date,
      raw: original,
      dateLabel,
      label: "Cierra mañana",
      longLabel: `Cierra mañana (${dateLabel})`,
      statusWord: "Último día",
      tone: "red",
      sortKey: 1,
    }
  }

  if (daysLeft <= 7) {
    return {
      kind: "urgent",
      daysLeft,
      date,
      raw: original,
      dateLabel,
      label: `Quedan ${daysLeft} días`,
      longLabel: `Cierra en ${daysLeft} días (${dateLabel})`,
      statusWord: "Urgente",
      tone: "orange",
      sortKey: daysLeft,
    }
  }

  if (daysLeft <= 30) {
    return {
      kind: "closing-soon",
      daysLeft,
      date,
      raw: original,
      dateLabel,
      label: `Cierra en ${daysLeft} días`,
      longLabel: `Cierra en ${daysLeft} días, el ${dateLabel}`,
      statusWord: "Cierra pronto",
      tone: "amber",
      sortKey: daysLeft,
    }
  }

  return {
    kind: "open",
    daysLeft,
    date,
    raw: original,
    dateLabel,
    label: `Cierra el ${dateLabel}`,
    longLabel: `Convocatoria abierta. Cierra el ${dateLabel} (${daysLeft} días restantes).`,
    statusWord: "Abierto",
    tone: "green",
    sortKey: daysLeft,
  }
}

/**
 * Comparator that orders deadline statuses from most actionable to least.
 * Suitable as a tie-break after a primary relevance/score sort.
 *
 * @param {DeadlineStatus} a
 * @param {DeadlineStatus} b
 * @returns {number}
 */
export function compareDeadlineUrgency(a, b) {
  return a.sortKey - b.sortKey
}
