interface SectionHeaderProps {
  label: string      // small eyebrow text e.g. "02 / Experience"
  title: string      // main heading
  titleAccent?: string  // portion of title rendered in gradient
  description?: string
  className?: string
}

export function SectionHeader({
  label,
  title,
  titleAccent,
  description,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${className}`}>
      <p className="font-mono text-sm text-accent-primary mb-3 tracking-widest uppercase">
        {label}
      </p>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary leading-tight">
        {titleAccent ? (
          <>
            {title}{' '}
            <span className="gradient-text">{titleAccent}</span>
          </>
        ) : (
          title
        )}
      </h2>
      {description && (
        <p className="mt-4 text-text-secondary text-lg max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
      <div className="mt-6 h-px w-16 bg-gradient-accent rounded-full" />
    </div>
  )
}
