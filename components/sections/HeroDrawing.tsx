// One pen line: the line follower's PID law becomes its control loop, then the track, then the robot.
// pathLength={1} lets every stroke share the same dash maths (--len: 1).
const pen = (delay: number, dur = 1) =>
  ({ "--len": 1, "--delay": `${delay}s`, "--dur": `${dur}s` }) as React.CSSProperties;
const after = (delay: number) => ({ "--delay": `${delay}s` }) as React.CSSProperties;

// Track the robot drives (also used as its CSS offset-path in globals.css).
// The pen draws it in reverse, continuing from the chassis connector.
const LOOP_TO_TRACK =
  "M 584 236 C 618 300, 610 380, 560 430 C 470 360, 430 384, 340 452 C 250 520, 170 400, 92 470";

export function HeroDrawing() {
  return (
    <svg
      viewBox="0 0 640 560"
      role="img"
      aria-labelledby="hero-drawing-title hero-drawing-desc"
      className="h-auto w-full max-w-[640px] overflow-visible"
    >
      <title id="hero-drawing-title">From the PID equation to the line following robot</title>
      <desc id="hero-drawing-desc">
        A hand-drawn sketch. The PID control law is written at the top, turns into a feedback loop of controller, motors,
        chassis and IR sensor array, and ends as a robot following a curved track.
      </desc>

      {/* 1 · the law, handwritten */}
      <g className="handwrite" style={{ "--delay": "0.15s", "--dur": "1s" } as React.CSSProperties}>
        <text x="20" y="64" className="fill-chalk font-hand" fontSize="31">
          u(t) = K
          <tspan dy="8" fontSize="19">p</tspan>
          <tspan dy="-8"> e(t) + K</tspan>
          <tspan dy="8" fontSize="19">i</tspan>
          <tspan dy="-8"> ∫e(t)dt + K</tspan>
          <tspan dy="8" fontSize="19">d</tspan>
          <tspan dy="-8"> de/dt</tspan>
        </text>
      </g>
      <g className="settle fill-chalk-dim font-hand" style={after(1.1)} fontSize="21">
        <path d="M 160 82 q 6 24 34 32" className="stroke-chalk-dim" fill="none" strokeWidth="1.4" />
        <text x="200" y="122">error from the IR array</text>
      </g>

      {/* 2 · the loop */}
      <g className="fill-none stroke-copper" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path className="pen" style={pen(0.9, 0.7)} pathLength={1} d="M 40 80 C 34 130, 70 160, 72 206" />
        <circle className="pen" style={pen(1.4, 0.5)} pathLength={1} cx="90" cy="230" r="18" />
        <path className="pen" style={pen(1.6, 0.4)} pathLength={1} d="M 108 230 H 160" />
        <rect className="pen" style={pen(1.8, 0.5)} pathLength={1} x="160" y="205" width="104" height="50" rx="3" />
        <path className="pen" style={pen(2.1, 0.4)} pathLength={1} d="M 264 230 H 310" />
        <rect className="pen" style={pen(2.3, 0.5)} pathLength={1} x="310" y="205" width="110" height="50" rx="3" />
        <path className="pen" style={pen(2.6, 0.4)} pathLength={1} d="M 420 230 H 466" />
        <rect className="pen" style={pen(2.8, 0.5)} pathLength={1} x="466" y="205" width="118" height="50" rx="3" />
        <path className="pen" style={pen(3.1, 0.9)} pathLength={1} d="M 525 255 V 326 H 430 M 230 326 H 90 V 248" />
        <rect className="pen" style={pen(3.4, 0.5)} pathLength={1} x="230" y="304" width="200" height="44" rx="3" />
      </g>
      <g className="settle fill-chalk font-display" style={after(1.9)} fontSize="21" fontWeight="600" letterSpacing="0.04em">
        <text x="90" y="237" textAnchor="middle" className="font-sans" fontWeight="400" fontSize="22">
          Σ
        </text>
        <text x="212" y="237" textAnchor="middle">PID</text>
        <text x="365" y="237" textAnchor="middle">MOTORS</text>
        <text x="525" y="237" textAnchor="middle">CHASSIS</text>
        <text x="330" y="333" textAnchor="middle">IR SENSOR ARRAY</text>
      </g>
      <g className="settle fill-chalk-dim font-mono" style={after(2.4)} fontSize="21">
        <text x="114" y="221">e</text>
        <text x="268" y="221">u</text>
        <text x="98" y="292" className="font-hand">feedback</text>
      </g>

      {/* 3 · the same law, on a chassis: the pen leaves the loop and becomes the track */}
      <path
        aria-hidden
        className="settle fill-none stroke-chalk/15"
        style={after(4.2)}
        strokeWidth="16"
        strokeLinecap="round"
        d="M 92 470 C 170 400, 250 520, 340 452 S 470 360, 560 430"
      />
      <path
        className="pen fill-none stroke-copper"
        style={pen(3.8, 1.6)}
        pathLength={1}
        strokeWidth="2.2"
        strokeLinecap="round"
        d={LOOP_TO_TRACK}
      />
      <g className="settle fill-chalk-dim font-hand" style={after(4.8)} fontSize="21">
        <text x="236" y="548">the same law, on a chassis</text>
      </g>

      {/* the robot, top view, in the drawing's own pen */}
      <g className="settle" style={after(5)}>
        <g className="robot-on-track fill-none" strokeWidth="2" strokeLinejoin="round">
          <rect x="-26" y="-17" width="50" height="34" rx="5" className="fill-mat stroke-chalk" />
          <rect x="-16" y="-24" width="18" height="7" rx="1.5" className="fill-mat stroke-chalk" />
          <rect x="-16" y="17" width="18" height="7" rx="1.5" className="fill-mat stroke-chalk" />
          <path d="M 24 -14 h 6 v 28 h -6" className="stroke-copper" />
          <path d="M 27 -9 v 2 M 27 -1 v 2 M 27 7 v 2" className="stroke-copper" strokeLinecap="round" />
          <circle cx="-6" cy="0" r="5" className="stroke-copper" strokeWidth="1.6" />
          <path d="M 2 -8 h 14 v 16 h -14 z" className="stroke-chalk-dim" strokeWidth="1.4" />
        </g>
      </g>
    </svg>
  );
}
