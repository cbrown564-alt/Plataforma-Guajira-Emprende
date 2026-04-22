import { CONTACT_FORM_TO } from "@/lib/site-config"

export interface DeliverOptions {
  subject: string
  /** Plain text body — rendered as-is for console delivery. */
  text: string
  /** Optional reply-to address so operators can respond directly. */
  replyTo?: string
}

export interface DeliveryResult {
  delivered: boolean
  provider: "resend" | "console"
}

/**
 * Delivers a plain-text notification email to the team inbox.
 *
 * In production, set `RESEND_API_KEY` and the platform will POST to Resend.
 * Without a key, deliveries fall back to a structured server-console log so
 * local submissions are observable and never silently dropped.
 */
export async function deliverNotification(
  options: DeliverOptions,
): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM ?? "Guajira Emprende <no-reply@guajiraemprende.gov.co>"

  if (!apiKey) {
    console.info(
      "[guajira-emprende] RESEND_API_KEY not set — logging submission instead of sending email.",
      {
        to: CONTACT_FORM_TO,
        subject: options.subject,
        replyTo: options.replyTo,
        text: options.text,
      },
    )
    return { delivered: true, provider: "console" }
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: CONTACT_FORM_TO,
      subject: options.subject,
      text: options.text,
      reply_to: options.replyTo,
    }),
  })

  if (!response.ok) {
    const detail = await response.text().catch(() => "")
    throw new Error(
      `Resend responded with ${response.status}: ${detail.slice(0, 200)}`,
    )
  }

  return { delivered: true, provider: "resend" }
}
