"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, MessageCircle } from "lucide-react"
import { useState, useEffect } from "react"

export default function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-20"
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

      {/* Animated particles */}
      <div className="absolute inset-0 z-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 sm:mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-emerald-600/20 backdrop-blur-sm border border-emerald-400/30 rounded-full">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></div>
              <span
                key={currentTextIndex}
                className="text-emerald-300 font-semibold text-sm sm:text-base animate-fade-in-up"
              >
                {rotatingTexts[currentTextIndex]}
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
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
              <span className="text-emerald-400 animate-gradient-text">Landmarks</span>
            </span>{" "}
            <span
              className="inline-block animate-slide-in-left opacity-0 drop-shadow-lg"
              style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
            >
              That Last a Lifetime
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            <span
              className="inline-block animate-fade-in-up opacity-0"
              style={{ animationDelay: "1s", animationFillMode: "forwards" }}
            >
              We
            </span>{" "}
            <span
              className="inline-block animate-fade-in-up opacity-0"
              style={{ animationDelay: "1.1s", animationFillMode: "forwards" }}
            >
              deliver
            </span>{" "}
            <span
              className="inline-block animate-fade-in-up opacity-0"
              style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}
            >
              projects
            </span>{" "}
            <span
              className="inline-block animate-fade-in-up opacity-0"
              style={{ animationDelay: "1.3s", animationFillMode: "forwards" }}
            >
              that
            </span>{" "}
            <span
              className="inline-block animate-fade-in-up opacity-0"
              style={{ animationDelay: "1.4s", animationFillMode: "forwards" }}
            >
              stand
            </span>{" "}
            <span
              className="inline-block animate-fade-in-up opacity-0"
              style={{ animationDelay: "1.5s", animationFillMode: "forwards" }}
            >
              the
            </span>{" "}
            <span
              className="inline-block animate-fade-in-up opacity-0"
              style={{ animationDelay: "1.6s", animationFillMode: "forwards" }}
            >
              test
            </span>{" "}
            <span
              className="inline-block animate-fade-in-up opacity-0 text-emerald-300"
              style={{ animationDelay: "1.7s", animationFillMode: "forwards" }}
            >
              of
            </span>{" "}
            <span
              className="inline-block animate-fade-in-up opacity-0"
              style={{ animationDelay: "1.8s", animationFillMode: "forwards" }}
            >
              time.
            </span>
            <br className="hidden sm:block" />
            <span
              className="inline-block animate-fade-in-up opacity-0"
              style={{ animationDelay: "1.9s", animationFillMode: "forwards" }}
            >
              Trusted
            </span>{" "}
            <span
              className="inline-block animate-fade-in-up opacity-0"
              style={{ animationDelay: "2s", animationFillMode: "forwards" }}
            >
              builders
            </span>{" "}
            <span
              className="inline-block animate-fade-in-up opacity-0"
              style={{ animationDelay: "2.1s", animationFillMode: "forwards" }}
            >
              for
            </span>{" "}
            <span
              className="inline-block animate-fade-in-up opacity-0"
              style={{ animationDelay: "2.2s", animationFillMode: "forwards" }}
            >
              homes,
            </span>{" "}
            <span
              className="inline-block animate-fade-in-up opacity-0"
              style={{ animationDelay: "2.3s", animationFillMode: "forwards" }}
            >
              offices,
            </span>{" "}
            <span
              className="inline-block animate-fade-in-up opacity-0"
              style={{ animationDelay: "2.4s", animationFillMode: "forwards" }}
            >
              and
            </span>{" "}
            <span
              className="inline-block animate-fade-in-up opacity-0"
              style={{ animationDelay: "2.5s", animationFillMode: "forwards" }}
            >
              complexes
            </span>{" "}
            <span
              className="inline-block animate-fade-in-up opacity-0"
              style={{ animationDelay: "2.6s", animationFillMode: "forwards" }}
            >
              -
            </span>{" "}
            <span
              className="inline-block animate-fade-in-up opacity-0"
              style={{ animationDelay: "2.7s", animationFillMode: "forwards" }}
            >
              residential,
            </span>{" "}
            <span
              className="inline-block animate-fade-in-up opacity-0 text-emerald-300"
              style={{ animationDelay: "2.8s", animationFillMode: "forwards" }}
            >
              commercial,
            </span>{" "}
            <span
              className="inline-block animate-fade-in-up opacity-0"
              style={{ animationDelay: "2.9s", animationFillMode: "forwards" }}
            >
              and
            </span>{" "}
            <span
              className="inline-block animate-fade-in-up opacity-0 text-emerald-300"
              style={{ animationDelay: "3s", animationFillMode: "forwards" }}
            >
              government
            </span>{" "}
            <span
              className="inline-block animate-fade-in-up opacity-0"
              style={{ animationDelay: "3.1s", animationFillMode: "forwards" }}
            >
              projects.
            </span>
          </p>

          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 animate-fade-in-up opacity-0 px-4 sm:px-0"
            style={{ animationDelay: "3.2s", animationFillMode: "forwards" }}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold group transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              onClick={handleExploreProjects}
            >
              Explore Our Projects
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-slate-900 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold group transition-all duration-300 bg-transparent hover:scale-105 hover:shadow-2xl"
              onClick={handleContactUs}
            >
              <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-125 transition-transform duration-300" />
              Contact Us
            </Button>
          </div>

          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto animate-fade-in-up px-4 sm:px-0"
            style={{ animationDelay: "3.4s" }}
          >
            <div
              className="text-center group hover:scale-110 transition-transform duration-300 animate-stat-reveal"
              style={{ animationDelay: "3.6s" }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-400 mb-1 sm:mb-2 animate-number-count">
                100+
              </div>
              <div className="text-white text-xs sm:text-sm md:text-base animate-fade-in">Projects Completed</div>
            </div>
            <div
              className="text-center group hover:scale-110 transition-transform duration-300 animate-stat-reveal"
              style={{ animationDelay: "3.8s" }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-400 mb-1 sm:mb-2 animate-number-count">
                16+
              </div>
              <div className="text-white text-xs sm:text-sm md:text-base animate-fade-in">Years Since 2008</div>
            </div>
            <div
              className="text-center group hover:scale-110 transition-transform duration-300 animate-stat-reveal"
              style={{ animationDelay: "4s" }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-400 mb-1 sm:mb-2 animate-number-count">
                ₹100Cr+
              </div>
              <div className="text-white text-xs sm:text-sm md:text-base animate-fade-in">Project Value</div>
            </div>
            <div
              className="text-center group hover:scale-110 transition-transform duration-300 animate-stat-reveal"
              style={{ animationDelay: "4.2s" }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-400 mb-1 sm:mb-2 animate-number-count">
                100%
              </div>
              <div className="text-white text-xs sm:text-sm md:text-base animate-fade-in">Client Satisfaction</div>
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
                <Play className="w-16 h-16 mx-auto mb-4 text-emerald-400 animate-pulse" />
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
