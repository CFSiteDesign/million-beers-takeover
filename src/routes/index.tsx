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

// Section padding allows extra space at top/bottom so the overflowing foam
// divider doesn't cover any content.
const SECTION_PY = "py-28 lg:py-36";

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
        <section className="relative overflow-hidden bg-[var(--amber)] pt-24 pb-36 text-[var(--ink)] lg:pt-32 lg:pb-44">
          <div className="mx-auto grid max-w-7xl grid-cols-12 items-center gap-10 px-6 lg:gap-12 lg:px-10">
            <div className="col-span-12 lg:col-span-7">
              <h1 className="font-display max-w-[900px] text-[var(--ink)]" style={{ lineHeight: 0.86 }}>
                <span className="block uppercase" style={{ fontSize: "clamp(44px, 8vw, 108px)" }}>
                  THE
                </span>
                <span
                  className="block max-w-full overflow-hidden uppercase text-[var(--ink)]"
                  style={{
                    fontSize: "clamp(54px, 9.4vw, 132px)",
                    fontFamily: "'Bungee Shade', 'Bungee', Impact, sans-serif",
                  }}
                >
                  TAKEOVER
                </span>
                <span
                  className="font-script mt-3 block lowercase text-[var(--ink)]"
                  style={{ fontSize: "clamp(32px, 6vw, 72px)", lineHeight: 0.9 }}
                >
                  is happening.
                </span>
              </h1>

              <p className="mt-8 max-w-md text-lg font-semibold text-[var(--ink)] sm:text-xl">
                We're picking a place. We're going there.{" "}
                <span className="bg-[var(--ink)] px-2 text-[var(--amber)]">And we want you in.</span>
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-5">
                <button onClick={() => scrollTo("form")} className="btn-stamp btn-dark text-xl sm:text-2xl">
                  I'M IN ✦ COUNT ME
                </button>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink)]/70">
                  no commitment · no payment
                </span>
              </div>
            </div>

            <div className="col-span-12 flex justify-center lg:col-span-5 lg:justify-end">
              <div className="w-full max-w-[300px] lg:max-w-[320px]">
                <div className="polaroid-tape">
                  <img
                    data-image-slot="hero-bg"
                    src="https://placehold.co/600x800/0A0A0A/F5B82E?text=HERO+POLAROID"
                    alt="Trip 01 placeholder"
                    className="zine-photo aspect-[4/3] w-full object-cover lg:aspect-[3/4]"
                  />
                  <p
                    className="font-script mt-3 text-center text-[var(--ink)]"
                    style={{ fontSize: 22 }}
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

        {/* ============ 02 WHAT IS THE TAKEOVER (ink) ============ */}
        <section className={`relative bg-[var(--ink)] text-[var(--cream)] ${SECTION_PY}`}>
          <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8 px-6 lg:gap-12 lg:px-10">
            <Reveal className="col-span-12 lg:col-span-7">
              <h2
                className="font-display uppercase"
                style={{
                  fontSize: "clamp(48px, 10vw, 140px)",
                  lineHeight: 0.85,
                  fontFamily: "'Bungee', Impact, sans-serif",
                }}
              >
                <span className="block">What's a</span>
                <span
                  className="block text-[var(--amber)]"
                  style={{ fontFamily: "'Bungee Shade', 'Bungee', Impact, sans-serif" }}
                >
                  TAKEOVER?
                </span>
              </h2>
              <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed sm:text-lg">
                <p>A Takeover is simple. A group of MM people go somewhere new together.</p>
                <p>
                  New city. <span className="bg-[var(--amber)] px-1 text-[var(--ink)]">New beers.</span>{" "}
                  New stories. Some of you know each other already. Most of you don't.
                </p>
              </div>
              <p
                className="font-script mt-10 text-[var(--amber)]"
                style={{ fontSize: "clamp(36px, 7vw, 84px)", lineHeight: 0.95 }}
              >
                "that's kinda the whole point."
              </p>
              <p className="mt-8 max-w-lg text-base">
                We don't have a destination yet. We're picking based on who's in and where
                people want to go. <strong>Register, tell us your vibe, help shape it.</strong>
              </p>
            </Reveal>

            <div className="col-span-12 lg:col-span-5">
              <div className="flex flex-col gap-6">
                {[
                  { slot: "polaroid-1", caption: "siem reap, 2am" },
                  { slot: "polaroid-2", caption: "el nido vibes" },
                  { slot: "polaroid-3", caption: "bali, definitely" },
                ].map((p) => (
                  <div key={p.slot} className="polaroid-tape mx-auto w-full max-w-xs lg:mx-0 lg:ml-auto">
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

        {/* ============ 03 COMMUNITY (amber / beer) ============ */}
        <section className={`relative bg-[var(--amber)] text-[var(--ink)] ${SECTION_PY}`}>
          <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8 px-6 lg:gap-12 lg:px-10">
            <Reveal className="col-span-12">
              <h2
                className="font-display uppercase"
                style={{
                  fontSize: "clamp(40px, 9vw, 130px)",
                  lineHeight: 0.85,
                  fontFamily: "'Bungee', Impact, sans-serif",
                }}
              >
                <span className="block">20,000+ photos.</span>
                <span className="block">hundreds of legends.</span>
                <span
                  className="block text-[var(--ink)]"
                  style={{ fontFamily: "'Bungee Shade', 'Bungee', Impact, sans-serif" }}
                >
                  ONE STUPID GOAL.
                </span>
              </h2>
            </Reveal>
          </div>

          {/* Marquee */}
          <div className="relative mt-12 overflow-hidden border-y-2 border-[var(--ink)]">
            <div className="marquee-track flex w-max">
              {Array.from({ length: 24 }).map((_, i) => {
                const n = (i % 12) + 1;
                return (
                  <div
                    key={i}
                    className="h-40 w-40 flex-shrink-0 overflow-hidden border-2 border-[var(--ink)] sm:h-48 sm:w-48"
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
          <Reveal className="mx-auto mt-16 max-w-5xl px-6 lg:px-10">
            <div className="grid grid-cols-1 border-2 border-[var(--ink)] sm:grid-cols-3">
              {[
                { n: 20847, label: "beers logged" },
                { n: 47, label: "countries" },
                { n: 1_000_000, label: "to go" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={`bg-[var(--cream)] p-8 ${i < 2 ? "sm:border-r-2 sm:border-[var(--ink)]" : ""} ${i < 2 ? "border-b-2 border-[var(--ink)] sm:border-b-0" : ""}`}
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--ink)]/70">
                    {s.label}
                  </p>
                  <div
                    className="mt-2 font-display text-[var(--ink)]"
                    style={{ fontSize: "clamp(48px, 8vw, 96px)", lineHeight: 0.85 }}
                  >
                    <Counter to={s.n} />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <FoamOverflowDivider />

        {/* ============ 04 FORM (ink) ============ */}
        <section className={`relative bg-[var(--ink)] text-[var(--cream)] ${SECTION_PY}`}>
          <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8 px-6 lg:gap-12 lg:px-10">
            <div className="col-span-12 lg:col-span-5">
              <h2
                className="font-display uppercase"
                style={{
                  fontSize: "clamp(56px, 11vw, 150px)",
                  lineHeight: 0.85,
                  fontFamily: "'Bungee Shade', 'Bungee', Impact, sans-serif",
                }}
              >
                <span className="block">GET</span>
                <span className="block">ON THE</span>
                <span className="block text-[var(--amber)]">LIST.</span>
              </h2>
              <p className="mt-8 max-w-sm text-base text-[var(--cream)]">
                No commitment. No payment. Once we see who's in, we'll share destination
                options, rough dates, and pricing. <strong>You'll get a vote.</strong>
              </p>
            </div>

            <div id="form" className="col-span-12 lg:col-span-7">
              <Reveal>
                <InterestForm />
              </Reveal>
            </div>
          </div>
        </section>

        <FoamOverflowDivider />

        {/* ============ 05 TICKER (amber) ============ */}
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

        <FoamOverflowDivider />

        {/* ============ 06 PRE-FOOTER CTA (ink) ============ */}
        <section className={`relative bg-[var(--ink)] text-[var(--cream)] ${SECTION_PY}`}>
          <div className="mx-auto grid max-w-7xl grid-cols-12 items-center gap-8 px-6 lg:gap-12 lg:px-10">
            <h2
              className="col-span-12 font-display uppercase lg:col-span-8"
              style={{
                fontSize: "clamp(44px, 8vw, 110px)",
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
            <div className="col-span-12 flex justify-start lg:col-span-4 lg:justify-end">
              <button onClick={() => scrollTo("form")} className="btn-stamp text-2xl">
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
