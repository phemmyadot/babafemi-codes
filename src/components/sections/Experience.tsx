import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ExperienceItem } from '@/lib/queries'

function formatPeriod(startDate: string, endDate: string | null, current: boolean): string {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  return `${fmt(startDate)} — ${current || !endDate ? 'Present' : fmt(endDate)}`
}

interface ExperienceProps {
  experience: ExperienceItem[]
}

export function Experience({ experience }: ExperienceProps) {
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
                        {formatPeriod(item.startDate, item.endDate, item.current)}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {(item.bullets ?? []).map((bullet, j) => (
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
