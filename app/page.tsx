import Navigation from "@/components/navigation"
import HeroSection from "@/components/sections/hero-section"
import OpportunitiesSection from "@/components/sections/opportunities-section"
import ProgramsSection from "@/components/sections/programs-section"
import DirectorySection from "@/components/sections/directory-section"
import ContactSection from "@/components/sections/contact-section"
import Footer from "@/components/sections/footer"
import WhatsAppButton from "@/components/whatsapp-button"

export default function Page() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <section id="home">
        <HeroSection />
      </section>
      <section id="opportunities">
        <OpportunitiesSection />
      </section>
      <section id="training">
        <ProgramsSection />
      </section>
      <section id="directory">
        <DirectorySection />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
