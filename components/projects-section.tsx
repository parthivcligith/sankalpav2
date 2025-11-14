"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Building2, Users, Award, ChevronDown, ChevronUp } from "lucide-react"

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [isVisible, setIsVisible] = useState(false)
  const [visibleCount, setVisibleCount] = useState(9)

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

  useEffect(() => {
    setVisibleCount(9)
  }, [activeFilter])

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
      year: "2015",
      description: "Luxury residential villa complex with modern amenities and sustainable design.",
      features: ["Modern Architecture", "Eco-Friendly", "Premium Finishes"],
      specs: { area: "2500 sq ft", units: "12 Villas", duration: "18 months" },
    },
    {
      id: 2,
      title: "Village Office Building",
      category: "village-offices",
      year: "2021",
      description: "State-of-the-art village office building with modern facilities and accessibility features.",
      features: ["Government Standards", "Accessible Design", "Energy Efficient"],
      specs: { area: "3200 sq ft", floors: "2 Floors", duration: "14 months" },
    },
    {
      id: 3,
      title: "Co-operative Bank",
      category: "banks",
      year: "2012",
      description: "Modern banking facility with secure infrastructure and customer-friendly design.",
      features: ["Security Systems", "Modern Banking", "Customer Comfort"],
      specs: { area: "1800 sq ft", floors: "1 Floor", duration: "10 months" },
    },
    {
      id: 4,
      title: "Government School",
      category: "government",
      year: "2013",
      description: "Educational facility designed to provide optimal learning environment for students.",
      features: ["Student-Centric Design", "Safety Standards", "Modern Classrooms"],
      specs: { area: "2800 sq ft", classrooms: "8 Rooms", duration: "12 months" },
    },
    {
      id: 5,
      title: "Community Hall & Auditorium",
      category: "auditorium",
      year: "2022",
      description: "Multi-purpose community hall for cultural and social events with modern acoustics.",
      features: ["Acoustic Design", "Multi-Purpose", "Cultural Events"],
      specs: { area: "4000 sq ft", capacity: "300 People", duration: "16 months" },
    },
    {
      id: 6,
      title: "Smart Village Office",
      category: "village-offices",
      year: "2021",
      description: "Digital-ready village office with smart infrastructure and modern amenities.",
      features: ["Smart Infrastructure", "Digital Ready", "Modern Amenities"],
      specs: { area: "1200 sq ft", floors: "1 Floor", duration: "8 months" },
    },
    {
      id: 7,
      title: "Modern Commercial Complex",
      category: "commercial",
      year: "2020",
      description: "Contemporary commercial building with retail spaces and office facilities.",
      features: ["Modern Design", "Retail Spaces", "Office Facilities"],
      specs: { area: "5000 sq ft", floors: "3 Floors", duration: "20 months" },
    },
    {
      id: 8,
      title: "Residential Villa Project",
      category: "villas",
      year: "2019",
      description: "Premium villa development with landscaped gardens and modern amenities.",
      features: ["Landscaped Gardens", "Premium Finishes", "Modern Amenities"],
      specs: { area: "3000 sq ft", units: "8 Villas", duration: "15 months" },
    },
    {
      id: 9,
      title: "Lakeside Villas",
      category: "villas",
      year: "2018",
      description: "Exclusive waterfront villa community with scenic views and luxury amenities.",
      features: ["Waterfront Location", "Luxury Interiors", "Gated Community"],
      specs: { area: "3500 sq ft", units: "6 Villas", duration: "16 months" },
    },
    {
      id: 10,
      title: "Heritage Villas",
      category: "villas",
      year: "2017",
      description: "Traditional Kerala-style villas with modern comforts and heritage architecture.",
      features: ["Heritage Design", "Traditional Architecture", "Modern Amenities"],
      specs: { area: "2800 sq ft", units: "10 Villas", duration: "14 months" },
    },
    {
      id: 11,
      title: "Green Valley Villas",
      category: "villas",
      year: "2016",
      description: "Eco-friendly villa project surrounded by lush greenery and natural landscapes.",
      features: ["Eco-Friendly", "Natural Setting", "Sustainable Design"],
      specs: { area: "2200 sq ft", units: "15 Villas", duration: "17 months" },
    },
    {
      id: 12,
      title: "District Co-operative Bank",
      category: "banks",
      year: "2014",
      description: "Spacious banking facility with modern security systems and customer service areas.",
      features: ["Advanced Security", "Customer Service", "Modern Infrastructure"],
      specs: { area: "2200 sq ft", floors: "2 Floors", duration: "12 months" },
    },
    {
      id: 13,
      title: "Urban Co-operative Bank",
      category: "banks",
      year: "2016",
      description: "Contemporary bank building with digital banking facilities and secure vaults.",
      features: ["Digital Banking", "Secure Vaults", "Modern Design"],
      specs: { area: "2500 sq ft", floors: "2 Floors", duration: "13 months" },
    },
    {
      id: 14,
      title: "Government Higher Secondary School",
      category: "government",
      year: "2015",
      description: "Comprehensive educational facility with science labs, library, and sports facilities.",
      features: ["Science Labs", "Library", "Sports Facilities"],
      specs: { area: "4500 sq ft", classrooms: "15 Rooms", duration: "18 months" },
    },
    {
      id: 15,
      title: "Government Primary School",
      category: "government",
      year: "2014",
      description: "Child-friendly school building with colorful classrooms and play areas.",
      features: ["Child-Friendly Design", "Play Areas", "Safety Features"],
      specs: { area: "2000 sq ft", classrooms: "6 Rooms", duration: "10 months" },
    },
    {
      id: 16,
      title: "Government Vocational Training Center",
      category: "government",
      year: "2019",
      description: "Modern training facility with workshops and skill development centers.",
      features: ["Workshop Spaces", "Skill Development", "Modern Equipment"],
      specs: { area: "3500 sq ft", workshops: "8 Units", duration: "15 months" },
    },
    {
      id: 17,
      title: "Cultural Center Auditorium",
      category: "auditorium",
      year: "2020",
      description: "State-of-the-art auditorium for cultural performances with advanced sound and lighting.",
      features: ["Advanced Acoustics", "Stage Lighting", "Cultural Events"],
      specs: { area: "5000 sq ft", capacity: "500 People", duration: "18 months" },
    },
    {
      id: 18,
      title: "Convention Center",
      category: "auditorium",
      year: "2018",
      description: "Multi-purpose convention center for conferences, weddings, and large gatherings.",
      features: ["Multi-Purpose", "Conference Facilities", "Banquet Hall"],
      specs: { area: "6000 sq ft", capacity: "800 People", duration: "20 months" },
    },
    {
      id: 19,
      title: "Business Park Complex",
      category: "commercial",
      year: "2021",
      description: "Modern business park with office spaces, parking, and amenities for corporate tenants.",
      features: ["Office Spaces", "Parking Facilities", "Corporate Amenities"],
      specs: { area: "8000 sq ft", floors: "4 Floors", duration: "24 months" },
    },
    {
      id: 20,
      title: "Retail Shopping Complex",
      category: "commercial",
      year: "2019",
      description: "Contemporary shopping complex with retail outlets and food court facilities.",
      features: ["Retail Outlets", "Food Court", "Modern Design"],
      specs: { area: "6500 sq ft", floors: "3 Floors", duration: "22 months" },
    },
    {
      id: 21,
      title: "Hospital",
      category: "commercial",
      year: "2017",
      description: "Healthcare facility with consultation rooms, diagnostic center, and pharmacy.",
      features: ["Healthcare Design", "Diagnostic Center", "Patient Comfort"],
      specs: { area: "4000 sq ft", floors: "2 Floors", duration: "16 months" },
    },
    {
      id: 22,
      title: "Grama Village Office",
      category: "village-offices",
      year: "2020",
      description: "Modern village office with digital facilities and public service counters.",
      features: ["Digital Facilities", "Public Service", "Modern Infrastructure"],
      specs: { area: "2800 sq ft", floors: "2 Floors", duration: "12 months" },
    },
    {
      id: 23,
      title: "Block Village Office",
      category: "village-offices",
      year: "2019",
      description: "Administrative building with meeting halls and office spaces for block administration.",
      features: ["Meeting Halls", "Administrative Spaces", "Modern Amenities"],
      specs: { area: "3500 sq ft", floors: "2 Floors", duration: "14 months" },
    },
    {
      id: 24,
      title: "Village Office",
      category: "village-offices",
      year: "2022",
      description: "Standard village office with public service counters, accessibility, and digital amenities.",
      features: ["Public Service Counters", "Accessible Design", "Digital Facilities"],
      specs: { area: "2000 sq ft", floors: "1 Floor", duration: "10 months" },
    },
  ]

  const filteredProjects =
    activeFilter === "all" ? featuredProjects : featuredProjects.filter((project) => project.category === activeFilter)

  const visibleProjects = filteredProjects.slice(0, visibleCount)
  const hasMore = visibleCount < filteredProjects.length

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
            Our <span className="text-yellow-600 animate-gradient">Completed Projects</span>
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
                <div className="text-3xl md:text-4xl font-bold text-yellow-600 mb-2 animate-count-up group-hover:animate-pulse">
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
                    ? "bg-yellow-600 hover:bg-yellow-700 text-white animate-pulse"
                    : "border-yellow-600 text-yellow-600 hover:bg-yellow-50"
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
          {visibleProjects.map((project, index) => (
            <Card
              key={project.id}
              className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-yellow-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <Badge
                    variant="outline"
                    className="text-xs animate-bounce-subtle group-hover:bg-yellow-100 transition-colors duration-300"
                  >
                    {project.category}
                  </Badge>
                </div>

                <p className="text-slate-600 text-sm mb-4 leading-relaxed">{project.description}</p>

                {/* Project Specifications */}
                <div className="bg-yellow-50 rounded-lg p-4 space-y-2">
                  <h4 className="font-medium text-yellow-800 text-sm mb-2">Project Specifications</h4>
                  <div className="grid grid-cols-1 gap-2 text-xs text-yellow-700">
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
                      className="bg-slate-100 text-slate-700 text-xs hover:bg-yellow-100 hover:text-yellow-700 transition-colors duration-300 animate-fade-in"
                      style={{ animationDelay: `${featureIndex * 100}ms` }}
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-3 text-sm text-slate-500 border-t pt-4">
                  <div className="flex items-center gap-2 group-hover:text-yellow-600 transition-colors duration-300">
                    <Calendar className="w-4 h-4 animate-pulse" />
                    <span>Completed in {project.year}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div
          className={`text-center transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {hasMore ? (
            <Button
              size="lg"
              onClick={() => setVisibleCount((prev) => prev + 9)}
              className="bg-black hover:bg-yellow-600 text-white border-2 border-yellow-600 px-8 py-3 hover:scale-110 hover:shadow-2xl transition-all duration-300"
            >
              <ChevronDown className="w-5 h-5 mr-2" />
              Show More Projects
            </Button>
          ) : visibleCount > 9 ? (
            <Button
              size="lg"
              onClick={() => setVisibleCount(9)}
              className="bg-black hover:bg-yellow-600 text-white border-2 border-yellow-600 px-8 py-3 hover:scale-110 hover:shadow-2xl transition-all duration-300"
            >
              <ChevronUp className="w-5 h-5 mr-2" />
              Show Less
            </Button>
          ) : null}
          <p className="text-slate-500 text-sm mt-4 animate-fade-in">
            {hasMore
              ? `Showing ${visibleCount} of ${filteredProjects.length} projects`
              : `Showing all ${filteredProjects.length} projects`}
          </p>
        </div>
      </div>
    </section>
  )
}
