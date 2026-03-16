'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Project, ProjectCategory } from '@/core/models/project'

interface ProjectsProps {
  projects: Project[]
}

export function Projects({ projects }: ProjectsProps) {
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all')

  const filters = [
    { value: 'all' as const, label: 'All' },
    ...Array.from(
      new Map(projects.filter((p) => p.category).map((p) => [p.category, p.categoryLabel ?? p.category]))
    ).map(([value, label]) => ({ value: value as ProjectCategory, label })),
  ]

  const sorted   = [...projects].sort((a, b) => a.order - b.order)
  const filtered = filter === 'all' ? sorted : sorted.filter((p) => p.category === filter)

  const featured = filtered.filter((p) => p.featured)
  const regular  = filtered.filter((p) => !p.featured)

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
            {filters.map(({ value, label }) => (
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

        {filtered.length === 0 ? (
          <AnimatedSection>
            <div className="text-center py-20 text-text-muted font-mono text-sm">
              No projects yet — check back soon.
            </div>
          </AnimatedSection>
        ) : (
          <div className="space-y-16">
            {/* ── Featured projects ── */}
            {featured.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6">
                {featured.map((project, i) => (
                  <AnimatedSection key={project.id} delay={i * 80}>
                    <Card className="flex flex-col h-full border-accent-primary/30 overflow-hidden p-0">
                      {/* Thumbnail */}
                      <div className="relative w-full aspect-video bg-surface-elevated overflow-hidden">
                        {project.thumbnail ? (
                          <Image
                            src={project.thumbnail}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-mono text-xs text-text-muted tracking-widest uppercase">
                              No preview
                            </span>
                          </div>
                        )}
                        <div className="absolute top-3 left-3">
                          <span className="inline-block px-2.5 py-1 rounded-full bg-accent-primary/90 font-mono text-xs text-white tracking-widest uppercase">
                            ★ Featured
                          </span>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="flex flex-col flex-1 p-6">
                        <h3 className="font-display font-semibold text-xl text-text-primary mb-2">
                          {project.title}
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {project.tags.map((tag) => (
                            <Badge key={tag} label={tag} variant="accent" />
                          ))}
                        </div>
                        <div className="flex items-center gap-4 pt-4 border-t border-border">
                          {project.repository && (
                            <a href={project.repository} target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors text-sm">
                              <ExternalLink size={15} />Code
                            </a>
                          )}
                          {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-text-muted hover:text-accent-secondary transition-colors text-sm">
                              <ExternalLink size={15} />Live
                            </a>
                          )}
                        </div>
                      </div>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            )}

            {/* ── Regular projects ── */}
            {regular.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {regular.map((project, i) => (
                  <AnimatedSection key={project.id} delay={i * 60}>
                    <Card className="h-full flex flex-col">
                      <h3 className="font-display font-semibold text-lg text-text-primary mb-2">
                        {project.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed flex-1 mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.tags.map((tag) => (
                          <Badge key={tag} label={tag} variant="accent" />
                        ))}
                      </div>
                      <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border">
                        {project.repository && (
                          <a href={project.repository} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors text-sm">
                            <ExternalLink size={15} />Code
                          </a>
                        )}
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-text-muted hover:text-accent-secondary transition-colors text-sm">
                            <ExternalLink size={15} />Live
                          </a>
                        )}
                      </div>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
