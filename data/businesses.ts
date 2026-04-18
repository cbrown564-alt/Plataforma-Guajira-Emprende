export type BusinessCategory =
  | 'Turismo Cultural'
  | 'Hospedaje'
  | 'Gastronomía'
  | 'Ecoturismo'
  | 'Artesanías'
  | 'Transporte'

export interface Business {
  id: number
  name: string
  category: BusinessCategory
  location: string
  description: string
  tags: string[]
}

// Representative examples based on the types of tourism businesses active in La Guajira.
// This directory is open for registration — real businesses can submit their profiles via /unete.
export const businesses: Business[] = [
  {
    id: 1,
    name: 'Wayuu Desert Experience',
    category: 'Turismo Cultural',
    location: 'Uribia, La Guajira',
    description:
      'Experiencias culturales auténticas con comunidades wayuu: visitas a rancherías, talleres de tejido de mochilas y gastronomía tradicional preparada por las familias anfitrionas.',
    tags: ['Turismo Cultural', 'Comunidad Wayuu', 'Artesanías', 'Gastronomía'],
  },
  {
    id: 2,
    name: 'Ecohotel Cabo de la Vela',
    category: 'Hospedaje',
    location: 'Cabo de la Vela, La Guajira',
    description:
      'Alojamiento ecológico frente al mar Caribe, construido con materiales locales y energía solar. Gestión 100% familiar con impacto mínimo en el entorno natural.',
    tags: ['Hospedaje', 'Sostenible', 'Energía Solar', 'Vista al Mar'],
  },
  {
    id: 3,
    name: 'Sabores del Caribe Wayuu',
    category: 'Gastronomía',
    location: 'Riohacha, La Guajira',
    description:
      'Cocina wayuu tradicional y mariscos frescos del Caribe. Especialidad en friche, chivo guisado y platos de temporada preparados con recetas de la abuela.',
    tags: ['Gastronomía', 'Cocina Wayuu', 'Mariscos', 'Tradición'],
  },
  {
    id: 4,
    name: 'Punta Gallinas Expeditions',
    category: 'Ecoturismo',
    location: 'Punta Gallinas, La Guajira',
    description:
      'Expediciones al punto más septentrional de Sudamérica, guiadas por miembros de las comunidades locales. Incluye desierto, dunas, manglares y playas vírgenes.',
    tags: ['Ecoturismo', 'Aventura', 'Guías Locales', 'Punta Gallinas'],
  },
  {
    id: 5,
    name: 'Artesanías Wayuu — Taller Manaure',
    category: 'Artesanías',
    location: 'Manaure, La Guajira',
    description:
      'Taller familiar de artesanías wayuu tradicionales: mochilas, chinchorros, wayuuco y joyería en mostacilla. Elaboradas artesanalmente con diseños propios de la comunidad.',
    tags: ['Artesanías', 'Mochilas', 'Chinchorros', 'Comunidad Wayuu'],
  },
]

export const businessCategories: BusinessCategory[] = [
  'Turismo Cultural',
  'Hospedaje',
  'Gastronomía',
  'Ecoturismo',
  'Artesanías',
  'Transporte',
]
