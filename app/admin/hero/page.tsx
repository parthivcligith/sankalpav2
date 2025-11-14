import { getHeroSection, getHeroRotatingTexts, getHeroStats } from '@/app/actions/hero-actions'
import HeroEditor from '@/components/admin/hero-editor'

export default async function HeroAdminPage() {
  const [heroData, rotatingTextsData, statsData] = await Promise.all([
    getHeroSection(),
    getHeroRotatingTexts(),
    getHeroStats(),
  ])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Hero Section</h1>
        <p className="text-slate-600">Edit the hero section content and images</p>
      </div>

      <HeroEditor
        heroData={heroData.data}
        rotatingTexts={rotatingTextsData.data || []}
        stats={statsData.data || []}
      />
    </div>
  )
}

