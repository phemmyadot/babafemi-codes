import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  gradient?: boolean  // gradient border on hover
}

export function Card({ children, className = '', hover = true, gradient = false }: CardProps) {
  return (
    <div
      className={`
        relative rounded-lg bg-surface border border-border p-6
        ${hover ? 'transition-all duration-300 hover:border-border-bright hover:bg-surface-elevated hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30' : ''}
        ${gradient ? 'gradient-border' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
