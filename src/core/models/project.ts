export type ProjectCategory = 'mobile' | 'web' | 'backend' | 'fullstack'

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  category: ProjectCategory
  categoryLabel: string
  repository?: string
  liveUrls?: { title: string; link: string }[]
  featured: boolean
  order: number
  thumbnail?: string
  extras: string[];
}
