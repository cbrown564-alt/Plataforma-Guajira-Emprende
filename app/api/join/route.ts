import { NextResponse } from "next/server"

import { deliverNotification } from "@/lib/email"
import { joinFormSchema } from "@/lib/schemas"

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

  const parsed = joinFormSchema.safeParse(payload)
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

  const { nombre, municipio, contacto, tipoApoyo, website } = parsed.data

  if (website && website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  try {
    await deliverNotification({
      subject: `[Guajira Emprende] Nuevo registro de comunidad: ${nombre}`,
      text: [
        `Nombre: ${nombre}`,
        `Municipio: ${municipio}`,
        `Contacto: ${contacto}`,
        `Tipos de apoyo solicitados: ${tipoApoyo.length > 0 ? tipoApoyo.join(", ") : "(ninguno indicado)"}`,
      ].join("\n"),
    })
  } catch (error) {
    console.error("[guajira-emprende] join delivery failed", error)
    return NextResponse.json(
      {
        ok: false,
        error:
          "No pudimos registrar tu información en este momento. Intenta nuevamente o escríbenos por WhatsApp.",
      },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
