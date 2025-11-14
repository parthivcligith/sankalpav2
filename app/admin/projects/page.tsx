import { getProjects, getProjectCategories } from '@/app/actions/project-actions'
import ProjectsManager from '@/components/admin/projects-manager'

export default async function ProjectsAdminPage() {
  const [projectsData, categoriesData] = await Promise.all([
    getProjects(),
    getProjectCategories(),
  ])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Projects Management</h1>
        <p className="text-slate-600">Manage all projects and their details</p>
      </div>

      <ProjectsManager
        projects={projectsData.data || []}
        categories={categoriesData.data || []}
      />
    </div>
  )
}

