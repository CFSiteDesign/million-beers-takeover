import { useEffect, useRef, useState } from "react";
import { COUNTRIES } from "@/lib/countries";

type Props = {
  value: string; // e.g. "+1"
  onChange: (v: string) => void;
};

export function DialCodeSelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = COUNTRIES.find((c) => c.dial === value) ?? COUNTRIES[0];

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    setTimeout(() => inputRef.current?.focus(), 10);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const filtered = q
    ? COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(q.toLowerCase()) ||
          c.dial.includes(q) ||
          c.code.toLowerCase().includes(q.toLowerCase())
      )
    : COUNTRIES;

  return (
    <div ref={wrapRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="zine-input flex h-full items-center gap-1 whitespace-nowrap pr-2"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span aria-hidden>{selected.flag}</span>
        <span className="font-mono">{selected.dial}</span>
        <span aria-hidden className="ml-1 text-xs opacity-60">▾</span>
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-1 w-72 max-w-[80vw] overflow-hidden border-2 bg-[var(--cream)] shadow-lg"
          style={{ borderColor: "var(--ink)" }}
        >
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search country…"
            className="w-full border-b-2 bg-transparent px-3 py-2 text-sm outline-none"
            style={{ borderColor: "var(--ink)" }}
          />
          <ul role="listbox" className="max-h-64 overflow-y-auto">
            {filtered.map((c) => (
              <li key={c.code}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(c.dial);
                    setOpen(false);
                    setQ("");
                  }}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[var(--ink)]/10 ${
                    c.dial === value ? "bg-[var(--ink)]/10 font-semibold" : ""
                  }`}
                >
                  <span aria-hidden>{c.flag}</span>
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className="font-mono text-xs opacity-70">{c.dial}</span>
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-3 py-3 text-sm opacity-60">No matches</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
