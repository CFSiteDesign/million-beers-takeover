import { useEffect, useRef, useState } from "react";

const START = 20847;
const GOAL = 1_000_000;

function Digit({ value }: { value: number }) {
  return (
    <div
      style={{
        position: "relative",
        width: "0.7em",
        height: "1em",
        overflow: "hidden",
        background: "rgba(0,0,0,0.06)",
        borderRadius: 6,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          transform: `translateY(-${value}em)`,
          transition: "transform 0.6s cubic-bezier(.2,.8,.2,1)",
        }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            style={{
              height: "1em",
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {i}
          </span>
        ))}
      </div>
    </div>
  );
}

export function LiveBeerCounter() {
  const [count, setCount] = useState(START);
  const [pops, setPops] = useState<{ id: number; x: number }[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + 1);
      const popId = ++idRef.current;
      const x = 30 + Math.random() * 40; // 30%–70%
      setPops((p) => [...p, { id: popId, x }]);
      setTimeout(() => {
        setPops((p) => p.filter((it) => it.id !== popId));
      }, 1600);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const str = count.toString().padStart(7, "0");

  return (
    <div className="relative inline-flex flex-col items-center text-[var(--ink)]">
      <div className="mb-3 inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--ink)]">
        <span
          aria-hidden
          className="inline-block h-2 w-2 rounded-full bg-red-500"
          style={{ animation: "beer-pulse 1.6s infinite" }}
        />
        Live · Pouring Now
      </div>

      <div
        className="relative inline-flex items-end gap-[0.05em]"
        style={{
          fontFamily: "'Bungee', Impact, sans-serif",
          fontSize: "clamp(2.4rem, 7vw, 4.8rem)",
          color: "var(--ink)",
          lineHeight: 1,
          filter: "drop-shadow(3px 3px 0 var(--amber))",
        }}
      >
        {str.split("").map((ch, i) => (
          <span key={i} className="contents">
            <Digit value={Number(ch)} />
            {(str.length - i - 1) % 3 === 0 && i !== str.length - 1 && (
              <span style={{ lineHeight: 1, alignSelf: "flex-end", padding: "0 0.05em" }}>,</span>
            )}
          </span>
        ))}

        {pops.map((p) => (
          <span
            key={p.id}
            aria-hidden
            style={{
              position: "absolute",
              left: `${p.x}%`,
              bottom: "100%",
              fontFamily: "'Bungee', Impact, sans-serif",
              fontSize: "1.5rem",
              color: "var(--ink)",
              textShadow: "2px 2px 0 var(--amber)",
              animation: "beer-float 1.6s ease-out forwards",
              pointerEvents: "none",
            }}
          >
            🍺
          </span>
        ))}
      </div>

      <div className="mt-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--ink)]/70">
        of <b className="text-[var(--ink)]" style={{ fontFamily: "'Bungee', Impact, sans-serif", fontWeight: 400 }}>{GOAL.toLocaleString()}</b> beers
      </div>
    </div>
  );
}
