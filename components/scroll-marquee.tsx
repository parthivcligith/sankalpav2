"use client"

import { useEffect, useRef, useState } from "react"
import {
  Building2,
  CheckCircle2,
  Award,
  Home,
  Building,
  Landmark,
  DollarSign,
  Star,
  Hammer,
  Clock,
  Sparkles,
  Leaf,
  MapPin,
  Trophy,
} from "lucide-react"

export default function ScrollMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const marqueeItems = [
    { text: "CPWD & PWD Enlisted", icon: Building2 },
    { text: "100+ Projects Completed", icon: CheckCircle2 },
    { text: "Since 2008", icon: Award },
    { text: "Residential Excellence", icon: Home },
    { text: "Commercial Projects", icon: Building },
    { text: "Government Contracts", icon: Landmark },
    { text: "Transparent Pricing", icon: DollarSign },
    { text: "100% Satisfaction", icon: Star },
    { text: "Quality Craftsmanship", icon: Hammer },
    { text: "Timely Delivery", icon: Clock },
    { text: "Modern Architecture", icon: Sparkles },
    { text: "Sustainable Building", icon: Leaf },
    { text: "Kerala's Trusted", icon: MapPin },
    { text: "Landmarks That Last", icon: Trophy },
  ]

  useEffect(() => {
    setIsMounted(true)
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const animationDuration = isMounted && isMobile ? "20s" : "40s"

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 py-3 border-y border-[#C9A961]/20">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#C9A961_1px,transparent_1px),linear-gradient(to_bottom,#C9A961_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div
        ref={marqueeRef}
        className="flex whitespace-nowrap"
        style={{
          transform: `translateX(${-scrollY * 0.3}px)`,
          animation: `marquee ${animationDuration} linear infinite`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {/* First set of items */}
        {marqueeItems.map((item, index) => {
          const Icon = item.icon
          return (
            <div key={`first-${index}`} className="flex items-center mx-4 group">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-[#C9A961]/20 hover:border-[#C9A961]/40 hover:bg-white/10 transition-all duration-500 group-hover:scale-105 shadow-lg hover:shadow-[#C9A961]/20">
                <Icon
                  className="w-4 h-4 text-[#C9A961] group-hover:text-[#E5D4A6] transition-colors duration-300 group-hover:rotate-12"
                  strokeWidth={2}
                />
                <span className="text-white/90 font-medium text-xs tracking-wide whitespace-nowrap group-hover:text-white transition-colors duration-300">
                  {item.text}
                </span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A961]/30 mx-4" />
            </div>
          )
        })}
        {/* Duplicate set for seamless loop */}
        {marqueeItems.map((item, index) => {
          const Icon = item.icon
          return (
            <div key={`second-${index}`} className="flex items-center mx-4 group">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-[#C9A961]/20 hover:border-[#C9A961]/40 hover:bg-white/10 transition-all duration-500 group-hover:scale-105 shadow-lg hover:shadow-[#C9A961]/20">
                <Icon
                  className="w-4 h-4 text-[#C9A961] group-hover:text-[#E5D4A6] transition-colors duration-300 group-hover:rotate-12"
                  strokeWidth={2}
                />
                <span className="text-white/90 font-medium text-xs tracking-wide whitespace-nowrap group-hover:text-white transition-colors duration-300">
                  {item.text}
                </span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A961]/30 mx-4" />
            </div>
          )
        })}
        {/* Third set for extra smoothness */}
        {marqueeItems.map((item, index) => {
          const Icon = item.icon
          return (
            <div key={`third-${index}`} className="flex items-center mx-4 group">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-[#C9A961]/20 hover:border-[#C9A961]/40 hover:bg-white/10 transition-all duration-500 group-hover:scale-105 shadow-lg hover:shadow-[#C9A961]/20">
                <Icon
                  className="w-4 h-4 text-[#C9A961] group-hover:text-[#E5D4A6] transition-colors duration-300 group-hover:rotate-12"
                  strokeWidth={2}
                />
                <span className="text-white/90 font-medium text-xs tracking-wide whitespace-nowrap group-hover:text-white transition-colors duration-300">
                  {item.text}
                </span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A961]/30 mx-4" />
            </div>
          )
        })}
      </div>

      <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent pointer-events-none z-10" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#C9A961]/50 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#C9A961]/50 to-transparent" />
    </div>
  )
}
