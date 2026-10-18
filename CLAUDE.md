# CLAUDE.md

Personal portfolio site for **Nafis Islam Nitol**: an electronics and embedded projects showcase (Arduino, ESP32, PID robots). Repo: https://github.com/Nafis000/portfolio (branch `main`).

## Stack

- Static site: plain HTML, CSS and vanilla JS. No build step, no package.json, no node_modules.
- CDN dependencies: Tailwind Play CDN (`cdn.tailwindcss.com`), Lucide icons (`unpkg.com/lucide@latest`), Google Fonts (Outfit, Plus Jakarta Sans, JetBrains Mono).
- Local preview: VS Code Live Server on port **5501** (`.vscode/settings.json`). Serve the site over HTTP. Opening the files via `file://` breaks `fetch('portfolio_data.json')`.

## Files

| File | Role |
|---|---|
| `index.html` | Home page. Sections `#home`, `#about`, `#projects` (featured), `#services`, `#contact`. |
| `projects.html` | All projects. |
| `certifications.html` | Education, experience and certifications timelines. |
| `script.js` | Shared by every page: data loading, rendering, details modal, admin CRUD, contact form, scroll reveal, anti-inspection handlers. |
| `style.css` | Design tokens (`:root`) and custom classes such as `.sticker-card` and `.reveal`. |
| `portfolio_data.json` | Content: `projects`, `education`, `experience`, `certifications` arrays. |
| `pictures/` | Profile images and project screenshots (`pictures/projects/`). |

## How content works

- `loadData()` in `script.js` reads, in order: a `localStorage['portfolio_data']` draft, then `portfolio_data.json`, then the `DEFAULT_PORTFOLIO_DATA` constant in `script.js`.
- Renderers (`renderProjects`, `renderFeaturedProjects`, `renderEducation`, `renderExperience`, `renderCertifications`) only run when their container exists on the current page.
- **Content edits go in `portfolio_data.json`.** Keep `DEFAULT_PORTFOLIO_DATA` as the offline fallback. A stale `localStorage` draft overrides the JSON, so clear it when testing content changes.
- Project fields: `id`, `title`, `shortDescription`, `longDescription`, `image`, `category`, `challenge`, `solution`, `techStack[]`, `githubUrl`, `featured`.
- Admin mode is a client-side login modal. In admin mode you can edit and delete items, which saves to localStorage, then export or import JSON. To publish edits, export `portfolio_data.json` and commit it.

## Design system ("Playful Geometric" / neo-brutalist)

- Paper background `#FFFDF5`, ink `#1E293B`, accents violet `#8B5CF6`, pink `#F472B6`, yellow `#FBBF24`, mint `#34D399`.
- Thick `border-2 border-[#1E293B]`, hard offset shadows like `shadow-[5px_5px_0px_0px_…]`, rounded-2xl cards, pill badges, hover lift and tilt.
- Cards cycle through the four accents via `SCHEMES` and `getScheme(index)` in `script.js`. Reuse those instead of hard-coding new colours.
- Headings use Outfit, body text Plus Jakarta Sans, labels and tags JetBrains Mono.
- Styling is mostly Tailwind utility classes inline in HTML and in JS template strings. Shared tokens live in `style.css`.

## Conventions

- Escape every data value interpolated into HTML with `escapeHTML()`.
- All three pages share `script.js`. Guard DOM lookups, because an element may not exist on every page.
- Call `lucide.createIcons()` after rendering markup that adds `data-lucide` icons.
- Elements with class `.reveal` animate in on scroll. Re-run `setupScrollReveal()` after re-rendering.

## Known limitations (don't assume these are secure or functional)

- Admin "auth" is a SHA-256 hash in client JS. The comment in `script.js` gives the password, so this is cosmetic, not security.
- The right-click, F12, Ctrl+U and Ctrl+S blocking at the end of `script.js` is a deterrent only.
- The contact form validates input and shows an alert, but sends nothing. There's no backend.
- `lucide@latest` and the Tailwind Play CDN are unpinned. Tailwind's Play CDN isn't intended for production.

## Claude skills installed in this repo

`.agents/skills/`, symlinked into `.claude/skills/`: `transitions-dev`, `transitions-polish`, `transitions-ui-generation`, `make-interfaces-feel-better` (managed with `npx skills`, see `skills-lock.json`).
