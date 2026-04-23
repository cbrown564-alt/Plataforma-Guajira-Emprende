/**
 * TypeScript declarations for lib/deadlines.js.
 *
 * The implementation is kept in plain JavaScript so it can be unit-tested
 * directly with `node --test` without a build step or extra tooling.
 */

export type DeadlineKind =
  | "permanent"
  | "open"
  | "closing-soon"
  | "urgent"
  | "last-day"
  | "closed"
  | "unknown"

export type DeadlineTone =
  | "turquoise"
  | "green"
  | "amber"
  | "orange"
  | "red"
  | "gray"

export interface DeadlineStatus {
  kind: DeadlineKind
  daysLeft: number | null
  date: Date | null
  raw: string
  dateLabel: string
  label: string
  longLabel: string
  statusWord: string
  tone: DeadlineTone
  sortKey: number
}

export function isPermanent(raw: string | null | undefined): boolean
export function parseSpanishDate(raw: string | null | undefined): Date | null
export function formatSpanishDate(date: Date): string
export function daysBetween(deadline: Date, now: Date): number
export function getDeadlineStatus(
  raw: string | null | undefined,
  now?: Date,
): DeadlineStatus
export function compareDeadlineUrgency(
  a: DeadlineStatus,
  b: DeadlineStatus,
): number
