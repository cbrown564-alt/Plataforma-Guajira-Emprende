# Architecture

This document describes the component structure, rendering strategy, routing, and design system decisions for Plataforma Guajira Emprende.

---

## Overview

The application is a **static informational platform** built on Next.js 15 with the App Router. It has no backend and no database in its current form. All data is hard-coded. It is deployed as a static-first site on Vercel.

The primary page is a long-form landing page composed of modular sections. Two supporting flows exist: community registration (`/join`) and an onboarding checklist (`/onboarding`). Dynamic detail pages exist for opportunities and programs but render fixed content.

---

## Routing

| Route | Component | Description |
|---|---|---|
| `/` | `app/page.tsx` | Homepage — all major sections |
| `/join` | `app/join/page.tsx` → `join-community-page.tsx` | Community registration form |
| `/onboarding` | `app/onboarding/page.tsx` → `onboarding-page.tsx` | Startup readiness checklist |
| `/opportunity/[id]` | `app/opportunity/[id]/page.tsx` → `opportunity-detail-page.tsx` | Opportunity detail (id 1–3) |
| `/program/[id]` | `app/program/[id]/page.tsx` → `program-detail-page.tsx` | Program detail (id 1–6) |
| `/business/[id]` | `app/business/[id]/page.tsx` → `business-detail-page.tsx` | Business directory detail (8 listings) with `LocalBusiness` JSON-LD |

The homepage uses anchor links (`#opportunities`, `#training`, `#directory`, `#contact`) for in-page navigation via the fixed `<Navigation>` bar.

---

## Component Map

### Homepage (`app/page.tsx`)

```
<Navigation />          — Fixed sticky header, mobile hamburger, "Únete Ahora" CTA
<section id="home">
  <HeroSection />       — Full-screen hero, background image, scroll indicator
</section>
<section id="opportunities">
  <OpportunitiesSection />  — 3 funding opportunity cards
</section>
<section id="training">
  <ProgramsSection />   — 6 program cards
</section>
<section id="directory">
  <DirectorySection />  — Filterable business directory (8 businesses, 6 categories)
</section>
<section id="contact">
  <ContactSection />    — Contact methods, office locations, contact form
</section>
<Footer />              — Links, legal, partner info
<WhatsAppButton />      — Floating action button (mobile FAB, desktop tooltip)
```

### File Location Note

All section components currently live in the **project root** alongside `app/` rather than inside `components/`. This is a known issue to be resolved in Phase 2. The intended location is `components/sections/`.

---

## Rendering Strategy

Components are split between server and client rendering following Next.js App Router conventions.

| Component | Directive | Reason |
|---|---|---|
| `hero-section.tsx` | Server | Static display only |
| `opportunities-section.tsx` | Server | Static display only |
| `programs-section.tsx` | Server | Static display only |
| `directory-section.tsx` | `"use client"` | Category filter uses `useState` |
| `contact-section.tsx` | `"use client"` | Form input state |
| `navigation.tsx` | `"use client"` | Mobile menu toggle state |
| `whatsapp-button.tsx` | Server | Static link, no state needed |
| `join-community-page.tsx` | `"use client"` | Multi-field form with `useState` |
| `onboarding-page.tsx` | `"use client"` | Checklist state |
| `footer.tsx` | Server | Static display only |

---

## Data Flow

Currently there is no external data fetching. All content is defined as typed arrays directly inside component files.

```
Component file
  └── const opportunities = [ { id, title, description, ... }, ... ]
        └── rendered directly into JSX
```

The planned migration (Phase 4 of the roadmap) moves these arrays to `/data/*.ts` files first, then optionally to a CMS or database.

No loading states, error boundaries, or data-fetching hooks are in use at this time.

---

## Design System

### Color Palette

The palette is defined in `tailwind.config.ts` as custom color scales, inspired by La Guajira's landscape.

| Scale | Inspiration | Primary use |
|---|---|---|
| `amber` | Desert sand, golden light | Primary text, headings, section backgrounds |
| `turquoise` | Caribbean sea | CTA buttons, icons, highlights, accents |
| `coral` | Sunset, warmth | Secondary CTAs, category badges, accents |

Each scale has 9 stops (50–900) and is available as Tailwind utilities: `text-turquoise-600`, `bg-amber-50`, `border-coral-200`, etc.

Shadcn/ui semantic tokens (`primary`, `secondary`, `destructive`, etc.) are also available via CSS variables in `globals.css` but are used minimally — the platform primarily uses the custom Wayuu palette directly.

### Typography

No custom font is loaded. The stack falls back to the system font. A web font (e.g. Inter or a regional typeface) is planned for Phase 2.

### Spacing & Layout

- Max content width: `1400px` (Tailwind `2xl` container)
- Container padding: `2rem`
- Standard section vertical padding: `py-16 lg:py-24`
- Card grid: `md:grid-cols-2 lg:grid-cols-3`

### Mobile Patterns

- Cards on mobile use **horizontal scroll** (`overflow-x-auto snap-x`) rather than stacking vertically, preserving the full card design at a fixed `w-80` width.
- Navigation collapses to a **hamburger menu** on `< md` breakpoint.
- The WhatsApp button renders as a **floating action button (FAB)** on mobile and a tooltip-anchored button on desktop.

---

## Key Dependencies

| Package | Why it's here |
|---|---|
| `next` | Framework — SSR, routing, image optimization |
| `react`, `react-dom` | UI library |
| `tailwindcss` | Utility CSS |
| `shadcn/ui` (via `components/ui/`) | Accessible component primitives |
| `@radix-ui/*` | Underlying primitives for shadcn/ui |
| `lucide-react` | Icons |
| `react-hook-form` | Form state management (not yet wired to a backend) |
| `zod` | Schema validation (not yet applied to forms) |
| `recharts` | Data charts — installed but not actively used |
| `embla-carousel-react` | Carousel — installed, not actively used |
| `sonner` | Toast notifications — installed, not actively used |

`recharts`, `embla-carousel-react`, and several Radix UI packages that have no corresponding shadcn component in use are candidates for removal to reduce bundle size (Phase 5).

---

## Known Structural Issues

1. **Section components in project root** — should be `components/sections/`
2. **No `/data` layer** — all content is embedded in component files
3. **`next.config.mjs` suppresses errors** — `ignoreBuildErrors` and `ignoreDuringBuilds` are both `true`
4. **`html lang="en"`** — should be `"es"` (`app/layout.tsx:16`)
5. **Generic page metadata** — title is `"v0 App"`, description is `"Created with v0"` (`app/layout.tsx:4-8`)
6. **Image optimization disabled** — `unoptimized: true` in `next.config.mjs`
