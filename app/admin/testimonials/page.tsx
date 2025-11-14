import { Card } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'

export default async function TestimonialsAdminPage() {
  const supabase = await createClient()
  const { data: testimonials } = await supabase.from('testimonials').select('*').order('order_index')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Testimonials</h1>
        <p className="text-slate-600">Manage client testimonials</p>
      </div>

      <Card className="p-6">
        <p className="text-slate-600 mb-4">
          Testimonials manager coming soon. For now, you can edit directly in Supabase.
        </p>
        <div className="mt-4 space-y-2">
          <p className="text-sm font-semibold">Current Testimonials ({testimonials?.length || 0}):</p>
          <div className="space-y-4">
            {testimonials && testimonials.length > 0 ? (
              testimonials.map((testimonial) => (
                <div key={testimonial.id} className="border p-4 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-slate-600">{testimonial.role}</p>
                      <p className="text-xs text-[#C9A961]">{testimonial.project}</p>
                    </div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 italic">"{testimonial.comment}"</p>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-sm">No testimonials yet</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

