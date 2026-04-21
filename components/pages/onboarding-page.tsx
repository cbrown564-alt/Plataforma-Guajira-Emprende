"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ArrowLeft,
  BookOpen,
  DollarSign,
  MessageCircle,
  ArrowRight,
  Lightbulb,
  Users,
  Target,
  Heart,
} from "lucide-react"
import Link from "next/link"
import { openWhatsApp } from "@/lib/whatsapp"

export default function OnboardingPage() {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({})

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [id]: checked }))
  }

  const handleWhatsAppClick = () =>
    openWhatsApp(
      "¡Hola! 👋 Soy nuevo en la plataforma y me gustaría recibir orientación sobre cómo comenzar mi emprendimiento turístico en La Guajira. ¿Podrían ayudarme?",
    )

  const checklistItems = [
    {
      id: "idea",
      label: "¿Ya tienes una idea de negocio turístico?",
      description: "Ecoturismo, turismo cultural, hospedaje, gastronomía, etc.",
    },
    {
      id: "name",
      label: "¿Tienes nombre registrado para tu emprendimiento?",
      description: "Registro de marca o nombre comercial",
    },
    {
      id: "location",
      label: "¿Conoces la ubicación donde desarrollarás tu proyecto?",
      description: "Riohacha, Cabo de la Vela, Punta Gallinas, etc.",
    },
    {
      id: "team",
      label: "¿Tienes un equipo o socios para tu emprendimiento?",
      description: "Familiares, amigos o colaboradores interesados",
    },
  ]

  const actionCards = [
    {
      id: "learn",
      title: "Aprende lo básico",
      description: "Descubre los fundamentos del turismo sostenible y cómo crear un plan de negocio exitoso",
      icon: BookOpen,
      iconColor: "text-turquoise-600",
      bgColor: "bg-turquoise-50",
      borderColor: "border-turquoise-200",
      hoverColor: "hover:bg-turquoise-100",
      link: "#training",
      emoji: "📚",
    },
    {
      id: "funding",
      title: "Encuentra apoyo",
      description: "Explora programas de financiación, becas y oportunidades disponibles para tu proyecto",
      icon: DollarSign,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      hoverColor: "hover:bg-green-100",
      link: "#opportunities",
      emoji: "💰",
    },
    {
      id: "chat",
      title: "Habla con alguien",
      description: "Conecta con nuestro equipo de apoyo para recibir orientación personalizada",
      icon: MessageCircle,
      iconColor: "text-coral-600",
      bgColor: "bg-coral-50",
      borderColor: "border-coral-200",
      hoverColor: "hover:bg-coral-100",
      action: handleWhatsAppClick,
      emoji: "💬",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 to-white">
      {/* Navigation Header */}
      <div className="bg-white border-b border-amber-200/50 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="flex items-center space-x-2 text-amber-800 hover:text-turquoise-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Volver al inicio</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-turquoise-500 to-coral-500 rounded-full mb-4">
              <Lightbulb className="h-10 w-10 text-white" />
            </div>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-amber-900 mb-4">Comienza Tu Emprendimiento</h1>

          <p className="text-lg text-amber-700 max-w-2xl mx-auto leading-relaxed">
            Te damos la bienvenida a tu viaje emprendedor. Estamos aquí para apoyarte en cada paso del camino hacia el
            éxito de tu negocio turístico en La Guajira.
          </p>

          <div className="flex items-center justify-center space-x-2 mt-6 text-sm text-amber-600">
            <Users className="h-4 w-4" />
            <span>Más de 500 emprendedores ya han comenzado su viaje con nosotros</span>
          </div>
        </div>

        {/* Action Cards */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-amber-900 text-center mb-8">¿Por dónde quieres empezar?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {actionCards.map((card) => {
              const IconComponent = card.icon

              if (card.action) {
                return (
                  <Card
                    key={card.id}
                    className={`${card.borderColor} border-2 ${card.hoverColor} transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group`}
                    onClick={card.action}
                  >
                    <CardHeader className="text-center pb-4">
                      <div
                        className={`mx-auto p-4 rounded-full ${card.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <div className="text-3xl mb-2">{card.emoji}</div>
                        <IconComponent className={`h-8 w-8 ${card.iconColor} mx-auto`} />
                      </div>
                      <CardTitle className="text-xl font-bold text-amber-900 group-hover:text-turquoise-700 transition-colors">
                        {card.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-amber-700 leading-relaxed mb-4">{card.description}</p>
                      <div className="flex items-center justify-center text-sm font-medium text-turquoise-700">
                        <span>Comenzar ahora</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </CardContent>
                  </Card>
                )
              }

              return (
                <Link key={card.id} href={card.link}>
                  <Card
                    className={`${card.borderColor} border-2 ${card.hoverColor} transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group h-full`}
                  >
                    <CardHeader className="text-center pb-4">
                      <div
                        className={`mx-auto p-4 rounded-full ${card.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <div className="text-3xl mb-2">{card.emoji}</div>
                        <IconComponent className={`h-8 w-8 ${card.iconColor} mx-auto`} />
                      </div>
                      <CardTitle className="text-xl font-bold text-amber-900 group-hover:text-turquoise-700 transition-colors">
                        {card.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-amber-700 leading-relaxed mb-4">{card.description}</p>
                      <div className="flex items-center justify-center text-sm font-medium text-turquoise-700">
                        <span>Comenzar ahora</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Readiness Checklist */}
        <Card className="border-2 border-amber-200 bg-amber-50/50">
          <CardHeader>
            <CardTitle className="text-xl text-amber-900 flex items-center">
              <Target className="h-6 w-6 mr-3" />
              Evalúa tu preparación
            </CardTitle>
            <p className="text-amber-700">Responde estas preguntas para entender mejor en qué etapa te encuentras</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {checklistItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-amber-200"
                >
                  <Checkbox
                    id={item.id}
                    checked={checkedItems[item.id] || false}
                    onCheckedChange={(checked) => handleCheckboxChange(item.id, checked as boolean)}
                    className="mt-1 data-[state=checked]:bg-turquoise-600 data-[state=checked]:border-turquoise-600"
                  />
                  <div className="flex-1">
                    <label htmlFor={item.id} className="text-amber-900 font-medium cursor-pointer block mb-1">
                      {item.label}
                    </label>
                    <p className="text-sm text-amber-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Indicator */}
            <div className="mt-6 p-4 bg-white rounded-lg border border-amber-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-amber-900">Tu progreso</span>
                <span className="text-sm text-amber-700">
                  {Object.values(checkedItems).filter(Boolean).length} de {checklistItems.length}
                </span>
              </div>
              <div className="w-full bg-amber-200 rounded-full h-2">
                <div
                  className="bg-turquoise-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(Object.values(checkedItems).filter(Boolean).length / checklistItems.length) * 100}%`,
                  }}
                />
              </div>
              <p className="text-xs text-amber-600 mt-2">
                {Object.values(checkedItems).filter(Boolean).length === checklistItems.length
                  ? "¡Excelente! Pareces estar bien preparado para comenzar."
                  : "No te preocupes si no tienes todo listo. Estamos aquí para ayudarte en cada paso."}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Encouragement Section */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-turquoise-50 to-coral-50 rounded-2xl border border-turquoise-200">
          <Heart className="h-12 w-12 text-coral-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-amber-900 mb-4">Tu sueño emprendedor importa</h3>
          <p className="text-amber-700 max-w-2xl mx-auto leading-relaxed mb-6">
            Cada gran emprendimiento comenzó con una idea y el valor de dar el primer paso. En La Guajira, tu proyecto
            puede transformar no solo tu vida, sino también tu comunidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleWhatsAppClick}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Hablar con un asesor
            </Button>
            <Link href="#opportunities">
              <Button
                variant="outline"
                className="border-2 border-turquoise-500 text-turquoise-700 hover:bg-turquoise-50 font-semibold px-6 py-3 rounded-full"
              >
                Ver oportunidades
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
