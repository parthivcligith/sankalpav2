import Preloader from "@/components/preloader"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import ScrollMarquee from "@/components/scroll-marquee"
import AboutSection from "@/components/about-section"
import ProjectsSection from "@/components/projects-section"
import WhyChooseUsSection from "@/components/why-choose-us-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="relative overflow-x-hidden">
      {/* Content wrapper – MUST have higher z-index */}
      <div className="relative z-[999]">
        <Preloader />
        <Navigation />
        <main>
          <HeroSection />
          <ScrollMarquee />
          <AboutSection />
          <ProjectsSection />
          <WhyChooseUsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
