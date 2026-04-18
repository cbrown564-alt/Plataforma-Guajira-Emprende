# Content Guide

This document explains how to add, edit, or remove content on the platform: funding opportunities, training programs, and directory businesses.

All content is currently maintained as **typed arrays inside component files**. No CMS or database is used at this stage. The plan to migrate content to a dedicated data layer is tracked in [ROADMAP.md — Phase 4](ROADMAP.md).

---

## Funding Opportunities

**File:** `opportunities-section.tsx`  
**Array:** `const opportunities` (line ~7)  
**Rendered at:** Homepage `#opportunities` section and `/opportunity/[id]` detail pages

### Object Shape

```typescript
{
  id: number,                  // Unique integer — used in the detail page URL: /opportunity/[id]
  title: string,               // Name of the opportunity
  description: string,         // One-sentence summary
  fundingType: string,         // e.g. "Fondo No Reembolsable", "Microcrédito", "Formación Gratuita"
  deadline: string,            // e.g. "15 Mar 2025" or "Convocatoria Abierta"
  eligibility: string,         // e.g. "Jóvenes 18-28 años", "PYMES turísticas"
  icon: LucideIcon,            // Import from lucide-react (DollarSign, GraduationCap, Users, etc.)
  iconColor: string,           // Tailwind text color class, e.g. "text-green-600"
  bgColor: string,             // Tailwind bg class for icon container, e.g. "bg-green-50"
  borderColor: string,         // Tailwind border class for the card, e.g. "border-green-200"
  programName: string,         // Name of the parent program (shown as a label on the card)
}
```

### Adding a New Opportunity

1. Open `opportunities-section.tsx`
2. Add a new object to the `opportunities` array
3. Assign the next available `id` integer (currently max is `3`, so use `4`)
4. The detail page at `/opportunity/4` will automatically render using `opportunity-detail-page.tsx` — update that component to handle the new id and display its full details

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

**File:** `programs-section.tsx`  
**Array:** `const programs` (line ~17)  
**Rendered at:** Homepage `#training` section and `/program/[id]` detail pages

### Object Shape

```typescript
{
  id: number,                  // Unique integer — used in /program/[id]
  title: string,
  description: string,
  type: string,                // e.g. "Formación Gratuita", "Incubación", "Capital Semilla"
  deadline: string,
  eligibility: string,
  icon: LucideIcon,
  iconColor: string,
  bgColor: string,
  borderColor: string,
  accentColor: string,         // Tailwind bg class for the colored top stripe on the card
  opportunityCount: string,    // e.g. "3 oportunidades activas"
}
```

### Adding a New Program

1. Open `programs-section.tsx`
2. Add a new object to the `programs` array (current max id is `6`, use `7`)
3. Update `opportunity-detail-page.tsx` or `program-detail-page.tsx` to handle the new id

---

## Business Directory

**File:** `directory-section.tsx`  
**Array:** `const businesses` (line ~11)  
**Rendered at:** Homepage `#directory` section

### Object Shape

```typescript
{
  id: number,
  name: string,
  category: string,            // Must exactly match one of the category filter values (see below)
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

The filter buttons are generated from the categories defined in the `categories` array in the same file. Any business whose `category` field does not match one of these values will appear under "Todos" but not under its intended filter tab.

Current valid categories:
- `"Turismo Cultural"`
- `"Hospedaje"`
- `"Gastronomía"`
- `"Ecoturismo"`
- `"Artesanías"`
- `"Transporte"`

To add a new category, add an entry to the `categories` array (around line ~143) as well as using it in the business entry.

### Adding a New Business

1. Open `directory-section.tsx`
2. Add a new object to the `businesses` array (current max id is `8`, use `9`)
3. Add a real image to `/public/images/` and set the `image` field to `/images/your-image.jpg`
4. Ensure the `category` value matches an existing filter category exactly (case-sensitive)

### Adding Business Images

Place images in `/public/images/`. Recommended size: `600×400px` (3:2 ratio, matches the `aspect-video` container). Optimize images before committing — the current build disables Next.js image optimization, so raw file sizes will be served directly.

---

## Contact Information

Contact details (phone numbers, email addresses, WhatsApp numbers, office addresses) are currently hard-coded in two places:

| Location | Content |
|---|---|
| `contact-section.tsx` | Phone, email, WhatsApp, two office addresses |
| `whatsapp-button.tsx` | WhatsApp number for the floating button |
| `join-community-page.tsx` (line ~73) | WhatsApp number for the post-registration broadcast |

To update contact info, edit those values directly. The roadmap plans to centralize these in environment variables (Phase 2).

---

## Navigation Links

The main navigation links and the footer links are hard-coded in `navigation.tsx` and `footer.tsx` respectively. They are simple anchor hrefs or Next.js `<Link>` components — edit them directly.

---

## Content Checklist for Launches

Before publishing updated content, verify:

- [ ] All `id` values in the array are unique integers
- [ ] Deadlines are current (not past dates)
- [ ] Phone numbers are in Colombian format: `+57 XXX XXX XXXX`
- [ ] Business images are real photos, not placeholder SVGs
- [ ] Category values match the filter list exactly
- [ ] WhatsApp URLs use the format `https://wa.me/57XXXXXXXXXX` (no `+`, no spaces)
