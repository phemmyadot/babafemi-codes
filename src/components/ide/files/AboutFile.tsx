import type { Profile } from '@/lib/queries'

interface AboutFileProps {
  profile: Profile | null
  isActive: boolean
}

export function AboutFile({ profile, isActive }: AboutFileProps) {
  return (
    <div className={`file-section ${isActive ? 'active' : ''}`} id="file-about">
      <div className="code-block">
        <div className="code-line"><span className="cm"># About Me</span></div>
        <div className="code-line blank"/>
        <div className="code-line"><span className="cm">## Background</span></div>
        <div className="code-line blank"/>
        {(profile?.bio ?? ['Senior Software Engineer with 7+ years of experience.']).map((line, i) => (
          <div key={i} className="code-line"><span className="cm">{line}</span></div>
        ))}
        <div className="code-line blank"/>
        <div className="code-line"><span className="cm">---</span></div>
        <div className="code-line blank"/>
        <div className="code-line"><span className="cm">## Specialization</span></div>
        <div className="code-line blank"/>
        <div className="code-line"><span className="pl">- React Native · TypeScript · Cloud Infrastructure</span></div>
        <div className="code-line"><span className="pl">- Bias toward shipping clean, maintainable software at scale</span></div>
        <div className="code-line"><span className="pl">- Full ownership of mobile release cycles</span></div>
        {profile?.certifications?.map((cert, i) => (
          <div key={i} className="code-line"><span className="pl">- {cert.label}</span></div>
        ))}
        <div className="code-line blank"/>
        <div className="code-line"><span className="cm">---</span></div>
        <div className="code-line blank"/>
        <div className="code-line"><span className="cm">## Availability</span></div>
        <div className="code-line blank"/>
        <div className="code-line">
          <span className="kw">const </span><span className="lk">availability</span>
          <span className="op"> = </span><span className="ty">{'{'}</span>
        </div>
        <div className="code-line indent-1">
          <span className="lk">status</span><span className="op">: </span>
          <span className="st">&quot;Open to opportunities&quot;</span><span className="op">,</span>
        </div>
        <div className="code-line indent-1"><span className="lk">roles</span><span className="op">: [</span></div>
        <div className="code-line indent-2"><span className="st">&quot;Senior Engineer&quot;</span><span className="op">,</span></div>
        <div className="code-line indent-2"><span className="st">&quot;Contract Work&quot;</span><span className="op">,</span></div>
        <div className="code-line indent-2"><span className="st">&quot;Interesting Side Projects&quot;</span></div>
        <div className="code-line indent-1"><span className="op">],</span></div>
        <div className="code-line indent-1">
          <span className="lk">preferredStack</span><span className="op">: </span>
          <span className="st">&quot;React Native · TypeScript · AWS&quot;</span>
        </div>
        <div className="code-line"><span className="ty">{'}'}</span></div>
        <div className="code-line blank"/>
        <div className="code-line">
          <span className="cm">{'// If you\'re building something worth building — let\'s talk.'}</span>
        </div>
      </div>
    </div>
  )
}
