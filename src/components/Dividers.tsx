/* Beer foam overflow divider — same shape used between every section.
   Static (no animation), evokes a glass overflowing with foam and bubbles. */

export function FoamOverflowDivider() {
  return (
    <div aria-hidden className="relative h-20 w-full overflow-hidden">
      {/* Drips hanging down from the previous section */}
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="foamGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--foam)" />
            <stop offset="60%" stopColor="var(--cream)" />
            <stop offset="100%" stopColor="var(--cream)" />
          </linearGradient>
        </defs>
        {/* Main foam blob with overflowing bumps */}
        <path
          d="
            M0,30
            C 60,10 120,50 180,32
            C 240,12 300,52 360,30
            C 420,8  480,50 540,28
            C 600,6  660,52 720,30
            C 780,10 840,50 900,28
            C 960,8  1020,52 1080,30
            C 1140,12 1200,40 1200,30
            L 1200,80 L 0,80 Z
          "
          fill="url(#foamGrad)"
        />
        {/* Drips */}
        <path d="M120,52 q4,18 8,0 z" fill="var(--cream)" />
        <path d="M310,58 q5,22 10,0 z" fill="var(--cream)" />
        <path d="M540,55 q4,16 8,0 z" fill="var(--cream)" />
        <path d="M780,60 q5,24 10,0 z" fill="var(--cream)" />
        <path d="M970,54 q4,18 8,0 z" fill="var(--cream)" />
      </svg>

      {/* Bubbles popping out of the foam */}
      <div className="absolute inset-0">
        {[
          { l: 6, t: 18, s: 10 },
          { l: 14, t: 8, s: 6 },
          { l: 22, t: 22, s: 14 },
          { l: 30, t: 4, s: 8 },
          { l: 38, t: 16, s: 11 },
          { l: 46, t: 6, s: 7 },
          { l: 54, t: 20, s: 13 },
          { l: 62, t: 10, s: 9 },
          { l: 70, t: 18, s: 12 },
          { l: 78, t: 4, s: 6 },
          { l: 86, t: 14, s: 10 },
          { l: 94, t: 8, s: 8 },
        ].map((b, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${b.l}%`,
              top: b.t,
              width: b.s,
              height: b.s,
              background:
                "radial-gradient(circle at 30% 30%, #ffffff 0%, var(--foam) 45%, var(--cream) 80%)",
              boxShadow:
                "inset 0 0 3px rgba(255,255,255,0.8), 0 1px 2px rgba(0,0,0,0.25)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
