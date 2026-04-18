import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ProgramDetailPage from "../../../program-detail-page"
import { getProgramById, programs } from "@/data/programs"

export function generateStaticParams() {
  return programs.map((program) => ({ id: String(program.id) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const program = getProgramById(id)

  if (!program) {
    return {
      title: "Programa no encontrado | Guajira Emprende",
    }
  }

  const title = `${program.name} | Guajira Emprende`
  const description = program.overview

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const program = getProgramById(id)

  if (!program) {
    notFound()
  }

  return <ProgramDetailPage id={id} />
}
