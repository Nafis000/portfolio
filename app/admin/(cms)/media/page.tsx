import { Suspense } from "react";
import { deleteMedia, updateMediaAlt } from "@/app/admin/cms-actions";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { Loading, Notice, PageHead, btn, panel } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/security/admin";

export default function MediaPage(props: PageProps<"/admin/media">) {
  return (
    <Suspense fallback={<Loading />}>
      <MediaLibrary {...props} />
    </Suspense>
  );
}

const publicUrl = (path: string) =>
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/${path.split("/").map(encodeURIComponent).join("/")}`;

async function MediaLibrary({ searchParams }: PageProps<"/admin/media">) {
  const { supabase } = await requireAdmin();
  const sp = await searchParams;
  const { data: assets } = await supabase.from("media_assets").select("*").order("created_at", { ascending: false });

  return (
    <div className={panel}>
      <PageHead title="Media library" />
      {sp.deleted && <Notice tone="ok">File deleted.</Notice>}
      {typeof sp.error === "string" && <Notice tone="error">{sp.error}</Notice>}
      <MediaUploader />
      {!assets?.length ? (
        <p className="border-t border-sheet-line px-6 py-10 text-lg text-ink-dim">No files yet. Upload the first one above.</p>
      ) : (
        <ul className="grid gap-px border-t border-sheet-line bg-sheet-line sm:grid-cols-2 xl:grid-cols-3">
          {assets.map((a) => {
            const url = publicUrl(a.path);
            const isImage = String(a.mime_type).startsWith("image/");
            return (
              <li key={a.id} className="flex flex-col gap-3 bg-sheet p-5">
                <div className="grid aspect-[4/3] place-items-center overflow-hidden border border-sheet-line bg-white">
                  {isImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={url} alt={a.alt || ""} className="max-h-full w-auto object-contain" loading="lazy" />
                  ) : (
                    <span className="font-mono text-sm uppercase text-ink-dim">{String(a.mime_type).split("/")[1]}</span>
                  )}
                </div>
                <p className="break-all font-mono text-xs text-ink-dim">{a.path}</p>
                <form action={updateMediaAlt.bind(null, a.id)} className="flex gap-2">
                  <label htmlFor={`alt-${a.id}`} className="sr-only">
                    Description for {a.path}
                  </label>
                  <input
                    id={`alt-${a.id}`}
                    name="alt"
                    defaultValue={a.alt}
                    maxLength={500}
                    placeholder="Describe the file"
                    className="min-w-0 flex-1 border border-ink/40 bg-white px-2 py-1 text-sm"
                  />
                  <button type="submit" className="text-sm underline underline-offset-4">
                    Save
                  </button>
                </form>
                <div className="flex items-center justify-between gap-3">
                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-4">
                    Open
                  </a>
                  <ConfirmButton action={deleteMedia.bind(null, a.id)} label="Delete" confirmLabel="Delete file" className={btn} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
