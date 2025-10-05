"use client"

import { useEffect, useState } from "react"

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [showText, setShowText] = useState(false)
  const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>([])

  useEffect(() => {
    setParticles(
      [...Array(8)].map(() => ({
        left: `${20 + Math.random() * 60}%`,
        top: `${20 + Math.random() * 60}%`,
        delay: `${Math.random() * 3}s`,
        duration: `${4 + Math.random() * 2}s`,
      })),
    )

    // Show text after a brief delay
    const textTimer = setTimeout(() => setShowText(true), 300)

    // Hide preloader after animation completes
    const hideTimer = setTimeout(() => setIsLoading(false), 3000)

    return () => {
      clearTimeout(textTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(to bottom right, #0f172a, #1e293b, #1a1a1a)" }}
    >
      {/* Subtle Background Animation */}
      <div className="absolute inset-0">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-float-slow"
            style={{
              backgroundColor: "rgba(212, 175, 55, 0.3)",
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Company Name with Elegant Animation */}
        <div
          className={`transition-all duration-1000 ${showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            <span className="inline-block animate-slide-in-left" style={{ animationDelay: "0.5s" }}>
              SANKALPA
            </span>
            <br />
            <span className="inline-block animate-slide-in-right" style={{ animationDelay: "0.8s", color: "#E8C547" }}>
              BUILDERS
            </span>
          </h1>

          <p className="text-white text-lg font-light animate-fade-in-up" style={{ animationDelay: "1.2s" }}>
            Building Dreams Since 2008
          </p>
        </div>

        {/* Decorative line animation */}
        <div className="mt-8 flex justify-center">
          <div
            className="w-24 h-0.5 animate-expand"
            style={{
              animationDelay: "1.5s",
              background: "linear-gradient(to right, transparent, #E8C547, transparent)",
            }}
          />
        </div>
      </div>
    </div>
  )
}
