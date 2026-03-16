'use client'

import { ArrowDown, Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Typewriter } from '@/components/ui/Typewriter'
import { Profile } from '@/lib/queries'

interface HeroProps {
  profile: Profile | null
}

export function Hero({ profile }: HeroProps) {
  if (!profile) return null

  const [taglineStart, taglineEnd] = profile.tagline?.includes('.')
    ? [
        profile.tagline.slice(0, profile.tagline.indexOf('.') + 1),
        profile.tagline.slice(profile.tagline.indexOf('.') + 1).trim(),
      ]
    : [profile.tagline ?? '', '']

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-content w-full mx-auto text-center">
        <p className="font-mono text-sm text-text-secondary mb-6 tracking-widest uppercase">
          Hi, I&apos;m
        </p>

        <h1 className="font-display font-bold leading-none mb-4">
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl gradient-text">
            {profile.firstName}
          </span>
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-text-primary mt-1">
            {profile.lastName}
          </span>
        </h1>

        <div className="mt-6 mb-6 font-display text-xl sm:text-2xl md:text-3xl font-semibold min-h-[2.5rem]">
          <Typewriter titles={profile.titles ?? []} />
        </div>

        {profile.tagline && (
          <p className="text-text-secondary text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            {taglineStart}{' '}
            {taglineEnd && <span className="text-text-primary">{taglineEnd}</span>}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="#projects" size="lg">
            View My Work
            <ArrowDown size={18} />
          </Button>
          {profile.resumeUrl && (
            <Button href={profile.resumeUrl} variant="outline" size="lg" download target="_blank" rel="noopener noreferrer">
              Download Resume
              <Download size={18} />
            </Button>
          )}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted">
        <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-border to-transparent" />
      </div>
    </section>
  )
}
