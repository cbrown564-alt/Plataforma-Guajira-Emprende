import { siteConfig } from "./site-config"

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`
}

export function openWhatsApp(message: string): void {
  if (typeof window === "undefined") return
  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer")
}
