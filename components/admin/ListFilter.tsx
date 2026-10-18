"use client";

import { useState } from "react";

// Client-side search over a server-rendered list: rows carry data-search text.
export function ListFilter({ targetId, total }: { targetId: string; total: number }) {
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(total);

  function filter(value: string) {
    setQ(value);
    const needle = value.trim().toLowerCase();
    let n = 0;
    document.querySelectorAll<HTMLElement>(`#${targetId} [data-search]`).forEach((row) => {
      const hit = !needle || (row.dataset.search ?? "").includes(needle);
      row.hidden = !hit;
      if (hit) n++;
    });
    setShown(n);
  }

  return (
    <div className="flex items-center gap-3 px-6 pt-5">
      <label htmlFor="list-search" className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-ink-dim">
        Search
      </label>
      <input
        id="list-search"
        type="search"
        value={q}
        onChange={(e) => filter(e.target.value)}
        className="w-full max-w-sm border-2 border-ink bg-white px-3 py-1.5 outline-none focus:shadow-[0_0_0_3px_var(--color-copper)]"
      />
      <span aria-live="polite" className="text-sm text-ink-dim">
        {shown} of {total}
      </span>
    </div>
  );
}
