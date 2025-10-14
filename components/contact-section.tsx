"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("contact")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const whatsappMessage = `Hello Sankalpa Builders!

*New Project Inquiry*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}

*Project Details:*
${formData.message}

Looking forward to hearing from you!`

    const encodedMessage = encodeURIComponent(whatsappMessage)

    const whatsappURL = `https://wa.me/919947004671?text=${encodedMessage}`

    window.open(whatsappURL, "_blank")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 9947004671", "9961093847", "0484 2443671"],
      description: "Mon - Sat: 9:00 AM - 6:00 PM",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@sankalpabuilders.com"],
      description: "We'll respond within 24 hours",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Sankalpa Builders", "Ernakulam, Kerala 682001"],
      description: "Our office is open for consultations",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Monday - Saturday", "9:00 AM - 6:00 PM"],
      description: "Sunday: Emergency calls only",
    },
  ]

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Get In <span className="text-yellow-600 animate-gradient">Touch</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto px-4">
            Ready to start your construction project? Contact us today for a free consultation and detailed quote.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <Card
            className={`p-6 sm:p-8 hover:shadow-xl transition-all duration-500 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
            style={{ animationDelay: "300ms" }}
          >
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Send Us a Message</h3>
              <p className="text-sm sm:text-base text-slate-600">
                Fill out the form below and we'll connect you directly via WhatsApp for instant communication.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm sm:text-base">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm sm:text-base">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                    className="text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm sm:text-base">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="text-sm sm:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm sm:text-base">
                  Project Details *
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your project requirements, timeline, budget, and any specific needs..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  required
                  className="text-sm sm:text-base resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-slate-900 hover:bg-[#C9A961] text-white border-2 border-[#C9A961] group hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-[#C9A961]/30 hover:text-slate-900 text-sm sm:text-base py-6"
              >
                <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                Send via WhatsApp
              </Button>

              <p className="text-xs text-slate-500 text-center">
                By submitting this form, you'll be redirected to WhatsApp to continue the conversation.
              </p>
            </form>
          </Card>

          <div
            className={`space-y-6 transition-all duration-1000 delay-500 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Contact Information</h3>
              <p className="text-slate-600 leading-relaxed">
                We're here to help you bring your construction dreams to life. Reach out to us through any of the
                following channels, and our team will be happy to assist you.
              </p>
            </div>

            <div className="grid gap-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <Card
                    key={index}
                    className={`p-6 hover:shadow-lg transition-all duration-500 hover:scale-105 hover:-translate-y-1 group ${
                      isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                    style={{ animationDelay: `${600 + index * 100}ms` }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A961] transition-colors duration-300 group-hover:scale-110">
                        <Icon className="w-6 h-6 text-[#C9A961] group-hover:text-slate-900 transition-colors duration-300" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-[#C9A961] transition-colors duration-300">
                          {info.title}
                        </h4>
                        <div className="space-y-1 mb-2">
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-slate-900 font-medium">
                              {detail}
                            </p>
                          ))}
                        </div>
                        <p className="text-sm text-slate-600">{info.description}</p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            <Card className="p-6 bg-slate-50 border-slate-200 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-[#C9A961]">
                  <Phone className="w-5 h-5 text-[#C9A961] group-hover:text-slate-900 transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900">24/7 Emergency Support</h4>
                  <p className="text-sm text-slate-600">For urgent construction issues</p>
                </div>
              </div>
              <p className="text-slate-900 font-semibold text-lg">+91 9947004671</p>
            </Card>
          </div>
        </div>

        <div
          className={`mt-16 text-center bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ animationDelay: "1000ms" }}
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Prefer to Talk Directly?</h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Schedule a free consultation with our construction experts. We'll discuss your project requirements and
            provide you with a detailed estimate.
          </p>
          <Button
            size="lg"
            className="bg-slate-900 hover:bg-[#C9A961] text-white border-2 border-[#C9A961] px-8 py-3 hover:scale-110 hover:shadow-xl hover:shadow-[#C9A961]/30 transition-all duration-300 hover:text-slate-900"
            onClick={() => {
              const consultationMessage = `Hello Sankalpa Builders!

I would like to schedule a *Free Consultation* for my construction project.

Please let me know your available time slots for a detailed discussion about my requirements.

Thank you!`

              const encodedMessage = encodeURIComponent(consultationMessage)
              const whatsappURL = `https://wa.me/919947004671?text=${encodedMessage}`
              window.open(whatsappURL, "_blank")
            }}
          >
            Schedule Free Consultation
          </Button>
        </div>
      </div>
    </section>
  )
}
