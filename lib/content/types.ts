// Shapes mirror the planned Supabase tables so Stage 3 can swap the source without touching UI.

export type ProjectStatus = "prototype" | "experiment" | "in_progress" | "completed";

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  status: ProjectStatus | null; // null = owner has not stated it; UI shows nothing rather than guessing
  problem?: string;
  approach?: string;
  hardware: string[];
  software: string[];
  image?: { src: string; alt: string; width: number; height: number };
  repoUrl?: string;
  featured: boolean;
  sortOrder: number;
};

export type Education = {
  institution: string;
  qualification: string;
  location: string;
  start: string; // ISO yyyy-mm
  end: string | null; // null = current
  grade?: string;
  note?: string;
};

export type Experience = {
  organization: string;
  role: string;
  start: string;
  end: string | null;
  points: string[];
};

export type Certification = {
  title: string;
  issuer: string;
  year: string;
  description: string;
  credentialUrl?: string;
};

export type SkillGroup = { name: string; items: { label: string; level?: string }[] };

export type Profile = {
  name: string;
  headline: string;
  about: string;
  interests: string[];
  email: string;
  githubUrl: string;
  cvUrl: string;
  portrait: { src: string; alt: string };
  languages: string;
};
