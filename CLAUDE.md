# CLAUDE.md

Personal portfolio for **Nafis Islam Nitol**, an Electrical Engineering student at the University of Pécs (robotics, embedded systems, control). Repo: https://github.com/Nafis000/portfolio (branch `main`).

The build brief is `website-arcitecture.md`, a staged plan for Next.js and Supabase. Product truth lives in `PRODUCT.md`, and the visual system lives in `DESIGN.md` (sidecar `.impeccable/design.json`). Read those before changing content or design.

## Status

The build is staged. **Stages 1–4 are done:**
- the design system and every public page (home, projects, education, experience, certifications, activities), all read from Supabase
- the Supabase schema, RLS, storage and admin auth
- the working contact form, SEO (metadata, sitemap, robots, OG image, Person JSON-LD)
- project drawings for every build, a labelled vision-pipeline illustration on /projects, and certificate viewer and verify buttons

Not built yet:
- the CMS editing UI (Stage 5); after a CMS write, call `revalidateTag`/`updateTag` with `"content"` or the section's tag
- media in Storage: images and the CV still ship from `/public` (see the `PROJECT_IMAGES` shortcut in `lib/content/index.ts`)
- 3D scenes and visual refinement (Stage 6), and tests, CI and deploy (Stage 7)

## Database (Supabase)

- Project "Nafis000's Project", ref `nbxouypyzocfbufpfvow`, region eu-west-1. Client config lives in `.env.local` (copy `.env.example`; publishable key only, never a secret key).
- Migrations are in `supabase/migrations/`, named with the applied version. Add new ones as migrations, and never edit the database by hand without a matching file.
- Access model:
  - Admins are rows in `private.admins` (currently nafisislamnitol@gmail.com). Add one with an insert by email lookup, never a hard-coded ID in a migration.
  - Certificate files go in Storage bucket `media` (for example `certificates/<name>.pdf`), get a `media_assets` row, and link through `certifications.media_asset_id`. Verification links go in `certifications.credential_url`.
  - The `private` schema isn't exposed through the API.
  - `private.is_admin()` checks the caller; `public.current_user_is_admin()` is the RPC the app calls.
  - Visitors read only rows with `published = true`, and only admins write.
  - Storage bucket `media` is public-read, and only admins can upload.
  - Anyone may insert into `contact_messages`, with column checks validating each insert, and only admins can read it.
- The admin area is `/admin`. `proxy.ts` refreshes sessions on `/admin/*` only, and every page and action re-checks with `requireAdmin()` (`lib/security/admin.ts`). The green dot at the bottom of the home page is decoration, not security.
- `public.checklist_items` belongs to something else in the same project. Leave it alone.

## Stack

- Next.js 16 (App Router, `cacheComponents`), React 19, TypeScript strict, Tailwind CSS 4 (tokens in `@theme` in `app/globals.css`).
- This Next.js has breaking changes compared with older versions: read `node_modules/next/dist/docs/` before using an API (see `AGENTS.md`). A route that reads `params` must sit under `<Suspense>` or prerender through `generateStaticParams`.
- Fonts come through `next/font/google`: Barlow Semi Condensed (display), Source Sans 3 (body), Kalam (hand annotations only) and JetBrains Mono (values only).
- Commands: `npm run dev` (port 3000, also in `.claude/launch.json`), `npm run build`, `npm run lint`, `npx tsc --noEmit`.

## Layout

| Path | Role |
|---|---|
| `app/page.tsx` | Home: hero drawing, about, education notebook, "On the bench" sheets, experience, certifications, skills, contact |
| `app/projects/page.tsx`, `app/projects/[slug]/page.tsx` | Project datasheets (index and detail) |
| `components/sections/HeroDrawing.tsx` | Hero SVG: PID law, then control loop, then track, then robot (scroll-driven via `.robot-on-track`) |
| `components/projects/Datasheet.tsx` | `DatasheetLink`, `PartsList`, `StatusStamp` |
| `components/layout/` | `SiteNav` (title-block nav), `SiteFooter`, `MatMarkings` (rulers and angle guides) |
| `lib/content/` | `index.ts`: cached Supabase reads (`use cache` + `cacheTag`); `types.ts`: app shapes; `format.ts`: client-safe helpers |
| `components/projects/` | `Datasheet`, `ProjectDrawing` (pen drawings per slug, parts tagged from the BOM), `VisionPipeline` (illustration, not a model), `Annotate` |
| `app/contact/actions.ts` | Contact server action (Zod, honeypot, timing); database trigger rate-limits per email and globally |
| `public/` | `images/` (with provenance sidecars) and `cv/` |
| `legacy/` | The old static HTML site, archived. Not served. |

## Content rules

- Every fact must trace to `CV_.pdf` or the owner's confirmation (see PRODUCT.md "Evidence on Hand"). Never invent metrics, dates, statuses or credentials. Leave fields empty, and the UI hides them or shows "Status TBC".
- Project `status` comments in `supabase/migrations/*_seed_portfolio_content.sql` cite their CV source.
- Public contact is limited to email, GitHub and the CV download. Phone and date of birth stay private, and the public CV still contains them (see the open items).

## Design rules (summary; DESIGN.md is the authority)

- The world is a cutting mat (green grid, numbered rulers) with white datasheets laid on it. Education previews on graph paper.
- Ink is chalk on the mat and ink on the sheets. There's one accent: copper on the mat, copper-deep on the sheets.
- Corners are square, with 2px rules on sheets. Shadows are soft and cast only by sheets. No hard offset shadows, no small-caps labels above headings, and no Unicode arrows (use `components/ui/Arrow.tsx`).

## Claude skills installed in this repo

`.agents/skills/`, symlinked into `.claude/skills/`: `transitions-dev`, `transitions-polish`, `transitions-ui-generation`, `make-interfaces-feel-better` (managed with `npx skills`, see `skills-lock.json`).
