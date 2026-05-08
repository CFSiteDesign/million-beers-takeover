import { useEffect, useRef, useState } from "react";

const DESTINATIONS = [
  { city: "Siem Reap", country: "Cambodia", emoji: "🛺", note: "$0.50 draft beers" },
  { city: "El Nido", country: "Philippines", emoji: "🏝️", note: "island hop city" },
  { city: "Bali", country: "Indonesia", emoji: "🌋", note: "rooftops + rice fields" },
  { city: "Hoi An", country: "Vietnam", emoji: "🏮", note: "lanterns & bia hơi" },
  { city: "Pai", country: "Thailand", emoji: "🛵", note: "loop the mountains" },
  { city: "Vang Vieng", country: "Laos", emoji: "🛶", note: "tubing reborn" },
  { city: "Koh Rong", country: "Cambodia", emoji: "🌊", note: "plankton beaches" },
  { city: "Medellín", country: "Colombia", emoji: "🌆", note: "city of eternal spring" },
];

export function DestinationShuffler() {
  const [index, setIndex] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [votes, setVotes] = useState<Record<number, number>>({});
  const [voted, setVoted] = useState<Set<number>>(new Set());
  const tickRef = useRef<number | null>(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    let elapsed = 0;
    let delay = 60;
    const step = () => {
      setIndex((i) => (i + 1) % DESTINATIONS.length);
      elapsed += delay;
      delay = Math.min(delay * 1.18, 380);
      if (elapsed < 1800) {
        tickRef.current = window.setTimeout(step, delay);
      } else {
        setSpinning(false);
      }
    };
    tickRef.current = window.setTimeout(step, delay);
  };

  useEffect(() => () => {
    if (tickRef.current) clearTimeout(tickRef.current);
  }, []);

  const current = DESTINATIONS[index];
  const currentVotes = votes[index] ?? Math.floor(20 + index * 7);
  const hasVoted = voted.has(index);

  const vote = () => {
    if (hasVoted || spinning) return;
    setVotes((v) => ({ ...v, [index]: currentVotes + 1 }));
    setVoted((s) => new Set(s).add(index));
  };

  return (
    <div className="hidden lg:block">
      <div className="relative overflow-hidden rounded-sm border-2 border-[var(--cream)]/20 bg-[var(--cream)]/5 p-6">
        <div className="flex items-center justify-between border-b border-[var(--cream)]/15 pb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--cream)]/60">
          <span>destination roulette · top secret</span>
          <span className="text-[var(--amber)]">live preview</span>
        </div>

        <div className="mt-5 grid grid-cols-[1fr_auto] items-center gap-6">
          <div className="min-w-0">
            <div
              key={index}
              className={`font-display text-[var(--cream)] ${spinning ? "opacity-70" : "opacity-100"}`}
              style={{
                fontSize: "clamp(28px, 3vw, 44px)",
                lineHeight: 1,
                fontFamily: "'Bungee', Impact, sans-serif",
                transition: "opacity 120ms ease",
              }}
            >
              {current.city.toUpperCase()}
            </div>
            <div className="mt-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--amber)]">
              <span>{current.country}</span>
              <span className="text-[var(--cream)]/40">·</span>
              <span className="text-[var(--cream)]/70 normal-case tracking-normal font-sans text-sm">
                {current.note}
              </span>
            </div>
          </div>
          <div
            aria-hidden
            className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[var(--amber)] bg-[var(--ink)] text-4xl shadow-[0_0_0_4px_var(--ink),0_0_0_6px_var(--amber)]"
            style={{
              transform: spinning ? "rotate(720deg)" : "rotate(0deg)",
              transition: "transform 1.8s cubic-bezier(.2,.8,.2,1)",
            }}
          >
            {current.emoji}
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <button
            onClick={spin}
            disabled={spinning}
            className="flex-1 border-2 border-[var(--amber)] bg-transparent px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--amber)] transition hover:bg-[var(--amber)] hover:text-[var(--ink)] disabled:opacity-50"
          >
            {spinning ? "spinning…" : "spin the globe"}
          </button>
          <button
            onClick={vote}
            disabled={spinning || hasVoted}
            className="flex items-center gap-2 border-2 border-[var(--cream)] bg-[var(--cream)] px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--ink)] transition hover:bg-[var(--amber)] hover:border-[var(--amber)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {hasVoted ? "voted ✓" : "vote +1"}
            <span className="tabular-nums opacity-70">{currentVotes}</span>
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--cream)]/50">
          <span>{DESTINATIONS.length} candidates rumoured</span>
          <span>{Object.keys(votes).length}/8 you've voted</span>
        </div>

        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--amber)]/10 blur-2xl" />
      </div>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--cream)]/40">
        ↑ just a teaser. real shortlist drops once you're on the list.
      </p>
    </div>
  );
}
