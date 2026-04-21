import Image from "next/image"
import { ExternalLink, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Platform Information */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-turquoise-500 to-teal-600 rounded-lg flex items-center justify-center">
                <div className="w-5 h-5 bg-white rounded-sm transform rotate-45"></div>
              </div>
              <div className="text-xl font-bold">
                <span className="text-orange-300">Plataforma</span>
                <span className="text-turquoise-300 ml-1">Guajira Emprende</span>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Empoderamos a emprendedores wayuu y guajiros con herramientas, financiación y comunidad para desarrollar
              negocios turísticos sostenibles en La Guajira.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@guajiraemprende.gov.co</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+57 (5) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Riohacha, La Guajira, Colombia</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-turquoise-300">Plataforma</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-turquoise-300 transition-colors duration-200 flex items-center group"
                >
                  Acerca de Nosotros
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="#opportunities"
                  className="text-gray-300 hover:text-turquoise-300 transition-colors duration-200"
                >
                  Oportunidades
                </a>
              </li>
              <li>
                <a href="#training" className="text-gray-300 hover:text-turquoise-300 transition-colors duration-200">
                  Formación
                </a>
              </li>
              <li>
                <a
                  href="#success-stories"
                  className="text-gray-300 hover:text-turquoise-300 transition-colors duration-200"
                >
                  Historias de Éxito
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-300 hover:text-turquoise-300 transition-colors duration-200">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-coral-300">Soporte Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#privacy"
                  className="text-gray-300 hover:text-coral-300 transition-colors duration-200 flex items-center group"
                >
                  Política de Privacidad
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="text-gray-300 hover:text-coral-300 transition-colors duration-200 flex items-center group"
                >
                  Términos y Condiciones
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-coral-300 transition-colors duration-200 flex items-center group"
                >
                  Contacto
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#help" className="text-gray-300 hover:text-coral-300 transition-colors duration-200">
                  Centro de Ayuda
                </a>
              </li>
              <li>
                <a href="#accessibility" className="text-gray-300 hover:text-coral-300 transition-colors duration-200">
                  Accesibilidad
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Partners & Sponsors Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <h3 className="text-lg font-semibold mb-6 text-center text-yellow-300">Nuestros Aliados</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {/* Ministry Logo */}
            <div className="flex justify-center">
              <div className="bg-white rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200 w-full max-w-32 h-20 flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=60&width=120&text=MinCIT"
                  alt="Ministerio de Comercio, Industria y Turismo"
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
            </div>

            {/* iNNpulsa Logo */}
            <div className="flex justify-center">
              <div className="bg-white rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200 w-full max-w-32 h-20 flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=60&width=120&text=iNNpulsa"
                  alt="iNNpulsa Colombia"
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
            </div>

            {/* SENA Logo */}
            <div className="flex justify-center">
              <div className="bg-white rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200 w-full max-w-32 h-20 flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=60&width=120&text=SENA"
                  alt="Servicio Nacional de Aprendizaje - SENA"
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Bancóldex Logo */}
            <div className="flex justify-center">
              <div className="bg-white rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200 w-full max-w-32 h-20 flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=60&width=120&text=Bancóldex"
                  alt="Banco de Comercio Exterior de Colombia - Bancóldex"
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2024 Plataforma Guajira Emprende. Todos los derechos reservados.
            </div>
            <div className="text-sm text-gray-400">Una iniciativa del Gobierno de Colombia</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
