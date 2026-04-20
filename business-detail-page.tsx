import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Star,
  MessageCircle,
  CheckCircle,
  Clock,
  Calendar,
  Building2,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getBusinessById, businesses } from "@/data/businesses"
import type { Business } from "@/data/types"

const CATEGORY_BADGE: Record<Business["category"], string> = {
  "Turismo Cultural": "bg-turquoise-100 text-turquoise-800 border-turquoise-200",
  Hospedaje: "bg-coral-100 text-coral-800 border-coral-200",
  Gastronomía: "bg-amber-100 text-amber-800 border-amber-200",
  Ecoturismo: "bg-green-100 text-green-800 border-green-200",
  Artesanías: "bg-purple-100 text-purple-800 border-purple-200",
  Transporte: "bg-blue-100 text-blue-800 border-blue-200",
}

function buildWhatsAppUrl(business: Business): string {
  const fallback = business.contact.phone.replace(/[^\d]/g, "")
  const number = business.contact.whatsapp || fallback
  const message = encodeURIComponent(
    `¡Hola ${business.name}! Los encontré en Guajira Emprende y me gustaría saber más sobre sus servicios.`,
  )
  return `https://wa.me/${number}?text=${message}`
}

function buildWebsiteUrl(raw: string): string {
  if (!raw) return "#"
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw
  return `https://${raw}`
}

function buildJsonLd(business: Business) {
  const website = buildWebsiteUrl(business.contact.website)
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://guajiraemprende.gov.co/business/${business.id}`,
    name: business.name,
    description: business.longDescription || business.description,
    image: business.image,
    url: website,
    telephone: business.contact.phone,
    email: business.contact.email,
    priceRange: business.priceRange,
    address: {
      "@type": "PostalAddress",
      addressLocality: business.municipality || business.location,
      addressRegion: "La Guajira",
      addressCountry: "CO",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.rating,
      reviewCount: business.reviews,
    },
  }
  if (business.hours) jsonLd.openingHours = business.hours
  if (business.services && business.services.length > 0) {
    jsonLd.makesOffer = business.services.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service },
    }))
  }
  return jsonLd
}

export default function BusinessDetailPage({ id }: { id: string }) {
  const business = getBusinessById(id)
  if (!business) notFound()

  const websiteHref = buildWebsiteUrl(business.contact.website)
  const whatsappHref = buildWhatsAppUrl(business)
  const categoryBadge = CATEGORY_BADGE[business.category]

  const relatedBusinesses = businesses
    .filter((b) => b.category === business.category && b.id !== business.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(business)) }}
      />

      {/* Sticky Navigation Header */}
      <div className="bg-white border-b border-amber-200/50 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/#directory"
            className="flex items-center space-x-2 text-amber-800 hover:text-turquoise-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Volver al directorio</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Hero Card */}
        <Card className="mb-8 overflow-hidden border-2 border-amber-200 shadow-lg">
          <div className="aspect-[21/9] bg-gray-100 relative">
            <img
              src={business.image || "/placeholder.svg"}
              alt={business.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${categoryBadge}`}>
                {business.category}
              </span>
            </div>
          </div>

          <CardHeader className="pb-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl lg:text-4xl font-bold text-amber-900 leading-tight">{business.name}</h1>
                <div className="flex items-center space-x-2 text-amber-700 mt-3">
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">{business.location}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 self-start">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="text-lg font-bold text-amber-900">{business.rating}</span>
                <span className="text-sm text-amber-700">({business.reviews} reseñas)</span>
              </div>
            </div>

            {business.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {business.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-md font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </CardHeader>
        </Card>

        {/* About */}
        <Card className="mb-6 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-turquoise-600" />
              Sobre el emprendimiento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {business.longDescription || business.description}
            </p>
          </CardContent>
        </Card>

        {/* Quick Facts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {business.hours && (
            <Card className="border border-turquoise-200 bg-turquoise-50/40">
              <CardContent className="pt-6 flex items-center space-x-3">
                <Clock className="h-5 w-5 text-turquoise-600" />
                <div>
                  <span className="text-xs text-turquoise-700 font-medium block">Horario</span>
                  <span className="text-sm font-semibold text-turquoise-900">{business.hours}</span>
                </div>
              </CardContent>
            </Card>
          )}
          {business.founded && (
            <Card className="border border-coral-200 bg-coral-50/40">
              <CardContent className="pt-6 flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-coral-600" />
                <div>
                  <span className="text-xs text-coral-700 font-medium block">Operando desde</span>
                  <span className="text-sm font-semibold text-coral-900">{business.founded}</span>
                </div>
              </CardContent>
            </Card>
          )}
          {business.municipality && (
            <Card className="border border-amber-200 bg-amber-50/40">
              <CardContent className="pt-6 flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-amber-600" />
                <div>
                  <span className="text-xs text-amber-700 font-medium block">Municipio</span>
                  <span className="text-sm font-semibold text-amber-900">{business.municipality}</span>
                </div>
              </CardContent>
            </Card>
          )}
          {business.priceRange && (
            <Card className="border border-green-200 bg-green-50/40">
              <CardContent className="pt-6 flex items-center space-x-3">
                <Sparkles className="h-5 w-5 text-green-600" />
                <div>
                  <span className="text-xs text-green-700 font-medium block">Rango de precios</span>
                  <span className="text-sm font-semibold text-green-900">{business.priceRange}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Services */}
        {business.services && business.services.length > 0 && (
          <Card className="mb-6 border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Servicios que ofrece</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {business.services.map((service) => (
                  <li key={service} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-turquoise-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Highlights */}
        {business.highlights && business.highlights.length > 0 && (
          <Card className="mb-6 border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Lo que lo distingue</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {business.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start space-x-3">
                    <Sparkles className="h-5 w-5 text-coral-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Contact CTA */}
        <Card className="mb-8 border-2 border-turquoise-200 bg-turquoise-50">
          <CardHeader>
            <CardTitle className="text-xl text-turquoise-900">Contacta directamente</CardTitle>
            <p className="text-turquoise-700 text-sm">
              Conecta con {business.name} para reservar, cotizar o coordinar una visita.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="block">
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg">
                <MessageCircle className="mr-2 h-5 w-5" />
                Escribir por WhatsApp
              </Button>
            </a>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`tel:${business.contact.phone.replace(/\s/g, "")}`}
                className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-turquoise-200 hover:border-turquoise-400 transition-colors"
              >
                <Phone className="h-5 w-5 text-turquoise-600" />
                <div>
                  <span className="text-xs text-turquoise-700 block">Teléfono</span>
                  <span className="text-sm font-medium text-turquoise-900">{business.contact.phone}</span>
                </div>
              </a>
              <a
                href={`mailto:${business.contact.email}`}
                className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-turquoise-200 hover:border-turquoise-400 transition-colors"
              >
                <Mail className="h-5 w-5 text-turquoise-600" />
                <div>
                  <span className="text-xs text-turquoise-700 block">Email</span>
                  <span className="text-sm font-medium text-turquoise-900 break-all">{business.contact.email}</span>
                </div>
              </a>
            </div>

            {business.contact.website && (
              <a href={websiteHref} target="_blank" rel="noopener noreferrer" className="block">
                <Button
                  variant="outline"
                  className="w-full border-turquoise-500 text-turquoise-700 hover:bg-turquoise-100"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Visitar sitio web
                </Button>
              </a>
            )}
          </CardContent>
        </Card>

        {/* Related businesses */}
        {relatedBusinesses.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Otros emprendimientos de {business.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedBusinesses.map((related) => (
                <Link key={related.id} href={`/business/${related.id}`} className="block">
                  <Card className="h-full border border-gray-200 hover:border-turquoise-400 hover:shadow-md transition-all duration-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-bold text-amber-900">{related.name}</CardTitle>
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span>{related.municipality || related.location}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-700 line-clamp-3">{related.description}</p>
                      <div className="flex items-center space-x-1 mt-3">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{related.rating}</span>
                        <span className="text-xs text-gray-500">({related.reviews})</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
