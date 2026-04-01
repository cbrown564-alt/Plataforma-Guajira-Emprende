# Plataforma Guajira Emprende

A government-backed digital platform connecting Wayuu and Guajiran entrepreneurs with funding, training, mentorship, and community resources to build sustainable tourism businesses in La Guajira, Colombia.

Backed by the **Ministerio de Comercio, Industria y Turismo** of Colombia.

---

## What It Does

The platform serves as a centralized hub for tourism entrepreneurs in La Guajira. Visitors can:

- **Explore funding opportunities** — grants, microcredits, and non-reimbursable funds (e.g. Fondo Emprender Turismo, Microcréditos Bancóldex)
- **Browse training programs** — the Escuela de Turismo Wayuu, incubation programs, and community tourism initiatives
- **Find businesses in the directory** — filter by category (cultural tourism, accommodation, gastronomy, ecotourism, crafts, transport)
- **Register as an entrepreneur** — join the community via the `/join` form
- **Start the onboarding checklist** — guided first steps at `/onboarding`
- **Contact the team** — via WhatsApp, phone, email, or two physical offices

**Target users:** Young entrepreneurs (18–28), Wayuu community members, tourism SMEs, and aspiring business owners across the 15 municipalities of La Guajira.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15.2.4 (App Router) |
| Language | TypeScript 5 |
| UI Library | React 19 |
| Styling | Tailwind CSS 3.4 + custom Wayuu color palette |
| Components | shadcn/ui + Radix UI primitives |
| Icons | Lucide React |
| Forms | React Hook Form 7 + Zod 3 |
| Package manager | pnpm |
| Deployment | Vercel |

---

## Project Structure

```
/
├── app/                         # Next.js App Router pages
│   ├── layout.tsx               # Root layout (metadata, html shell)
│   ├── page.tsx                 # Homepage — composes all sections
│   ├── join/page.tsx            # Community registration page
│   ├── onboarding/page.tsx      # Startup checklist page
│   ├── opportunity/[id]/page.tsx # Dynamic opportunity detail
│   └── program/[id]/page.tsx    # Dynamic program detail
│
├── components/ui/               # shadcn/ui primitives (button, card, etc.)
│
├── # Section components (project root — to be moved to components/sections/)
├── navigation.tsx               # Fixed top navigation bar
├── hero-section.tsx             # Full-screen hero with background image
├── opportunities-section.tsx    # Funding opportunities grid
├── programs-section.tsx         # Training programs grid
├── directory-section.tsx        # Filterable business directory
├── contact-section.tsx          # Contact info + contact form
├── footer.tsx                   # Site footer
├── whatsapp-button.tsx          # Floating WhatsApp FAB
├── join-community-page.tsx      # Join community form component
├── onboarding-page.tsx          # Onboarding checklist component
├── opportunity-detail-page.tsx  # Opportunity detail component
└── program-detail-page.tsx      # Program detail component
│
├── hooks/                       # Custom React hooks
│   ├── use-mobile.tsx           # Mobile breakpoint detection
│   └── use-toast.ts             # Toast notification state
│
├── lib/
│   └── utils.ts                 # cn() Tailwind class merging helper
│
├── public/images/               # Static images (hero background, etc.)
│
└── docs/                        # Project documentation
    ├── ARCHITECTURE.md          # Component map, data flow, design decisions
    ├── CONTENT.md               # How to update opportunities, programs, directory
    └── ROADMAP.md               # Phased production-readiness plan
```

---

## Local Development

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)

### Setup

```bash
# Clone the repository
git clone https://github.com/cbrown564-alt/plataforma-guajira-emprende.git
cd plataforma-guajira-emprende

# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

The app runs at `http://localhost:3000`.

### Available Scripts

```bash
pnpm dev      # Start development server with hot reload
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

---

## Environment Variables

No environment variables are required to run the app locally in its current state. Contact info, WhatsApp numbers, and other configuration are currently hard-coded. See [docs/ROADMAP.md](docs/ROADMAP.md) for the plan to move these to environment variables.

When that migration is complete, a `.env.local` file will be required. Copy `.env.example` (not yet created) and fill in the values.

---

## Deployment

The project deploys automatically to Vercel on every push to `main`.

**Live URL:** [https://vercel.com/cbrown564-1s-projects/v0-hero-section-design](https://vercel.com/cbrown564-1s-projects/v0-hero-section-design)

To deploy a preview, push to any branch — Vercel will create a preview deployment automatically.

---

## Known Issues (MVP Status)

This is an early-stage prototype. Several features are not yet production-ready:

- **Forms are non-functional** — the contact form and join form do not submit data anywhere. See [docs/ROADMAP.md Phase 3](docs/ROADMAP.md).
- **All data is hard-coded** — opportunities, programs, and directory listings are static arrays in component files. See [docs/CONTENT.md](docs/CONTENT.md) to update them.
- **Build errors are suppressed** — `next.config.mjs` currently ignores TypeScript and ESLint errors during builds.
- **SEO metadata is placeholder** — the page title and description are v0.dev defaults.
- **Language attribute is incorrect** — `html lang` is set to `"en"` despite all content being in Spanish.

Full remediation plan: [docs/ROADMAP.md](docs/ROADMAP.md).

---

## Documentation

| Document | Purpose |
|---|---|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Component map, rendering strategy, design system |
| [docs/CONTENT.md](docs/CONTENT.md) | How to add or edit opportunities, programs, and businesses |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Phased plan to reach production readiness |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Branch strategy, commit conventions, PR process |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for branch strategy, commit conventions, and how to add content.
