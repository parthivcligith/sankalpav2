'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  LayoutDashboard,
  Image as ImageIcon,
  FileText,
  Building2,
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
  { title: 'Hero Section', href: '/admin/hero', icon: ImageIcon },
  { title: 'About', href: '/admin/about', icon: FileText },
  { title: 'Projects', href: '/admin/projects', icon: Building2 },
]

export default function AdminNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const supabase = createClient()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error('Error logging out')
    } else {
      router.push('/login')
      router.refresh()
    }
  }

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 shadow-sm">
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <Link href="/admin" className="flex items-center space-x-3">
              <Image
                src="/logo-transparent.png"
                alt="Sankalpa Builders Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <div>
                <h1 className="text-lg font-bold text-slate-900">Sankalpa CMS</h1>
                <p className="text-xs text-slate-600 hidden sm:block">Admin Panel</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm',
                    isActive
                      ? 'bg-[#C9A961]/10 text-[#C9A961] font-medium'
                      : 'text-slate-700 hover:bg-slate-100'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </Link>
              )
            })}
          </div>

          {/* Right Side - Logout and Mobile Menu */}
          <div className="flex items-center space-x-2">
            {/* Desktop Logout */}
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="hidden lg:flex items-center space-x-2 text-slate-700 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <>
          {/* Overlay */}
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileOpen(false)}
          />
          {/* Mobile Menu Panel */}
          <div className="lg:hidden fixed top-16 left-0 right-0 bg-white border-b border-slate-200 shadow-lg z-40 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="p-4 space-y-2">
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
              {/* Mobile Logout */}
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start text-slate-700 hover:text-red-600 hover:bg-red-50 mt-4"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

