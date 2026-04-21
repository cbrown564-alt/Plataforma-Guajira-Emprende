import type { LucideIcon } from "lucide-react"
import {
  BookOpen,
  Building2,
  CreditCard,
  DollarSign,
  GraduationCap,
  HandHeart,
  Heart,
  Lightbulb,
  Rocket,
  Users,
} from "lucide-react"
import type { AudienceKey, NeedKey, Program } from "./types"

export interface AudienceOption {
  key: AudienceKey
  label: string
  sublabel: string
  icon: LucideIcon
}

export interface NeedOption {
  key: NeedKey
  label: string
  sublabel: string
  icon: LucideIcon
}

export const audienceOptions: AudienceOption[] = [
  {
    key: "joven",
    label: "Joven emprendedor",
    sublabel: "18 – 28 años",
    icon: GraduationCap,
  },
  {
    key: "wayuu",
    label: "Comunidad wayuu",
    sublabel: "Miembro o ranchería",
    icon: Heart,
  },
  {
    key: "pyme",
    label: "Negocio establecido",
    sublabel: "PYME en operación",
    icon: Building2,
  },
  {
    key: "startup",
    label: "Startup tecnológica",
    sublabel: "Equipo técnico con MVP",
    icon: Lightbulb,
  },
  {
    key: "asociacion",
    label: "Asociación o cooperativa",
    sublabel: "Grupo comunitario formal",
    icon: Users,
  },
]

export const needOptions: NeedOption[] = [
  {
    key: "financiacion",
    label: "Financiación",
    sublabel: "Fondos no reembolsables",
    icon: DollarSign,
  },
  {
    key: "credito",
    label: "Crédito",
    sublabel: "Tasas preferenciales",
    icon: CreditCard,
  },
  {
    key: "formacion",
    label: "Formación",
    sublabel: "Capacitación certificada",
    icon: BookOpen,
  },
  {
    key: "mentoria",
    label: "Mentoría",
    sublabel: "Acompañamiento experto",
    icon: HandHeart,
  },
  {
    key: "aceleracion",
    label: "Acelerar o incubar",
    sublabel: "Programas intensivos",
    icon: Rocket,
  },
]

export const audienceLabelByKey: Record<AudienceKey, string> = Object.fromEntries(
  audienceOptions.map((o) => [o.key, o.label]),
) as Record<AudienceKey, string>

export const needLabelByKey: Record<NeedKey, string> = Object.fromEntries(
  needOptions.map((o) => [o.key, o.label]),
) as Record<NeedKey, string>

export interface MatchReason {
  kind: "audience" | "need"
  label: string
}

export interface ScoredProgram {
  program: Program
  score: number
  reasons: MatchReason[]
  isTopMatch: boolean
}

export interface MatchFilters {
  audience: AudienceKey | null
  need: NeedKey | null
}

const AUDIENCE_WEIGHT = 2
const NEED_WEIGHT = 2
const BOTH_MATCH_BONUS = 1

export function matchPrograms(programs: Program[], filters: MatchFilters): ScoredProgram[] {
  const { audience, need } = filters

  const scored: ScoredProgram[] = programs.map((program) => {
    let score = 0
    const reasons: MatchReason[] = []

    if (audience && program.audienceKeys?.includes(audience)) {
      score += AUDIENCE_WEIGHT
      reasons.push({ kind: "audience", label: audienceLabelByKey[audience] })
    }

    if (need && program.needKeys?.includes(need)) {
      score += NEED_WEIGHT
      reasons.push({ kind: "need", label: needLabelByKey[need] })
    }

    if (audience && need && reasons.length === 2) {
      score += BOTH_MATCH_BONUS
    }

    return { program, score, reasons, isTopMatch: false }
  })

  const ranked = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  if (ranked.length > 0) {
    const topScore = ranked[0].score
    ranked.forEach((entry) => {
      entry.isTopMatch = entry.score === topScore
    })
  }

  return ranked
}
