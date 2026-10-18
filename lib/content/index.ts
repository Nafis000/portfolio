import "server-only";
import { createClient } from "@supabase/supabase-js";
import { cacheLife, cacheTag } from "next/cache";
import type { Database } from "@/types/database";
import type {
  Activity,
  Certification,
  Education,
  Experience,
  NavItem,
  Profile,
  Project,
  SkillGroup,
} from "./types";

export { formatMonth, formatDay, statusLabel, credentialLabel } from "./format";

// Public reads use the publishable key with no session: RLS returns published rows only.
// Every query is cached and tagged "content" (plus its own tag) so CMS writes can refresh it on demand.
const db = () =>
  createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

export class ContentUnavailableError extends Error {
  constructor(what: string) {
    super(`Couldn’t load ${what}.`); // safe to show; the raw database error is logged, never rendered
  }
}

function must<T>(what: string, res: { data: T | null; error: unknown }): T {
  if (res.error || res.data === null) {
    console.error(`[content] ${what}`, res.error);
    throw new ContentUnavailableError(what);
  }
  return res.data;
}

// Fallbacks until replacements are uploaded in the CMS media library and chosen on the record.
const PROJECT_IMAGES: Record<string, Project["image"]> = {
  "line-following-robot": {
    src: "/images/projects/line-follower.webp",
    alt: "The line following robot on a desk: a low black chassis with an Arduino Nano, motor driver and coloured jumper wires",
    width: 486,
    height: 244,
  },
};
const PORTRAIT = {
  src: "/images/nafis-portrait.webp",
  alt: "Nafis Islam Nitol standing in front of a wall of climbing plants",
};
const CV_URL = "/cv/nafis-islam-nitol-cv.pdf";

const opt = (v: string | null) => v ?? undefined;

type Asset = { id: number; path: string; mime_type: string; alt: string; width: number | null; height: number | null };
const publicUrl = (path: string) =>
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/${path.split("/").map(encodeURIComponent).join("/")}`;

async function assetsById(ids: (number | null)[]): Promise<Map<number, Asset>> {
  const wanted = [...new Set(ids.filter((id): id is number => id !== null))];
  if (!wanted.length) return new Map();
  const res = await db().from("media_assets").select("id,path,mime_type,alt,width,height").in("id", wanted);
  if (res.error) console.error("[content] media", res.error); // media is optional: fall back rather than fail
  return new Map((res.data ?? []).map((a) => [a.id, a]));
}

// Shape an asset for next/image; dimensions fall back to a 3:2 box when unknown.
const toImage = (a: Asset, fallbackAlt: string) => ({
  src: publicUrl(a.path),
  alt: a.alt || fallbackAlt,
  width: a.width ?? 1200,
  height: a.height ?? 800,
});

// A certificate file in the public "media" bucket.
const toFile = (m: { path: string; mime_type: string; alt: string }, title: string) => ({
  url: publicUrl(m.path),
  mimeType: m.mime_type,
  alt: m.alt || `Certificate: ${title}`,
});

export async function getProfile(): Promise<Profile> {
  "use cache";
  cacheLife("hours");
  cacheTag("content", "profile");
  const [p, links] = await Promise.all([
    db().from("profiles").select("*").eq("id", 1).single(),
    db().from("social_links").select("label,url").order("sort_order"),
  ]);
  const row = must("the profile", p);
  const media = await assetsById([row.portrait_asset_id, row.cv_asset_id]);
  const portrait = row.portrait_asset_id ? media.get(row.portrait_asset_id) : undefined;
  const cv = row.cv_asset_id ? media.get(row.cv_asset_id) : undefined;
  const github = (links.data ?? []).find((l) => l.url.startsWith("https://github.com/"));
  return {
    name: row.name,
    headline: row.headline,
    about: row.about,
    interests: row.interests,
    location: row.location,
    email: row.public_email,
    githubUrl: github?.url ?? null,
    cvUrl: cv ? publicUrl(cv.path) : CV_URL,
    portrait: portrait ? { src: publicUrl(portrait.path), alt: portrait.alt || PORTRAIT.alt } : PORTRAIT,
    languages: row.languages,
  };
}

export async function getProjects(): Promise<Project[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("content", "projects");
  const rows = must("projects", await db().from("projects").select("*").order("sort_order"));
  const covers = await db().from("project_media").select("project_id,media_asset_id").eq("is_cover", true);
  const coverOf = new Map((covers.data ?? []).map((c) => [c.project_id, c.media_asset_id]));
  const media = await assetsById([...coverOf.values()]);
  return rows.map((r) => {
    const asset = media.get(coverOf.get(r.id) ?? -1);
    return {
    slug: r.slug,
    title: r.title,
    category: r.category,
    summary: r.summary,
    status: r.status,
    problem: opt(r.problem),
    approach: opt(r.approach),
    challenges: opt(r.challenges),
    results: opt(r.results),
    lessons: opt(r.lessons),
    hardware: r.hardware,
    software: r.software,
    image: asset ? toImage(asset, r.title) : PROJECT_IMAGES[r.slug],
    repoUrl: opt(r.repo_url),
    demoUrl: opt(r.demo_url),
    docsUrl: opt(r.docs_url),
    featured: r.featured,
    updatedAt: r.updated_at,
    };
  });
}

export async function getProject(slug: string) {
  return (await getProjects()).find((p) => p.slug === slug);
}

export async function getEducation(): Promise<Education[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("content", "education");
  const rows = must("education", await db().from("education").select("*").order("sort_order"));
  return rows.map((r) => ({
    institution: r.institution,
    qualification: r.qualification,
    location: r.location,
    start: r.start_date,
    end: r.end_date,
    grade: opt(r.grade),
    note: opt(r.note),
    coursework: r.coursework,
    achievements: r.achievements,
  }));
}

export async function getExperience(): Promise<Experience[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("content", "experience");
  const rows = must("experience", await db().from("experience").select("*").order("sort_order"));
  return rows.map((r) => ({
    organization: r.organization,
    role: r.role,
    employmentType: r.employment_type,
    location: r.location,
    start: r.start_date,
    end: r.end_date,
    points: r.responsibilities,
    achievements: r.achievements,
    technologies: r.technologies,
  }));
}

export async function getCertifications(): Promise<Certification[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("content", "certifications");
  const rows = must("certifications", await db().from("certifications").select("*").order("sort_order"));
  const ids = rows.map((r) => r.media_asset_id).filter((id): id is number => id !== null);
  const media = ids.length
    ? must("certificate files", await db().from("media_assets").select("id,path,mime_type,alt").in("id", ids))
    : [];
  const file = new Map(media.map((m) => [m.id, m]));
  return rows.map((r) => ({
    title: r.title,
    issuer: r.issuer,
    year: r.issued_year,
    category: r.category,
    kind: r.kind,
    description: r.description,
    credentialUrl: opt(r.credential_url),
    credentialId: opt(r.credential_id),
    certificate: r.media_asset_id && file.has(r.media_asset_id) ? toFile(file.get(r.media_asset_id)!, r.title) : undefined,
  }));
}

export async function getActivities(): Promise<Activity[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("content", "activities");
  const rows = must("activities", await db().from("activities").select("*").order("sort_order"));
  const media = await assetsById(rows.map((r) => r.cover_asset_id));
  return rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    date: r.occurred_on,
    location: r.location,
    category: r.category,
    summary: r.summary,
    story: opt(r.story),
    organizer: opt(r.organizer),
    externalUrl: opt(r.external_url),
    cover: r.cover_asset_id && media.has(r.cover_asset_id) ? toImage(media.get(r.cover_asset_id)!, r.title) : undefined,
  }));
}

export async function getSkills(): Promise<SkillGroup[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("content", "skills");
  const rows = must("skills", await db().from("skills").select("name,category,level").order("sort_order"));
  const groups = new Map<string, SkillGroup>();
  for (const r of rows) {
    const g = groups.get(r.category) ?? { name: r.category, items: [] };
    g.items.push({ label: r.name, level: opt(r.level) });
    groups.set(r.category, g);
  }
  return [...groups.values()];
}

export async function getNavigation(): Promise<NavItem[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("content", "navigation");
  const res = await db().from("navigation_items").select("label,href").order("sort_order");
  // Navigation must never take the page down: fall back to the core routes.
  if (res.error || !res.data?.length) {
    console.error("[content] navigation", res.error);
    return [
      { label: "Projects", href: "/projects" },
      { label: "Contact", href: "/#contact" },
    ];
  }
  return res.data;
}
