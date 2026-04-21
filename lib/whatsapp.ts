export const WHATSAPP_PHONE = "573001234567"

export function openWhatsApp(message: string): void {
  const encoded = encodeURIComponent(message)
  window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`, "_blank", "noopener,noreferrer")
}
