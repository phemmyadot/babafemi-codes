# Babafemi Adojutelegan — Brand Identity

## Brand Overview

**Name:** Babafemi Adojutelegan
**Handle:** babafemi.codes
**Title:** Senior Software Engineer — Mobile & Full Stack
**Tagline:** *Engineering Experiences. Shipping Solutions.*

**Brand Personality:** Confident. Precise. Senior. Results-driven.
The portfolio should feel like a product — not a hobby project. Think Vercel, Linear, Stripe Docs aesthetic: dark, typographically tight, purposeful whitespace, subtle motion.

---

## Color System

### Base Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | `#050A14` | Page background |
| `--color-surface` | `#0D1626` | Card / section backgrounds |
| `--color-surface-elevated` | `#111D35` | Elevated cards, modals |
| `--color-border` | `#1E2D4A` | Subtle borders, dividers |
| `--color-border-bright` | `#2D4470` | Hovered borders |

### Text

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-text-primary` | `#F1F5F9` | Main headings and body text |
| `--color-text-secondary` | `#94A3B8` | Subheadings, meta text |
| `--color-text-muted` | `#4B6080` | Placeholder, disabled text |

### Accent — Electric Indigo + Cyan

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-accent-primary` | `#6366F1` | Buttons, links, highlights |
| `--color-accent-secondary` | `#22D3EE` | Hover states, secondary accents |
| `--color-accent-gradient` | `linear-gradient(135deg, #6366F1 0%, #22D3EE 100%)` | Hero text, badges, glows |

### Semantic

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-success` | `#10B981` | Open to work badge, confirmations |
| `--color-warning` | `#F59E0B` | Certifications, highlights |
| `--color-danger` | `#EF4444` | Errors |

---

## Typography

### Font Stack

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Display | **Space Grotesk** | 700 | Hero name, section titles |
| Heading | **Space Grotesk** | 600 | Sub-headings, card titles |
| Body | **Inter** | 400 / 500 | Paragraphs, descriptions |
| Mono | **JetBrains Mono** | 400 | Code snippets, skill tags |

### Type Scale (rem)

| Scale | Size | Usage |
|-------|------|-------|
| `--text-xs` | 0.75rem | Labels, badges |
| `--text-sm` | 0.875rem | Meta, secondary info |
| `--text-base` | 1rem | Body copy |
| `--text-lg` | 1.125rem | Lead text |
| `--text-xl` | 1.25rem | Card headings |
| `--text-2xl` | 1.5rem | Section subheadings |
| `--text-3xl` | 1.875rem | Section headings |
| `--text-4xl` | 2.25rem | Hero subtitle |
| `--text-5xl` | 3rem | Hero name (mobile) |
| `--text-7xl` | 4.5rem | Hero name (desktop) |

---

## Spacing & Layout

- **Max content width:** 1200px (not full 1440px — keeps lines readable)
- **Section padding:** `py-24` (top & bottom)
- **Grid gutter:** `gap-6` (cards), `gap-4` (skill chips)
- **Border radius:** 12px cards, 8px chips, 6px buttons, 999px badges

---

## Motion & Animation

**Library:** Framer Motion
**Philosophy:** Purposeful, not decorative. Animate to guide attention.

| Motion | Value | Usage |
|--------|-------|-------|
| Fade in up | `y: 20 → 0, opacity: 0 → 1` | Section entry |
| Stagger children | `delayChildren: 0.1, staggerChildren: 0.08` | Skill chips, project cards |
| Hover scale | `scale: 1.02` | Cards |
| Hover glow | `box-shadow: 0 0 24px rgba(99,102,241,0.3)` | Accent cards |
| Duration | `0.4s` default, `0.2s` micro-interactions | — |
| Easing | `easeOut` | Entrances |

---

## Logo & Identity

**Wordmark:** `babafemi.codes`
**Font:** Space Grotesk 700
**Color:** White text, `.codes` in accent gradient
**Icon:** Optional — initials "BA" in a rounded square with gradient fill

---

## Voice & Tone

- **Confident, not arrogant.** Speak in results, not buzzwords.
- **Precise.** Short sentences. No filler.
- **Technical credibility.** Name technologies specifically.
- **Human.** Not a robot. Show what you built and why it mattered.

### Bio Example
> I'm a Senior Software Engineer specializing in mobile and full stack development.
> I build production-grade applications — from AI-powered chat interfaces to BLE-integrated medical devices.
> Currently shipping at Telus Digital.

---

## What to Avoid

- Light/white backgrounds (this is a dark-mode-first brand)
- Generic "developer green" (`#00FF00` vibes)
- Cluttered layouts — whitespace is a feature
- Passive language ("I helped with..." → "I built...")
- Showing every skill ever touched — curate to what's senior-level
