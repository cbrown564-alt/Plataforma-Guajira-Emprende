import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50/30 to-white flex items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <div className="text-8xl font-bold text-amber-800/30 mb-4">404</div>
        <h1 className="text-3xl lg:text-4xl font-bold text-amber-900 mb-4">
          Esta página no está disponible
        </h1>
        <p className="text-lg text-amber-700 mb-8">
          La oportunidad o programa que buscas puede haber sido movido, o la convocatoria ya cerró. Vuelve al inicio
          para ver todo lo que está abierto ahora.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="bg-turquoise-600 hover:bg-turquoise-700 text-white font-semibold px-6 py-3 rounded-full">
              <Home className="mr-2 h-4 w-4" />
              Ir al inicio
            </Button>
          </Link>
          <Link href="/#opportunities">
            <Button
              variant="outline"
              className="border-2 border-turquoise-500 text-turquoise-700 hover:bg-turquoise-50 font-semibold px-6 py-3 rounded-full"
            >
              <Search className="mr-2 h-4 w-4" />
              Ver oportunidades activas
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
