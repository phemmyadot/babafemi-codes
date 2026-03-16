export type ProjectCategory = 'mobile' | 'web' | 'backend' | 'fullstack'

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  category: ProjectCategory
  repository?: string
  liveUrl?: string
  featured: boolean
  order: number
  thumbnail?: string // Sanity image URL
}
