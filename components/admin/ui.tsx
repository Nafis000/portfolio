// Shared admin building blocks (server-safe).
export const panel = "bg-sheet text-ink shadow-[0_30px_60px_-28px_rgb(5_20_14/0.85),0_2px_6px_rgb(5_20_14/0.25)]";
export const btn =
  "inline-flex items-center justify-center border-2 border-ink px-4 py-2 font-display text-sm font-semibold uppercase tracking-[0.08em] transition-colors hover:bg-ink hover:text-sheet disabled:cursor-wait disabled:opacity-60";
export const btnPrimary =
  "inline-flex items-center justify-center bg-ink px-5 py-2.5 font-display font-semibold uppercase tracking-[0.08em] text-sheet transition-colors hover:bg-copper-deep disabled:cursor-wait disabled:opacity-60";

export function PageHead({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-ink px-6 py-5">
      <h1 className="text-3xl font-bold uppercase leading-none sm:text-4xl">{title}</h1>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}

export function Notice({ tone, children }: { tone: "ok" | "error"; children: React.ReactNode }) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={`mx-6 mt-5 border-l-0 px-4 py-3 ${tone === "error" ? "bg-copper-deep text-sheet" : "bg-mat text-chalk"}`}
    >
      {children}
    </p>
  );
}

export function Loading() {
  return <div className={`${panel} min-h-96`} aria-busy="true" />;
}
