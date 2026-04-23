import type { Metadata } from "next"
import { notFound } from "next/navigation"
import OpportunityDetailPage from "../../../opportunity-detail-page"
import { getOpportunityById, opportunities } from "@/data/opportunities"
import { SITE_URL } from "@/lib/site-config"

const OG_IMAGE_URL = `${SITE_URL}/images/guajira-coastline.jpg`

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
    return { title: "Oportunidad no encontrada" }
  }

  const pageUrl = `${SITE_URL}/opportunity/${id}`

  return {
    title: opportunity.title,
    description: opportunity.summary,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "article",
      url: pageUrl,
      title: opportunity.title,
      description: opportunity.summary,
      locale: "es_CO",
      siteName: "Guajira Emprende",
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: `${opportunity.title} — Guajira Emprende`,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: opportunity.title,
      description: opportunity.summary,
      images: [OG_IMAGE_URL],
    },
  }
}

export default async function OpportunityPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const opportunity = getOpportunityById(id)
  if (!opportunity) notFound()

  const pageUrl = `${SITE_URL}/opportunity/${id}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "GovernmentService",
        "@id": `${pageUrl}#service`,
        name: opportunity.title,
        description: opportunity.summary,
        url: pageUrl,
        serviceType: opportunity.fundingType,
        provider: {
          "@id": `${SITE_URL}/#organization`,
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "La Guajira",
          containedInPlace: {
            "@type": "Country",
            name: "Colombia",
          },
        },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: pageUrl,
          availableLanguage: ["Spanish", "Wayuunaiki"],
        },
        offers: {
          "@type": "Offer",
          name: opportunity.fundingType,
          description: opportunity.supportAmount,
          eligibleRegion: {
            "@type": "AdministrativeArea",
            name: "La Guajira, Colombia",
          },
        },
        ...(opportunity.deadline !== "Convocatoria Abierta" &&
        opportunity.deadline !== "Permanente"
          ? {
              availabilityEnds: opportunity.deadline,
            }
          : {}),
      },
      // FAQPage — only emitted when the opportunity has FAQs, which Google
      // can surface as rich results in search.
      ...(opportunity.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${pageUrl}#faq`,
              mainEntity: opportunity.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Oportunidades de Financiación",
            item: `${SITE_URL}/#opportunities`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: opportunity.title,
            item: pageUrl,
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <OpportunityDetailPage id={id} />
    </>
  )
}
