import { useEffect, useMemo, useState } from "react";

type Bubble = {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  drift: number;
  wob: number;
};

export function Bubbles({ density = 7 }: { density?: number }) {
  const [mounted, setMounted] = useState(false);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    setMounted(true);
    const m = window.matchMedia("(max-width: 640px)");
    const onChange = () => setMobile(m.matches);
    onChange();
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, []);

  const count = mobile ? Math.max(4, Math.round(density * 0.6)) : density;

  const bubbles = useMemo<Bubble[]>(() => {
    if (!mounted) return [];
    return Array.from({ length: count }, (_, i) => {
      const size = 5 + Math.random() * 12;
      return {
        id: i,
        size,
        left: Math.random() * 100,
        duration: 18 + Math.random() * 22,
        delay: -Math.random() * 30,
        drift: (Math.random() - 0.5) * 60,
        wob: 6 + Math.random() * 14,
      };
    });
  }, [count, mounted]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="bubble"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            ["--drift" as never]: `${b.drift}px`,
          }}
        >
          <span
            className="bubble-inner block"
            style={{
              animationDuration: `${b.duration / 3}s`,
              ["--wob" as never]: `${b.wob}px`,
            }}
          />
        </span>
      ))}
    </div>
  );
}
