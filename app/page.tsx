import Navigation from "../navigation"
import HeroSection from "../hero-section"
import ProgramsSection from "../programs-section"
import LearningSection from "../learning-section"
import DirectorySection from "../directory-section"
import ContactSection from "../contact-section"
import Footer from "../footer"

export default function Page() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <section id="inicio">
        <HeroSection />
      </section>
      <section id="programas">
        <ProgramsSection />
      </section>
      <LearningSection />
      <section id="directorio">
        <DirectorySection />
      </section>
      <section id="contacto">
        <ContactSection />
      </section>
      <Footer />
    </div>
  )
}
