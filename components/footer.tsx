import Link from 'next/link'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-amber-950 text-amber-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <p className="font-bold text-xl text-white mb-3">
              Guajira<span className="text-turquoise-400">Emprende</span>
            </p>
            <p className="text-sm leading-relaxed text-amber-300">
              Plataforma de información para emprendedores turísticos wayuu y guajiros.
              Centralizamos los programas de apoyo que ya existen para que sean más accesibles.
            </p>
          </div>

          <div>
            <p className="font-semibold text-white mb-4">Explorar</p>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Programas de Apoyo', href: '/#programas' },
                { label: 'Centro de Aprendizaje', href: '/#aprender' },
                { label: 'Directorio', href: '/#directorio' },
                { label: 'Únete a la Comunidad', href: '/unete' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white mb-4">Contexto Académico</p>
            <p className="text-sm leading-relaxed text-amber-300">
              Este sitio es una propuesta académica desarrollada como parte de una investigación
              sobre emprendimiento turístico en La Guajira, Colombia. No representa una entidad
              gubernamental oficial.
            </p>
          </div>
        </div>

        <div className="border-t border-amber-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-400">
          <p>© {year} Plataforma Guajira Emprende. Propuesta académica.</p>
          <p>
            La información sobre programas proviene de fuentes oficiales del gobierno colombiano.
            Verificar vigencia en cada convocatoria.
          </p>
        </div>
      </div>
    </footer>
  )
}
