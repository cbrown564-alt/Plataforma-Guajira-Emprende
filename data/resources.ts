export type ResourceType = 'curso' | 'guia' | 'herramienta'

export interface Resource {
  id: number
  title: string
  provider: string
  description: string
  type: ResourceType
  free: boolean
  url: string
}

export const resources: Resource[] = [
  {
    id: 1,
    title: 'Cursos de Emprendimiento y Gestión Empresarial',
    provider: 'SENA Sofía Plus',
    description:
      'Más de 200 cursos gratuitos en emprendimiento, contabilidad básica, atención al cliente y gestión de negocios. Los certificados son reconocidos oficialmente por el SENA.',
    type: 'curso',
    free: true,
    url: 'https://oferta.senasofiaplus.edu.co',
  },
  {
    id: 2,
    title: 'Cursos de Turismo, Guianza y Hotelería',
    provider: 'SENA Sofía Plus',
    description:
      'Programas especializados en guianza turística, turismo sostenible, servicio en restaurantes y gestión de alojamiento. Acceso gratuito con cédula colombiana.',
    type: 'curso',
    free: true,
    url: 'https://oferta.senasofiaplus.edu.co',
  },
  {
    id: 3,
    title: 'Formación en Turismo Sostenible',
    provider: 'MinCIT',
    description:
      'Programa de capacitación en turismo sostenible, calidad en el servicio al viajero y valorización de la cultura wayuu como oferta turística diferencial.',
    type: 'curso',
    free: true,
    url: 'https://www.mincit.gov.co/turismo/formacion-en-turismo',
  },
  {
    id: 4,
    title: 'Guía para el Registro Nacional de Turismo (RNT)',
    provider: 'MinCIT',
    description:
      'Paso a paso para registrar formalmente tu emprendimiento turístico. El RNT es obligatorio para prestar servicios turísticos en Colombia y abre puertas a programas de apoyo.',
    type: 'guia',
    free: true,
    url: 'https://www.mincit.gov.co/ministerio/cartera-ministerial/fondos-mixtos-y-entidades-adscritas/fondo-nacional-de-turismo/registro-nacional-de-turismo',
  },
  {
    id: 5,
    title: 'Cómo Registrar tu Empresa',
    provider: 'Cámaras de Comercio',
    description:
      'Guía práctica para registrar tu empresa en Cámara de Comercio, obtener el RUT y cumplir los requisitos legales básicos. La formalización es el primer paso para acceder a créditos y programas.',
    type: 'guia',
    free: true,
    url: 'https://www.camarascomercio.org.co',
  },
  {
    id: 6,
    title: 'Manual de Buenas Prácticas para Turismo Sostenible',
    provider: 'MinCIT',
    description:
      'Guía oficial con estándares de sostenibilidad para prestadores de servicios turísticos en Colombia. Cubre aspectos ambientales, socioculturales y económicos.',
    type: 'guia',
    free: true,
    url: 'https://www.mincit.gov.co/turismo/calidad-y-desarrollo-sostenible/turismo-sostenible',
  },
  {
    id: 7,
    title: 'Kit Emprendedor — Plantillas y Modelos',
    provider: 'iNNpulsa Colombia',
    description:
      'Plantillas de modelo de negocio, plan financiero básico y guía para estructurar tu propuesta de valor. Descarga gratuita sin registro.',
    type: 'herramienta',
    free: true,
    url: 'https://www.innpulsacolombia.com/recursos-para-emprendedores',
  },
  {
    id: 8,
    title: 'Guía para Presentar tu Proyecto a Fondo Emprender',
    provider: 'SENA',
    description:
      'Instrucciones detalladas para preparar un plan de negocios que cumpla los requisitos de Fondo Emprender: estructura, secciones requeridas y criterios de evaluación.',
    type: 'herramienta',
    free: true,
    url: 'https://www.fondoemprender.com/SitePages/ComoParticipar.aspx',
  },
]
