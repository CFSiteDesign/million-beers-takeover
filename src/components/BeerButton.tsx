import { type ButtonHTMLAttributes, type ReactNode } from "react";

type BeerButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

/** Premium "fills with beer on hover" CTA button. */
export function BeerButton({ children, className = "", ...rest }: BeerButtonProps) {
  // 14 bubbles with deterministic-ish randomized positions
  const bubbles = Array.from({ length: 14 }).map((_, i) => {
    const left = 6 + ((i * 6.7) % 88);
    const size = 4 + ((i * 3) % 7);
    const delay = ((i * 0.31) % 2.4).toFixed(2);
    const dur = (2 + ((i * 0.27) % 1.6)).toFixed(2);
    const drift = (((i * 7) % 9) - 4).toFixed(1);
    const drift2 = (((i * 5) % 9) - 4).toFixed(1);
    return (
      <span
        key={i}
        className="beer-bubble"
        style={
          {
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            "--dur": `${dur}s`,
            "--delay": `${delay}s`,
            "--drift": `${drift}px`,
            "--drift2": `${drift2}px`,
          } as React.CSSProperties
        }
      />
    );
  });

  return (
    <button type="button" className={`beer-btn ${className}`} {...rest}>
      <span className="beer-mask" aria-hidden>
        <span className="beer-liquid">
          <span className="beer-inner">
            <span className="beer-body" />
            <span className="beer-foam" />
            {bubbles}
          </span>
        </span>
      </span>
      <span className="beer-text">{children}</span>
    </button>
  );
}
