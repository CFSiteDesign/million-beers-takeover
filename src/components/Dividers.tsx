/* Section dividers — each unique */

export function FoamWaveDivider() {
  return (
    <div aria-hidden className="relative h-16 w-full overflow-hidden">
      <div className="foam-drift absolute bottom-0 left-0 flex w-[200%]">
        {[0, 1].map((i) => (
          <svg
            key={i}
            viewBox="0 0 1200 80"
            preserveAspectRatio="none"
            className="h-16 w-1/2"
          >
            <path
              d="M0,50 C150,10 300,90 450,50 C600,10 750,90 900,50 C1050,10 1200,80 1200,50 L1200,80 L0,80 Z"
              fill="var(--cream)"
              opacity="0.95"
            />
            <circle cx="120" cy="40" r="5" fill="var(--foam)" opacity="0.9" />
            <circle cx="320" cy="30" r="3" fill="var(--cream)" />
            <circle cx="540" cy="42" r="4" fill="var(--foam)" />
            <circle cx="780" cy="34" r="6" fill="var(--cream)" />
            <circle cx="1010" cy="40" r="3" fill="var(--foam)" />
          </svg>
        ))}
      </div>
    </div>
  );
}

export function BottleCapDivider() {
  const caps = Array.from({ length: 13 });
  return (
    <div
      aria-hidden
      className="relative flex h-16 w-full items-center justify-center gap-2 overflow-hidden"
    >
      {caps.map((_, i) => {
        const isAmber = i % 2 === 0;
        const rotate = i === 6 ? 18 : 0;
        return (
          <span
            key={i}
            className="relative inline-block h-7 w-7 rounded-full shadow-md"
            style={{
              background: isAmber
                ? "radial-gradient(circle at 30% 30%, var(--foam), var(--amber) 60%, var(--amber-deep))"
                : "radial-gradient(circle at 30% 30%, #444, #111 70%)",
              transform: `rotate(${rotate}deg)`,
              boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
            }}
          >
            <span
              className="absolute inset-0 rounded-full"
              style={{
                backgroundImage:
                  "repeating-conic-gradient(from 0deg, transparent 0 8deg, rgba(0,0,0,0.25) 8deg 12deg)",
              }}
            />
          </span>
        );
      })}
    </div>
  );
}

export function PullTabDivider() {
  return (
    <div aria-hidden className="relative flex h-16 items-center justify-center">
      <div className="flex-1 border-t border-dashed border-[var(--amber)]/40" />
      <svg viewBox="0 0 60 30" className="mx-3 h-8 w-16">
        <ellipse cx="30" cy="15" rx="22" ry="10" fill="none" stroke="var(--amber)" strokeWidth="2" />
        <ellipse cx="30" cy="15" rx="10" ry="5" fill="none" stroke="var(--amber)" strokeWidth="1.5" />
        <circle cx="30" cy="15" r="2" fill="var(--amber-deep)" />
      </svg>
      <div className="flex-1 border-t border-dashed border-[var(--amber)]/40" />
    </div>
  );
}

export function PourDivider() {
  return (
    <div aria-hidden className="relative h-20 w-full overflow-hidden">
      <div
        className="absolute left-1/2 top-0 h-16 w-1.5 -translate-x-1/2 rounded-full"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--amber-deep), var(--amber))",
        }}
      />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
        <span className="block h-3 w-3 animate-ping rounded-full bg-[var(--foam)] opacity-75" />
        <span className="absolute -left-3 top-1 block h-2 w-2 rounded-full bg-[var(--cream)]/80" />
        <span className="absolute left-3 top-2 block h-1.5 w-1.5 rounded-full bg-[var(--amber)]" />
      </div>
    </div>
  );
}

export function CoasterRingsDivider() {
  return (
    <div aria-hidden className="relative h-20 w-full overflow-hidden">
      <div className="absolute left-[20%] top-2 h-16 w-16 rounded-full border-2 border-[var(--amber)]/30" />
      <div className="absolute left-[35%] top-4 h-12 w-12 rounded-full border-2 border-[var(--amber-deep)]/35" />
      <div className="absolute left-[60%] top-1 h-20 w-20 rounded-full border-2 border-[var(--amber)]/25" />
      <div className="absolute left-[78%] top-5 h-10 w-10 rounded-full border-2 border-[var(--amber)]/30" />
    </div>
  );
}
