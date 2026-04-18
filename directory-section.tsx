"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, ExternalLink, Info } from "lucide-react"

type Business = {
  id: string
  name: string
  category: string
  location: string
  description: string
  link?: string
}

// Placeholder list pending fieldwork verification.
// Replace each entry with verified information from the thesis fieldwork
// or public sources (Google Maps, RNT, Cámara de Comercio de La Guajira).
const businesses: Business[] = [
  {
    id: "research-pending-1",
    name: "Pendiente de verificación",
    category: "Turismo Cultural",
    location: "Alta Guajira",
    description:
      "Reemplazar con un emprendimiento verificado durante el trabajo de campo (nombre, ubicación, contacto real).",
  },
  {
    id: "research-pending-2",
    name: "Pendiente de verificación",
    category: "Hospedaje",
    location: "Cabo de la Vela",
    description: "Reemplazar con una posada o ranchería verificable.",
  },
  {
    id: "research-pending-3",
    name: "Pendiente de verificación",
    category: "Gastronomía",
    location: "Riohacha",
    description: "Reemplazar con un restaurante con presencia verificable.",
  },
  {
    id: "research-pending-4",
    name: "Pendiente de verificación",
    category: "Artesanías",
    location: "Manaure / Uribia",
    description: "Reemplazar con un taller wayuu con contacto verificado.",
  },
]

const categories = ["Todos", "Turismo Cultural", "Hospedaje", "Gastronomía", "Artesanías", "Ecoturismo"]

export default function DirectorySection() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const filtered = useMemo(
    () =>
      selectedCategory === "Todos"
        ? businesses
        : businesses.filter((b) => b.category === selectedCategory),
    [selectedCategory],
  )

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-turquoise-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 mb-4">Directorio</h2>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Emprendimientos turísticos verificados durante el trabajo de campo de la tesis. La idea: que
            quien aterriza en esta página pueda llegar directamente a quienes ya están operando.
          </p>
        </div>

        {/* Research-pending notice */}
        <div className="max-w-3xl mx-auto mb-10 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-900">
          <Info className="h-5 w-5 flex-shrink-0 mt-0.5 text-amber-700" />
          <p>
            <strong>Nota del autor:</strong> el contenido de este directorio se completará con datos
            recolectados en el trabajo de campo. Las tarjetas a continuación son marcadores y serán
            reemplazadas por información verificable.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                selectedCategory === cat
                  ? "bg-amber-900 text-white border-amber-900"
                  : "bg-white text-amber-800 border-amber-200 hover:border-amber-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((business) => (
            <Card key={business.id} className="border border-gray-200 bg-white">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800 font-medium">
                    {business.category}
                  </span>
                </div>
                <CardTitle className="text-lg font-bold text-amber-900">{business.name}</CardTitle>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {business.location}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-amber-700 leading-relaxed">{business.description}</p>
                {business.link && (
                  <a
                    href={business.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-3 text-sm text-turquoise-700 hover:text-turquoise-900 font-medium"
                  >
                    Ver más
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
