"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Users, MapPin, Mail, MessageCircle, CheckCircle, Heart, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import { openWhatsApp } from "@/lib/whatsapp"
import { siteConfig, whatsappMessages } from "@/lib/site-config"

export default function JoinCommunityPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    municipio: "",
    contacto: "",
    tipoApoyo: [] as string[],
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const supportTypes = [
    { id: "financiacion", label: "Financiación para mi proyecto", icon: "💰" },
    { id: "formacion", label: "Capacitación y formación", icon: "📚" },
    { id: "mentoria", label: "Mentoría y acompañamiento", icon: "🤝" },
    { id: "networking", label: "Conexiones y networking", icon: "🌐" },
    { id: "marketing", label: "Marketing y promoción", icon: "📢" },
    { id: "legal", label: "Asesoría legal y registros", icon: "📋" },
  ]

  const municipalities = [
    "Riohacha",
    "Maicao",
    "Uribia",
    "Manaure",
    "Albania",
    "Barrancas",
    "Distracción",
    "El Molino",
    "Fonseca",
    "Hatonuevo",
    "La Jagua del Pilar",
    "San Juan del Cesar",
    "Villanueva",
    "Dibulla",
    "Otra comunidad",
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSupportTypeChange = (supportId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      tipoApoyo: checked ? [...prev.tipoApoyo, supportId] : prev.tipoApoyo.filter((id) => id !== supportId),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  const handleWhatsAppBroadcast = () => {
    openWhatsApp(whatsappMessages.joinBroadcast(formData.nombre, formData.municipio))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50/30 to-white">
        {/* Navigation Header */}
        <div className="bg-white border-b border-green-200/50 sticky top-0 z-40 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <Link
              href="/"
              className="flex items-center space-x-2 text-green-800 hover:text-turquoise-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Volver al inicio</span>
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-2xl">
          {/* Success Message */}
          <Card className="border-2 border-green-200 bg-green-50 text-center">
            <CardContent className="pt-12 pb-8">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
              </div>

              <h1 className="text-3xl font-bold text-green-900 mb-4">¡Bienvenido a la comunidad!</h1>

              <p className="text-lg text-green-700 mb-8 leading-relaxed">
                Gracias <strong>{formData.nombre}</strong> por unirte a nuestra comunidad de emprendedores turísticos en
                La Guajira. Pronto recibirás información sobre las oportunidades que mejor se adapten a tus necesidades.
              </p>

              {/* Next Steps */}
              <div className="bg-white rounded-lg p-6 mb-8 border border-green-200">
                <h3 className="text-xl font-bold text-green-900 mb-4">Próximos pasos:</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-turquoise-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                      1
                    </div>
                    <span className="text-green-800">Revisa tu correo electrónico para confirmar tu registro</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-turquoise-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                      2
                    </div>
                    <span className="text-green-800">Explora las oportunidades disponibles en la plataforma</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-turquoise-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                      3
                    </div>
                    <span className="text-green-800">Únete a nuestro grupo de WhatsApp para actualizaciones</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Broadcast CTA */}
              <div className="space-y-4">
                <Button
                  onClick={handleWhatsAppBroadcast}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-full shadow-lg"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Unirme a WhatsApp Broadcast
                </Button>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="#opportunities" className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full border-2 border-turquoise-500 text-turquoise-700 hover:bg-turquoise-50 font-semibold py-3 rounded-full"
                    >
                      Ver Oportunidades
                    </Button>
                  </Link>
                  <Link href="/onboarding" className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full border-2 border-coral-500 text-coral-700 hover:bg-coral-50 font-semibold py-3 rounded-full"
                    >
                      Comenzar Emprendimiento
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

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

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-turquoise-500 to-coral-500 rounded-full mb-4">
              <Users className="h-10 w-10 text-white" />
            </div>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-amber-900 mb-4">Únete Ahora</h1>

          <p className="text-lg text-amber-700 leading-relaxed mb-2">
            Sé parte de nuestra comunidad de emprendedores turísticos en La Guajira.
          </p>

          <div className="flex items-center justify-center space-x-2 text-sm text-amber-600">
            <Heart className="h-4 w-4" />
            <span>Más de 500 emprendedores ya forman parte de nuestra familia</span>
          </div>
        </div>

        {/* Registration Form */}
        <Card className="border-2 border-amber-200 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-amber-900 flex items-center">
              <Sparkles className="h-6 w-6 mr-3 text-turquoise-600" />
              Completa tu registro
            </CardTitle>
            <p className="text-amber-700">Cuéntanos un poco sobre ti para conectarte con las mejores oportunidades</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-2">
                  <Users className="h-4 w-4 inline mr-2" />
                  Nombre completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => handleInputChange("nombre", e.target.value)}
                  className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                  placeholder="Tu nombre completo"
                />
              </div>

              {/* Municipio */}
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-2">
                  <MapPin className="h-4 w-4 inline mr-2" />
                  Municipio o Comunidad *
                </label>
                <select
                  required
                  value={formData.municipio}
                  onChange={(e) => handleInputChange("municipio", e.target.value)}
                  className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                >
                  <option value="">Selecciona tu ubicación</option>
                  {municipalities.map((municipality) => (
                    <option key={municipality} value={municipality}>
                      {municipality}
                    </option>
                  ))}
                </select>
              </div>

              {/* Contacto */}
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-2">
                  <Mail className="h-4 w-4 inline mr-2" />
                  Correo electrónico o WhatsApp *
                </label>
                <input
                  type="text"
                  required
                  value={formData.contacto}
                  onChange={(e) => handleInputChange("contacto", e.target.value)}
                  className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                  placeholder={`tu@email.com o ${siteConfig.whatsapp.display}`}
                />
                <p className="text-xs text-amber-600 mt-1">Puedes usar tu correo electrónico o número de WhatsApp</p>
              </div>

              {/* Tipo de Apoyo */}
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-4">
                  ¿Qué tipo de apoyo buscas? (puedes seleccionar varios)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {supportTypes.map((support) => (
                    <div
                      key={support.id}
                      className="flex items-start space-x-3 p-3 border border-amber-200 rounded-lg hover:bg-amber-50 transition-colors"
                    >
                      <Checkbox
                        id={support.id}
                        checked={formData.tipoApoyo.includes(support.id)}
                        onCheckedChange={(checked) => handleSupportTypeChange(support.id, checked as boolean)}
                        className="mt-1 data-[state=checked]:bg-turquoise-600 data-[state=checked]:border-turquoise-600"
                      />
                      <label htmlFor={support.id} className="flex-1 cursor-pointer">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{support.icon}</span>
                          <span className="text-sm font-medium text-amber-900">{support.label}</span>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-turquoise-600 hover:bg-turquoise-700 text-white font-bold py-4 rounded-full shadow-lg transition-all duration-200 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Procesando...
                  </>
                ) : (
                  <>
                    Únete a la comunidad
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <Card className="mt-8 border-2 border-coral-200 bg-coral-50">
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold text-coral-900 mb-4 text-center">
              ¿Qué obtienes al unirte a nuestra comunidad?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-coral-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">📢</span>
                </div>
                <div>
                  <h4 className="font-semibold text-coral-900">Actualizaciones exclusivas</h4>
                  <p className="text-sm text-coral-700">Sé el primero en conocer nuevas oportunidades</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-coral-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">🤝</span>
                </div>
                <div>
                  <h4 className="font-semibold text-coral-900">Red de contactos</h4>
                  <p className="text-sm text-coral-700">Conecta con otros emprendedores</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-coral-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">📚</span>
                </div>
                <div>
                  <h4 className="font-semibold text-coral-900">Recursos gratuitos</h4>
                  <p className="text-sm text-coral-700">Acceso a guías y herramientas</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-coral-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">🎯</span>
                </div>
                <div>
                  <h4 className="font-semibold text-coral-900">Apoyo personalizado</h4>
                  <p className="text-sm text-coral-700">Orientación según tus necesidades</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
