'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft, Users, MapPin, Mail, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

// Replace with your Formspree form ID — see .env.example
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID ?? 'YOUR_FORM_ID'

const municipalities = [
  'Riohacha', 'Maicao', 'Uribia', 'Manaure', 'Albania', 'Barrancas',
  'Distracción', 'El Molino', 'Fonseca', 'Hatonuevo', 'La Jagua del Pilar',
  'San Juan del Cesar', 'Villanueva', 'Dibulla', 'Otra comunidad',
]

const supportOptions = [
  { id: 'financiacion', label: 'Financiación para mi proyecto' },
  { id: 'formacion', label: 'Capacitación y formación' },
  { id: 'mentoria', label: 'Mentoría y acompañamiento' },
  { id: 'networking', label: 'Conexiones y networking' },
  { id: 'marketing', label: 'Marketing y promoción' },
  { id: 'legal', label: 'Asesoría legal y registros' },
]

const schema = z.object({
  nombre: z.string().min(2, 'Ingresa tu nombre completo'),
  municipio: z.string().min(1, 'Selecciona tu municipio'),
  contacto: z.string().min(5, 'Ingresa tu correo o número de WhatsApp'),
  tipoApoyo: z.array(z.string()).optional(),
})

type FormValues = z.infer<typeof schema>

export default function UnetePage() {
  const [submitted, setSubmitted] = useState(false)
  const [submittedName, setSubmittedName] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { tipoApoyo: [] },
  })

  const selectedSupport = watch('tipoApoyo') ?? []

  const toggleSupport = (id: string) => {
    const current = selectedSupport
    setValue(
      'tipoApoyo',
      current.includes(id) ? current.filter((s) => s !== id) : [...current, id]
    )
  }

  const onSubmit = async (data: FormValues) => {
    if (FORMSPREE_ID === 'YOUR_FORM_ID') {
      toast.error('Configura tu Formspree ID en las variables de entorno.')
      return
    }
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setSubmittedName(data.nombre)
      setSubmitted(true)
    } catch {
      toast.error('Hubo un error al enviar. Intenta de nuevo o escríbenos por WhatsApp.')
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-green-900 mb-3">¡Bienvenido, {submittedName}!</h1>
          <p className="text-green-700 mb-8 leading-relaxed">
            Gracias por unirte. Te contactaremos cuando haya nuevas oportunidades relevantes para tu
            emprendimiento.
          </p>
          <Link href="/">
            <Button className="bg-turquoise-600 hover:bg-turquoise-700 text-white rounded-full px-8">
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 to-white">
      <div className="bg-white border-b border-amber-100 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-amber-800 hover:text-turquoise-600 transition-colors text-sm font-medium">
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-turquoise-500 to-amber-500 rounded-full mb-4">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-amber-900 mb-2">Únete a la Comunidad</h1>
          <p className="text-amber-700 text-sm leading-relaxed">
            Regístrate para recibir actualizaciones sobre convocatorias, eventos y recursos
            relevantes para tu emprendimiento turístico en La Guajira.
          </p>
        </div>

        <div className="bg-white rounded-2xl border-2 border-amber-200 shadow-sm p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-amber-800 mb-1.5">
                <Users className="h-4 w-4 inline mr-1.5" />
                Nombre completo *
              </label>
              <input
                {...register('nombre')}
                type="text"
                placeholder="Tu nombre completo"
                className="w-full px-4 py-2.5 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-turquoise-400 focus:border-transparent"
              />
              {errors.nombre && (
                <p className="text-xs text-red-500 mt-1">{errors.nombre.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-amber-800 mb-1.5">
                <MapPin className="h-4 w-4 inline mr-1.5" />
                Municipio o comunidad *
              </label>
              <select
                {...register('municipio')}
                className="w-full px-4 py-2.5 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-turquoise-400 focus:border-transparent bg-white"
              >
                <option value="">Selecciona tu ubicación</option>
                {municipalities.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              {errors.municipio && (
                <p className="text-xs text-red-500 mt-1">{errors.municipio.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-amber-800 mb-1.5">
                <Mail className="h-4 w-4 inline mr-1.5" />
                Correo o WhatsApp *
              </label>
              <input
                {...register('contacto')}
                type="text"
                placeholder="tu@correo.com o +57 300 123 4567"
                className="w-full px-4 py-2.5 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-turquoise-400 focus:border-transparent"
              />
              {errors.contacto && (
                <p className="text-xs text-red-500 mt-1">{errors.contacto.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-amber-800 mb-3">
                ¿Qué tipo de apoyo buscas? (opcional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {supportOptions.map((opt) => (
                  <label
                    key={opt.id}
                    className="flex items-center gap-3 p-3 border border-amber-100 rounded-xl hover:bg-amber-50 cursor-pointer transition-colors"
                  >
                    <Checkbox
                      checked={selectedSupport.includes(opt.id)}
                      onCheckedChange={() => toggleSupport(opt.id)}
                      className="data-[state=checked]:bg-turquoise-600 data-[state=checked]:border-turquoise-600"
                    />
                    <span className="text-sm text-amber-900">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-turquoise-600 hover:bg-turquoise-700 text-white font-bold py-3 rounded-full disabled:opacity-50 transition-all"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Enviando...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Unirme a la comunidad
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
