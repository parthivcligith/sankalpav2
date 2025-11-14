import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { Building2, FileText, Image } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Get counts for dashboard stats
  const projectsResult = await supabase.from('projects').select('id', { count: 'exact', head: true })

  const stats = [
    {
      title: 'Projects',
      value: projectsResult.count || 0,
      icon: Building2,
      href: '/admin/projects',
      color: 'text-[#C9A961]',
      bgColor: 'bg-[#C9A961]/10',
    },
  ]

  const quickLinks = [
    { title: 'Hero Section', href: '/admin/hero', icon: Image },
    { title: 'About Section', href: '/admin/about', icon: FileText },
    { title: 'Projects', href: '/admin/projects', icon: Building2 },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
        <p className="text-slate-600">Welcome to Sankalpa Builders CMS</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link key={link.href} href={link.href}>
                <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 group-hover:bg-[#C9A961]/10 flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6 text-slate-700 group-hover:text-[#C9A961] transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 group-hover:text-[#C9A961] transition-colors">
                        {link.title}
                      </h3>
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

