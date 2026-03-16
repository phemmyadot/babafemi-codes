import { Project } from '@/core/models/project'

export async function getProjects(): Promise<Project[]> {
  // Use Sanity when project ID is configured
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    const { getAllProjects } = await import('./queries')
    return getAllProjects()
  }

  // Fallback: PROJECTS_JSON env var (local dev / pre-Sanity)
  const raw = process.env.PROJECTS_JSON
  if (!raw) return []
  try {
    return JSON.parse(raw) as Project[]
  } catch {
    return []
  }
}
