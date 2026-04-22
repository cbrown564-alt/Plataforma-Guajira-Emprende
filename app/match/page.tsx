import type { Metadata } from "next"
import MatchPage from "../../match-page"

export const metadata: Metadata = {
  title: "Encuentra tu Apoyo | Guajira Emprende",
  description:
    "Responde 4 preguntas y descubre qué oportunidades de financiación, formación y mentoría en La Guajira se ajustan mejor a tu perfil.",
}

export default function Page() {
  return <MatchPage />
}
