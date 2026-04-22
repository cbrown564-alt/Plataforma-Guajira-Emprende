import { z } from "zod"

const nonEmpty = (label: string, min = 2, max = 80) =>
  z
    .string({ required_error: `${label} es obligatorio` })
    .trim()
    .min(min, `${label} debe tener al menos ${min} caracteres`)
    .max(max, `${label} es demasiado largo`)

/**
 * Contact form (`/#contact`). All fields required except `phone`.
 * `website` is a honeypot — legitimate users never see or fill it.
 */
export const contactFormSchema = z.object({
  name: nonEmpty("El nombre"),
  email: z
    .string({ required_error: "El correo es obligatorio" })
    .trim()
    .email("Ingresa un correo electrónico válido"),
  phone: z
    .string()
    .trim()
    .max(40, "Teléfono demasiado largo")
    .optional()
    .or(z.literal("")),
  message: nonEmpty("El mensaje", 10, 2000),
  /** Honeypot — validated leniently so route handlers can silently accept. */
  website: z.string().max(200).optional().or(z.literal("")),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

const MUNICIPALITIES = [
  "Riohacha",
  "Maicao",
  "Uribia",
  "Manaure",
  "Albania",
  "Barrancas",
  "Distracción",
  "El Molino",
  "Fonseca",
  "Hatonuevo",
  "La Jagua del Pilar",
  "San Juan del Cesar",
  "Villanueva",
  "Dibulla",
  "Otra comunidad",
] as const

export const SUPPORT_TYPES = [
  "financiacion",
  "formacion",
  "mentoria",
  "networking",
  "marketing",
  "legal",
] as const

/**
 * Community join form (`/join`). `contact` can be an email OR a phone
 * number — we accept either, but a later refinement records which kind
 * the user supplied so follow-up copy can adapt.
 */
export const joinFormSchema = z
  .object({
    nombre: nonEmpty("El nombre"),
    municipio: z.enum(MUNICIPALITIES, {
      errorMap: () => ({ message: "Selecciona tu municipio o comunidad" }),
    }),
    contacto: z
      .string({ required_error: "El contacto es obligatorio" })
      .trim()
      .min(5, "Ingresa un correo o un número de contacto válido")
      .max(120, "Contacto demasiado largo"),
    tipoApoyo: z.array(z.enum(SUPPORT_TYPES)).default([]),
    /** Honeypot — validated leniently so route handlers can silently accept. */
    website: z.string().max(200).optional().or(z.literal("")),
  })
  .refine(
    (data) => /\S+@\S+\.\S+/.test(data.contacto) || /[\d +()-]{7,}/.test(data.contacto),
    {
      path: ["contacto"],
      message: "Ingresa un correo electrónico o un número de teléfono válido",
    },
  )

export type JoinFormValues = z.infer<typeof joinFormSchema>

export function isEmail(value: string): boolean {
  return /^\S+@\S+\.\S+$/.test(value.trim())
}
