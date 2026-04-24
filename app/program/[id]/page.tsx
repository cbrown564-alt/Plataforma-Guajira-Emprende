import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ProgramDetailPage from "../../../program-detail-page"
import { getProgramById, programs } from "@/data/programs"
import { SITE_URL } from "@/lib/site-config"

const OG_IMAGE_URL = `${SITE_URL}/images/guajira-coastline.jpg`

// Training programs get a Course schema; all others use GovernmentService.
const COURSE_TYPES = new Set(["Formación Gratuita", "Beca de Formación"])

export function generateStaticParams() {
  return programs.map((program) => ({ id: program.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const program = getProgramById(id)

  if (!program) {
    return { title: "Programa no encontrado" }
  }

  const pageUrl = `${SITE_URL}/program/${id}`

  return {
    title: program.title,
    description: program.description,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "article",
      url: pageUrl,
      title: program.title,
      description: program.overview,
      locale: "es_CO",
      siteName: "Guajira Emprende",
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: `${program.title} — Guajira Emprende`,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: program.title,
      description: program.description,
      images: [OG_IMAGE_URL],
    },
  }
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const program = getProgramById(id)
  if (!program) notFound()

  const pageUrl = `${SITE_URL}/program/${id}`
  const isCourse = COURSE_TYPES.has(program.type)

  const programNode = isCourse
    ? {
        "@type": "Course",
        "@id": `${pageUrl}#program`,
        name: program.title,
        description: program.overview,
        url: pageUrl,
        provider: { "@id": `${SITE_URL}/#organization` },
        isAccessibleForFree: true,
        inLanguage: "es",
        educationalLevel: "Básico / Intermedio",
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "blended",
          instructor: {
            "@type": "Organization",
            name: "Ministerio de Comercio, Industria y Turismo de Colombia",
          },
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "COP",
          availability: "https://schema.org/InStock",
        },
      }
    : {
        "@type": "GovernmentService",
        "@id": `${pageUrl}#program`,
        name: program.title,
        description: program.overview,
        url: pageUrl,
        serviceType: program.type,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "La Guajira",
          containedInPlace: { "@type": "Country", name: "Colombia" },
        },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: pageUrl,
          availableLanguage: ["Spanish", "Wayuunaiki"],
        },
      }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      programNode,
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
            name: "Programas y Formación",
            item: `${SITE_URL}/#training`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: program.title,
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
      <ProgramDetailPage id={id} />
    </>
  )
}
