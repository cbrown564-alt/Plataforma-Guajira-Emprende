import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ArrowRight, Quote, TrendingUp } from "lucide-react"
import Link from "next/link"
import { successStories, impactStats } from "@/data/success-stories"
import type { SuccessStory } from "@/data/types"

export default function SuccessStoriesSection() {
  const featured = successStories[0]
  const gridStories = successStories.slice(1, 4)

  return (
    <section id="stories" className="py-16 lg:py-24 bg-gradient-to-b from-white to-amber-50/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-4">
            <TrendingUp className="h-4 w-4" />
            Casos de Éxito
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 mb-4">
            Historias Que Inspiran
          </h2>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Emprendedores reales de La Guajira que transformaron sus sueños en negocios turísticos prósperos con el apoyo de nuestros programas
          </p>
        </div>

        {/* Featured Story */}
        <div className="mb-10">
          <FeaturedStory story={featured} />
        </div>

        {/* Grid Stories */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {gridStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>

        {/* Impact Stats Bar */}
        <div className="rounded-2xl bg-gradient-to-r from-amber-800 to-amber-900 p-8 lg:p-12 mb-12">
          <p className="text-center text-white/50 text-xs uppercase tracking-widest mb-8 font-medium">
            Impacto Acumulado 2024–2026
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-yellow-300 font-serif mb-2">
                  {stat.value}
                </p>
                <p className="text-white/60 text-sm leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-amber-700 mb-5 text-lg">
            ¿Listo para escribir tu propia historia?
          </p>
          <Link href="/join">
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-10 py-4 h-auto rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Empieza Tu Historia
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

function FeaturedStory({ story }: { story: SuccessStory }) {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-amber-950 via-amber-900 to-stone-900">
      <div className="grid lg:grid-cols-5 min-h-[340px]">
        {/* Content side */}
        <div className="lg:col-span-3 p-8 lg:p-12 flex flex-col justify-center">
          {/* Program + year badges */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${story.programBadgeColor}`}>
              {story.programName}
            </span>
            <span className="text-white/40 text-sm">{story.yearJoined}</span>
            <span className="text-white/40 text-sm">·</span>
            <span className="text-white/40 text-sm">{story.businessType}</span>
          </div>

          {/* Quote */}
          <div className="relative mb-6">
            <Quote className="absolute -top-2 -left-1 h-10 w-10 text-yellow-400/25 fill-yellow-400/10" />
            <p className="text-white/95 text-xl lg:text-2xl font-medium italic leading-relaxed pl-9">
              {story.quote}
            </p>
          </div>

          {/* Attribution */}
          <div className="flex items-center gap-4 mb-8">
            <div
              className={`w-12 h-12 rounded-full ${story.accentBg} flex items-center justify-center text-white font-bold text-xl flex-shrink-0`}
            >
              {story.name.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-white text-lg leading-tight">
                {story.name}, {story.age} años
              </p>
              <p className="text-white/55 text-sm">
                {story.business} · {story.location}
              </p>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3">
            {story.metrics.map((metric) => (
              <div
                key={metric.label}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10"
              >
                <p className="text-yellow-300 font-bold text-lg leading-tight">{metric.after}</p>
                <p className="text-white/35 text-xs line-through leading-tight mt-0.5">{metric.before}</p>
                <p className="text-white/60 text-xs leading-tight mt-1.5">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative right panel — Wayuu-inspired abstract portrait */}
        <div className="hidden lg:flex lg:col-span-2 relative items-center justify-center overflow-hidden">
          {/* Subtle diagonal stripe texture */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, white, white 1px, transparent 1px, transparent 12px)",
            }}
          />
          {/* Radial glow in program color */}
          <div className={`absolute w-72 h-72 rounded-full ${story.accentBg} opacity-20 blur-3xl`} />
          {/* Concentric ring decoration */}
          <div className="relative z-10 flex items-center justify-center">
            <div className="w-56 h-56 rounded-full border border-white/10 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full border border-white/15 flex items-center justify-center">
                <div
                  className={`w-28 h-28 rounded-full ${story.accentBg} bg-opacity-60 flex items-center justify-center`}
                >
                  <span className="text-6xl font-bold text-white/80 font-serif select-none">
                    {story.name.charAt(0)}
                  </span>
                </div>
              </div>
            </div>
            {/* Cardinal-point accent dots */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 w-3 h-3 rounded-full bg-yellow-300/50" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-3 w-3 h-3 rounded-full bg-yellow-300/50" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-3 h-3 rounded-full bg-yellow-300/50" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-3 h-3 rounded-full bg-yellow-300/50" />
          </div>
        </div>
      </div>
    </div>
  )
}

function StoryCard({ story }: { story: SuccessStory }) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 overflow-hidden group">
      {/* Program-color accent stripe */}
      <div className={`h-1 ${story.accentBg}`} />

      <CardHeader className="pb-3">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-12 h-12 rounded-full ${story.accentBg} flex items-center justify-center text-white font-bold text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
          >
            {story.name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-amber-900 leading-tight">{story.name}</p>
            <p className="text-amber-600 text-xs">{story.location}</p>
          </div>
        </div>
        <div className="relative">
          <Quote className="absolute -top-1 -left-1 h-6 w-6 text-amber-200 fill-amber-100" />
          <p className="text-amber-700 italic pl-5 leading-relaxed text-sm line-clamp-3">
            {story.quote}
          </p>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
          {story.business}
        </p>
        {story.metrics.slice(0, 2).map((metric) => (
          <div
            key={metric.label}
            className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
          >
            <span className="text-gray-500 text-xs">{metric.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-300 text-xs line-through">{metric.before}</span>
              <span className="text-green-600 font-bold text-sm">{metric.after}</span>
            </div>
          </div>
        ))}
      </CardContent>

      <CardFooter className="pt-2 pb-4 flex items-center justify-between">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${story.programBadgeColor}`}
        >
          {story.programName}
        </span>
        <span className="text-gray-400 text-xs">{story.yearJoined}</span>
      </CardFooter>
    </Card>
  )
}
