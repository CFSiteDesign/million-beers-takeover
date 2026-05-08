/* Flat print-style dividers, no animations. */

export function FoamOverflowDivider({
  fillFrom = "var(--ink)",
  foamColor = "var(--cream)",
}: {
  fillFrom?: string;
  foamColor?: string;
}) {
  return (
    <div aria-hidden className="relative h-10 w-full overflow-hidden" style={{ background: fillFrom }}>
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="M0,18 C 60,4 120,28 180,16 C 240,4 300,28 360,16 C 420,2 480,28 540,14 C 600,2 660,28 720,16 C 780,4 840,28 900,14 C 960,2 1020,28 1080,16 C 1140,4 1200,22 1200,18 L 1200,40 L 0,40 Z"
          fill={foamColor}
          stroke="var(--ink)"
          strokeWidth="2"
        />
        <path d="M120,28 q4,14 8,0 z" fill={foamColor} stroke="var(--ink)" strokeWidth="1" />
        <path d="M540,30 q4,12 8,0 z" fill={foamColor} stroke="var(--ink)" strokeWidth="1" />
        <path d="M880,28 q4,14 8,0 z" fill={foamColor} stroke="var(--ink)" strokeWidth="1" />
      </svg>
    </div>
  );
}
