import { Suspense } from "react";
import { requireAdmin } from "@/lib/security/admin";
import { signOut } from "./actions";

const MODULES = [
  { table: "projects", label: "Projects" },
  { table: "education", label: "Education" },
  { table: "experience", label: "Experience" },
  { table: "certifications", label: "Certifications" },
  { table: "skills", label: "Skills" },
  { table: "activities", label: "Activities" },
  { table: "contact_messages", label: "Contact messages" },
] as const;

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="mx-auto min-h-96 max-w-4xl bg-sheet/90" aria-busy="true" />}>
      <Dashboard />
    </Suspense>
  );
}

async function Dashboard() {
  const { supabase, email } = await requireAdmin();
  const counts = await Promise.all(
    MODULES.map(async (m) => {
      const { count, error } = await supabase.from(m.table).select("*", { count: "exact", head: true });
      return { ...m, count: error ? null : count };
    }),
  );

  return (
    <div className="mx-auto max-w-4xl bg-sheet text-ink shadow-[0_30px_60px_-28px_rgb(5_20_14/0.85),0_2px_6px_rgb(5_20_14/0.25)]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-ink px-7 py-6">
        <div>
          <h1 className="text-4xl font-bold uppercase leading-none">Content desk</h1>
          <p className="mt-2 text-ink-dim">Signed in as {email}</p>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="border-2 border-ink px-5 py-2.5 font-display font-semibold uppercase tracking-[0.08em] hover:bg-ink hover:text-sheet"
          >
            Sign out
          </button>
        </form>
      </div>
      <table className="w-full text-left">
        <caption className="sr-only">Records per content module, including drafts</caption>
        <thead>
          <tr className="border-b border-ink font-display text-sm uppercase tracking-[0.1em] text-ink-dim">
            <th scope="col" className="px-7 py-3 font-semibold">Module</th>
            <th scope="col" className="px-7 py-3 text-right font-semibold">Records</th>
          </tr>
        </thead>
        <tbody>
          {counts.map((m) => (
            <tr key={m.table} className="border-b border-sheet-line">
              <td className="px-7 py-3 text-lg">{m.label}</td>
              <td className="px-7 py-3 text-right font-mono tabular-nums">{m.count ?? "–"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-7 py-6 text-ink-dim">
        Editing, publishing, media upload and reordering arrive with the CMS. Until then, content changes go through
        database migrations.
      </p>
    </div>
  );
}
