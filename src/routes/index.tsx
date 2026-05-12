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

import { LiveBeerCounter } from "@/components/LiveBeerCounter";
import polaroid1 from "@/assets/polaroid-1.png";
import polaroid2 from "@/assets/polaroid-2.png";
import marquee1 from "@/assets/marquee-1.png";
import marquee2 from "@/assets/marquee-2.png";
import marquee3 from "@/assets/marquee-3.png";
import marquee4 from "@/assets/marquee-4.png";
import marquee5 from "@/assets/marquee-5.png";
import marquee6 from "@/assets/marquee-6.png";
import marquee7 from "@/assets/marquee-7.png";
import marquee8 from "@/assets/marquee-8.png";
import marquee9 from "@/assets/marquee-9.png";
import marquee10 from "@/assets/marquee-10.png";
import marquee11 from "@/assets/marquee-11.png";
import marquee12 from "@/assets/marquee-12.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mad Monkey Takeover — One Million Beers, One Stupid Goal" },
      {
        name: "description",
        content:
          "Join the Mad Monkey Takeover: a global crew picking a destination, sharing the trip, and chasing one million beers together. No spam, no payment now — just get on the list and help shape where we go.",
      },
      { property: "og:title", content: "Mad Monkey Takeover — One Million Beers, One Stupid Goal" },
      {
        property: "og:description",
        content:
          "A travelling crew, a chosen destination, and a million beers along the way. Register your interest, vote on the trip, and pack a bag.",
      },
      {
        property: "og:image",
        content: "https://placehold.co/1200x630/0A0A0A/F5B82E?text=Mad+Monkey+Takeover",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Mad Monkey Takeover — One Million Beers, One Stupid Goal" },
      {
        name: "twitter:description",
        content:
          "A travelling crew, a chosen destination, and a million beers along the way. Register your interest, vote on the trip, and pack a bag.",
      },
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
          <div aria-hidden className="absolute inset-0 z-0 bg-[var(--amber)]" />
          <Bubbles density={14} scope="section" />
          <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-12 items-center gap-8 px-5 pr-8 sm:px-8 lg:gap-12 lg:px-10">
            <div className="col-span-12 min-w-0 max-w-full lg:col-span-7 xl:col-span-8">
              <h1 className="font-display max-w-full text-[var(--ink)]" style={{ lineHeight: 0.9 }}>
                <span
                  className="block uppercase"
                  style={{
                    fontSize: "clamp(34px, 6.4vw, 88px)",
                    fontFamily: "'Bungee', Impact, sans-serif",
                  }}
                >
                  PLANS THAT MAKE IT OUT OF THE GROUP CHAT.
                </span>
                <span
                  className="mt-3 block uppercase text-[var(--ink)]"
                  style={{
                    fontSize: "clamp(40px, 7.4vw, 104px)",
                    fontFamily: "'Bungee Shade', 'Bungee', Impact, sans-serif",
                  }}
                >
                  YOU'RE INVITED.
                </span>
              </h1>

              <div className="mt-8">
                <BeerButton onClick={() => scrollTo("form")}>I'm in &gt;&gt; Where we going?</BeerButton>
              </div>
            </div>

            <div className="col-span-12 flex justify-center self-start lg:col-span-5 lg:items-center lg:self-center lg:justify-end xl:col-span-4">
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
        <section className={`relative overflow-hidden bg-[var(--ink)] text-[var(--cream)] ${SECTION_PY}`}>
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
            <div className="grid w-full min-w-0 grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-stretch lg:gap-14">
              <div className="min-w-0 max-w-full">
                <h2
                  className="font-display max-w-full uppercase"
                  style={{
                    fontSize: "clamp(30px, 10vw, 84px)",
                    lineHeight: 1,
                    fontFamily: "'Bungee', Impact, sans-serif",
                    overflowWrap: "break-word",
                  }}
                >
                  <span className="block">What's a</span>
                  <span
                    className="mt-1 block text-[var(--amber)] sm:mt-3"
                    style={{
                      fontFamily: "'Bungee Shade', 'Bungee', Impact, sans-serif",
                      fontSize: "clamp(28px, 9vw, 78px)",
                      lineHeight: 1.12,
                      overflowWrap: "break-word",
                    }}
                  >
                    TAKEOVER?
                  </span>
                </h2>

                <div className="mt-6 max-w-[62ch] space-y-4 text-[16px] leading-relaxed sm:mt-9 sm:space-y-5 sm:text-xl">
                  <p>A Takeover is simple. A group of MM people go somewhere new together.</p>
                  <p>
                    New city. New beers. New stories.
                    <br />
                    Some of you know each other already.
                    <br />
                    Most of you don't.
                  </p>
                </div>

                <p
                  className="font-script mt-6 max-w-full text-[var(--amber)] sm:mt-9"
                  style={{ fontSize: "clamp(25px, 8vw, 56px)", lineHeight: 1.08, overflowWrap: "break-word", textIndent: "-0.35em" }}
                >
                  "new faces.
                  <br />
                  <span style={{ textIndent: 0, display: "inline-block" }}>new nights.</span>
                  <br />
                  <span style={{ textIndent: 0, display: "inline-block" }}>that's the point."</span>
                </p>

                <p className="mt-5 max-w-[58ch] text-[16px] leading-relaxed sm:mt-7 sm:text-xl">
                  We don't have a destination yet. We're picking based on who's in and where people want to go. Register, tell us your vibe, help shape it.
                </p>
              </div>

              <div className="min-w-0 max-w-full pt-2 lg:relative lg:h-full lg:pt-0">
                {/* Mobile: 2 polaroids side by side, slightly staggered */}
                <div className="grid grid-cols-2 items-start gap-3 lg:hidden">
                  {[
                    { slot: "polaroid-1", src: polaroid1, caption: "siem reap, 2am", rot: -4, mt: "mt-0" },
                    { slot: "polaroid-2", src: polaroid2, caption: "el nido vibes", rot: 3, mt: "mt-6" },
                  ].map((p) => (
                    <div
                      key={p.slot}
                      className={`polaroid-tape polaroid-thin min-w-0 ${p.mt}`}
                      style={{ transform: `rotate(${p.rot}deg)`, transformOrigin: "center" }}
                    >
                      <img
                        data-image-slot={p.slot}
                        src={p.src}
                        alt={p.caption}
                        className="zine-photo aspect-[4/5] w-full object-cover"
                      />
                      <p
                        className="mt-2 text-center text-[var(--ink)]"
                        style={{
                          fontFamily: "'Caveat', cursive, var(--font-sans)",
                          fontSize: "clamp(11px, 3vw, 16px)",
                          lineHeight: 1.05,
                          overflowWrap: "anywhere",
                        }}
                      >
                        {p.caption}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Desktop: absolutely-positioned cluster filling column height */}
                <div className="hidden lg:block">
                  {[
                    { slot: "polaroid-1", src: polaroid1, caption: "siem reap, 2am", rot: -5, top: "0%", left: "4%" },
                    { slot: "polaroid-2", src: polaroid2, caption: "el nido vibes", rot: 4, top: "20%", left: "34%" },
                  ].map((p) => (
                    <div
                      key={p.slot}
                      className="polaroid-tape polaroid-thin absolute w-[58%] max-w-[280px]"
                      style={{ top: p.top, left: p.left, transform: `rotate(${p.rot}deg)`, transformOrigin: "center" }}
                    >
                      <img
                        data-image-slot={p.slot}
                        src={p.src}
                        alt={p.caption}
                        className="zine-photo aspect-[4/5] w-full object-cover"
                      />
                      <p
                        className="mt-2 text-center text-[var(--ink)]"
                        style={{
                          fontFamily: "'Caveat', cursive, var(--font-sans)",
                          fontSize: "clamp(14px, 1.4vw, 18px)",
                          lineHeight: 1.05,
                          overflowWrap: "anywhere",
                        }}
                      >
                        {p.caption}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <FoamOverflowDivider />

        {/* ============ 04 FORM (ink) ============ */}
        <section className={`relative bg-[var(--ink)] text-[var(--cream)] ${SECTION_PY}`}>
          <div className="mx-auto grid w-full max-w-7xl grid-cols-12 items-start gap-8 px-5 pr-8 lg:items-stretch lg:gap-16 lg:px-10">
            <div className="col-span-12 lg:col-span-5">
              <h2
                className="font-display uppercase lg:tracking-[-0.01em]"
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

              <ul className="mt-8 max-w-md space-y-4 text-[var(--cream)]/85 lg:mt-10 lg:max-w-[42ch] lg:space-y-6">
                {[
                  { t: "Sign up for trip updates.", d: "No commitment required today." },
                  { t: "No payment needed.", d: "" },
                ].map((item) => (
                  <li key={item.t} className="flex gap-3 lg:gap-4">
                    <span className="mt-1 text-[var(--amber)] lg:mt-[2px] lg:text-lg">✓</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[var(--cream)] font-semibold lg:uppercase lg:tracking-[0.06em] lg:text-[0.95rem]">
                        {item.t}
                      </div>
                      {item.d && (
                        <div className="mt-0.5 text-[var(--cream)]/70 lg:mt-1 lg:text-[1rem] lg:leading-snug">
                          {item.d}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

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
          <div className="mx-auto grid w-full max-w-7xl grid-cols-12 items-center gap-6 px-5 pr-8 text-center lg:gap-12 lg:px-10 lg:text-left">
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
