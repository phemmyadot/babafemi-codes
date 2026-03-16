import { Project } from '@/core/models/project'

export function getProjects(): Project[] {
  const raw = process.env.PROJECTS_JSON
  if (!raw) return []
  try {
    return JSON.parse(raw) as Project[]
  } catch {
    return []
  }
}
