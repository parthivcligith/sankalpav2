"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from "lucide-react"

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Why Choose Us", href: "#why-choose-us" },
    { name: "Contact", href: "#contact" },
  ]

  const services = [
    "Residential Construction",
    "Commercial Buildings",
    "Government Projects",
    "Educational Institutions",
    "Renovation & Remodeling",
    "Interior Design",
    "Project Consultation",
    "Architectural Services",
  ]

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Disclaimer", href: "/disclaimer" },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/slogo.jpg-q7SfwgRgaz6f3NscsfEogDLaIuHiKP.jpeg"
                alt="Sankalpa Builders"
                width={150}
                height={50}
                className="h-12 w-auto mb-4 bg-white rounded p-2"
              />
              <p className="text-slate-300 leading-relaxed text-sm">
                Building dreams since 2012. We are Kerala's trusted construction partner, delivering quality projects
                with excellence and integrity.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span className="text-sm">+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span className="text-sm">info@sankalpabuilders.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5" />
                <span className="text-sm">Ernakulam, Kerala 682001</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors duration-300"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors duration-300"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors duration-300"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h5 className="text-md font-semibold mb-4">Legal</h5>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-xs"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-slate-300 text-sm hover:text-emerald-400 transition-colors duration-300 cursor-pointer">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Stay Updated</h4>
            <p className="text-slate-300 text-sm mb-4">
              Subscribe to our newsletter for the latest updates on our projects and construction tips.
            </p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-slate-800 border-slate-700 text-white placeholder-slate-400"
              />
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Subscribe</Button>
            </div>

            {/* Certifications */}
            <div className="mt-8">
              <h5 className="text-md font-semibold mb-4">Certifications</h5>
              <div className="space-y-2 text-xs text-slate-400">
                <p>✓ Licensed Contractor</p>
                <p>✓ ISO 9001:2015 Certified</p>
                <p>✓ Green Building Certified</p>
                <p>✓ Government Approved</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-slate-400 text-sm">
                © 2025 Sankalpa Builders. All rights reserved. | Building Excellence Since 2012
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-slate-400 text-xs">
                <span>Kerala Registration: KB/2012/001234</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="text-slate-400 hover:text-emerald-400 hover:bg-slate-800"
              >
                <ArrowUp className="w-4 h-4 mr-1" />
                Back to Top
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact Strip */}
      <div className="bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-center">
            <span className="text-white text-sm font-medium">24/7 Emergency Construction Support:</span>
            <a href="tel:+919876543200" className="text-white font-bold hover:underline">
              +91 9876543200
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
