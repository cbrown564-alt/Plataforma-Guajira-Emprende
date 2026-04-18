import { ExternalLink, BookOpen, FileText, Wrench } from 'lucide-react'
import { resources, type Resource, type ResourceType } from '@/data/resources'

const typeConfig: Record<ResourceType, { label: string; icon: React.ElementType; color: string }> =
  {
    curso: { label: 'Curso gratuito', icon: BookOpen, color: 'text-turquoise-600' },
    guia: { label: 'Guía', icon: FileText, color: 'text-amber-600' },
    herramienta: { label: 'Herramienta', icon: Wrench, color: 'text-coral-600' },
  }

const courses = resources.filter((r) => r.type === 'curso')
const guidesAndTools = resources.filter((r) => r.type !== 'curso')

export default function LearningHub() {
  return (
    <section id="aprender" className="py-16 lg:py-24 bg-gradient-to-b from-amber-50/40 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 mb-4">Centro de Aprendizaje</h2>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Recursos gratuitos para que puedas formarte, formalizar tu negocio y postular
            a programas de apoyo con más confianza.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-bold text-turquoise-800 mb-5 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Cursos Gratuitos
            </h3>
            <div className="space-y-4">
              {courses.map((r) => (
                <ResourceCard key={r.id} resource={r} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-amber-800 mb-5 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Guías y Herramientas
            </h3>
            <div className="space-y-4">
              {guidesAndTools.map((r) => (
                <ResourceCard key={r.id} resource={r} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ResourceCard({ resource }: { resource: Resource }) {
  const config = typeConfig[resource.type]
  const Icon = config.icon

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:shadow-md hover:border-amber-200 transition-all duration-200 group"
    >
      <div className="flex-shrink-0 mt-0.5">
        <Icon className={`h-5 w-5 ${config.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            {resource.provider}
          </span>
          {resource.free && (
            <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium flex-shrink-0">
              Gratis
            </span>
          )}
        </div>
        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-turquoise-700 transition-colors leading-snug mb-1">
          {resource.title}
        </h4>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{resource.description}</p>
      </div>
      <ExternalLink className="h-4 w-4 text-gray-300 group-hover:text-turquoise-500 flex-shrink-0 mt-0.5 transition-colors" />
    </a>
  )
}
