import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 lg:pt-20">
      {/* Background Image - Authentic La Guajira Coastline */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/guajira-coastline.jpg"
          alt="Stunning golden cliffs and turquoise Caribbean waters of La Guajira's coastline, showcasing the unique landscape where desert meets the sea in Colombia's northernmost region"
          fill
          className="object-cover"
          priority
        />
        {/* Subtle overlay to enhance text readability while preserving the natural beauty */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Government Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
            <span className="text-white text-sm font-medium">
              Gobierno de Colombia • Ministerio de Comercio, Industria y Turismo
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight drop-shadow-lg">
            Empodera tu
            <span className="block text-yellow-300">Emprendimiento Turístico</span>
            <span className="block text-turquoise-300 text-3xl sm:text-4xl lg:text-5xl mt-2">en La Guajira</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl lg:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Accede a apoyos, formación y comunidad con un solo clic. Conectamos emprendedores wayuu y guajiros con
            oportunidades reales para hacer crecer sus negocios turísticos.
          </p>

          {/* CTA Button */}
          <div className="pt-4 sm:pt-6">
            <Link href="/onboarding">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg px-8 py-4 h-auto rounded-full shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                Comienza Tu Emprendimiento
              </Button>
            </Link>
          </div>

          {/* Supporting Text */}
          <div className="pt-6 sm:pt-8">
            <p className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto drop-shadow-sm">
              Respaldado por el gobierno colombiano para fortalecer el turismo sostenible y preservar nuestras
              tradiciones culturales
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center space-y-2 animate-fade-in-up">
        <span className="text-white/80 text-sm font-medium tracking-wide">Explora más</span>
        <div className="animate-bounce">
          <ChevronDown className="h-6 w-6 text-white/80" />
        </div>
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-white/10 rounded-full blur-xl animate-pulse" />
      </div>

      {/* Decorative Elements - Inspired by the natural colors in the image */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent z-10" />

      {/* Subtle accent elements that complement the natural landscape */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-yellow-400 via-orange-500 to-coral-500 rounded-full blur-3xl" />
      </div>
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-10">
        <div className="w-full h-full bg-gradient-to-tr from-turquoise-400 via-teal-500 to-blue-500 rounded-full blur-3xl" />
      </div>
    </section>
  )
}
