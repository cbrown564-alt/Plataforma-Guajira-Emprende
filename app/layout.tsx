import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Guajira Emprende · Prototipo de tesis',
  description:
    'Propuesta académica para conectar a emprendedores turísticos wayuu y guajiros con los programas, recursos y referentes que ya existen en Colombia.',
  keywords: ['emprendimiento', 'turismo', 'La Guajira', 'wayuu', 'Colombia', 'tesis', 'prototipo'],
  openGraph: {
    title: 'Guajira Emprende · Prototipo de tesis',
    description:
      'Propuesta académica para conectar a emprendedores turísticos wayuu y guajiros con los programas y recursos que ya existen.',
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guajira Emprende · Prototipo de tesis',
    description:
      'Propuesta académica para conectar a emprendedores turísticos wayuu y guajiros con los programas y recursos que ya existen.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#c2410c',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-CO" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
