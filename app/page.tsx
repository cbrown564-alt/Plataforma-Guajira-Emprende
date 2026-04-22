import Navigation from "../navigation"
import HeroSection from "../hero-section"
import OpportunityFinder from "../opportunity-finder"
import OpportunitiesSection from "../opportunities-section"
import ProgramsSection from "../programs-section"
import DirectorySection from "../directory-section"
import ContactSection from "../contact-section"
import Footer from "../footer"
import WhatsAppButton from "../whatsapp-button"

export default function Page() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <section id="home">
        <HeroSection />
      </section>
      <OpportunityFinder />
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
