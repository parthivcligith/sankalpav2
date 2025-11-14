import { Card } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'

export default async function ContactSubmissionsPage() {
  const supabase = await createClient()
  const { data: submissions } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Contact Submissions</h1>
        <p className="text-slate-600">View and manage contact form submissions</p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          {submissions && submissions.length > 0 ? (
            submissions.map((submission) => (
              <div key={submission.id} className="border-b pb-4 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-lg">{submission.name}</p>
                    <p className="text-sm text-slate-600">{submission.email}</p>
                    <p className="text-sm text-slate-600">{submission.phone}</p>
                  </div>
                  <span className="text-xs text-slate-500">
                    {new Date(submission.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-slate-700 mt-2">{submission.message}</p>
                {submission.is_read && (
                  <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    Read
                  </span>
                )}
              </div>
            ))
          ) : (
            <p className="text-slate-500 text-center py-8">No submissions yet</p>
          )}
        </div>
      </Card>
    </div>
  )
}

