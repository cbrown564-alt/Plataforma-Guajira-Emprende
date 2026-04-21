import { DollarSign, GraduationCap, Users } from "lucide-react"
import type { Opportunity } from "./types"

export const opportunities: Opportunity[] = [
  {
    id: "fondo-emprender-turismo-2024",
    programId: "fondo-emprender-turismo",
    programName: "Fondo Emprender Turismo",
    title: "Fondo Emprender Turismo: Convocatoria 2024",
    description: "Financiación hasta $50M para proyectos turísticos sostenibles en La Guajira",
    summary:
      "Financiación hasta $50 millones para proyectos turísticos sostenibles en La Guajira. Este fondo busca impulsar emprendimientos innovadores que fortalezcan el turismo cultural y preserven las tradiciones wayuu.",
    fundingType: "Fondo No Reembolsable",
    supportType: "Fondo No Reembolsable",
    supportAmount: "Hasta $50 millones COP",
    deadline: "30 Jun 2026",
    resultsAt: "30 días después del cierre",
    eligibility: "Jóvenes 18-28 años",
    status: "Activo",
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
    id: "escuela-turismo-wayuu-cohorte-2024",
    programId: "escuela-turismo-wayuu",
    programName: "Escuela de Turismo Wayuu",
    title: "Escuela de Turismo Wayuu: Cohorte 2024",
    description: "Programa de formación en turismo cultural y gestión empresarial",
    summary:
      "Programa intensivo de 6 meses que combina conocimientos ancestrales wayuu con herramientas modernas de gestión empresarial. Formación 100% gratuita dirigida a miembros de comunidades locales interesados en liderar experiencias turísticas culturales.",
    fundingType: "Formación Gratuita",
    supportType: "Beca de Formación",
    supportAmount: "Beca completa + materiales",
    deadline: "15 Ago 2026",
    resultsAt: "15 días después del cierre",
    eligibility: "Comunidades locales",
    status: "Activo",
    icon: GraduationCap,
    iconColor: "text-turquoise-600",
    bgColor: "bg-turquoise-50",
    borderColor: "border-turquoise-200",
    requirements: [
      "Cédula de ciudadanía colombiana o documento indígena",
      "Pertenencia a comunidad wayuu o residencia en La Guajira",
      "Carta de motivación (máximo 1 página)",
      "Disponibilidad de 20 horas semanales durante 6 meses",
      "Acceso a conexión a internet (se apoyará en casos especiales)",
    ],
    applicationSteps: [
      "Completar el formulario de inscripción en línea",
      "Adjuntar la carta de motivación",
      "Participar en una entrevista comunitaria",
      "Recibir confirmación de cupo",
      "Asistir a la sesión de bienvenida",
    ],
    faqs: [
      {
        question: "¿El programa tiene costo?",
        answer:
          "No. La formación es 100% gratuita e incluye materiales, refrigerios durante las sesiones presenciales y transporte a los encuentros regionales.",
      },
      {
        question: "¿Dónde se realizan las clases?",
        answer:
          "Las sesiones se realizan en modalidad híbrida: encuentros presenciales mensuales en Riohacha y Uribia, más clases virtuales semanales.",
      },
      {
        question: "¿Recibo un certificado al finalizar?",
        answer:
          "Sí. Los egresados reciben un certificado emitido por el Ministerio de Comercio, Industria y Turismo con aval del SENA.",
      },
    ],
  },
  {
    id: "microcreditos-bancoldex-turismo",
    programId: "microcreditos-bancoldex",
    programName: "Microcréditos Bancóldex",
    title: "Microcréditos Bancóldex para Turismo",
    description: "Créditos blandos para emprendimientos turísticos con acompañamiento",
    summary:
      "Línea de microcrédito con tasas preferenciales y plazos flexibles, diseñada para PYMES turísticas que buscan capital de trabajo, infraestructura o expansión. Incluye acompañamiento técnico durante todo el periodo del crédito.",
    fundingType: "Microcrédito",
    supportType: "Microcrédito",
    supportAmount: "Desde $5M hasta $80M COP",
    deadline: "Convocatoria Abierta",
    eligibility: "PYMES turísticas",
    status: "Permanente",
    icon: Users,
    iconColor: "text-coral-600",
    bgColor: "bg-coral-50",
    borderColor: "border-coral-200",
    requirements: [
      "Registro mercantil vigente",
      "Mínimo 6 meses de operación",
      "Estados financieros de los últimos 12 meses",
      "Certificación de actividad turística",
      "Referencias comerciales (mínimo 2)",
      "Historial crediticio positivo",
    ],
    applicationSteps: [
      "Agendar una cita con un asesor Bancóldex",
      "Presentar la documentación requerida",
      "Recibir la evaluación crediticia",
      "Firmar el acuerdo de crédito",
      "Recibir los fondos y comenzar el acompañamiento",
    ],
    faqs: [
      {
        question: "¿Cuál es la tasa de interés?",
        answer:
          "Las tasas varían según el plazo y el monto, pero se mantienen entre 4 y 8 puntos por debajo de las tasas comerciales estándar gracias al subsidio del Ministerio.",
      },
      {
        question: "¿Puedo aplicar si soy una asociación comunitaria?",
        answer:
          "Sí. Las asociaciones, cooperativas y empresas comunitarias wayuu son elegibles siempre que tengan personería jurídica.",
      },
      {
        question: "¿Qué tipo de acompañamiento incluye?",
        answer:
          "Recibes asesoría mensual en gestión financiera, marketing turístico y cumplimiento normativo durante toda la vigencia del crédito.",
      },
    ],
  },
]

export function getOpportunityById(id: string): Opportunity | undefined {
  return opportunities.find((opportunity) => opportunity.id === id)
}

export function getOpportunitiesByProgramId(programId: string): Opportunity[] {
  return opportunities.filter((opportunity) => opportunity.programId === programId)
}
