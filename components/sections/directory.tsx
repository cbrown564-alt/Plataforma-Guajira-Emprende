'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { businesses, businessCategories, type Business, type BusinessCategory } from '@/data/businesses'

export default function Directory() {
  const [selected, setSelected] = useState<BusinessCategory | 'Todos'>('Todos')

  const filtered =
    selected === 'Todos' ? businesses : businesses.filter((b) => b.category === selected)

  return (
    <section id="directorio" className="py-16 lg:py-24 bg-gradient-to-b from-white to-turquoise-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 mb-4">
            Directorio de Emprendimientos
          </h2>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Negocios turísticos en La Guajira. ¿Tienes un emprendimiento? Regístralo gratis.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <CategoryButton
            label={`Todos (${businesses.length})`}
            active={selected === 'Todos'}
            onClick={() => setSelected('Todos')}
          />
          {businessCategories.map((cat) => {
            const count = businesses.filter((b) => b.category === cat).length
            if (count === 0) return null
            return (
              <CategoryButton
                key={cat}
                label={`${cat} (${count})`}
                active={selected === cat}
                onClick={() => setSelected(cat)}
              />
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filtered.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>

        <div className="max-w-xl mx-auto rounded-2xl border-2 border-turquoise-200 bg-turquoise-50 p-8 text-center">
          <h3 className="text-xl font-bold text-turquoise-900 mb-3">
            ¿Tienes un emprendimiento turístico?
          </h3>
          <p className="text-turquoise-700 mb-6 text-sm leading-relaxed">
            Registra tu negocio en el directorio de forma gratuita y conecta con más turistas,
            aliados y oportunidades en La Guajira.
          </p>
          <Link href="/unete">
            <Button className="bg-turquoise-600 hover:bg-turquoise-700 text-white font-semibold px-6 rounded-full">
              Registrar mi Emprendimiento
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

function CategoryButton({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
        active
          ? 'bg-turquoise-700 text-white border-turquoise-700 shadow-md'
          : 'bg-white text-turquoise-700 border-turquoise-300 hover:border-turquoise-500'
      }`}
    >
      {label}
    </button>
  )
}

function BusinessCard({ business }: { business: Business }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 hover:shadow-md hover:border-amber-200 transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-start justify-between mb-3">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700">
          {business.category}
        </span>
      </div>

      <h3 className="text-base font-bold text-amber-900 mb-1">{business.name}</h3>

      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
        <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
        <span>{business.location}</span>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed mb-4">{business.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {business.tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 bg-gray-50 text-gray-500 text-xs rounded-md border border-gray-100">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
