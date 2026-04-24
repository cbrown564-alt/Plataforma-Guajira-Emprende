import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { CommandPaletteProvider } from "@/components/command-palette"
import { Toaster } from "@/components/ui/sonner"
import { SITE_URL, CONTACT_EMAIL } from "@/lib/site-config"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const OG_IMAGE_URL = `${SITE_URL}/images/guajira-coastline.jpg`

const SITE_NAME = "Guajira Emprende"
const DEFAULT_TITLE = "Guajira Emprende | Plataforma de Emprendimiento Turístico"
const DEFAULT_DESCRIPTION =
  "Conectamos emprendedores wayuu y guajiros con oportunidades reales: financiación, formación, mentoría y comunidad para hacer crecer tu negocio turístico en La Guajira, Colombia."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: DEFAULT_TITLE,
    template: "%s | Guajira Emprende",
  },

  description: DEFAULT_DESCRIPTION,

  keywords: [
    "emprendimiento turístico La Guajira",
    "wayuu turismo Colombia",
    "fondo emprender turismo",
    "financiación emprendedores Colombia",
    "PYME turismo Riohacha",
    "Ministerio de Comercio turismo",
    "becas formación turismo",
    "microcréditos Bancóldex",
    "incubadora startups turismo",
    "comunidades wayuu negocios",
    "Punta Gallinas turismo",
    "Cabo de la Vela emprendimiento",
  ],

  authors: [{ name: "Ministerio de Comercio, Industria y Turismo de Colombia" }],
  creator: "Ministerio de Comercio, Industria y Turismo",
  publisher: "Gobierno de Colombia",
  category: "Emprendimiento y Turismo",

  openGraph: {
    type: "website",
    locale: "es_CO",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Costa de La Guajira — mar turquesa y paisaje desértico",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@MinCIT_Colombia",
    creator: "@MinCIT_Colombia",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE_URL,
        alt: "Costa de La Guajira — mar turquesa y paisaje desértico",
      },
    ],
  },

  alternates: {
    canonical: SITE_URL,
    languages: {
      "es-CO": SITE_URL,
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    // Add Google Search Console and Bing verification tokens via env vars when available.
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#c2410c",
}

// JSON-LD structured data: GovernmentOrganization + WebSite (with SearchAction).
// Using @graph so Google can relate both nodes to each other.
const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "GovernmentOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: "Plataforma Guajira Emprende",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        caption: "Guajira Emprende — plataforma de emprendimiento turístico",
      },
      image: { "@id": `${SITE_URL}/#logo` },
      description:
        "Plataforma del Ministerio de Comercio, Industria y Turismo para el desarrollo del emprendimiento turístico en La Guajira, Colombia. Conecta emprendedores wayuu y guajiros con financiación, formación y mentoría.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Riohacha",
        addressRegion: "La Guajira",
        postalCode: "440001",
        addressCountry: "CO",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          email: CONTACT_EMAIL,
          contactType: "customer support",
          availableLanguage: ["Spanish", "Wayuunaiki"],
          areaServed: "CO-GUJ",
        },
      ],
      parentOrganization: {
        "@type": "GovernmentOrganization",
        "@id": "https://www.mincit.gov.co/#organization",
        name: "Ministerio de Comercio, Industria y Turismo de Colombia",
        url: "https://www.mincit.gov.co",
        sameAs: [
          "https://www.mincit.gov.co",
          "https://www.wikidata.org/wiki/Q5977396",
        ],
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "La Guajira",
        containedInPlace: {
          "@type": "Country",
          name: "Colombia",
          sameAs: "https://www.wikidata.org/wiki/Q739",
        },
      },
      knowsAbout: [
        "Turismo sostenible",
        "Emprendimiento wayuu",
        "Financiación de proyectos turísticos",
        "Formación empresarial",
        "Microcréditos para PYMES",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "es-CO",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/#finder`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "es-CO",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: SITE_URL,
          },
        ],
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <CommandPaletteProvider>{children}</CommandPaletteProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
