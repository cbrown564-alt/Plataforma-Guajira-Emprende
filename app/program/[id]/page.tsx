import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ProgramDetailPage from "@/components/pages/program-detail-page"
import { getProgramById, programs } from "@/data/programs"

export function generateStaticParams() {
  return programs.map((program) => ({ id: program.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const program = getProgramById(id)
  if (!program) {
    return { title: "Programa no encontrado | Guajira Emprende" }
  }
  return {
    title: `${program.title} | Guajira Emprende`,
    description: program.description,
  }
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  if (!getProgramById(id)) notFound()
  return <ProgramDetailPage id={id} />
}
