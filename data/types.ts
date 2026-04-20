import type { LucideIcon } from "lucide-react"

export type OpportunityStatus = "Activo" | "Permanente" | "Cerrado"

export interface FAQ {
  question: string
  answer: string
}

export interface Opportunity {
  id: string
  programId: string
  programName: string
  title: string
  description: string
  summary: string
  fundingType: string
  supportType: string
  supportAmount: string
  deadline: string
  resultsAt?: string
  eligibility: string
  status: OpportunityStatus
  icon: LucideIcon
  iconColor: string
  bgColor: string
  borderColor: string
  requirements: string[]
  applicationSteps: string[]
  faqs: FAQ[]
  applicationUrl?: string
}

export interface TargetAudience {
  label: string
  icon: LucideIcon
  color: string
}

export interface Offering {
  icon: LucideIcon
  title: string
  description: string
  color: string
  bgColor: string
}

export interface Program {
  id: string
  title: string
  subtitle: string
  description: string
  type: string
  typeColor: string
  overview: string
  deadline: string
  eligibility: string
  icon: LucideIcon
  iconColor: string
  bgColor: string
  borderColor: string
  accentColor: string
  stats: {
    beneficiaries: string
    investment: string
  }
  targetAudience: TargetAudience[]
  offerings: Offering[]
  applicationProcess: string
}

export type BusinessCategory =
  | "Turismo Cultural"
  | "Hospedaje"
  | "Gastronomía"
  | "Ecoturismo"
  | "Artesanías"
  | "Transporte"

export interface Business {
  id: string
  name: string
  category: BusinessCategory
  location: string
  municipality?: string
  description: string
  longDescription?: string
  contact: {
    phone: string
    email: string
    website: string
    whatsapp?: string
  }
  rating: number
  reviews: number
  image: string
  tags: string[]
  services?: string[]
  highlights?: string[]
  hours?: string
  founded?: string
  priceRange?: string
}
