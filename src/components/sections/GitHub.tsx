import { GitBranch, GitPullRequest, GitCommit, Tag, CircleDot, ExternalLink } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { GitHubEvent } from '@/lib/github'

interface GitHubProps {
  events:    GitHubEvent[]
  githubUrl: string
}

const iconMap: Record<string, React.ReactNode> = {
  PushEvent:        <GitCommit     size={15} />,
  PullRequestEvent: <GitPullRequest size={15} />,
  CreateEvent:      <GitBranch     size={15} />,
  ReleaseEvent:     <Tag           size={15} />,
  IssuesEvent:      <CircleDot     size={15} />,
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins  = Math.floor(diff / 60_000)
  const hours = Math.floor(diff / 3_600_000)
  const days  = Math.floor(diff / 86_400_000)
  if (mins  <  60) return `${mins}m ago`
  if (hours <  24) return `${hours}h ago`
  if (days  <  30) return `${days}d ago`
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function GitHub({ events, githubUrl }: GitHubProps) {
  if (events.length === 0) return null

  return (
    <section id="github" className="py-24 px-6 bg-surface/30">
      <div className="max-w-content mx-auto">
        <AnimatedSection>
          <SectionHeader
            label="06 / Activity"
            title="Recent"
            titleAccent="contributions"
          />
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="max-w-2xl">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

              <ul className="space-y-5">
                {events.map((event) => (
                  <li key={event.id} className="flex items-start gap-4 pl-1">
                    {/* Dot */}
                    <div className="relative z-10 mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-surface border border-border text-text-muted">
                      {iconMap[event.type] ?? <GitCommit size={10} />}
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 items-start justify-between gap-4 min-w-0">
                      <div className="min-w-0">
                        <p className="text-sm text-text-secondary leading-snug">
                          {event.message}
                        </p>
                        <a
                          href={event.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-1 font-mono text-xs text-text-muted hover:text-accent-primary transition-colors"
                        >
                          {event.repo}
                          <ExternalLink size={10} />
                        </a>
                      </div>
                      <span className="shrink-0 font-mono text-xs text-text-muted">
                        {timeAgo(event.createdAt)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 font-mono text-sm text-text-secondary hover:text-accent-primary transition-colors"
            >
              View full profile <ExternalLink size={14} />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
