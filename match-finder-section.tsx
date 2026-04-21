"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  RotateCcw,
  Sparkles,
  Star,
} from "lucide-react"
import { programs } from "@/data/programs"
import {
  audienceOptions,
  matchPrograms,
  needOptions,
  type AudienceOption,
  type NeedOption,
  type ScoredProgram,
} from "@/data/match-finder"
import type { AudienceKey, NeedKey } from "@/data/types"

export default function MatchFinderSection() {
  const [audience, setAudience] = useState<AudienceKey | null>(null)
  const [need, setNeed] = useState<NeedKey | null>(null)

  const matches = useMemo(
    () => matchPrograms(programs, { audience, need }),
    [audience, need],
  )

  const hasSelection = audience !== null || need !== null
  const reset = () => {
    setAudience(null)
    setNeed(null)
  }

  return (
    <section
      id="match"
      className="relative py-16 lg:py-24 bg-gradient-to-br from-amber-50/70 via-white to-turquoise-50/40 overflow-hidden"
    >
      {/* Ambient background accents */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-20 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-turquoise-200/40 to-coral-200/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-20 -left-16 w-80 h-80 rounded-full bg-gradient-to-tr from-amber-200/50 to-turquoise-100/40 blur-3xl"
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-turquoise-200 shadow-sm mb-5">
            <Sparkles className="h-4 w-4 text-turquoise-600" aria-hidden="true" />
            <span className="text-sm font-semibold tracking-wide text-turquoise-800 uppercase">
              Recomendado para ti
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 mb-4">
            Encuentra tu apoyo ideal en 30 segundos
          </h2>
          <p className="text-lg text-amber-700">
            Cuéntanos quién eres y qué necesitas. Te mostramos al instante los programas que mejor se adaptan a tu
            emprendimiento turístico.
          </p>
        </div>

        {/* Questions */}
        <div className="max-w-5xl mx-auto space-y-8 lg:space-y-10">
          <QuestionBlock
            number={1}
            title="¿Cuál describe mejor tu situación?"
            helper="Elige la opción que más se acerque"
          >
            <div
              role="group"
              aria-label="Situación del emprendedor"
              className="flex flex-wrap gap-3"
            >
              {audienceOptions.map((option) => (
                <AudienceChip
                  key={option.key}
                  option={option}
                  selected={audience === option.key}
                  onToggle={() =>
                    setAudience((prev) => (prev === option.key ? null : option.key))
                  }
                />
              ))}
            </div>
          </QuestionBlock>

          <QuestionBlock
            number={2}
            title="¿Qué tipo de apoyo buscas?"
            helper="Selecciona tu prioridad principal"
          >
            <div
              role="group"
              aria-label="Tipo de apoyo que buscas"
              className="flex flex-wrap gap-3"
            >
              {needOptions.map((option) => (
                <NeedChip
                  key={option.key}
                  option={option}
                  selected={need === option.key}
                  onToggle={() =>
                    setNeed((prev) => (prev === option.key ? null : option.key))
                  }
                />
              ))}
            </div>
          </QuestionBlock>
        </div>

        {/* Results */}
        <div
          className="mt-12 lg:mt-14 max-w-6xl mx-auto"
          aria-live="polite"
          aria-atomic="false"
        >
          {hasSelection ? (
            <MatchResults matches={matches} onReset={reset} />
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </section>
  )
}

function QuestionBlock({
  number,
  title,
  helper,
  children,
}: {
  number: number
  title: string
  helper: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="flex items-baseline gap-3 mb-4">
        <span
          aria-hidden="true"
          className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-turquoise-600 text-white font-bold text-sm shadow-sm"
        >
          {number}
        </span>
        <div>
          <h3 className="text-xl font-bold text-amber-900 leading-tight">{title}</h3>
          <p className="text-sm text-amber-700 mt-0.5">{helper}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

function AudienceChip({
  option,
  selected,
  onToggle,
}: {
  option: AudienceOption
  selected: boolean
  onToggle: () => void
}) {
  const Icon = option.icon
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      className={`group relative flex items-start gap-3 text-left px-4 py-3 rounded-2xl border-2 transition-all duration-200 min-h-[64px] focus:outline-none focus-visible:ring-2 focus-visible:ring-turquoise-500 focus-visible:ring-offset-2 ${
        selected
          ? "bg-turquoise-600 border-turquoise-600 text-white shadow-lg shadow-turquoise-600/20 scale-[1.02]"
          : "bg-white border-amber-200 text-amber-900 hover:border-turquoise-400 hover:shadow-md"
      }`}
    >
      <span
        className={`flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0 transition-colors ${
          selected ? "bg-white/20" : "bg-turquoise-50 group-hover:bg-turquoise-100"
        }`}
      >
        <Icon
          className={`h-5 w-5 ${selected ? "text-white" : "text-turquoise-700"}`}
          aria-hidden="true"
        />
      </span>
      <span className="flex flex-col pr-1">
        <span className={`font-semibold text-sm leading-tight ${selected ? "text-white" : "text-amber-900"}`}>
          {option.label}
        </span>
        <span className={`text-xs mt-0.5 ${selected ? "text-white/80" : "text-amber-600"}`}>
          {option.sublabel}
        </span>
      </span>
      {selected && (
        <CheckCircle2
          className="absolute top-2 right-2 h-4 w-4 text-white"
          aria-hidden="true"
        />
      )}
    </button>
  )
}

function NeedChip({
  option,
  selected,
  onToggle,
}: {
  option: NeedOption
  selected: boolean
  onToggle: () => void
}) {
  const Icon = option.icon
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      className={`group relative flex items-start gap-3 text-left px-4 py-3 rounded-2xl border-2 transition-all duration-200 min-h-[64px] focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2 ${
        selected
          ? "bg-coral-500 border-coral-500 text-white shadow-lg shadow-coral-500/20 scale-[1.02]"
          : "bg-white border-amber-200 text-amber-900 hover:border-coral-400 hover:shadow-md"
      }`}
    >
      <span
        className={`flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0 transition-colors ${
          selected ? "bg-white/20" : "bg-coral-50 group-hover:bg-coral-100"
        }`}
      >
        <Icon
          className={`h-5 w-5 ${selected ? "text-white" : "text-coral-700"}`}
          aria-hidden="true"
        />
      </span>
      <span className="flex flex-col pr-1">
        <span className={`font-semibold text-sm leading-tight ${selected ? "text-white" : "text-amber-900"}`}>
          {option.label}
        </span>
        <span className={`text-xs mt-0.5 ${selected ? "text-white/80" : "text-amber-600"}`}>
          {option.sublabel}
        </span>
      </span>
      {selected && (
        <CheckCircle2
          className="absolute top-2 right-2 h-4 w-4 text-white"
          aria-hidden="true"
        />
      )}
    </button>
  )
}

function EmptyState() {
  return (
    <div className="rounded-3xl border-2 border-dashed border-amber-200 bg-white/60 backdrop-blur-sm p-8 lg:p-10 text-center">
      <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-br from-turquoise-100 to-amber-100 flex items-center justify-center mb-4">
        <Compass className="h-7 w-7 text-turquoise-700" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-bold text-amber-900 mb-2">
        Selecciona una opción para ver tus recomendaciones
      </h3>
      <p className="text-amber-700 max-w-md mx-auto">
        A medida que respondas, resaltaremos los programas que mejor se ajustan a tu perfil.
      </p>
    </div>
  )
}

function MatchResults({
  matches,
  onReset,
}: {
  matches: ScoredProgram[]
  onReset: () => void
}) {
  if (matches.length === 0) {
    return (
      <div className="rounded-3xl border border-amber-200 bg-white p-8 text-center shadow-sm">
        <h3 className="text-xl font-bold text-amber-900 mb-2">
          Aún no encontramos una coincidencia perfecta
        </h3>
        <p className="text-amber-700 max-w-xl mx-auto mb-6">
          Prueba con otra combinación o explora todos los programas disponibles para descubrir el que mejor se adapte a
          tu proyecto.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            onClick={onReset}
            className="border-2 border-amber-300 text-amber-800 hover:bg-amber-50 rounded-full px-6"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reiniciar
          </Button>
          <Link href="#training">
            <Button className="bg-turquoise-600 hover:bg-turquoise-700 text-white rounded-full px-6">
              Ver todos los programas
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const heading =
    matches.length === 1
      ? "Encontramos 1 programa para ti"
      : `Tus ${matches.length} mejores coincidencias`

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-turquoise-700 uppercase tracking-wide mb-1">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Resultados en vivo
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold text-amber-900">{heading}</h3>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-700 hover:text-turquoise-700 transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Reiniciar selección
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {matches.map((entry, index) => (
          <MatchCard key={entry.program.id} entry={entry} rank={index + 1} />
        ))}
      </div>
    </div>
  )
}

function MatchCard({ entry, rank }: { entry: ScoredProgram; rank: number }) {
  const { program, reasons, isTopMatch } = entry
  const Icon = program.icon
  return (
    <Card
      className={`relative overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        isTopMatch
          ? "border-2 border-turquoise-500 shadow-lg shadow-turquoise-500/10"
          : `border ${program.borderColor}`
      }`}
    >
      {isTopMatch && (
        <div className="absolute top-0 right-0 flex items-center gap-1 px-3 py-1 rounded-bl-xl bg-turquoise-600 text-white text-xs font-bold uppercase tracking-wide shadow-sm">
          <Star className="h-3 w-3 fill-current" aria-hidden="true" />
          Mejor coincidencia
        </div>
      )}

      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold text-amber-600 tracking-wider uppercase">
            #{rank}
          </span>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full border ${program.typeColor}`}
          >
            {program.type}
          </span>
        </div>

        <div className="flex items-start gap-3 mb-4">
          <div className={`p-3 rounded-xl ${program.bgColor} flex-shrink-0`}>
            <Icon className={`h-6 w-6 ${program.iconColor}`} aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h4 className="text-lg font-bold text-amber-900 leading-tight">
              {program.title}
            </h4>
            <p className="text-sm text-amber-700 mt-1 line-clamp-2">{program.subtitle}</p>
          </div>
        </div>

        {reasons.length > 0 && (
          <div className="mb-5">
            <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide mb-2">
              Por qué coincide
            </p>
            <div className="flex flex-wrap gap-1.5">
              {reasons.map((reason) => (
                <span
                  key={`${reason.kind}-${reason.label}`}
                  className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                    reason.kind === "audience"
                      ? "bg-turquoise-50 text-turquoise-800 border border-turquoise-200"
                      : "bg-coral-50 text-coral-800 border border-coral-200"
                  }`}
                >
                  <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                  {reason.label}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto pt-2">
          <Link href={`/program/${program.id}`} className="block">
            <Button
              className={`w-full font-semibold rounded-lg transition-all ${
                isTopMatch
                  ? "bg-turquoise-600 hover:bg-turquoise-700 text-white shadow-md"
                  : "bg-amber-100 hover:bg-amber-200 text-amber-900"
              }`}
            >
              Ver programa
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
