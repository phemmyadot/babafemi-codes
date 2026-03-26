import type { Profile } from '@/lib/queries'
import { InlineBadge } from '../atoms/InlineBadge'

interface ReadmeFileProps {
  profile: Profile | null
  isActive: boolean
}

export function ReadmeFile({ profile, isActive }: ReadmeFileProps) {
  const fullName = `${profile?.firstName ?? 'Babafemi'} ${profile?.lastName ?? 'Adojutelegan'}`
  const title    = profile?.titles?.[0] ?? 'Senior Software Engineer'
  const email    = profile?.email ?? 'babafemiadojutelegan@gmail.com'

  return (
    <div className={`file-section ${isActive ? 'active' : ''}`} id="file-readme">
      <div className="code-block">
        <div className="code-line"><span className="cm"># {fullName}</span></div>
        <div className="code-line blank"/>
        <div className="code-line">
          <span className="cm">## {title}</span>
          {profile?.openToWork && <InlineBadge variant="green">Open to Work</InlineBadge>}
        </div>
        <div className="code-line blank"/>
        <div className="code-line"><span className="cm">---</span></div>
        <div className="code-line blank"/>
        <div className="code-line"><span className="cm">### 👋 Welcome to my codebase</span></div>
        <div className="code-line blank"/>
        {(profile?.bio ?? ['I build things that matter.']).map((line, i) => (
          <div key={i} className="code-line"><span className="cm">{line}</span></div>
        ))}
        <div className="code-line blank"/>
        <div className="code-line"><span className="cm">---</span></div>
        <div className="code-line blank"/>
        <div className="code-line"><span className="cm">### 📁 Navigate this repo</span></div>
        <div className="code-line blank"/>
        <div className="code-line"><span className="cm">| File | Contents |</span></div>
        <div className="code-line"><span className="cm">|------|----------|</span></div>
        {[
          ['about.md',        'Who I am & background'],
          ['experience.json', 'Work history & roles'],
          ['skills.ts',       'Tech stack & tooling'],
          ['projects.tsx',    "Things I've shipped"],
          ['contact.ts',      'Get in touch'],
        ].map(([file, desc]) => (
          <div key={file} className="code-line">
            <span className="cm">| [{file}](#) | {desc} |</span>
          </div>
        ))}
        {profile?.certifications?.length ? (
          <>
            <div className="code-line blank"/>
            <div className="code-line"><span className="cm">---</span></div>
            <div className="code-line blank"/>
            <div className="code-line"><span className="cm">### 🏅 Certifications</span></div>
            <div className="code-line blank"/>
            {profile.certifications.map((cert, i) => (
              <div key={i} className="code-line">
                <span className="cm">
                  {cert.url
                    ? <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>{cert.label}</a>
                    : cert.label}
                </span>
              </div>
            ))}
          </>
        ) : null}
        {profile?.stats?.length ? (
          <>
            <div className="code-line blank"/>
            <div className="code-line"><span className="cm">---</span></div>
            <div className="code-line blank"/>
            <div className="code-line"><span className="cm">### 📊 Stats</span></div>
            <div className="code-line blank"/>
            {profile.stats.map((stat, i) => (
              <div key={i} className="code-line">
                <span className="pl">- </span>
                <span className="nu">{stat.value}</span>
                <span className="pl"> {stat.label}</span>
              </div>
            ))}
          </>
        ) : null}
        <div className="code-line blank"/>
        <div className="code-line"><span className="cm">---</span></div>
        <div className="code-line blank"/>
        <div className="code-line">
          <span className="cm">*{profile?.tagline ?? 'Engineering experiences. Shipping solutions.'}*</span>
        </div>
        <div className="code-line blank"/>
        <div className="code-line">
          <span className="pl">{email}</span><span className="cursor"/>
        </div>
      </div>
    </div>
  )
}
