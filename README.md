# Nafis Islam Nitol · Portfolio

Next.js 16 site with a Supabase database and a built-in content management system (CMS) at `/admin`.
Content lives in Supabase, not in the code, so edits made in the CMS appear on the live site within seconds,
without a new commit or redeploy.

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

## Environment variables

| Name | Value | Secret? |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://<project-ref>.supabase.co` | No (public) |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_…` from Supabase → Settings → API Keys | No (public) |
| `NEXT_PUBLIC_SITE_URL` | The live address, e.g. `https://nafis.vercel.app` | No |

Never add a `service_role` / `sb_secret_` key: the app doesn't need one, and anything prefixed `NEXT_PUBLIC_` reaches the browser.

## Deploy on Vercel (from GitHub)

1. Push this repository to GitHub (`Nafis000/portfolio`, branch `main`).
2. In Vercel: **Add New → Project → Import** the GitHub repository. The framework is detected as Next.js; keep the defaults.
3. Under **Environment Variables**, add the three variables above for Production (and Preview, if you use preview deployments).
4. Deploy. Every push to `main` redeploys automatically; pull requests get preview URLs.
5. After the first deploy, set `NEXT_PUBLIC_SITE_URL` to the real domain and redeploy once, so the sitemap and share links are correct.

How live updates work: public pages are cached (`use cache` + `cacheTag`), and every CMS save calls `updateTag(...)`,
which expires just the affected content. The next visitor gets fresh data from Supabase. A one-hour cache lifetime is
a safety net if anything is changed directly in the database.

## Database

- Migrations are in `supabase/migrations/`. Vercel does **not** apply them: apply each new migration to Supabase
  (Supabase MCP `apply_migration`, the SQL editor, or `supabase db push`) before deploying code that needs it.
- Content and media persist in Supabase independently of deployments; redeploying never erases CMS content.
- Admins are rows in `private.admins`. To add one, create the user in Supabase → Authentication, then run:
  `insert into private.admins (user_id) select id from auth.users where email = '<email>';`
- Backups: Supabase takes daily backups on paid plans; on the free plan, export with `pg_dump` or the dashboard regularly.

## Admin

Sign in at `/admin` (also reachable from the small green dot at the bottom of the home page).
The CMS edits projects, education, experience, certifications, skills, activities, profile, links and navigation;
uploads media; and shows contact messages. Drafts stay hidden from visitors until **Published** is ticked.
