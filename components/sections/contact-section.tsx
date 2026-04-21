"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Building2, Users, Heart } from "lucide-react"
import { openWhatsApp } from "@/lib/whatsapp"

export default function ContactSection() {
  const handleWhatsAppClick = () =>
    openWhatsApp("¡Hola! Me gustaría obtener más información sobre los programas de emprendimiento turístico en La Guajira.")

  const contactMethods = [
    {
      icon: Phone,
      title: "Teléfono",
      info: "+57 (5) 123-4567",
      description: "Lunes a Viernes, 8:00 AM - 5:00 PM",
      color: "text-turquoise-600",
      bgColor: "bg-turquoise-50",
    },
    {
      icon: Mail,
      title: "Email",
      info: "info@guajiraemprende.gov.co",
      description: "Respuesta en 24 horas",
      color: "text-coral-600",
      bgColor: "bg-coral-50",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      info: "+57 300 123 4567",
      description: "Atención inmediata",
      color: "text-green-600",
      bgColor: "bg-green-50",
      action: handleWhatsAppClick,
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
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon
            return (
              <Card
                key={index}
                className={`border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                  method.action ? "cursor-pointer" : ""
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
                  <p className="font-semibold text-gray-900 mb-2">{method.info}</p>
                  <p className="text-sm text-gray-600">{method.description}</p>
                  {method.action && (
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
            {offices.map((office, index) => (
              <Card key={index} className="border border-gray-200">
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
                      {office.services.map((service, serviceIndex) => (
                        <li key={serviceIndex} className="text-sm text-gray-600 flex items-center">
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
            <p className="text-amber-700 text-center">Déjanos tu consulta y nos pondremos en contacto contigo pronto</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-2">Nombre</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                  placeholder="Tu nombre completo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-2">Teléfono</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                  placeholder="+57 300 123 4567"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-800 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-800 mb-2">Mensaje</label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise-500 focus:border-transparent resize-none"
                placeholder="Cuéntanos sobre tu proyecto o consulta..."
              />
            </div>
            <Button className="w-full bg-turquoise-600 hover:bg-turquoise-700 text-white font-semibold py-3 rounded-lg">
              Enviar Mensaje
              <Send className="ml-2 h-4 w-4" />
            </Button>
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
                  onClick={handleWhatsAppClick}
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
