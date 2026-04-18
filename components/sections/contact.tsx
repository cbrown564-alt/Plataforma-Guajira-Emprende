import { Button } from '@/components/ui/button'
import { MessageCircle, Mail, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '573001234567'

export default function Contact() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hola, me interesa conocer más sobre los programas de apoyo para emprendedores en La Guajira.'
  )}`

  return (
    <section id="contacto" className="py-16 lg:py-24 bg-gradient-to-b from-turquoise-50/30 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 mb-4">¿Tienes preguntas?</h2>
          <p className="text-lg text-amber-700 max-w-xl mx-auto">
            Escríbenos por WhatsApp o correo. También puedes registrarte para recibir
            actualizaciones sobre nuevas oportunidades.
          </p>
        </div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-6 rounded-2xl border-2 border-green-200 bg-green-50 hover:shadow-md hover:border-green-400 transition-all duration-200 group"
          >
            <div className="p-3 rounded-full bg-green-500 text-white flex-shrink-0">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-green-900 group-hover:underline">WhatsApp</p>
              <p className="text-sm text-green-700">Respuesta rápida</p>
            </div>
          </a>

          <a
            href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'contacto@guajiraemprende.co'}`}
            className="flex items-center gap-4 p-6 rounded-2xl border-2 border-turquoise-200 bg-turquoise-50 hover:shadow-md hover:border-turquoise-400 transition-all duration-200 group"
          >
            <div className="p-3 rounded-full bg-turquoise-600 text-white flex-shrink-0">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-turquoise-900 group-hover:underline">Correo electrónico</p>
              <p className="text-sm text-turquoise-700">
                {process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'contacto@guajiraemprende.co'}
              </p>
            </div>
          </a>
        </div>

        <div className="max-w-xl mx-auto rounded-2xl border-2 border-amber-200 bg-amber-50 p-8 text-center">
          <h3 className="text-xl font-bold text-amber-900 mb-3">Únete a la comunidad</h3>
          <p className="text-amber-700 text-sm leading-relaxed mb-6">
            Regístrate para recibir notificaciones sobre nuevas convocatorias, eventos de formación
            y oportunidades relevantes para tu emprendimiento.
          </p>
          <Link href="/unete">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 rounded-full">
              Registrarme ahora
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
