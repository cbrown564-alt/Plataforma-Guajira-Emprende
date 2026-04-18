import Navigation from '@/components/navigation'
import Hero from '@/components/sections/hero'
import Programs from '@/components/sections/programs'
import LearningHub from '@/components/sections/learning-hub'
import Directory from '@/components/sections/directory'
import Contact from '@/components/sections/contact'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'

export default function Page() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Programs />
        <LearningHub />
        <Directory />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
