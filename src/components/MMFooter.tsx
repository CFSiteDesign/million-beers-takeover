import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";

const COLS = [
  {
    title: "Hostels",
    links: [
      "Cambodia",
      "Philippines",
      "Vietnam",
      "Indonesia",
      "Thailand",
      "Laos",
      "All Hostels",
    ],
  },
  {
    title: "Experience",
    links: [
      "Ha Giang Loop",
      "Tours & Activities",
      "Mad Monkey Travel",
      "Volunteer",
      "Group Bookings",
    ],
  },
  {
    title: "Company",
    links: ["Our Story", "Mad Loyalty", "Careers", "Press", "Contact Us", "Blog"],
  },
  {
    title: "Help",
    links: ["FAQ", "Booking Policies", "Travel Advice", "Sustainability"],
  },
];

export function MMFooter() {
  return (
    <footer className="relative z-10 bg-[#0d2a3a] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <img
              src="https://madmonkeyhostels.com/images/madmonkey_logo.svg"
              alt="Mad Monkey Hostels"
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="mt-4 max-w-xs text-sm text-white/75">
              Travel deeper. Live fully. Go Mad. The leading social hostel network in
              Southeast Asia.
            </p>
            <div className="mt-5 flex gap-3">
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-[var(--mm-teal)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="mt-6">
              <p className="mb-2 text-sm font-semibold">Stay Mad. Subscribe.</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 rounded-md bg-white/10 px-3 py-2 text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--mm-teal)]"
                />
                <button className="rounded-md bg-[var(--mm-teal)] px-4 py-2 text-sm font-semibold text-white">
                  Join
                </button>
              </form>
            </div>
          </div>
          {COLS.map((c) => (
            <div key={c.title}>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">
                {c.title}
              </h4>
              <ul className="space-y-2 text-sm text-white/75">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-[var(--mm-teal)]">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} Mad Monkey Hostels. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-white/60">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms & Conditions</a>
            <a href="#" className="hover:text-white">Cookie Policy</a>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
          <select
            aria-label="Language"
            className="rounded-md bg-white/10 px-3 py-1.5 text-xs text-white"
          >
            <option>EN</option>
            <option>ES</option>
            <option>FR</option>
            <option>DE</option>
          </select>
        </div>
      </div>
    </footer>
  );
}
