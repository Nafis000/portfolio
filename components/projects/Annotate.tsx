// Computer-vision style annotation for our own drawings: corner brackets plus a label tag.
// These mark parts that appear in the project's parts list; they are drawn, not detected.
export function Detect({
  x,
  y,
  w,
  h,
  label,
  side = "top",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  side?: "top" | "bottom";
}) {
  const c = Math.min(10, w / 3, h / 3);
  const tagW = label.length * 6.6 + 10;
  const ty = side === "top" ? y - 13 : y + h + 1;
  return (
    <g className="detect">
      <path
        d={`M ${x} ${y + c} V ${y} H ${x + c} M ${x + w - c} ${y} H ${x + w} V ${y + c} M ${x + w} ${y + h - c} V ${y + h} H ${x + w - c} M ${x + c} ${y + h} H ${x} V ${y + h - c}`}
        className="fill-none stroke-copper-deep"
        strokeWidth="1.8"
      />
      <rect x={x} y={ty} width={tagW} height="12" className="fill-copper-deep" />
      <text x={x + 4} y={ty + 9} className="fill-sheet font-mono" fontSize="9">
        {label}
      </text>
    </g>
  );
}

// Faint drafting grid behind a drawing.
export function DraftGrid({ id }: { id: string }) {
  return (
    <>
      <defs>
        <pattern id={id} width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 H 0 V 10" fill="none" className="stroke-ink/[0.07]" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </>
  );
}
