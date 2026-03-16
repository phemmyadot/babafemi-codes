import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

interface ExperienceItem {
  company:   string
  role:      string
  period:    string
  current?:  boolean
  bullets:   string[]
}

const experience: ExperienceItem[] = [
  {
    company: 'Telus Digital',
    role:    'Senior Software Engineer',
    period:  'Oct 2024 — Present',
    current: true,
    bullets: [
      'Designed and maintained modular, high-performance frontend systems within a shared monorepo, accelerating feature delivery across multiple production applications.',
      'Built an AI-powered chat interface with a custom animated Markdown renderer and high-fidelity PDF/DOCX source viewer, optimizing real-time streaming performance.',
      'Collaborated with cross-functional AI and Product teams to architect and integrate complex APIs into a production mobile application.',
      'Managed high-integrity release cycles via Azure CI/CD to TestFlight, monitoring stability with App Insights and Crashlytics — 100% deployment consistency.',
      'Engineered OAuth + MFA + Biometric (FaceID/TouchID) authentication suite for high-security access control.',
    ],
  },
  {
    company: 'Rhaeos',
    role:    'Mobile Application Developer',
    period:  'Jul 2023 — Jun 2024',
    bullets: [
      'Implemented End-to-End Encryption between mobile apps and BLE hardware to ensure data integrity and user privacy.',
      'Integrated BLE hardware for high-reliability real-time data collection and historical data visualization.',
      'Built serverless data-processing pipelines with AWS Lambda and API Gateway for high-volume analytics streams.',
      'Developed E2E testing strategies with Detox and Jest for mission-critical medical software.',
    ],
  },
  {
    company: 'Eminent Technology',
    role:    'Full Stack Developer',
    period:  'Jan 2019 — Jul 2023',
    bullets: [
      'Developed scalable microservice architectures to streamline complex order workflows and high-transaction operations.',
      'Built mobile applications with background synchronization and real-time notifications for low-connectivity environments.',
      'Architected cloud migration strategies and automated CI/CD pipelines in Azure, improving uptime and deployment reliability.',
    ],
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-surface/30">
      <div className="max-w-content mx-auto">
        <AnimatedSection>
          <SectionHeader
            label="02 / Experience"
            title="Where I've"
            titleAccent="worked"
          />
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-6 top-0 bottom-0 w-px bg-border" aria-hidden />

          <div className="space-y-12">
            {experience.map((item, i) => (
              <AnimatedSection key={item.company} delay={i * 100}>
                <div className="relative pl-8 md:pl-20">
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-[-5px] md:left-[19px] top-1 w-[11px] h-[11px] rounded-full border-2 ${
                      item.current
                        ? 'border-accent-primary bg-accent-primary shadow-[0_0_12px_rgba(99,102,241,0.6)]'
                        : 'border-border-bright bg-bg'
                    }`}
                    aria-hidden
                  />

                  {/* Card */}
                  <div className="bg-surface border border-border rounded-lg p-6 hover:border-border-bright transition-colors duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-4">
                      <div>
                        <h3 className="font-display font-semibold text-xl text-text-primary">
                          {item.company}
                        </h3>
                        <p className="text-accent-secondary text-sm font-medium mt-0.5">
                          {item.role}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-text-muted whitespace-nowrap">
                        {item.period}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {item.bullets.map((bullet, j) => (
                        <li key={j} className="flex gap-3 text-text-secondary text-sm leading-relaxed">
                          <span className="text-accent-primary mt-1.5 shrink-0 text-xs">▹</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
