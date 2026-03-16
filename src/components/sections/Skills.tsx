import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { SkillGroup } from '@/lib/queries'

const fallbackGroups: SkillGroup[] = [
  {
    label: 'Mobile',
    skills: ['React Native', 'Expo', 'Flutter', 'Dart', 'iOS (Xcode)', 'Android Studio', 'Storybook', 'Flipper'],
  },
  {
    label: 'Web',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Vue.js', 'HTML', 'CSS', 'Tailwind CSS'],
  },
  {
    label: 'Backend & Cloud',
    skills: ['Node.js', 'Express', 'AWS Lambda', 'AWS S3', 'API Gateway', 'Firebase', 'Azure', 'GCP', 'REST APIs'],
  },
  {
    label: 'Security & Auth',
    skills: ['OAuth', 'MFA', 'FaceID / TouchID', 'End-to-End Encryption', 'Biometric Auth'],
  },
  {
    label: 'Testing & DevOps',
    skills: ['Jest', 'Detox', 'Cypress', 'GitHub Actions', 'Azure DevOps', 'TestFlight', 'CI/CD'],
  },
]

interface SkillsProps {
  skillGroups?: SkillGroup[]
}

export function Skills({ skillGroups }: SkillsProps) {
  const groups = skillGroups && skillGroups.length > 0 ? skillGroups : fallbackGroups
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-content mx-auto">
        <AnimatedSection>
          <SectionHeader
            label="03 / Skills"
            title="What I"
            titleAccent="work with"
          />
        </AnimatedSection>

        <div className="space-y-10">
          {groups.map((group, i) => (
            <AnimatedSection key={group.label} delay={i * 80}>
              <div>
                <h3 className="font-mono text-xs text-text-muted uppercase tracking-widest mb-4">
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Badge key={skill} label={skill} variant="default" />
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
