// A pen-drawn arrow in the drawing's stroke, replacing text glyphs.
export function Arrow({ dir = "right", className = "" }: { dir?: "right" | "left"; className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 22 12"
      className={`inline-block h-[0.7em] w-[1.3em] align-[0.05em] ${dir === "left" ? "-scale-x-100" : ""} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M 1 6 H 20 M 15 1.5 L 20 6 L 15 10.5" />
    </svg>
  );
}
