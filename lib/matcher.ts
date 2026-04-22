import { opportunities } from "../data/opportunities.ts"
import { programs } from "../data/programs.ts"
import type { BusinessCategory, Opportunity, Program } from "../data/types.ts"

export type AgeBracket = "18-28" | "29-45" | "46+" | "unspecified"
export type Community = "wayuu" | "guajira-resident" | "other"
export type Stage = "idea" | "early" | "established" | "community-association"
export type SupportNeed = "grant" | "credit" | "training" | "mentorship" | "tech"
export type Sector = BusinessCategory | "unspecified"

export interface MatchQuery {
  age: AgeBracket
  community: Community
  stage: Stage
  needs: SupportNeed[]
  sectors: Sector[]
}

export interface MatchResult<T> {
  item: T
  score: number
  percent: number
  reasons: string[]
}

export const emptyQuery: MatchQuery = {
  age: "unspecified",
  community: "other",
  stage: "idea",
  needs: [],
  sectors: [],
}

interface MatchRule {
  ages: AgeBracket[]
  communities: Community[]
  stages: Stage[]
  needs: SupportNeed[]
  sectors: Sector[]
  highlights: Partial<Record<keyof MatchQuery, string>>
}

const ALL_AGES: AgeBracket[] = ["18-28", "29-45", "46+", "unspecified"]
const ALL_COMMUNITIES: Community[] = ["wayuu", "guajira-resident", "other"]
const ALL_STAGES: Stage[] = ["idea", "early", "established", "community-association"]
const ALL_SECTORS: Sector[] = [
  "Turismo Cultural",
  "Hospedaje",
  "Gastronomía",
  "Ecoturismo",
  "Artesanías",
  "Transporte",
  "unspecified",
]

const OPPORTUNITY_RULES: Record<string, MatchRule> = {
  "fondo-emprender-turismo-2024": {
    ages: ["18-28"],
    communities: ["guajira-resident", "wayuu"],
    stages: ["idea", "early"],
    needs: ["grant", "training", "mentorship"],
    sectors: ALL_SECTORS,
    highlights: {
      age: "Diseñado para jóvenes de 18 a 28 años",
      needs: "Entrega hasta $50M COP como fondo no reembolsable",
      stage: "Ideal para ideas y negocios con menos de 2 años",
    },
  },
  "escuela-turismo-wayuu-cohorte-2024": {
    ages: ALL_AGES,
    communities: ["wayuu", "guajira-resident"],
    stages: ["idea", "early", "community-association"],
    needs: ["training", "mentorship"],
    sectors: ["Turismo Cultural", "Artesanías", "unspecified"],
    highlights: {
      community: "Prioriza a miembros de comunidades wayuu y residentes en La Guajira",
      needs: "Formación 100% gratuita con certificación del SENA",
      sectors: "Enfocado en turismo cultural y saberes ancestrales",
    },
  },
  "microcreditos-bancoldex-turismo": {
    ages: ALL_AGES,
    communities: ALL_COMMUNITIES,
    stages: ["established", "community-association"],
    needs: ["credit", "mentorship"],
    sectors: ALL_SECTORS,
    highlights: {
      stage: "Pensado para PYMES con al menos 6 meses de operación",
      needs: "Línea de crédito preferencial con acompañamiento técnico",
    },
  },
}

const PROGRAM_RULES: Record<string, MatchRule> = {
  "fondo-emprender-turismo": {
    ages: ["18-28"],
    communities: ["guajira-resident", "wayuu"],
    stages: ["idea", "early"],
    needs: ["grant", "training", "mentorship"],
    sectors: ALL_SECTORS,
    highlights: {
      age: "Diseñado para jóvenes de 18 a 28 años",
      needs: "Combina financiación, formación y mentoría",
    },
  },
  "escuela-turismo-wayuu": {
    ages: ALL_AGES,
    communities: ["wayuu", "guajira-resident"],
    stages: ["idea", "early", "community-association"],
    needs: ["training", "mentorship"],
    sectors: ["Turismo Cultural", "Artesanías", "unspecified"],
    highlights: {
      community: "Honra la cosmovisión wayuu y los saberes ancestrales",
      needs: "Certificación gratuita con aval SENA",
    },
  },
  "microcreditos-bancoldex": {
    ages: ALL_AGES,
    communities: ALL_COMMUNITIES,
    stages: ["established", "community-association"],
    needs: ["credit", "mentorship"],
    sectors: ALL_SECTORS,
    highlights: {
      stage: "Para PYMES turísticas formales",
      needs: "Tasas subsidiadas hasta 8 puntos bajo el mercado",
    },
  },
  "incubadora-turismo": {
    ages: ["18-28", "29-45"],
    communities: ALL_COMMUNITIES,
    stages: ["early"],
    needs: ["mentorship", "grant", "tech"],
    sectors: ALL_SECTORS,
    highlights: {
      stage: "Acelera startups en etapa temprana con MVP",
      needs: "Mentoría 1:1, coworking en Riohacha y Demo Day",
    },
  },
  "innovacion-turistica": {
    ages: ["18-28", "29-45"],
    communities: ALL_COMMUNITIES,
    stages: ["idea", "early"],
    needs: ["tech", "grant", "mentorship"],
    sectors: ALL_SECTORS,
    highlights: {
      needs: "Capital semilla y laboratorio de prototipado para proyectos tecnológicos",
    },
  },
  "turismo-comunitario": {
    ages: ALL_AGES,
    communities: ["wayuu", "guajira-resident"],
    stages: ["community-association"],
    needs: ["grant", "training", "mentorship"],
    sectors: ["Turismo Cultural", "Artesanías", "Ecoturismo", "unspecified"],
    highlights: {
      community: "Apoyo directo a rancherías y asociaciones wayuu",
      stage: "Diseñado para iniciativas comunitarias del territorio",
    },
  },
}

const MAX_SCORE = 100
const WEIGHTS = {
  age: 15,
  community: 20,
  stage: 25,
  needs: 30,
  sectors: 10,
} as const

function score(rule: MatchRule, query: MatchQuery): { score: number; reasons: string[] } {
  const reasons: string[] = []
  let total = 0

  const ageMatch = query.age === "unspecified" || rule.ages.includes(query.age)
  if (ageMatch) {
    total += WEIGHTS.age
    if (rule.highlights.age && query.age !== "unspecified" && rule.ages.includes(query.age)) {
      reasons.push(rule.highlights.age)
    }
  }

  const communityMatch = rule.communities.includes(query.community)
  if (communityMatch) {
    total += WEIGHTS.community
    if (rule.highlights.community && query.community !== "other") {
      reasons.push(rule.highlights.community)
    }
  }

  const stageMatch = rule.stages.includes(query.stage)
  if (stageMatch) {
    total += WEIGHTS.stage
    if (rule.highlights.stage) reasons.push(rule.highlights.stage)
  }

  if (query.needs.length === 0) {
    total += WEIGHTS.needs / 2
  } else {
    const overlap = query.needs.filter((need) => rule.needs.includes(need)).length
    if (overlap > 0) {
      const ratio = overlap / query.needs.length
      total += Math.round(WEIGHTS.needs * ratio)
      if (rule.highlights.needs) reasons.push(rule.highlights.needs)
    }
  }

  const userSectors = query.sectors.filter((s) => s !== "unspecified")
  if (userSectors.length === 0 || query.sectors.includes("unspecified")) {
    total += WEIGHTS.sectors / 2
  } else {
    const sectorOverlap = userSectors.filter((s) => rule.sectors.includes(s)).length
    if (sectorOverlap > 0) {
      total += WEIGHTS.sectors
      if (rule.highlights.sectors) reasons.push(rule.highlights.sectors)
    }
  }

  return { score: Math.min(total, MAX_SCORE), reasons }
}

function toPercent(raw: number): number {
  return Math.round((raw / MAX_SCORE) * 100)
}

export function matchOpportunities(query: MatchQuery): MatchResult<Opportunity>[] {
  return opportunities
    .filter((o) => o.status !== "Cerrado")
    .map((item) => {
      const rule = OPPORTUNITY_RULES[item.id]
      if (!rule) return { item, score: 0, percent: 0, reasons: [] }
      const { score: raw, reasons } = score(rule, query)
      return { item, score: raw, percent: toPercent(raw), reasons }
    })
    .sort((a, b) => b.score - a.score)
}

export function matchPrograms(query: MatchQuery): MatchResult<Program>[] {
  return programs
    .map((item) => {
      const rule = PROGRAM_RULES[item.id]
      if (!rule) return { item, score: 0, percent: 0, reasons: [] }
      const { score: raw, reasons } = score(rule, query)
      return { item, score: raw, percent: toPercent(raw), reasons }
    })
    .sort((a, b) => b.score - a.score)
}

export function matchFitLabel(percent: number): string {
  if (percent >= 85) return "Excelente match"
  if (percent >= 65) return "Buen match"
  if (percent >= 45) return "Match parcial"
  return "Match débil"
}
