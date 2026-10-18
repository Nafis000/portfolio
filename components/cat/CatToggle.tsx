"use client";

import { useSyncExternalStore } from "react";
import { catHidden } from "./catPreference";

export function CatToggle() {
  const hidden = useSyncExternalStore(catHidden.subscribe, catHidden.get, () => false);
  return (
    <button
      type="button"
      onClick={() => catHidden.set(!hidden)}
      aria-pressed={!hidden}
      className="underline-offset-4 hover:text-chalk hover:underline"
    >
      {hidden ? "Show the cat" : "Hide the cat"}
    </button>
  );
}
