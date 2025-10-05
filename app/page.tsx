import MeshBackground from "@/components/MeshBackground"
import Preloader from "@/components/preloader"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import ScrollMarquee from "@/components/scroll-marquee"
import AboutSection from "@/components/about-section"
import ServicesSection from "@/components/services-section"
import ProjectsSection from "@/components/projects-section"
import WhyChooseUsSection from "@/components/why-choose-us-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="relative overflow-x-hidden">
      {/* Background animation */}
      <MeshBackground />

      {/* Content wrapper – MUST have higher z-index */}
      <div className="relative z-[999]">
        <Preloader />
        <Navigation />

        <main>
          <HeroSection />
          <ScrollMarquee />
          <AboutSection />
          <ServicesSection />
          <ProjectsSection />
          <WhyChooseUsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
