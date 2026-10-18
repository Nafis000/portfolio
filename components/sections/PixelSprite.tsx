// Renders a pixel-art sprite from rows of characters: each character maps to a fill class, "." is empty.
export function PixelSprite({
  rows,
  palette,
  size = 6,
  className = "",
}: {
  rows: string[];
  palette: Record<string, string>;
  size?: number;
  className?: string;
}) {
  const w = Math.max(...rows.map((r) => r.length));
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${w} ${rows.length}`}
      width={w * size}
      height={rows.length * size}
      shapeRendering="crispEdges"
      className={className}
    >
      {rows.flatMap((row, y) =>
        [...row].map((c, x) => (palette[c] ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" className={palette[c]} /> : null)),
      )}
    </svg>
  );
}

export const DOG = [
  "..........KK....",
  ".........KBBK...",
  "........KBBBBKK.",
  "........KBWBBBBK",
  "........KBBBBBK.",
  "KK......KBBBBK..",
  "KBK...KKKBBBBK..",
  ".KBKKKBBBBBBBK..",
  "..KBBBBBBBBBBK..",
  "..KBBBBBBBBBK...",
  "..KBBKKKKKBBK...",
  "..KBK.....KBK...",
  "..KK......KK....",
];
