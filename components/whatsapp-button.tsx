"use client"

import { MessageCircle } from "lucide-react"
import { openWhatsApp } from "@/lib/whatsapp"

export default function WhatsAppButton() {
  const handleClick = () =>
    openWhatsApp(
      "¡Hola! 👋 Necesito ayuda con los programas de financiación de Plataforma Guajira Emprende. ¿Podrían orientarme sobre las oportunidades disponibles?",
    )

  return (
    <>
      {/* Mobile Version */}
      <button
        onClick={handleClick}
        className="md:hidden fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Contactar por WhatsApp para ayuda con programas de financiación"
      >
        <div className="relative">
          <MessageCircle className="h-6 w-6" />
          {/* Notification dot */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-bounce" />
          {/* Pulse effect */}
          <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75" />
        </div>
      </button>

      {/* Desktop Version */}
      <button
        onClick={handleClick}
        className="hidden md:flex fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 items-center space-x-3 group"
        aria-label="Contactar por WhatsApp para ayuda con programas de financiación"
      >
        <div className="relative">
          <MessageCircle className="h-5 w-5" />
          {/* Notification dot */}
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-bounce" />
        </div>
        <span className="font-bold text-sm whitespace-nowrap">¿Necesitas ayuda?</span>

        {/* Pulse effect */}
        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75 group-hover:opacity-0 transition-opacity" />

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Chatea con nuestro equipo de apoyo
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
        </div>
      </button>
    </>
  )
}
