// Illustration of a computer-vision pipeline over the bench: camera frame -> neural network -> labels.
// A drawing of the idea, not a trained model, and labelled as such.
const LAYERS = [4, 6, 6, 3];
const LABELS = ["line", "robot", "drone"];

export function VisionPipeline() {
  const lx = (i: number) => 360 + i * 110;
  const ly = (i: number, n: number) => 150 + (i - (n - 1) / 2) * 40;

  return (
    <figure className="w-full">
      <svg
        viewBox="0 0 760 300"
        role="img"
        aria-label="Illustration: a camera frame of a robot, a drone and a line, passing through a neural network that outputs the labels line, robot and drone"
        className="vision h-auto w-full"
      >
        {/* camera frame */}
        <rect x="10" y="40" width="280" height="220" rx="4" className="fill-mat-deep/60 stroke-chalk/60" strokeWidth="1.5" />
        <path d="M 10 60 V 40 H 30 M 270 40 H 290 V 60 M 290 240 V 260 H 270 M 30 260 H 10 V 240" className="fill-none stroke-chalk" strokeWidth="2" />
        <path d="M 10 230 C 80 230, 120 170, 190 168 S 270 150, 290 140" className="fill-none stroke-chalk/35" strokeWidth="14" strokeLinecap="round" />
        {/* robot */}
        <g className="fill-none stroke-chalk" strokeWidth="1.6">
          <rect x="128" y="168" width="54" height="34" rx="6" />
          <rect x="136" y="160" width="18" height="7" rx="1.5" />
          <rect x="136" y="203" width="18" height="7" rx="1.5" />
          <path d="M 184 172 h 5 v 26 h -5" className="stroke-copper" />
        </g>
        {/* drone */}
        <g className="fill-none stroke-chalk" strokeWidth="1.4">
          <path d="M 196 72 L 256 112 M 256 72 L 196 112" strokeWidth="3" />
          {[
            [196, 72],
            [256, 72],
            [196, 112],
            [256, 112],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="13" strokeDasharray="3 3" />
          ))}
          <rect x="216" y="82" width="20" height="20" rx="3" className="fill-mat-deep" />
        </g>
        {/* detections */}
        <g className="vision-boxes">
          {[
            { x: 120, y: 152, w: 76, h: 64, t: "robot" },
            { x: 176, y: 52, w: 100, h: 80, t: "drone" },
            { x: 26, y: 200, w: 96, h: 40, t: "line" },
          ].map((b) => (
            <g key={b.t}>
              <rect x={b.x} y={b.y} width={b.w} height={b.h} className="fill-none stroke-copper" strokeWidth="1.6" />
              <rect x={b.x} y={b.y - 13} width={b.t.length * 6.2 + 8} height="12" className="fill-copper" />
              <text x={b.x + 4} y={b.y - 4} className="fill-ink font-mono" fontSize="9">
                {b.t}
              </text>
            </g>
          ))}
        </g>
        <text x="14" y="30" className="fill-chalk-dim font-mono" fontSize="10">
          camera frame
        </text>

        {/* frame -> network */}
        <path d="M 296 150 H 336 M 328 143 l 8 7 l -8 7" className="fill-none stroke-chalk/60" strokeWidth="1.5" />

        {/* network edges */}
        <g className="stroke-chalk/20" strokeWidth="0.8">
          {LAYERS.slice(0, -1).flatMap((n, li) =>
            Array.from({ length: n }, (_, a) =>
              Array.from({ length: LAYERS[li + 1] }, (_, b) => (
                <line key={`${li}-${a}-${b}`} x1={lx(li)} y1={ly(a, n)} x2={lx(li + 1)} y2={ly(b, LAYERS[li + 1])} />
              )),
            ),
          )}
        </g>
        {/* nodes light up layer by layer */}
        {LAYERS.map((n, li) =>
          Array.from({ length: n }, (_, i) => (
            <circle
              key={`${li}-${i}`}
              cx={lx(li)}
              cy={ly(i, n)}
              r="7"
              className="vision-node fill-mat-deep stroke-chalk"
              strokeWidth="1.4"
              style={{ animationDelay: `${li * 0.45 + i * 0.05}s` }}
            />
          )),
        )}
        {LAYERS.map((_, li) => (
          <text key={li} x={lx(li)} y="28" textAnchor="middle" className="fill-chalk-dim font-mono" fontSize="10">
            {["input", "conv", "conv", "output"][li]}
          </text>
        ))}
        {LABELS.map((t, i) => (
          <text key={t} x={lx(3) + 16} y={ly(i, 3) + 4} className="fill-chalk font-mono" fontSize="12">
            {t}
          </text>
        ))}
      </svg>
      <figcaption className="mt-2 font-hand text-lg text-chalk-dim">
        illustration of a vision pipeline, not a trained model
      </figcaption>
    </figure>
  );
}
