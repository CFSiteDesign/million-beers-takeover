import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { Beer, ChevronDown, Mail, Wallet, Vote } from "lucide-react";
import { Bubbles } from "@/components/Bubbles";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { ProgressBar } from "@/components/ProgressBar";
import { InterestForm } from "@/components/InterestForm";
import { MMHeader } from "@/components/MMHeader";
import { MMFooter } from "@/components/MMFooter";
import {
  FoamWaveDivider,
  BottleCapDivider,
  PullTabDivider,
  PourDivider,
  CoasterRingsDivider,
} from "@/components/Dividers";

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
        content:
          "https://placehold.co/1200x630/0A0A0A/F5B82E?text=Million+Beer+Mission",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800&display=swap",
      },
      {
        rel: "icon",
        href:
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%230A0A0A'/%3E%3Ctext x='50' y='72' font-size='72' text-anchor='middle' fill='%23F5B82E'%3E%F0%9F%8D%BA%3C/text%3E%3C/svg%3E",
      },
    ],
  }),
  component: Index,
});

const HERO_HEADLINE = "THE TAKEOVER IS HAPPENING.";

function HeroHeadline() {
  const words = HERO_HEADLINE.split(" ");
  let idx = 0;
  return (
    <h1 className="font-display text-5xl leading-[0.95] text-[var(--cream)] sm:text-6xl md:text-7xl lg:text-8xl text-balance">
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((ch) => {
            const i = idx++;
            return (
              <span
                key={i}
                className="hero-letter inline-block"
                style={{ animationDelay: `${i * 35 + 200}ms` }}
              >
                {ch}
              </span>
            );
          })}
          {wi < words.length - 1 && " "}
        </span>
      ))}
    </h1>
  );
}

function Index() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <MMHeader />
      <Bubbles density={16} />
      <Toaster position="top-center" theme="dark" richColors />

      <main className="relative z-10">
        {/* HERO */}
        <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-10 pb-24 text-center">
          <img
            data-image-slot="hero-bg"
            src="https://placehold.co/1920x1080/0A0A0A/F5B82E?text=HERO+IMAGE"
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-luminosity"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "var(--gradient-hero)" }}
          />
          <div className="relative z-10 flex max-w-3xl flex-col items-center gap-6">
            <span className="rounded-full border border-[var(--amber)]/40 bg-black/40 px-4 py-1 font-display text-sm tracking-[0.25em] text-[var(--amber)]">
              MILLION BEER MISSION
            </span>
            <HeroHeadline />
            <p className="max-w-xl text-lg text-[var(--cream)]/90 sm:text-xl">
              We're picking a place. We're going there. And we want you in.
            </p>
            <ProgressBar />
            <button
              onClick={() => scrollTo("form")}
              className="foam-btn w-full max-w-md rounded-full bg-[var(--amber)] px-8 py-4 font-display text-2xl tracking-widest text-[var(--primary-foreground)] shadow-[var(--shadow-amber)]"
            >
              I'M IN, COUNT ME
            </button>
            <p className="text-sm text-[var(--cream)]/60">
              No commitment. No payment. Just tell us you're keen.
            </p>
          </div>
          <button
            onClick={() => scrollTo("about")}
            aria-label="Scroll down"
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[var(--amber)]"
          >
            <div className="animate-bob flex flex-col items-center gap-1">
              <Beer className="h-7 w-7" />
              <ChevronDown className="h-4 w-4" />
            </div>
          </button>
        </section>

        <FoamWaveDivider />

        {/* WHAT IS THE TAKEOVER */}
        <section id="about" className="relative px-4 py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <h2 className="font-display text-4xl text-[var(--cream)] sm:text-5xl lg:text-6xl">
                What's a Takeover?
              </h2>
              <div className="mt-6 space-y-4 text-lg text-[var(--cream)]/85">
                <p>
                  A Takeover is simple. A group of MM people go somewhere new together.
                </p>
                <p>
                  New city. New beers. New stories. Some of you know each other already.
                  Most of you don't. That's kind of the whole point.
                </p>
                <p>
                  We don't have a destination yet. We're picking based on who's in and
                  where people want to go. Register below, tell us your vibe, and you'll
                  help shape the whole thing.
                </p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="relative mx-auto h-[480px] w-full max-w-md">
                {[
                  { slot: "polaroid-1", url: "https://placehold.co/400x500/1A1A1A/F5B82E?text=GROUP+SHOT+1", caption: "siem reap, 2am", rot: -8, x: -40, y: 0, hoverRot: -12 },
                  { slot: "polaroid-2", url: "https://placehold.co/400x500/1A1A1A/F5B82E?text=GROUP+SHOT+2", caption: "el nido vibes", rot: 4, x: 30, y: 60, hoverRot: 8 },
                  { slot: "polaroid-3", url: "https://placehold.co/400x500/1A1A1A/F5B82E?text=GROUP+SHOT+3", caption: "bali, definitely", rot: -2, x: -10, y: 140, hoverRot: -5 },
                ].map((p, i) => (
                  <div
                    key={p.slot}
                    className="polaroid group absolute left-1/2 top-0 w-60 -translate-x-1/2 rounded-sm bg-[var(--cream)] p-3 pb-10 shadow-2xl hover:z-10"
                    style={{
                      transform: `translate(calc(-50% + ${p.x}px), ${p.y}px) rotate(${p.rot}deg)`,
                      zIndex: i,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = `translate(calc(-50% + ${p.x}px), ${p.y - 10}px) rotate(${p.hoverRot}deg)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = `translate(calc(-50% + ${p.x}px), ${p.y}px) rotate(${p.rot}deg)`;
                    }}
                  >
                    <img
                      data-image-slot={p.slot}
                      src={p.url}
                      alt={p.caption}
                      className="h-56 w-full object-cover"
                    />
                    <p
                      className="mt-3 text-center text-[var(--amber-deep)]"
                      style={{ fontFamily: "'Caveat', cursive, var(--font-sans)" }}
                    >
                      {p.caption}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <BottleCapDivider />

        {/* COMMUNITY */}
        <section className="relative px-4 py-20">
          <div className="mx-auto max-w-5xl text-center">
            <Reveal>
              <h2 className="font-display text-4xl text-[var(--cream)] sm:text-5xl lg:text-6xl">
                20,000+ Photos. Hundreds of People. <br className="hidden sm:block" />
                One Ridiculous Goal.
              </h2>
            </Reveal>
          </div>
          <div className="relative mt-12 overflow-hidden">
            <div className="marquee-track flex w-max gap-4">
              {Array.from({ length: 24 }).map((_, i) => {
                const n = (i % 12) + 1;
                return (
                  <div
                    key={i}
                    className="h-40 w-40 flex-shrink-0 overflow-hidden rounded-lg border border-[var(--amber)]/20 sm:h-48 sm:w-48"
                  >
                    <img
                      data-image-slot={`marquee-${n}`}
                      src={`https://placehold.co/300x300/0A0A0A/F5B82E?text=BEER+${n}`}
                      alt=""
                      className="h-full w-full object-cover"
                      style={{ filter: "sepia(0.3) hue-rotate(-10deg) saturate(1.1)" }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <Reveal>
            <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-8 text-center sm:grid-cols-3">
              {[
                { n: 20847, label: "beers logged" },
                { n: 47, label: "countries" },
                { n: 1_000_000, label: "to go" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-5xl text-[var(--amber)] sm:text-6xl">
                    <Counter to={s.n} />
                  </div>
                  <div className="mt-2 text-sm uppercase tracking-widest text-[var(--cream)]/70">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <PullTabDivider />

        {/* FORM */}
        <section id="form" className="relative px-4 py-20">
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <div className="mb-8 text-center">
                <h2 className="font-display text-4xl text-[var(--cream)] sm:text-5xl lg:text-6xl">
                  Tell Us You're In.
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-[var(--cream)]/80">
                  No commitment. No payment. Once we see who's in, we'll share destination
                  options, rough dates, and pricing. You'll get a vote.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <InterestForm />
            </Reveal>
          </div>
        </section>

        <PourDivider />

        {/* TRUST STRIP */}
        <section className="relative px-4 py-16">
          <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
            {[
              { Icon: Mail, t: "No spam. Just trip updates when there's something to say." },
              { Icon: Wallet, t: "No payment now. You commit when you're ready." },
              { Icon: Vote, t: "You help pick the destination. Your vote counts." },
            ].map(({ Icon, t }, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="flex flex-col items-center text-center">
                  <Icon
                    className="mb-3 h-8 w-8 text-[var(--amber)]"
                    strokeWidth={1.5}
                  />
                  <p className="text-[var(--cream)]/85">{t}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <CoasterRingsDivider />

        {/* PRE-FOOTER CTA */}
        <BottleCapDivider />
        <section
          className="relative px-4 py-16 text-center"
          style={{ background: "var(--gradient-amber)" }}
        >
          <h2 className="font-display text-4xl tracking-wide text-[#1a0f02] sm:text-5xl lg:text-6xl">
            STILL READING? GET ON THE LIST.
          </h2>
          <button
            onClick={() => scrollTo("form")}
            className="foam-btn mt-6 inline-block rounded-full bg-[#1a0f02] px-12 py-4 font-display text-xl tracking-widest text-[var(--amber)] shadow-2xl"
          >
            I'M IN
          </button>
        </section>
        <BottleCapDivider />
      </main>

      <MMFooter />
    </div>
  );
}
