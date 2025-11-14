"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, MessageCircle } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [visibleStats, setVisibleStats] = useState<boolean[]>([false, false, false, false])
  const statsRef = useRef<(HTMLDivElement | null)[]>([])

  const rotatingTexts = [
    "We are proud to be a CPWD & PWD enlisted contractor",
    "Building landmarks that last a lifetime since 2008",
    "100+ Projects Completed with Excellence",
    "Trusted builders for homes, offices, and complexes",
    "100% Client Satisfaction Guaranteed",
  ]

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (!isMobile) return

    const observers = statsRef.current.map((stat, index) => {
      if (!stat) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleStats((prev) => {
                const newVisible = [...prev]
                newVisible[index] = true
                return newVisible
              })
            }
          })
        },
        { threshold: 0.5 },
      )

      observer.observe(stat)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  const handleContactUs = () => {
    const message =
      "Hello Sankalpa Builders! I'm interested in your construction services and would like to discuss my project requirements."
    const whatsappUrl = `https://wa.me/919947004671?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleExploreProjects = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-8 sm:pb-12 md:pb-16"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat animate-ken-burns"
          style={{
            backgroundImage: `url('/images/3d-rendering-dining-set-modern-luxury-dining-room.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-slate-900/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <div className="max-w-5xl mx-auto">
          <div className="mb-4 sm:mb-5 md:mb-6">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 backdrop-blur-sm rounded-full bg-white/10 border border-white/20">
              <div className="w-2 h-2 rounded-full mr-2 sm:mr-3 animate-pulse bg-white"></div>
              <span
                key={currentTextIndex}
                className="font-semibold text-xs sm:text-sm lg:text-base animate-fade-in-up text-white"
              >
                {rotatingTexts[currentTextIndex]}
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-5 md:mb-6 leading-tight px-2">
            <span
              className="inline-block animate-slide-in-left opacity-0"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              We
            </span>{" "}
            <span
              className="inline-block animate-slide-in-right opacity-0"
              style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
            >
              Build
            </span>
            <br className="hidden sm:block" />
            <span
              className="inline-block animate-fade-in-up opacity-0"
              style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
            >
              <span className="animate-gradient-text text-white">Landmarks</span>
            </span>{" "}
            <span
              className="inline-block animate-slide-in-left opacity-0 drop-shadow-lg"
              style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
            >
              That Last a Lifetime
            </span>
          </h1>

          {/* Description */}
          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white mb-6 sm:mb-7 md:mb-8 max-w-4xl mx-auto leading-relaxed px-4 sm:px-6 animate-fade-in-up opacity-0"
            style={{ animationDelay: "1s", animationFillMode: "forwards" }}
          >
            We deliver projects that stand the test of time.
            <br className="hidden sm:block" />
            Trusted builders for homes, offices, and complexes - residential, commercial, and government projects.
          </p>

          {/* Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-10 md:mb-12 animate-fade-in-up opacity-0 px-4 sm:px-6"
            style={{ animationDelay: "3.2s", animationFillMode: "forwards" }}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto bg-[#C9A961] hover:bg-slate-900 text-slate-900 border-2 border-[#C9A961] px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold group transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#C9A961]/30 hover:text-white"
              onClick={handleExploreProjects}
            >
              Explore Our Projects
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-2 border-[#C9A961] text-white hover:bg-[#C9A961] hover:text-slate-900 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold group transition-all duration-300 bg-transparent hover:scale-105 hover:shadow-2xl hover:shadow-[#C9A961]/30"
              onClick={handleContactUs}
            >
              <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-125 transition-transform duration-300" />
              Contact Us
            </Button>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto animate-fade-in-up px-4 sm:px-6"
            style={{ animationDelay: "3.4s" }}
          >
            <div
              ref={(el) => {
                statsRef.current[0] = el
              }}
              className="text-center group hover:scale-110 transition-all duration-500 animate-stat-reveal p-2 sm:p-3"
              style={{ animationDelay: "3.6s" }}
            >
              <div
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2 animate-number-count transition-colors duration-500 md:group-hover:text-[#C9A961] ${
                  visibleStats[0] ? "text-[#C9A961]" : "text-white"
                } md:text-white`}
              >
                100+
              </div>
              <div
                className={`text-xs sm:text-sm md:text-base animate-fade-in transition-colors duration-500 md:group-hover:text-[#E5D4A6] ${
                  visibleStats[0] ? "text-[#E5D4A6]" : "text-white/80"
                } md:text-white/80`}
              >
                Projects Completed
              </div>
            </div>
            <div
              ref={(el) => {
                statsRef.current[1] = el
              }}
              className="text-center group hover:scale-110 transition-all duration-500 animate-stat-reveal p-2 sm:p-3"
              style={{ animationDelay: "3.8s" }}
            >
              <div
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2 animate-number-count transition-colors duration-500 md:group-hover:text-[#C9A961] ${
                  visibleStats[1] ? "text-[#C9A961]" : "text-white"
                } md:text-white`}
              >
                16+
              </div>
              <div
                className={`text-xs sm:text-sm md:text-base animate-fade-in transition-colors duration-500 md:group-hover:text-[#E5D4A6] ${
                  visibleStats[1] ? "text-[#E5D4A6]" : "text-white/80"
                } md:text-white/80`}
              >
                Years Since 2008
              </div>
            </div>
            <div
              ref={(el) => {
                statsRef.current[2] = el
              }}
              className="text-center group hover:scale-110 transition-all duration-500 animate-stat-reveal p-2 sm:p-3"
              style={{ animationDelay: "4s" }}
            >
              <div
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2 animate-number-count transition-colors duration-500 md:group-hover:text-[#C9A961] ${
                  visibleStats[2] ? "text-[#C9A961]" : "text-white"
                } md:text-white`}
              >
                1M+
              </div>
              <div
                className={`text-xs sm:text-sm md:text-base animate-fade-in transition-colors duration-500 md:group-hover:text-[#E5D4A6] ${
                  visibleStats[2] ? "text-[#E5D4A6]" : "text-white/80"
                } md:text-white/80`}
              >
                Sq.Ft Built
              </div>
            </div>
            <div
              ref={(el) => {
                statsRef.current[3] = el
              }}
              className="text-center group hover:scale-110 transition-all duration-500 animate-stat-reveal p-2 sm:p-3"
              style={{ animationDelay: "4.2s" }}
            >
              <div
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2 animate-number-count transition-colors duration-500 md:group-hover:text-[#C9A961] ${
                  visibleStats[3] ? "text-[#C9A961]" : "text-white"
                } md:text-white`}
              >
                100%
              </div>
              <div
                className={`text-xs sm:text-sm md:text-base animate-fade-in transition-colors duration-500 md:group-hover:text-[#E5D4A6] ${
                  visibleStats[3] ? "text-[#E5D4A6]" : "text-white/80"
                } md:text-white/80`}
              >
                Client Satisfaction
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce-gentle">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center animate-border-pulse">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-scroll-dot" />
        </div>
      </div>

      {/* Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-4xl w-full aspect-video bg-slate-900 rounded-lg overflow-hidden animate-scale-in">
            <button
              onClick={() => setIsVideoPlaying(false)}
              className="absolute top-4 right-4 z-10 text-white hover:text-emerald-400 transition-colors hover:scale-110 transform duration-200"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="text-center">
                <Play className="w-16 h-16 mx-auto mb-4 animate-pulse" style={{ color: "#E8C547" }} />
                <p className="text-lg">Company Story Video</p>
                <p className="text-sm text-slate-400 mt-2">Video content would be embedded here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
