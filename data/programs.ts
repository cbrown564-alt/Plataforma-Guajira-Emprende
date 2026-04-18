export type ProgramType = 'capital' | 'credito' | 'formacion' | 'apoyo'

export interface Program {
  id: number
  name: string
  entity: string
  description: string
  type: ProgramType
  eligibility: string
  benefit: string
  deadline: string
  url: string
}

export const programs: Program[] = [
  {
    id: 1,
    name: 'Fondo Emprender',
    entity: 'SENA',
    description:
      'Capital semilla no reembolsable para la creación de nuevas empresas. Uno de los programas de mayor alcance para emprendedores jóvenes en Colombia.',
    type: 'capital',
    eligibility:
      'Aprendices SENA en etapa productiva, estudiantes universitarios matriculados, o egresados de educación superior con máximo 60 meses desde la graduación.',
    benefit: 'Hasta 180 SMMLV sin necesidad de reembolso (~$229M COP en 2025)',
    deadline: 'Convocatorias anuales — verificar fechas actuales en fondoemprender.com',
    url: 'https://www.fondoemprender.com',
  },
  {
    id: 2,
    name: 'Emprendimiento de Alto Impacto',
    entity: 'iNNpulsa Colombia',
    description:
      'Cofinanciación y acompañamiento especializado para emprendimientos con potencial de crecimiento e impacto regional, incluyendo turismo sostenible e innovación cultural.',
    type: 'capital',
    eligibility:
      'Emprendimientos en etapa temprana con modelo de negocio validado. Se priorizan proyectos con impacto social, cultural o ambiental y componente de innovación.',
    benefit: 'Cofinanciación de hasta $100M COP más mentoría y red de contactos',
    deadline: 'Convocatorias regionales durante el año — verificar en innpulsacolombia.com',
    url: 'https://www.innpulsacolombia.com',
  },
  {
    id: 3,
    name: 'Microcrédito para Turismo',
    entity: 'Bancóldex',
    description:
      'Líneas de crédito especiales para micro y pequeñas empresas del sector turístico, con tasas preferenciales y plazos extendidos. Se tramita a través de bancos intermediarios.',
    type: 'credito',
    eligibility:
      'Micro y pequeñas empresas turísticas formalizadas. Aplica para hospedajes, guías, artesanías y gastronomía. Tramitar en Bancolombia, Banco de Bogotá, Davivienda u otros bancos aliados.',
    benefit: 'Créditos desde $5M hasta $500M COP a tasas por debajo del mercado',
    deadline: 'Disponible de forma permanente a través de bancos aliados',
    url: 'https://www.bancoldex.com',
  },
  {
    id: 4,
    name: 'Fontur — Fondo Nacional de Turismo',
    entity: 'MinCIT / Fontur',
    description:
      'Cofinanciación de proyectos de desarrollo turístico sostenible, con énfasis en comunidades locales, indígenas y rurales. Cubre infraestructura, formación y promoción.',
    type: 'capital',
    eligibility:
      'Emprendedores y comunidades del sector turístico. Se priorizan proyectos con impacto cultural o ambiental en municipios con vocación turística. Comunidades wayuu son elegibles.',
    benefit: 'Cofinanciación de hasta el 80% del valor del proyecto',
    deadline: 'Convocatorias anuales — verificar en fontur.com.co',
    url: 'https://fontur.com.co',
  },
  {
    id: 5,
    name: 'Turismo Comunitario',
    entity: 'MinCIT',
    description:
      'Apoyo directo a iniciativas de turismo comunitario lideradas por comunidades indígenas, afrodescendientes y campesinas. Incluye acompañamiento técnico y dotación básica.',
    type: 'apoyo',
    eligibility:
      'Comunidades organizadas con iniciativas de turismo cultural, ecoturismo o artesanías. Prioridad para comunidades indígenas como la Wayuu. Requiere organización comunitaria activa.',
    benefit: 'Acompañamiento técnico, formación y cofinanciación de infraestructura básica',
    deadline: 'Solicitar a la Dirección de Turismo del MinCIT o a la Gobernación de La Guajira',
    url: 'https://www.mincit.gov.co/turismo',
  },
  {
    id: 6,
    name: 'Asistencia Técnica para PYMES',
    entity: 'Colombia Productiva',
    description:
      'Programa de formación y asistencia técnica gratuita para mejorar la competitividad de pequeñas empresas turísticas: calidad del servicio, costos, branding y mercados.',
    type: 'formacion',
    eligibility:
      'Empresas turísticas en operación con mínimo 1 año de funcionamiento. Incluye hospedajes, restaurantes, agencias, guías y artesanos con empresa registrada.',
    benefit: 'Asistencia técnica gratuita, formación especializada y certificaciones',
    deadline: 'Inscripciones permanentes — ver programas disponibles en colombiaproductiva.com',
    url: 'https://www.colombiaproductiva.com',
  },
]

export const programTypeLabels: Record<ProgramType, string> = {
  capital: 'Capital Semilla',
  credito: 'Crédito',
  formacion: 'Formación',
  apoyo: 'Apoyo Técnico',
}

export const programTypeColors: Record<ProgramType, { bg: string; text: string; border: string }> = {
  capital: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  credito: { bg: 'bg-turquoise-50', text: 'text-turquoise-700', border: 'border-turquoise-200' },
  formacion: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  apoyo: { bg: 'bg-coral-50', text: 'text-coral-700', border: 'border-coral-200' },
}
