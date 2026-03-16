interface BadgeProps {
  label: string
  variant?: 'default' | 'accent' | 'success' | 'warning'
  className?: string
}

const variants = {
  default: 'bg-surface-elevated text-text-secondary border border-border hover:border-border-bright hover:text-text-primary',
  accent:  'bg-accent-primary/10 text-accent-primary border border-accent-primary/30 hover:bg-accent-primary/20',
  success: 'bg-success/10 text-success border border-success/30',
  warning: 'bg-warning/10 text-warning border border-warning/30',
}

export function Badge({ label, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-sm font-mono
        transition-colors duration-150 cursor-default
        ${variants[variant]} ${className}
      `}
    >
      {label}
    </span>
  )
}
