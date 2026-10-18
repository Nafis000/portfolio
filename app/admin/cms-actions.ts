"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getModule, type Module } from "@/lib/admin/modules";
import { firstErrors, moduleSchema, type FieldErrors } from "@/lib/admin/validate";
import { requireAdmin } from "@/lib/security/admin";

// Every action re-checks the admin on the server, and the database re-checks again through RLS.

// `values` echoes what was submitted on error, so the form can refill instead of losing edits.
export type SaveState = {
  status: "idle" | "saved" | "error";
  message?: string;
  errors?: FieldErrors;
  values?: Record<string, string>;
};

function moduleOr404(key: string): Module {
  const m = getModule(key);
  if (!m) throw new Error("Unknown module");
  return m;
}

function refresh(m: Module) {
  for (const tag of m.tags) updateTag(tag);
}

// Postgres errors mapped to plain language; raw messages are never shown.
function friendly(error: { code?: string; message?: string }, what: string) {
  if (error.code === "23505") return "Another entry already uses that value (the URL slug must be unique).";
  if (error.code === "23514") return "One of the values isn’t allowed. Check dates, links and lengths.";
  if (error.code === "23503") return "This is still used elsewhere, so it can’t be removed yet.";
  if (error.code === "42501") return "You don’t have permission to do that. Sign in again as the administrator.";
  console.error(`[cms] ${what}`, error.code, error.message);
  return `Couldn’t ${what}. Try again in a moment.`;
}

export async function saveRow(moduleKey: string, id: number | null, _prev: SaveState, form: FormData): Promise<SaveState> {
  const m = moduleOr404(moduleKey);
  const { supabase } = await requireAdmin();

  const raw = Object.fromEntries(m.fields.map((f) => [f.name, form.get(f.name) ?? ""]));
  if (m.publishable) raw.published = form.get("published") ?? "";
  const parsed = moduleSchema(m).safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Some fields need attention.",
      errors: firstErrors(parsed.error),
      values: Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, String(v)])),
    };
  }

  // Virtual field: a project's cover lives in project_media, not on the project row.
  const { cover_media_id: cover, ...row } = parsed.data as Record<string, unknown>;

  let savedId = id;
  if (m.singleton) {
    const { error } = await supabase.from(m.table).update(row).eq("id", 1);
    if (error) return { status: "error", message: friendly(error, "save the profile") };
  } else if (id === null) {
    // New rows go to the end of the list.
    const { data: last } = await supabase.from(m.table).select("sort_order").order("sort_order", { ascending: false }).limit(1);
    const sort_order = ((last?.[0]?.sort_order as number | undefined) ?? 0) + 1;
    const { data, error } = await supabase.from(m.table).insert({ ...row, sort_order }).select("id").single();
    if (error) return { status: "error", message: friendly(error, `create the ${m.singular}`) };
    savedId = data.id as number;
  } else {
    const { error } = await supabase.from(m.table).update(row).eq("id", id);
    if (error) return { status: "error", message: friendly(error, `save the ${m.singular}`) };
  }

  if (m.key === "projects" && savedId !== null) {
    const clear = await supabase.from("project_media").delete().eq("project_id", savedId).eq("is_cover", true);
    if (clear.error) return { status: "error", message: friendly(clear.error, "update the cover image") };
    if (cover) {
      const add = await supabase
        .from("project_media")
        .insert({ project_id: savedId, media_asset_id: cover, kind: "image", is_cover: true });
      if (add.error) return { status: "error", message: friendly(add.error, "set the cover image") };
    }
  }

  refresh(m);
  if (id === null && !m.singleton) redirect(`/admin/${m.key}/${savedId}?created=1`);
  return { status: "saved", message: "Saved. The public site shows the change on its next request." };
}

export async function deleteRow(moduleKey: string, id: number) {
  const m = moduleOr404(moduleKey);
  if (m.singleton) throw new Error("The profile can’t be deleted.");
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from(m.table).delete().eq("id", id);
  if (error) redirect(`/admin/${m.key}?error=${encodeURIComponent(friendly(error, `delete the ${m.singular}`))}`);
  refresh(m);
  redirect(`/admin/${m.key}?deleted=1`);
}

export async function setPublished(moduleKey: string, id: number, published: boolean) {
  const m = moduleOr404(moduleKey);
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from(m.table).update({ published }).eq("id", id);
  if (error) redirect(`/admin/${m.key}?error=${encodeURIComponent(friendly(error, "change publishing"))}`);
  refresh(m);
}

const ids = z.array(z.number().int().positive()).min(1).max(500);

export async function moveRow(moduleKey: string, id: number, direction: "up" | "down") {
  const m = moduleOr404(moduleKey);
  if (!m.orderable) return;
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.from(m.table).select("id").order("sort_order").order("id");
  if (error || !data) return;
  const order = data.map((r) => r.id as number);
  const i = order.indexOf(id);
  const j = direction === "up" ? i - 1 : i + 1;
  if (i < 0 || j < 0 || j >= order.length) return;
  [order[i], order[j]] = [order[j], order[i]];
  // One statement in the database: no half-applied orders, no collisions.
  const res = await supabase.rpc("reorder_rows", { p_table: m.table, p_ids: ids.parse(order) });
  if (res.error) redirect(`/admin/${m.key}?error=${encodeURIComponent(friendly(res.error, "reorder"))}`);
  refresh(m);
}

// ───────── Media library ─────────

const MEDIA_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/svg+xml",
  "video/mp4",
  "video/webm",
  "application/pdf",
  "model/gltf-binary",
] as const;

const mediaInput = z.object({
  path: z.string().regex(/^[a-z]+\/[a-z0-9-]+\.[a-z0-9]+$/, "Invalid storage path."),
  mime_type: z.enum(MEDIA_TYPES, "That file type isn’t allowed."),
  byte_size: z.number().int().positive().max(20 * 1024 * 1024, "Files must be 20 MB or smaller."),
  alt: z.string().trim().max(500),
  width: z.number().int().positive().nullable(),
  height: z.number().int().positive().nullable(),
});

// The browser uploads straight to Storage (admin-only by policy); this records the file's metadata.
export async function registerMedia(input: z.input<typeof mediaInput>) {
  const { supabase } = await requireAdmin();
  const parsed = mediaInput.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid file." };

  const folder = parsed.data.path.split("/")[0];
  const name = parsed.data.path.slice(folder.length + 1);
  const { data: found } = await supabase.storage.from("media").list(folder, { search: name, limit: 1 });
  if (!found?.some((o) => o.name === name)) return { error: "The upload didn’t arrive. Try again." };

  const { error } = await supabase.from("media_assets").insert(parsed.data);
  if (error) return { error: friendly(error, "save the file details") };
  updateTag("content");
  return { error: null };
}

export async function deleteMedia(id: number) {
  const { supabase } = await requireAdmin();
  const { data: asset } = await supabase.from("media_assets").select("path").eq("id", id).single();
  // Deleting the row first: the database refuses while any content still references the file.
  const { error } = await supabase.from("media_assets").delete().eq("id", id);
  if (error) {
    redirect(
      `/admin/media?error=${encodeURIComponent(
        error.code === "23503" ? "That file is still used by some content. Remove it there first." : friendly(error, "delete the file"),
      )}`,
    );
  }
  if (asset?.path) await supabase.storage.from("media").remove([asset.path as string]);
  updateTag("content");
  redirect("/admin/media?deleted=1");
}

export async function updateMediaAlt(id: number, form: FormData) {
  const { supabase } = await requireAdmin();
  const alt = z.string().trim().max(500).safeParse(form.get("alt"));
  if (!alt.success) return;
  await supabase.from("media_assets").update({ alt: alt.data }).eq("id", id);
  updateTag("content");
}

// ───────── Contact messages ─────────

export async function setHandled(id: number, handled: boolean) {
  const { supabase } = await requireAdmin();
  await supabase.from("contact_messages").update({ handled }).eq("id", id);
}

export async function deleteMessage(id: number) {
  const { supabase } = await requireAdmin();
  await supabase.from("contact_messages").delete().eq("id", id);
  redirect("/admin/messages?deleted=1");
}
