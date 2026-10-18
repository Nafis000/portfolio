"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerMedia } from "@/app/admin/cms-actions";
import { createClient } from "@/lib/supabase/client";
import { btnPrimary } from "./ui";

const ACCEPT = "image/png,image/jpeg,image/webp,image/avif,image/gif,image/svg+xml,video/mp4,video/webm,application/pdf,model/gltf-binary";
const MAX = 20 * 1024 * 1024;
const FOLDERS = [
  { value: "projects", label: "Projects" },
  { value: "certificates", label: "Certificates" },
  { value: "activities", label: "Activities" },
  { value: "profile", label: "Profile (portrait, CV)" },
];

function imageSize(file: File): Promise<{ width: number | null; height: number | null }> {
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") return Promise.resolve({ width: null, height: null });
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth || null, height: img.naturalHeight || null });
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => resolve({ width: null, height: null });
    img.src = URL.createObjectURL(file);
  });
}

// Uploads go browser -> Supabase Storage directly (no server size limit); Storage policies allow admins only.
export function MediaUploader() {
  const router = useRouter();
  const [status, setStatus] = useState<{ tone: "ok" | "error"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function upload(form: FormData) {
    const file = form.get("file");
    const folder = String(form.get("folder"));
    const alt = String(form.get("alt") ?? "");
    if (!(file instanceof File) || file.size === 0) return setStatus({ tone: "error", text: "Choose a file to upload." });
    if (file.size > MAX) return setStatus({ tone: "error", text: "Files must be 20 MB or smaller." });
    if (!ACCEPT.split(",").includes(file.type)) return setStatus({ tone: "error", text: "That file type isn’t allowed." });

    setBusy(true);
    setStatus(null);
    const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
    const base = file.name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "file";
    const path = `${folder}/${base}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

    const { error } = await createClient().storage.from("media").upload(path, file, { contentType: file.type, upsert: false });
    if (error) {
      setBusy(false);
      return setStatus({ tone: "error", text: "Upload failed. Check you’re still signed in, then try again." });
    }
    const size = await imageSize(file);
    const res = await registerMedia({ path, mime_type: file.type as never, byte_size: file.size, alt, ...size });
    setBusy(false);
    if (res.error) return setStatus({ tone: "error", text: res.error });
    setStatus({ tone: "ok", text: `Uploaded ${file.name}. You can now choose it in any form.` });
    router.refresh();
  }

  return (
    <form action={upload} className="grid gap-4 px-6 py-6 md:grid-cols-[1fr_1fr_auto] md:items-end">
      <div>
        <label htmlFor="m-file" className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-ink-dim">
          File (max 20 MB)
        </label>
        <input id="m-file" name="file" type="file" accept={ACCEPT} required className="mt-1.5 block w-full" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="m-folder" className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-ink-dim">
            Folder
          </label>
          <select id="m-folder" name="folder" className="mt-1.5 block w-full border-2 border-ink bg-white px-3 py-2">
            {FOLDERS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="m-alt" className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-ink-dim">
            Description (alt text)
          </label>
          <input id="m-alt" name="alt" maxLength={500} className="mt-1.5 block w-full border-2 border-ink bg-white px-3 py-2" />
        </div>
      </div>
      <button type="submit" disabled={busy} className={btnPrimary}>
        {busy ? "Uploading…" : "Upload"}
      </button>
      {status && (
        <p role={status.tone === "error" ? "alert" : "status"} className={`md:col-span-3 ${status.tone === "error" ? "text-copper-deep" : ""}`}>
          {status.text}
        </p>
      )}
    </form>
  );
}
