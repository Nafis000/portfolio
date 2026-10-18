// Public content queries. Async on purpose: Stage 3 replaces the seed import with Supabase reads.
import * as seed from "./seed";
import type { ProjectStatus } from "./types";

export const getProfile = async () => seed.profile;
export const getProjects = async () => [...seed.projects].sort((a, b) => a.sortOrder - b.sortOrder);
export const getProject = async (slug: string) => seed.projects.find((p) => p.slug === slug);
export const getEducation = async () => seed.education;
export const getExperience = async () => seed.experience;
export const getCertifications = async () => seed.certifications;
export const getSkills = async () => seed.skills;

export const statusLabel: Record<ProjectStatus, string> = {
  prototype: "Prototype",
  experiment: "Experiment",
  in_progress: "In progress",
  completed: "Completed",
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export function formatMonth(iso: string | null) {
  if (!iso) return "Present";
  const [y, m] = iso.split("-").map(Number);
  return `${months[m - 1]} ${y}`;
}
