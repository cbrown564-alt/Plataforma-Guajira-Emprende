"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Users,
  Target,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getProgramById } from "@/data/programs"
import { getOpportunitiesByProgramId } from "@/data/opportunities"

export default function ProgramDetailPage({ id }: { id: string }) {
  const program = getProgramById(id)
  if (!program) notFound()

  const activeOpportunities = getOpportunitiesByProgramId(program.id)

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 to-white">
      {/* Sticky Navigation Header */}
      <div className="bg-white border-b border-amber-200/50 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/#training"
            className="flex items-center space-x-2 text-amber-800 hover:text-turquoise-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Volver a Programas</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header Section */}
        <div className="mb-8">
          <Card className="border-2 border-amber-200 bg-white shadow-lg overflow-hidden">
            {/* Decorative top stripe */}
            <div className="h-2 bg-gradient-to-r from-turquoise-500 via-coral-500 to-amber-500"></div>

            <CardHeader className="pb-6">
              {/* Program Type Badge */}
              <div className="mb-4">
                <span
                  className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-bold border-2 ${program.typeColor}`}
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  {program.type}
                </span>
              </div>

              {/* Program Name */}
              <h1 className="text-3xl lg:text-4xl font-bold text-amber-900 leading-tight mb-3">{program.title}</h1>

              {/* Subtitle */}
              <p className="text-lg text-amber-700 font-medium">{program.subtitle}</p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center space-x-3 p-3 bg-turquoise-50 rounded-lg">
                  <Users className="h-5 w-5 text-turquoise-600" />
                  <div>
                    <span className="text-xs text-turquoise-600 block font-medium">Beneficiarios</span>
                    <span className="text-sm font-bold text-turquoise-900">{program.stats.beneficiaries}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <Target className="h-5 w-5 text-green-600" />
                  <div>
                    <span className="text-xs text-green-600 block font-medium">Inversión total</span>
                    <span className="text-sm font-bold text-green-900">{program.stats.investment}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Overview Section */}
        <Card className="mb-6 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center">
              <Lightbulb className="h-6 w-6 text-amber-600 mr-3" />
              ¿Qué es este programa?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed text-lg">{program.overview}</p>
          </CardContent>
        </Card>

        {/* Target Audience Section */}
        <Card className="mb-6 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center">
              <Users className="h-6 w-6 text-turquoise-600 mr-3" />
              ¿Para quién es?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {program.targetAudience.map((audience, index) => {
                const IconComponent = audience.icon
                return (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-4 rounded-lg border-2 ${audience.color} border-opacity-50`}
                  >
                    <IconComponent className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium">{audience.label}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* What It Offers Section */}
        <Card className="mb-6 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
              ¿Qué ofrece?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {program.offerings.map((offering, index) => {
                const IconComponent = offering.icon
                return (
                  <div key={index} className={`text-center p-6 rounded-xl ${offering.bgColor} border border-gray-200`}>
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-white rounded-full shadow-sm">
                        <IconComponent className={`h-8 w-8 ${offering.color}`} />
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">{offering.title}</h3>
                    <p className="text-gray-700 text-sm">{offering.description}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* How to Apply Section */}
        <Card className="mb-8 border-2 border-turquoise-200 bg-turquoise-50">
          <CardHeader>
            <CardTitle className="text-xl text-turquoise-900 flex items-center">
              <ArrowRight className="h-6 w-6 mr-3" />
              ¿Cómo aplicar?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-turquoise-800 leading-relaxed">{program.applicationProcess}</p>
            <Button
              size="lg"
              className="w-full bg-turquoise-600 hover:bg-turquoise-700 text-white font-bold py-3 rounded-full shadow-lg"
            >
              Comenzar Aplicación
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>

        {/* Active Opportunities Section */}
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-6 w-6 text-coral-600 mr-3" />
                Oportunidades Activas
              </div>
              <span className="text-sm font-normal text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                {activeOpportunities.length} {activeOpportunities.length === 1 ? "disponible" : "disponibles"}
              </span>
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Estas son las convocatorias actualmente abiertas dentro de este programa
            </p>
          </CardHeader>
          <CardContent>
            {activeOpportunities.length > 0 ? (
              <div className="space-y-4">
                {activeOpportunities.map((opportunity) => (
                  <Card
                    key={opportunity.id}
                    className="border border-gray-200 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-gray-900">{opportunity.title}</h3>
                            <span
                              className={`text-xs px-2 py-1 rounded-full font-medium ${
                                opportunity.status === "Activo"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {opportunity.status}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{opportunity.description}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Cierre: {opportunity.deadline}</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <Link href={`/opportunity/${opportunity.id}`}>
                            <Button
                              variant="outline"
                              className="w-full sm:w-auto border-turquoise-500 text-turquoise-700 hover:bg-turquoise-50"
                            >
                              Ver Detalles
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Aún no hay convocatorias abiertas para este programa.</p>
                <p className="text-sm mt-1">Vuelve pronto o contáctanos para más información.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
