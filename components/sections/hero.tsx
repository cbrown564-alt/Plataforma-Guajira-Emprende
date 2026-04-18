import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/guajira-coastline.jpg"
          alt="Costa de La Guajira — donde el desierto encuentra el mar Caribe"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/65" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
            <span className="text-white text-sm font-medium">
              Propuesta Académica — Emprendimiento Turístico en La Guajira
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
            Conectamos emprendedores turísticos de{' '}
            <span className="text-yellow-300">La Guajira</span>
            <span className="block mt-2 text-3xl sm:text-4xl lg:text-5xl font-semibold text-white/90">
              con los recursos que ya existen
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Programas de financiación, formación y apoyo centralizados en un solo lugar —
            para emprendedores wayuu y guajiros que quieren hacer crecer sus negocios turísticos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a href="#programas">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-base px-8 py-4 h-auto rounded-full shadow-xl transition-all duration-200 hover:scale-105"
              >
                Ver Programas Disponibles
              </Button>
            </a>
            <Link href="/unete">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white bg-white/10 hover:bg-white/20 font-semibold text-base px-8 py-4 h-auto rounded-full transition-all duration-200"
              >
                Unirme a la Comunidad
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-1">
        <span className="text-white/60 text-xs tracking-widest uppercase">Explorar</span>
        <ChevronDown className="h-5 w-5 text-white/60 animate-bounce" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  )
}
