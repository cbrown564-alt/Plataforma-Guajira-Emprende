"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Building2,
  Check,
  Code2,
  Compass,
  GraduationCap,
  HandHeart,
  Hammer,
  Heart,
  Megaphone,
  RotateCcw,
  Rocket,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { opportunities } from "@/data/opportunities"
import { programs } from "@/data/programs"
import type {
  MatchAudience,
  MatchSupport,
  MatchTags,
  Opportunity,
  Program,
} from "@/data/types"

interface Chip<T extends string> {
  id: T
  label: string
  icon: LucideIcon
}

const AUDIENCE_CHIPS: Chip<MatchAudience>[] = [
  { id: "youth", label: "Joven (18-28)", icon: Rocket },
  { id: "wayuu", label: "Comunidad wayuu", icon: Heart },
  { id: "pyme", label: "Tengo una PYME", icon: Building2 },
  { id: "startup-team", label: "Equipo fundador", icon: Users },
  { id: "tech-team", label: "Equipo técnico", icon: Code2 },
  { id: "community-assoc", label: "Asociación o cabildo", icon: HandHeart },
]

const SUPPORT_CHIPS: Chip<MatchSupport>[] = [
  { id: "funding", label: "Financiación", icon: Wallet },
  { id: "training", label: "Formación", icon: GraduationCap },
  { id: "mentorship", label: "Mentoría", icon: HandHeart },
  { id: "credit", label: "Crédito preferencial", icon: Wallet },
  { id: "infrastructure", label: "Infraestructura", icon: Hammer },
  { id: "promotion", label: "Promoción", icon: Megaphone },
]

type MatchResult = {
  kind: "program" | "opportunity"
  id: string
  title: string
  subtitle: string
  href: string
  icon: LucideIcon
  accentBg: string
  accentText: string
  accentBorder: string
  score: number
  maxScore: number
  typeLabel: string
  reasons: string[]
}

const AUDIENCE_REASON: Record<MatchAudience, string> = {
  youth: "Dirigido a jóvenes",
  wayuu: "Para comunidades wayuu",
  pyme: "Apto para PYMES formales",
  "startup-team": "Para equipos fundadores",
  "tech-team": "Para equipos técnicos",
  "community-assoc": "Para asociaciones y colectivos",
}

const SUPPORT_REASON: Record<MatchSupport, string> = {
  funding: "Ofrece financiación",
  training: "Incluye formación",
  mentorship: "Incluye mentoría",
  credit: "Crédito preferencial",
  infrastructure: "Apoyo en infraestructura",
  promotion: "Promoción y visibilidad",
}

function score(
  tags: MatchTags,
  selectedAudiences: Set<MatchAudience>,
  selectedSupports: Set<MatchSupport>,
): { total: number; max: number; reasons: string[] } {
  const audienceMatches = tags.audiences.filter((a) => selectedAudiences.has(a))
  const supportMatches = tags.supports.filter((s) => selectedSupports.has(s))

  const reasons = [
    ...audienceMatches.map((a) => AUDIENCE_REASON[a]),
    ...supportMatches.map((s) => SUPPORT_REASON[s]),
  ]

  const total = audienceMatches.length * 2 + supportMatches.length
  const max = selectedAudiences.size * 2 + selectedSupports.size
  return { total, max, reasons }
}

function programToResult(
  program: Program,
  s: { total: number; max: number; reasons: string[] },
): MatchResult {
  return {
    kind: "program",
    id: program.id,
    title: program.title,
    subtitle: program.subtitle,
    href: `/program/${program.id}`,
    icon: program.icon,
    accentBg: program.bgColor,
    accentText: program.iconColor,
    accentBorder: program.borderColor,
    score: s.total,
    maxScore: s.max,
    typeLabel: program.type,
    reasons: s.reasons,
  }
}

function opportunityToResult(
  opportunity: Opportunity,
  s: { total: number; max: number; reasons: string[] },
): MatchResult {
  return {
    kind: "opportunity",
    id: opportunity.id,
    title: opportunity.title,
    subtitle: opportunity.description,
    href: `/opportunity/${opportunity.id}`,
    icon: opportunity.icon,
    accentBg: opportunity.bgColor,
    accentText: opportunity.iconColor,
    accentBorder: opportunity.borderColor,
    score: s.total,
    maxScore: s.max,
    typeLabel: opportunity.fundingType,
    reasons: s.reasons,
  }
}

function matchLabel(ratio: number): { label: string; dotClass: string } {
  if (ratio >= 0.75) return { label: "Match alto", dotClass: "bg-green-500" }
  if (ratio >= 0.4) return { label: "Match medio", dotClass: "bg-amber-500" }
  return { label: "Match parcial", dotClass: "bg-gray-400" }
}

export default function OpportunityFinder() {
  const [selectedAudiences, setSelectedAudiences] = useState<Set<MatchAudience>>(new Set())
  const [selectedSupports, setSelectedSupports] = useState<Set<MatchSupport>>(new Set())

  const hasSelection = selectedAudiences.size > 0 || selectedSupports.size > 0

  const toggleAudience = (id: MatchAudience) => {
    setSelectedAudiences((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleSupport = (id: MatchSupport) => {
    setSelectedSupports((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const reset = () => {
    setSelectedAudiences(new Set())
    setSelectedSupports(new Set())
  }

  const results: MatchResult[] = useMemo(() => {
    if (!hasSelection) return []

    const programResults = programs
      .map((p) => ({ p, s: score(p.match, selectedAudiences, selectedSupports) }))
      .filter(({ s }) => s.total > 0)
      .map(({ p, s }) => programToResult(p, s))

    const opportunityResults = opportunities
      .map((o) => ({ o, s: score(o.match, selectedAudiences, selectedSupports) }))
      .filter(({ s }) => s.total > 0)
      .map(({ o, s }) => opportunityToResult(o, s))

    // Prefer programs as the primary recommendation, opportunities as "open call" reinforcements.
    // Dedupe: if an opportunity belongs to a program already in results, drop it.
    const programIds = new Set(programResults.map((r) => r.id))
    const opportunitiesToKeep = opportunityResults.filter((r) => {
      const opp = opportunities.find((o) => o.id === r.id)
      return opp ? !programIds.has(opp.programId) : true
    })

    return [...programResults, ...opportunitiesToKeep]
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
  }, [hasSelection, selectedAudiences, selectedSupports])

  return (
    <section
      id="finder"
      aria-labelledby="finder-heading"
      className="relative py-16 lg:py-24 bg-gradient-to-b from-white via-amber-50/40 to-white"
    >
      {/* Soft accent blobs echoing the Wayuu palette */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-20 w-72 h-72 bg-turquoise-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-20 w-72 h-72 bg-coral-200/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-12 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-turquoise-100 text-turquoise-800 text-xs font-semibold tracking-wide uppercase">
            <Compass className="h-3.5 w-3.5" aria-hidden />
            Recomendador personalizado
          </span>
          <h2
            id="finder-heading"
            className="text-3xl lg:text-4xl font-bold text-amber-900 mt-4 mb-3"
          >
            Encuentra tu apoyo en dos pasos
          </h2>
          <p className="text-base lg:text-lg text-amber-700">
            Cuéntanos quién eres y qué necesitas. Te mostramos los programas y oportunidades
            hechos para ti, al instante.
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-amber-100 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-amber-100">
            {/* Question 1 */}
            <QuestionBlock
              step={1}
              accent="turquoise"
              title="¿Quién eres?"
              helperText="Selecciona todo lo que te describe"
            >
              <div className="flex flex-wrap gap-2">
                {AUDIENCE_CHIPS.map((chip) => (
                  <ChipButton
                    key={chip.id}
                    active={selectedAudiences.has(chip.id)}
                    onClick={() => toggleAudience(chip.id)}
                    icon={chip.icon}
                    label={chip.label}
                    activeClasses="bg-turquoise-600 text-white border-turquoise-600"
                  />
                ))}
              </div>
            </QuestionBlock>

            {/* Question 2 */}
            <QuestionBlock
              step={2}
              accent="coral"
              title="¿Qué necesitas?"
              helperText="Selecciona lo que estás buscando"
            >
              <div className="flex flex-wrap gap-2">
                {SUPPORT_CHIPS.map((chip) => (
                  <ChipButton
                    key={chip.id}
                    active={selectedSupports.has(chip.id)}
                    onClick={() => toggleSupport(chip.id)}
                    icon={chip.icon}
                    label={chip.label}
                    activeClasses="bg-coral-600 text-white border-coral-600"
                  />
                ))}
              </div>
            </QuestionBlock>
          </div>

          {/* Summary bar */}
          <div className="px-6 lg:px-8 py-4 bg-amber-50/50 border-t border-amber-100 flex items-center justify-between gap-4 flex-wrap">
            <div
              className="flex items-center gap-2 text-sm text-amber-800"
              aria-live="polite"
              aria-atomic="true"
            >
              <Sparkles className="h-4 w-4 text-amber-600" aria-hidden />
              {hasSelection ? (
                <span>
                  Mostrando <strong>{results.length}</strong>{" "}
                  {results.length === 1 ? "recomendación" : "recomendaciones"} para ti
                </span>
              ) : (
                <span>Selecciona al menos una opción para ver tus recomendaciones</span>
              )}
            </div>
            <button
              type="button"
              onClick={reset}
              disabled={!hasSelection}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-700 hover:text-amber-900 disabled:text-amber-400 disabled:cursor-not-allowed transition-colors"
            >
              <RotateCcw className="h-4 w-4" aria-hidden />
              Limpiar
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="max-w-5xl mx-auto mt-8">
          {hasSelection && results.length === 0 && (
            <div className="rounded-2xl border-2 border-dashed border-amber-200 bg-white p-8 text-center">
              <Compass className="h-10 w-10 mx-auto text-amber-500 mb-3" aria-hidden />
              <h3 className="text-lg font-semibold text-amber-900 mb-2">
                Todavía no encontramos un match directo
              </h3>
              <p className="text-amber-700 text-sm max-w-md mx-auto mb-4">
                Nuestro equipo puede orientarte personalmente. También puedes explorar todos los
                programas disponibles.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="#training">
                  <Button
                    variant="outline"
                    className="border-2 border-turquoise-500 text-turquoise-700 hover:bg-turquoise-50 rounded-full"
                  >
                    Ver todos los programas
                  </Button>
                </Link>
                <Link href="#contact">
                  <Button className="bg-coral-600 hover:bg-coral-700 text-white rounded-full">
                    Hablar con un asesor
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
              {results.map((result) => (
                <ResultCard key={`${result.kind}-${result.id}`} result={result} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

interface QuestionBlockProps {
  step: number
  accent: "turquoise" | "coral"
  title: string
  helperText: string
  children: React.ReactNode
}

function QuestionBlock({ step, accent, title, helperText, children }: QuestionBlockProps) {
  const badgeClasses =
    accent === "turquoise"
      ? "bg-turquoise-100 text-turquoise-800"
      : "bg-coral-100 text-coral-800"

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-2">
        <span
          className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${badgeClasses}`}
          aria-hidden
        >
          {step}
        </span>
        <h3 className="text-lg lg:text-xl font-bold text-amber-900">{title}</h3>
      </div>
      <p className="text-sm text-amber-600 mb-5">{helperText}</p>
      {children}
    </div>
  )
}

interface ChipButtonProps {
  active: boolean
  onClick: () => void
  icon: LucideIcon
  label: string
  activeClasses: string
}

function ChipButton({ active, onClick, icon: Icon, label, activeClasses }: ChipButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full border text-sm font-medium transition-all duration-150 min-h-[40px] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-turquoise-500 ${
        active
          ? `${activeClasses} shadow-md`
          : "bg-white text-amber-800 border-amber-200 hover:border-amber-400 hover:bg-amber-50"
      }`}
    >
      {active ? (
        <Check className="h-4 w-4" aria-hidden />
      ) : (
        <Icon className="h-4 w-4 text-amber-600" aria-hidden />
      )}
      <span>{label}</span>
    </button>
  )
}

function ResultCard({ result }: { result: MatchResult }) {
  const Icon = result.icon
  const ratio = result.maxScore > 0 ? result.score / result.maxScore : 0
  const badge = matchLabel(ratio)
  const reasons = Array.from(new Set(result.reasons)).slice(0, 3)

  return (
    <Link
      href={result.href}
      className="group block rounded-2xl bg-white border-2 border-amber-100 hover:border-turquoise-300 hover:shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-500 focus-visible:ring-offset-2"
    >
      <div className="p-5 lg:p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className={`shrink-0 p-2.5 rounded-xl ${result.accentBg}`}>
              <Icon className={`h-5 w-5 ${result.accentText}`} aria-hidden />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-amber-600">
                  {result.kind === "program" ? "Programa" : "Convocatoria abierta"}
                </span>
                <span className="text-[11px] text-amber-300" aria-hidden>
                  •
                </span>
                <span className="text-[11px] font-medium text-amber-700">
                  {result.typeLabel}
                </span>
              </div>
              <h3 className="text-base lg:text-lg font-bold text-amber-900 leading-tight group-hover:text-turquoise-700 transition-colors">
                {result.title}
              </h3>
            </div>
          </div>
          <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[11px] font-semibold text-amber-800">
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${badge.dotClass}`} aria-hidden />
            {badge.label}
          </span>
        </div>

        <p className="text-sm text-amber-700 leading-relaxed mb-4 line-clamp-2">
          {result.subtitle}
        </p>

        {reasons.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 mb-4">
            {reasons.map((reason) => (
              <li
                key={reason}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-turquoise-50 text-turquoise-800 text-xs font-medium"
              >
                <Check className="h-3 w-3" aria-hidden />
                {reason}
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center justify-end text-sm font-semibold text-turquoise-700 group-hover:text-turquoise-900">
          <span>Ver detalles</span>
          <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
        </div>
      </div>
    </Link>
  )
}
