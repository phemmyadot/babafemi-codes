import type { Profile } from '@/lib/queries'

type ContactStatus = 'idle' | 'sending' | 'sent' | 'error'

interface ContactFileProps {
  profile: Profile | null
  status: ContactStatus
  isActive: boolean
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void
}

const BUTTON_LABEL: Record<ContactStatus, string> = {
  idle:    'sendMessage(payload) →',
  sending: 'sending...',
  sent:    '✓ message sent',
  error:   '✗ error — try again',
}

export function ContactFile({ profile, status, isActive, onSubmit }: ContactFileProps) {
  const email   = profile?.email    ?? 'babafemiadojutelegan@gmail.com'
  const linkedin = profile?.linkedin ?? 'https://www.linkedin.com/in/badojutelegan/'
  const github  = profile?.github   ?? 'https://github.com/phemmyadot'

  return (
    <div className={`file-section ${isActive ? 'active' : ''}`} id="file-contact">
      <div className="code-block">
        <div className="code-line">
          <span className="kw">import</span><span className="op"> {'{ '}</span>
          <span className="ty">ContactConfig</span>
          <span className="op">{' }'} </span>
          <span className="kw">from </span>
          <span className="st">&apos;@babafemi/types&apos;</span><span className="op">;</span>
        </div>
        <div className="code-line blank"/>
        <div className="code-line">
          <span className="kw">export const </span><span className="lk">contact</span>
          <span className="op">: </span><span className="ty">ContactConfig</span>
          <span className="op"> = {'{'}</span>
        </div>
        <div className="code-line indent-1">
          <span className="lk">email</span><span className="op">: </span>
          <span className="st">&quot;{email}&quot;</span><span className="op">,</span>
        </div>
        <div className="code-line indent-1">
          <span className="lk">linkedin</span><span className="op">: </span>
          <span className="st">&quot;{linkedin.replace('https://', '')}&quot;</span><span className="op">,</span>
        </div>
        <div className="code-line indent-1">
          <span className="lk">github</span><span className="op">: </span>
          <span className="st">&quot;{github.replace('https://', '')}&quot;</span><span className="op">,</span>
        </div>
        <div className="code-line indent-1"><span className="lk">openTo</span><span className="op">: [</span></div>
        <div className="code-line indent-2"><span className="st">&quot;Senior engineering roles&quot;</span><span className="op">,</span></div>
        <div className="code-line indent-2"><span className="st">&quot;Contract work&quot;</span><span className="op">,</span></div>
        <div className="code-line indent-2"><span className="st">&quot;Interesting side projects&quot;</span></div>
        <div className="code-line indent-1"><span className="op">]</span></div>
        <div className="code-line"><span className="op">{'};'}</span></div>
        <div className="code-line blank"/>
        <div className="code-line"><span className="cm">/**</span></div>
        <div className="code-line"><span className="cm"> * If you&apos;re building something worth building — let&apos;s talk.</span></div>
        <div className="code-line"><span className="cm"> * sendMessage() below or email directly.</span></div>
        <div className="code-line"><span className="cm"> */</span></div>
        <div className="code-line blank"/>
        <div className="code-line">
          <span className="kw">async function </span><span className="fn">sendMessage</span>
          <span className="op">(</span><span className="lk">payload</span>
          <span className="op">: </span><span className="ty">Message</span>
          <span className="op">) {'{'}</span>
        </div>
        <div className="code-line indent-1"><span className="cm">{'// Fill the form below ↓'}</span></div>
        <div className="code-line"><span className="op">{'}'}</span></div>
      </div>

      <form className="contact-form" style={{ marginTop: 16, marginBottom: 16 }} onSubmit={onSubmit}>
        <div className="form-field">
          <label className="form-label">{'// name'}</label>
          <input className="form-input" type="text" name="cname" placeholder="string" required/>
        </div>
        <div className="form-field">
          <label className="form-label">{'// email'}</label>
          <input className="form-input" type="email" name="cemail" placeholder="string" required/>
        </div>
        <div className="form-field">
          <label className="form-label">{'// message'}</label>
          <textarea className="form-textarea" name="cmessage" placeholder="string" required/>
        </div>
        <button className="form-btn" type="submit" disabled={status === 'sending'}>
          {BUTTON_LABEL[status]}
        </button>
      </form>

      <div className="code-block">
        <div className="code-line"><span className="cm">{'// Direct channels'}</span></div>
        <div className="code-line">
          <span className="kw">const </span><span className="lk">links</span><span className="op"> = {'{'}</span>
        </div>
        <div className="code-line indent-1">
          <span className="lk">email</span><span className="op">: </span>
          <span className="st">
            &quot;<a href={`mailto:${email}`} style={{ color: 'inherit' }}>{email}</a>&quot;
          </span>
          <span className="op">,</span>
        </div>
        <div className="code-line indent-1">
          <span className="lk">linkedin</span><span className="op">: </span>
          <span className="st">
            &quot;<a href={linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>{linkedin.replace('https://', '')}</a>&quot;
          </span>
        </div>
        <div className="code-line"><span className="op">{'};'}</span></div>
      </div>
    </div>
  )
}
