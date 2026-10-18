"use client";

import { useState } from "react";

// Two-step destructive action: the first press arms it, the second confirms. Keyboard and screen-reader friendly.
export function ConfirmButton({
  action,
  label,
  confirmLabel,
  className = "",
}: {
  action: () => Promise<void>;
  label: string;
  confirmLabel: string;
  className?: string;
}) {
  const [armed, setArmed] = useState(false);
  if (!armed) {
    return (
      <button type="button" onClick={() => setArmed(true)} className={className}>
        {label}
      </button>
    );
  }
  return (
    <span className="inline-flex items-center gap-2" role="group" aria-label={confirmLabel}>
      <form action={action}>
        <button type="submit" autoFocus className={`${className} border-copper-deep bg-copper-deep text-sheet`}>
          {confirmLabel}
        </button>
      </form>
      <button type="button" onClick={() => setArmed(false)} className="underline underline-offset-4">
        Keep it
      </button>
    </span>
  );
}
