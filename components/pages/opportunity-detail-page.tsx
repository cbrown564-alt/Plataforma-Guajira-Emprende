"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ArrowLeft,
  Calendar,
  Users,
  DollarSign,
  FileText,
  CheckCircle,
  ExternalLink,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Target,
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getOpportunityById } from "@/data/opportunities"
import { openWhatsApp } from "@/lib/whatsapp"

export default function OpportunityDetailPage({ id }: { id: string }) {
  const opportunity = getOpportunityById(id)
  if (!opportunity) notFound()

  const handleWhatsAppClick = () =>
    openWhatsApp(`¡Hola! Tengo preguntas sobre la oportunidad "${opportunity.title}". ¿Podrían ayudarme?`)

  const statusBadgeClass =
    opportunity.status === "Activo"
      ? "bg-green-100 text-green-800 border-2 border-green-200"
      : opportunity.status === "Permanente"
        ? "bg-amber-100 text-amber-800 border-2 border-amber-200"
        : "bg-gray-100 text-gray-800 border-2 border-gray-200"
  const statusDotClass =
    opportunity.status === "Activo"
      ? "bg-green-500"
      : opportunity.status === "Permanente"
        ? "bg-amber-500"
        : "bg-gray-500"

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 to-white">
      {/* Navigation Header */}
      <div className="bg-white border-b border-amber-200/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/#opportunities"
            className="flex items-center space-x-2 text-amber-800 hover:text-turquoise-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Volver a oportunidades</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header Section */}
        <div className="mb-8">
          <Card className="border-2 border-amber-200 bg-white shadow-lg">
            <CardHeader className="pb-6">
              {/* Program Tag */}
              <div className="mb-3">
                <Link
                  href={`/program/${opportunity.programId}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-turquoise-100 text-turquoise-800 border border-turquoise-200 hover:bg-turquoise-200 transition-colors"
                >
                  Parte del programa: {opportunity.programName}
                </Link>
              </div>

              {/* Title and Status */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-2xl lg:text-3xl font-bold text-amber-900 leading-tight">{opportunity.title}</h1>
                </div>
                <div className="flex-shrink-0">
                  <span className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-bold ${statusBadgeClass}`}>
                    <div className={`w-2 h-2 ${statusDotClass} rounded-full mr-2 animate-pulse`} />
                    {opportunity.status}
                  </span>
                </div>
              </div>

              {/* Key Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-amber-600" />
                  <div>
                    <span className="text-xs text-amber-600 block font-medium">Fecha límite</span>
                    <span className="text-sm font-bold text-amber-900">{opportunity.deadline}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-turquoise-50 rounded-lg">
                  <Users className="h-5 w-5 text-turquoise-600" />
                  <div>
                    <span className="text-xs text-turquoise-600 block font-medium">Dirigido a</span>
                    <span className="text-sm font-bold text-turquoise-900">{opportunity.eligibility}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Summary */}
        <Card className="mb-6 border border-gray-200">
          <CardContent className="pt-6">
            <p className="text-lg text-gray-700 leading-relaxed">{opportunity.summary}</p>
          </CardContent>
        </Card>

        {/* Key Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Support Type */}
          <Card className="border border-green-200 bg-green-50/50">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <CardTitle className="text-lg text-green-900">Tipo de Apoyo</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-green-800 font-semibold">{opportunity.supportType}</p>
              <p className="text-sm text-green-700 mt-1">{opportunity.supportAmount}</p>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="border border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <CardTitle className="text-lg text-amber-900">Cronograma</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-amber-800 font-semibold">Cierre: {opportunity.deadline}</p>
              {opportunity.resultsAt && (
                <p className="text-sm text-amber-700 mt-1">Resultados: {opportunity.resultsAt}</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Requirements */}
        <Card className="mb-6 border border-gray-200">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">Documentos Requeridos</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {opportunity.requirements.map((req, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Application Steps */}
        <Card className="mb-6 border border-gray-200">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">Cómo Aplicar</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {opportunity.applicationSteps.map((step, index) => (
                <li key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-turquoise-100 text-turquoise-800 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="text-gray-700 pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Application Button */}
        <Card className="mb-8 border-2 border-turquoise-200 bg-turquoise-50">
          <CardContent className="pt-6 text-center">
            <h3 className="text-lg font-bold text-turquoise-900 mb-4">¿Listo para aplicar?</h3>
            <Button
              size="lg"
              className="bg-turquoise-600 hover:bg-turquoise-700 text-white font-bold px-8 py-3 rounded-full shadow-lg"
            >
              Ir al Formulario de Postulación
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-turquoise-700 mt-3">Te redirigiremos a la plataforma oficial de postulación</p>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card className="mb-8 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Preguntas Frecuentes</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {opportunity.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left hover:text-turquoise-700">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact/Help Section */}
        <Card className="border-2 border-coral-200 bg-coral-50">
          <CardHeader>
            <CardTitle className="text-xl text-coral-900">¿Necesitas Ayuda?</CardTitle>
            <p className="text-coral-700">Nuestro equipo está aquí para apoyarte en tu proceso de postulación</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Chatear por WhatsApp
            </Button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-coral-200">
                <Phone className="h-5 w-5 text-coral-600" />
                <div>
                  <span className="text-xs text-coral-600 block">Teléfono</span>
                  <span className="text-sm font-medium text-coral-900">+57 (5) 123-4567</span>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-coral-200">
                <Mail className="h-5 w-5 text-coral-600" />
                <div>
                  <span className="text-xs text-coral-600 block">Email</span>
                  <span className="text-sm font-medium text-coral-900">ayuda@guajiraemprende.gov.co</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
