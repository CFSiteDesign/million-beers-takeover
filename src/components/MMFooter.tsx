import { Instagram, Facebook, Youtube, Twitter } from "lucide-react";

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Rules & Legal",
    links: [
      { label: "Tour & Groups", href: "https://madmonkeyhostels.com/groups/" },
      { label: "No Sex Tourists", href: "https://madmonkeyhostels.com/no-sex-tourists/" },
      { label: "Cancellation Policy", href: "https://madmonkeyhostels.com/cancellation-policy/" },
      { label: "Privacy Policy", href: "https://madmonkeyhostels.com/privacy-policy/" },
      { label: "Terms & Conditions", href: "https://madmonkeyhostels.com/terms-and-conditions/" },
    ],
  },
  {
    title: "Partner With Us",
    links: [
      { label: "Investor", href: "https://madmonkeyhostels.com/partners/investors/" },
      { label: "Property Partners", href: "https://madmonkeyhostels.com/partners/property-partners/" },
      { label: "Content Creators", href: "https://madmonkeyhostels.com/creative-hub/" },
      { label: "Travel Agencies", href: "https://madmonkeyhostels.com/partners/travel-agents/" },
      { label: "Tour Operators & Suppliers", href: "https://madmonkeyhostels.com/partners/suppliers/" },
    ],
  },
  {
    title: "Career",
    links: [{ label: "We're Hiring", href: "https://madmonkeyhostels.com/career/" }],
  },
  {
    title: "Press",
    links: [
      { label: "Mad Monkey Press Releases", href: "https://madmonkeyhostels.com/press-releases/" },
    ],
  },
  {
    title: "Travel Blog",
    links: [
      { label: "Mad Monkey's Travel Blog", href: "https://madmonkeyhostels.com/our-blog/" },
    ],
  },
  {
    title: "Guests",
    links: [
      { label: "E-Sim Deals", href: "#" },
      { label: "Creator Hub Stays", href: "https://madmonkeyhostels.com/creatorhub/" },
    ],
  },
];

const SOCIALS = [
  { Icon: Instagram, href: "https://www.instagram.com/madmonkeyhostels/", label: "Instagram" },
  { Icon: Facebook, href: "https://www.facebook.com/MadMonkeyHostels", label: "Facebook" },
  { Icon: Youtube, href: "https://www.youtube.com/channel/UCkUGlFdhp5Ndk68j_QRS1kw", label: "YouTube" },
  { Icon: Twitter, href: "http://twitter.com/madmonkeyhostel", label: "X" },
];

export function MMFooter() {
  return (
    <footer className="relative z-10 bg-white text-[#0d2a3a]">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand block */}
          <div className="lg:col-span-3">
            <img
              src="https://madmonkeyhostels.com/images/madmonkey_logo.svg"
              alt="Mad Monkey Hostels"
              className="h-14 w-auto"
            />
            <h3 className="mt-4 text-lg font-bold">Mad Monkey</h3>
            <div className="mt-4 flex gap-3">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0d2a3a]/5 text-[#0d2a3a] transition hover:bg-[var(--mm-teal)] hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <p className="mt-6 text-xs text-[#0d2a3a]/70">
              All rights reserved © Mad Monkey. {new Date().getFullYear()}
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6 lg:grid-cols-3">
            {COLS.map((c) => (
              <div key={c.title}>
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wider">{c.title}</h4>
                <ul className="space-y-2 text-sm text-[#0d2a3a]/80">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target={l.href.startsWith("http") ? "_blank" : undefined}
                        rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="hover:text-[var(--mm-teal)]"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h4 className="mb-3 text-base font-bold">Stay Updated with Us</h4>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Name *"
                required
                className="w-full rounded-md border border-[#0d2a3a]/20 bg-white px-3 py-2 text-sm placeholder:text-[#0d2a3a]/50 focus:border-[var(--mm-teal)] focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email *"
                required
                className="w-full rounded-md border border-[#0d2a3a]/20 bg-white px-3 py-2 text-sm placeholder:text-[#0d2a3a]/50 focus:border-[var(--mm-teal)] focus:outline-none"
              />
              <button
                type="submit"
                className="w-full rounded-md bg-[var(--mm-teal)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
