"use client";

import { useMemo, useState } from "react";
import { credentialLabel } from "@/lib/content/format";
import { CertificateViewer, useCertificateViewer } from "./CertificateViewer";
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
          <CertificateCard key={c.title} cert={c} />
        ))}
      </ol>
    </>
  );
}

const action =
  "inline-flex items-center justify-center border px-4 py-2 font-display text-sm font-semibold uppercase tracking-[0.08em] transition-colors";
const enabled = "border-chalk/60 text-chalk hover:border-copper hover:bg-copper hover:text-ink";
const disabled = "cursor-not-allowed border-dashed border-chalk/25 text-chalk-dim/70";

function CertificateCard({ cert: c }: { cert: Certification }) {
  const viewer = useCertificateViewer();
  const hasFile = Boolean(c.certificate);
  const label = credentialLabel[c.kind];

  return (
    <li className="flex flex-col gap-3 bg-mat-deep p-7">
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-mono text-sm tabular-nums text-copper">{c.year}</p>
        {hasFile ? (
          <button
            type="button"
            onClick={viewer.open}
            className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-chalk underline decoration-chalk/40 underline-offset-4 hover:text-copper hover:decoration-copper"
          >
            {label}
            <span className="sr-only">: show {c.title}</span>
          </button>
        ) : (
          <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-chalk-dim">{label}</p>
        )}
      </div>
      <h2 className="text-2xl font-bold uppercase leading-tight text-chalk">{c.title}</h2>
      <p className="text-chalk-dim">{c.issuer}</p>
      {c.description && <p className="leading-relaxed text-chalk-dim">{c.description}</p>}
      {c.category && <p className="pt-1 font-hand text-copper">{c.category}</p>}

      <div className="mt-auto flex flex-wrap gap-2 pt-4">
        {hasFile ? (
          <button type="button" onClick={viewer.open} className={`${action} ${enabled}`}>
            Show certificate
          </button>
        ) : (
          <span aria-disabled="true" title="Certificate file not added yet" className={`${action} ${disabled}`}>
            Show certificate
          </span>
        )}
        {c.credentialUrl ? (
          <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer" className={`${action} ${enabled}`}>
            Verify credential<span className="sr-only"> for {c.title} (opens in a new tab)</span>
          </a>
        ) : (
          <span aria-disabled="true" title="Verification link not added yet" className={`${action} ${disabled}`}>
            Verify credential
          </span>
        )}
      </div>
      {(!hasFile || !c.credentialUrl) && (
        <p className="text-sm text-chalk-dim/80">
          {!hasFile && !c.credentialUrl
            ? "Certificate file and verification link not added yet."
            : !hasFile
              ? "Certificate file not added yet."
              : "Verification link not added yet."}
        </p>
      )}
      {c.credentialId && <p className="font-mono text-xs text-chalk-dim">ID {c.credentialId}</p>}

      {hasFile && <CertificateViewer cert={c} dialogRef={viewer.ref} onClose={viewer.close} />}
    </li>
  );
}
