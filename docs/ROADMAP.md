# Production Readiness Roadmap

This document tracks the phased plan to bring Plataforma Guajira Emprende from MVP prototype to a production-ready application.

Each phase builds on the previous. Phases 1–3 are prerequisites for real user traffic. Phases 4–6 improve scalability, discoverability, and operational health.

---

## Phase 1 — Documentation

**Status: Complete**  
**Goal:** Establish a shared understanding of what the project is, how it works, and how to contribute.

| Task | File | Status |
|---|---|---|
| Replace v0.dev boilerplate README | `README.md` | ✅ Done |
| Rename package from `my-v0-project` | `package.json` | ✅ Done |
| Write contribution guide | `CONTRIBUTING.md` | ✅ Done |
| Document component architecture | `docs/ARCHITECTURE.md` | ✅ Done |
| Document content update process | `docs/CONTENT.md` | ✅ Done |
| Write this roadmap | `docs/ROADMAP.md` | ✅ Done |

---

## Phase 2 — Critical Foundation Fixes

**Status: Not started**  
**Goal:** Fix bugs that affect every visitor on every page load. None of these require a backend.

| Task | File | Priority |
|---|---|---|
| Set `html lang="es"` | `app/layout.tsx:16` | High |
| Replace placeholder metadata (title, description, generator) | `app/layout.tsx:4-8` | High |
| Add Open Graph tags (`og:title`, `og:description`, `og:image`) | `app/layout.tsx` | High |
| Add favicon | `public/favicon.ico` + `app/layout.tsx` | High |
| Remove `ignoreBuildErrors: true` from next.config.mjs | `next.config.mjs` | High |
| Remove `ignoreDuringBuilds: true` from next.config.mjs | `next.config.mjs` | High |
| Fix all TypeScript and ESLint errors uncovered above | Various | High |
| Re-enable image optimization (remove `unoptimized: true`) | `next.config.mjs` | Medium |
| Move section components from project root → `components/sections/` | All `*-section.tsx` files | Medium |
| Update all import paths after the move above | `app/page.tsx` + detail pages | Medium |
| Move hard-coded contact/WhatsApp numbers to environment variables | `contact-section.tsx`, `whatsapp-button.tsx`, `join-community-page.tsx` | Medium |
| Create `.env.example` documenting all required variables | `.env.example` | Medium |

---

## Phase 3 — Forms & Backend

**Status: Not started**  
**Goal:** Make the two user-facing forms actually work. This is required before inviting any real users.

### Contact Form (`contact-section.tsx`)

The form currently has no submit handler. Recommended approach: **Resend** (email API) or **Formspree** — both require no backend server and work with Vercel's serverless functions.

| Task | Notes |
|---|---|
| Add Zod validation schema for contact form fields | Name, email, message — all required |
| Wire React Hook Form to the Zod schema | `@hookform/resolvers/zod` is already installed |
| Create API route `app/api/contact/route.ts` | Server Action or Route Handler |
| Integrate Resend (or Formspree) to send email on submission | Add `RESEND_API_KEY` to environment variables |
| Show Sonner toast on success and on error | `sonner` is already installed |
| Add loading state to submit button | Disable + spinner while request is in-flight |

### Join Community Form (`join-community-page.tsx`)

The form simulates a 2-second delay then sets `isSubmitted = true` without saving anything. Recommended approach: **Supabase** free tier — stores registrations in a `community_members` table.

| Task | Notes |
|---|---|
| Create Supabase project and `community_members` table | Columns: id, nombre, municipio, contacto, tipo_apoyo (array), created_at |
| Add Zod schema for the join form | nombre (required), municipio (required), contacto (required), tipoApoyo (optional array) |
| Wire React Hook Form to Zod schema | — |
| Replace the fake `setTimeout` with a real Supabase insert | `@supabase/supabase-js` — add as dependency |
| Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to env | — |
| Show Sonner toast on success and on error | — |
| Step 1 in success screen says "Revisa tu correo" — only send email if contact field is an email | Validate format first |

### Spam Protection

Add a honeypot field (hidden input with a fake name) to both forms before going live. This requires no third-party service.

---

## Phase 4 — Content & Data Layer

**Status: Complete**  
**Goal:** Decouple content from code so team members can update opportunities, programs, and businesses without touching component files.

| Task | Notes | Status |
|---|---|---|
| Extract `opportunities` array → `data/opportunities.ts` | Typed with a shared `Opportunity` interface | ✅ Done |
| Extract `programs` array → `data/programs.ts` | Typed with a shared `Program` interface | ✅ Done |
| Extract `businesses` array → `data/businesses.ts` | Typed with a shared `Business` interface | ✅ Done |
| Update components to import from `data/` | Section components and dynamic detail pages | ✅ Done |
| Wire detail pages to look up by id + `notFound()` | Fixed bug where every detail page showed Fondo Emprender content | ✅ Done |
| Add `generateStaticParams` + `generateMetadata` on detail routes | 9 opportunity/program pages now pre-render with unique titles | ✅ Done |
| (Optional) Migrate to Sanity CMS | For a fully no-code content editing workflow | — |
| (Optional) Migrate to Supabase tables | If form data and directory should be unified in one place | — |

---

## Phase 5 — SEO & Performance

**Status: Not started**  
**Goal:** Make the platform discoverable and fast.

| Task | Notes |
|---|---|
| OG image for social sharing | `app/opengraph-image.tsx` using Next.js `ImageResponse` |
| Per-page metadata | Dynamic `generateMetadata` on opportunity and program detail pages |
| Sitemap | `app/sitemap.ts` — list all static and dynamic routes |
| `robots.txt` | Allow production, block staging preview URLs |
| JSON-LD structured data | `LocalBusiness` schema on `/business/[id]` detail pages (✅ done) — extend to directory cards |
| Lazy load below-fold sections | `next/dynamic` with `ssr: false` for DirectorySection and ContactSection |
| Audit and remove unused dependencies | `recharts`, `embla-carousel-react`, and unused Radix UI packages |
| Add a web font | Inter or a regional Spanish-language typeface via `next/font` |

---

## Phase 6 — Operational Readiness

**Status: Not started**  
**Goal:** Instrument the platform for visibility and protect it with automated checks.

| Task | Notes |
|---|---|
| Vercel Analytics | One-line install: `@vercel/analytics` in `app/layout.tsx` |
| Error monitoring | Sentry free tier — catches runtime errors in production |
| GitHub Actions CI | Run `pnpm lint` and `tsc --noEmit` on every PR |
| Dependabot | Auto-PRs for dependency updates |
| Staging environment | Already available via Vercel preview deployments — document the URL |
| Accessibility audit | Run axe DevTools or Lighthouse against the production URL; fix any Level A failures |

---

## Dependency Reference

| Env variable | Used by | Phase |
|---|---|---|
| `RESEND_API_KEY` | Contact form API route | 3 |
| `NEXT_PUBLIC_SUPABASE_URL` | Join community form | 3 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Join community form | 3 |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp button, join form | 2 |
| `NEXT_PUBLIC_CONTACT_PHONE` | Contact section | 2 |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Contact section | 2 |
