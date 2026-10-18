// Pure display helpers, safe on server and client.
import type { CredentialKind, ProjectStatus } from "./types";

export const statusLabel: Record<ProjectStatus, string> = {
  prototype: "Prototype",
  experiment: "Experiment",
  in_progress: "In progress",
  completed: "Completed",
};

export const credentialLabel: Record<CredentialKind, string> = {
  verified: "Certificate",
  informal: "Informal learning",
  in_progress: "In progress",
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "2025-09-01" -> "Sep 2025"; null -> "Present"
export function formatMonth(iso: string | null) {
  if (!iso) return "Present";
  const [y, m] = iso.split("-").map(Number);
  return `${months[m - 1]} ${y}`;
}

// "2025-09-01" -> "1 Sep 2025"
export function formatDay(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${months[m - 1]} ${y}`;
}
