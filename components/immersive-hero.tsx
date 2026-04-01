"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Play, MapPin, Users, Briefcase, Award } from "lucide-react"

// Animated counter hook
function useCountUp(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(!startOnView)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!startOnView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [startOnView, hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }, [end, duration, hasStarted])

  return { count, ref }
}

// Wayuu geometric pattern component
function WayuuPattern({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wayuuGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(25, 85%, 45%)" stopOpacity="0.8" />
          <stop offset="50%" stopColor="hsl(45, 90%, 50%)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(180, 45%, 35%)" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      {/* Diamond pattern */}
      <polygon points="50,10 90,50 50,90 10,50" stroke="url(#wayuuGradient)" strokeWidth="2" fill="none" />
      <polygon points="50,25 75,50 50,75 25,50" stroke="url(#wayuuGradient)" strokeWidth="1.5" fill="none" />
      <polygon points="50,40 60,50 50,60 40,50" fill="url(#wayuuGradient)" />
      {/* Corner accents */}
      <line x1="10" y1="10" x2="25" y2="25" stroke="url(#wayuuGradient)" strokeWidth="1.5" />
      <line x1="90" y1="10" x2="75" y2="25" stroke="url(#wayuuGradient)" strokeWidth="1.5" />
      <line x1="10" y1="90" x2="25" y2="75" stroke="url(#wayuuGradient)" strokeWidth="1.5" />
      <line x1="90" y1="90" x2="75" y2="75" stroke="url(#wayuuGradient)" strokeWidth="1.5" />
      {/* Zigzag lines */}
      <polyline points="5,50 15,40 25,50 35,40 45,50" stroke="url(#wayuuGradient)" strokeWidth="1" fill="none" />
      <polyline points="55,50 65,60 75,50 85,60 95,50" stroke="url(#wayuuGradient)" strokeWidth="1" fill="none" />
    </svg>
  )
}

// Stat card component
function StatCard({ 
  icon: Icon, 
  value, 
  suffix = "", 
  label, 
  delay = 0 
}: { 
  icon: React.ElementType
  value: number
  suffix?: string
  label: string
  delay?: number
}) {
  const { count, ref } = useCountUp(value, 2000)
  
  return (
    <div 
      ref={ref}
      className="flex flex-col items-center p-4 sm:p-6 rounded-2xl glass text-white opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="p-3 rounded-xl bg-white/10 mb-3">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
        {count}{suffix}
      </div>
      <div className="text-sm sm:text-base text-white/80 text-center mt-1">
        {label}
      </div>
    </div>
  )
}

// Scrolling text marquee
function ScrollingMarquee() {
  const items = [
    "Turismo Sostenible",
    "Cultura Wayuu",
    "Emprendimiento",
    "La Guajira",
    "Comunidad",
    "Oportunidades",
    "Tradición",
    "Innovación",
  ]
  
  return (
    <div className="overflow-hidden whitespace-nowrap py-4 bg-gradient-to-r from-primary via-accent to-secondary">
      <div className="animate-marquee inline-flex">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="mx-8 text-lg font-semibold text-white/90 tracking-wide">
            {item} <span className="mx-4 opacity-50">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function ImmersiveHero() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        if (rect.bottom > 0) {
          setScrollY(window.scrollY)
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <section ref={heroRef} className="relative min-h-[200vh] overflow-hidden bg-foreground">
        {/* Fixed hero content that transforms on scroll */}
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Parallax background layers */}
          <div className="absolute inset-0">
            {/* Base image layer */}
            <div 
              className="absolute inset-0 parallax-layer"
              style={{ transform: `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0002})` }}
            >
              <Image
                src="/images/guajira-coastline.jpg"
                alt="La Guajira coastline where golden desert cliffs meet turquoise Caribbean waters"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Gradient overlays */}
            <div 
              className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70"
              style={{ opacity: Math.min(1, 0.6 + scrollY * 0.001) }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
          </div>

          {/* Animated Wayuu patterns */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <WayuuPattern 
              className="absolute -top-20 -left-20 w-64 h-64 opacity-20 animate-pattern-rotate" 
            />
            <WayuuPattern 
              className="absolute top-1/4 -right-10 w-48 h-48 opacity-15 animate-float" 
            />
            <WayuuPattern 
              className="absolute bottom-20 left-1/4 w-32 h-32 opacity-20 animate-pattern-shift" 
            />
            <WayuuPattern 
              className="absolute top-1/3 left-10 w-24 h-24 opacity-10 animate-pulse-glow" 
            />
          </div>

          {/* Main content */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-16">
            <div className="max-w-5xl mx-auto text-center">
              {/* Government badge */}
              <div 
                className="inline-flex items-center px-4 py-2 rounded-full glass mb-6 sm:mb-8 opacity-0 animate-fade-in-up"
                style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
              >
                <span className="text-white text-sm font-medium">
                  Gobierno de Colombia • Ministerio de Comercio, Industria y Turismo
                </span>
              </div>

              {/* Main headline with staggered animation */}
              <h1 className="space-y-2 sm:space-y-4">
                <span 
                  className="block text-4xl sm:text-6xl lg:text-8xl font-bold text-white leading-none opacity-0 animate-fade-in-up"
                  style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
                >
                  Empodera tu
                </span>
                <span 
                  className="block text-4xl sm:text-6xl lg:text-8xl font-bold gradient-text leading-none opacity-0 animate-fade-in-up"
                  style={{ 
                    animationDelay: '600ms', 
                    animationFillMode: 'forwards',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #14b8a6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Emprendimiento
                </span>
                <span 
                  className="block text-2xl sm:text-4xl lg:text-5xl font-medium text-white/90 mt-2 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}
                >
                  en La Guajira
                </span>
              </h1>

              {/* Subheading */}
              <p 
                className="mt-6 sm:mt-8 text-lg sm:text-xl lg:text-2xl text-white/85 max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in-up"
                style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}
              >
                Conectamos emprendedores wayuu y guajiros con oportunidades reales. 
                Accede a apoyos, formación y una comunidad que impulsa tu negocio turístico.
              </p>

              {/* CTA Buttons */}
              <div 
                className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up"
                style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}
              >
                <Link href="/onboarding">
                  <Button
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 py-6 h-auto rounded-full shadow-2xl transform hover:scale-105 transition-smooth min-h-[56px]"
                  >
                    Comienza Tu Emprendimiento
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white font-semibold text-lg px-8 py-6 h-auto rounded-full backdrop-blur-sm min-h-[56px]"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Ver Historia
                </Button>
              </div>
            </div>

            {/* Stats section */}
            <div 
              className="absolute bottom-24 sm:bottom-32 left-0 right-0 px-4"
              style={{ 
                opacity: Math.max(0, 1 - scrollY * 0.003),
                transform: `translateY(${scrollY * 0.2}px)`
              }}
            >
              <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <StatCard icon={MapPin} value={12} label="Municipios" delay={1400} />
                <StatCard icon={Users} value={500} suffix="+" label="Empleos creados" delay={1500} />
                <StatCard icon={Briefcase} value={150} suffix="+" label="Emprendimientos" delay={1600} />
                <StatCard icon={Award} value={25} label="Programas activos" delay={1700} />
              </div>
            </div>

            {/* Scroll indicator */}
            <div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 opacity-0 animate-fade-in-up"
              style={{ 
                animationDelay: '1800ms', 
                animationFillMode: 'forwards',
                opacity: Math.max(0, 1 - scrollY * 0.005)
              }}
            >
              <span className="text-white/70 text-sm font-medium tracking-wide">Descubre más</span>
              <div className="animate-bounce">
                <ChevronDown className="h-6 w-6 text-white/70" />
              </div>
            </div>
          </div>
        </div>

        {/* Story section that appears on scroll */}
        <div 
          className="relative z-20 bg-gradient-to-b from-transparent via-background/95 to-background"
          style={{ marginTop: '-50vh' }}
        >
          <div className="h-[50vh]" />
          
          {/* Entrepreneur story preview */}
          <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Story image */}
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/guajira-coastline.jpg"
                    alt="Emprendedor wayuu compartiendo su historia de éxito"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white/90 text-sm font-medium uppercase tracking-wider">Historia de éxito</p>
                    <p className="text-white text-xl sm:text-2xl font-bold mt-1">
                      {"\""}La plataforma cambió mi vida y la de mi comunidad{"\""}
                    </p>
                    <p className="text-white/80 mt-2">- María, emprendedora de Uribia</p>
                  </div>
                  {/* Play button overlay */}
                  <button className="absolute inset-0 flex items-center justify-center group">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-smooth group-hover:scale-110">
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1" fill="white" />
                    </div>
                  </button>
                </div>

                {/* Story text */}
                <div className="space-y-6">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
                    Historias que inspiran
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                    Donde el desierto <span className="text-primary">encuentra el mar</span>, 
                    nacen los sueños
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    La Guajira es única en el mundo: dunas doradas que abrazan aguas turquesas, 
                    una cultura ancestral wayuu que perdura, y emprendedores que transforman 
                    tradición en oportunidad.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Esta plataforma existe para conectarte con los recursos que necesitas: 
                    financiamiento, capacitación, mentoría y una red de apoyo que entiende 
                    tu realidad.
                  </p>
                  <Link href="#opportunities">
                    <Button 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-8 py-6 h-auto mt-4 min-h-[56px]"
                    >
                      Explorar oportunidades
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling marquee */}
      <ScrollingMarquee />
    </>
  )
}
