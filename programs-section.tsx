import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DollarSign,
  GraduationCap,
  Users,
  Building2,
  Globe,
  HandHeart,
  ExternalLink,
} from "lucide-react"

type Program = {
  id: string
  title: string
  description: string
  audience: string
  fundingType: string
  source: string
  url: string
  Icon: typeof DollarSign
  accent: string
}

const programs: Program[] = [
  {
    id: "fondo-emprender",
    title: "Fondo Emprender",
    description:
      "Capital semilla no reembolsable del SENA para planes de negocio formulados por aprendices, egresados y profesionales.",
    audience: "Aprendices y egresados SENA, profesionales recién graduados",
    fundingType: "Capital semilla no reembolsable",
    source: "SENA",
    url: "https://www.fondoemprender.com/",
    Icon: DollarSign,
    accent: "text-green-700",
  },
  {
    id: "innpulsa",
    title: "iNNpulsa Colombia",
    description:
      "Convocatorias y programas de la agencia nacional de emprendimiento e innovación, con enfoque en escalamiento y exportación.",
    audience: "Emprendedores formales con producto en el mercado",
    fundingType: "Cofinanciación y acompañamiento",
    source: "iNNpulsa Colombia",
    url: "https://innpulsacolombia.com/",
    Icon: Building2,
    accent: "text-amber-700",
  },
  {
    id: "bancoldex",
    title: "Microcréditos Bancóldex",
    description:
      "Líneas de crédito a través de intermediarios financieros para mipymes, incluyendo el sector turismo.",
    audience: "Mipymes formalizadas",
    fundingType: "Crédito",
    source: "Bancóldex",
    url: "https://www.bancoldex.com/",
    Icon: Users,
    accent: "text-coral-700",
  },
  {
    id: "turismo-comunitario",
    title: "Turismo Comunitario — MinCIT",
    description:
      "Programa del Ministerio de Comercio, Industria y Turismo de fortalecimiento de iniciativas comunitarias.",
    audience: "Comunidades étnicas y rurales con iniciativa turística",
    fundingType: "Apoyo técnico y formación",
    source: "MinCIT",
    url: "https://www.mincit.gov.co/minturismo",
    Icon: HandHeart,
    accent: "text-rose-700",
  },
  {
    id: "procolombia",
    title: "ProColombia — Turismo",
    description:
      "Promoción internacional, ruedas de negocio y capacitaciones para prestadores de servicios turísticos.",
    audience: "Prestadores con RNT vigente y vocación exportadora",
    fundingType: "Promoción y networking",
    source: "ProColombia",
    url: "https://procolombia.co/turismo",
    Icon: Globe,
    accent: "text-turquoise-700",
  },
  {
    id: "sena-formacion",
    title: "SENA — Formación titulada y complementaria",
    description:
      "Cursos gratuitos en turismo, atención al cliente, gastronomía y emprendimiento, presenciales y virtuales.",
    audience: "Cualquier persona mayor de 14 años",
    fundingType: "Formación gratuita",
    source: "SENA",
    url: "https://oferta.senasofiaplus.edu.co/sofia-oferta/",
    Icon: GraduationCap,
    accent: "text-purple-700",
  },
]

export default function ProgramsSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-amber-50/30 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 mb-4">Programas que ya existen</h2>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Una selección de programas públicos colombianos relevantes para emprendedores turísticos en La
            Guajira. Cada tarjeta enlaza al sitio oficial — allí encontrarás convocatorias, plazos y requisitos
            actualizados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProgramCard({ program }: { program: Program }) {
  const { Icon } = program
  return (
    <Card className="border-2 border-amber-100 hover:border-amber-300 hover:shadow-lg transition-all duration-300 bg-white flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className={`p-3 rounded-xl bg-amber-50`}>
            <Icon className={`h-6 w-6 ${program.accent}`} />
          </div>
          <span className="text-xs text-gray-500 font-medium">{program.source}</span>
        </div>
        <CardTitle className="text-xl font-bold text-amber-900">{program.title}</CardTitle>
        <p className="text-sm text-amber-700 leading-relaxed mt-2">{program.description}</p>
      </CardHeader>

      <CardContent className="space-y-3 flex-1">
        <div>
          <span className="text-xs text-gray-500 block uppercase tracking-wide">Tipo</span>
          <span className="text-sm text-amber-800 font-medium">{program.fundingType}</span>
        </div>
        <div>
          <span className="text-xs text-gray-500 block uppercase tracking-wide">Dirigido a</span>
          <span className="text-sm text-amber-800">{program.audience}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        <a href={program.url} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button className="w-full bg-amber-900 hover:bg-amber-800 text-white font-semibold py-2 rounded-lg">
            Ver sitio oficial
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </a>
      </CardFooter>
    </Card>
  )
}
