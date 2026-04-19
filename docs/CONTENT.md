# Content Guide

This document explains how to add, edit, or remove content on the platform: funding opportunities, training programs, and directory businesses.

All content lives in the `data/` folder as typed TypeScript modules. No CMS or database is used at this stage. Future CMS migration is tracked in [ROADMAP.md — Phase 4](ROADMAP.md).

```
data/
├── types.ts            # Shared interfaces (Opportunity, Program, Business, …)
├── opportunities.ts    # Funding opportunities + lookup helpers
├── programs.ts         # Training and funding programs + lookup helpers
└── businesses.ts       # Directory listings + valid categories
```

Section components (`opportunities-section.tsx`, `programs-section.tsx`, `directory-section.tsx`) and the dynamic detail routes (`/opportunity/[id]`, `/program/[id]`) import directly from these modules. Each opportunity and program is statically generated at build time via `generateStaticParams`, so every entry becomes its own pre-rendered HTML page with its own metadata.

---

## Funding Opportunities

**File:** `data/opportunities.ts`
**Exported as:** `opportunities: Opportunity[]`
**Rendered at:** Homepage `#opportunities` section and `/opportunity/[id]` detail pages
**Type:** `Opportunity` in `data/types.ts`

### Object Shape (summary)

```typescript
{
  id: string,                  // URL slug — used in /opportunity/[id]
  programId: string,           // Slug of the parent program (must match an id in programs.ts)
  programName: string,         // Display name of the parent program
  title: string,
  description: string,         // One-line summary for the card
  summary: string,             // Longer paragraph for the detail page
  fundingType: string,         // e.g. "Fondo No Reembolsable"
  supportType: string,         // Label on the detail page (usually same as fundingType)
  supportAmount: string,       // e.g. "Hasta $50 millones COP"
  deadline: string,            // e.g. "15 Mar 2025" or "Convocatoria Abierta"
  resultsAt?: string,          // Optional, shown on the detail cronograma card
  eligibility: string,         // e.g. "Jóvenes 18-28 años"
  status: "Activo" | "Permanente" | "Cerrado",
  icon: LucideIcon,            // Import from lucide-react
  iconColor: string,           // Tailwind text color, e.g. "text-green-600"
  bgColor: string,             // Tailwind bg class for icon container
  borderColor: string,         // Tailwind border class for the card
  requirements: string[],      // Shown as a checklist on the detail page
  applicationSteps: string[],  // Shown as a numbered list
  faqs: { question: string, answer: string }[],
  applicationUrl?: string,     // Optional external postulation URL
}
```

### Adding a New Opportunity

1. Open `data/opportunities.ts`.
2. Add a new object to the `opportunities` array.
3. Set `id` to a unique kebab-case slug (it becomes the URL at `/opportunity/<slug>`).
4. Make sure `programId` matches an existing program `id` in `data/programs.ts` — the program detail page pulls related opportunities from here automatically.
5. The detail page at `/opportunity/<slug>` renders automatically — no component changes needed.

### Color Conventions

Match the color family to the type of opportunity:

| Type | Color family |
|---|---|
| Funding / grants | `green` |
| Training / education | `turquoise` |
| Credit / loans | `coral` |
| Incubation / mentorship | `amber` |
| Technology / innovation | `purple` |
| Community initiatives | `rose` |

---

## Training Programs

**File:** `data/programs.ts`
**Exported as:** `programs: Program[]`
**Rendered at:** Homepage `#training` section and `/program/[id]` detail pages
**Type:** `Program` in `data/types.ts`

### Object Shape (summary)

```typescript
{
  id: string,                  // URL slug — used in /program/[id]
  title: string,
  subtitle: string,            // Shown under the title on the detail page
  description: string,         // One-line summary for the card
  type: string,                // e.g. "Fondo No Reembolsable", "Formación Gratuita"
  typeColor: string,           // Tailwind classes for the type badge
  overview: string,            // Longer paragraph for the detail page
  deadline: string,
  eligibility: string,
  icon: LucideIcon,
  iconColor: string,
  bgColor: string,
  borderColor: string,
  accentColor: string,         // Tailwind bg class for the colored top stripe
  stats: { beneficiaries: string, investment: string },
  targetAudience: { label: string, icon: LucideIcon, color: string }[],
  offerings: { icon: LucideIcon, title: string, description: string, color: string, bgColor: string }[],
  applicationProcess: string,
}
```

The "Oportunidades Activas" section on the program detail page is derived automatically from `opportunities.ts` by matching `programId`. You do not maintain this list manually.

### Adding a New Program

1. Open `data/programs.ts`.
2. Add a new object to the `programs` array.
3. Set `id` to a unique kebab-case slug.
4. The detail page at `/program/<slug>` renders automatically.

---

## Business Directory

**File:** `data/businesses.ts`
**Exported as:** `businesses: Business[]` and `businessCategories: BusinessCategory[]`
**Rendered at:** Homepage `#directory` section
**Type:** `Business` in `data/types.ts`

### Object Shape

```typescript
{
  id: string,                  // Unique slug
  name: string,
  category: BusinessCategory,  // Must be one of the values defined in the BusinessCategory union
  location: string,            // e.g. "Uribia, La Guajira"
  description: string,
  contact: {
    phone: string,             // Colombian format: "+57 300 123 4567"
    email: string,
    website: string,           // Domain only, no https://
  },
  rating: number,              // 1.0 – 5.0
  reviews: number,             // Integer review count
  image: string,               // Path to image in /public, or placeholder SVG URL
  tags: string[],              // 2–4 short descriptive tags
}
```

### Valid Category Values

Categories are defined once in `data/types.ts` as the `BusinessCategory` union and exported from `data/businesses.ts` as `businessCategories`. The filter buttons in `directory-section.tsx` render from that list.

Current valid categories:
- `"Turismo Cultural"`
- `"Hospedaje"`
- `"Gastronomía"`
- `"Ecoturismo"`
- `"Artesanías"`
- `"Transporte"`

To add a new category: extend the `BusinessCategory` union in `data/types.ts`, append it to `businessCategories` in `data/businesses.ts`, and add a color entry to `CATEGORY_COLORS` in `directory-section.tsx`.

### Adding a New Business

1. Open `data/businesses.ts`.
2. Add a new object to the `businesses` array with a unique slug `id`.
3. Add a real image to `/public/images/` and set `image` to `/images/your-image.jpg`.
4. Ensure `category` matches one of the union values exactly (TypeScript will catch typos).

### Adding Business Images

Place images in `/public/images/`. Recommended size: `600×400px` (3:2 ratio, matches the `aspect-video` container). Optimize images before committing — the current build disables Next.js image optimization, so raw file sizes will be served directly.

---

## Contact Information

Contact details (phone numbers, email addresses, WhatsApp numbers, office addresses) are currently hard-coded in two places:

| Location | Content |
|---|---|
| `contact-section.tsx` | Phone, email, WhatsApp, two office addresses |
| `whatsapp-button.tsx` | WhatsApp number for the floating button |
| `join-community-page.tsx` | WhatsApp number for the post-registration broadcast |
| `opportunity-detail-page.tsx` | WhatsApp number for the in-context help button |

To update contact info, edit those values directly. The roadmap plans to centralize these in environment variables (Phase 2).

---

## Navigation Links

The main navigation links and the footer links are hard-coded in `navigation.tsx` and `footer.tsx` respectively. They are simple anchor hrefs or Next.js `<Link>` components — edit them directly.

---

## Content Checklist for Launches

Before publishing updated content, verify:

- [ ] All `id` values are unique kebab-case slugs
- [ ] Each opportunity's `programId` matches an existing program `id`
- [ ] Deadlines are current (not past dates)
- [ ] Phone numbers are in Colombian format: `+57 XXX XXX XXXX`
- [ ] Business images are real photos, not placeholder SVGs
- [ ] Category values match the `BusinessCategory` union exactly
- [ ] WhatsApp URLs use the format `https://wa.me/57XXXXXXXXXX` (no `+`, no spaces)
