// The printed markings of a self-healing cutting mat: numbered cm rulers on two edges
// and angle guides rising from the bottom-left corner. 24px = 1 cm, so a label every 120px = every 5 cm.
// labels stop at 55 cm (1320px) so none is cut off at a 1440 viewport
const CM = Array.from({ length: 12 }, (_, i) => i * 5);

export function MatMarkings({ guides = true }: { guides?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="ruler-x absolute inset-x-0 top-0 h-3" />
      <div className="ruler-y absolute inset-y-0 left-0 w-3" />
      <div className="absolute inset-x-0 top-3 font-mono text-[11px] tabular-nums text-chalk/55">
        {CM.slice(1).map((n) => (
          <span key={n} className="absolute -translate-x-1/2" style={{ left: n * 24 }}>
            {n}
          </span>
        ))}
      </div>
      <div className="absolute inset-y-0 left-4 hidden font-mono sm:block text-[11px] tabular-nums text-chalk/55">
        {CM.slice(1, 9).map((n) => (
          <span key={n} className="absolute -translate-y-1/2" style={{ top: n * 24 }}>
            {n}
          </span>
        ))}
      </div>
      {guides && (
        // a short protractor fan in the bottom-left corner, kept clear of the hero copy
        <svg className="absolute bottom-0 left-0 hidden size-px overflow-visible sm:block">
          <g className="stroke-chalk/15" strokeWidth="1">
            <line x1="0" y1="0" x2="156" y2="-90" />
            <line x1="0" y1="0" x2="127" y2="-127" />
            <line x1="0" y1="0" x2="90" y2="-156" />
            <path d="M 150 0 A 150 150 0 0 0 0 -150" fill="none" />
          </g>
        </svg>
      )}
      {guides && (
        <div className="absolute bottom-3 left-[168px] hidden gap-5 font-mono sm:flex text-[11px] text-chalk/50">
          <span>30°</span>
          <span>45°</span>
          <span>60°</span>
        </div>
      )}
    </div>
  );
}
