import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const NAV = [
  { label: "Ha Giang Loop", href: "https://madmonkeyhostels.com/ha-giang-loop/", highlighted: true },
  { label: "Our Story", href: "https://madmonkeyhostels.com/our-story" },
  { label: "Hostels", href: "https://madmonkeyhostels.com/hostels", dropdown: true },
  { label: "Experience", href: "https://madmonkeyhostels.com/experience", dropdown: true },
  { label: "Mad Loyalty", href: "https://madmonkeyhostels.com/mad-loyalty" },
];

export function MMHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <a href="https://madmonkeyhostels.com" className="flex items-center">
          <img
            src="https://madmonkeyhostels.com/images/madmonkey_logo.svg"
            alt="Mad Monkey Logo"
            width={137}
            height={40}
            className="h-10 w-auto"
          />
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={
                item.highlighted
                  ? "rounded-full border border-[var(--mm-teal)] px-4 py-1.5 text-sm font-semibold text-[var(--mm-teal)] transition hover:bg-[var(--mm-teal)] hover:text-white"
                  : "flex items-center gap-1 text-sm font-medium text-neutral-800 hover:text-[var(--mm-teal)]"
              }
            >
              {item.label}
              {item.dropdown && <ChevronDown className="h-4 w-4" />}
            </a>
          ))}
          <a
            href="https://madmonkeyhostels.com/booking"
            className="flex items-center gap-1 rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Book Now <ChevronDown className="h-4 w-4" />
          </a>
        </nav>

        <button
          aria-label="Open menu"
          className="lg:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-7 w-7 text-neutral-900" />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <img
                src="https://madmonkeyhostels.com/images/madmonkey_logo.svg"
                alt="Mad Monkey"
                className="h-8 w-auto"
              />
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6 text-neutral-800" />
              </button>
            </div>
            <nav className="mt-8 flex flex-col gap-4">
              {NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between border-b border-neutral-100 pb-3 text-base font-medium text-neutral-900"
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className="h-4 w-4" />}
                </a>
              ))}
              <a href="https://madmonkeyhostels.com/login" className="text-base text-neutral-800">
                Login
              </a>
              <a
                href="https://madmonkeyhostels.com/booking"
                className="mt-4 rounded-full bg-[var(--mm-teal)] px-5 py-3 text-center text-base font-semibold text-white"
              >
                Book Now
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
