import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { deleteRow, moveRow, setPublished } from "@/app/admin/cms-actions";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { ListFilter } from "@/components/admin/ListFilter";
import { Loading, Notice, PageHead, btn, panel } from "@/components/admin/ui";
import { Arrow } from "@/components/ui/Arrow";
import { getModule } from "@/lib/admin/modules";
import { requireAdmin } from "@/lib/security/admin";

export default function ModuleListPage(props: PageProps<"/admin/[module]">) {
  return (
    <Suspense fallback={<Loading />}>
      <ModuleList {...props} />
    </Suspense>
  );
}

async function ModuleList({ params, searchParams }: PageProps<"/admin/[module]">) {
  const m = getModule((await params).module);
  if (!m) notFound();
  if (m.singleton) redirect(`/admin/${m.key}/1`);
  const { supabase } = await requireAdmin();
  const sp = await searchParams;

  const { data: rows, error } = await supabase
    .from(m.table)
    .select("*")
    .order(m.orderable ? "sort_order" : "id")
    .order("id");

  const listId = `list-${m.key}`;
  const small = "inline-flex size-8 items-center justify-center border border-ink/40 hover:bg-ink hover:text-sheet disabled:opacity-30";

  return (
    <div className={panel}>
      <PageHead title={m.label}>
        <Link href={`/admin/${m.key}/new`} className={btn}>
          New {m.singular}
        </Link>
      </PageHead>
      {sp.deleted && <Notice tone="ok">Deleted.</Notice>}
      {typeof sp.error === "string" && <Notice tone="error">{sp.error}</Notice>}
      {error && <Notice tone="error">Couldn’t load this list. Refresh to try again.</Notice>}

      {rows && rows.length > 0 && <ListFilter key={rows.length} targetId={listId} total={rows.length} />}

      {rows && rows.length === 0 ? (
        <p className="px-6 py-10 text-lg text-ink-dim">
          Nothing here yet. <Link href={`/admin/${m.key}/new`} className="underline">Add the first {m.singular}</Link>.
        </p>
      ) : (
        <ol id={listId} className="mt-4 border-t border-sheet-line">
          {rows?.map((r, i) => {
            const title = String(r[m.titleField] ?? "Untitled");
            const sub = m.subtitle?.(r) ?? "";
            return (
              <li
                key={r.id}
                data-search={`${title} ${sub}`.toLowerCase()}
                className="flex flex-wrap items-center gap-4 border-b border-sheet-line px-6 py-3"
              >
                {m.orderable && (
                  <div className="flex gap-1">
                    <form action={moveRow.bind(null, m.key, r.id, "up")}>
                      <button type="submit" disabled={i === 0} className={small} aria-label={`Move ${title} up`}>
                        <Arrow className="-rotate-90" />
                      </button>
                    </form>
                    <form action={moveRow.bind(null, m.key, r.id, "down")}>
                      <button type="submit" disabled={i === rows.length - 1} className={small} aria-label={`Move ${title} down`}>
                        <Arrow className="rotate-90" />
                      </button>
                    </form>
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <Link href={`/admin/${m.key}/${r.id}`} className="text-lg font-semibold underline-offset-4 hover:underline">
                    {title}
                  </Link>
                  {sub && <p className="truncate text-sm text-ink-dim">{sub}</p>}
                </div>
                {m.publishable && (
                  <form action={setPublished.bind(null, m.key, r.id, !r.published)}>
                    <button
                      type="submit"
                      className={`border px-3 py-1 font-display text-xs font-semibold uppercase tracking-[0.1em] ${
                        r.published ? "border-mat bg-mat text-chalk" : "border-dashed border-ink-dim text-ink-dim"
                      }`}
                      aria-label={`${title} is ${r.published ? "published" : "a draft"}. ${r.published ? "Unpublish" : "Publish"}`}
                    >
                      {r.published ? "Published" : "Draft"}
                    </button>
                  </form>
                )}
                <ConfirmButton
                  action={deleteRow.bind(null, m.key, r.id)}
                  label="Delete"
                  confirmLabel={`Delete “${title}”`}
                  className={btn}
                />
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
