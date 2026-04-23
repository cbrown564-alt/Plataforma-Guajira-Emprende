import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { opportunities } from "@/data/opportunities"
import type { Opportunity } from "@/data/types"
import { DeadlineBadge } from "@/components/deadline-badge"

export default function OpportunitiesSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-amber-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 mb-4">Oportunidades Disponibles</h2>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Descubre programas de financiación y formación diseñados para impulsar tu emprendimiento turístico
          </p>
        </div>

        {/* Cards Container */}
        <div className="relative">
          {/* Mobile: Horizontal Scroll */}
          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {opportunities.map((opportunity) => (
                <OpportunityCard key={opportunity.id} opportunity={opportunity} />
              ))}
            </div>
            {/* Scroll Indicator */}
            <div className="flex justify-center mt-4 space-x-2">
              {opportunities.map((opportunity) => (
                <div key={opportunity.id} className="w-2 h-2 rounded-full bg-amber-300" />
              ))}
            </div>
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {opportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-2 border-turquoise-500 text-turquoise-700 hover:bg-turquoise-50 font-semibold px-8 py-3 rounded-full"
          >
            Ver Todas las Oportunidades
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  const IconComponent = opportunity.icon

  return (
    <Card
      className={`w-80 md:w-full flex-shrink-0 snap-start ${opportunity.borderColor} border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className={`p-3 rounded-xl ${opportunity.bgColor}`}>
            <IconComponent className={`h-6 w-6 ${opportunity.iconColor}`} />
          </div>
          <DeadlineBadge deadline={opportunity.deadline} />
        </div>

        {/* Program Label */}
        <div className="mt-3 mb-2">
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
            Parte del programa: {opportunity.programName}
          </span>
        </div>

        <CardTitle className="text-xl font-bold text-amber-900 mt-2">{opportunity.title}</CardTitle>
        <p className="text-amber-700 text-sm leading-relaxed">{opportunity.description}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Funding Type */}
        <div className="flex items-center space-x-3">
          <DollarSign className="h-4 w-4 text-amber-600" />
          <span className="text-sm font-medium text-amber-800">{opportunity.fundingType}</span>
        </div>

        {/* Eligibility */}
        <div className="flex items-center space-x-3">
          <CheckCircle className="h-4 w-4 text-amber-600" />
          <span className="text-sm text-amber-700">{opportunity.eligibility}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        <Link href={`/opportunity/${opportunity.id}`} className="w-full">
          <Button className="w-full bg-turquoise-600 hover:bg-turquoise-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200">
            Ver Detalles
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
