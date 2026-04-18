import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import './globals.css'

export const metadata: Metadata = {
  title: 'Plataforma Guajira Emprende',
  description:
    'Conectamos emprendedores turísticos wayuu y guajiros con programas de financiación, formación y apoyo. Una propuesta académica para centralizar los recursos que ya existen.',
  openGraph: {
    title: 'Plataforma Guajira Emprende',
    description:
      'Programas de financiación, formación y apoyo para emprendedores turísticos en La Guajira, Colombia.',
    locale: 'es_CO',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body>
        {children}
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  )
}
