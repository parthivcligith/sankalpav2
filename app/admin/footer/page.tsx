import { Card } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'

export default async function FooterAdminPage() {
  const supabase = await createClient()
  const { data: footerData } = await supabase.from('footer_section').select('*').single()
  const { data: quickLinks } = await supabase.from('footer_quick_links').select('*').order('order_index')
  const { data: services } = await supabase.from('footer_services').select('*').order('order_index')
  const { data: socialLinks } = await supabase.from('footer_social_links').select('*').order('order_index')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Footer Section</h1>
        <p className="text-slate-600">Edit footer content and links</p>
      </div>

      <Card className="p-6">
        <p className="text-slate-600">
          Footer section editor coming soon. For now, you can edit directly in Supabase or add
          server actions.
        </p>
        <div className="mt-4 space-y-2">
          <p className="text-sm font-semibold">Current Data:</p>
          <pre className="text-xs bg-slate-100 p-4 rounded overflow-auto">
            {JSON.stringify({ footerData, quickLinks, services, socialLinks }, null, 2)}
          </pre>
        </div>
      </Card>
    </div>
  )
}

