import type { Metadata } from "next"
import { notFound } from "next/navigation"
import OpportunityDetailPage from "../../../opportunity-detail-page"
import { getOpportunityById, opportunities } from "@/data/opportunities"

export function generateStaticParams() {
  return opportunities.map((opportunity) => ({ id: opportunity.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const opportunity = getOpportunityById(id)
  if (!opportunity) {
    return { title: "Oportunidad no encontrada | Guajira Emprende" }
  }
  return {
    title: `${opportunity.title} | Guajira Emprende`,
    description: opportunity.description,
  }
}

export default async function OpportunityPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  if (!getOpportunityById(id)) notFound()
  return <OpportunityDetailPage id={id} />
}
