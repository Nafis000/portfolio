"use client";

import { useEffect } from "react";

// Shown when content can't be loaded. Never renders the raw error; it's logged instead.
export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mat-grid flex min-h-[70dvh] items-center px-6">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-5xl font-bold uppercase text-chalk sm:text-6xl">Couldn’t load this page</h1>
        <p className="mt-2 font-hand text-2xl text-copper">loose connection</p>
        <p className="mt-4 text-lg text-chalk-dim">
          The content didn’t arrive this time. It’s usually temporary, so try again in a moment.
        </p>
        <button
          type="button"
          onClick={() => retry()}
          className="mt-8 bg-copper px-6 py-3 font-display font-semibold uppercase tracking-[0.08em] text-ink hover:bg-chalk"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
