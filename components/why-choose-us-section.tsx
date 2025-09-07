"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Clock, Award, Users, CheckCircle, Star, Building, Handshake, TrendingUp, MapPin } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function WhyChooseUsSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("why-choose-us")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const advantages = [
    {
      icon: Shield,
      title: "CPWD & PWD Enlisted Contractor",
      description:
        "Officially recognized and pre-qualified by Central Public Works Department (CPWD) and Public Works Department (PWD) for government projects.",
      highlight: "Government Certified",
    },
    {
      icon: Award,
      title: "Transparent Pricing",
      description: "We provide clear, detailed estimates with no hidden costs. What we quote is what you pay.",
      highlight: "No Hidden Costs",
    },
    {
      icon: Clock,
      title: "On-Time Delivery",
      description: "We respect your time and ensure all projects are completed within the agreed timeline.",
      highlight: "Zero Delays Guarantee",
    },
    {
      icon: Users,
      title: "100% Client Satisfaction",
      description: "Our commitment to excellence ensures every client is completely satisfied with our work.",
      highlight: "Satisfaction Guaranteed",
    },
    {
      icon: TrendingUp,
      title: "Value Engineering",
      description: "We optimize costs without compromising quality, delivering maximum value for your investment.",
      highlight: "Cost-Effective Solutions",
    },
    {
      icon: Handshake,
      title: "Client-Centric Approach",
      description: "Your satisfaction is our priority. We maintain transparent communication throughout.",
      highlight: "24/7 Support Available",
    },
  ]

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Homeowner",
      project: "Residential Villa",
      rating: 5,
      comment:
        "Sankalpa Builders transformed our dream into reality. The quality of work and attention to detail is exceptional. Highly recommended!",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Dr. Priya Nair",
      role: "Project Manager",
      project: "Government School",
      rating: 5,
      comment:
        "Professional team with excellent project management skills. They completed our school building ahead of schedule with outstanding quality.",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Mohammed Ali",
      role: "Business Owner",
      project: "Commercial Complex",
      rating: 5,
      comment:
        "The team's expertise in commercial construction is remarkable. They delivered exactly what we envisioned within our budget.",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const certifications = [
    "CPWD Enlisted Contractor",
    "PWD Enlisted Contractor",
    "Licensed Contractor",
    "ISO 9001:2015 Certified",
    "Green Building Certified",
    "Safety Standards Compliant",
    "Government Approved",
    "Insurance Coverage",
  ]

  return (
    <section id="why-choose-us" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Why Choose <span className="text-emerald-600 animate-gradient">Sankalpa Builders</span>?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            With over a decade of experience and a portfolio of 50+ successful projects, we are Kerala's trusted
            construction partner.
          </p>
        </div>

        {/* Key Advantages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon
            return (
              <Card
                key={index}
                className={`p-6 hover:shadow-lg transition-all duration-500 group hover:scale-105 hover:-translate-y-2 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-600 transition-all duration-300 group-hover:scale-110">
                    <Icon className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                      {advantage.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-3 leading-relaxed">{advantage.description}</p>
                    <Badge
                      variant="secondary"
                      className="bg-emerald-50 text-emerald-700 text-xs group-hover:bg-emerald-100 transition-colors duration-300"
                    >
                      {advantage.highlight}
                    </Badge>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Testimonials Section */}
        <div
          className={`mb-20 transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">What Our Clients Say</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say about their experience with
              us.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className={`p-6 hover:shadow-lg transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ animationDelay: `${600 + index * 150}ms` }}
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                    <p className="text-xs text-emerald-600">{testimonial.project}</p>
                  </div>
                </div>

                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-slate-600 text-sm leading-relaxed italic">"{testimonial.comment}"</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Certifications and Trust Signals */}
        <div
          className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ animationDelay: "800ms" }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Certified & Trusted</h3>
            <p className="text-slate-600">
              We maintain the highest standards of professionalism and compliance in the construction industry.
            </p>
            <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Shield className="w-6 h-6 text-emerald-600" />
                <h4 className="text-lg font-semibold text-emerald-800">CPWD & PWD Enlisted Contractor</h4>
              </div>
              <p className="text-emerald-700 text-sm max-w-3xl mx-auto">
                We are a trusted Central Public Works Department (CPWD) and Public Works Department (PWD) enlisted
                contractor, recognized for delivering high-quality construction services that meet government standards.
                Our enlistment ensures that we are pre-qualified to undertake government projects, backed by proven
                expertise, technical capability, and a commitment to timely execution.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <p className="text-xs text-slate-600 font-medium">{cert}</p>
              </div>
            ))}
          </div>

          {/* Local Expertise */}
          <div className="border-t border-slate-200 pt-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 text-emerald-600 mr-2" />
                  Local Kerala Expertise
                </h4>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Based in Ernakulam, we understand Kerala's unique construction requirements, local regulations, and
                  climate considerations. Our deep local knowledge ensures your project is built to last.
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                    Understanding of local building codes
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                    Climate-appropriate construction methods
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                    Strong local supplier network
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-emerald-100 rounded-full mb-4">
                  <Building className="w-16 h-16 text-emerald-600" />
                </div>
                <p className="text-2xl font-bold text-emerald-600">Kerala's</p>
                <p className="text-lg text-slate-900">Trusted Builder</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to Start Your Project?</h3>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Join the 50+ satisfied clients who have trusted us with their construction dreams. Let's build something
            amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3"
              onClick={() => {
                const consultationMessage = `Hello Sankalpa Builders!

I'm interested in getting a *Free Consultation* for my construction project.

Could we schedule a meeting to discuss my requirements and get a detailed estimate?

Looking forward to hearing from you!`

                const encodedMessage = encodeURIComponent(consultationMessage)
                const whatsappURL = `https://wa.me/919947004671?text=${encodedMessage}`
                window.open(whatsappURL, "_blank")
              }}
            >
              Get Free Consultation
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent"
            >
              View Our Portfolio
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
