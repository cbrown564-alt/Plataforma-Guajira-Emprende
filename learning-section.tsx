import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Video, FileText, GraduationCap, ExternalLink } from "lucide-react"

type Resource = {
  title: string
  description: string
  source: string
  url: string
  type: "course" | "guide" | "video" | "tool"
}

const TYPE_META: Record<Resource["type"], { label: string; icon: typeof BookOpen; color: string }> = {
  course: { label: "Curso gratuito", icon: GraduationCap, color: "text-turquoise-700" },
  guide: { label: "Guía oficial", icon: FileText, color: "text-amber-700" },
  video: { label: "Video", icon: Video, color: "text-coral-700" },
  tool: { label: "Herramienta", icon: BookOpen, color: "text-purple-700" },
}

const resources: Resource[] = [
  {
    title: "SENA Sofía Plus — Cursos de emprendimiento",
    description:
      "Cursos virtuales gratuitos en formulación de proyectos, contabilidad básica y servicio al cliente.",
    source: "SENA",
    url: "https://oferta.senasofiaplus.edu.co/sofia-oferta/",
    type: "course",
  },
  {
    title: "Guías para PYMEs turísticas",
    description:
      "Documentos oficiales del Ministerio de Comercio, Industria y Turismo sobre normatividad y buenas prácticas.",
    source: "MinCIT",
    url: "https://www.mincit.gov.co/minturismo",
    type: "guide",
  },
  {
    title: "Registro Nacional de Turismo (RNT)",
    description: "Paso a paso para registrar tu prestador de servicios turísticos en el RNT.",
    source: "Confecámaras",
    url: "https://rnt.confecamaras.co/",
    type: "guide",
  },
  {
    title: "Cómo registrar tu empresa en Cámara de Comercio",
    description:
      "Guía oficial de la Cámara de Comercio de La Guajira para formalizar tu negocio.",
    source: "CCGuajira",
    url: "https://www.camaraguajira.org/",
    type: "guide",
  },
  {
    title: "Norma Técnica Sectorial de Turismo Sostenible",
    description: "NTS-TS aplicables a alojamientos, agencias y prestadores en Colombia.",
    source: "MinCIT",
    url: "https://www.mincit.gov.co/minturismo/calidad-y-desarrollo-sostenible/normas-tecnicas-sectoriales",
    type: "guide",
  },
  {
    title: "Innpulsa — Recursos para emprendedores",
    description: "Biblioteca de contenidos, webinars y herramientas para escalar emprendimientos en Colombia.",
    source: "iNNpulsa Colombia",
    url: "https://innpulsacolombia.com/recursos",
    type: "tool",
  },
]

export default function LearningSection() {
  return (
    <section id="aprender" className="py-16 lg:py-24 bg-gradient-to-b from-white to-amber-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 mb-4">Recursos para Aprender</h2>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Una selección de cursos, guías y herramientas gratuitas — todas en español y de fuentes oficiales o
            verificadas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => {
            const meta = TYPE_META[resource.type]
            const Icon = meta.icon
            return (
              <a
                key={resource.url}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className="h-full border border-amber-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon className={`h-5 w-5 ${meta.color}`} />
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          {meta.label}
                        </span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-turquoise-600 transition-colors" />
                    </div>
                    <CardTitle className="text-lg font-bold text-amber-900 group-hover:text-turquoise-700 transition-colors">
                      {resource.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-amber-700 leading-relaxed mb-3">{resource.description}</p>
                    <p className="text-xs text-gray-500">Fuente: {resource.source}</p>
                  </CardContent>
                </Card>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
