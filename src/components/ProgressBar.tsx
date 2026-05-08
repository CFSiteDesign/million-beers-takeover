import { useEffect, useMemo, useState } from "react";
import { Counter } from "./Counter";

export function ProgressBar() {
  const start = 20847;
  const goal = 1_000_000;
  const [count, setCount] = useState(start);
  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + 1), 4000);
    return () => clearInterval(id);
  }, []);
  const pct = useMemo(() => Math.max(2.5, (count / goal) * 100), [count]);

  return (
    <div className="w-full max-w-xl">
      <div className="mb-2 flex items-baseline justify-between font-display text-sm tracking-widest text-[var(--cream)]">
        <span className="text-[var(--amber)]">
          <Counter to={count} duration={800} /> 
        </span>
        <span className="text-[var(--cream)]/70">/ 1,000,000 BEERS</span>
      </div>
      <div className="relative h-5 w-full overflow-hidden rounded-full border border-[var(--amber)]/40 bg-black/50 shadow-inner">
        <div
          className="absolute inset-y-0 left-0 transition-[width] duration-1000 ease-out"
          style={{
            width: `${pct}%`,
            background:
              "linear-gradient(to right, var(--amber-deep), var(--amber))",
          }}
        >
          {/* foam top */}
          <div
            className="liquid-top absolute -top-1 left-0 h-2 w-[150%]"
            style={{
              background:
                "radial-gradient(circle at 10% 50%, var(--foam) 2px, transparent 3px)," +
                "radial-gradient(circle at 30% 60%, var(--cream) 2px, transparent 3px)," +
                "radial-gradient(circle at 55% 40%, var(--foam) 1.5px, transparent 2.5px)," +
                "radial-gradient(circle at 80% 50%, var(--cream) 2px, transparent 3px)",
              backgroundColor: "var(--cream)",
              borderRadius: "9999px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
