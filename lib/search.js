// @ts-check
/**
 * Pure, dependency-free ranking for the site-wide command-palette search.
 *
 * The platform holds ~25 distinct records (programs, opportunities, business
 * directory entries, plus a handful of top-level pages and quick actions).
 * The search index is small enough to live in memory on the client, so we can
 * deliver instant fuzzy search without any server round-trip.
 *
 * Kept as plain JS + JSDoc so the scoring rules can be unit-tested directly
 * with `node --test` — matching the convention used by `lib/deadlines.js`.
 */

/**
 * @typedef {"program" | "opportunity" | "business" | "page" | "action"} SearchEntryKind
 *
 * @typedef {Object} SearchEntry
 * @property {string} id                Stable, unique within the index.
 * @property {SearchEntryKind} kind     Determines grouping in the palette.
 * @property {string} title             Primary label shown first.
 * @property {string} [subtitle]        Secondary line (program type, location, description).
 * @property {string[]} [keywords]      Extra tokens boosting recall (e.g. tags, municipality).
 * @property {string} [meta]            Right-aligned hint (e.g. "Cierra 30 Jun", "Hospedaje").
 * @property {string} [href]            Internal route. Mutually exclusive with `action`.
 * @property {string} [action]          Named action ID handled by the component.
 */

/**
 * Normalize a string for accent-insensitive, case-insensitive matching.
 * La Guajira content is written in Spanish (tildes, eñes). Without this,
 * typing "microcreditos" or "gastronomia" would miss the tilde variants.
 *
 * @param {string} input
 * @returns {string}
 */
export function normalize(input) {
  if (!input) return ""
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
}

/**
 * Split a query into non-empty whitespace-separated tokens.
 *
 * @param {string} query
 * @returns {string[]}
 */
export function tokenize(query) {
  return normalize(query).split(/\s+/).filter(Boolean)
}

/**
 * Score a single entry against a user query.
 *
 * Higher score = better match. A score of 0 means the entry should not
 * appear in results. Returns 1 for an empty query so callers can use the
 * same function to render a default "empty state" list.
 *
 * Ranking rationale:
 *   - Title is the strongest signal (verbatim match → top of the list).
 *   - Keywords are curated per entry and deliberately redundant.
 *   - Subtitles carry descriptive prose, so they match last.
 *   - Multi-token queries require every token to appear somewhere, letting
 *     users narrow with phrases like "fondo jovenes" or "uribia wayuu".
 *
 * @param {SearchEntry} entry
 * @param {string} query
 * @returns {number}
 */
export function scoreEntry(entry, query) {
  const q = normalize(query)
  if (!q) return 1

  const title = normalize(entry.title)
  const subtitle = normalize(entry.subtitle ?? "")
  const keywords = (entry.keywords ?? []).map(normalize)

  if (title === q) return 200
  if (title.startsWith(q)) return 140
  if (title.includes(` ${q}`)) return 110
  if (title.includes(q)) return 100
  if (keywords.some((k) => k === q)) return 90
  if (keywords.some((k) => k.startsWith(q))) return 70
  if (keywords.some((k) => k.includes(q))) return 50
  if (subtitle.includes(q)) return 25

  const tokens = q.split(/\s+/).filter(Boolean)
  if (tokens.length > 1) {
    const haystack = normalize(
      `${entry.title} ${entry.subtitle ?? ""} ${keywords.join(" ")}`,
    )
    if (tokens.every((t) => haystack.includes(t))) return 15
  }
  return 0
}

/**
 * Rank a query against every entry and group the results by kind.
 *
 * Preserves a stable per-kind cap so one category can't monopolise the
 * results list. Empty queries return a curated "featured" slice: the first
 * `limitPerKind` entries in the source order, which lets callers surface a
 * useful default state without a separate code path.
 *
 * @param {SearchEntry[]} entries
 * @param {string} query
 * @param {number} [limitPerKind=6]
 * @returns {Map<SearchEntryKind, SearchEntry[]>}
 */
export function searchEntries(entries, query, limitPerKind = 6) {
  const q = normalize(query)
  /** @type {Map<SearchEntryKind, SearchEntry[]>} */
  const byKind = new Map()

  if (!q) {
    for (const entry of entries) {
      const bucket = byKind.get(entry.kind) ?? []
      if (bucket.length < limitPerKind) {
        bucket.push(entry)
        byKind.set(entry.kind, bucket)
      }
    }
    return byKind
  }

  const scored = entries
    .map((entry) => ({ entry, score: scoreEntry(entry, query) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)

  for (const { entry } of scored) {
    const bucket = byKind.get(entry.kind) ?? []
    if (bucket.length < limitPerKind) {
      bucket.push(entry)
      byKind.set(entry.kind, bucket)
    }
  }
  return byKind
}
