# AGENTS.md

## What this repo is

**Specification and content backup** for the "Sonoplastia 2026" Astro static site (landing page for Clóvis Ribeiro's single "Todos os Meses", educational project by Diogo M. at Rede Daora).

The **actual Astro project** lives separately at `https://github.com/rdricco/diogo-pi-sonoplastia.git`. This repo holds the specs and raw content that inform it.

## Key sources of truth

- `.agents/specs/` — 6 detailed specification documents (project, functional, content, technical, design, setup). Read these before modifying the real project.
- `DATA/` — raw source content backup (markdown, YAML, images, audio). Mirrors what goes into `src/content/` and `public/` in the real project. `DATA/config.ts` defines Zod schemas for Astro Content Collections.

## Real project commands (Astro 5 + Vercel)

```bash
npm run dev       # dev server at localhost:4321, HMR
npm run build     # static build to dist/
npm run preview   # serve build locally
```

Dependencies (all devDependencies): `astro ^5.0.0`, `@astrojs/vercel ^8.0.0`, `typescript ^5.0.0`.

## Notable conventions

- **No CSS framework** — vanilla CSS with custom properties (`:root` tokens in `global.css`), Astro scoped styles, mobile-first, breakpoints at 600/720/768/1024px.
- **No JS framework** — vanilla ES6 in `src/scripts/player.js` and `src/scripts/lightbox.js`, loaded via `client:load` directives.
- **Content** — all text/content lives in Astro Content Collections (markdown + frontmatter + Zod). Edit content there, not in components.
- **Zod schemas** in `src/content/config.ts` drive content validation; match `DATA/config.ts`.
- **Deploy** — Vercel auto-deploy from main branch; `@astrojs/vercel/static` adapter; `vercel.json` sets `cleanUrls: true`.
- **All pages** are `noindex, nofollow`.
- **No tests** configured in this project.

## Quick reference: what maps where

| Spec file | Covers |
|---|---|
| `PROJECT_SPECIFICATION.md` | overview, stakeholders, file tree |
| `FUNCTIONAL_SPECIFICATION.md` | component-by-component behavior |
| `CONTENT_SPECIFICATION.md` | all text, lyrics, contacts, credits |
| `TECHNICAL_SPECIFICATION.md` | architecture, CSS/JS, content collections |
| `DESIGN_SPECIFICATION.md` | colors, fonts, spacing, breakpoints |
| `SETUP_GUIDE.md` | dev setup, deploy, customization |
