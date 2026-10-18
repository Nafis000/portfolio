"use client";

import { useMemo, useState } from "react";
import { credentialLabel } from "@/lib/content/format";
import type { Certification } from "@/lib/content/types";

type Sort = "newest" | "oldest" | "title";

export function CertificationArchive({ items }: { items: Certification[] }) {
  const categories = useMemo(
    () => [...new Set(items.map((c) => c.category ?? "Other verified learning"))],
    [items],
  );
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("newest");

  const shown = useMemo(() => {
    const list = items.filter((c) => !category || (c.category ?? "Other verified learning") === category);
    return list.sort((a, b) =>
      sort === "title" ? a.title.localeCompare(b.title) : sort === "newest" ? b.year - a.year : a.year - b.year,
    );
  }, [items, category, sort]);

  const chip = (active: boolean) =>
    `border px-3 py-1.5 font-display text-sm font-semibold uppercase tracking-[0.08em] transition-colors ${
      active ? "border-copper bg-copper text-ink" : "border-chalk/40 text-chalk-dim hover:border-chalk hover:text-chalk"
    }`;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-chalk/25 pb-6">
        <fieldset>
          <legend className="sr-only">Filter by category</legend>
          <div className="flex flex-wrap gap-2">
            <button type="button" aria-pressed={!category} onClick={() => setCategory(null)} className={chip(!category)}>
              All ({items.length})
            </button>
            {categories.map((c) => (
              <button key={c} type="button" aria-pressed={category === c} onClick={() => setCategory(c)} className={chip(category === c)}>
                {c}
              </button>
            ))}
          </div>
        </fieldset>
        <label className="flex items-center gap-3 text-chalk-dim">
          <span className="font-display text-sm font-semibold uppercase tracking-[0.1em]">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="border border-chalk/40 bg-mat-deep px-3 py-1.5 text-chalk"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="title">Title A–Z</option>
          </select>
        </label>
      </div>

      <p aria-live="polite" className="sr-only">
        Showing {shown.length} of {items.length}
      </p>

      <ol className="mt-10 grid gap-px bg-chalk/20 md:grid-cols-2 xl:grid-cols-3">
        {shown.map((c) => (
          <li key={c.title} className="flex flex-col gap-3 bg-mat-deep p-7">
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-mono text-sm tabular-nums text-copper">{c.year}</p>
              <p
                className={`font-display text-xs font-semibold uppercase tracking-[0.12em] ${
                  c.kind === "verified" ? "text-chalk-dim" : "border border-dashed border-chalk/40 px-2 py-0.5 text-chalk-dim"
                }`}
              >
                {credentialLabel[c.kind]}
              </p>
            </div>
            <h2 className="text-2xl font-bold uppercase leading-tight text-chalk">{c.title}</h2>
            <p className="text-chalk-dim">{c.issuer}</p>
            {c.description && <p className="leading-relaxed text-chalk-dim">{c.description}</p>}
            {c.category && <p className="mt-auto pt-3 font-hand text-copper">{c.category}</p>}
            {c.credentialUrl && (
              <a href={c.credentialUrl} className="font-display font-semibold uppercase tracking-[0.08em] text-chalk underline underline-offset-4">
                View credential{c.credentialId ? ` · ${c.credentialId}` : ""}
              </a>
            )}
          </li>
        ))}
      </ol>
    </>
  );
}
