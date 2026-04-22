import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
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
  title: 'Guajira Emprende | Plataforma de Emprendimiento Turístico',
  description: 'Conectamos emprendedores wayuu y guajiros con oportunidades reales. Accede a apoyos, formación y comunidad para hacer crecer tu negocio turístico en La Guajira, Colombia.',
  keywords: ['emprendimiento', 'turismo', 'La Guajira', 'wayuu', 'Colombia', 'negocios', 'formación'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#c2410c',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
