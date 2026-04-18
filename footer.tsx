import { Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* About this project */}
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
              Prototipo de investigación que propone una plataforma centralizada para conectar a
              emprendedores turísticos wayuu y guajiros con los programas, recursos y referentes que ya
              existen en Colombia.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>tesis@guajiraemprende.co</span>
              </div>
            </div>
          </div>

          {/* Site map */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-turquoise-300">Sitio</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#programas" className="text-gray-300 hover:text-turquoise-300 transition-colors duration-200">
                  Programas
                </a>
              </li>
              <li>
                <a href="#aprender" className="text-gray-300 hover:text-turquoise-300 transition-colors duration-200">
                  Aprender
                </a>
              </li>
              <li>
                <a href="#directorio" className="text-gray-300 hover:text-turquoise-300 transition-colors duration-200">
                  Directorio
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-gray-300 hover:text-turquoise-300 transition-colors duration-200">
                  Contacto
                </a>
              </li>
              <li>
                <a href="/unete" className="text-gray-300 hover:text-turquoise-300 transition-colors duration-200">
                  Únete
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar — Thesis attribution */}
      <div className="border-t border-gray-700 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 text-sm text-gray-400 text-center md:text-left">
            <div>
              Tesis de pregrado · [Autor/a] · [Universidad] · 2026
            </div>
            <div className="text-xs">
              Prototipo académico — no es un servicio oficial del gobierno.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
