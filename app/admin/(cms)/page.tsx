import Link from "next/link";
import { Suspense } from "react";
import { Loading, PageHead, panel } from "@/components/admin/ui";
import { MODULES } from "@/lib/admin/modules";
import { requireAdmin } from "@/lib/security/admin";

export default function AdminOverview() {
  return (
    <Suspense fallback={<Loading />}>
      <Overview />
    </Suspense>
  );
}

async function Overview() {
  const { supabase, email } = await requireAdmin();
  const rows = await Promise.all([
    ...MODULES.filter((m) => !m.singleton).map(async (m) => {
      const [all, drafts] = await Promise.all([
        supabase.from(m.table).select("*", { count: "exact", head: true }),
        supabase.from(m.table).select("*", { count: "exact", head: true }).eq("published", false),
      ]);
      return { href: `/admin/${m.key}`, label: m.label, total: all.count, note: drafts.count ? `${drafts.count} draft` : "" };
    }),
    (async () => {
      const [all, open] = await Promise.all([
        supabase.from("contact_messages").select("*", { count: "exact", head: true }),
        supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("handled", false),
      ]);
      return { href: "/admin/messages", label: "Messages", total: all.count, note: open.count ? `${open.count} unread` : "" };
    })(),
  ]);

  return (
    <div className={panel}>
      <PageHead title="Overview" />
      <p className="px-6 pt-5 text-ink-dim">Signed in as {email}. Changes you save here go live on the next page request.</p>
      <table className="mt-4 w-full text-left">
        <caption className="sr-only">Records per section, including drafts</caption>
        <thead>
          <tr className="border-y border-ink font-display text-sm uppercase tracking-[0.1em] text-ink-dim">
            <th scope="col" className="px-6 py-3 font-semibold">Section</th>
            <th scope="col" className="px-6 py-3 font-semibold">Status</th>
            <th scope="col" className="px-6 py-3 text-right font-semibold">Records</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.href} className="border-b border-sheet-line">
              <td className="px-6 py-3 text-lg">
                <Link href={r.href} className="underline-offset-4 hover:underline">
                  {r.label}
                </Link>
              </td>
              <td className="px-6 py-3 text-ink-dim">{r.note}</td>
              <td className="px-6 py-3 text-right font-mono tabular-nums">{r.total ?? "–"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
