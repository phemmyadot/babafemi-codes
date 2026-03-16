import { Hero }       from '@/components/sections/Hero'
import { About }      from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Skills }     from '@/components/sections/Skills'
import { Projects }   from '@/components/sections/Projects'
import { Contact }    from '@/components/sections/Contact'
import { getProjects } from '@/lib/projects'
import { getSkills, getExperience } from '@/lib/queries'

export default async function Home() {
  const [projects, skillGroups, experience] = await Promise.all([
    getProjects(),
    getSkills(),
    getExperience(),
  ])

  return (
    <>
      <Hero />
      <About />
      <Experience experience={experience} />
      <Skills skillGroups={skillGroups} />
      <Projects projects={projects} />
      <Contact />
    </>
  )
}
