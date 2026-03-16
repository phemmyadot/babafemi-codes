import { getClient } from './sanity'
import { Project } from '@/core/models/project'

export interface SkillGroup {
  label: string
  skills: string[]
}

export async function getSkills(): Promise<SkillGroup[]> {
  const docs = await getClient().fetch(
    `*[_type == "skills"] | order(order asc) { "label": title, skills }`,
    {},
    { next: { revalidate: 60 } }
  )
  return docs ?? []
}

const PROJECT_FIELDS = `
  "id": _id,
  title,
  description,
  "thumbnail": thumbnail.asset->url,
  tags,
  category,
  repository,
  liveUrl,
  featured,
  order
`

export async function getAllProjects(): Promise<Project[]> {
  return getClient().fetch(
    `*[_type == "project"] | order(order asc) { ${PROJECT_FIELDS} }`,
    {},
    { next: { revalidate: 60 } }
  )
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return getClient().fetch(
    `*[_type == "project" && featured == true] | order(order asc) { ${PROJECT_FIELDS} }`,
    {},
    { next: { revalidate: 60 } }
  )
}

export async function getProjectsByCategory(category: string): Promise<Project[]> {
  return getClient().fetch(
    `*[_type == "project" && category == $category] | order(order asc) { ${PROJECT_FIELDS} }`,
    { category },
    { next: { revalidate: 60 } }
  )
}
