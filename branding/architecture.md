# Portfolio Architecture — babafemi.codes

## Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Next.js 14 (App Router) | Modern, SSG/SSR, file-based routing |
| Language | TypeScript | Type safety across the board |
| Styling | Tailwind CSS v3 + custom CSS vars | Utility-first + brand token support |
| Animation | Framer Motion | Production-quality motion |
| Icons | Lucide React + custom SVGs | Lightweight, consistent |
| Email | Resend (via API route) | Reliable transactional email |
| State | React built-ins (useState, useContext) | No Redux needed for a portfolio |
| CMS | Sanity.io | Visual studio UI, image CDN, webhook-triggered redeploys |
| Fonts | Google Fonts (Space Grotesk + Inter) + JetBrains Mono | Via next/font |
| Hosting | Netlify | Current deployment platform, supports Next.js via `@netlify/plugin-nextjs` |

---

## Removed from Old Stack
- MongoDB (replaced by Sanity.io)
- Redux / Redux Toolkit / Redux Persist (overkill)
- SASS (replaced by Tailwind + CSS custom properties)
- Axios (native fetch is sufficient)

---

## Project Data Format (Sanity Schema)

Projects are managed in Sanity Studio at `/studio`. Schema fields:

```ts
// sanity/schemas/project.ts
{
  name: 'project',
  type: 'document',
  fields: [
    { name: 'title',       type: 'string' },
    { name: 'description', type: 'text' },
    { name: 'thumbnail',   type: 'image', options: { hotspot: true } },
    { name: 'tags',        type: 'array', of: [{ type: 'string' }] },
    { name: 'category',    type: 'string', options: {
        list: ['mobile', 'web', 'backend', 'fullstack'] } },
    { name: 'repository',  type: 'url' },
    { name: 'liveUrl',     type: 'url' },
    { name: 'featured',    type: 'boolean' },
    { name: 'order',       type: 'number' },
  ],
}
```

Categories: `"mobile"` | `"web"` | `"backend"` | `"fullstack"`

### Content Update Flow
1. Edit/add/remove project in Sanity Studio (`/studio`)
2. Publish in Studio → triggers Netlify build webhook
3. Netlify rebuilds and redeploys — new project live in ~1 min

---

## Page Structure (App Router)

```
src/
├── app/
│   ├── layout.tsx          # Root layout: fonts, metadata, theme
│   ├── page.tsx            # Home — composes all sections
│   ├── globals.css         # CSS custom properties from brand tokens
│   └── api/
│       ├── contact/
│       │   └── route.ts    # POST — sends email via Resend
│       └── projects/
│           └── route.ts    # GET — returns parsed PROJECTS_JSON
│
├── components/
│   ├── layout/
│   │   ├── NavBar.tsx      # Fixed top nav, scroll-aware, mobile menu
│   │   └── Footer.tsx      # Social links, copyright
│   │
│   ├── sections/
│   │   ├── Hero.tsx        # Name, title, tagline, CTA buttons
│   │   ├── About.tsx       # Bio, photo, open-to-work status
│   │   ├── Experience.tsx  # Timeline: Telus, Rhaeos, Eminent
│   │   ├── Skills.tsx      # Categorized chips: Mobile, Web, Cloud, DevOps
│   │   ├── Projects.tsx    # Filterable grid from JSON
│   │   └── Contact.tsx     # Form + email API call
│   │
│   └── ui/
│       ├── Badge.tsx       # Skill chip / tag badge
│       ├── Button.tsx      # Primary / outline variants
│       ├── Card.tsx        # Project / experience card
│       ├── SectionHeader.tsx  # Gradient-accented section title
│       └── AnimatedSection.tsx  # Framer Motion fade-in wrapper
│
├── lib/
│   ├── projects.ts         # Parse PROJECTS_JSON env var
│   └── types.ts            # Shared TypeScript interfaces
│
└── public/
    └── assets/
        ├── avatar.png
        ├── resume.pdf      # Downloadable resume
        └── projects/       # Project screenshots (optional)
```

---

## Sections & Content Map

### 1. Hero
- Large name heading with gradient on "babafemi"
- Typewriter: cycles through titles (Senior SWE, Mobile Engineer, Full Stack Dev)
- Tagline: "Engineering Experiences. Shipping Solutions."
- Two CTAs: [View My Work] [Download Resume]
- Subtle background: grid/dot pattern or radial gradient glow

### 2. About
- Short bio paragraph (3-4 sentences, first person, results-focused)
- AWS Certified Solutions Architect badge
- "Open to opportunities" status badge (toggle-able in content)
- Years of experience callout (7+ years)

### 3. Experience
- Vertical timeline, left-border accent line
- Company name + role + date range
- Bullet points from resume (verbatim, tightened)
- Company logo placeholder or initial badge

### 4. Skills
- Tabbed or grouped: Mobile | Web | Cloud & Backend | Testing & DevOps
- Each skill as a chip badge with icon where available
- Not a bar chart — chips feel more senior and accurate

### 5. Projects
- Filter bar: All | Mobile | Web | Full Stack | Backend
- 2-3 column responsive grid
- Card: image/screenshot, title, description, tags, [GitHub] [Live] links
- "Featured" projects get larger card treatment

### 6. Contact
- Headline: "Let's work together."
- Form: Name, Email, Message, [Send Message]
- On submit: POST to /api/contact → Resend → your@email.com
- Also shows: email link, LinkedIn link

---

## Environment Variables

Set in **Netlify dashboard → Site settings → Environment variables**.

```env
# Email (Resend)
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=your@email.com

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk...         # read-only token for build-time fetching
```

### Netlify Build Hook (for Sanity webhook)
1. Netlify dashboard → Site settings → Build hooks → Create hook → copy URL
2. Sanity dashboard → API → Webhooks → paste URL → trigger on "Publish"

---

## Performance Targets
- Lighthouse score: 95+ (Performance, Accessibility, Best Practices, SEO)
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID < 100ms
- No client-side fetching for projects on page load (static generation)
