import { getClient } from './sanity'
import { Project } from '@/core/models/project'

export interface Profile {
  firstName: string
  lastName: string
  tagline: string
  titles: string[]
  bio: string[]
  email: string
  linkedin: string
  github: string
  hashnode: string
  avatar: string | null
  resumeUrl: string
  openToWork: boolean
  stats: { value: string; label: string }[]
  certifications: { label: string; url: string | null }[]
}

export async function getProfile(): Promise<Profile | null> {
  return getClient().fetch(
    `*[_type == "profile"][0]{
      firstName, lastName, tagline, titles, bio,
      email, linkedin, github, hashnode,
      "avatar": avatar.asset->url,
      "resumeUrl": resume.asset->url,
      openToWork, stats, certifications[]{ label, url }
    }`,
    {},
    { next: { revalidate: 60 } }
  )
}

export interface ExperienceItem {
  company: string
  role: string
  startDate: string
  endDate: string | null
  current: boolean
  bullets: string[]
}

export async function getExperience(): Promise<ExperienceItem[]> {
  return getClient().fetch(
    `*[_type == "experience"] | order(order asc) {
      company,
      role,
      startDate,
      endDate,
      current,
      bullets
    }`,
    {},
    { next: { revalidate: 60 } }
  )
}

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
  "categoryLabel": select(
    category == "mobile"    => "Mobile",
    category == "web"       => "Web",
    category == "fullstack" => "Full Stack",
    category == "backend"   => "Backend",
    category
  ),
  repository,
  liveUrl,
  featured,
  extras,
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
