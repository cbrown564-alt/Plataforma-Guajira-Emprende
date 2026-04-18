"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ArrowLeft,
  Users,
  MapPin,
  Mail,
  CheckCircle,
  Heart,
  Sparkles,
  ArrowRight,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/REPLACE_ME"

export default function JoinCommunityPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    municipio: "",
    contacto: "",
    tipoApoyo: [] as string[],
    descripcion: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

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
    setErrorMessage(null)

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.nombre,
          municipio: formData.municipio,
          contacto: formData.contacto,
          tipoApoyo: formData.tipoApoyo.join(", "),
          descripcion: formData.descripcion,
        }),
      })

      if (!response.ok) {
        throw new Error(`Formspree responded with ${response.status}`)
      }

      setIsSubmitted(true)
    } catch (err) {
      setErrorMessage(
        "No pudimos enviar tu registro. Verifica tu conexión o escríbenos a tesis@guajiraemprende.co.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50/30 to-white">
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
          <Card className="border-2 border-green-200 bg-green-50 text-center">
            <CardContent className="pt-12 pb-8">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
              </div>

              <h1 className="text-3xl font-bold text-green-900 mb-4">¡Gracias por tu registro!</h1>

              <p className="text-lg text-green-700 mb-6 leading-relaxed">
                Recibimos tus datos, <strong>{formData.nombre}</strong>. Forman parte del trabajo de campo de
                la tesis y nos ayudan a entender mejor las necesidades de los emprendedores en La Guajira.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/" className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full border-2 border-turquoise-500 text-turquoise-700 hover:bg-turquoise-50 font-semibold py-3 rounded-full"
                  >
                    Volver al inicio
                  </Button>
                </Link>
                <Link href="/#programas" className="flex-1">
                  <Button className="w-full bg-turquoise-600 hover:bg-turquoise-700 text-white font-semibold py-3 rounded-full">
                    Ver programas
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 to-white">
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
        <div className="text-center mb-8">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-turquoise-500 to-coral-500 rounded-full mb-4">
              <Users className="h-10 w-10 text-white" />
            </div>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-amber-900 mb-4">Únete</h1>

          <p className="text-lg text-amber-700 leading-relaxed mb-2">
            Cuéntanos sobre tu proyecto. Tus respuestas alimentan el trabajo de campo de la tesis y nos
            ayudan a documentar qué necesitan los emprendedores turísticos de La Guajira.
          </p>

          <div className="flex items-center justify-center space-x-2 text-sm text-amber-600">
            <Heart className="h-4 w-4" />
            <span>Toma menos de 2 minutos</span>
          </div>
        </div>

        <Card className="border-2 border-amber-200 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-amber-900 flex items-center">
              <Sparkles className="h-6 w-6 mr-3 text-turquoise-600" />
              Completa el formulario
            </CardTitle>
            <p className="text-amber-700">Solo necesitamos algunos datos básicos.</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="tu@email.com o +57 300 123 4567"
                />
                <p className="text-xs text-amber-600 mt-1">
                  Puedes usar tu correo electrónico o número de WhatsApp.
                </p>
              </div>

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
                        onCheckedChange={(checked) =>
                          handleSupportTypeChange(support.id, checked as boolean)
                        }
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

              <div>
                <label className="block text-sm font-medium text-amber-800 mb-2">
                  Cuéntanos sobre tu proyecto (opcional)
                </label>
                <textarea
                  rows={4}
                  value={formData.descripcion}
                  onChange={(e) => handleInputChange("descripcion", e.target.value)}
                  className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise-500 focus:border-transparent resize-none"
                  placeholder="¿Qué haces hoy? ¿Qué te gustaría desarrollar?"
                />
              </div>

              {errorMessage && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-turquoise-600 hover:bg-turquoise-700 text-white font-bold py-4 rounded-full shadow-lg transition-all duration-200 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar mis datos
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-amber-600">
                Tus datos se envían a la persona responsable de la tesis y se usan únicamente con fines
                académicos.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
