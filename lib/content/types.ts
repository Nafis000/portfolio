// App-facing content shapes, mapped from the Supabase rows in lib/content/index.ts.
import type { CredentialKind, ProjectStatus } from "@/types/database";

export type { CredentialKind, ProjectStatus };

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  status: ProjectStatus | null; // null = owner has not stated it; UI shows "Status TBC"
  problem?: string;
  approach?: string;
  challenges?: string;
  results?: string;
  lessons?: string;
  hardware: string[];
  software: string[];
  image?: { src: string; alt: string; width: number; height: number };
  repoUrl?: string;
  demoUrl?: string;
  docsUrl?: string;
  featured: boolean;
  updatedAt: string;
};

export type Education = {
  institution: string;
  qualification: string;
  location: string | null;
  start: string; // ISO date
  end: string | null; // null = current
  grade?: string;
  note?: string;
  coursework: string[];
  achievements: string[];
};

export type Experience = {
  organization: string;
  role: string;
  employmentType: string;
  location: string | null;
  start: string;
  end: string | null;
  points: string[];
  achievements: string[];
  technologies: string[];
};

export type Certification = {
  title: string;
  issuer: string;
  year: number;
  category: string | null;
  kind: CredentialKind;
  description: string | null;
  credentialUrl?: string;
  credentialId?: string;
  certificate?: { url: string; mimeType: string; alt: string }; // the certificate file, from Storage
};

export type Activity = {
  slug: string;
  title: string;
  date: string;
  location: string | null;
  category: string;
  summary: string;
  story?: string;
  organizer?: string;
  externalUrl?: string;
  cover?: { src: string; alt: string; width: number; height: number };
};

export type SkillGroup = { name: string; items: { label: string; level?: string }[] };

export type NavItem = { label: string; href: string };

export type Profile = {
  name: string;
  headline: string;
  about: string;
  interests: string[];
  location: string | null;
  email: string | null;
  githubUrl: string | null;
  cvUrl: string;
  portrait: { src: string; alt: string };
  languages: string | null;
};
