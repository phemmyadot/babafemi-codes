import { getProjects } from '@/lib/projects'
import { getSkills, getExperience, getProfile } from '@/lib/queries'
import { getBlogPosts } from '@/lib/hashnode'
import { IdePortfolio } from '@/components/ide/IdePortfolio'

export default async function Home() {
  const [projects, skillGroups, experience, profile] = await Promise.all([
    getProjects(),
    getSkills(),
    getExperience(),
    getProfile(),
  ])

  const blogPosts = profile?.hashnode
    ? await getBlogPosts(profile.hashnode)
    : []

  return (
    <IdePortfolio
      profile={profile}
      experience={experience}
      skillGroups={skillGroups}
      projects={projects}
      blogPosts={blogPosts}
    />
  )
}
