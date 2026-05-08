import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { Bubbles } from "@/components/Bubbles";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { ProgressBar } from "@/components/ProgressBar";
import { InterestForm } from "@/components/InterestForm";
import { MMHeader } from "@/components/MMHeader";
import { MMFooter } from "@/components/MMFooter";
import { FoamOverflowDivider } from "@/components/Dividers";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Million Beer Mission Takeover" },
      {
        name: "description",
        content: "We're picking a place. We're going there. And we want you in.",
      },
      { property: "og:title", content: "The Million Beer Mission Takeover" },
      {
        property: "og:description",
        content: "We're picking a place. We're going there. And we want you in.",
      },
      {
        property: "og:image",
        content: "https://placehold.co/1200x630/0A0A0A/F5B82E?text=Million+Beer+Mission",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bungee&family=Bungee+Shade&family=Shrikhand&family=Anton&family=Caveat:wght@400;700&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap",
      },
      {
        rel: "icon",
        href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%230A0A0A'/%3E%3Ctext x='50' y='72' font-size='72' text-anchor='middle' fill='%23F5B82E'%3E%F0%9F%8D%BA%3C/text%3E%3C/svg%3E",
      },
    ],
  }),
  component: Index,
});

const TICKER = "NO SPAM   //   NO PAYMENT NOW   //   YOU PICK THE DESTINATION   //   ";

function Index() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="paper-grain relative min-h-screen overflow-x-hidden bg-[var(--ink)] text-[var(--cream)]">
      <MMHeader />
      <Bubbles density={7} />
      <Toaster position="top-center" theme="dark" richColors />

      <main className="relative z-10">
        {/* ============ 01 HERO ============ */}
        <section className="relative overflow-hidden bg-[var(--ink)] pt-16 pb-0">
          <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8 px-6 pb-24 lg:gap-12 lg:px-10">
            <div className="col-span-12 lg:col-span-7">
              <div className="flex items-baseline gap-4">
                <span className="section-num text-[var(--amber)]">01</span>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--amber)]">
                  Million Beer Mission · Takeover #01
                </p>
              </div>

              <h1 className="mt-8 font-display text-[var(--cream)]" style={{ lineHeight: 0.82 }}>
                <span className="block uppercase" style={{ fontSize: "clamp(56px, 12vw, 140px)" }}>
                  THE
                </span>
                <span
                  className="block uppercase text-[var(--amber)] text-shadow-poster"
                  style={{
                    fontSize: "clamp(80px, 18vw, 220px)",
                    letterSpacing: "-0.02em",
                    fontFamily: "'Bungee Shade', 'Bungee', Impact, sans-serif",
                  }}
                >
                  TAKEOVER
                </span>
                <span
                  className="font-script mt-4 block lowercase text-[var(--amber)]"
                  style={{ fontSize: "clamp(44px, 8vw, 90px)", lineHeight: 0.9 }}
                >
                  is happening.
                </span>
              </h1>

              <p className="mt-10 max-w-md text-xl font-semibold text-[var(--cream)]">
                We're picking a place. We're going there.{" "}
                <span className="bg-[var(--amber)] px-2 text-[var(--ink)]">And we want you in.</span>
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <button onClick={() => scrollTo("form")} className="btn-stamp text-2xl">
                  I'M IN ✦ COUNT ME
                </button>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--cream)]/70">
                  no commitment · no payment
                </span>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5">
              <div className="ml-auto w-full max-w-sm">
                <div className="polaroid-tape">
                  <img
                    data-image-slot="hero-bg"
                    src="https://placehold.co/600x800/0A0A0A/F5B82E?text=HERO+POLAROID"
                    alt="Trip 01 placeholder"
                    className="zine-photo h-80 w-full object-cover"
                  />
                  <p
                    className="font-script mt-3 text-center text-[var(--ink)]"
                    style={{ fontSize: 26 }}
                  >
                    trip 01 · destination tbc
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ProgressBar variant="status" />
        </section>

        <FoamOverflowDivider />

        {/* ============ 02 WHAT IS THE TAKEOVER (cream) ============ */}
        <section className="relative bg-[var(--cream)] text-[var(--ink)]">
          <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 py-20 lg:gap-10 lg:px-10 lg:py-28">
            <div className="col-span-12 lg:col-span-1">
              <span className="section-num text-[var(--ink)]">02</span>
            </div>

            <Reveal className="col-span-12 lg:col-span-7">
              <span className="sticker pink tilt-l text-sm">▸ what's the deal</span>
              <h2
                className="mt-5 font-display uppercase"
                style={{
                  fontSize: "clamp(56px, 10vw, 140px)",
                  lineHeight: 0.85,
                  fontFamily: "'Bungee', Impact, sans-serif",
                }}
              >
                <span className="block tilt-l">What's a</span>
                <span className="block text-[var(--hot-pink)] text-shadow-poster-amber tilt-r" style={{ fontFamily: "'Bungee Shade', 'Bungee', Impact, sans-serif" }}>
                  TAKEOVER?
                </span>
              </h2>
              <div className="mt-10 max-w-xl space-y-5 text-lg leading-relaxed">
                <p>A Takeover is simple. A group of MM people go somewhere new together.</p>
                <p>
                  New city. <span className="bg-[var(--lime)] px-1">New beers.</span>{" "}
                  New stories. Some of you know each other already.
                  Most of you don't.
                </p>
              </div>
              <p
                className="font-script mt-12 -ml-2 text-[var(--stamp-red)] tilt-lg-l"
                style={{ fontSize: "clamp(44px, 8vw, 96px)", lineHeight: 0.95 }}
              >
                "that's kinda the whole point."
              </p>
              <p className="mt-10 max-w-lg text-base">
                We don't have a destination yet. We're picking based on who's in and where
                people want to go. <strong>Register, tell us your vibe, help shape it.</strong>
              </p>
            </Reveal>

            <div className="col-span-12 lg:col-span-4">
              <div className="relative mx-auto h-[900px] w-full max-w-sm">
                {[
                  { slot: "polaroid-1", caption: "siem reap, 2am", rot: -6, x: -20, y: 0 },
                  { slot: "polaroid-2", caption: "el nido vibes", rot: 4, x: 30, y: 300 },
                  { slot: "polaroid-3", caption: "bali, definitely", rot: -2, x: -10, y: 600 },
                ].map((p, i) => (
                  <div
                    key={p.slot}
                    className="polaroid-tape absolute left-1/2 top-0 w-56"
                    style={{
                      transform: `translate(calc(-50% + ${p.x}px), ${p.y}px) rotate(${p.rot}deg)`,
                      zIndex: i,
                    }}
                  >
                    <img
                      data-image-slot={p.slot}
                      src={`https://placehold.co/400x500/0A0A0A/F5B82E?text=${encodeURIComponent(p.caption)}`}
                      alt={p.caption}
                      className="zine-photo h-48 w-full object-cover"
                    />
                    <p
                      className="mt-3 text-center text-[var(--ink)]"
                      style={{ fontFamily: "'Caveat', cursive, var(--font-sans)", fontSize: 18 }}
                    >
                      {p.caption}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FoamOverflowDivider />

        {/* ============ 03 COMMUNITY (black, right-aligned headline) ============ */}
        <section className="relative bg-[var(--ink)] text-[var(--cream)]">
          <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 pt-20 lg:gap-10 lg:px-10 lg:pt-28">
            <div className="col-span-6 lg:col-span-2">
              <span className="section-num text-[var(--cream)]">03</span>
            </div>
            <Reveal className="col-span-12 text-right lg:col-span-10">
              <span className="sticker electric tilt-r text-sm">▸ the army</span>
              <h2
                className="mt-5 font-display uppercase"
                style={{
                  fontSize: "clamp(44px, 9vw, 130px)",
                  lineHeight: 0.85,
                  fontFamily: "'Bungee', Impact, sans-serif",
                }}
              >
                <span className="block tilt-r">20,000+ photos.</span>
                <span className="block text-[var(--lime)] tilt-l">hundreds of legends.</span>
                <span
                  className="block text-[var(--amber)] text-shadow-poster-electric tilt-r"
                  style={{ fontFamily: "'Bungee Shade', 'Bungee', Impact, sans-serif" }}
                >
                  ONE STUPID GOAL.
                </span>
              </h2>
            </Reveal>
          </div>

          {/* Marquee — tight, no gaps, hard borders */}
          <div className="relative mt-12 overflow-hidden border-y-2 border-[var(--cream)]">
            <div className="marquee-track flex w-max">
              {Array.from({ length: 24 }).map((_, i) => {
                const n = (i % 12) + 1;
                const rot = i % 2 === 0 ? -1 : 1;
                return (
                  <div
                    key={i}
                    className="h-40 w-40 flex-shrink-0 overflow-hidden border-2 border-[var(--cream)] sm:h-48 sm:w-48"
                    style={{ transform: `rotate(${rot * 0.6}deg)` }}
                  >
                    <img
                      data-image-slot={`marquee-${n}`}
                      src={`https://placehold.co/300x300/0A0A0A/F5B82E?text=BEER+${n}`}
                      alt=""
                      className="zine-photo h-full w-full object-cover"
                      style={{ filter: "contrast(1.1) saturate(0.7) sepia(0.15)" }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Magazine fact panel */}
          <Reveal className="mx-auto mt-16 max-w-5xl px-6 pb-20 lg:px-10 lg:pb-28">
            <div className="grid grid-cols-1 border-2 border-[var(--cream)] sm:grid-cols-3">
              {[
                { n: 20847, label: "beers logged" },
                { n: 47, label: "countries" },
                { n: 1_000_000, label: "to go" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={`p-8 ${i < 2 ? "sm:border-r-2 sm:border-[var(--cream)]" : ""} ${i < 2 ? "border-b-2 border-[var(--cream)] sm:border-b-0" : ""}`}
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--amber)]">
                    {s.label}
                  </p>
                  <div
                    className="mt-2 font-display text-[var(--cream)]"
                    style={{ fontSize: "clamp(56px, 9vw, 110px)", lineHeight: 0.85 }}
                  >
                    <Counter to={s.n} />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <FoamOverflowDivider />

        {/* ============ 04 FORM (amber band into cream panel) ============ */}
        <section className="relative bg-[var(--amber)] text-[var(--ink)]">
          <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 py-20 lg:gap-10 lg:px-10 lg:py-28">
            <div className="col-span-12 lg:col-span-1">
              <span className="section-num text-[var(--ink)]">04</span>
            </div>

            <div className="col-span-12 lg:col-span-5">
              <span className="sticker pink tilt-l text-sm">▸ tell us you're in</span>
              <h2
                className="mt-5 font-display uppercase"
                style={{
                  fontSize: "clamp(64px, 11vw, 150px)",
                  lineHeight: 0.82,
                  fontFamily: "'Bungee Shade', 'Bungee', Impact, sans-serif",
                }}
              >
                <span className="block tilt-l">GET</span>
                <span className="block tilt-r">ON THE</span>
                <span className="block text-[var(--stamp-red)] tilt-lg-l">LIST.</span>
              </h2>
              <p className="mt-8 max-w-sm text-base text-[var(--ink)]">
                No commitment. No payment. Once we see who's in, we'll share destination
                options, rough dates, and pricing. <strong>You'll get a vote.</strong>
              </p>
            </div>

            <div id="form" className="col-span-12 lg:col-span-6">
              <Reveal>
                <InterestForm />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============ 05 TICKER ============ */}
        <section
          aria-label="Trip terms"
          className="relative overflow-hidden bg-[var(--amber)] text-[var(--ink)]"
        >
          <div className="ticker-track flex w-max whitespace-nowrap py-5 font-mono text-base font-bold uppercase tracking-[0.25em] sm:text-lg">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="px-4">{TICKER}</span>
            ))}
          </div>
        </section>

        {/* ============ 06 PRE-FOOTER CTA (full bleed black) ============ */}
        <section className="relative bg-[var(--ink)] text-[var(--cream)]">
          <div className="mx-auto grid max-w-7xl grid-cols-12 items-center gap-6 px-6 py-20 lg:gap-10 lg:px-10 lg:py-28">
            <div className="col-span-12 lg:col-span-2">
              <span className="section-num text-[var(--amber)]">06</span>
            </div>
            <h2
              className="col-span-12 font-display uppercase lg:col-span-7"
              style={{
                fontSize: "clamp(48px, 8vw, 110px)",
                lineHeight: 0.85,
                fontFamily: "'Bungee', Impact, sans-serif",
              }}
            >
              <span className="block tilt-l">Still here?</span>
              <span
                className="block text-[var(--lime)] text-shadow-poster tilt-r"
                style={{ fontFamily: "'Bungee Shade', 'Bungee', Impact, sans-serif" }}
              >
                GET IN.
              </span>
            </h2>
            <div className="col-span-12 flex justify-start lg:col-span-3 lg:justify-end">
              <button onClick={() => scrollTo("form")} className="btn-stamp btn-dark text-2xl tilt-r">
                🍻 I'M IN
              </button>
            </div>
          </div>
        </section>
      </main>

      <MMFooter />
    </div>
  );
}
