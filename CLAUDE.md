# CLAUDE.md

Personal portfolio for **Nafis Islam Nitol**, an Electrical Engineering student at the University of Pécs (robotics, embedded systems, control). Repo: https://github.com/Nafis000/portfolio (branch `main`).

The build brief is `website-arcitecture.md`, a staged plan for Next.js and Supabase. Product truth lives in `PRODUCT.md`, and the visual system lives in `DESIGN.md` (sidecar `.impeccable/design.json`). Read those before changing content or design.

## Status

The build is staged. **Stages 1–2 are done:** the Next.js scaffold, the design system, the home page, and the Projects index and detail pages. Not built yet:
- the Supabase schema and RLS
- admin auth and the CMS (including the hidden green-dot entry)
- the working contact form (the email link is the only contact for now)
- the cat companion and the 3D scenes
- separate Education, Experience, Activities and Certifications pages (the home page links to its own chapters for now)

## Stack

- Next.js 16 (App Router, `cacheComponents`), React 19, TypeScript strict, Tailwind CSS 4 (tokens in `@theme` in `app/globals.css`).
- This Next.js has breaking changes compared with older versions: read `node_modules/next/dist/docs/` before using an API (see `AGENTS.md`). A route that reads `params` must sit under `<Suspense>` or prerender through `generateStaticParams`.
- Fonts come through `next/font/google`: Barlow Semi Condensed (display), Source Sans 3 (body), Kalam (hand annotations only) and JetBrains Mono (values only).
- Commands: `npm run dev` (port 3000, also in `.claude/launch.json`), `npm run build`, `npm run lint`, `npx tsc --noEmit`.
- Supabase project (for Stage 3): "Nafis000's Project", ref `nbxouypyzocfbufpfvow`, region eu-west-1. It's still empty.

## Layout

| Path | Role |
|---|---|
| `app/page.tsx` | Home: hero drawing, about, education notebook, "On the bench" sheets, experience, certifications, skills, contact |
| `app/projects/page.tsx`, `app/projects/[slug]/page.tsx` | Project datasheets (index and detail) |
| `components/sections/HeroDrawing.tsx` | Hero SVG: PID law, then control loop, then track, then robot (scroll-driven via `.robot-on-track`) |
| `components/projects/Datasheet.tsx` | `DatasheetLink`, `PartsList`, `StatusStamp` |
| `components/layout/` | `SiteNav` (title-block nav), `SiteFooter`, `MatMarkings` (rulers and angle guides) |
| `lib/content/` | `types.ts` (shapes mirror future DB tables), `seed.ts` (all current content), `index.ts` (async getters that Stage 3 will swap to Supabase) |
| `public/` | `images/` (with provenance sidecars) and `cv/` |
| `legacy/` | The old static HTML site, archived. Not served. |

## Content rules

- Every fact must trace to `CV_.pdf` or the owner's confirmation (see PRODUCT.md "Evidence on Hand"). Never invent metrics, dates, statuses or credentials. Leave fields empty, and the UI hides them or shows "Status TBC".
- Project `status` comments in `seed.ts` cite their CV source.
- Public contact is limited to email, GitHub and the CV download. Phone and date of birth stay private, and the public CV still contains them (see the open items).

## Design rules (summary; DESIGN.md is the authority)

- The world is a cutting mat (green grid, numbered rulers) with white datasheets laid on it. Education previews on graph paper.
- Ink is chalk on the mat and ink on the sheets. There's one accent: copper on the mat, copper-deep on the sheets.
- Corners are square, with 2px rules on sheets. Shadows are soft and cast only by sheets. No hard offset shadows, no small-caps labels above headings, and no Unicode arrows (use `components/ui/Arrow.tsx`).

## Claude skills installed in this repo

`.agents/skills/`, symlinked into `.claude/skills/`: `transitions-dev`, `transitions-polish`, `transitions-ui-generation`, `make-interfaces-feel-better` (managed with `npx skills`, see `skills-lock.json`).
