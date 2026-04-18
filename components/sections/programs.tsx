'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import {
  programs,
  programTypeLabels,
  programTypeColors,
  type Program,
  type ProgramType,
} from '@/data/programs'

const filters: Array<{ label: string; value: ProgramType | 'todos' }> = [
  { label: 'Todos', value: 'todos' },
  { label: 'Capital Semilla', value: 'capital' },
  { label: 'Crédito', value: 'credito' },
  { label: 'Formación', value: 'formacion' },
  { label: 'Apoyo Técnico', value: 'apoyo' },
]

export default function Programs() {
  const [activeFilter, setActiveFilter] = useState<ProgramType | 'todos'>('todos')

  const filtered =
    activeFilter === 'todos' ? programs : programs.filter((p) => p.type === activeFilter)

  return (
    <section id="programas" className="py-16 lg:py-24 bg-gradient-to-b from-white to-amber-50/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 mb-4">
            Programas de Apoyo
          </h2>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Financiación, crédito y formación de entidades del gobierno colombiano.
            Cada tarjeta enlaza directamente a la fuente oficial.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeFilter === f.value
                  ? 'bg-amber-800 text-white border-amber-800 shadow-md'
                  : 'bg-white text-amber-800 border-amber-300 hover:border-amber-500'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProgramCard({ program }: { program: Program }) {
  const colors = programTypeColors[program.type]

  return (
    <div
      className={`flex flex-col rounded-2xl border-2 ${colors.border} bg-white p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
    >
      <div className="flex items-start justify-between mb-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}
        >
          {programTypeLabels[program.type]}
        </span>
        <span className="text-xs text-gray-400 font-medium">{program.entity}</span>
      </div>

      <h3 className="text-lg font-bold text-amber-900 mb-2">{program.name}</h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">{program.description}</p>

      <div className="space-y-3 mb-5">
        <div>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            ¿Quién puede aplicar?
          </span>
          <p className="text-sm text-amber-800 mt-1">{program.eligibility}</p>
        </div>
        <div>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Beneficio
          </span>
          <p className="text-sm font-semibold text-amber-900 mt-1">{program.benefit}</p>
        </div>
        <div>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Convocatoria
          </span>
          <p className="text-sm text-amber-700 mt-1">{program.deadline}</p>
        </div>
      </div>

      <a href={program.url} target="_blank" rel="noopener noreferrer" className="mt-auto">
        <Button
          variant="outline"
          className={`w-full border-2 ${colors.border} ${colors.text} hover:${colors.bg} font-semibold rounded-xl`}
        >
          Ver convocatoria oficial
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </a>
    </div>
  )
}
