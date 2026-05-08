import { useRef, useState } from "react";

const DESTINATIONS = [
  { city: "Siem Reap", country: "Cambodia", note: "$0.50 draft beers" },
  { city: "Phnom Penh", country: "Cambodia", note: "rooftop riverside" },
  { city: "Koh Rong", country: "Cambodia", note: "plankton beaches" },
  { city: "Vang Vieng", country: "Laos", note: "tubing reborn" },
  { city: "El Nido", country: "Philippines", note: "island hop city" },
  { city: "Boracay", country: "Philippines", note: "white sand chaos" },
  { city: "Bali", country: "Indonesia", note: "rooftops + rice fields" },
  { city: "Gili T", country: "Indonesia", note: "no cars, all parties" },
];

const N = DESTINATIONS.length;
const SEG = 360 / N;

export function DestinationShuffler() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [landed, setLanded] = useState<number | null>(null);
  const totalRef = useRef(0);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setLanded(null);
    const target = Math.floor(Math.random() * N);
    // pointer is at top (12 o'clock). segment i center angle (clockwise from top): i*SEG + SEG/2
    // we rotate the wheel by -that + 360*turns so segment lands under pointer
    const turns = 5 + Math.floor(Math.random() * 3);
    const finalAngle = 360 * turns - (target * SEG + SEG / 2);
    totalRef.current = totalRef.current + (finalAngle - (totalRef.current % 360));
    // Simpler: just set absolute rotation
    const next = totalRef.current === 0 ? finalAngle : totalRef.current + 360 * turns + (-(target * SEG + SEG / 2) - (totalRef.current % 360));
    totalRef.current = next;
    setRotation(next);
    setTimeout(() => {
      setSpinning(false);
      setLanded(target);
    }, 4200);
  };

  const result = landed != null ? DESTINATIONS[landed] : null;

  // Build wheel SVG
  const R = 140;
  const cx = 150;
  const cy = 150;

  return (
    <div className="hidden lg:block">
      <div className="relative overflow-hidden rounded-sm border-2 border-[var(--cream)]/15 bg-gradient-to-b from-[var(--cream)]/[0.04] to-transparent p-6">
        <div className="flex items-center justify-between border-b border-[var(--cream)]/10 pb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--cream)]/60">
          <span>spin · the · vibe</span>
          <span className="flex items-center gap-2 text-[var(--amber)]">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--amber)]" />
            live
          </span>
        </div>

        <div className="relative mx-auto mt-6 flex h-[300px] w-[300px] items-center justify-center">
          {/* glow */}
          <div className="pointer-events-none absolute inset-0 rounded-full bg-[var(--amber)]/15 blur-3xl" />

          {/* pointer */}
          <div
            aria-hidden
            className="absolute left-1/2 top-[-2px] z-20 -translate-x-1/2"
            style={{
              width: 0,
              height: 0,
              borderLeft: "12px solid transparent",
              borderRight: "12px solid transparent",
              borderTop: "22px solid var(--amber)",
              filter: "drop-shadow(0 2px 0 rgba(0,0,0,0.4))",
            }}
          />

          {/* wheel */}
          <svg
            viewBox="0 0 300 300"
            className="relative z-10 h-full w-full"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning
                ? "transform 4.2s cubic-bezier(.17,.67,.16,1)"
                : "none",
              filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.5))",
            }}
          >
            <circle cx={cx} cy={cy} r={R + 6} fill="var(--ink)" stroke="var(--amber)" strokeWidth="2" />
            {DESTINATIONS.map((d, i) => {
              const a0 = (i * SEG - 90) * (Math.PI / 180);
              const a1 = ((i + 1) * SEG - 90) * (Math.PI / 180);
              const x0 = cx + R * Math.cos(a0);
              const y0 = cy + R * Math.sin(a0);
              const x1 = cx + R * Math.cos(a1);
              const y1 = cy + R * Math.sin(a1);
              const large = SEG > 180 ? 1 : 0;
              const path = `M ${cx} ${cy} L ${x0} ${y0} A ${R} ${R} 0 ${large} 1 ${x1} ${y1} Z`;
              const fill = i % 2 === 0 ? "var(--amber)" : "var(--cream)";
              const labelAngle = i * SEG + SEG / 2 - 90;
              const lr = R * 0.68;
              const lx = cx + lr * Math.cos((labelAngle * Math.PI) / 180);
              const ly = cy + lr * Math.sin((labelAngle * Math.PI) / 180);
              // flip text on bottom half so it stays right-side up
              const flip = labelAngle > 0 && labelAngle < 180;
              const rot = flip ? labelAngle + 180 : labelAngle;
              return (
                <g key={i}>
                  <path d={path} fill={fill} stroke="var(--ink)" strokeWidth="1.5" />
                  <text
                    x={lx}
                    y={ly}
                    fill="var(--ink)"
                    fontSize="9.5"
                    fontFamily="'Bungee', Impact, sans-serif"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${rot} ${lx} ${ly})`}
                    style={{ letterSpacing: "0.3px" }}
                  >
                    {d.city.toUpperCase()}
                  </text>
                </g>
              );
            })}
            {/* hub */}
            <circle cx={cx} cy={cy} r="22" fill="var(--ink)" stroke="var(--amber)" strokeWidth="3" />
            <circle cx={cx} cy={cy} r="6" fill="var(--amber)" />
          </svg>
        </div>

        {/* result / cta */}
        <div className="mt-4 min-h-[64px]">
          {result ? (
            <div
              key={landed}
              className="flex items-center justify-between rounded-sm border border-[var(--amber)]/40 bg-[var(--amber)]/10 px-4 py-3"
              style={{ animation: "fade-in 280ms ease-out" }}
            >
              <div>
                <div
                  className="text-[var(--cream)]"
                  style={{
                    fontFamily: "'Bungee', Impact, sans-serif",
                    fontSize: 20,
                    lineHeight: 1,
                  }}
                >
                  {result.city.toUpperCase()}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--amber)]">
                  {result.country} · {result.note}
                </div>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--cream)]/60">
                rumour
              </span>
            </div>
          ) : (
            <div className="flex h-full items-center font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--cream)]/50">
              {spinning ? "deciding your fate…" : "pick your destiny ↓"}
            </div>
          )}
        </div>

        <button
          onClick={spin}
          disabled={spinning}
          className="mt-4 w-full border-2 border-[var(--amber)] bg-[var(--amber)] px-4 py-3 font-mono text-[12px] font-black uppercase tracking-[0.3em] text-[var(--ink)] transition hover:bg-transparent hover:text-[var(--amber)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {spinning ? "spinning…" : result ? "spin again" : "spin the wheel"}
        </button>

        <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--cream)]/40">
          for the vibes only · real shortlist drops once you're on the list
        </p>
      </div>
    </div>
  );
}
