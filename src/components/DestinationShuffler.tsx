import { useRef, useState } from "react";

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
const SEG = 360 / N;

export function DestinationShuffler() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [landed, setLanded] = useState<number | null>(null);
  const [vote, setVote] = useState<"yes" | "no" | null>(null);
  const totalRef = useRef(0);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setLanded(null);
    setVote(null);
    const target = Math.floor(Math.random() * N);
    const turns = 5 + Math.floor(Math.random() * 3);
    const next =
      totalRef.current === 0
        ? 360 * turns - (target * SEG + SEG / 2)
        : totalRef.current +
          360 * turns +
          (-(target * SEG + SEG / 2) - (totalRef.current % 360));
    totalRef.current = next;
    setRotation(next);
    setTimeout(() => {
      setSpinning(false);
      setLanded(target);
    }, 4200);
  };

  const result = landed != null ? DESTINATIONS[landed] : null;

  // Smaller wheel
  const SIZE = 220;
  const R = 100;
  const cx = 110;
  const cy = 110;

  return (
    <div className="hidden lg:block">
      <div className="relative overflow-hidden rounded-sm border-2 border-[var(--cream)]/15 bg-gradient-to-b from-[var(--cream)]/[0.04] to-transparent p-5">
        <div className="border-b border-[var(--cream)]/10 pb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--cream)]/60">
          spin · the · vibe
        </div>

        <div
          className="relative mx-auto mt-4 flex items-center justify-center"
          style={{ height: SIZE, width: SIZE }}
        >
          <div className="pointer-events-none absolute inset-0 rounded-full bg-[var(--amber)]/15 blur-3xl" />

          <div
            aria-hidden
            className="absolute left-1/2 top-[-2px] z-20 -translate-x-1/2"
            style={{
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "18px solid var(--amber)",
              filter: "drop-shadow(0 2px 0 rgba(0,0,0,0.4))",
            }}
          />

          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="relative z-10 h-full w-full"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning
                ? "transform 4.2s cubic-bezier(.17,.67,.16,1)"
                : "none",
              filter: "drop-shadow(0 8px 22px rgba(0,0,0,0.5))",
            }}
          >
            <circle
              cx={cx}
              cy={cy}
              r={R + 5}
              fill="var(--ink)"
              stroke="var(--amber)"
              strokeWidth="2"
            />
            {DESTINATIONS.map((d, i) => {
              const a0 = (i * SEG - 90) * (Math.PI / 180);
              const a1 = ((i + 1) * SEG - 90) * (Math.PI / 180);
              const x0 = cx + R * Math.cos(a0);
              const y0 = cy + R * Math.sin(a0);
              const x1 = cx + R * Math.cos(a1);
              const y1 = cy + R * Math.sin(a1);
              const path = `M ${cx} ${cy} L ${x0} ${y0} A ${R} ${R} 0 0 1 ${x1} ${y1} Z`;
              const fill = i % 2 === 0 ? "var(--amber)" : "var(--cream)";
              const labelAngle = i * SEG + SEG / 2 - 90;
              const lr = R * 0.7;
              const lx = cx + lr * Math.cos((labelAngle * Math.PI) / 180);
              const ly = cy + lr * Math.sin((labelAngle * Math.PI) / 180);
              const flip = labelAngle > 0 && labelAngle < 180;
              const rot = flip ? labelAngle + 180 : labelAngle;
              return (
                <g key={i}>
                  <path d={path} fill={fill} stroke="var(--ink)" strokeWidth="1.2" />
                  <text
                    x={lx}
                    y={ly}
                    fill="var(--ink)"
                    fontSize="13"
                    fontFamily="'Bungee', Impact, sans-serif"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${rot} ${lx} ${ly})`}
                    style={{ letterSpacing: "0.2px" }}
                  >
                    {d.city.toUpperCase()}
                  </text>
                </g>
              );
            })}
            <circle cx={cx} cy={cy} r="16" fill="var(--ink)" stroke="var(--amber)" strokeWidth="2.5" />
            <circle cx={cx} cy={cy} r="4" fill="var(--amber)" />
          </svg>
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
              {spinning ? "deciding your fate…" : "pick your destiny ↓"}
            </div>
          )}
        </div>

        <button
          onClick={spin}
          disabled={spinning}
          className="mt-2 w-full border-2 border-[var(--amber)] bg-[var(--amber)] px-4 py-2.5 font-mono text-[12px] font-black uppercase tracking-[0.3em] text-[var(--ink)] transition hover:bg-transparent hover:text-[var(--amber)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {spinning ? "spinning…" : result ? "spin again" : "spin the wheel"}
        </button>
      </div>
    </div>
  );
}
