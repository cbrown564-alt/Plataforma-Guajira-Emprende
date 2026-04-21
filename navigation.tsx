"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, Search, X } from "lucide-react"
import Link from "next/link"
import { openCommandPalette } from "@/components/command-palette"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsMac(/Mac|iPhone|iPod|iPad/.test(navigator.platform))
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const openSearch = () => {
    setIsMenuOpen(false)
    openCommandPalette()
  }

  const navLinks = [
    { name: "Inicio", href: "#home" },
    { name: "Oportunidades", href: "#opportunities" },
    { name: "Programas", href: "#training" },
    { name: "Directorio", href: "#directory" },
    { name: "Contacto", href: "#contact" },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" 
        : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo/Platform Name */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-secondary to-teal-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 lg:w-5 lg:h-5 bg-white rounded-sm transform rotate-45"></div>
            </div>
            <div className={`text-lg lg:text-xl font-bold transition-colors duration-300 ${
              isScrolled ? "text-foreground" : "text-white"
            }`}>
              <span className={isScrolled ? "text-primary" : "text-white"}>Guajira</span>
              <span className={`ml-1 ${isScrolled ? "text-secondary" : "text-accent"}`}>Emprende</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-3 lg:px-4 py-2 text-sm lg:text-base font-medium rounded-lg transition-all duration-200 relative group ${
                  isScrolled 
                    ? "text-foreground hover:text-primary hover:bg-muted" 
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 group-hover:w-3/4 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300 ${
                  isScrolled ? "bg-primary" : "bg-accent"
                }`}></span>
              </a>
            ))}
          </div>

          {/* Right side actions - Desktop */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Buscar en Guajira Emprende"
              className={`flex items-center gap-2 rounded-full px-3 lg:px-4 py-2 text-sm transition-all duration-200 min-h-[44px] border ${
                isScrolled
                  ? "border-border bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
                  : "border-white/30 bg-white/10 text-white/90 hover:bg-white/20 hover:text-white backdrop-blur-sm"
              }`}
            >
              <Search className="h-4 w-4" />
              <span className="hidden lg:inline">Buscar…</span>
              <kbd
                className={`ml-2 hidden lg:inline-flex items-center gap-0.5 rounded border px-1.5 py-0.5 text-[10px] font-medium ${
                  isScrolled
                    ? "border-border bg-background text-muted-foreground"
                    : "border-white/30 bg-white/10 text-white/80"
                }`}
              >
                <span className="text-[11px]">{isMac ? "⌘" : "Ctrl"}</span>
                <span>K</span>
              </kbd>
            </button>
            <Link href="/onboarding">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-4 lg:px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 min-h-[44px]">
                Únete Ahora
              </Button>
            </Link>
          </div>

          {/* Mobile buttons */}
          <div className="md:hidden flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={openSearch}
              aria-label="Buscar"
              className={`min-h-[44px] min-w-[44px] ${
                isScrolled
                  ? "text-foreground hover:text-primary hover:bg-muted"
                  : "text-white hover:text-white hover:bg-white/10"
              }`}
            >
              <Search className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              className={`min-h-[44px] min-w-[44px] ${
                isScrolled
                  ? "text-foreground hover:text-primary hover:bg-muted"
                  : "text-white hover:text-white hover:bg-white/10"
              }`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/98 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all duration-200 min-h-[48px] flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2">
                <Link href="/onboarding">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 rounded-full shadow-md min-h-[48px]">
                    Únete Ahora
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
