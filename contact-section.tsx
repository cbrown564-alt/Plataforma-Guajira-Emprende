import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ContactSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-turquoise-50/30 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 mb-4">Contacto</h2>
          <p className="text-lg text-amber-700">
            ¿Tienes feedback sobre la propuesta, conoces un programa que falta o quieres aparecer en el
            directorio? Escríbenos.
          </p>
        </div>

        <Card className="border-2 border-amber-200 bg-amber-50">
          <CardContent className="pt-8 pb-8 text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full border border-amber-200">
              <Mail className="h-7 w-7 text-amber-700" />
            </div>
            <div>
              <p className="text-sm text-amber-700 mb-1">Correo de la tesis</p>
              <a
                href="mailto:tesis@guajiraemprende.co"
                className="text-xl font-semibold text-amber-900 hover:text-turquoise-700 transition-colors"
              >
                tesis@guajiraemprende.co
              </a>
            </div>

            <div className="pt-4 border-t border-amber-200">
              <p className="text-amber-700 mb-4">
                ¿Eres emprendedor o emprendedora en La Guajira? Cuéntanos qué necesitas.
              </p>
              <Link href="/unete">
                <Button className="bg-amber-900 hover:bg-amber-800 text-white font-semibold px-6 py-3 rounded-full">
                  Déjanos tus datos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
