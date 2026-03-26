import type { Project } from '@/core/models/project'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="project-card">
      <div className="project-title">{project.title}</div>
      <div className="project-desc">{project.description}</div>
      <div className="project-tags">
        {project.tags?.map((tag, i) => (
          <span key={i} className="project-tag">{tag}</span>
        ))}
      </div>
      <div className="project-links">
        {project.repository && (
          <a className="project-link" href={project.repository} target="_blank" rel="noopener noreferrer">
            ⎇ GitHub
          </a>
        )}
        {project.liveUrl && (
          <a className="project-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            ↗ Live
          </a>
        )}
      </div>
    </div>
  )
}
