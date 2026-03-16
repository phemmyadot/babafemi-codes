interface BadgeProps {
  label: string
  variant?: 'default' | 'accent' | 'success' | 'warning'
  pulse?: boolean
  className?: string
}

const variants = {
  default: 'bg-surface-elevated text-text-secondary border border-border hover:border-border-bright hover:text-text-primary',
  accent:  'bg-accent-primary/10 text-accent-primary border border-accent-primary/30 hover:bg-accent-primary/20',
  success: 'bg-success/10 text-success border border-success/30',
  warning: 'bg-warning/10 text-warning border border-warning/30',
}

const dotColors = {
  default: 'bg-text-secondary',
  accent:  'bg-accent-primary',
  success: 'bg-success',
  warning: 'bg-warning',
}

export function Badge({ label, variant = 'default', pulse = false, className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-mono
        transition-colors duration-150 cursor-default
        ${variants[variant]} ${className}
      `}
    >
      {pulse && (
        <span className="relative flex h-2 w-2 shrink-0">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColors[variant]}`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColors[variant]}`} />
        </span>
      )}
      {label}
    </span>
  )
}
