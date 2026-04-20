/**
 * Single source of truth for contact details, WhatsApp settings, and office
 * information used across the platform. Values can be overridden at deploy
 * time via NEXT_PUBLIC_* environment variables — see .env.example.
 */

const env = process.env

export const siteConfig = {
  name: "Plataforma Guajira Emprende",
  whatsapp: {
    // Digits-only format expected by https://wa.me/ URLs (country code + number).
    number: env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573001234567",
    // Human-readable WhatsApp number shown in the UI.
    display: env.NEXT_PUBLIC_WHATSAPP_DISPLAY ?? "+57 300 123 4567",
  },
  contact: {
    phone: env.NEXT_PUBLIC_CONTACT_PHONE ?? "+57 (5) 123-4567",
    email: env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@guajiraemprende.gov.co",
    supportEmail: env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "ayuda@guajiraemprende.gov.co",
    hours: "Lunes a Viernes, 8:00 AM - 5:00 PM",
    responseTime: "Respuesta en 24 horas",
    whatsappTagline: "Atención inmediata",
    address: "Riohacha, La Guajira, Colombia",
  },
  offices: [
    {
      name: "Oficina Principal - Riohacha",
      address: "Calle 15 #3-25, Centro, Riohacha, La Guajira",
      hours: "Lunes a Viernes: 8:00 AM - 5:00 PM",
      services: ["Asesoría presencial", "Talleres de formación", "Registro de proyectos"],
    },
    {
      name: "Punto de Atención - Maicao",
      address: "Carrera 10 #12-45, Maicao, La Guajira",
      hours: "Martes y Jueves: 9:00 AM - 4:00 PM",
      services: ["Asesoría básica", "Información de programas"],
    },
  ],
} as const

export const whatsappMessages = {
  default:
    "¡Hola! 👋 Necesito ayuda con los programas de financiación de Plataforma Guajira Emprende. ¿Podrían orientarme sobre las oportunidades disponibles?",
  contactSection:
    "¡Hola! Me gustaría obtener más información sobre los programas de emprendimiento turístico en La Guajira.",
  onboarding:
    "¡Hola! 👋 Soy nuevo en la plataforma y me gustaría recibir orientación sobre cómo comenzar mi emprendimiento turístico en La Guajira. ¿Podrían ayudarme?",
  joinBroadcast: (name: string, municipality: string) =>
    `¡Hola! Me acabo de unir a la comunidad de Plataforma Guajira Emprende. Mi nombre es ${name} y soy de ${municipality}. Me gustaría unirme a la lista de difusión de WhatsApp para recibir actualizaciones sobre oportunidades y eventos. ¡Gracias!`,
  opportunityQuestion: (opportunityTitle: string) =>
    `¡Hola! Tengo preguntas sobre la oportunidad "${opportunityTitle}". ¿Podrían ayudarme?`,
} as const
