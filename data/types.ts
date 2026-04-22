import type { LucideIcon } from "lucide-react"

export type OpportunityStatus = "Activo" | "Permanente" | "Cerrado"

// Matching taxonomy used by the Opportunity Finder on the homepage.
// Kept intentionally small so the quiz stays to two short questions.
export type MatchAudience =
  | "youth"
  | "wayuu"
  | "pyme"
  | "startup-team"
  | "tech-team"
  | "community-assoc"

export type MatchSupport =
  | "funding"
  | "training"
  | "mentorship"
  | "credit"
  | "infrastructure"
  | "promotion"

export type MatchStage = "idea" | "early" | "operating"

export interface MatchTags {
  audiences: MatchAudience[]
  supports: MatchSupport[]
  stages: MatchStage[]
}

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
  match: MatchTags
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
  match: MatchTags
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
  description: string
  contact: {
    phone: string
    email: string
    website: string
  }
  rating: number
  reviews: number
  image: string
  tags: string[]
}
