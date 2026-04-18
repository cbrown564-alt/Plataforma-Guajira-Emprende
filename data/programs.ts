import type { LucideIcon } from "lucide-react"
import {
  Building2,
  DollarSign,
  GraduationCap,
  HandHeart,
  Heart,
  Lightbulb,
  Target,
  Users,
} from "lucide-react"

export interface ProgramAudience {
  label: string
  icon: LucideIcon
  color: string
}

export interface ProgramOffering {
  icon: LucideIcon
  title: string
  description: string
  color: string
  bgColor: string
}

export interface ProgramHighlight {
  label: string
  value: string
}

export interface Program {
  id: number
  slug: string

  name: string
  subtitle: string
  description: string
  overview: string

  type: string
  typeColor: string
  deadline: string
  eligibility: string

  icon: LucideIcon
  iconColor: string
  bgColor: string
  borderColor: string
  accentColor: string

  opportunityCount: string
  highlights: ProgramHighlight[]

  targetAudience: ProgramAudience[]
  offerings: ProgramOffering[]
  applicationProcess: string
}

export const programs: Program[] = [
  {
    id: 1,
    slug: "fondo-emprender-turismo",
    name: "Fondo Emprender Turismo",
    subtitle: "Impulsando el turismo sostenible en La Guajira",
    description:
      "Financiación hasta $50M para proyectos turísticos sostenibles en La Guajira",
    overview:
      "El Fondo Emprender Turismo es una iniciativa del gobierno colombiano diseñada para fortalecer el ecosistema turístico de La Guajira. Apoyamos proyectos innovadores que preserven nuestra cultura wayuu mientras generan oportunidades económicas sostenibles para las comunidades locales.",

    type: "Fondo No Reembolsable",
    typeColor: "bg-green-100 text-green-800 border-green-200",
    deadline: "15 Mar 2024",
    eligibility: "Jóvenes 18-28 años",

    icon: DollarSign,
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    accentColor: "bg-green-600",

    opportunityCount: "3 oportunidades activas",
    highlights: [
      { label: "Beneficiarios", value: "500+ emprendedores" },
      { label: "Inversión total", value: "$2.5B COP" },
    ],

    targetAudience: [
      { label: "Jóvenes 18-28 años", icon: Users, color: "bg-turquoise-100 text-turquoise-800" },
      { label: "Emprendedores locales", icon: Target, color: "bg-coral-100 text-coral-800" },
      { label: "Comunidades wayuu", icon: Heart, color: "bg-amber-100 text-amber-800" },
      { label: "Graduados universitarios", icon: GraduationCap, color: "bg-purple-100 text-purple-800" },
    ],
    offerings: [
      {
        icon: DollarSign,
        title: "Financiación",
        description: "Hasta $50M COP no reembolsables",
        color: "text-green-600",
        bgColor: "bg-green-50",
      },
      {
        icon: GraduationCap,
        title: "Formación",
        description: "Capacitación en turismo y gestión",
        color: "text-turquoise-600",
        bgColor: "bg-turquoise-50",
      },
      {
        icon: HandHeart,
        title: "Mentoría",
        description: "Acompañamiento personalizado",
        color: "text-coral-600",
        bgColor: "bg-coral-50",
      },
    ],
    applicationProcess:
      "El proceso de postulación es 100% digital. Completa tu perfil, sube tu plan de negocio y participa en nuestras sesiones de retroalimentación. Evaluamos proyectos cada trimestre.",
  },
  {
    id: 2,
    slug: "escuela-turismo-wayuu",
    name: "Escuela de Turismo Wayuu",
    subtitle: "Formación en turismo cultural con identidad",
    description:
      "Programa de formación en turismo cultural y gestión empresarial",
    overview:
      "La Escuela de Turismo Wayuu forma a nuevas generaciones de emprendedores turísticos con enfoque cultural y comunitario. Combinamos saberes ancestrales con herramientas modernas de gestión para que la cultura wayuu impulse el desarrollo económico de La Guajira.",

    type: "Formación Gratuita",
    typeColor: "bg-turquoise-100 text-turquoise-800 border-turquoise-200",
    deadline: "30 Ene 2024",
    eligibility: "Comunidades locales",

    icon: GraduationCap,
    iconColor: "text-turquoise-600",
    bgColor: "bg-turquoise-50",
    borderColor: "border-turquoise-200",
    accentColor: "bg-turquoise-600",

    opportunityCount: "5 oportunidades activas",
    highlights: [
      { label: "Cohortes graduadas", value: "8 cohortes" },
      { label: "Estudiantes activos", value: "240+ estudiantes" },
    ],

    targetAudience: [
      { label: "Jóvenes de la comunidad", icon: Users, color: "bg-turquoise-100 text-turquoise-800" },
      { label: "Autoridades tradicionales", icon: Heart, color: "bg-amber-100 text-amber-800" },
      { label: "Artesanas y artesanos", icon: HandHeart, color: "bg-coral-100 text-coral-800" },
      { label: "Guías turísticos locales", icon: Target, color: "bg-purple-100 text-purple-800" },
    ],
    offerings: [
      {
        icon: GraduationCap,
        title: "Capacitación",
        description: "6 meses de formación certificada",
        color: "text-turquoise-600",
        bgColor: "bg-turquoise-50",
      },
      {
        icon: Heart,
        title: "Identidad cultural",
        description: "Módulos sobre tradición wayuu",
        color: "text-amber-600",
        bgColor: "bg-amber-50",
      },
      {
        icon: HandHeart,
        title: "Red de apoyo",
        description: "Mentores y pares para toda la vida",
        color: "text-coral-600",
        bgColor: "bg-coral-50",
      },
    ],
    applicationProcess:
      "Inscríbete en línea, participa en una entrevista virtual y recibe tu cupo en 5 días hábiles. Las clases son híbridas y combinan sesiones virtuales con encuentros presenciales en Riohacha o Uribia.",
  },
  {
    id: 3,
    slug: "microcreditos-bancoldex",
    name: "Microcréditos Bancóldex",
    subtitle: "Crédito y acompañamiento para PYMES turísticas",
    description:
      "Créditos blandos para emprendimientos turísticos con acompañamiento",
    overview:
      "Microcréditos Bancóldex ofrece financiación con tasa preferencial a pequeñas y medianas empresas turísticas de La Guajira. Cada crédito viene acompañado por asesoría técnica para asegurar que el capital se convierta en crecimiento sostenible.",

    type: "Microcrédito",
    typeColor: "bg-coral-100 text-coral-800 border-coral-200",
    deadline: "Convocatoria Abierta",
    eligibility: "PYMES turísticas",

    icon: Users,
    iconColor: "text-coral-600",
    bgColor: "bg-coral-50",
    borderColor: "border-coral-200",
    accentColor: "bg-coral-600",

    opportunityCount: "2 oportunidades activas",
    highlights: [
      { label: "Créditos desembolsados", value: "180+ créditos" },
      { label: "Monto total", value: "$6.4B COP" },
    ],

    targetAudience: [
      { label: "PYMES turísticas", icon: Building2, color: "bg-coral-100 text-coral-800" },
      { label: "Restaurantes y hospedaje", icon: HandHeart, color: "bg-amber-100 text-amber-800" },
      { label: "Operadores turísticos", icon: Target, color: "bg-turquoise-100 text-turquoise-800" },
      { label: "Cooperativas artesanales", icon: Users, color: "bg-purple-100 text-purple-800" },
    ],
    offerings: [
      {
        icon: DollarSign,
        title: "Crédito blando",
        description: "Tasa preferencial para turismo",
        color: "text-coral-600",
        bgColor: "bg-coral-50",
      },
      {
        icon: HandHeart,
        title: "Acompañamiento",
        description: "12 meses de asesoría técnica",
        color: "text-turquoise-600",
        bgColor: "bg-turquoise-50",
      },
      {
        icon: Target,
        title: "Plan de inversión",
        description: "Diseñado con tus asesores",
        color: "text-green-600",
        bgColor: "bg-green-50",
      },
    ],
    applicationProcess:
      "Pre-evalúa tu perfil en línea, agenda una cita con un asesor Bancóldex y recibe respuesta en 15 días hábiles. El desembolso ocurre una vez firmes el pagaré y el acuerdo de acompañamiento.",
  },
  {
    id: 4,
    slug: "incubadora-turismo",
    name: "Incubadora de Turismo",
    subtitle: "Acompañamiento integral para nuevos proyectos",
    description:
      "Acompañamiento integral para startups de turismo sostenible",
    overview:
      "La Incubadora de Turismo acompaña a los fundadores desde la idea hasta la primera tracción comercial. Durante 9 meses recibirás mentoría, espacios de trabajo, capital semilla y acceso a una red nacional de aliados del sector turístico.",

    type: "Incubación",
    typeColor: "bg-amber-100 text-amber-800 border-amber-200",
    deadline: "20 Feb 2024",
    eligibility: "Emprendedores",

    icon: Building2,
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    accentColor: "bg-amber-600",

    opportunityCount: "4 oportunidades activas",
    highlights: [
      { label: "Proyectos incubados", value: "60+ proyectos" },
      { label: "Tasa de supervivencia", value: "78% a 2 años" },
    ],

    targetAudience: [
      { label: "Fundadores en etapa temprana", icon: Lightbulb, color: "bg-amber-100 text-amber-800" },
      { label: "Equipos con prototipo", icon: Target, color: "bg-turquoise-100 text-turquoise-800" },
      { label: "Startups turísticas", icon: Building2, color: "bg-coral-100 text-coral-800" },
      { label: "Innovadores sociales", icon: Heart, color: "bg-purple-100 text-purple-800" },
    ],
    offerings: [
      {
        icon: Lightbulb,
        title: "Mentoría",
        description: "Sesiones 1:1 con expertos",
        color: "text-amber-600",
        bgColor: "bg-amber-50",
      },
      {
        icon: DollarSign,
        title: "Capital semilla",
        description: "Hasta $20M COP al graduarte",
        color: "text-green-600",
        bgColor: "bg-green-50",
      },
      {
        icon: Users,
        title: "Red de aliados",
        description: "Operadores, inversionistas y medios",
        color: "text-turquoise-600",
        bgColor: "bg-turquoise-50",
      },
    ],
    applicationProcess:
      "Postula tu idea en el formulario, presenta un pitch de 5 minutos ante el comité y, de ser admitido, firma el acuerdo de incubación para iniciar el programa en Riohacha.",
  },
  {
    id: 5,
    slug: "innovacion-turistica",
    name: "Innovación Turística",
    subtitle: "Capital semilla para tecnología turística",
    description:
      "Apoyo para proyectos tecnológicos que transformen el turismo",
    overview:
      "Innovación Turística financia proyectos que aplican tecnología para transformar la experiencia del visitante en La Guajira. Buscamos equipos técnicos capaces de resolver retos concretos del sector con soluciones escalables.",

    type: "Capital Semilla",
    typeColor: "bg-purple-100 text-purple-800 border-purple-200",
    deadline: "10 Abr 2024",
    eligibility: "Equipos técnicos",

    icon: Lightbulb,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    accentColor: "bg-purple-600",

    opportunityCount: "1 oportunidad activa",
    highlights: [
      { label: "Proyectos apoyados", value: "22 proyectos" },
      { label: "Ticket promedio", value: "$35M COP" },
    ],

    targetAudience: [
      { label: "Equipos de ingeniería", icon: Lightbulb, color: "bg-purple-100 text-purple-800" },
      { label: "Startups de software", icon: Building2, color: "bg-turquoise-100 text-turquoise-800" },
      { label: "Investigadores aplicados", icon: Target, color: "bg-amber-100 text-amber-800" },
      { label: "Creadores de contenido digital", icon: Users, color: "bg-coral-100 text-coral-800" },
    ],
    offerings: [
      {
        icon: DollarSign,
        title: "Capital semilla",
        description: "Hasta $50M COP por proyecto",
        color: "text-purple-600",
        bgColor: "bg-purple-50",
      },
      {
        icon: Target,
        title: "Pilotos reales",
        description: "Acceso a hoteles y operadores",
        color: "text-turquoise-600",
        bgColor: "bg-turquoise-50",
      },
      {
        icon: Lightbulb,
        title: "Mentoría técnica",
        description: "Arquitectos y founders aliados",
        color: "text-amber-600",
        bgColor: "bg-amber-50",
      },
    ],
    applicationProcess:
      "Presenta tu reto, tu solución y tu equipo. Los finalistas acceden a una ronda técnica y a la asignación de un mentor del ecosistema antes del desembolso.",
  },
  {
    id: 6,
    slug: "turismo-comunitario",
    name: "Turismo Comunitario",
    subtitle: "Fortalecimiento de iniciativas wayuu",
    description:
      "Fortalecimiento de iniciativas turísticas comunitarias wayuu",
    overview:
      "El programa de Turismo Comunitario apoya directamente a rancherías y cooperativas wayuu que desarrollan experiencias turísticas. La financiación llega con asesoría en gobernanza, comercialización y preservación cultural.",

    type: "Apoyo Directo",
    typeColor: "bg-rose-100 text-rose-800 border-rose-200",
    deadline: "Permanente",
    eligibility: "Comunidades wayuu",

    icon: HandHeart,
    iconColor: "text-rose-600",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
    accentColor: "bg-rose-600",

    opportunityCount: "6 oportunidades activas",
    highlights: [
      { label: "Comunidades aliadas", value: "35 rancherías" },
      { label: "Familias beneficiadas", value: "420+ familias" },
    ],

    targetAudience: [
      { label: "Rancherías organizadas", icon: Heart, color: "bg-rose-100 text-rose-800" },
      { label: "Cooperativas comunitarias", icon: HandHeart, color: "bg-amber-100 text-amber-800" },
      { label: "Autoridades tradicionales", icon: Users, color: "bg-turquoise-100 text-turquoise-800" },
      { label: "Guías comunitarios", icon: Target, color: "bg-purple-100 text-purple-800" },
    ],
    offerings: [
      {
        icon: HandHeart,
        title: "Apoyo directo",
        description: "Aportes no reembolsables",
        color: "text-rose-600",
        bgColor: "bg-rose-50",
      },
      {
        icon: Heart,
        title: "Preservación cultural",
        description: "Documentación de saberes propios",
        color: "text-amber-600",
        bgColor: "bg-amber-50",
      },
      {
        icon: Users,
        title: "Gobernanza",
        description: "Asesoría para toma de decisiones",
        color: "text-turquoise-600",
        bgColor: "bg-turquoise-50",
      },
    ],
    applicationProcess:
      "Las comunidades presentan su propuesta a través de una autoridad tradicional o cooperativa. El comité visita el territorio y acompaña la formulación antes del desembolso.",
  },
]

export function getProgramById(id: string | number): Program | undefined {
  const numId = typeof id === "string" ? Number.parseInt(id, 10) : id
  if (Number.isNaN(numId)) return undefined
  return programs.find((p) => p.id === numId)
}
