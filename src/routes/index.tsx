import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { Bubbles } from "@/components/Bubbles";
import { FoamOverflowDivider } from "@/components/Dividers";
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
        <div className="relative z-[60]">
          <FoamOverflowDivider />
        </div>
        <section className="relative overflow-hidden pt-14 pb-16 text-[var(--ink)] lg:pt-24 lg:pb-24">
          <div aria-hidden className="absolute inset-0 z-0 bg-[var(--amber)]" />
          <Bubbles density={14} scope="section" />
          <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-12 items-center gap-8 px-5 pr-8 sm:px-8 lg:gap-12 lg:px-10">
            <div className="col-span-12 min-w-0 max-w-full lg:col-span-6">
              <h1 className="font-display max-w-full text-[var(--ink)]" style={{ lineHeight: 0.9 }}>
                <span
                  className="block uppercase"
                  style={{
                    fontSize: "clamp(34px, 5.4vw, 76px)",
                    fontFamily: "'Bungee', Impact, sans-serif",
                  }}
                >
                  PLANS THAT MAKE IT OUT OF THE GROUP CHAT.
                </span>
                <span
                  className="mt-3 block uppercase text-[var(--ink)]"
                  style={{
                    fontSize: "clamp(40px, 6.2vw, 88px)",
                    fontFamily: "'Bungee Shade', 'Bungee', Impact, sans-serif",
                  }}
                >
                  YOU'RE INVITED.
                </span>
              </h1>
            </div>

            <div className="col-span-12 lg:col-span-6 lg:flex">
              <InterestForm />
            </div>
          </div>
        </section>
      </main>

      <MMFooter />
    </div>
  );
}
