"use client"

import { useEffect, useRef, useState } from "react"

export default function ScrollMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  const marqueeItems = [
    { text: "CPWD & PWD Enlisted Contractor", icon: "🏗️" },
    { text: "100+ Projects Completed", icon: "✅" },
    { text: "Since 2008 - Building Excellence", icon: "🏆" },
    { text: "Residential Construction", icon: "🏠" },
    { text: "Commercial Projects", icon: "🏢" },
    { text: "Government Contracts", icon: "🏛️" },
    { text: "Transparent Pricing", icon: "💰" },
    { text: "100% Client Satisfaction", icon: "⭐" },
    { text: "Quality Construction", icon: "🔨" },
    { text: "Timely Delivery", icon: "⏰" },
    { text: "Modern Architecture", icon: "🏗️" },
    { text: "Sustainable Building", icon: "🌱" },
    { text: "Kerala's Trusted Builders", icon: "🌴" },
    { text: "Landmarks That Last a Lifetime", icon: "🏛️" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative overflow-hidden bg-white py-2 border-y border-gray-100">
      <div
        ref={marqueeRef}
        className="flex whitespace-nowrap"
        style={{
          transform: `translateX(${scrollY * 0.5}px)`,
          animation: "marquee 60s linear infinite",
          transition: "transform 0.1s ease-out",
        }}
      >
        {/* First set of items */}
        {marqueeItems.map((item, index) => (
          <div key={`first-${index}`} className="flex items-center mx-3 group">
            <div className="flex items-center bg-emerald-50 backdrop-blur-sm rounded-full px-3 py-1 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 transition-all duration-300 group-hover:scale-105 shadow-sm">
              <span className="text-lg mr-2">{item.icon}</span>
              <span className="text-emerald-800 font-bold text-sm whitespace-nowrap">{item.text}</span>
            </div>
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {marqueeItems.map((item, index) => (
          <div key={`second-${index}`} className="flex items-center mx-3 group">
            <div className="flex items-center bg-emerald-50 backdrop-blur-sm rounded-full px-3 py-1 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 transition-all duration-300 group-hover:scale-105 shadow-sm">
              <span className="text-lg mr-2">{item.icon}</span>
              <span className="text-emerald-800 font-bold text-sm whitespace-nowrap">{item.text}</span>
            </div>
          </div>
        ))}
        {/* Third set for extra smoothness */}
        {marqueeItems.map((item, index) => (
          <div key={`third-${index}`} className="flex items-center mx-3 group">
            <div className="flex items-center bg-emerald-50 backdrop-blur-sm rounded-full px-3 py-1 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 transition-all duration-300 group-hover:scale-105 shadow-sm">
              <span className="text-lg mr-2">{item.icon}</span>
              <span className="text-emerald-800 font-bold text-sm whitespace-nowrap">{item.text}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
    </div>
  )
}
