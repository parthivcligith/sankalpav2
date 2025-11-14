import { Card } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'

export default async function WhyChooseUsAdminPage() {
  const supabase = await createClient()
  const { data: sectionData } = await supabase.from('why_choose_us_section').select('*').single()
  const { data: advantages } = await supabase.from('advantages').select('*').order('order_index')
  const { data: testimonials } = await supabase.from('testimonials').select('*').order('order_index')
  const { data: certifications } = await supabase.from('certifications').select('*').order('order_index')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Why Choose Us Section</h1>
        <p className="text-slate-600">Manage advantages, testimonials, and certifications</p>
      </div>

      <Card className="p-6">
        <p className="text-slate-600">
          Why Choose Us section editor coming soon. For now, you can edit directly in Supabase or
          add server actions.
        </p>
        <div className="mt-4 space-y-2">
          <p className="text-sm font-semibold">Current Data:</p>
          <pre className="text-xs bg-slate-100 p-4 rounded overflow-auto">
            {JSON.stringify({ sectionData, advantages, testimonials, certifications }, null, 2)}
          </pre>
        </div>
      </Card>
    </div>
  )
}

