import { MessageCircle } from 'lucide-react'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '573001234567'
const message = encodeURIComponent(
  'Hola, me interesa conocer más sobre los programas de apoyo para emprendedores turísticos en La Guajira.'
)

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  )
}
