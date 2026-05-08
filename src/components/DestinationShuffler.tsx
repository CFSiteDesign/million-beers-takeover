import { useEffect, useRef, useState } from "react";

const DESTINATIONS = [
  { city: "Cambodia", country: "Cambodia", note: "Siem Reap · Phnom Penh · Koh Rong" },
  { city: "Laos", country: "Laos", note: "Vang Vieng tubing reborn" },
  { city: "Philippines", country: "Philippines", note: "El Nido · Boracay" },
  { city: "Indonesia", country: "Indonesia", note: "Bali · Gili T" },
];

const COUNTRY_PHRASES: Record<string, string> = {
  Cambodia: "Down for $0.50 Angkor beers and tuk-tuk chaos?",
  Laos: "Tubing down the Nam Song with 50 new mates — in?",
  Philippines: "Boat hopping limestone islands with a beer in hand?",
  Indonesia: "Sunset Bintangs and rice-field scooter runs — yes or no?",
};

const N = DESTINATIONS.length;
const FACE_STEP = 360 / N; // 90°
const RADIUS = 70; // px — bottle label depth

export function DestinationShuffler() {
  const [rotation, setRotation] = useState(-20);
  const [spinning, setSpinning] = useState(false);
  const [landed, setLanded] = useState<number | null>(null);
  const [vote, setVote] = useState<"yes" | "no" | null>(null);
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startRot: number } | null>(null);
  const idleSpinRef = useRef<number | null>(null);

  // Slow idle auto-spin while not interacting
  useEffect(() => {
    if (spinning || dragging || landed !== null) return;
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = t - last;
      last = t;
      setRotation((r) => r + dt * 0.025); // ~9°/s
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    idleSpinRef.current = raf;
    return () => cancelAnimationFrame(raf);
  }, [spinning, dragging, landed]);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setLanded(null);
    setVote(null);
    const target = Math.floor(Math.random() * N);
    const turns = 4 + Math.floor(Math.random() * 3);
    // Land so target face is at front (rotation = -target * FACE_STEP, mod 360)
    const current = rotation;
    const desired = -target * FACE_STEP;
    const currentMod = ((current % 360) + 360) % 360;
    const desiredMod = ((desired % 360) + 360) % 360;
    let delta = desiredMod - currentMod;
    if (delta <= 0) delta += 360;
    const next = current + turns * 360 + delta;
    setRotation(next);
    window.setTimeout(() => {
      setSpinning(false);
      setLanded(target);
    }, 4200);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (spinning) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);
    dragRef.current = { startX: e.clientX, startRot: rotation };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || !dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    setRotation(dragRef.current.startRot + dx * 0.6);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging) return;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    setDragging(false);
    dragRef.current = null;
  };

  const result = landed != null ? DESTINATIONS[landed] : null;
  const SIZE = 240;

  return (
    <div className="hidden lg:block">
      <div className="relative overflow-hidden rounded-sm border-2 border-[var(--cream)]/15 bg-gradient-to-b from-[var(--cream)]/[0.04] to-transparent p-5">
        <div className="border-b border-[var(--cream)]/10 pb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--cream)]/60">
          spin · the · bottle
        </div>

        <div
          className="relative mx-auto mt-4 select-none"
          style={{ height: SIZE, width: SIZE, perspective: 900, cursor: spinning ? "default" : dragging ? "grabbing" : "grab" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="pointer-events-none absolute inset-0 rounded-full bg-[var(--amber)]/15 blur-3xl" />

          {/* shadow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 -translate-x-1/2"
            style={{
              bottom: 8,
              width: 140,
              height: 16,
              background: "radial-gradient(ellipse at center, rgba(0,0,0,0.55), transparent 70%)",
              filter: "blur(4px)",
            }}
          />

          <div
            className="relative h-full w-full"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(-8deg) rotateY(${rotation}deg)`,
              transition: spinning
                ? "transform 4.2s cubic-bezier(.17,.67,.16,1)"
                : dragging
                  ? "none"
                  : "transform 120ms linear",
            }}
          >
            {/* Bottle body — front facing card */}
            <div
              className="absolute left-1/2 top-1/2"
              style={{
                width: 96,
                height: 220,
                transform: "translate(-50%, -50%)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Label faces around the bottle (cylinder approx) */}
              {DESTINATIONS.map((d, i) => (
                <div
                  key={d.city}
                  className="absolute left-1/2 top-1/2 flex items-center justify-center"
                  style={{
                    width: 84,
                    height: 70,
                    marginLeft: -42,
                    marginTop: -35,
                    transform: `rotateY(${i * FACE_STEP}deg) translateZ(${RADIUS}px)`,
                    background:
                      "linear-gradient(180deg, var(--amber) 0%, #d99622 100%)",
                    border: "2px solid var(--ink)",
                    borderRadius: 4,
                    boxShadow: "inset 0 0 12px rgba(0,0,0,0.35)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Bungee', Impact, sans-serif",
                      color: "var(--ink)",
                      fontSize: 13,
                      letterSpacing: "0.5px",
                      textAlign: "center",
                      lineHeight: 1.05,
                      padding: "0 6px",
                    }}
                  >
                    {d.city.toUpperCase()}
                  </span>
                </div>
              ))}

              {/* Bottle silhouette in front of labels (transparent windows for label) */}
              <svg
                viewBox="0 0 96 220"
                width="96"
                height="220"
                className="absolute left-0 top-0"
                style={{ transform: "translateZ(0px)", pointerEvents: "none" }}
              >
                <defs>
                  <linearGradient id="bottleGlass" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1a3d1f" />
                    <stop offset="35%" stopColor="#2f6b34" />
                    <stop offset="55%" stopColor="#5aa15f" />
                    <stop offset="75%" stopColor="#2f6b34" />
                    <stop offset="100%" stopColor="#0f2a13" />
                  </linearGradient>
                  <linearGradient id="bottleHighlight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>
                  <mask id="labelHole">
                    <rect width="96" height="220" fill="white" />
                    <rect x="6" y="95" width="84" height="70" rx="3" fill="black" />
                  </mask>
                </defs>

                {/* Bottle outline path: neck + shoulders + body */}
                <path
                  d="M38 6 H58 V20 Q58 24 60 28 L66 56 Q70 64 74 76 L74 200 Q74 214 60 214 H36 Q22 214 22 200 L22 76 Q26 64 30 56 L36 28 Q38 24 38 20 Z"
                  fill="url(#bottleGlass)"
                  stroke="#0a1f0c"
                  strokeWidth="1.5"
                  mask="url(#labelHole)"
                />
                {/* Cap */}
                <rect x="36" y="0" width="24" height="10" rx="1" fill="#1a1a1a" stroke="#000" strokeWidth="1" />
                <rect x="36" y="3" width="24" height="2" fill="#3a3a3a" />
                {/* Highlight stripe */}
                <rect
                  x="30"
                  y="30"
                  width="6"
                  height="170"
                  rx="3"
                  fill="url(#bottleHighlight)"
                  opacity="0.55"
                  mask="url(#labelHole)"
                />
                {/* Label border ring */}
                <rect
                  x="6"
                  y="95"
                  width="84"
                  height="70"
                  rx="3"
                  fill="none"
                  stroke="#0a1f0c"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>

          {/* front-facing pointer / aim line */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 -translate-x-1/2"
            style={{
              top: 6,
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "14px solid var(--amber)",
              filter: "drop-shadow(0 2px 0 rgba(0,0,0,0.5))",
            }}
          />
        </div>

        {/* result / hint */}
        <div className="mt-3">
          {result ? (
            <div
              key={landed}
              className="rounded-sm border border-[var(--amber)]/40 bg-[var(--amber)]/10 px-4 py-3"
              style={{ animation: "fade-in 280ms ease-out" }}
            >
              <div
                className="text-[var(--cream)]"
                style={{
                  fontFamily: "'Bungee', Impact, sans-serif",
                  fontSize: 20,
                  lineHeight: 1,
                }}
              >
                {result.country.toUpperCase()}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--amber)]">
                {result.note}
              </div>
              <p className="mt-3 text-sm leading-snug text-[var(--cream)]/85">
                {COUNTRY_PHRASES[result.country] ?? "Down to go?"}
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setVote("yes")}
                  className={`flex-1 border-2 px-3 py-2 font-mono text-[11px] font-black uppercase tracking-[0.25em] transition ${
                    vote === "yes"
                      ? "border-[var(--amber)] bg-[var(--amber)] text-[var(--ink)]"
                      : "border-[var(--amber)] text-[var(--amber)] hover:bg-[var(--amber)] hover:text-[var(--ink)]"
                  }`}
                >
                  {vote === "yes" ? "noted ✓" : "hell yes"}
                </button>
                <button
                  onClick={() => setVote("no")}
                  className={`flex-1 border-2 px-3 py-2 font-mono text-[11px] font-black uppercase tracking-[0.25em] transition ${
                    vote === "no"
                      ? "border-[var(--cream)] bg-[var(--cream)] text-[var(--ink)]"
                      : "border-[var(--cream)]/50 text-[var(--cream)]/70 hover:border-[var(--cream)] hover:text-[var(--cream)]"
                  }`}
                >
                  {vote === "no" ? "noted" : "nah, next"}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--cream)]/50">
              {spinning ? "deciding your fate…" : "drag to spin · or ↓"}
            </div>
          )}
        </div>

        <button
          onClick={spin}
          disabled={spinning}
          className="mt-2 w-full border-2 border-[var(--amber)] bg-[var(--amber)] px-4 py-2.5 font-mono text-[12px] font-black uppercase tracking-[0.3em] text-[var(--ink)] transition hover:bg-transparent hover:text-[var(--amber)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {spinning ? "spinning…" : result ? "spin again" : "spin the bottle"}
        </button>
      </div>
    </div>
  );
}
