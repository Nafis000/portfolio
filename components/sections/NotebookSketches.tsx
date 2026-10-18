// Pencil sketches for the notebook margin. Explanatory drawings of the maths behind the work,
// not claims about coursework or grades, so they're decorative to assistive tech.
const stroke = "stroke-pencil";

export function TangentSketch() {
  return (
    <svg viewBox="0 0 240 170" aria-hidden className="w-full" fill="none" strokeLinecap="round">
      <path d="M 20 150 H 225 M 30 160 V 12" className={stroke} strokeWidth="1.2" />
      <path d="M 30 140 C 80 138, 120 110, 150 70 S 200 20, 220 18" className={stroke} strokeWidth="2" />
      <path d="M 92 140 L 210 32" className="stroke-copper-deep" strokeWidth="1.6" strokeDasharray="5 4" />
      <circle cx="150" cy="70" r="3.5" className="fill-copper-deep" />
      <text x="158" y="92" className="fill-pencil font-hand" fontSize="17">f′(x₀)</text>
      <text x="196" y="166" className="fill-pencil font-hand" fontSize="15">x</text>
      <text x="8" y="22" className="fill-pencil font-hand" fontSize="15">y</text>
    </svg>
  );
}

export function RcSketch() {
  return (
    <svg viewBox="0 0 240 170" aria-hidden className="w-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path
        d="M 30 40 H 70 l 6 -10 l 10 20 l 10 -20 l 10 20 l 10 -20 l 6 10 H 170 V 72 M 154 72 H 186 M 154 84 H 186 M 170 84 V 130 H 30 V 112 M 30 40 V 92"
        className={stroke}
        strokeWidth="1.8"
      />
      <path d="M 18 92 H 42 M 24 102 H 36" className={stroke} strokeWidth="1.8" />
      <text x="88" y="24" className="fill-pencil font-hand" fontSize="16">R</text>
      <text x="194" y="84" className="fill-pencil font-hand" fontSize="16">C</text>
      <text x="44" y="160" className="fill-copper-deep font-hand" fontSize="16">
        v(t) = V(1 − e
        <tspan dy="-7" fontSize="12">−t/RC</tspan>
        <tspan dy="7">)</tspan>
      </text>
    </svg>
  );
}

export function VectorSketch() {
  return (
    <svg viewBox="0 0 240 170" aria-hidden className="w-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 30 140 L 140 120 M 132 113 L 140 120 L 130 127" className={stroke} strokeWidth="2" />
      <path d="M 140 120 L 190 40 M 180 44 L 190 40 L 190 51" className={stroke} strokeWidth="2" />
      <path d="M 30 140 L 190 40 M 178 42 L 190 40 L 184 51" className="stroke-copper-deep" strokeWidth="1.8" />
      <text x="80" y="150" className="fill-pencil font-hand" fontSize="17">a</text>
      <text x="172" y="96" className="fill-pencil font-hand" fontSize="17">b</text>
      <text x="76" y="88" className="fill-copper-deep font-hand" fontSize="17">a + b</text>
    </svg>
  );
}

export function MatrixSketch() {
  return (
    <svg viewBox="0 0 240 120" aria-hidden className="w-full" fill="none">
      <text x="14" y="66" className="fill-pencil font-hand" fontSize="19">R(θ) =</text>
      <path d="M 92 28 q -10 32 0 64 M 214 28 q 10 32 0 64" className={stroke} strokeWidth="1.6" />
      <text x="102" y="52" className="fill-pencil font-hand" fontSize="17">cos θ  −sin θ</text>
      <text x="102" y="82" className="fill-pencil font-hand" fontSize="17">sin θ   cos θ</text>
      <path d="M 30 104 q 60 12 150 -2" className="stroke-copper-deep" strokeWidth="1.4" />
    </svg>
  );
}
