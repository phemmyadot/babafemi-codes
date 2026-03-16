import Image from 'next/image'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { Profile } from '@/lib/queries'

const BLUR_PLACEHOLDER =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUEB//EACIQAAIBBAMBAQEAAAAAAAAAAAECAAMEBRIxIUFRcf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCw3VtZXEFvcRrKkitG6kAggg5B9iCMGrC6tLuKQywyROpIIKkEHkEEeoI5B5oooA//2Q=='

const defaultStats = [
  { value: '7+', label: 'Years Experience' },
  { value: '3',  label: 'Companies' },
  { value: '1',  label: 'AWS Certification' },
]

interface AboutProps {
  profile: Profile | null
}

export function About({ profile }: AboutProps) {
  const bio            = profile?.bio            ?? []
  const stats          = profile?.stats          ?? defaultStats
  const certifications = profile?.certifications ?? ['AWS Certified Solutions Architect']
  const openToWork     = profile?.openToWork     ?? true
  const avatarSrc      = profile?.avatar         ?? '/assets/avatar.png'
  const firstName      = profile?.firstName      ?? 'Babafemi'
  const lastName       = profile?.lastName       ?? 'Adojutelegan'

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-content mx-auto">
        <AnimatedSection>
          <SectionHeader
            label="01 / About"
            title="Building things that"
            titleAccent="matter"
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <AnimatedSection delay={100}>
            <div className="space-y-5 text-text-secondary text-lg leading-relaxed">
              {bio.length > 0
                ? bio.map((para, i) => <p key={i}>{para}</p>)
                : (
                  <>
                    <p>
                      I&apos;m a Senior Software Engineer with 7+ years of experience building
                      production-grade mobile and web applications.
                    </p>
                    <p>
                      Currently at <span className="text-text-primary font-medium">Telus Digital</span>,
                      I architect high-performance frontend systems and own end-to-end release cycles.
                    </p>
                  </>
                )
              }
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {certifications.map((cert) => (
                <Badge key={cert} label={cert} variant="warning" />
              ))}
              {openToWork && <Badge label="Open to opportunities" variant="success" />}
            </div>
          </AnimatedSection>

          {/* Stats + Avatar */}
          <AnimatedSection delay={200}>
            <div className="flex flex-col items-center gap-8">
              <div className="relative">
                <div
                  className="absolute -inset-1 rounded-xl opacity-60 blur-sm"
                  style={{ background: 'linear-gradient(135deg, #6366F1, #22D3EE)' }}
                  aria-hidden
                />
                <div className="relative rounded-xl overflow-hidden w-48 h-48 sm:w-56 sm:h-56 border border-border">
                  <Image
                    src={avatarSrc}
                    alt={`${firstName} ${lastName}`}
                    fill
                    className="object-cover"
                    priority
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 w-full">
                {stats.map(({ value, label }) => (
                  <div
                    key={label}
                    className="text-center p-4 rounded-lg bg-surface border border-border"
                  >
                    <p className="font-display font-bold text-3xl gradient-text">{value}</p>
                    <p className="text-text-muted text-xs mt-1 leading-tight">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
