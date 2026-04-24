import {
  AlarmClock,
  CalendarCheck,
  CalendarClock,
  CircleCheck,
  Infinity as InfinityIcon,
  Lock,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  getDeadlineStatus,
  type DeadlineKind,
  type DeadlineStatus,
  type DeadlineTone,
} from "@/lib/deadlines"

export type DeadlineBadgeVariant = "compact" | "inline"

export interface DeadlineBadgeProps {
  deadline: string
  variant?: DeadlineBadgeVariant
  className?: string
  showDateSuffix?: boolean
}

interface ToneClasses {
  /** Background + text colors for filled pill (`compact`). */
  filled: string
  /** Foreground color for icon-only / inline uses. */
  foreground: string
  /** Dot color used on `compact` pills. */
  dot: string
  /** Border + subtle background used on the `detail` panel. */
  panelBg: string
  panelBorder: string
  panelText: string
  progressFill: string
  progressTrack: string
}

const TONE_CLASSES: Record<DeadlineTone, ToneClasses> = {
  turquoise: {
    filled: "bg-turquoise-50 text-turquoise-800 border border-turquoise-200",
    foreground: "text-turquoise-700",
    dot: "bg-turquoise-500",
    panelBg: "bg-turquoise-50",
    panelBorder: "border-turquoise-200",
    panelText: "text-turquoise-900",
    progressFill: "bg-turquoise-500",
    progressTrack: "bg-turquoise-100",
  },
  green: {
    filled: "bg-green-50 text-green-800 border border-green-200",
    foreground: "text-green-700",
    dot: "bg-green-500",
    panelBg: "bg-green-50",
    panelBorder: "border-green-200",
    panelText: "text-green-900",
    progressFill: "bg-green-500",
    progressTrack: "bg-green-100",
  },
  amber: {
    filled: "bg-amber-50 text-amber-900 border border-amber-200",
    foreground: "text-amber-700",
    dot: "bg-amber-500",
    panelBg: "bg-amber-50",
    panelBorder: "border-amber-200",
    panelText: "text-amber-900",
    progressFill: "bg-amber-500",
    progressTrack: "bg-amber-100",
  },
  orange: {
    filled: "bg-orange-50 text-orange-900 border border-orange-200",
    foreground: "text-orange-700",
    dot: "bg-orange-500",
    panelBg: "bg-orange-50",
    panelBorder: "border-orange-200",
    panelText: "text-orange-900",
    progressFill: "bg-orange-500",
    progressTrack: "bg-orange-100",
  },
  red: {
    filled: "bg-red-50 text-red-900 border border-red-200",
    foreground: "text-red-700",
    dot: "bg-red-500",
    panelBg: "bg-red-50",
    panelBorder: "border-red-200",
    panelText: "text-red-900",
    progressFill: "bg-red-500",
    progressTrack: "bg-red-100",
  },
  gray: {
    filled: "bg-gray-100 text-gray-700 border border-gray-200",
    foreground: "text-gray-500",
    dot: "bg-gray-400",
    panelBg: "bg-gray-50",
    panelBorder: "border-gray-200",
    panelText: "text-gray-700",
    progressFill: "bg-gray-400",
    progressTrack: "bg-gray-200",
  },
}

const KIND_ICONS: Record<DeadlineKind, LucideIcon> = {
  permanent: InfinityIcon,
  open: CalendarCheck,
  "closing-soon": CalendarClock,
  urgent: AlarmClock,
  "last-day": AlarmClock,
  closed: Lock,
  unknown: CalendarClock,
}

export function deadlineTone(status: DeadlineStatus): ToneClasses {
  return TONE_CLASSES[status.tone]
}

export function DeadlineBadge({
  deadline,
  variant = "compact",
  className,
  showDateSuffix = false,
}: DeadlineBadgeProps) {
  const status = getDeadlineStatus(deadline)
  const Icon = KIND_ICONS[status.kind]
  const tone = TONE_CLASSES[status.tone]
  const pulse = status.kind === "last-day"

  if (variant === "inline") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 text-xs font-medium",
          tone.foreground,
          className,
        )}
        aria-label={status.longLabel}
      >
        <Icon className={cn("h-3.5 w-3.5", pulse && "animate-pulse")} aria-hidden />
        <span>{status.label}</span>
      </span>
    )
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap",
        tone.filled,
        className,
      )}
      aria-label={status.longLabel}
    >
      <span
        className={cn("inline-block h-1.5 w-1.5 rounded-full", tone.dot, pulse && "animate-pulse")}
        aria-hidden
      />
      <Icon className="h-3.5 w-3.5" aria-hidden />
      <span>{status.label}</span>
      {showDateSuffix && status.date && status.kind !== "closed" && (
        <span className="opacity-70 font-normal">· {status.dateLabel}</span>
      )}
    </span>
  )
}

export interface DeadlinePanelProps {
  deadline: string
  resultsAt?: string
  className?: string
}

/**
 * Full-width status panel for the opportunity/program detail pages.
 * Shows the live countdown, tier label, and a progress bar across a
 * 60-day window that makes "time pressure" feel concrete.
 */
export function DeadlinePanel({ deadline, resultsAt, className }: DeadlinePanelProps) {
  const status = getDeadlineStatus(deadline)
  const Icon = KIND_ICONS[status.kind]
  const tone = TONE_CLASSES[status.tone]
  const pulse = status.kind === "last-day"

  const headline = headlineFor(status)

  // Progress bar across the last 60 days before the deadline.
  // We show remaining time as a filled bar that shrinks as the date approaches,
  // so short bars visually communicate urgency.
  const WINDOW = 60
  const daysLeft = status.daysLeft
  let progressPct: number | null = null
  if (status.kind === "permanent") {
    progressPct = 100
  } else if (daysLeft !== null && daysLeft >= 0) {
    progressPct = Math.max(3, Math.min(100, Math.round((daysLeft / WINDOW) * 100)))
  } else if (status.kind === "closed") {
    progressPct = 0
  }

  return (
    <section
      className={cn(
        "rounded-2xl border-2 p-5 lg:p-6",
        tone.panelBg,
        tone.panelBorder,
        className,
      )}
      aria-label="Estado de la convocatoria"
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-start gap-3 min-w-0">
          <div
            className={cn(
              "shrink-0 p-2.5 rounded-xl bg-white shadow-sm",
              tone.foreground,
              pulse && "animate-pulse",
            )}
          >
            <Icon className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <span
                className={cn(
                  "text-[11px] font-bold uppercase tracking-wide",
                  tone.panelText,
                )}
              >
                {status.statusWord}
              </span>
              {status.kind !== "permanent" && status.kind !== "unknown" && (
                <span className={cn("text-[11px]", tone.foreground)}>
                  · {status.dateLabel}
                </span>
              )}
            </div>
            <p className={cn("text-lg lg:text-xl font-bold leading-tight", tone.panelText)}>
              {headline}
            </p>
            <p className={cn("text-sm mt-1 leading-snug", tone.foreground)}>
              {subtextFor(status, resultsAt)}
            </p>
          </div>
        </div>
      </div>

      {progressPct !== null && (
        <div className="mt-5">
          <div
            className={cn("h-2 w-full rounded-full overflow-hidden", tone.progressTrack)}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progressPct}
            aria-label={status.longLabel}
          >
            <div
              className={cn("h-full rounded-full transition-all duration-500", tone.progressFill)}
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className={cn("flex items-center gap-1.5 text-[11px] mt-1.5", tone.foreground)}>
            <CircleCheck className="h-3 w-3" aria-hidden />
            {progressFootnoteFor(status)}
          </div>
        </div>
      )}
    </section>
  )
}

function headlineFor(status: DeadlineStatus): string {
  switch (status.kind) {
    case "permanent":
      return "Esta convocatoria está siempre abierta"
    case "open":
      return `Quedan ${status.daysLeft} días para postular`
    case "closing-soon":
      return `Quedan ${status.daysLeft} días para postular`
    case "urgent":
      return `¡Solo quedan ${status.daysLeft} días!`
    case "last-day":
      return status.daysLeft === 0 ? "Hoy es el último día" : "Mañana es el último día"
    case "closed":
      return "Esta convocatoria ya cerró"
    case "unknown":
    default:
      return "Fecha de cierre por confirmar"
  }
}

function subtextFor(status: DeadlineStatus, resultsAt?: string): string {
  if (status.kind === "permanent") {
    return "Puedes aplicar en cualquier momento del año."
  }
  if (status.kind === "closed") {
    return "Suscríbete para recibir aviso cuando se abra una nueva cohorte."
  }
  if (status.kind === "unknown") {
    return "Contáctanos para recibir la fecha exacta cuando se publique."
  }
  const base = `Postula antes del ${status.dateLabel}.`
  if (resultsAt) {
    return `${base} Resultados: ${resultsAt}.`
  }
  return base
}

function progressFootnoteFor(status: DeadlineStatus): string {
  switch (status.kind) {
    case "permanent":
      return "Sin fecha de cierre"
    case "closed":
      return "Ventana cerrada"
    case "last-day":
      return "La barra refleja el tiempo restante"
    default:
      return "Ventana estimada de 60 días antes del cierre"
  }
}
