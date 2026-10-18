-- Portfolio content schema, admin authorization, RLS and media storage.
-- Access model:
--   anon / authenticated  -> read published content only; may submit contact messages
--   admins (private.admins) -> full read/write on content, media and messages
-- The hidden admin entry in the UI is decoration; these policies are the boundary.

-- ───────── Admin authorization (not exposed through the Data API) ─────────
create schema if not exists private;
-- "private" is not an exposed API schema; usage lets policies evaluated as anon/authenticated call is_admin().
revoke all on schema private from public;
grant usage on schema private to anon, authenticated;

create table private.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table private.admins enable row level security; -- no policies: only the owner role can touch it
revoke all on private.admins from public, anon, authenticated;

-- Runs as owner so policies can consult private.admins; it only ever answers for the caller.
create function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from private.admins a where a.user_id = (select auth.uid()));
$$;
revoke execute on function private.is_admin() from public;
grant execute on function private.is_admin() to anon, authenticated; -- false for anon (auth.uid() is null)

-- ───────── Shared helpers ─────────
create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;
revoke execute on function public.set_updated_at() from public, anon, authenticated;

create type public.project_status as enum ('prototype', 'experiment', 'in_progress', 'completed');
create type public.credential_kind as enum ('verified', 'informal', 'in_progress');

-- ───────── Media (files live in Storage bucket "media"; rows hold metadata) ─────────
create table public.media_assets (
  id bigint generated always as identity primary key,
  bucket text not null default 'media' check (bucket = 'media'),
  path text not null unique check (length(path) between 1 and 512),
  alt text not null default '' check (length(alt) <= 500),
  mime_type text not null check (mime_type ~ '^(image/(png|jpeg|webp|avif|gif|svg\+xml)|video/(mp4|webm)|application/pdf|model/gltf-binary)$'),
  width integer check (width > 0),
  height integer check (height > 0),
  byte_size bigint check (byte_size > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ───────── Owner profile (single row) ─────────
create table public.profiles (
  id smallint primary key default 1 check (id = 1),
  name text not null check (length(name) between 1 and 120),
  headline text not null check (length(headline) <= 300),
  about text not null default '' check (length(about) <= 4000),
  interests text[] not null default '{}',
  location text,
  languages text,
  public_email text check (public_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  portrait_asset_id bigint references public.media_assets (id) on delete restrict,
  cv_asset_id bigint references public.media_assets (id) on delete restrict,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index profiles_portrait_asset_id_idx on public.profiles (portrait_asset_id);
create index profiles_cv_asset_id_idx on public.profiles (cv_asset_id);

-- ───────── Content sections ─────────
create table public.education (
  id bigint generated always as identity primary key,
  institution text not null check (length(institution) between 1 and 200),
  qualification text not null check (length(qualification) between 1 and 200),
  field_of_study text,
  location text,
  start_date date not null,
  end_date date check (end_date is null or end_date >= start_date), -- null = current
  grade text,
  note text,
  coursework text[] not null default '{}',
  achievements text[] not null default '{}',
  description text,
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.experience (
  id bigint generated always as identity primary key,
  organization text not null check (length(organization) between 1 and 200),
  role text not null check (length(role) between 1 and 200),
  employment_type text not null default 'employment'
    check (employment_type in ('employment', 'internship', 'research', 'teaching', 'volunteer', 'freelance', 'other')),
  location text,
  start_date date not null,
  end_date date check (end_date is null or end_date >= start_date),
  responsibilities text[] not null default '{}',
  achievements text[] not null default '{}',
  technologies text[] not null default '{}',
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.projects (
  id bigint generated always as identity primary key,
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (length(title) between 1 and 200),
  category text not null default '',
  summary text not null check (length(summary) between 1 and 600),
  status public.project_status, -- null = owner has not stated it
  problem text,
  motivation text,
  approach text,
  hardware text[] not null default '{}',
  software text[] not null default '{}',
  challenges text,
  results text,
  lessons text,
  started_on date,
  completed_on date check (completed_on is null or started_on is null or completed_on >= started_on),
  repo_url text check (repo_url ~ '^https://'),
  demo_url text check (demo_url ~ '^https://'),
  docs_url text check (docs_url ~ '^https://'),
  featured boolean not null default false,
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project_media (
  id bigint generated always as identity primary key,
  project_id bigint not null references public.projects (id) on delete cascade,
  media_asset_id bigint not null references public.media_assets (id) on delete restrict,
  kind text not null default 'image' check (kind in ('image', 'video', 'diagram', 'model')),
  caption text,
  is_cover boolean not null default false,
  sort_order integer not null default 0,
  unique (project_id, media_asset_id)
);
create index project_media_media_asset_id_idx on public.project_media (media_asset_id);
create unique index project_media_one_cover_idx on public.project_media (project_id) where is_cover;

create table public.skills (
  id bigint generated always as identity primary key,
  name text not null unique check (length(name) between 1 and 100),
  category text not null,
  level text, -- only when the owner states it; never a numeric score
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project_skills (
  project_id bigint not null references public.projects (id) on delete cascade,
  skill_id bigint not null references public.skills (id) on delete cascade,
  primary key (project_id, skill_id)
);
create index project_skills_skill_id_idx on public.project_skills (skill_id);

create table public.certifications (
  id bigint generated always as identity primary key,
  title text not null check (length(title) between 1 and 200),
  issuer text not null check (length(issuer) between 1 and 200),
  issued_year smallint not null check (issued_year between 1990 and 2100),
  issued_on date, -- only when the exact date is known
  expires_on date,
  credential_id text,
  credential_url text check (credential_url ~ '^https://'),
  category text,
  kind public.credential_kind not null default 'verified',
  description text,
  media_asset_id bigint references public.media_assets (id) on delete restrict,
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index certifications_media_asset_id_idx on public.certifications (media_asset_id);

create table public.activities (
  id bigint generated always as identity primary key,
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (length(title) between 1 and 200),
  occurred_on date not null,
  location text,
  category text not null,
  summary text not null check (length(summary) between 1 and 600),
  story text,
  organizer text,
  external_url text check (external_url ~ '^https://'),
  cover_asset_id bigint references public.media_assets (id) on delete restrict,
  achievements text[] not null default '{}',
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index activities_cover_asset_id_idx on public.activities (cover_asset_id);

create table public.activity_media (
  id bigint generated always as identity primary key,
  activity_id bigint not null references public.activities (id) on delete cascade,
  media_asset_id bigint not null references public.media_assets (id) on delete restrict,
  caption text,
  sort_order integer not null default 0,
  unique (activity_id, media_asset_id)
);
create index activity_media_media_asset_id_idx on public.activity_media (media_asset_id);

create table public.social_links (
  id bigint generated always as identity primary key,
  label text not null,
  url text not null check (url ~ '^(https://|mailto:)'),
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.navigation_items (
  id bigint generated always as identity primary key,
  label text not null,
  href text not null check (href ~ '^/'),
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_settings (
  key text primary key check (key ~ '^[a-z0-9_.]+$'),
  value jsonb not null,
  is_public boolean not null default false,
  updated_at timestamptz not null default now()
);

create table public.contact_messages (
  id bigint generated always as identity primary key,
  name text not null check (length(name) between 1 and 120),
  email text not null check (length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  subject text check (length(subject) <= 200),
  message text not null check (length(message) between 10 and 5000),
  handled boolean not null default false,
  created_at timestamptz not null default now()
);
create index contact_messages_created_at_idx on public.contact_messages (created_at desc);

-- updated_at triggers
do $$
declare t text;
begin
  foreach t in array array['media_assets','profiles','education','experience','projects','skills',
                           'certifications','activities','social_links','navigation_items','site_settings']
  loop
    execute format('create trigger %I before update on public.%I for each row execute function public.set_updated_at()',
                   t || '_set_updated_at', t);
  end loop;
end $$;

-- ───────── Grants: deny by default, then grant only what each role needs ─────────
do $$
declare t text;
begin
  foreach t in array array['media_assets','profiles','education','experience','projects','project_media','skills',
                           'project_skills','certifications','activities','activity_media','social_links',
                           'navigation_items','site_settings','contact_messages']
  loop
    execute format('revoke all on public.%I from anon, authenticated', t);
    execute format('alter table public.%I enable row level security', t);
  end loop;
end $$;

grant select on public.media_assets, public.profiles, public.education, public.experience, public.projects,
  public.project_media, public.skills, public.project_skills, public.certifications, public.activities,
  public.activity_media, public.social_links, public.navigation_items, public.site_settings
  to anon, authenticated;
grant insert, update, delete on public.media_assets, public.profiles, public.education, public.experience,
  public.projects, public.project_media, public.skills, public.project_skills, public.certifications,
  public.activities, public.activity_media, public.social_links, public.navigation_items, public.site_settings
  to authenticated;
grant insert on public.contact_messages to anon, authenticated;
grant select, update, delete on public.contact_messages to authenticated;

-- ───────── RLS policies ─────────
-- Tables with a published flag: visitors see published rows, admins see everything.
do $$
declare t text;
begin
  foreach t in array array['profiles','education','experience','projects','skills','certifications',
                           'activities','social_links','navigation_items']
  loop
    execute format($p$create policy "Read published %1$s" on public.%1$I for select to anon, authenticated
                      using (published or (select private.is_admin()))$p$, t);
  end loop;
end $$;

-- Child rows are visible only when their parent is.
create policy "Read media of published projects" on public.project_media for select to anon, authenticated
  using ((select private.is_admin()) or exists (select 1 from public.projects p where p.id = project_id and p.published));
create policy "Read skills of published projects" on public.project_skills for select to anon, authenticated
  using ((select private.is_admin()) or exists (select 1 from public.projects p where p.id = project_id and p.published));
create policy "Read media of published activities" on public.activity_media for select to anon, authenticated
  using ((select private.is_admin()) or exists (select 1 from public.activities a where a.id = activity_id and a.published));
create policy "Read public settings" on public.site_settings for select to anon, authenticated
  using (is_public or (select private.is_admin()));
create policy "Read media metadata" on public.media_assets for select to anon, authenticated
  using (true); -- files are served from a public bucket; metadata carries no secrets

-- Writes: admins only, on every content table.
do $$
declare t text;
begin
  foreach t in array array['media_assets','profiles','education','experience','projects','project_media','skills',
                           'project_skills','certifications','activities','activity_media','social_links',
                           'navigation_items','site_settings']
  loop
    execute format($p$create policy "Admins insert %1$s" on public.%1$I for insert to authenticated
                      with check ((select private.is_admin()))$p$, t);
    execute format($p$create policy "Admins update %1$s" on public.%1$I for update to authenticated
                      using ((select private.is_admin())) with check ((select private.is_admin()))$p$, t);
    execute format($p$create policy "Admins delete %1$s" on public.%1$I for delete to authenticated
                      using ((select private.is_admin()))$p$, t);
  end loop;
end $$;

-- Contact: anyone may submit (column checks validate); only admins read and manage.
create policy "Anyone submits a contact message" on public.contact_messages for insert to anon, authenticated
  with check (not handled);
create policy "Admins read contact messages" on public.contact_messages for select to authenticated
  using ((select private.is_admin()));
create policy "Admins update contact messages" on public.contact_messages for update to authenticated
  using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins delete contact messages" on public.contact_messages for delete to authenticated
  using ((select private.is_admin()));

-- ───────── Storage: public-read bucket, admin-only writes ─────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 20971520,
        array['image/png','image/jpeg','image/webp','image/avif','image/gif','image/svg+xml',
              'video/mp4','video/webm','application/pdf','model/gltf-binary'])
on conflict (id) do nothing;

-- Public URLs serve files without a SELECT policy; only admins may list, upload, replace or delete.
create policy "Admins read media objects" on storage.objects for select to authenticated
  using (bucket_id = 'media' and (select private.is_admin()));
create policy "Admins upload media objects" on storage.objects for insert to authenticated
  with check (bucket_id = 'media' and (select private.is_admin()));
create policy "Admins update media objects" on storage.objects for update to authenticated
  using (bucket_id = 'media' and (select private.is_admin()))
  with check (bucket_id = 'media' and (select private.is_admin()));
create policy "Admins delete media objects" on storage.objects for delete to authenticated
  using (bucket_id = 'media' and (select private.is_admin()));
