'use client'

import { useState } from 'react'
import { Github, ExternalLink } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Project, ProjectCategory } from '@/core/models/project'

type FilterOption = 'all' | ProjectCategory

const filterLabels: { value: FilterOption; label: string }[] = [
  { value: 'all',       label: 'All' },
  { value: 'mobile',    label: 'Mobile' },
  { value: 'web',       label: 'Web' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'backend',   label: 'Backend' },
]

interface ProjectsProps {
  projects: Project[]
}

export function Projects({ projects }: ProjectsProps) {
  const [filter, setFilter] = useState<FilterOption>('all')

  const filtered = filter === 'all'
    ? projects
    : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="py-24 px-6 bg-surface/30">
      <div className="max-w-content mx-auto">
        <AnimatedSection>
          <SectionHeader
            label="04 / Projects"
            title="Things I've"
            titleAccent="built"
          />
        </AnimatedSection>

        {/* Filter pills */}
        <AnimatedSection delay={100}>
          <div className="flex flex-wrap gap-2 mb-12">
            {filterLabels.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={`px-4 py-1.5 rounded-full text-sm font-mono transition-all duration-200 border ${
                  filter === value
                    ? 'bg-accent-primary border-accent-primary text-white'
                    : 'border-border text-text-secondary hover:border-border-bright hover:text-text-primary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Grid */}
        {filtered.length === 0 ? (
          <AnimatedSection>
            <div className="text-center py-20 text-text-muted font-mono text-sm">
              No projects yet — check back soon.
            </div>
          </AnimatedSection>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered
              .sort((a, b) => a.order - b.order)
              .map((project, i) => (
                <AnimatedSection key={project.id} delay={i * 60}>
                  <Card className={`h-full flex flex-col ${project.featured ? 'border-accent-primary/30' : ''}`}>
                    {/* Featured indicator */}
                    {project.featured && (
                      <span className="inline-block mb-3 font-mono text-xs text-accent-primary tracking-widest uppercase">
                        ★ Featured
                      </span>
                    )}

                    <h3 className="font-display font-semibold text-lg text-text-primary mb-2">
                      {project.title}
                    </h3>

                    <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-4">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.map((tag) => (
                        <Badge key={tag} label={tag} variant="accent" />
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border">
                      {project.repository && (
                        <a
                          href={project.repository}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors text-sm"
                        >
                          <Github size={15} />
                          Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-text-muted hover:text-accent-secondary transition-colors text-sm"
                        >
                          <ExternalLink size={15} />
                          Live
                        </a>
                      )}
                    </div>
                  </Card>
                </AnimatedSection>
              ))}
          </div>
        )}
      </div>
    </section>
  )
}
