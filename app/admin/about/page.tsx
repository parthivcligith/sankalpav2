import { getAboutSection } from '@/app/actions/section-actions'
import AboutEditor from '@/components/admin/about-editor'

export default async function AboutAdminPage() {
  const aboutResult = await getAboutSection()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">About Section</h1>
        <p className="text-slate-600">Edit the about section content and images</p>
      </div>

      <AboutEditor
        aboutData={aboutResult.data}
        achievements={aboutResult.data?.about_achievements || []}
        values={aboutResult.data?.about_values || []}
      />
    </div>
  )
}

