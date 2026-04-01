# Contributing to Plataforma Guajira Emprende

Thank you for contributing. This document covers branch strategy, commit conventions, adding content, and the pull request process.

---

## Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Production — deployed automatically to Vercel. Never push directly. |
| `feature/<short-description>` | New features or pages |
| `fix/<short-description>` | Bug fixes |
| `content/<short-description>` | Adding or updating opportunities, programs, or directory entries |
| `docs/<short-description>` | Documentation changes only |

**Examples:**
```
feature/contact-form-backend
fix/lang-attribute-spanish
content/add-new-opportunity-fontur
docs/update-roadmap-phase2
```

### Starting a Feature

```bash
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
```

### Keeping Your Branch Up to Date

```bash
git fetch origin main
git rebase origin/main
```

---

## Commit Conventions

Use the **Conventional Commits** format:

```
<type>(<scope>): <short summary in Spanish or English>
```

### Types

| Type | When to use |
|---|---|
| `feat` | A new feature or page |
| `fix` | A bug fix |
| `content` | Adding or updating opportunities, programs, or directory data |
| `style` | CSS/Tailwind changes with no logic change |
| `refactor` | Code restructuring with no behavior change |
| `docs` | Documentation changes only |
| `chore` | Dependency updates, config changes, build tooling |

### Scope (optional)

Use the component or section name: `hero`, `opportunities`, `programs`, `directory`, `contact`, `join`, `onboarding`, `navigation`, `footer`.

### Examples

```
feat(join): wire up community form to Supabase
fix(layout): set html lang attribute to "es"
content(opportunities): add Fontur 2025 convocatoria
style(directory): increase card image aspect ratio on mobile
docs: update ROADMAP phase 2 status
chore: upgrade Next.js to 15.3
```

### Summary Rules

- Use the imperative mood: "add", not "added" or "adds"
- No period at the end
- Keep it under 72 characters
- Capitalize the first word after the colon

---

## Adding Content

The quickest way to contribute is updating the hard-coded data arrays. See [docs/CONTENT.md](docs/CONTENT.md) for exact instructions on adding:

- Funding opportunities (`opportunities-section.tsx`)
- Training programs (`programs-section.tsx`)
- Directory businesses (`directory-section.tsx`)

Use branch type `content/` for these changes.

---

## Pull Request Process

1. **Open a PR** against `main` with a clear title following the same Conventional Commits format.
2. **Fill in the PR description** with:
   - What changed and why
   - Screenshots for any visual changes
   - Any manual testing steps
3. **One approval** is required before merging.
4. **Squash merge** to keep `main` history clean.

### PR Title Examples

```
feat(onboarding): add step-by-step business registration guide
fix: remove ignoreBuildErrors from next.config.mjs
content(directory): add 5 new Riohacha businesses
```

---

## Code Style

- **TypeScript** — all new files must be `.tsx` or `.ts`. Avoid `any` types.
- **Tailwind CSS** — use the existing custom color palette (`turquoise`, `coral`, `amber`) for consistency. Do not add raw hex colors inline.
- **Components** — keep components focused. A component that exceeds ~200 lines should probably be split.
- **"use client"** — only add this directive when the component genuinely needs browser APIs, event handlers, or React state. Static display components should remain server components.
- **No new dependencies** without discussion — the bundle is already large. Prefer using what is already installed.

---

## Running Checks Locally

Before opening a PR, verify these pass:

```bash
pnpm lint          # ESLint — must pass with zero errors
pnpm build         # Next.js build — must complete without errors
```

> Note: `next.config.mjs` currently suppresses build errors. Once that is fixed (Phase 2 of the roadmap), a clean build will be required.

---

## Questions

Open a GitHub issue or contact the team via the WhatsApp number listed in the platform's contact section.
