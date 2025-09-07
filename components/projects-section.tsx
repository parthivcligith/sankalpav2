"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Building2, Users, Award } from "lucide-react"

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all")
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

    const section = document.getElementById("projects")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const projectCategories = [
    { id: "all", name: "All Projects", icon: Building2 },
    { id: "villas", name: "Villas", icon: Users },
    { id: "government", name: "Govt. Schools & Other Commercial Buildings", icon: Award },
    { id: "banks", name: "Co-operative Banks", icon: Building2 },
    { id: "auditorium", name: "Auditorium", icon: Users },
    { id: "commercial", name: "Commercial Buildings", icon: Building2 },
    { id: "village-offices", name: "Village Offices", icon: Award },
  ]

  const featuredProjects = [
    {
      id: 1,
      title: "Sankalpa Villas",
      category: "villas",
      location: "Ernakulam",
      year: "2015",
      description: "Luxury residential villa complex with modern amenities and sustainable design.",
      features: ["Modern Architecture", "Eco-Friendly", "Premium Finishes"],
      specs: { area: "2500 sq ft", units: "12 Villas", duration: "18 months" },
    },
    {
      id: 2,
      title: "Panchayath Office Building",
      category: "village-offices",
      location: "Kadungalloor",
      year: "2021",
      description: "State-of-the-art panchayath office building with modern facilities and accessibility features.",
      features: ["Government Standards", "Accessible Design", "Energy Efficient"],
      specs: { area: "3200 sq ft", floors: "2 Floors", duration: "14 months" },
    },
    {
      id: 3,
      title: "Chendamangalam Co-operative Bank",
      category: "banks",
      location: "Ernakulam",
      year: "2012",
      description: "Modern banking facility with secure infrastructure and customer-friendly design.",
      features: ["Security Systems", "Modern Banking", "Customer Comfort"],
      specs: { area: "1800 sq ft", floors: "1 Floor", duration: "10 months" },
    },
    {
      id: 4,
      title: "Government Boys School",
      category: "government",
      location: "N.Paravur",
      year: "2013",
      description: "Educational facility designed to provide optimal learning environment for students.",
      features: ["Student-Centric Design", "Safety Standards", "Modern Classrooms"],
      specs: { area: "2800 sq ft", classrooms: "8 Rooms", duration: "12 months" },
    },
    {
      id: 5,
      title: "Community Hall & Auditorium",
      category: "auditorium",
      location: "Kadungalloor",
      year: "2022",
      description: "Multi-purpose community hall for cultural and social events with modern acoustics.",
      features: ["Acoustic Design", "Multi-Purpose", "Cultural Events"],
      specs: { area: "4000 sq ft", capacity: "300 People", duration: "16 months" },
    },
    {
      id: 6,
      title: "Smart Village Office",
      category: "village-offices",
      location: "Ayyampuzha",
      year: "2021",
      description: "Digital-ready village office with smart infrastructure and modern amenities.",
      features: ["Smart Infrastructure", "Digital Ready", "Modern Amenities"],
      specs: { area: "1200 sq ft", floors: "1 Floor", duration: "8 months" },
    },
    {
      id: 7,
      title: "Modern Commercial Complex",
      category: "commercial",
      location: "Ernakulam",
      year: "2020",
      description: "Contemporary commercial building with retail spaces and office facilities.",
      features: ["Modern Design", "Retail Spaces", "Office Facilities"],
      specs: { area: "5000 sq ft", floors: "3 Floors", duration: "20 months" },
    },
    {
      id: 8,
      title: "Residential Villa Project",
      category: "villas",
      location: "Kochi",
      year: "2019",
      description: "Premium villa development with landscaped gardens and modern amenities.",
      features: ["Landscaped Gardens", "Premium Finishes", "Modern Amenities"],
      specs: { area: "3000 sq ft", units: "8 Villas", duration: "15 months" },
    },
  ]

  const filteredProjects =
    activeFilter === "all" ? featuredProjects : featuredProjects.filter((project) => project.category === activeFilter)

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23059669' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Our <span className="text-emerald-600 animate-gradient">Completed Projects</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Over 100 successful projects across Kerala, from residential villas to government institutions.
          </p>

          {/* Project Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {[
              { number: "100+", label: "Projects Completed" },
              { number: "16+", label: "Years Since 2008" },
              { number: "100%", label: "On-Time Delivery" },
              { number: "100%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <div
                key={index}
                className={`text-center group hover:scale-110 transition-all duration-500 delay-${index * 100}`}
              >
                <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2 animate-count-up group-hover:animate-pulse">
                  {stat.number}
                </div>
                <div className="text-slate-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Buttons */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {projectCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Button
                key={category.id}
                variant={activeFilter === category.id ? "default" : "outline"}
                onClick={() => setActiveFilter(category.id)}
                className={`group transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  activeFilter === category.id
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white animate-pulse"
                    : "border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <IconComponent className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                {category.name}
              </Button>
            )
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <Badge
                    variant="outline"
                    className="text-xs animate-bounce-subtle group-hover:bg-emerald-100 transition-colors duration-300"
                  >
                    {project.category}
                  </Badge>
                </div>

                <p className="text-slate-600 text-sm mb-4 leading-relaxed">{project.description}</p>

                {/* Project Specifications */}
                <div className="bg-emerald-50 rounded-lg p-4 space-y-2">
                  <h4 className="font-medium text-emerald-800 text-sm mb-2">Project Specifications</h4>
                  <div className="grid grid-cols-1 gap-2 text-xs text-emerald-700">
                    {Object.entries(project.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="capitalize font-medium">{key.replace(/([A-Z])/g, " $1")}:</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.features.map((feature, featureIndex) => (
                    <Badge
                      key={featureIndex}
                      variant="secondary"
                      className="bg-slate-100 text-slate-700 text-xs hover:bg-emerald-100 hover:text-emerald-700 transition-colors duration-300 animate-fade-in"
                      style={{ animationDelay: `${featureIndex * 100}ms` }}
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Project Details */}
                <div className="space-y-3 text-sm text-slate-500 border-t pt-4">
                  <div className="flex items-center gap-2 group-hover:text-emerald-600 transition-colors duration-300">
                    <MapPin className="w-4 h-4 animate-pulse" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2 group-hover:text-emerald-600 transition-colors duration-300">
                    <Calendar className="w-4 h-4 animate-pulse" />
                    <span>Completed in {project.year}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Projects Button */}
        <div
          className={`text-center transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 hover:scale-110 hover:shadow-2xl transition-all duration-300 animate-bounce-subtle"
          >
            View All Projects
          </Button>
          <p className="text-slate-500 text-sm mt-4 animate-fade-in">
            Explore our complete portfolio of 100+ successful projects across Kerala
          </p>
        </div>
      </div>
    </section>
  )
}
