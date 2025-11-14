"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    // Set initial scroll state
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Why Choose Us", href: "#certified-and-trusted" },
    { name: "Contact", href: "#contact" },
  ]

  const handleGetQuote = () => {
    const message = encodeURIComponent(
      "Hello Sankalpa Builders! I would like to request a quote for my construction project and schedule an appointment to discuss the details. Please let me know your availability.",
    )
    window.open(`https://wa.me/919947004671?text=${message}`, "_blank")
  }

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 w-[95%] max-w-6xl">
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/50 rounded-2xl shadow-lg shadow-slate-900/10 animate-navbar-slide-down">
        <div className="px-4 sm:px-6 lg:px-8">
          <div
            className={`flex justify-between items-center transition-all duration-300 ${isMounted && isScrolled ? "h-16" : "h-20"}`}
          >
            <div className="flex items-center space-x-3 flex-shrink-0">
              <div className="flex-shrink-0">
                <Image
                  src="/logo-transparent.png"
                  alt="Sankalpa Builders Logo"
                  width={isMounted && isScrolled ? 48 : 56}
                  height={isMounted && isScrolled ? 48 : 56}
                  className="transition-all duration-300"
                />
              </div>
              <div className="block">
                <span
                  className={`font-bold text-slate-800 animate-fade-in transition-all duration-300 ${isMounted && isScrolled ? "text-base" : "text-lg"}`}
                >
                  Sankalpa Builders
                </span>
                <div
                  className={`text-slate-500 font-medium transition-all duration-300 ${isScrolled ? "text-xs" : "text-xs"}`}
                >
                  Since 2008 • CPWD & PWD Enlisted
                </div>
              </div>
            </div>

            <div className="hidden xl:block">
              <div className="flex items-center space-x-1">
                {navItems.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 animate-nav-item hover:bg-slate-100 hover:text-slate-900"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden xl:block">
              <Button
                onClick={handleGetQuote}
                className="rounded-lg px-6 py-2 font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg animate-cta-glow bg-slate-900 text-white hover:bg-slate-800"
              >
                Get Quote
              </Button>
            </div>

            <div className="xl:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-lg hover:bg-slate-100 text-slate-700"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="xl:hidden border-t border-slate-200 animate-mobile-menu-slide">
              <div className="px-2 pt-4 pb-4 space-y-2">
                {navItems.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-slate-700 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 animate-mobile-nav-item hover:bg-slate-100"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="pt-2">
                  <Button
                    onClick={handleGetQuote}
                    className="w-full rounded-lg py-3 font-medium bg-slate-900 text-white hover:bg-slate-800"
                  >
                    Get Quote
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
