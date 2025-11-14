import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createClient } from '@/lib/supabase/server'

export default async function AboutAdminPage() {
  const supabase = await createClient()
  const { data: aboutData } = await supabase.from('about_section').select('*').single()
  const { data: achievements } = await supabase
    .from('about_achievements')
    .select('*')
    .order('order_index')
  const { data: coreValues } = await supabase
    .from('about_core_values')
    .select('*')
    .order('order_index')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">About Section</h1>
        <p className="text-slate-600">Edit the about section content</p>
      </div>

      <Card className="p-6">
        <p className="text-slate-600">
          About section editor coming soon. For now, you can edit directly in Supabase or add
          server actions similar to the hero section.
        </p>
        <div className="mt-4 space-y-2">
          <p className="text-sm font-semibold">Current Data:</p>
          <pre className="text-xs bg-slate-100 p-4 rounded overflow-auto">
            {JSON.stringify({ aboutData, achievements, coreValues }, null, 2)}
          </pre>
        </div>
      </Card>
    </div>
  )
}

