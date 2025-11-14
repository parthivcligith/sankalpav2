import { Card } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'

export default async function ServicesAdminPage() {
  const supabase = await createClient()
  const { data: servicesData } = await supabase.from('services_section').select('*').single()
  const { data: services } = await supabase.from('services').select('*, service_features(*)').order('order_index')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Services Section</h1>
        <p className="text-slate-600">Manage services and their features</p>
      </div>

      <Card className="p-6">
        <p className="text-slate-600">
          Services section editor coming soon. For now, you can edit directly in Supabase or add
          server actions similar to the projects section.
        </p>
        <div className="mt-4 space-y-2">
          <p className="text-sm font-semibold">Current Data:</p>
          <pre className="text-xs bg-slate-100 p-4 rounded overflow-auto">
            {JSON.stringify({ servicesData, services }, null, 2)}
          </pre>
        </div>
      </Card>
    </div>
  )
}

