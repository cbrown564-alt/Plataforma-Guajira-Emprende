import { NextResponse } from "next/server"

import { deliverNotification } from "@/lib/email"
import { contactFormSchema } from "@/lib/schemas"

export const runtime = "nodejs"

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: "Solicitud inválida" },
      { status: 400 },
    )
  }

  const parsed = contactFormSchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Revisa los campos del formulario",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    )
  }

  const { name, email, phone, message, website } = parsed.data

  if (website && website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  try {
    await deliverNotification({
      subject: `[Guajira Emprende] Nuevo mensaje de ${name}`,
      replyTo: email,
      text: [
        `Nombre: ${name}`,
        `Correo: ${email}`,
        phone ? `Teléfono: ${phone}` : undefined,
        "",
        "Mensaje:",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    })
  } catch (error) {
    console.error("[guajira-emprende] contact delivery failed", error)
    return NextResponse.json(
      {
        ok: false,
        error:
          "No pudimos enviar tu mensaje en este momento. Intenta nuevamente o contáctanos por WhatsApp.",
      },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
