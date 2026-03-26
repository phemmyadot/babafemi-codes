'use client'

import { useState, useRef, useEffect } from 'react'
import type { Profile, ExperienceItem, SkillGroup } from '@/lib/queries'
import type { Project } from '@/core/models/project'
import type { BlogPost } from '@/lib/hashnode'

// ── File config ──────────────────────────────────────────────────
const FILE_CONFIG = {
  readme:     { name: 'README.md',       icon: '📄', lang: 'Markdown' },
  about:      { name: 'about.md',        icon: '👤', lang: 'Markdown' },
  experience: { name: 'experience.json', icon: '📋', lang: 'JSON' },
  skills:     { name: 'skills.ts',       icon: '⚡', lang: 'TypeScript' },
  projects:   { name: 'projects.tsx',    icon: '🚀', lang: 'TypeScript React' },
  blog:       { name: 'blog.md',         icon: '✍️', lang: 'Markdown' },
  contact:    { name: 'contact.ts',      icon: '📬', lang: 'TypeScript' },
} as const

type FileId = keyof typeof FILE_CONFIG

// ── Helpers ──────────────────────────────────────────────────────
function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, 1).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

function formatPeriod(item: ExperienceItem): string {
  const start = formatDate(item.startDate)
  const end = item.current
    ? 'Present'
    : item.endDate
    ? formatDate(item.endDate)
    : 'Present'
  return `${start} — ${end}`
}

function formatBlogDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// ── Props ────────────────────────────────────────────────────────
interface Props {
  profile: Profile | null
  experience: ExperienceItem[]
  skillGroups: SkillGroup[]
  projects: Project[]
  blogPosts: BlogPost[]
}

// ── Component ────────────────────────────────────────────────────
export function IdePortfolio({
  profile,
  experience,
  skillGroups,
  projects,
  blogPosts,
}: Props) {
  const [openTabs, setOpenTabs]               = useState<FileId[]>(['readme'])
  const [activeFile, setActiveFile]           = useState<FileId>('readme')
  const [drawerOpen, setDrawerOpen]           = useState(false)
  const [portfolioExpanded, setPortfolioExpanded] = useState(true)
  const [assetsExpanded, setAssetsExpanded]   = useState(true)
  const [lineCount, setLineCount]             = useState(30)
  const [contactStatus, setContactStatus]     = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const codePanelRef = useRef<HTMLDivElement>(null)

  // ── Tab helpers ─────────────────────────────────────────────────
  const openFile = (id: FileId) => {
    setOpenTabs(prev => (prev.includes(id) ? prev : [...prev, id]))
    setActiveFile(id)
    setDrawerOpen(false)
  }

  const closeTab = (e: React.MouseEvent, id: FileId) => {
    e.stopPropagation()
    const next = openTabs.filter(t => t !== id)
    const safe: FileId[] = next.length ? next : ['readme']
    setOpenTabs(safe)
    if (activeFile === id) setActiveFile(safe[safe.length - 1])
  }

  // ── Line numbers ─────────────────────────────────────────────────
  useEffect(() => {
    const section = document.getElementById('file-' + activeFile)
    if (section) {
      setLineCount(section.querySelectorAll('.code-line').length || 30)
    }
    codePanelRef.current?.scrollTo(0, 0)
  }, [activeFile])

  // ── Ctrl+P cycle ─────────────────────────────────────────────────
  useEffect(() => {
    const ids = Object.keys(FILE_CONFIG) as FileId[]
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault()
        openFile(ids[(ids.indexOf(activeFile) + 1) % ids.length])
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [activeFile])

  // ── Contact form ─────────────────────────────────────────────────
  const handleContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const name    = (form.elements.namedItem('cname')    as HTMLInputElement).value.trim()
    const email   = (form.elements.namedItem('cemail')   as HTMLInputElement).value.trim()
    const message = (form.elements.namedItem('cmessage') as HTMLTextAreaElement).value.trim()
    if (!name || !email || !message) return
    setContactStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, email, message }),
      })
      if (res.ok) { setContactStatus('sent'); form.reset() }
      else          setContactStatus('error')
    } catch {
      setContactStatus('error')
    }
  }

  // ── Convenience shorthands ────────────────────────────────────────
  const f        = FILE_CONFIG[activeFile]
  const fullName = `${profile?.firstName ?? 'Babafemi'} ${profile?.lastName ?? 'Adojutelegan'}`
  const title    = profile?.titles?.[0] ?? 'Senior Software Engineer'
  const email    = profile?.email    ?? 'babafemiadojutelegan@gmail.com'
  const github   = profile?.github   ?? 'https://github.com/phemmyadot'
  const linkedin = profile?.linkedin ?? 'https://www.linkedin.com/in/badojutelegan/'
  const resumeUrl = profile?.resumeUrl ?? ''

  const FILE_IDS = Object.keys(FILE_CONFIG) as FileId[]

  return (
    <div className="ide">

      {/* ── TITLE BAR ─────────────────────────────────────────────── */}
      <div className="titlebar">
        <button
          className="titlebar-hamburger"
          onClick={() => setDrawerOpen(o => !o)}
          aria-label="Toggle file explorer"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="2" y1="5" x2="16" y2="5"/>
            <line x1="2" y1="9" x2="16" y2="9"/>
            <line x1="2" y1="13" x2="16" y2="13"/>
          </svg>
        </button>
        <div className="titlebar-dots">
          <div className="dot red"/>
          <div className="dot yellow"/>
          <div className="dot green"/>
        </div>
        <div className="titlebar-menu">
          {['File','Edit','View','Terminal','Help'].map(m => (
            <div key={m} className="menu-item">{m}</div>
          ))}
        </div>
        <div className="titlebar-title">babafemi.codes — Visual Studio Code</div>
      </div>

      {/* ── ACTIVITY BAR ──────────────────────────────────────────── */}
      <div className="activitybar">
        <div className="activity-icon active tooltip" data-tip="Explorer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 7a2 2 0 012-2h5.586a1 1 0 01.707.293l1.414 1.414A1 1 0 0013.414 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/>
          </svg>
        </div>
        <div className="activity-icon tooltip" data-tip="Search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"/>
          </svg>
        </div>
        <div className="activity-icon tooltip" data-tip="Source Control">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 6a2 2 0 100-4 2 2 0 000 4zM8 18a2 2 0 100 4 2 2 0 000-4zM8 6v12M16 6a2 2 0 100-4 2 2 0 000 4z"/>
            <circle cx="16" cy="12" r="2"/>
          </svg>
        </div>
        <div className="activity-spacer"/>
        <div className="activity-icon tooltip" data-tip="Settings">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
          </svg>
        </div>
      </div>

      {/* ── SIDEBAR ───────────────────────────────────────────────── */}
      <div className="sidebar">
        <div className="sidebar-header">Explorer</div>

        {/* BABAFEMI.CODES section */}
        <div className="sidebar-section">
          <div className="sidebar-section-header" onClick={() => setPortfolioExpanded(e => !e)}>
            <svg className={`chevron ${portfolioExpanded ? 'open' : ''}`} viewBox="0 0 10 10" fill="currentColor">
              <path d="M3 2l4 3-4 3z"/>
            </svg>
            BABAFEMI.CODES
          </div>
          {portfolioExpanded && FILE_IDS.map(id => (
            <div
              key={id}
              className={`sidebar-item ${activeFile === id ? 'active' : ''}`}
              onClick={() => openFile(id)}
            >
              <span className="file-icon">{FILE_CONFIG[id].icon}</span>
              <span className="file-name">{FILE_CONFIG[id].name}</span>
            </div>
          ))}
        </div>

        {/* ASSETS section */}
        <div className="sidebar-section">
          <div className="sidebar-section-header" onClick={() => setAssetsExpanded(e => !e)}>
            <svg className={`chevron ${assetsExpanded ? 'open' : ''}`} viewBox="0 0 10 10" fill="currentColor">
              <path d="M3 2l4 3-4 3z"/>
            </svg>
            ASSETS
          </div>
          {assetsExpanded && (
            <>
              {resumeUrl && (
                <div className="sidebar-item" onClick={() => window.open(resumeUrl, '_blank')}>
                  <span className="file-icon">📎</span>
                  <span className="file-name">resume.pdf</span>
                </div>
              )}
              <div className="sidebar-item">
                <span className="file-icon">🖼</span>
                <span className="file-name">avatar.png</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── EDITOR AREA ───────────────────────────────────────────── */}
      <div className="editor-area">

        {/* TABS */}
        <div className="tabs">
          {openTabs.map(id => (
            <div
              key={id}
              className={`tab ${id === activeFile ? 'active' : ''}`}
              onClick={() => openFile(id)}
            >
              <span className="tab-icon">{FILE_CONFIG[id].icon}</span>
              {FILE_CONFIG[id].name}
              <span className="tab-close" onClick={e => closeTab(e, id)}>×</span>
            </div>
          ))}
        </div>

        {/* BREADCRUMB */}
        <div className="breadcrumb">
          <span className="breadcrumb-item">babafemi.codes</span>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-item current">{f.name}</span>
        </div>

        {/* EDITOR CONTENT */}
        <div className="editor-content">

          {/* LINE NUMBERS */}
          <div className="line-numbers">
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i} style={{ height: '22px', lineHeight: '22px' }}>{i + 1}</div>
            ))}
          </div>

          <div className="code-panel" ref={codePanelRef}>

            {/* ══ README.md ══════════════════════════════════════════ */}
            <div className={`file-section ${activeFile === 'readme' ? 'active' : ''}`} id="file-readme">
              <div className="code-block">
                <div className="code-line"><span className="cm"># {fullName}</span></div>
                <div className="code-line blank"/>
                <div className="code-line">
                  <span className="cm">## {title}</span>
                  {profile?.openToWork && <span className="inline-badge green">Open to Work</span>}
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

            {/* ══ about.md ═══════════════════════════════════════════ */}
            <div className={`file-section ${activeFile === 'about' ? 'active' : ''}`} id="file-about">
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
                <div className="code-line"><span className="kw">const </span><span className="lk">availability</span><span className="op"> = </span><span className="ty">{'{'}</span></div>
                <div className="code-line indent-1"><span className="lk">status</span><span className="op">: </span><span className="st">&quot;Open to opportunities&quot;</span><span className="op">,</span></div>
                <div className="code-line indent-1"><span className="lk">roles</span><span className="op">: [</span></div>
                <div className="code-line indent-2"><span className="st">&quot;Senior Engineer&quot;</span><span className="op">,</span></div>
                <div className="code-line indent-2"><span className="st">&quot;Contract Work&quot;</span><span className="op">,</span></div>
                <div className="code-line indent-2"><span className="st">&quot;Interesting Side Projects&quot;</span></div>
                <div className="code-line indent-1"><span className="op">],</span></div>
                <div className="code-line indent-1"><span className="lk">preferredStack</span><span className="op">: </span><span className="st">&quot;React Native · TypeScript · AWS&quot;</span></div>
                <div className="code-line"><span className="ty">{'}'}</span></div>
                <div className="code-line blank"/>
                <div className="code-line"><span className="cm">{'// If you\'re building something worth building — let\'s talk.'}</span></div>
              </div>
            </div>

            {/* ══ experience.json ════════════════════════════════════ */}
            <div className={`file-section ${activeFile === 'experience' ? 'active' : ''}`} id="file-experience">
              <div className="code-block">
                <div className="code-line"><span className="op">{'{'}</span></div>
                <div className="code-line indent-1"><span className="lk">&quot;experience&quot;</span><span className="op">: [</span></div>
                {experience.map((item, idx) => (
                  <div key={idx}>
                    <div className="code-line indent-2"><span className="op">{'{'}</span></div>
                    <div className="code-line indent-3">
                      <span className="lk">&quot;company&quot;</span><span className="op">: </span>
                      <span className="st">&quot;{item.company}&quot;</span><span className="op">,</span>
                    </div>
                    <div className="code-line indent-3">
                      <span className="lk">&quot;role&quot;</span><span className="op">: </span>
                      <span className="st">&quot;{item.role}&quot;</span><span className="op">,</span>
                    </div>
                    <div className="code-line indent-3">
                      <span className="lk">&quot;period&quot;</span><span className="op">: </span>
                      <span className="st">&quot;{formatPeriod(item)}&quot;</span><span className="op">,</span>
                      {item.current && <span className="inline-badge">Current</span>}
                    </div>
                    <div className="code-line indent-3"><span className="lk">&quot;highlights&quot;</span><span className="op">: [</span></div>
                    {(item.bullets ?? []).map((bullet, bi) => (
                      <div key={bi} className="code-line indent-4">
                        <span className="st">&quot;{bullet}&quot;</span>
                        {bi < item.bullets.length - 1 && <span className="op">,</span>}
                      </div>
                    ))}
                    <div className="code-line indent-3"><span className="op">]</span></div>
                    <div className="code-line indent-2">
                      <span className="op">{'}'}{idx < experience.length - 1 ? ',' : ''}</span>
                    </div>
                    {idx < experience.length - 1 && <div className="code-line blank"/>}
                  </div>
                ))}
                <div className="code-line indent-1"><span className="op">]</span></div>
                <div className="code-line"><span className="op">{'}'}</span></div>
              </div>
            </div>

            {/* ══ skills.ts ══════════════════════════════════════════ */}
            <div className={`file-section ${activeFile === 'skills' ? 'active' : ''}`} id="file-skills">
              <div className="code-block">
                <div className="code-line">
                  <span className="kw">import type</span><span className="op"> {'{ '}</span>
                  <span className="ty">TechStack</span>
                  <span className="op">{' }'} </span>
                  <span className="kw">from </span>
                  <span className="st">&apos;@babafemi/types&apos;</span><span className="op">;</span>
                </div>
                <div className="code-line blank"/>
                <div className="code-line"><span className="cm">/**</span></div>
                <div className="code-line"><span className="cm"> * Babafemi&apos;s complete technology arsenal.</span></div>
                <div className="code-line"><span className="cm"> */</span></div>
                <div className="code-line blank"/>
                <div className="code-line">
                  <span className="kw">export const </span>
                  <span className="lk">skills</span>
                  <span className="op">: </span>
                  <span className="ty">TechStack</span>
                  <span className="op"> = {'{'}</span>
                </div>
                {skillGroups.map((group, gi) => (
                  <div key={gi}>
                    <div className="code-line blank"/>
                    <div className="code-line indent-1">
                      <span className="lk">{group.label.toLowerCase().replace(/\s+/g, '_')}</span>
                      <span className="op">: {'{'}</span>
                    </div>
                    <div className="code-line indent-2">
                      <span className="lk">skills</span><span className="op">: [</span>
                    </div>
                    <div className="code-line indent-2" style={{ paddingTop: 4, paddingBottom: 4 }}>
                      {group.skills.map((skill, si) => (
                        <span key={si} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                    <div className="code-line indent-2"><span className="op">]</span></div>
                    <div className="code-line indent-1">
                      <span className="op">{'}'}{gi < skillGroups.length - 1 ? ',' : ''}</span>
                    </div>
                  </div>
                ))}
                <div className="code-line blank"/>
                <div className="code-line"><span className="op">{'};'}</span></div>
                <div className="code-line blank"/>
                <div className="code-line">
                  <span className="kw">export default </span><span className="lk">skills</span><span className="op">;</span>
                </div>
              </div>
            </div>

            {/* ══ projects.tsx ═══════════════════════════════════════ */}
            <div className={`file-section ${activeFile === 'projects' ? 'active' : ''}`} id="file-projects">
              <div className="code-block">
                <div className="code-line">
                  <span className="kw">import</span><span className="op"> {'{ '}</span>
                  <span className="ty">FC</span>
                  <span className="op">{' }'} </span>
                  <span className="kw">from </span>
                  <span className="st">&apos;react&apos;</span><span className="op">;</span>
                </div>
                <div className="code-line blank"/>
                <div className="code-line"><span className="cm">{'// Things I\'ve built and shipped'}</span></div>
                <div className="code-line blank"/>
                <div className="code-line">
                  <span className="kw">const </span><span className="fn">Projects</span>
                  <span className="op">: </span><span className="ty">FC</span>
                  <span className="op"> = () =&gt; (</span>
                </div>
                <div className="code-line indent-1">
                  <span className="op">&lt;</span><span className="ty">section</span><span className="op">&gt;</span>
                </div>
              </div>
              {projects.map((project, pi) => (
                <div key={pi} className="project-card">
                  <div className="project-title">{project.title}</div>
                  <div className="project-desc">{project.description}</div>
                  <div className="project-tags">
                    {project.tags?.map((tag, ti) => (
                      <span key={ti} className="project-tag">{tag}</span>
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
              ))}
              <div className="code-block">
                <div className="code-line indent-1">
                  <span className="op">&lt;/</span><span className="ty">section</span><span className="op">&gt;</span>
                </div>
                <div className="code-line"><span className="op">);</span></div>
                <div className="code-line blank"/>
                <div className="code-line">
                  <span className="kw">export default </span><span className="fn">Projects</span><span className="op">;</span>
                </div>
              </div>
            </div>

            {/* ══ blog.md ════════════════════════════════════════════ */}
            <div className={`file-section ${activeFile === 'blog' ? 'active' : ''}`} id="file-blog">
              <div className="code-block">
                <div className="code-line"><span className="cm"># Writing &amp; Thoughts</span></div>
                <div className="code-line blank"/>
                <div className="code-line"><span className="cm">Articles on mobile engineering, full-stack development,</span></div>
                <div className="code-line"><span className="cm">and lessons from the field.</span></div>
                <div className="code-line blank"/>
                <div className="code-line"><span className="cm">---</span></div>
                {blogPosts.length > 0 ? blogPosts.map((post, pi) => (
                  <div key={pi}>
                    <div className="code-line blank"/>
                    <div className="code-line"><span className="cm">## {post.title}</span></div>
                    <div className="code-line blank"/>
                    <div className="code-line">
                      <span className="pl">📅 {formatBlogDate(post.publishedAt)} · {post.readTimeInMinutes} min read</span>
                    </div>
                    <div className="code-line blank"/>
                    <div className="code-line"><span className="cm">{post.brief}</span></div>
                    <div className="code-line blank"/>
                    <div className="code-line">
                      <a href={post.url} target="_blank" rel="noopener noreferrer">
                        <span className="lk">[Read on Hashnode →]</span>
                      </a>
                    </div>
                    <div className="code-line blank"/>
                    <div className="code-line"><span className="cm">---</span></div>
                  </div>
                )) : (
                  <>
                    <div className="code-line blank"/>
                    <div className="code-line"><span className="cm">No posts yet. Check back soon.</span></div>
                  </>
                )}
                {profile?.hashnode && (
                  <>
                    <div className="code-line blank"/>
                    <div className="code-line">
                      <a href={profile.hashnode} target="_blank" rel="noopener noreferrer">
                        <span className="lk">[View all posts →]</span>
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* ══ contact.ts ═════════════════════════════════════════ */}
            <div className={`file-section ${activeFile === 'contact' ? 'active' : ''}`} id="file-contact">
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

              <form className="contact-form" style={{ marginTop: 16, marginBottom: 16 }} onSubmit={handleContact}>
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
                <button className="form-btn" type="submit" disabled={contactStatus === 'sending'}>
                  {contactStatus === 'sending' ? 'sending...'
                    : contactStatus === 'sent'    ? '✓ message sent'
                    : contactStatus === 'error'   ? '✗ error — try again'
                    : 'sendMessage(payload) →'}
                </button>
              </form>

              <div className="code-block">
                <div className="code-line"><span className="cm">{'// Direct channels'}</span></div>
                <div className="code-line"><span className="kw">const </span><span className="lk">links</span><span className="op"> = {'{'}</span></div>
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

          </div>{/* end code-panel */}

          {/* MINIMAP */}
          <div className="minimap">
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={i}
                className={`minimap-line ${
                  i % 6 === 0 ? 'accent' : i % 4 === 0 ? 'medium' : i % 9 === 0 ? 'short' : ''
                }`}
              />
            ))}
          </div>

        </div>{/* end editor-content */}
      </div>{/* end editor-area */}

      {/* ── STATUS BAR ────────────────────────────────────────────── */}
      <div className="statusbar">
        <div className="statusbar-left">
          <div className="status-item">
            <span className="status-icon">⎇</span>
            <span>main</span>
          </div>
          <div className="status-item">
            <span className="status-icon">✓</span>
            <span>0 errors, 0 warnings</span>
          </div>
        </div>
        <div className="statusbar-right">
          <div className="status-item">{f.name}</div>
          <div className="status-item">Ln 1, Col 1</div>
          <div className="status-item">UTF-8</div>
          <div className="status-item">{f.lang}</div>
          <div className="status-item">Prettier</div>
        </div>
      </div>

      {/* ── MOBILE DRAWER BACKDROP ────────────────────────────────── */}
      <div
        className={`drawer-backdrop ${drawerOpen ? 'open' : ''}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* ── MOBILE SIDEBAR DRAWER ─────────────────────────────────── */}
      <div className={`sidebar-drawer ${drawerOpen ? 'open' : ''}`}>
        <div className="sidebar-header" style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <span>Explorer</span>
          <span
            onClick={() => setDrawerOpen(false)}
            style={{ cursor:'pointer', padding:'4px 8px', fontSize:16, color:'var(--text-muted)' }}
          >✕</span>
        </div>
        <div className="sidebar-section">
          <div className="sidebar-section-header">
            <svg className="chevron open" viewBox="0 0 10 10" fill="currentColor"><path d="M3 2l4 3-4 3z"/></svg>
            BABAFEMI.CODES
          </div>
          {FILE_IDS.map(id => (
            <div
              key={id}
              className={`sidebar-item ${activeFile === id ? 'active' : ''}`}
              onClick={() => openFile(id)}
            >
              <span className="file-icon">{FILE_CONFIG[id].icon}</span>
              <span className="file-name">{FILE_CONFIG[id].name}</span>
            </div>
          ))}
        </div>
        <div className="sidebar-section">
          <div className="sidebar-section-header">
            <svg className="chevron open" viewBox="0 0 10 10" fill="currentColor"><path d="M3 2l4 3-4 3z"/></svg>
            ASSETS
          </div>
          {resumeUrl && (
            <div className="sidebar-item" onClick={() => window.open(resumeUrl, '_blank')}>
              <span className="file-icon">📎</span>
              <span className="file-name">resume.pdf</span>
            </div>
          )}
        </div>
      </div>

      {/* ── MOBILE BOTTOM NAV ─────────────────────────────────────── */}
      <nav className="mobile-nav">
        {(['readme','about','experience','skills','projects','contact'] as FileId[]).map(id => (
          <button
            key={id}
            className={`mobile-nav-item ${activeFile === id ? 'active' : ''}`}
            onClick={() => openFile(id)}
          >
            <span className="mobile-nav-icon">{FILE_CONFIG[id].icon}</span>
            <span className="mobile-nav-label">{FILE_CONFIG[id].name.split('.')[0].slice(0,4)}</span>
          </button>
        ))}
      </nav>

    </div>
  )
}
