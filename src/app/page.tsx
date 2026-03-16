import { Hero }       from '@/components/sections/Hero'
import { About }      from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Skills }     from '@/components/sections/Skills'
import { Projects }   from '@/components/sections/Projects'
import { Blog }       from '@/components/sections/Blog'
import { GitHub }     from '@/components/sections/GitHub'
import { Contact }    from '@/components/sections/Contact'
import { getProjects } from '@/lib/projects'
import { getSkills, getExperience, getProfile } from '@/lib/queries'
import { getBlogPosts } from '@/lib/hashnode'
import { getGitHubActivity } from '@/lib/github'

export default async function Home() {
  const [projects, skillGroups, experience, profile] = await Promise.all([
    getProjects(),
    getSkills(),
    getExperience(),
    getProfile(),
  ])

  const [blogPosts, githubEvents] = await Promise.all([
    profile?.hashnode ? getBlogPosts(profile.hashnode) : Promise.resolve([]),
    profile?.github   ? getGitHubActivity(profile.github) : Promise.resolve([]),
  ])

  return (
    <>
      <Hero profile={profile} />
      <About profile={profile} />
      <Experience experience={experience} />
      <Skills skillGroups={skillGroups} />
      <Projects projects={projects} />
      <Blog posts={blogPosts} hashnodeUrl={profile?.hashnode ?? ''} />
      <GitHub events={githubEvents} githubUrl={profile?.github ?? ''} />
      <Contact profile={profile} />
    </>
  )
}
