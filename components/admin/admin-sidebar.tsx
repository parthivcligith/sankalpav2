'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  LayoutDashboard,
  Image,
  FileText,
  Building2,
  Award,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { toast } from 'sonner'

const navItems = [
  { title: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { title: 'Hero Section', href: '/admin/hero', icon: Image },
  { title: 'About', href: '/admin/about', icon: FileText },
  { title: 'Services', href: '/admin/services', icon: Building2 },
  { title: 'Projects', href: '/admin/projects', icon: Building2 },
  { title: 'Why Choose Us', href: '/admin/why-choose-us', icon: Award },
  { title: 'Contact', href: '/admin/contact', icon: MessageSquare },
  { title: 'Footer', href: '/admin/footer', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const supabase = createClient()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error('Error logging out')
    } else {
      router.push('/admin/login')
      router.refresh()
    }
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-white"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 z-40 transition-transform duration-300',
          'lg:translate-x-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-slate-200">
            <h1 className="text-xl font-bold text-slate-900">Sankalpa CMS</h1>
            <p className="text-sm text-slate-600">Admin Panel</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-[#C9A961]/10 text-[#C9A961] font-medium'
                      : 'text-slate-700 hover:bg-slate-100'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-slate-200">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start text-slate-700 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}

