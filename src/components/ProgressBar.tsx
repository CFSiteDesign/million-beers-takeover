import { useEffect, useMemo, useState } from "react";

export function ProgressBar({ variant = "inline" }: { variant?: "inline" | "status" }) {
  const start = 20847;
  const goal = 1_000_000;
  const [count, setCount] = useState(start);
  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + 1), 4000);
    return () => clearInterval(id);
  }, []);
  const pct = useMemo(() => Math.max(2.1, (count / goal) * 100), [count]);

  if (variant === "status") {
    return (
      <div className="absolute inset-x-0 bottom-0 z-20 w-full">
        <div className="flex items-center justify-between border-t-2 border-[var(--ink)] bg-[var(--ink)] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--cream)]">
          <span className="text-[var(--amber)]">{count.toLocaleString()} logged</span>
          <span className="opacity-70">target / 1,000,000</span>
        </div>
        <div className="relative h-2 w-full bg-[var(--ink)]">
          <div
            className="status-bar-fill transition-[width] duration-1000 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-1 flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.2em]">
        <span className="text-[var(--amber)]">{count.toLocaleString()}</span>
        <span className="text-[var(--cream)]/70">/ 1,000,000</span>
      </div>
      <div className="relative h-2 w-full border border-[var(--ink)] bg-[var(--ink)]">
        <div className="status-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
