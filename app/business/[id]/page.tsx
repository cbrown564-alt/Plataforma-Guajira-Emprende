import type { Metadata } from "next"
import { notFound } from "next/navigation"
import BusinessDetailPage from "../../../business-detail-page"
import { businesses, getBusinessById } from "@/data/businesses"

export function generateStaticParams() {
  return businesses.map((business) => ({ id: business.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const business = getBusinessById(id)
  if (!business) {
    return { title: "Emprendimiento no encontrado | Guajira Emprende" }
  }
  const description =
    business.longDescription && business.longDescription.length > 160
      ? `${business.longDescription.slice(0, 157).trimEnd()}…`
      : business.longDescription || business.description
  return {
    title: `${business.name} · ${business.category} en ${business.municipality || business.location} | Guajira Emprende`,
    description,
    openGraph: {
      title: `${business.name} | Guajira Emprende`,
      description,
      images: business.image ? [{ url: business.image, alt: business.name }] : undefined,
      type: "website",
    },
  }
}

export default async function BusinessPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  if (!getBusinessById(id)) notFound()
  return <BusinessDetailPage id={id} />
}
