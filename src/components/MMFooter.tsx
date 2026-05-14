import madmonkeyLogo from "@/assets/mm-head.png";
import instagramIcon from "@/assets/social/instagram.svg";
import tiktokIcon from "@/assets/social/tiktok.svg";
import xIcon from "@/assets/social/x.webp";
import facebookIcon from "@/assets/social/facebook.svg";
import youtubeIcon from "@/assets/social/youtube.svg";

const COLS_LEFT: { title: string; links: { label: string; href: string }[] }[] = [
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
];

const COLS_RIGHT: { title: string; links: { label: string; href: string }[] }[] = [
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

const SOCIALS: { src: string; href: string; label: string }[] = [
  { src: instagramIcon, href: "https://www.instagram.com/madmonkeyhostels/", label: "Instagram" },
  { src: tiktokIcon, href: "https://www.tiktok.com/@madmonkeyhostels", label: "TikTok" },
  { src: xIcon, href: "http://twitter.com/madmonkeyhostel", label: "X" },
  { src: facebookIcon, href: "https://www.facebook.com/MadMonkeyHostels", label: "Facebook" },
  { src: youtubeIcon, href: "https://www.youtube.com/channel/UCkUGlFdhp5Ndk68j_QRS1kw", label: "YouTube" },
];

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="mb-4 text-base font-bold text-white">{title}</h4>
      <ul className="space-y-3 text-sm text-white/85">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="transition hover:text-[var(--mm-teal)]"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MMFooter() {
  return (
    <footer
      className="relative z-10 bg-black text-white"
      style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
    >
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-3">
            <img
              src={madmonkeyLogo}
              alt="Mad Monkey Hostels"
              className="h-14 w-auto"
              style={{
                filter:
                  "drop-shadow(1px 0 0 #fff) drop-shadow(-1px 0 0 #fff) drop-shadow(0 1px 0 #fff) drop-shadow(0 -1px 0 #fff)",
              }}
            />
            <h3 className="mt-4 text-xl font-bold text-white" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>Mad Monkey</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="block h-9 w-9 transition hover:opacity-80"
                >
                  <img src={s.src} alt={s.label} className="h-full w-full" />
                </a>
              ))}
            </div>
            <p className="mt-6 text-xs uppercase tracking-wider text-white/60">
              All rights reserved © Mad Monkey. {new Date().getFullYear()}
            </p>
          </div>

          {/* Left columns */}
          <div className="space-y-10 lg:col-span-3">
            {COLS_LEFT.map((c) => (
              <LinkColumn key={c.title} {...c} />
            ))}
          </div>

          {/* Right columns */}
          <div className="space-y-10 lg:col-span-3">
            {COLS_RIGHT.map((c) => (
              <LinkColumn key={c.title} {...c} />
            ))}
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h4 className="mb-4 text-base font-bold text-white">Stay Updated with Us</h4>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Name *"
                required
                className="w-full rounded-md border border-white/20 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/60 focus:border-[var(--mm-teal)] focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email *"
                required
                className="w-full rounded-md border border-white/20 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/60 focus:border-[var(--mm-teal)] focus:outline-none"
              />
              <button
                type="submit"
                className="w-full rounded-md bg-white/10 px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-[var(--mm-teal)]"
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
