import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { Bubbles } from "@/components/Bubbles";
import { InterestForm } from "@/components/InterestForm";
import { MMHeader } from "@/components/MMHeader";
import { MMFooter } from "@/components/MMFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mad Monkey Takeover — One Million Beers, One Stupid Goal" },
      {
        name: "description",
        content:
          "Join the Mad Monkey Takeover: a global crew picking a destination, sharing the trip, and chasing one million beers together.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bungee&family=Bungee+Shade&family=Shrikhand&family=Anton&family=Caveat:wght@400;700&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&family=Montserrat:wght@400;500;600;700;800&display=swap",
      },
      {
        rel: "icon",
        href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%230A0A0A'/%3E%3Ctext x='50' y='72' font-size='72' text-anchor='middle' fill='%23F5B82E'%3E%F0%9F%8D%BA%3C/text%3E%3C/svg%3E",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="paper-grain relative min-h-screen overflow-x-hidden bg-[var(--ink)] text-[var(--cream)]">
      <MMHeader />
      <Bubbles density={7} />
      <Toaster position="top-center" theme="dark" richColors />

      <main className="relative z-10">
        <section className="relative overflow-hidden pt-14 pb-16 text-[var(--ink)] lg:pt-24 lg:pb-24">
          <div aria-hidden className="absolute inset-0 z-0 bg-[var(--amber)]" />
          <Bubbles density={14} scope="section" />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pr-8 sm:px-8 lg:px-10">
            <h1 className="font-display max-w-full text-[var(--ink)]" style={{ lineHeight: 0.9 }}>
              <span
                className="block uppercase"
                style={{
                  fontSize: "clamp(36px, 5.2vw, 64px)",
                  fontFamily: "'Bungee', Impact, sans-serif",
                }}
              >
                YOU ASKED. WE DELIVERED.
              </span>
              <span
                className="mt-3 block uppercase text-[var(--ink)]"
                style={{
                  fontSize: "clamp(44px, 6.4vw, 76px)",
                  fontFamily: "'Bungee Shade', 'Bungee', Impact, sans-serif",
                }}
              >
                THE MAD MONKEY MILLION BEER TAKEOVER IS ON.
              </span>
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3 lg:mt-7">
              <div className="fun-bubble fun-bubble-amber" style={{ ["--rot" as never]: "-2deg" }}>
                <span className="fun-bubble-icon" aria-hidden>🗓️</span>
                <span className="fun-bubble-text">AUGUST 2026 · 3PM</span>
              </div>
              <div className="fun-bubble fun-bubble-cream" style={{ ["--rot" as never]: "2deg" }}>
                <span className="fun-bubble-icon" aria-hidden>📍</span>
                <span className="fun-bubble-text">BREWDOG DOGHOUSE MANCHESTER</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-12 items-start gap-8 lg:mt-12 lg:gap-12">
              <div className="col-span-12 min-w-0 max-w-full lg:col-span-6">
                <div className="space-y-4 font-mono text-base text-[var(--ink)] md:text-lg">
                  <p>
                    After hearing from the beer chat community, we're bringing everyone together for a UK meetup!
                  </p>
                  <p>
                    Join fellow beer lovers for an afternoon at <strong>BrewDog DogHouse Manchester</strong>. We'll kick things off from <strong>3pm</strong> with a complimentary drink and bar snacks on us before settling in for a great afternoon with the community.
                  </p>
                  <p className="font-bold uppercase">
                    Spaces are limited — register your interest so we've got enough beer waiting for everyone!
                  </p>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-6 lg:flex">
                <InterestForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <MMFooter />
    </div>
  );
}
