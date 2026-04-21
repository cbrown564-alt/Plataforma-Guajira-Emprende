export const MUNICIPALITIES = [
  "Riohacha",
  "Maicao",
  "Uribia",
  "Manaure",
  "Albania",
  "Barrancas",
  "Distracción",
  "El Molino",
  "Fonseca",
  "Hatonuevo",
  "La Jagua del Pilar",
  "San Juan del Cesar",
  "Villanueva",
  "Dibulla",
  "Otra comunidad",
] as const

export type Municipality = (typeof MUNICIPALITIES)[number]
