import { Card } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'

export default async function ContactAdminPage() {
  const supabase = await createClient()
  const { data: sectionData } = await supabase.from('contact_section').select('*').single()
  const { data: contactInfo } = await supabase.from('contact_info').select('*').order('order_index')
  const { data: submissions } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Contact Section</h1>
        <p className="text-slate-600">Manage contact information and view submissions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Contact Section Settings</h2>
          <p className="text-slate-600 mb-4">
            Contact section editor coming soon. For now, you can edit directly in Supabase.
          </p>
          <div className="mt-4 space-y-2">
            <p className="text-sm font-semibold">Current Data:</p>
            <pre className="text-xs bg-slate-100 p-4 rounded overflow-auto">
              {JSON.stringify({ sectionData, contactInfo }, null, 2)}
            </pre>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Contact Submissions ({submissions?.length || 0})</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {submissions && submissions.length > 0 ? (
              submissions.map((submission) => (
                <div key={submission.id} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">{submission.name}</p>
                      <p className="text-sm text-slate-600">{submission.email}</p>
                      <p className="text-sm text-slate-600">{submission.phone}</p>
                    </div>
                    <span className="text-xs text-slate-500">
                      {new Date(submission.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700">{submission.message}</p>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-sm">No submissions yet</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

