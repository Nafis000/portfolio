import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { saveRow } from "@/app/admin/cms-actions";
import { RowForm } from "@/components/admin/RowForm";
import { Loading, Notice, PageHead, panel } from "@/components/admin/ui";
import { getModule } from "@/lib/admin/modules";
import { requireAdmin } from "@/lib/security/admin";

// Handles both /admin/<module>/new and /admin/<module>/<id>.
export default function EditPage(props: PageProps<"/admin/[module]/[id]">) {
  return (
    <Suspense fallback={<Loading />}>
      <Editor {...props} />
    </Suspense>
  );
}

async function Editor({ params, searchParams }: PageProps<"/admin/[module]/[id]">) {
  const { module, id: rawId } = await params;
  const m = getModule(module);
  if (!m) notFound();
  const isNew = rawId === "new";
  const id = isNew ? null : Number(rawId);
  if (!isNew && (!Number.isInteger(id) || (id as number) < 1)) notFound();
  if (isNew && m.singleton) notFound();

  const { supabase } = await requireAdmin();
  const [rowRes, mediaRes, coverRes] = await Promise.all([
    isNew ? Promise.resolve({ data: null }) : supabase.from(m.table).select("*").eq("id", id!).maybeSingle(),
    supabase.from("media_assets").select("id,path,mime_type,alt").order("created_at", { ascending: false }),
    m.key === "projects" && !isNew
      ? supabase.from("project_media").select("media_asset_id").eq("project_id", id!).eq("is_cover", true).maybeSingle()
      : Promise.resolve({ data: null }),
  ]);
  if (!isNew && !rowRes.data) notFound();

  const row = rowRes.data ? { ...rowRes.data, cover_media_id: coverRes.data?.media_asset_id ?? null } : isNew ? { published: false } : null;
  const title = isNew ? `New ${m.singular}` : String(row?.[m.titleField] ?? m.singular);
  const created = (await searchParams).created;

  return (
    <div className={panel}>
      <PageHead title={title}>
        {!m.singleton && (
          <Link href={`/admin/${m.key}`} className="underline underline-offset-4">
            All {m.label.toLowerCase()}
          </Link>
        )}
      </PageHead>
      {created && <Notice tone="ok">Created. It stays hidden from visitors until you tick Published.</Notice>}
      <RowForm
        fields={m.fields}
        row={row}
        publishable={m.publishable}
        media={mediaRes.data ?? []}
        action={saveRow.bind(null, m.key, id)}
        cancelHref={m.singleton ? "/admin" : `/admin/${m.key}`}
      />
    </div>
  );
}
