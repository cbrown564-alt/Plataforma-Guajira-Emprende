export type BusinessCategory =
  | "Turismo Cultural"
  | "Hospedaje"
  | "Gastronomía"
  | "Ecoturismo"
  | "Artesanías"
  | "Transporte"

export interface BusinessContact {
  phone: string
  email: string
  website: string
}

export interface Business {
  id: number
  name: string
  category: BusinessCategory
  location: string
  description: string
  contact: BusinessContact
  rating: number
  reviews: number
  image: string
  tags: string[]
}

export interface BusinessCategoryMeta {
  name: BusinessCategory | "Todos"
  color: string
}

export const businessCategoryMeta: BusinessCategoryMeta[] = [
  { name: "Todos", color: "bg-gray-100 text-gray-800" },
  { name: "Turismo Cultural", color: "bg-turquoise-100 text-turquoise-800" },
  { name: "Hospedaje", color: "bg-coral-100 text-coral-800" },
  { name: "Gastronomía", color: "bg-amber-100 text-amber-800" },
  { name: "Ecoturismo", color: "bg-green-100 text-green-800" },
  { name: "Artesanías", color: "bg-purple-100 text-purple-800" },
  { name: "Transporte", color: "bg-blue-100 text-blue-800" },
]

export const businesses: Business[] = [
  {
    id: 1,
    name: "Wayuu Desert Tours",
    category: "Turismo Cultural",
    location: "Uribia, La Guajira",
    description:
      "Experiencias auténticas con comunidades wayuu, incluyendo visitas a rancherías y talleres de artesanías.",
    contact: {
      phone: "+57 300 123 4567",
      email: "info@wayuudesert.com",
      website: "www.wayuudesert.com",
    },
    rating: 4.8,
    reviews: 127,
    image: "/placeholder.svg?height=200&width=300&text=Wayuu+Tours",
    tags: ["Turismo Cultural", "Artesanías", "Comunidad Wayuu"],
  },
  {
    id: 2,
    name: "Cabo Ecohotel",
    category: "Hospedaje",
    location: "Cabo de la Vela, La Guajira",
    description:
      "Hotel ecológico con vista al mar, construido con materiales locales y energía solar.",
    contact: {
      phone: "+57 301 234 5678",
      email: "reservas@caboecohotel.com",
      website: "www.caboecohotel.com",
    },
    rating: 4.6,
    reviews: 89,
    image: "/placeholder.svg?height=200&width=300&text=Cabo+Ecohotel",
    tags: ["Hospedaje", "Sostenible", "Vista al Mar"],
  },
  {
    id: 3,
    name: "Sabores Guajiros",
    category: "Gastronomía",
    location: "Riohacha, La Guajira",
    description:
      "Restaurante especializado en cocina tradicional wayuu y mariscos frescos del Caribe.",
    contact: {
      phone: "+57 302 345 6789",
      email: "contacto@saboresguajiros.com",
      website: "www.saboresguajiros.com",
    },
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=200&width=300&text=Sabores+Guajiros",
    tags: ["Gastronomía", "Mariscos", "Cocina Wayuu"],
  },
  {
    id: 4,
    name: "Aventuras Punta Gallinas",
    category: "Ecoturismo",
    location: "Punta Gallinas, La Guajira",
    description:
      "Expediciones al punto más septentrional de Sudamérica con guías locales especializados.",
    contact: {
      phone: "+57 303 456 7890",
      email: "info@aventuraspunta.com",
      website: "www.aventuraspunta.com",
    },
    rating: 4.9,
    reviews: 203,
    image: "/placeholder.svg?height=200&width=300&text=Punta+Gallinas",
    tags: ["Ecoturismo", "Aventura", "Guías Locales"],
  },
  {
    id: 5,
    name: "Artesanías Wayuu Authentic",
    category: "Artesanías",
    location: "Manaure, La Guajira",
    description:
      "Taller familiar de artesanías wayuu tradicionales, mochilas, hamacas y joyería.",
    contact: {
      phone: "+57 304 567 8901",
      email: "info@wayuuauthentic.com",
      website: "www.wayuuauthentic.com",
    },
    rating: 4.5,
    reviews: 78,
    image: "/placeholder.svg?height=200&width=300&text=Artesanias+Wayuu",
    tags: ["Artesanías", "Mochilas", "Tradición Wayuu"],
  },
  {
    id: 6,
    name: "Posada del Desierto",
    category: "Hospedaje",
    location: "Cabo de la Vela, La Guajira",
    description:
      "Hospedaje familiar con vista al desierto y acceso directo a la playa.",
    contact: {
      phone: "+57 305 678 9012",
      email: "reservas@posadadeldesierto.com",
      website: "www.posadadeldesierto.com",
    },
    rating: 4.3,
    reviews: 92,
    image: "/placeholder.svg?height=200&width=300&text=Posada+Desierto",
    tags: ["Hospedaje", "Familiar", "Playa"],
  },
  {
    id: 7,
    name: "Mariscos del Caribe",
    category: "Gastronomía",
    location: "Riohacha, La Guajira",
    description:
      "Especialistas en mariscos frescos y pescados del Caribe con recetas tradicionales.",
    contact: {
      phone: "+57 306 789 0123",
      email: "info@mariscosdelcaribe.com",
      website: "www.mariscosdelcaribe.com",
    },
    rating: 4.4,
    reviews: 134,
    image: "/placeholder.svg?height=200&width=300&text=Mariscos+Caribe",
    tags: ["Gastronomía", "Mariscos", "Pescados"],
  },
  {
    id: 8,
    name: "Transporte Guajira Express",
    category: "Transporte",
    location: "Riohacha, La Guajira",
    description:
      "Servicio de transporte turístico especializado en rutas por La Guajira.",
    contact: {
      phone: "+57 307 890 1234",
      email: "info@guajiraexpress.com",
      website: "www.guajiraexpress.com",
    },
    rating: 4.2,
    reviews: 67,
    image: "/placeholder.svg?height=200&width=300&text=Transporte+Express",
    tags: ["Transporte", "Turístico", "Rutas"],
  },
]

export function countBusinessesByCategory(
  category: BusinessCategory | "Todos",
): number {
  if (category === "Todos") return businesses.length
  return businesses.filter((b) => b.category === category).length
}
