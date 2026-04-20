"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import {
  Building2,
  Clock,
  Heart,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  WHATSAPP_NUMBER,
  whatsappLink,
} from "@/lib/site-config"
import { contactFormSchema, type ContactFormValues } from "@/lib/schemas"

const WHATSAPP_PRESET_MESSAGE =
  "¡Hola! Me gustaría obtener más información sobre los programas de emprendimiento turístico en La Guajira."

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      website: "",
    },
  })

  const openWhatsApp = () => {
    window.open(whatsappLink(WHATSAPP_PRESET_MESSAGE), "_blank", "noopener,noreferrer")
  }

  const onSubmit = handleSubmit(async (values) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean
        error?: string
      }
      if (!response.ok || !data.ok) {
        toast.error(
          data.error ??
            "No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por WhatsApp.",
        )
        return
      }
      toast.success("¡Mensaje enviado! Te responderemos muy pronto.")
      reset()
      setSubmitted(true)
    } catch {
      toast.error("Problema de conexión. Revisa tu internet e intenta de nuevo.")
    }
  })

  const contactMethods = [
    {
      icon: Phone,
      title: "Teléfono",
      info: CONTACT_PHONE,
      description: "Lunes a Viernes, 8:00 AM - 5:00 PM",
      color: "text-turquoise-600",
      bgColor: "bg-turquoise-50",
      href: `tel:${CONTACT_PHONE.replace(/[^\d+]/g, "")}`,
    },
    {
      icon: Mail,
      title: "Email",
      info: CONTACT_EMAIL,
      description: "Respuesta en 24 horas",
      color: "text-coral-600",
      bgColor: "bg-coral-50",
      href: `mailto:${CONTACT_EMAIL}`,
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      info: `+${WHATSAPP_NUMBER}`,
      description: "Atención inmediata",
      color: "text-green-600",
      bgColor: "bg-green-50",
      action: openWhatsApp,
    },
  ]

  const offices = [
    {
      name: "Oficina Principal - Riohacha",
      address: "Calle 15 #3-25, Centro, Riohacha, La Guajira",
      hours: "Lunes a Viernes: 8:00 AM - 5:00 PM",
      services: ["Asesoría presencial", "Talleres de formación", "Registro de proyectos"],
    },
    {
      name: "Punto de Atención - Maicao",
      address: "Carrera 10 #12-45, Maicao, La Guajira",
      hours: "Martes y Jueves: 9:00 AM - 4:00 PM",
      services: ["Asesoría básica", "Información de programas"],
    },
  ]

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-turquoise-50/30 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 mb-4">Contáctanos</h2>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Estamos aquí para apoyarte en tu viaje emprendedor. Ponte en contacto con nuestro equipo para recibir
            orientación personalizada.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method) => {
            const IconComponent = method.icon
            const isAction = Boolean(method.action)
            return (
              <Card
                key={method.title}
                className={`border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                  isAction || method.href ? "cursor-pointer" : ""
                }`}
                onClick={method.action}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto p-4 rounded-full ${method.bgColor} mb-4`}>
                    <IconComponent className={`h-8 w-8 ${method.color}`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-amber-900">{method.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  {method.href ? (
                    <a href={method.href} className="font-semibold text-gray-900 mb-2 block hover:text-turquoise-700">
                      {method.info}
                    </a>
                  ) : (
                    <p className="font-semibold text-gray-900 mb-2">{method.info}</p>
                  )}
                  <p className="text-sm text-gray-600">{method.description}</p>
                  {isAction && (
                    <Button
                      className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-full"
                      onClick={method.action}
                    >
                      Chatear Ahora
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Office Locations */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-amber-900 text-center mb-8">Nuestras Oficinas</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {offices.map((office) => (
              <Card key={office.name} className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-amber-900 flex items-center">
                    <Building2 className="h-6 w-6 mr-3 text-turquoise-600" />
                    {office.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-coral-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{office.address}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-amber-600 flex-shrink-0" />
                    <span className="text-gray-700">{office.hours}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Servicios disponibles:</h4>
                    <ul className="space-y-1">
                      {office.services.map((service) => (
                        <li key={service} className="text-sm text-gray-600 flex items-center">
                          <div className="w-2 h-2 bg-turquoise-500 rounded-full mr-2 flex-shrink-0" />
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Contact Form */}
        <Card className="border-2 border-amber-200 bg-amber-50 max-w-2xl mx-auto mb-12">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-amber-900 text-center flex items-center justify-center">
              <Send className="h-6 w-6 mr-3" />
              Envíanos un Mensaje Rápido
            </CardTitle>
            <p className="text-amber-700 text-center">
              {submitted
                ? "Gracias por escribirnos. Revisaremos tu mensaje y te responderemos pronto."
                : "Déjanos tu consulta y nos pondremos en contacto contigo pronto"}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4" noValidate>
              {/* Honeypot: hidden from users, bots will happily fill it in. */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-website">Sitio web</label>
                <input
                  id="contact-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("website")}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-amber-800 mb-2">
                    Nombre *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                    placeholder="Tu nombre completo"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-sm text-coral-700 mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block text-sm font-medium text-amber-800 mb-2">
                    Teléfono
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    autoComplete="tel"
                    aria-invalid={Boolean(errors.phone)}
                    className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                    placeholder="+57 300 123 4567"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-sm text-coral-700 mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-amber-800 mb-2">
                  Email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                  placeholder="tu@email.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-coral-700 mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-amber-800 mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  aria-invalid={Boolean(errors.message)}
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise-500 focus:border-transparent resize-none"
                  placeholder="Cuéntanos sobre tu proyecto o consulta..."
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-sm text-coral-700 mt-1">{errors.message.message}</p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-turquoise-600 hover:bg-turquoise-700 text-white font-semibold py-3 rounded-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar Mensaje
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Support Team */}
        <div className="text-center">
          <Card className="border-2 border-coral-200 bg-coral-50 max-w-3xl mx-auto">
            <CardContent className="pt-8">
              <div className="flex justify-center mb-6">
                <div className="flex -space-x-4">
                  <div className="w-12 h-12 bg-turquoise-500 rounded-full flex items-center justify-center border-4 border-white">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="w-12 h-12 bg-coral-500 rounded-full flex items-center justify-center border-4 border-white">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center border-4 border-white">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-coral-900 mb-4">Nuestro Equipo Te Espera</h3>
              <p className="text-coral-700 mb-6 max-w-xl mx-auto">
                Contamos con especialistas en turismo, financiación y desarrollo empresarial listos para acompañarte en
                cada paso de tu emprendimiento.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={openWhatsApp}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Hablar por WhatsApp
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-coral-500 text-coral-700 hover:bg-coral-100 font-semibold px-6 py-3 rounded-full"
                >
                  Agendar Cita Presencial
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
