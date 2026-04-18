import type { LucideIcon } from "lucide-react"
import { DollarSign, GraduationCap, Users } from "lucide-react"

export type OpportunityStatus = "Activo" | "Permanente" | "Próximamente" | "Cerrado"

export interface OpportunityFAQ {
  question: string
  answer: string
}

export interface Opportunity {
  id: number
  slug: string
  programId: number
  programName: string

  title: string
  detailTitle: string
  summary: string
  description: string

  status: OpportunityStatus
  fundingType: string
  supportType: string
  fundingAmount: string
  deadline: string
  resultsTimeline: string
  eligibility: string

  icon: LucideIcon
  iconColor: string
  bgColor: string
  borderColor: string

  requirements: string[]
  applicationSteps: string[]
  faqs: OpportunityFAQ[]
}

export const opportunities: Opportunity[] = [
  {
    id: 1,
    slug: "fondo-emprender-turismo-2024",
    programId: 1,
    programName: "Fondo Emprender Turismo",

    title: "Fondo Emprender Turismo",
    detailTitle: "Fondo Emprender Turismo: Convocatoria 2024",
    summary:
      "Financiación hasta $50M para proyectos turísticos sostenibles en La Guajira",
    description:
      "Financiación hasta $50 millones para proyectos turísticos sostenibles en La Guajira. Este fondo busca impulsar emprendimientos innovadores que fortalezcan el turismo cultural y preserven las tradiciones wayuu.",

    status: "Activo",
    fundingType: "Fondo No Reembolsable",
    supportType: "Fondo No Reembolsable",
    fundingAmount: "Hasta $50 millones COP",
    deadline: "15 Mar 2024",
    resultsTimeline: "Resultados: 30 días después",
    eligibility: "Jóvenes 18-28 años",

    icon: DollarSign,
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",

    requirements: [
      "Cédula de ciudadanía colombiana",
      "Plan de negocio detallado",
      "Certificado de estudios (mínimo bachillerato)",
      "Carta de intención firmada",
      "Presupuesto del proyecto",
      "Certificación de residencia en La Guajira",
    ],
    applicationSteps: [
      "Registrarse en la plataforma oficial",
      "Completar el formulario de postulación",
      "Cargar todos los documentos requeridos",
      "Enviar la propuesta antes de la fecha límite",
      "Esperar confirmación de recepción",
      "Participar en entrevista (si es seleccionado)",
    ],
    faqs: [
      {
        question: "¿Qué pasa si no cumplo todos los requisitos?",
        answer:
          "Puedes aplicar si cumples al menos el 80% de los requisitos. El comité evaluará cada caso individualmente y podrá solicitar documentación adicional.",
      },
      {
        question: "¿Puedo aplicar si ya tengo un negocio establecido?",
        answer:
          "Sí, siempre y cuando tu negocio tenga menos de 2 años de operación y esté relacionado con turismo sostenible en La Guajira.",
      },
      {
        question: "¿Cuánto tiempo toma el proceso de evaluación?",
        answer:
          "El proceso completo toma aproximadamente 45 días hábiles desde el cierre de la convocatoria hasta la publicación de resultados.",
      },
      {
        question: "¿Necesito tener experiencia previa en turismo?",
        answer:
          "No es obligatorio, pero se valorará positivamente. Ofrecemos programas de formación complementarios para fortalecer las capacidades empresariales.",
      },
    ],
  },
  {
    id: 2,
    slug: "escuela-turismo-wayuu-2024",
    programId: 2,
    programName: "Escuela de Turismo Wayuu",

    title: "Escuela de Turismo Wayuu",
    detailTitle: "Escuela de Turismo Wayuu: Cohorte 2024",
    summary:
      "Programa de formación en turismo cultural y gestión empresarial",
    description:
      "Programa gratuito de formación en turismo cultural, gestión empresarial y preservación del patrimonio wayuu. Dirigido a miembros de comunidades locales interesados en desarrollar emprendimientos turísticos con identidad cultural.",

    status: "Activo",
    fundingType: "Formación Gratuita",
    supportType: "Formación y Certificación",
    fundingAmount: "Beca 100% cubierta",
    deadline: "30 Ene 2024",
    resultsTimeline: "Inicio de clases: 15 Feb 2024",
    eligibility: "Comunidades locales",

    icon: GraduationCap,
    iconColor: "text-turquoise-600",
    bgColor: "bg-turquoise-50",
    borderColor: "border-turquoise-200",

    requirements: [
      "Ser mayor de edad (18+ años)",
      "Residir en La Guajira",
      "Carta de motivación",
      "Referencia comunitaria o de autoridad tradicional",
      "Disponibilidad de 10 horas semanales",
    ],
    applicationSteps: [
      "Diligenciar el formulario de inscripción en línea",
      "Adjuntar carta de motivación y referencia",
      "Participar en entrevista virtual",
      "Recibir notificación de admisión",
      "Confirmar cupo y firmar acuerdo de compromiso",
    ],
    faqs: [
      {
        question: "¿Tiene algún costo el programa?",
        answer:
          "No. La Escuela de Turismo Wayuu es 100% gratuita e incluye materiales, certificación y refrigerios.",
      },
      {
        question: "¿Qué certificación recibo al terminar?",
        answer:
          "Recibirás un diploma avalado por el Ministerio de Comercio, Industria y Turismo en gestión de turismo cultural.",
      },
      {
        question: "¿Las clases son presenciales o virtuales?",
        answer:
          "Son híbridas: dos sesiones semanales — una virtual y otra presencial en Riohacha o Uribia según tu zona.",
      },
    ],
  },
  {
    id: 3,
    slug: "microcreditos-bancoldex",
    programId: 3,
    programName: "Microcréditos Bancóldex",

    title: "Microcréditos Bancóldex",
    detailTitle: "Microcréditos Bancóldex para Turismo",
    summary:
      "Créditos blandos para emprendimientos turísticos con acompañamiento",
    description:
      "Línea de microcrédito con tasa preferencial y periodo de gracia para pequeñas y medianas empresas del sector turístico en La Guajira. Incluye acompañamiento técnico durante el primer año.",

    status: "Permanente",
    fundingType: "Microcrédito",
    supportType: "Crédito con Acompañamiento",
    fundingAmount: "Desde $5M hasta $80M COP",
    deadline: "Convocatoria Abierta",
    resultsTimeline: "Aprobación en 15 días hábiles",
    eligibility: "PYMES turísticas",

    icon: Users,
    iconColor: "text-coral-600",
    bgColor: "bg-coral-50",
    borderColor: "border-coral-200",

    requirements: [
      "RUT activo y Cámara de Comercio",
      "Mínimo 6 meses de operación",
      "Estados financieros del último año",
      "Plan de inversión del crédito",
      "Codeudor o garantía (según monto)",
    ],
    applicationSteps: [
      "Pre-evaluar tu perfil en línea",
      "Agendar cita con asesor de Bancóldex",
      "Presentar documentación financiera",
      "Firmar pagaré y desembolso",
      "Inscribirse en el acompañamiento técnico",
    ],
    faqs: [
      {
        question: "¿Cuál es la tasa de interés?",
        answer:
          "La tasa preferencial para turismo en La Guajira es DTF + 3 puntos, sujeta a evaluación crediticia.",
      },
      {
        question: "¿Hay periodo de gracia?",
        answer:
          "Sí. Puedes solicitar hasta 6 meses de gracia al capital durante el primer año.",
      },
      {
        question: "¿Qué incluye el acompañamiento técnico?",
        answer:
          "Asesoría contable, financiera y de mercadeo turístico durante los 12 meses posteriores al desembolso.",
      },
    ],
  },
]

export function getOpportunityById(id: string | number): Opportunity | undefined {
  const numId = typeof id === "string" ? Number.parseInt(id, 10) : id
  if (Number.isNaN(numId)) return undefined
  return opportunities.find((o) => o.id === numId)
}

export function getOpportunitiesByProgramId(programId: number): Opportunity[] {
  return opportunities.filter((o) => o.programId === programId)
}
