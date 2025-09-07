"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Why Choose Us", href: "#why-choose-us" },
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
            className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? "h-16" : "h-20"}`}
          >
            <div className="flex items-center space-x-3 flex-shrink-0">
              <div className="flex-shrink-0">
                <Image
                  src="/favicon.png"
                  alt="Sankalpa Builders Logo"
                  width={isScrolled ? 48 : 56}
                  height={isScrolled ? 48 : 56}
                  className="transition-all duration-300"
                />
              </div>
              <div className="block">
                <span
                  className={`font-bold text-slate-800 animate-fade-in transition-all duration-300 ${isScrolled ? "text-base" : "text-lg"}`}
                >
                  <span className="text-emerald-600">Sankalpa</span> <span className="text-emerald-600">Builders</span>
                </span>
                <div
                  className={`text-slate-500 font-medium transition-all duration-300 ${isScrolled ? "text-xs" : "text-xs"}`}
                >
                  Since 2008 • CPWD & PWD Enlisted
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                {navItems.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 animate-nav-item"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden md:block">
              <Button
                onClick={handleGetQuote}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-6 py-2 font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg animate-cta-glow"
              >
                Get Quote
              </Button>
            </div>

            <div className="md:hidden">
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
            <div className="md:hidden border-t border-slate-200 animate-mobile-menu-slide">
              <div className="px-2 pt-4 pb-4 space-y-2">
                {navItems.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 animate-mobile-nav-item"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="pt-2">
                  <Button
                    onClick={handleGetQuote}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg py-3 font-medium"
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
