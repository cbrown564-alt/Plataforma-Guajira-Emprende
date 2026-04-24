import { businesses } from "@/data/businesses"
import { opportunities } from "@/data/opportunities"
import { programs } from "@/data/programs"
import { getDeadlineStatus } from "@/lib/deadlines"
import type { SearchEntry } from "@/lib/search"

/**
 * Flatten every searchable record on the platform into a single array the
 * command palette can rank. Built at import time so the result is shared
 * across all consumers — no React state, no re-computation per keystroke.
 *
 * Keyword lists are curated to cover the terms Spanish-speaking
 * entrepreneurs are likely to reach for ("microcreditos", "beca",
 * "ranchería", "Uribia") even when those words don't appear verbatim in the
 * record's title or description.
 */

const programEntries: SearchEntry[] = programs.map((program) => {
  const status = getDeadlineStatus(program.deadline)
  return {
    id: `program:${program.id}`,
    kind: "program",
    title: program.title,
    subtitle: program.subtitle,
    keywords: [
      program.type,
      program.eligibility,
      program.deadline,
      ...program.targetAudience.map((t) => t.label),
      ...program.offerings.map((o) => o.title),
    ],
    meta: status.label,
    href: `/program/${program.id}`,
  }
})

const opportunityEntries: SearchEntry[] = opportunities.map((opportunity) => {
  const status = getDeadlineStatus(opportunity.deadline)
  return {
    id: `opportunity:${opportunity.id}`,
    kind: "opportunity",
    title: opportunity.title,
    subtitle: opportunity.description,
    keywords: [
      opportunity.fundingType,
      opportunity.supportType,
      opportunity.eligibility,
      opportunity.programName,
      opportunity.deadline,
      opportunity.supportAmount,
    ],
    meta: status.label,
    href: `/opportunity/${opportunity.id}`,
  }
})

const businessEntries: SearchEntry[] = businesses.map((business) => ({
  id: `business:${business.id}`,
  kind: "business",
  title: business.name,
  subtitle: `${business.category} · ${business.location}`,
  keywords: [business.category, business.location, ...business.tags],
  meta: business.category,
  href: "/#directory",
}))

const staticPageEntries: SearchEntry[] = [
  {
    id: "page:finder",
    kind: "page",
    title: "Encuentra tu apoyo",
    subtitle: "Recomendador personalizado en dos pasos",
    keywords: ["buscador", "recomendador", "match", "quiz", "finder"],
    href: "/#finder",
  },
  {
    id: "page:opportunities",
    kind: "page",
    title: "Oportunidades disponibles",
    subtitle: "Convocatorias abiertas de financiación y formación",
    keywords: ["convocatorias", "fondos", "apoyos"],
    href: "/#opportunities",
  },
  {
    id: "page:training",
    kind: "page",
    title: "Programas de formación",
    subtitle: "Capacitación, incubación y mentoría",
    keywords: ["formación", "educación", "capacitación", "cursos"],
    href: "/#training",
  },
  {
    id: "page:stories",
    kind: "page",
    title: "Historias de éxito",
    subtitle: "Emprendedores reales de La Guajira",
    keywords: ["testimonios", "casos", "éxito"],
    href: "/#stories",
  },
  {
    id: "page:directory",
    kind: "page",
    title: "Directorio de emprendimientos",
    subtitle: "Negocios turísticos activos en el territorio",
    keywords: ["directorio", "empresas", "negocios"],
    href: "/#directory",
  },
  {
    id: "page:contact",
    kind: "page",
    title: "Contacto y oficinas",
    subtitle: "Teléfono, email, oficinas en Riohacha y Maicao",
    keywords: ["oficinas", "teléfono", "email", "contacto", "soporte"],
    href: "/#contact",
  },
  {
    id: "page:onboarding",
    kind: "page",
    title: "Comienza tu emprendimiento",
    subtitle: "Checklist guiado para dar los primeros pasos",
    keywords: ["onboarding", "inicio", "checklist", "primeros pasos"],
    href: "/onboarding",
  },
  {
    id: "page:join",
    kind: "page",
    title: "Únete a la comunidad",
    subtitle: "Regístrate y recibe apoyo personalizado",
    keywords: ["registro", "comunidad", "inscribirme"],
    href: "/join",
  },
]

const actionEntries: SearchEntry[] = [
  {
    id: "action:whatsapp",
    kind: "action",
    title: "Hablar por WhatsApp",
    subtitle: "Atención inmediata con un asesor",
    keywords: ["whatsapp", "chat", "asesor", "ayuda"],
    action: "whatsapp",
  },
  {
    id: "action:call",
    kind: "action",
    title: "Llamar al equipo",
    subtitle: "Lunes a Viernes, 8:00 AM – 5:00 PM",
    keywords: ["teléfono", "llamar", "call"],
    action: "call",
  },
  {
    id: "action:email",
    kind: "action",
    title: "Escribir un email",
    subtitle: "Respuesta en 24 horas hábiles",
    keywords: ["correo", "email", "mail"],
    action: "email",
  },
]

export const searchIndex: SearchEntry[] = [
  ...programEntries,
  ...opportunityEntries,
  ...businessEntries,
  ...staticPageEntries,
  ...actionEntries,
]

export const SEARCH_ENTRY_KIND_LABELS: Record<SearchEntry["kind"], string> = {
  program: "Programas",
  opportunity: "Convocatorias",
  business: "Directorio de emprendimientos",
  page: "Páginas",
  action: "Acciones rápidas",
}

export const SEARCH_ENTRY_KIND_ORDER: SearchEntry["kind"][] = [
  "program",
  "opportunity",
  "business",
  "page",
  "action",
]
