'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Programas', href: '/#programas' },
  { label: 'Aprender', href: '/#aprender' },
  { label: 'Directorio', href: '/#directorio' },
  { label: 'Contacto', href: '/#contacto' },
]

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-lg text-amber-900 leading-tight">
              Guajira<span className="text-turquoise-600">Emprende</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-amber-800 hover:text-turquoise-600 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/unete" className="hidden md:block">
              <Button
                size="sm"
                className="bg-turquoise-600 hover:bg-turquoise-700 text-white font-semibold rounded-full px-5"
              >
                Únete
              </Button>
            </Link>

            <button
              className="md:hidden p-2 text-amber-900"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-amber-800 hover:text-turquoise-600 py-2"
            >
              {link.label}
            </a>
          ))}
          <Link href="/unete" onClick={() => setOpen(false)}>
            <Button className="w-full bg-turquoise-600 hover:bg-turquoise-700 text-white font-semibold rounded-full mt-2">
              Únete a la Comunidad
            </Button>
          </Link>
        </div>
      )}
    </header>
  )
}
