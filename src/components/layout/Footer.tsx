import { Github, ExternalLink, Linkedin as LinkedinIcon } from 'lucide-react'
import { Profile } from '@/lib/queries'

interface FooterProps {
  profile: Profile | null
}

export function Footer({ profile }: FooterProps) {
  const year      = new Date().getFullYear()
  const firstName = profile?.firstName ?? 'Babafemi'
  const lastName  = profile?.lastName  ?? 'Adojutelegan'
  const name      = `${firstName} ${lastName}`

  const socialLinks = [
    { label: 'GitHub',    href: profile?.github   ?? 'https://github.com/babafemiogungbade',    icon: Github },
    { label: 'LinkedIn',  href: profile?.linkedin  ?? 'https://linkedin.com/in/badojutelegan',   icon: LinkedinIcon },
    { label: 'Hashnode',  href: profile?.hashnode  ?? 'https://hashnode.com/@babafemi',          icon: ExternalLink },
  ].filter(({ href }) => href)

  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-content mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-text-muted">
          © {year} {name}. Built with Next.js.
        </p>

        <div className="flex items-center gap-5">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-text-muted hover:text-text-primary transition-colors duration-150"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
