"use client"

import { Card } from "@/components/ui/card"
import { Building2, Building, Wrench, Landmark } from "lucide-react"
import { useState, useEffect } from "react"

export default function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("services")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const generatedParticles = [...Array(8)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${i * 2.5}s`,
      duration: `${15 + i * 2}s`,
    }))
    setParticles(generatedParticles)
  }, [])

  const services = [
    {
      icon: Building2,
      title: "Residential Buildings",
      description:
        "From luxury villas to apartment complexes, we create homes that blend comfort, style, and functionality.",
      features: ["Custom Home Design", "Apartment Complexes", "Villa Construction", "Interior Finishing"],
    },
    {
      icon: Building,
      title: "Commercial Buildings",
      description:
        "Modern office spaces, retail complexes, and commercial establishments built to drive business success.",
      features: ["Office Buildings", "Retail Spaces", "Shopping Complexes", "Corporate Headquarters"],
    },
    {
      icon: Wrench,
      title: "Renovation",
      description:
        "Transform existing spaces with our expert renovation services, breathing new life into old structures.",
      features: ["Building Restoration", "Interior Remodeling", "Structural Upgrades", "Modernization"],
    },
    {
      icon: Landmark,
      title: "Government Projects",
      description:
        "CPWD & PWD enlisted contractor delivering quality infrastructure for public institutions and facilities.",
      features: ["Educational Institutions", "Government Offices", "Public Infrastructure", "Community Centers"],
    },
  ]

  return (
    <section id="services" className="py-20 relative overflow-hidden animate-gradient-shift">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full animate-float-particles"
            style={{
              backgroundColor: "#C9A961",
              opacity: 0.15,
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#C9A961] mb-4">
            Our <span className="text-[#C9A961]">Services</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive construction solutions tailored to your needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className={`p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group border-slate-200 bg-white/80 backdrop-blur-sm ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-slate-100 group-hover:bg-slate-900">
                    <Icon className="w-8 h-8 transition-colors duration-300 text-slate-900 group-hover:text-[#C9A961]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#C9A961] mb-3 transition-colors duration-300 group-hover:text-[#E5D4A6]">
                  {service.title}
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-slate-600">
                      <span className="mr-2 mt-1 text-slate-900 group-hover:text-[#C9A961] transition-colors duration-300">
                        •
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <p className="text-lg text-slate-600 mb-6">Ready to start your project?</p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 bg-slate-900 text-white border-2 border-[#C9A961] hover:bg-[#C9A961] hover:text-slate-900"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  )
}
