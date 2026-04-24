import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { programs } from "@/data/programs"
import { opportunities } from "@/data/opportunities"
import type { Program } from "@/data/types"
import { DeadlineBadge } from "@/components/deadline-badge"

export default function ProgramsSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-amber-50/30 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 mb-4">Programas Disponibles</h2>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Descubre todos los programas de financiación, formación y apoyo diseñados para impulsar tu emprendimiento
            turístico en La Guajira
          </p>
        </div>

        {/* Cards Container */}
        <div className="relative">
          {/* Mobile: Horizontal Scroll */}
          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {programs.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
            {/* Scroll Indicator */}
            <div className="flex justify-center mt-4 space-x-2">
              {programs.map((program) => (
                <div key={program.id} className="w-2 h-2 rounded-full bg-amber-300 opacity-50" />
              ))}
            </div>
            <p className="text-center text-sm text-amber-600 mt-2">Desliza para ver más programas →</p>
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-2 border-turquoise-500 text-turquoise-700 hover:bg-turquoise-50 font-semibold px-8 py-3 rounded-full"
          >
            Ver Todos los Programas
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

function ProgramCard({ program }: { program: Program }) {
  const IconComponent = program.icon
  const opportunityCount = opportunities.filter((o) => o.programId === program.id).length
  const opportunityLabel =
    opportunityCount === 0
      ? "Sin oportunidades activas"
      : opportunityCount === 1
        ? "1 oportunidad activa"
        : `${opportunityCount} oportunidades activas`

  return (
    <Card
      className={`w-80 md:w-full flex-shrink-0 snap-start ${program.borderColor} border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white relative overflow-hidden group`}
    >
      {/* Accent stripe */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${program.accentColor}`} />

      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className={`p-3 rounded-xl ${program.bgColor} group-hover:scale-110 transition-transform duration-300`}>
            <IconComponent className={`h-6 w-6 ${program.iconColor}`} />
          </div>
          <div className="flex flex-col items-end gap-1">
            <DeadlineBadge deadline={program.deadline} />
            <div className="text-xs text-amber-700 font-medium">{opportunityLabel}</div>
          </div>
        </div>
        <CardTitle className="text-xl font-bold text-amber-900 mt-4 group-hover:text-turquoise-700 transition-colors duration-300">
          {program.title}
        </CardTitle>
        <p className="text-amber-700 text-sm leading-relaxed">{program.description}</p>
        <p className="text-amber-600 text-xs mt-2 italic">
          Este programa incluye varias oportunidades activas para emprendedores turísticos.
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Program Type */}
        <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
          <DollarSign className="h-4 w-4 text-amber-600 flex-shrink-0" />
          <div>
            <span className="text-xs text-gray-500 block">Tipo</span>
            <span className="text-sm font-medium text-amber-800">{program.type}</span>
          </div>
        </div>

        {/* Eligibility */}
        <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
          <CheckCircle className="h-4 w-4 text-amber-600 flex-shrink-0" />
          <div>
            <span className="text-xs text-gray-500 block">Dirigido a</span>
            <span className="text-sm text-amber-700">{program.eligibility}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        <Link href={`/program/${program.id}`} className="w-full">
          <Button
            className={`w-full ${program.accentColor} hover:opacity-90 text-white font-semibold py-2 rounded-lg transition-all duration-200 group-hover:shadow-lg`}
          >
            Ver Programa Completo
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
