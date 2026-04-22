/**
 * Single source of truth for publicly visible contact information.
 *
 * Values are driven by environment variables when available, with sensible
 * production fallbacks. Importing from this module (instead of hard-coding
 * numbers in each component) means a single edit propagates to the WhatsApp
 * button, footer, contact section, join flow, onboarding page, and every
 * opportunity detail page.
 */

const env = (key: string): string | undefined => {
  const value = process.env[key]
  return value && value.length > 0 ? value : undefined
}

/** Raw WhatsApp number, digits only (no leading `+`), e.g. "573001234567". */
export const WHATSAPP_NUMBER: string =
  env("NEXT_PUBLIC_WHATSAPP_NUMBER") ?? "573001234567"

/** Office phone number in human-readable form. */
export const CONTACT_PHONE: string =
  env("NEXT_PUBLIC_CONTACT_PHONE") ?? "+57 (5) 123-4567"

/** Primary inbox used on the footer, contact section, and detail pages. */
export const CONTACT_EMAIL: string =
  env("NEXT_PUBLIC_CONTACT_EMAIL") ?? "info@guajiraemprende.gov.co"

/** Support inbox shown on opportunity/program detail pages. */
export const SUPPORT_EMAIL: string =
  env("NEXT_PUBLIC_SUPPORT_EMAIL") ?? "ayuda@guajiraemprende.gov.co"

/**
 * Address the contact form should deliver to when an email provider is wired
 * up. Falls back to CONTACT_EMAIL so no dangling inbox exists.
 */
export const CONTACT_FORM_TO: string =
  env("CONTACT_FORM_TO") ?? CONTACT_EMAIL

/** Build a WhatsApp deep link with an optional prefilled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}
