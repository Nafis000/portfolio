import { Detect, DraftGrid } from "./Annotate";

// Pen-style technical drawings of each build, top view, with the listed parts annotated.
// Illustrations of the parts list, not measured CAD.
const ink = "fill-none stroke-ink";
const thin = "fill-none stroke-ink-dim";

function LineFollower() {
  return (
    <>
      <path d="M -10 205 C 110 205, 150 118, 262 112 S 380 92, 410 72" className="fill-none stroke-ink/15" strokeWidth="18" strokeLinecap="round" />
      <rect x="130" y="62" width="168" height="100" rx="14" className={ink} strokeWidth="1.8" />
      <rect x="150" y="44" width="46" height="16" rx="3" className={ink} strokeWidth="1.6" />
      <rect x="150" y="164" width="46" height="16" rx="3" className={ink} strokeWidth="1.6" />
      <path d="M 156 52 h 34 M 156 172 h 34" className={thin} strokeDasharray="3 3" />
      <circle cx="282" cy="112" r="7" className={ink} strokeWidth="1.4" />
      {/* Arduino Nano */}
      <rect x="200" y="76" width="64" height="24" rx="2" className={ink} strokeWidth="1.4" />
      <path d="M 204 79 h 56 M 204 97 h 56" className={thin} strokeDasharray="1.5 3" />
      {/* L298N */}
      <rect x="146" y="104" width="40" height="40" rx="2" className={ink} strokeWidth="1.4" />
      <path d="M 152 110 v 28 M 158 110 v 28 M 164 110 v 28 M 170 110 v 28 M 176 110 v 28" className={thin} />
      {/* IR array */}
      <rect x="306" y="84" width="16" height="56" rx="2" className={ink} strokeWidth="1.4" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <circle key={i} cx="314" cy={89 + i * 6.6} r="1.8" className="fill-ink" />
      ))}
      {/* sonar */}
      <rect x="330" y="88" width="20" height="48" rx="3" className={ink} strokeWidth="1.4" />
      <circle cx="340" cy="100" r="7" className={ink} strokeWidth="1.3" />
      <circle cx="340" cy="124" r="7" className={ink} strokeWidth="1.3" />
      <path d="M 352 100 q 14 12 0 24 M 358 96 q 20 16 0 32" className={thin} />
      <path d="M 196 100 C 190 108, 188 112, 186 118 M 264 92 C 290 92, 296 100, 306 104" className="fill-none stroke-copper-deep" strokeWidth="1.2" />
      <Detect x={196} y={72} w={72} h={32} label="arduino nano" />
      <Detect x={142} y={100} w={48} h={48} label="l298n" side="bottom" />
      <Detect x={302} y={80} w={24} h={64} label="ir array" side="bottom" />
      <Detect x={327} y={84} w={26} h={56} label="hc-sr04" />
    </>
  );
}

function Quadcopter() {
  const rotors = [
    [110, 60],
    [290, 60],
    [110, 180],
    [290, 180],
  ];
  return (
    <>
      <path d="M 110 60 L 290 180 M 290 60 L 110 180" className={ink} strokeWidth="5" strokeLinecap="round" />
      {rotors.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="44" className={thin} strokeDasharray="4 4" />
          <circle cx={x} cy={y} r="11" className={ink} strokeWidth="1.6" />
          <path d={`M ${x - 38} ${y - 8} L ${x + 38} ${y + 8}`} className={ink} strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}
      <rect x="168" y="88" width="64" height="64" rx="10" className="fill-sheet stroke-ink" strokeWidth="1.8" />
      <rect x="182" y="102" width="36" height="36" rx="3" className={ink} strokeWidth="1.3" />
      <path d="M 200 108 v 24 M 188 120 h 24" className="fill-none stroke-copper-deep" strokeWidth="1.2" />
      {/* GPS puck */}
      <circle cx="200" cy="34" r="14" className="fill-sheet stroke-ink" strokeWidth="1.5" />
      <path d="M 200 48 V 88" className={thin} />
      {/* FPV camera */}
      <rect x="232" y="108" width="22" height="24" rx="3" className="fill-sheet stroke-ink" strokeWidth="1.4" />
      <circle cx="254" cy="120" r="6" className={ink} strokeWidth="1.4" />
      <path d="M 262 112 L 300 98 M 262 128 L 300 142" className={thin} strokeDasharray="2 3" />
      {/* fire sensor */}
      <rect x="150" y="196" width="40" height="16" rx="2" className="fill-sheet stroke-ink" strokeWidth="1.3" />
      <circle cx="160" cy="204" r="4" className="fill-copper-deep" />
      <Detect x={176} y={96} w={48} h={48} label="flight controller" />
      <Detect x={182} y={18} w={36} h={34} label="gps" />
      <Detect x={228} y={104} w={34} h={32} label="fpv camera" side="bottom" />
      <Detect x={262} y={32} w={56} h={56} label="brushless motor" />
      <Detect x={146} y={192} w={48} h={24} label="fire sensor" side="bottom" />
    </>
  );
}

function SoccerBot() {
  return (
    <>
      <circle cx="356" cy="120" r="22" className={ink} strokeWidth="1.6" />
      <path d="M 340 106 l 10 8 l -2 12 l 12 4 M 366 102 l -6 10" className={thin} />
      <path d="M 120 64 H 270 L 318 92 V 148 L 270 176 H 120 Z" className={ink} strokeWidth="2" />
      <path d="M 270 64 L 318 92 V 148 L 270 176" className="fill-ink/[0.06] stroke-ink" strokeWidth="1.2" />
      {/* wheels */}
      <rect x="132" y="40" width="70" height="22" rx="4" className={ink} strokeWidth="1.8" />
      <rect x="132" y="178" width="70" height="22" rx="4" className={ink} strokeWidth="1.8" />
      <path d="M 140 51 h 54 M 140 189 h 54" className={thin} strokeDasharray="5 3" />
      {/* gear motors */}
      <rect x="150" y="70" width="34" height="26" rx="3" className={ink} strokeWidth="1.3" />
      <rect x="150" y="144" width="34" height="26" rx="3" className={ink} strokeWidth="1.3" />
      {/* battery */}
      <rect x="196" y="98" width="62" height="44" rx="3" className="fill-sheet stroke-ink" strokeWidth="1.5" />
      <text x="203" y="124" className="fill-ink-dim font-mono" fontSize="10">3S 2200</text>
      {/* RC driver */}
      <rect x="136" y="106" width="44" height="28" rx="2" className={ink} strokeWidth="1.3" />
      <path d="M 140 112 h 36 M 140 128 h 36" className={thin} strokeDasharray="1.5 3" />
      <Detect x={128} y={36} w={78} h={30} label="65 mm wheel" />
      <Detect x={192} y={94} w={70} h={52} label="3s lipo" side="bottom" />
      <Detect x={132} y={102} w={52} h={36} label="rc driver" side="bottom" />
      <Detect x={330} y={94} w={52} h={52} label="ball" />
    </>
  );
}

function Rover() {
  return (
    <>
      {/* phone with control page */}
      <rect x="18" y="58" width="74" height="128" rx="10" className={ink} strokeWidth="1.8" />
      <path d="M 55 100 l 0 -14 m -7 7 l 7 -7 l 7 7 M 55 140 l 0 14 m -7 -7 l 7 7 l 7 -7 M 35 120 h -10 m 7 -7 l -7 7 l 7 7 M 75 120 h 10 m -7 -7 l 7 7 l -7 7" className={thin} strokeWidth="1.4" />
      <path d="M 104 112 q 12 8 0 16 M 112 104 q 20 16 0 32 M 120 96 q 28 24 0 48" className="fill-none stroke-copper-deep" strokeWidth="1.4" />
      <text x="96" y="160" className="fill-ink-dim font-mono" fontSize="9">WebSocket</text>
      {/* rover */}
      <rect x="170" y="70" width="190" height="100" rx="12" className={ink} strokeWidth="1.8" />
      {[
        [182, 50],
        [314, 50],
        [182, 172],
        [314, 172],
      ].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="40" height="18" rx="3" className={ink} strokeWidth="1.6" />
      ))}
      <rect x="196" y="92" width="64" height="36" rx="2" className={ink} strokeWidth="1.4" />
      <path d="M 252 98 h 4 v 6 h -4 v 6 h 4" className={thin} />
      <rect x="282" y="90" width="58" height="34" rx="2" className="fill-ink stroke-ink" strokeWidth="1.4" />
      <text x="288" y="104" className="fill-chalk font-mono" fontSize="8">WiFi OK</text>
      <text x="288" y="116" className="fill-chalk font-mono" fontSize="8">192.168…</text>
      <Detect x={192} y={88} w={72} h={44} label="esp32" side="bottom" />
      <Detect x={278} y={86} w={66} h={42} label="ssd1306 oled" />
    </>
  );
}

function SmartDwelling() {
  return (
    <>
      <path d="M 70 110 L 200 30 L 330 110" className={ink} strokeWidth="2" strokeLinejoin="round" />
      <rect x="86" y="108" width="228" height="112" className={ink} strokeWidth="1.8" />
      <path d="M 200 108 V 220 M 86 164 H 200" className={thin} />
      {/* sensors */}
      {[
        [120, 132],
        [168, 188],
        [258, 138],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="6" className="fill-sheet stroke-ink" strokeWidth="1.4" />
          <path d={`M ${x + 9} ${y - 6} q 6 6 0 12 M ${x + 14} ${y - 10} q 10 10 0 20`} className={thin} />
        </g>
      ))}
      {/* loads */}
      <circle cx="270" cy="190" r="10" className={ink} strokeWidth="1.4" />
      <path d="M 263 183 l 14 14 M 277 183 l -14 14" className={thin} />
      {/* microcontroller and network */}
      <rect x="226" y="66" width="48" height="30" rx="2" className="fill-sheet stroke-ink" strokeWidth="1.5" />
      <path d="M 226 82 C 170 82, 130 100, 120 126 M 250 96 C 250 120, 200 170, 172 184 M 262 96 V 132 M 274 90 C 300 120, 290 170, 280 182" className="fill-none stroke-copper-deep" strokeWidth="1.2" strokeDasharray="4 3" />
      <Detect x={222} y={62} w={56} h={38} label="microcontroller" />
      <Detect x={108} y={120} w={24} h={24} label="sensor" side="bottom" />
      <Detect x={256} y={176} w={28} h={28} label="load" side="bottom" />
    </>
  );
}

const DRAWINGS: Record<string, { title: string; Drawing: () => React.ReactNode }> = {
  "line-following-robot": { title: "Top view: chassis, IR array, sonar, Nano and L298N over the track", Drawing: LineFollower },
  "quadobot-autonomous-drone": { title: "Top view: quad frame with flight controller, GPS, FPV camera and fire sensor", Drawing: Quadcopter },
  "soccer-bot": { title: "Top view: shielded chassis, wheels, gear motors, LiPo and RC driver, with the ball", Drawing: SoccerBot },
  "esp32-wifi-rover": { title: "Phone controller talking to the rover's ESP32 over WebSocket, status on the OLED", Drawing: Rover },
  "smart-dwelling-model": { title: "Section view: sensor network and loads wired to the microcontroller", Drawing: SmartDwelling },
};

export function hasDrawing(slug: string) {
  return slug in DRAWINGS;
}

export function ProjectDrawing({ slug, className = "" }: { slug: string; className?: string }) {
  const entry = DRAWINGS[slug];
  if (!entry) return null;
  const { title, Drawing } = entry;
  return (
    <svg viewBox="0 0 400 240" role="img" aria-label={`Drawing. ${title}`} className={`h-auto w-full ${className}`}>
      <DraftGrid id={`grid-${slug}`} />
      <Drawing />
    </svg>
  );
}
