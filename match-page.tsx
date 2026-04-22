"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle, Compass, RotateCcw, Sparkles, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  emptyQuery,
  matchFitLabel,
  matchOpportunities,
  matchPrograms,
  type AgeBracket,
  type Community,
  type MatchQuery,
  type Sector,
  type Stage,
  type SupportNeed,
} from "@/lib/matcher"

type Choice<T> = { value: T; label: string; hint?: string }

const AGE_CHOICES: Choice<AgeBracket>[] = [
  { value: "18-28", label: "Entre 18 y 28 años", hint: "Elegible para programas juveniles" },
  { value: "29-45", label: "Entre 29 y 45 años" },
  { value: "46+", label: "46 años o más" },
  { value: "unspecified", label: "Prefiero no decir" },
]

const COMMUNITY_CHOICES: Choice<Community>[] = [
  { value: "wayuu", label: "Soy miembro de una comunidad wayuu" },
  { value: "guajira-resident", label: "Vivo en La Guajira (no wayuu)" },
  { value: "other", label: "Vivo fuera de La Guajira" },
]

const STAGE_CHOICES: Choice<Stage>[] = [
  { value: "idea", label: "Apenas una idea", hint: "Aún no he empezado a operar" },
  { value: "early", label: "En desarrollo", hint: "Menos de 2 años operando" },
  { value: "established", label: "Negocio establecido", hint: "Más de 2 años con ventas" },
  {
    value: "community-association",
    label: "Asociación o ranchería comunitaria",
    hint: "Iniciativa colectiva de comunidad wayuu",
  },
]

const NEED_CHOICES: Choice<SupportNeed>[] = [
  { value: "grant", label: "Financiación no reembolsable", hint: "Fondos que no debes devolver" },
  { value: "credit", label: "Crédito o préstamo", hint: "Capital con tasas preferenciales" },
  { value: "training", label: "Formación / capacitación" },
  { value: "mentorship", label: "Mentoría y acompañamiento" },
  { value: "tech", label: "Apoyo para tecnología / innovación" },
]

const SECTOR_CHOICES: Choice<Sector>[] = [
  { value: "Turismo Cultural", label: "Turismo Cultural" },
  { value: "Hospedaje", label: "Hospedaje" },
  { value: "Gastronomía", label: "Gastronomía" },
  { value: "Ecoturismo", label: "Ecoturismo" },
  { value: "Artesanías", label: "Artesanías" },
  { value: "Transporte", label: "Transporte" },
  { value: "unspecified", label: "Aún no lo sé" },
]

const TOTAL_STEPS = 4

export default function MatchPage() {
  const [step, setStep] = useState(0)
  const [query, setQuery] = useState<MatchQuery>(emptyQuery)
  const [showResults, setShowResults] = useState(false)

  const canAdvance = useMemo(() => {
    if (step === 0) return true
    if (step === 1) return true
    if (step === 2) return query.needs.length > 0
    if (step === 3) return query.sectors.length > 0
    return false
  }, [step, query])

  const topOpportunities = useMemo(() => matchOpportunities(query).slice(0, 3), [query])
  const topPrograms = useMemo(() => matchPrograms(query).slice(0, 3), [query])

  function next() {
    if (step < TOTAL_STEPS - 1) setStep(step + 1)
    else setShowResults(true)
  }

  function back() {
    if (step > 0) setStep(step - 1)
  }

  function restart() {
    setQuery(emptyQuery)
    setStep(0)
    setShowResults(false)
  }

  function toggleNeed(need: SupportNeed) {
    setQuery((q) => ({
      ...q,
      needs: q.needs.includes(need) ? q.needs.filter((n) => n !== need) : [...q.needs, need],
    }))
  }

  function toggleSector(sector: Sector) {
    setQuery((q) => {
      const selected = q.sectors.includes(sector)
      if (sector === "unspecified") {
        return { ...q, sectors: selected ? [] : ["unspecified"] }
      }
      const withoutUnspec = q.sectors.filter((s) => s !== "unspecified")
      return {
        ...q,
        sectors: selected ? withoutUnspec.filter((s) => s !== sector) : [...withoutUnspec, sector],
      }
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-turquoise-50 pb-16">
      <header className="border-b border-amber-100 bg-white/70 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-amber-800 hover:text-amber-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al inicio
          </Link>
          <div className="inline-flex items-center gap-2 text-sm text-amber-700">
            <Compass className="h-4 w-4" />
            <span className="hidden sm:inline">Encuentra tu apoyo</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {!showResults ? (
          <WizardIntro />
        ) : (
          <ResultsIntro summary={summarise(query)} />
        )}

        <div className="mt-8 max-w-3xl mx-auto">
          {!showResults ? (
            <Card className="border-2 border-amber-100 shadow-sm">
              <CardHeader>
                <StepProgress step={step} total={TOTAL_STEPS} />
                <CardTitle className="text-2xl lg:text-3xl font-bold text-amber-900 mt-4">
                  {STEP_HEADINGS[step]}
                </CardTitle>
                <p className="text-amber-700">{STEP_DESCRIPTIONS[step]}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {step === 0 && (
                  <SingleSelect
                    name="age"
                    choices={AGE_CHOICES}
                    value={query.age}
                    onChange={(v) => setQuery({ ...query, age: v })}
                  />
                )}
                {step === 1 && (
                  <>
                    <SingleSelectGroup
                      title="Tu comunidad"
                      name="community"
                      choices={COMMUNITY_CHOICES}
                      value={query.community}
                      onChange={(v) => setQuery({ ...query, community: v })}
                    />
                    <SingleSelectGroup
                      title="Etapa de tu emprendimiento"
                      name="stage"
                      choices={STAGE_CHOICES}
                      value={query.stage}
                      onChange={(v) => setQuery({ ...query, stage: v })}
                    />
                  </>
                )}
                {step === 2 && (
                  <MultiSelect
                    choices={NEED_CHOICES}
                    values={query.needs}
                    onToggle={toggleNeed}
                    emptyMessage="Selecciona al menos un tipo de apoyo"
                  />
                )}
                {step === 3 && (
                  <MultiSelect
                    choices={SECTOR_CHOICES}
                    values={query.sectors}
                    onToggle={(v) => toggleSector(v as Sector)}
                    emptyMessage="Selecciona al menos un sector o 'Aún no lo sé'"
                  />
                )}
              </CardContent>
              <div className="flex items-center justify-between border-t border-amber-100 px-6 py-4">
                <Button
                  variant="outline"
                  onClick={back}
                  disabled={step === 0}
                  className="border-amber-200 text-amber-800"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Anterior
                </Button>
                <Button
                  onClick={next}
                  disabled={!canAdvance}
                  className="bg-turquoise-600 hover:bg-turquoise-700 text-white"
                >
                  {step === TOTAL_STEPS - 1 ? "Ver mis resultados" : "Continuar"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </Card>
          ) : (
            <div className="space-y-10">
              <ResultsSection
                title="Oportunidades recomendadas"
                subtitle="Convocatorias activas que mejor se ajustan a tu perfil"
                results={topOpportunities.map((r) => ({
                  id: r.item.id,
                  title: r.item.title,
                  description: r.item.description,
                  tagline: r.item.fundingType,
                  percent: r.percent,
                  reasons: r.reasons,
                  href: `/opportunity/${r.item.id}`,
                }))}
              />
              <ResultsSection
                title="Programas que te pueden servir"
                subtitle="Rutas de largo plazo: formación, incubación y apoyo comunitario"
                results={topPrograms.map((r) => ({
                  id: r.item.id,
                  title: r.item.title,
                  description: r.item.subtitle,
                  tagline: r.item.type,
                  percent: r.percent,
                  reasons: r.reasons,
                  href: `/program/${r.item.id}`,
                }))}
              />
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={restart}
                  variant="outline"
                  className="border-amber-200 text-amber-800"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Responder de nuevo
                </Button>
                <Link href="/join">
                  <Button className="bg-coral-500 hover:bg-coral-600 text-white">
                    Únete a la comunidad
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

const STEP_HEADINGS = [
  "¿Cuál es tu edad?",
  "Cuéntanos sobre ti",
  "¿Qué tipo de apoyo buscas?",
  "¿En qué sector está tu proyecto?",
]

const STEP_DESCRIPTIONS = [
  "Algunos programas están dirigidos especialmente a jóvenes entre 18 y 28 años.",
  "Nos ayuda a saber si priorizamos programas comunitarios o incubadoras.",
  "Puedes elegir varias opciones — te mostraremos los apoyos que combinan mejor.",
  "Elige una o varias categorías, o marca que aún no lo sabes.",
]

function StepProgress({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-2 flex-1 rounded-full transition-colors ${
            i <= step ? "bg-turquoise-500" : "bg-amber-100"
          }`}
        />
      ))}
      <span className="ml-3 text-xs font-medium text-amber-700 whitespace-nowrap">
        Paso {step + 1} de {total}
      </span>
    </div>
  )
}

function WizardIntro() {
  return (
    <div className="max-w-3xl mx-auto text-center space-y-3">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-turquoise-100 text-turquoise-800 text-xs font-semibold">
        <Sparkles className="h-3.5 w-3.5" />
        Recomendación personalizada
      </div>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-900">
        Encuentra tu apoyo en minutos
      </h1>
      <p className="text-base sm:text-lg text-amber-700 max-w-2xl mx-auto">
        Responde 4 preguntas rápidas y te diremos qué oportunidades y programas encajan con tu
        perfil, tu etapa y tus necesidades.
      </p>
    </div>
  )
}

function ResultsIntro({ summary }: { summary: string }) {
  return (
    <div className="max-w-3xl mx-auto text-center space-y-3">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coral-100 text-coral-800 text-xs font-semibold">
        <CheckCircle className="h-3.5 w-3.5" />
        Resultados personalizados
      </div>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-900">
        Esto fue lo que encontramos para ti
      </h1>
      <p className="text-base sm:text-lg text-amber-700 max-w-2xl mx-auto">{summary}</p>
    </div>
  )
}

interface ResultCardProps {
  id: string
  title: string
  description: string
  tagline: string
  percent: number
  reasons: string[]
  href: string
}

function ResultsSection({
  title,
  subtitle,
  results,
}: {
  title: string
  subtitle: string
  results: ResultCardProps[]
}) {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-amber-900">{title}</h2>
        <p className="text-amber-700 text-sm">{subtitle}</p>
      </div>
      <div className="space-y-4">
        {results.map((r) => (
          <Card
            key={r.id}
            className="border-2 border-amber-100 hover:border-turquoise-200 transition-colors"
          >
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                <div>
                  <span className="inline-block text-xs font-semibold px-2 py-1 rounded-md bg-amber-100 text-amber-800 mb-2">
                    {r.tagline}
                  </span>
                  <h3 className="text-lg font-bold text-amber-900">{r.title}</h3>
                  <p className="text-sm text-amber-700 mt-1">{r.description}</p>
                </div>
                <FitBadge percent={r.percent} />
              </div>
              {r.reasons.length > 0 && (
                <ul className="space-y-1.5 mb-4">
                  {r.reasons.slice(0, 3).map((reason, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-amber-800">
                      <CheckCircle className="h-4 w-4 text-turquoise-600 mt-0.5 shrink-0" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              )}
              <Link href={r.href}>
                <Button
                  variant="outline"
                  className="border-turquoise-500 text-turquoise-700 hover:bg-turquoise-50"
                >
                  Ver detalles
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function FitBadge({ percent }: { percent: number }) {
  const label = matchFitLabel(percent)
  const tone =
    percent >= 85
      ? "bg-green-100 text-green-800"
      : percent >= 65
        ? "bg-turquoise-100 text-turquoise-800"
        : percent >= 45
          ? "bg-amber-100 text-amber-800"
          : "bg-gray-100 text-gray-700"
  return (
    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 ${tone} self-start`}>
      <Star className="h-3.5 w-3.5 fill-current" />
      <span className="text-xs font-semibold whitespace-nowrap">
        {percent}% · {label}
      </span>
    </div>
  )
}

function SingleSelect<T extends string>({
  name,
  choices,
  value,
  onChange,
}: {
  name: string
  choices: Choice<T>[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div role="radiogroup" aria-label={name} className="grid gap-3">
      {choices.map((c) => {
        const selected = value === c.value
        return (
          <button
            key={c.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(c.value)}
            className={`text-left p-4 rounded-lg border-2 transition-all ${
              selected
                ? "border-turquoise-500 bg-turquoise-50"
                : "border-amber-100 hover:border-amber-200 bg-white"
            }`}
          >
            <div className="font-medium text-amber-900">{c.label}</div>
            {c.hint && <div className="text-xs text-amber-600 mt-0.5">{c.hint}</div>}
          </button>
        )
      })}
    </div>
  )
}

function SingleSelectGroup<T extends string>({
  title,
  ...props
}: {
  title: string
  name: string
  choices: Choice<T>[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-amber-800 uppercase tracking-wide mb-3">
        {title}
      </h3>
      <SingleSelect {...props} />
    </div>
  )
}

function MultiSelect<T extends string>({
  choices,
  values,
  onToggle,
  emptyMessage,
}: {
  choices: Choice<T>[]
  values: T[]
  onToggle: (v: T) => void
  emptyMessage: string
}) {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {choices.map((c) => {
          const selected = values.includes(c.value)
          return (
            <button
              key={c.value}
              type="button"
              role="checkbox"
              aria-checked={selected}
              onClick={() => onToggle(c.value)}
              className={`text-left p-4 rounded-lg border-2 transition-all ${
                selected
                  ? "border-turquoise-500 bg-turquoise-50"
                  : "border-amber-100 hover:border-amber-200 bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-medium text-amber-900">{c.label}</div>
                  {c.hint && <div className="text-xs text-amber-600 mt-0.5">{c.hint}</div>}
                </div>
                {selected && <CheckCircle className="h-5 w-5 text-turquoise-600 shrink-0" />}
              </div>
            </button>
          )
        })}
      </div>
      {values.length === 0 && (
        <p className="mt-3 text-xs text-amber-600">{emptyMessage}</p>
      )}
    </div>
  )
}

function summarise(q: MatchQuery): string {
  const parts: string[] = []
  if (q.age !== "unspecified") {
    parts.push(
      q.age === "18-28"
        ? "joven de 18-28 años"
        : q.age === "29-45"
          ? "emprendedor/a de 29-45"
          : "emprendedor/a de 46+",
    )
  }
  if (q.community === "wayuu") parts.push("con raíces wayuu")
  else if (q.community === "guajira-resident") parts.push("residente en La Guajira")
  if (q.stage === "idea") parts.push("con una idea en mente")
  else if (q.stage === "early") parts.push("en etapa temprana")
  else if (q.stage === "established") parts.push("con negocio establecido")
  else if (q.stage === "community-association") parts.push("en una iniciativa comunitaria")
  if (parts.length === 0) return "Ordenamos los apoyos por afinidad con tus respuestas."
  return `Basado en: ${parts.join(", ")}.`
}
