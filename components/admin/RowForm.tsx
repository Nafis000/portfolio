"use client";

import { useActionState, useEffect, useState } from "react";
import type { Field } from "@/lib/admin/modules";
import type { SaveState } from "@/app/admin/cms-actions";
import { btnPrimary } from "./ui";

export type MediaOption = { id: number; path: string; mime_type: string; alt: string };

const input =
  "mt-1.5 block w-full border-2 border-ink bg-white px-3 py-2 text-ink outline-none focus:shadow-[0_0_0_3px_var(--color-copper)]";

function toValue(v: unknown, f: Field) {
  if (v === null || v === undefined) return "";
  if (f.type === "list" && Array.isArray(v)) return v.join("\n");
  return String(v);
}

export function RowForm({
  fields,
  row,
  publishable,
  media,
  action,
  cancelHref,
}: {
  fields: Field[];
  row: Record<string, unknown> | null;
  publishable: boolean;
  media: MediaOption[];
  action: (prev: SaveState, form: FormData) => Promise<SaveState>;
  cancelHref: string;
}) {
  const [state, formAction, pending] = useActionState(action, { status: "idle" });
  const [dirty, setDirty] = useState(false);
  const errors = state.errors ?? {};
  // After a failed save, refill from what was submitted; otherwise from the stored row.
  const source: Record<string, unknown> | null = state.values ?? row;
  const checked = (name: string) => (state.values ? state.values[name] === "on" : row?.[name] === true);

  // Warn before leaving with unsaved edits.
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  // A successful save makes the form clean again.
  const [lastState, setLastState] = useState(state);
  if (state !== lastState) {
    setLastState(state);
    if (state.status === "saved") setDirty(false);
  }

  return (
    <form action={formAction} onChange={() => setDirty(true)} className="px-6 py-6" noValidate>
      {state.message && (
        <p
          role={state.status === "error" ? "alert" : "status"}
          className={`mb-6 px-4 py-3 ${state.status === "error" ? "bg-copper-deep text-sheet" : "bg-mat text-chalk"}`}
        >
          {state.message}
        </p>
      )}

      <div className="grid gap-x-6 gap-y-5 md:grid-cols-2">
        {fields.map((f) => {
          const id = `f-${f.name}`;
          const err = errors[f.name];
          const describedBy = [err && `${id}-err`, f.help && `${id}-help`].filter(Boolean).join(" ") || undefined;
          const common = {
            id,
            name: f.name,
            "aria-invalid": Boolean(err),
            "aria-describedby": describedBy,
          };
          const value = toValue(source?.[f.name], f);

          return (
            <div key={f.name} className={f.wide || f.type === "textarea" || f.type === "list" ? "md:col-span-2" : ""}>
              {f.type === "boolean" ? (
                <label className="flex items-center gap-3">
                  <input type="checkbox" {...common} defaultChecked={checked(f.name)} className="size-5 accent-ink" />
                  <span className="font-semibold">{f.label}</span>
                </label>
              ) : (
                <>
                  <label htmlFor={id} className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-ink-dim">
                    {f.label}
                    {f.required && <span aria-hidden> *</span>}
                  </label>
                  {f.type === "textarea" || f.type === "list" ? (
                    <textarea {...common} defaultValue={value} rows={f.type === "list" ? 4 : 5} className={`${input} resize-y`} />
                  ) : f.type === "select" ? (
                    <select {...common} defaultValue={value} className={input}>
                      {(f.options ?? []).map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  ) : f.type === "media" ? (
                    <select {...common} defaultValue={value} className={input}>
                      <option value="">None</option>
                      {media.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.path.split("/").pop()} ({m.mime_type.split("/")[1]})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      {...common}
                      type={f.type === "date" ? "date" : f.type === "number" ? "number" : f.type === "email" ? "email" : f.type === "url" ? "url" : "text"}
                      defaultValue={value}
                      maxLength={f.max}
                      className={input}
                    />
                  )}
                </>
              )}
              {f.help && (
                <p id={`${id}-help`} className="mt-1 text-sm text-ink-dim">
                  {f.help}
                </p>
              )}
              {err && (
                <p id={`${id}-err`} className="mt-1 text-sm font-semibold text-copper-deep">
                  {err}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-sheet-line pt-6">
        {publishable && (
          <label className="flex items-center gap-3">
            <input type="checkbox" name="published" defaultChecked={checked("published")} className="size-5 accent-ink" />
            <span className="font-semibold">Published</span>
            <span className="text-sm text-ink-dim">(unticked = draft, hidden from visitors)</span>
          </label>
        )}
        <div className="ml-auto flex items-center gap-4">
          <a
            href={cancelHref}
            onClick={(e) => {
              if (dirty && !confirm("Discard your unsaved changes?")) e.preventDefault();
            }}
            className="underline underline-offset-4"
          >
            Cancel
          </a>
          <button type="submit" disabled={pending} className={btnPrimary}>
            {pending ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
}
