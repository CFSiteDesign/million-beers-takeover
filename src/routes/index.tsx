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
import heroImage from "@/assets/mil_beers_hero.png";
import { BeerButton } from "@/components/BeerButton";
import { CountUp } from "@/components/CountUp";
import { DestinationShuffler } from "@/components/DestinationShuffler";
import { LiveBeerCounter } from "@/components/LiveBeerCounter";

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

// Foam dividers overlap their neighbours by ~50%, so sections only need a
// modest internal padding above their content.
const SECTION_PY = "pt-14 pb-16 lg:pt-24 lg:pb-28";

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
        {/* ============ 01 HERO (amber / beer) ============ */}
        <section className="relative overflow-hidden pt-14 pb-24 text-[var(--ink)] lg:pt-24 lg:pb-36">
          <div aria-hidden className="pint-pour absolute inset-0 z-0 bg-[var(--amber)]" />
          <Bubbles density={14} scope="section" />
          <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-12 items-center gap-8 px-5 lg:gap-12 lg:px-10">
            <div className="col-span-12 lg:col-span-7 xl:col-span-8">
              <h1 className="font-display max-w-[980px] text-[var(--ink)]" style={{ lineHeight: 0.86 }}>
                <span className="block uppercase" style={{ fontSize: "clamp(40px, 8vw, 108px)" }}>
                  THE
                </span>
                <span
                  className="block max-w-full overflow-hidden uppercase text-[var(--ink)]"
                  style={{
                    fontSize: "clamp(46px, 8.4vw, 118px)",
                    fontFamily: "'Bungee Shade', 'Bungee', Impact, sans-serif",
                  }}
                >
                  TAKEOVER
                </span>
                <span
                  className="font-script mt-2 block lowercase text-[var(--ink)]"
                  style={{ fontSize: "clamp(28px, 6vw, 72px)", lineHeight: 0.9 }}
                >
                  is happening.
                </span>
              </h1>

              <p className="mt-6 max-w-md text-base font-semibold text-[var(--ink)] sm:mt-8 sm:text-xl">
                We're picking a place. We're going there.{" "}
                <span className="bg-[var(--ink)] px-2 text-[var(--amber)]">And we want you in.</span>
              </p>

              <div className="mt-8 max-w-md">
                <div className="mb-2 flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--ink)]">
                  <span className="font-bold">20,847 beers logged</span>
                  <span className="text-[var(--ink)]/60">/ 1,000,000</span>
                </div>
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-[var(--ink)]/15">
                  <div
                    className="h-full rounded-full bg-[var(--ink)] transition-[width] duration-1000 ease-out"
                    style={{ width: "2.1%" }}
                  />
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink)]/60">
                  2.1% to the million
                </div>
              </div>

              <div className="mt-6">
                <BeerButton onClick={() => scrollTo("form")}>I'm in</BeerButton>
              </div>
            </div>

            <div className="col-span-12 flex justify-center self-start lg:col-span-5 lg:-mt-6 lg:justify-end xl:col-span-4">
              <div className="w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[400px]" style={{ transform: "rotate(-4deg)" }}>
                <div className="polaroid-tape">
                  <img
                    data-image-slot="hero-bg"
                    src={heroImage}
                    alt="Mad Monkey crew clinking beers at sunset on a rooftop"
                    className="zine-photo aspect-[4/3] w-full object-cover"
                  />
                  <p
                    className="mt-3 text-center text-[var(--ink)]"
                    style={{ fontFamily: "'Caveat', 'Kalam', cursive", fontSize: 24, transform: "rotate(-2deg)" }}
                  >
                    team mad monkey xox
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FoamOverflowDivider />

        {/* ============ 02 WHAT IS THE TAKEOVER (ink) ============ */}
        <section className={`relative bg-[var(--ink)] text-[var(--cream)] ${SECTION_PY}`}>
          <div className="mx-auto grid max-w-7xl grid-cols-12 items-start gap-10 px-5 lg:gap-14 lg:px-10">
            <div className="col-span-12 lg:col-span-7">
              <h2
                className="font-display uppercase"
                style={{
                  fontSize: "clamp(38px, 7vw, 84px)",
                  lineHeight: 1.05,
                  fontFamily: "'Bungee', Impact, sans-serif",
                }}
              >
                <span className="block">What's a</span>
                <span
                  className="mt-2 block text-[var(--amber)] sm:mt-3"
                  style={{
                    fontFamily: "'Bungee Shade', 'Bungee', Impact, sans-serif",
                    lineHeight: 1.15,
                    fontSize: "clamp(34px, 6.4vw, 80px)",
                  }}
                >
                  TAKEOVER?
                </span>
              </h2>
              <div className="mt-7 max-w-xl space-y-4 text-lg leading-relaxed sm:mt-9 sm:space-y-5 sm:text-xl">
                <p>A Takeover is simple. A group of MM people go somewhere new together.</p>
                <p>
                  New city. <span className="bg-[var(--amber)] px-1 text-[var(--ink)]">New beers.</span>{" "}
                  New stories. Some of you know each other already. Most of you don't.
                </p>
              </div>
              <p
                className="font-script mt-7 text-[var(--amber)] sm:mt-9"
                style={{ fontSize: "clamp(28px, 5.4vw, 56px)", lineHeight: 1.1 }}
              >
                "that's kinda the whole point."
              </p>
              <p className="mt-6 max-w-lg text-lg leading-relaxed sm:mt-7 sm:text-xl">
                We don't have a destination yet. We're picking based on who's in and where
                people want to go. <strong>Register, tell us your vibe, help shape it.</strong>
              </p>
            </div>

            <div className="col-span-12 lg:col-span-5">
              <div className="flex items-start justify-center gap-3 px-2 sm:gap-5">
                {[
                  { slot: "polaroid-1", caption: "siem reap, 2am", rot: -5, mt: "mt-3" },
                  { slot: "polaroid-2", caption: "el nido vibes", rot: 3, mt: "mt-0" },
                  { slot: "polaroid-3", caption: "bali, definitely", rot: -2, mt: "mt-5" },
                ].map((p) => (
                  <div
                    key={p.slot}
                    className={`polaroid-tape polaroid-thin w-[28%] ${p.mt}`}
                    style={{ transform: `rotate(${p.rot}deg)` }}
                  >
                    <img
                      data-image-slot={p.slot}
                      src={`https://placehold.co/400x500/0A0A0A/F5B82E?text=${encodeURIComponent(p.caption)}`}
                      alt={p.caption}
                      className="zine-photo aspect-[4/5] w-full object-cover"
                    />
                    <p
                      className="mt-2 text-center text-[var(--ink)]"
                      style={{ fontFamily: "'Caveat', cursive, var(--font-sans)", fontSize: 20, lineHeight: 1.05 }}
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

        {/* ============ 03 COMMUNITY (amber / beer) ============ */}
        <section className={`relative overflow-hidden bg-[var(--amber)] text-[var(--ink)] ${SECTION_PY}`}>
          <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8 px-5 lg:gap-12 lg:px-10">
            <div className="col-span-12">
              <h2
                className="font-display mx-auto max-w-[1120px] text-center uppercase"
                style={{
                  fontSize: "clamp(32px, 5.6vw, 84px)",
                  lineHeight: 0.92,
                  fontFamily: "'Bungee', Impact, sans-serif",
                }}
              >
                <span className="block">
                  <CountUp to={20000} duration={1600} />+ photos.
                </span>
                <span className="block">hundreds of legends.</span>
                <span
                  className="block text-[var(--ink)]"
                  style={{ fontFamily: "'Bungee Shade', 'Bungee', Impact, sans-serif" }}
                >
                  ONE STUPID GOAL.
                </span>
              </h2>
            </div>
          </div>

          {/* Marquee */}
          <div className="relative mt-14 overflow-hidden border-y-2 border-[var(--ink)]">
            <div className="marquee-track flex w-max">
              {Array.from({ length: 24 }).map((_, i) => {
                const n = (i % 12) + 1;
                return (
                  <div
                    key={i}
                    className="h-36 w-36 flex-shrink-0 overflow-hidden border-2 border-[var(--ink)] sm:h-44 sm:w-44"
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

          {/* Stats panel */}
          <div className="mx-auto mt-14 max-w-5xl px-6 lg:px-10">
            <div className="grid grid-cols-1 border-2 border-[var(--ink)] sm:grid-cols-3">
              {[
                { n: 20847, label: "beers logged" },
                { n: 47, label: "countries" },
                { n: 1_000_000 - 20847, label: "to go" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={`flex items-center justify-between gap-4 bg-[var(--cream)] p-5 sm:block sm:p-8 ${i < 2 ? "sm:border-r-2 sm:border-[var(--ink)]" : ""} ${i < 2 ? "border-b-2 border-[var(--ink)] sm:border-b-0" : ""}`}
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--ink)]/70">
                    {s.label}
                  </p>
                  <div
                    className="font-display text-right text-[var(--ink)] tabular-nums sm:mt-2 sm:text-left"
                    style={{ lineHeight: 1, whiteSpace: "nowrap" }}
                  >
                    <span className="text-2xl sm:text-[clamp(24px,2.8vw,44px)]">
                      <Counter to={s.n} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FoamOverflowDivider />

        {/* ============ 04 FORM (ink) ============ */}
        <section className={`relative bg-[var(--ink)] text-[var(--cream)] ${SECTION_PY}`}>
          <div className="mx-auto grid max-w-7xl grid-cols-12 items-start gap-8 px-5 lg:items-stretch lg:gap-16 lg:px-10">
            <div className="col-span-12 lg:col-span-5">
              <h2
                className="font-display uppercase"
                style={{
                  fontSize: "clamp(36px, 5.2vw, 84px)",
                  lineHeight: 0.9,
                  fontFamily: "'Bungee Shade', 'Bungee', Impact, sans-serif",
                }}
              >
                <span className="block">GET ON</span>
                <span className="block">
                  THE <span className="text-[var(--amber)]">LIST.</span>
                </span>
              </h2>

              <p className="mt-8 max-w-md text-lg leading-relaxed text-[var(--cream)]/90">
                Once we see who's in, we'll share destination options, rough dates,
                and pricing. <strong className="text-[var(--amber)]">You'll get a vote.</strong>
              </p>

              <ul className="mt-8 max-w-md space-y-4 text-[var(--cream)]/85">
                <li className="flex gap-3">
                  <span className="mt-1 text-[var(--amber)]">✓</span>
                  <span><strong className="text-[var(--cream)]">No spam.</strong> Just trip updates when there's something to say.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 text-[var(--amber)]">✓</span>
                  <span><strong className="text-[var(--cream)]">No payment now.</strong> You commit when you're ready.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 text-[var(--amber)]">✓</span>
                  <span><strong className="text-[var(--cream)]">You help pick the destination.</strong> Your vote counts.</span>
                </li>
              </ul>

              <div className="mt-10 max-w-md">
                <DestinationShuffler />
              </div>
            </div>

            <div id="form" className="col-span-12 lg:col-span-7 lg:flex">
              <InterestForm />
            </div>
          </div>
        </section>

        {/* ============ 05 TICKER (amber) — hard amber strip, no foam ============ */}
        <section
          aria-label="Trip terms"
          className="relative overflow-hidden border-y-[3px] border-[var(--ink)] bg-[var(--amber)] text-[var(--ink)]"
        >
          <div className="ticker-track flex w-max whitespace-nowrap py-6 font-mono text-base font-bold uppercase tracking-[0.25em] sm:text-lg">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="px-4">{TICKER}</span>
            ))}
          </div>
        </section>

        {/* ============ 06 PRE-FOOTER CTA (ink) ============ */}
        <section className={`relative bg-[var(--ink)] text-[var(--cream)] ${SECTION_PY}`}>
          <div className="mx-auto grid max-w-7xl grid-cols-12 items-center gap-6 px-5 text-center lg:gap-12 lg:px-10 lg:text-left">
            <h2
              className="col-span-12 font-display mx-auto max-w-[760px] uppercase lg:mx-0 lg:col-span-8"
              style={{
                fontSize: "clamp(38px, 6.8vw, 92px)",
                lineHeight: 0.85,
                fontFamily: "'Bungee', Impact, sans-serif",
              }}
            >
              <span className="block">Still here?</span>
              <span
                className="block text-[var(--amber)]"
                style={{ fontFamily: "'Bungee Shade', 'Bungee', Impact, sans-serif" }}
              >
                GET IN.
              </span>
            </h2>
            <div className="col-span-12 flex justify-center lg:col-span-4 lg:justify-end">
              <BeerButton onClick={() => scrollTo("form")}>I'm in</BeerButton>
            </div>
          </div>
        </section>
      </main>

      <MMFooter />
    </div>
  );
}
