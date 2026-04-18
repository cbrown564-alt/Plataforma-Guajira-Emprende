"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navLinks = [
    { name: "Inicio", href: "#inicio" },
    { name: "Programas", href: "#programas" },
    { name: "Aprender", href: "#aprender" },
    { name: "Directorio", href: "#directorio" },
    { name: "Contacto", href: "#contacto" },
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

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Link href="/unete">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-4 lg:px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 min-h-[44px]">
                Únete Ahora
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
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
                <Link href="/unete">
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
