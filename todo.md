# Portfolio Overhaul — babafemi.codes
> Senior Software Engineer (Mobile & Full Stack) — Babafemi Adojutelegan

---

## Phase 1 — Foundation & Branding

- [x] Review resume and extract content (bio, experience, skills, certs)
- [x] Define brand identity (colors, typography, voice, motion)
- [x] Create `branding/brand.md` — full brand guide
- [x] Create `branding/tokens.ts` — design tokens (colors, fonts, motion)
- [x] Create `branding/architecture.md` — app structure and tech decisions
- [x] Upgrade to Next.js 16 App Router
- [x] Remove MongoDB, Redux, SASS, Axios from dependencies
- [x] Install Framer Motion, Resend, Lucide React
- [x] Configure Tailwind with brand color tokens
- [x] Set up Google Fonts: Space Grotesk + Inter (via next/font)
- [x] Set up JetBrains Mono for code/mono contexts
- [x] Add `globals.css` with CSS custom properties from brand tokens
- [x] Configure `.env.local` with Sanity keys and `RESEND_API_KEY` (see `.env.example`)

---

## Phase 2 — Layout & Navigation

- [x] Build `NavBar` — fixed top, scroll-aware background blur, mobile hamburger
- [x] Build `Footer` — LinkedIn, GitHub, Hashnode links + copyright
- [x] Build `AnimatedSection` wrapper — fade-in-up on viewport entry
- [x] Build `SectionHeader` — gradient-accented section title component
- [x] Build `Badge` / chip component — for skills and tags
- [x] Build `Button` component — primary (gradient) and outline variants
- [x] Build `Card` component — for projects and experience items

---

## Phase 3 — Core Sections

- [x] **Hero** — name (gradient), typewriter titles, tagline, [View Work] + [Download Resume] CTAs, subtle radial glow background
- [x] **About** — bio paragraph, years of experience stat, AWS cert badge, open-to-work status badge
- [x] **Experience** — vertical timeline (Telus Digital, Rhaeos, Eminent Technology), date ranges, bullet points
- [x] **Skills** — grouped chips: Mobile | Web | Cloud & Backend | Security & Auth | Testing & DevOps
- [x] **Projects** — filterable grid from `PROJECTS_JSON` env var (All | Mobile | Web | Full Stack | Backend)
- [x] **Contact** — form (Name, Email, Message) with POST to `/api/contact` → Resend → email delivery

---

## Phase 4 — API Routes

- [x] `POST /api/contact` — validate form fields, send email via Resend to `babafemiadojutelegan@gmail.com`

---

## Phase 5 — Sanity CMS

- [x] Create Sanity project (`npm create sanity@latest`) — scaffold complete, create project at sanity.io/manage
- [x] Define `project` document schema (title, description, thumbnail, tags, category, repository, liveUrl, featured, order)
- [x] Embed Sanity Studio at `/studio` route in the Next.js app
- [x] Create `lib/sanity.ts` — lazy client via `getClient()`, `urlFor()` helper
- [x] Create `lib/queries.ts` — GROQ queries for projects (all, featured, by category)
- [x] Fetch projects at build time in `page.tsx` — dynamic import guards against missing env vars
- [x] Set up Netlify build hook → Sanity webhook (publish → auto-redeploy)
- [x] Add Sanity env vars to Netlify dashboard (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`)
- [x] Add initial project documents in Sanity Studio

---

## Phase 6 — Polish & Performance

- [x] Add Open Graph and Twitter card meta tags (dynamic per page)
- [x] Add `robots.txt` and `sitemap.xml`
- [x] Optimize all images (next/image with blur placeholder)
- [x] Add resume PDF to `/public/assets/resume.pdf` for download
- [ ] Audit Lighthouse score (target: 95+ across all categories)
- [ ] Verify Core Web Vitals: LCP < 2.5s, CLS < 0.1

---

## Recommended Features (Post-MVP)

- [x] **"Open to Work" badge** — green pulsing dot on hero/about with status message
- [x] **Resume download button** — PDF download directly from hero CTA
- [x] **AWS certification badge** — clickable badge linking to Credly credential
- [x] **Project category filter** — tab/pill filter bar on Projects section (All | Mobile | Web | etc.)
- [ ] **Featured project highlight** — first 1-2 projects get larger card with screenshot
- [ ] **Scroll progress indicator** — thin gradient bar at top of viewport
- [ ] **Command palette** — Cmd+K / Ctrl+K quick navigation between sections
- [ ] **Copy email to clipboard** — click email address in Contact → copies + shows confirmation toast
- [ ] **Blog section** — pull latest posts from Hashnode RSS feed (already on hashnode, linked in old footer)
- [ ] **GitHub activity graph** — embed contribution graph or recent activity widget
- [ ] **Case study pages** — `/projects/[id]` deep-dive pages for featured projects
- [ ] **Analytics** — Netlify Analytics or Plausible (privacy-friendly)
- [ ] **Toast notifications** — success/error feedback on contact form submission
- [ ] **Back-to-top button** — appears after scrolling past hero
- [ ] **Keyboard navigation** — full `tab` + `enter` accessibility across all interactive elements

---

## Notes

- Projects data lives in `PROJECTS_JSON` environment variable (set in Vercel dashboard for production)
- Email delivery via Resend API (`RESEND_API_KEY` env var)
- Dark-mode only — no light mode toggle (brand decision: premium dark aesthetic)
- All sections are single-page (SPA scroll) — no separate routes except `/api/*`
- Keep `babafemi.codes` as the handle/brand throughout
