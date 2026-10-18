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

// shortcut: media still ships from /public because Storage uploads need the admin CMS (Stage 5);
// move these into media_assets + project_media then.
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

export async function getProfile(): Promise<Profile> {
  "use cache";
  cacheLife("hours");
  cacheTag("content", "profile");
  const [p, links] = await Promise.all([
    db().from("profiles").select("*").eq("id", 1).single(),
    db().from("social_links").select("label,url").order("sort_order"),
  ]);
  const row = must("the profile", p);
  const github = (links.data ?? []).find((l) => l.url.startsWith("https://github.com/"));
  return {
    name: row.name,
    headline: row.headline,
    about: row.about,
    interests: row.interests,
    location: row.location,
    email: row.public_email,
    githubUrl: github?.url ?? null,
    cvUrl: CV_URL,
    portrait: PORTRAIT,
    languages: row.languages,
  };
}

export async function getProjects(): Promise<Project[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("content", "projects");
  const rows = must("projects", await db().from("projects").select("*").order("sort_order"));
  return rows.map((r) => ({
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
    image: PROJECT_IMAGES[r.slug],
    repoUrl: opt(r.repo_url),
    demoUrl: opt(r.demo_url),
    docsUrl: opt(r.docs_url),
    featured: r.featured,
    updatedAt: r.updated_at,
  }));
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
  return rows.map((r) => ({
    title: r.title,
    issuer: r.issuer,
    year: r.issued_year,
    category: r.category,
    kind: r.kind,
    description: r.description,
    credentialUrl: opt(r.credential_url),
    credentialId: opt(r.credential_id),
  }));
}

export async function getActivities(): Promise<Activity[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("content", "activities");
  const rows = must("activities", await db().from("activities").select("*").order("sort_order"));
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
