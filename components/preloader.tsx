"use client"

import { useEffect, useState } from "react"

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [showText, setShowText] = useState(false)

  useEffect(() => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 overflow-hidden">
      {/* Subtle Background Animation */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/30 rounded-full animate-float-slow"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
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
            <span className="inline-block animate-slide-in-right text-emerald-400" style={{ animationDelay: "0.8s" }}>
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
            className="w-24 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-expand"
            style={{ animationDelay: "1.5s" }}
          />
        </div>
      </div>
    </div>
  )
}
