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


export const metadata = {
  title: "Sankalpa Builders - Building Dreams, One Project at a Time",
  description:
    "Founded in 2008, Sankalpa Builders has grown into one of Kerala's most trusted construction companies, based in Ernakulam.",
  alternates: {
    canonical: "https://www.sankalpabuilders.com/",
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Sankalpa Builders",
    url: "https://www.sankalpabuilders.com/",
    images: [
      {
        url: "/favicon.ico",
        width: 32,
        height: 32,
        alt: "Sankalpa Builders logo",
      },
    ],
  },
};



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
