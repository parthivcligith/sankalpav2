"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Award, Users, Clock, Target, Shield } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function AboutSection() {
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

    const section = document.getElementById("about")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const achievements = [
    {
      icon: Award,
      title: "Quality Excellence",
      description: "Committed to delivering superior construction quality in every project we undertake.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Skilled professionals with decades of combined experience in construction and engineering.",
    },
    {
      icon: Clock,
      title: "Timely Delivery",
      description: "We pride ourselves on completing projects on schedule without compromising on quality.",
    },
    {
      icon: Target,
      title: "Client Focus",
      description: "Your vision is our mission. We work closely with clients to exceed expectations.",
    },
  ]

  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            About{" "}
            <span className="animate-gradient" style={{ color: "#D4AF37" }}>
              Sankalpa Builders
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Building trust through excellence since 2008. We are more than builders - we are dream makers.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Side - Company Story */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-300 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Our Journey</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Founded in 2008, Sankalpa Builders has grown from a small construction company to one of Kerala's most
                trusted builders. Based in Ernakulam, we have successfully completed over 100+ projects ranging from
                residential complexes to government institutions.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Our commitment to quality, innovation, and customer satisfaction has earned us the trust of clients
                across Kerala. From the construction of cooperative banks to educational institutions, from residential
                villas to commercial complexes, we bring the same level of dedication to every project.
              </p>
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: "#FFF4D6", borderColor: "#E8C547", borderWidth: "1px" }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5" style={{ color: "#D4AF37" }} />
                  <h4 className="text-lg font-semibold" style={{ color: "#B8941F" }}>
                    Government Recognition
                  </h4>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#8B7520" }}>
                  We are proud to be a CPWD & PWD enlisted contractor, officially recognized by the Central Public Works
                  Department and Public Works Department. This certification reflects our adherence to strict quality,
                  safety, and compliance requirements, making us a reliable partner for both public sector and private
                  developments.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-slate-900">Our Mission</h4>
              <p className="text-slate-600 leading-relaxed">
                To create lasting structures that not only meet but exceed our clients' expectations while contributing
                positively to the communities we serve. We believe in building relationships as strong as the
                foundations we lay.
              </p>
            </div>

            <Button
              className="text-white px-8 py-3"
              style={{ backgroundColor: "#D4AF37" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B8941F")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D4AF37")}
            >
              Learn More About Us
            </Button>
          </div>

          {/* Right Side - Team Video/Image */}
          <div
            className={`relative transition-all duration-1000 delay-500 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500 group">
              <Image
                src="/images/modern-house.jpeg"
                alt="Sankalpa Builders - Modern Construction Excellence"
                width={800}
                height={600}
                className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
            </div>

            {/* Floating Stats Card */}
            <Card className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 rounded-full">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1 animate-number-count" style={{ color: "#D4AF37" }}>
                  17+
                </div>
                <div className="text-sm text-slate-600">Years of Excellence</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <Card
                key={index}
                className={`p-6 text-center hover:shadow-lg transition-all duration-500 hover:scale-105 hover:-translate-y-2 group ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300"
                  style={{ backgroundColor: "#FFF4D6" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#D4AF37")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFF4D6")}
                >
                  <Icon
                    className="w-8 h-8 transition-colors duration-300 group-hover:scale-110"
                    style={{ color: "#D4AF37" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#D4AF37")}
                  />
                </div>
                <h4
                  className="text-lg font-semibold text-slate-900 mb-2 transition-colors duration-300"
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                >
                  {achievement.title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">{achievement.description}</p>
              </Card>
            )
          })}
        </div>

        {/* Company Values */}
        <div
          className={`mt-20 text-center transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">Our Core Values</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                letter: "I",
                title: "Integrity",
                description:
                  "We conduct business with honesty, transparency, and ethical practices in all our dealings.",
              },
              {
                letter: "Q",
                title: "Quality",
                description:
                  "Excellence in craftsmanship and materials is non-negotiable in every project we undertake.",
              },
              {
                letter: "R",
                title: "Reliability",
                description: "Our clients can count on us to deliver on our promises, on time and within budget.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className={`space-y-3 group hover:scale-105 transition-all duration-300 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ animationDelay: `${800 + index * 100}ms` }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto transition-colors duration-300 group-hover:scale-110"
                  style={{ backgroundColor: "#D4AF37" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B8941F")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D4AF37")}
                >
                  <span className="text-white font-bold text-lg">{value.letter}</span>
                </div>
                <h4
                  className="text-lg font-semibold text-slate-900 transition-colors duration-300"
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                >
                  {value.title}
                </h4>
                <p className="text-slate-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
