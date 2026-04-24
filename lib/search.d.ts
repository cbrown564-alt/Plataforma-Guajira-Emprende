/**
 * TypeScript declarations for lib/search.js.
 *
 * Kept in parallel so the command-palette components can import from the
 * plain-JS module without sacrificing editor completions or build-time
 * type checks. Mirrors the convention used by lib/deadlines.js.
 */

export type SearchEntryKind =
  | "program"
  | "opportunity"
  | "business"
  | "page"
  | "action"

export interface SearchEntry {
  id: string
  kind: SearchEntryKind
  title: string
  subtitle?: string
  keywords?: string[]
  meta?: string
  href?: string
  action?: string
}

export function normalize(input: string | null | undefined): string
export function tokenize(query: string | null | undefined): string[]
export function scoreEntry(entry: SearchEntry, query: string): number
export function searchEntries(
  entries: SearchEntry[],
  query: string,
  limitPerKind?: number,
): Map<SearchEntryKind, SearchEntry[]>
