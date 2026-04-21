import { opportunities } from "@/data/opportunities"
import { programs } from "@/data/programs"
import { businesses } from "@/data/businesses"
import type { Business, Opportunity, Program } from "@/data/types"

export type SearchResultKind = "opportunity" | "program" | "business" | "section"

export interface SearchResult {
  kind: SearchResultKind
  id: string
  title: string
  subtitle: string
  href: string
  keywords: string[]
  score: number
}

export interface SectionLink {
  id: string
  title: string
  subtitle: string
  href: string
  keywords: string[]
}

export const sectionLinks: SectionLink[] = [
  {
    id: "home",
    title: "Inicio",
    subtitle: "Volver a la página principal",
    href: "/#home",
    keywords: ["inicio", "home", "principal"],
  },
  {
    id: "opportunities",
    title: "Oportunidades",
    subtitle: "Financiación, becas y microcréditos",
    href: "/#opportunities",
    keywords: ["oportunidades", "financiación", "becas", "fondos", "microcrédito"],
  },
  {
    id: "training",
    title: "Programas de formación",
    subtitle: "Escuelas, incubadoras y cursos",
    href: "/#training",
    keywords: ["programas", "formación", "capacitación", "escuela", "curso", "incubadora"],
  },
  {
    id: "directory",
    title: "Directorio de emprendimientos",
    subtitle: "Negocios turísticos activos en La Guajira",
    href: "/#directory",
    keywords: ["directorio", "emprendimientos", "negocios", "empresas"],
  },
  {
    id: "contact",
    title: "Contacto",
    subtitle: "WhatsApp, teléfono, correo y oficinas",
    href: "/#contact",
    keywords: ["contacto", "whatsapp", "email", "correo", "oficina", "teléfono"],
  },
  {
    id: "join",
    title: "Únete a la comunidad",
    subtitle: "Regístrate como emprendedor",
    href: "/join",
    keywords: ["únete", "registro", "comunidad", "inscripción"],
  },
  {
    id: "onboarding",
    title: "Primeros pasos",
    subtitle: "Lista de verificación para empezar",
    href: "/onboarding",
    keywords: ["onboarding", "inicio", "pasos", "empezar", "checklist"],
  },
]

const DIACRITIC_REGEX = /[̀-ͯ]/g

export function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(DIACRITIC_REGEX, "")
    .trim()
}

function tokenize(value: string): string[] {
  return normalize(value)
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
}

function scoreEntry(
  query: string,
  fields: { title: string; subtitle: string; keywords: string[] },
): number {
  const q = normalize(query)
  if (!q) return 0

  const title = normalize(fields.title)
  const subtitle = normalize(fields.subtitle)
  const keywordsBlob = fields.keywords.map(normalize).join(" ")

  const queryTokens = tokenize(query)
  if (queryTokens.length === 0) return 0

  let score = 0

  if (title === q) score += 120
  if (title.startsWith(q)) score += 60
  if (title.includes(q)) score += 40
  if (subtitle.includes(q)) score += 15
  if (keywordsBlob.includes(q)) score += 20

  for (const token of queryTokens) {
    if (title.includes(token)) score += 10
    if (subtitle.includes(token)) score += 4
    if (keywordsBlob.includes(token)) score += 6
  }

  const allTokensInTitle = queryTokens.every((t) => title.includes(t))
  if (allTokensInTitle) score += 15

  return score
}

function opportunityToIndexed(opportunity: Opportunity): SearchResult {
  return {
    kind: "opportunity",
    id: opportunity.id,
    title: opportunity.title,
    subtitle: opportunity.description,
    href: `/opportunity/${opportunity.id}`,
    keywords: [
      opportunity.fundingType,
      opportunity.supportType,
      opportunity.eligibility,
      opportunity.programName,
      opportunity.status,
      opportunity.supportAmount,
    ],
    score: 0,
  }
}

function programToIndexed(program: Program): SearchResult {
  return {
    kind: "program",
    id: program.id,
    title: program.title,
    subtitle: program.subtitle,
    href: `/program/${program.id}`,
    keywords: [
      program.type,
      program.eligibility,
      program.description,
      ...program.targetAudience.map((t) => t.label),
      ...program.offerings.map((o) => o.title),
    ],
    score: 0,
  }
}

function businessToIndexed(business: Business): SearchResult {
  return {
    kind: "business",
    id: business.id,
    title: business.name,
    subtitle: `${business.category} · ${business.location}`,
    href: `/#directory`,
    keywords: [business.category, business.location, ...business.tags, business.description],
    score: 0,
  }
}

function sectionToIndexed(section: SectionLink): SearchResult {
  return {
    kind: "section",
    id: section.id,
    title: section.title,
    subtitle: section.subtitle,
    href: section.href,
    keywords: section.keywords,
    score: 0,
  }
}

export function buildIndex(): SearchResult[] {
  return [
    ...opportunities.map(opportunityToIndexed),
    ...programs.map(programToIndexed),
    ...businesses.map(businessToIndexed),
    ...sectionLinks.map(sectionToIndexed),
  ]
}

export function searchAll(query: string, index: SearchResult[] = buildIndex()): SearchResult[] {
  const q = normalize(query)
  if (!q) return []

  return index
    .map((entry) => ({
      ...entry,
      score: scoreEntry(query, {
        title: entry.title,
        subtitle: entry.subtitle,
        keywords: entry.keywords,
      }),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
}

export function groupResults(results: SearchResult[]): Record<SearchResultKind, SearchResult[]> {
  const grouped: Record<SearchResultKind, SearchResult[]> = {
    opportunity: [],
    program: [],
    business: [],
    section: [],
  }
  for (const result of results) {
    grouped[result.kind].push(result)
  }
  return grouped
}
