"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Building2, Users, Award, ChevronDown, ChevronUp } from "lucide-react"
import { getProjects } from "@/app/actions/project-actions"

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [isVisible, setIsVisible] = useState(false)
  const [visibleCount, setVisibleCount] = useState(9)
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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

  // Fetch projects from database
  useEffect(() => {
    async function fetchProjects() {
      try {
        const result = await getProjects()
        if (result.data) {
          setProjects(result.data)
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  // Map category names to slugs for filtering
  const categorySlugMap: Record<string, string> = {
    'Villas': 'villas',
    'Government Schools & Other Commercial Buildings': 'government',
    'Co-operative Banks': 'banks',
    'Auditorium': 'auditorium',
    'Commercial Buildings': 'commercial',
    'Village Offices': 'village-offices',
  }

  const projectCategories = [
    { id: "all", name: "All Projects", icon: Building2 },
    { id: "villas", name: "Villas", icon: Users },
    { id: "government", name: "Govt. Schools & Other Commercial Buildings", icon: Award },
    { id: "banks", name: "Co-operative Banks", icon: Building2 },
    { id: "auditorium", name: "Auditorium", icon: Users },
    { id: "commercial", name: "Commercial Buildings", icon: Building2 },
    { id: "village-offices", name: "Village Offices", icon: Award },
  ]

  // Transform database projects to component format
  const featuredProjects = projects.length > 0 ? projects.map((project) => {
    const categoryName = project.project_categories?.name || ''
    const categorySlug = categorySlugMap[categoryName] || 'all'
    
    // Build specs object from available fields
    const specs: Record<string, string> = {}
    if (project.area) specs.area = project.area
    if (project.units) specs.units = project.units
    if (project.floors) specs.floors = project.floors
    if (project.classrooms) specs.classrooms = project.classrooms
    if (project.capacity) specs.capacity = project.capacity
    if (project.workshops) specs.workshops = project.workshops
    if (project.duration) specs.duration = project.duration

    return {
      id: project.id,
      title: project.title,
      category: categorySlug,
      categoryName: categoryName, // For display
      year: project.year || '',
      description: project.description || '',
      features: project.project_features?.map((f: any) => f.feature_text) || [],
      specs,
    }
  }) : []

  const filteredProjects =
    activeFilter === "all" ? featuredProjects : featuredProjects.filter((project) => project.category === activeFilter)

  const visibleProjects = filteredProjects.slice(0, visibleCount)
  const hasMore = visibleCount < filteredProjects.length

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-slate-600">Loading projects...</p>
          </div>
        </div>
      </section>
    )
  }

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
                    {project.categoryName || project.category}
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
