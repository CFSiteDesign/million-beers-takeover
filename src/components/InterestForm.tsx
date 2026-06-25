import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { COUNTRIES } from "@/lib/countries";

const EVENT_NAME = "BrewDog Manchester Meetup";


const schema = z.object({
  name: z.string().trim().min(1, "What do we call you?").max(80),
  whatsapp: z.string().trim().min(4, "Add your number").max(30),
  location: z.string().trim().min(1, "Tell us where").max(80),
  vibe: z.string().min(1, "Pick a vibe"),
});

const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/invite/placeholder";

const ROTS = [-3, 2, -2, 3, -4, 2, -3, 3, -2];

export function InterestForm() {
  const [form, setForm] = useState({
    name: "",
    dialCode: "+1",
    whatsapp: "",
    location: "",
    vibe: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = <K extends keyof typeof form>(k: K, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      whatsapp: `${form.dialCode} ${form.whatsapp}`.trim(),
      location: form.location,
      vibe: form.vibe,
    };
    const r = schema.safeParse(payload);
    if (!r.success) {
      const fieldErrs: Record<string, string> = {};
      r.error.issues.forEach((i) => (fieldErrs[i.path[0] as string] = i.message));
      setErrors(fieldErrs);
      toast.error("Fix the highlighted fields");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("takeover_interest").insert(r.data);
    setLoading(false);
    if (error) {
      toast.error("Couldn't save that. Try again?");
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className="relative bg-[var(--ink)] p-10 text-center" style={{ border: "4px solid var(--ink)", boxShadow: "10px 10px 0 0 var(--amber)" }}>
        <div
          className="mx-auto inline-block px-10 py-8"
          style={{
            border: "4px double var(--stamp-red)",
            transform: "rotate(-8deg)",
            color: "var(--stamp-red)",
          }}
        >
          <div className="font-display text-5xl tracking-wider">ON THE LIST</div>
          
        </div>
        <p className="mx-auto mt-8 max-w-md text-[var(--cream)]/80">
          We'll be in touch when there's something worth saying.
        </p>
        <a
          href={WHATSAPP_GROUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-stamp mt-6"
        >
          OPEN WHATSAPP GROUP
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex h-full w-full flex-col bg-[var(--cream)] p-6 md:p-10" style={{ border: "4px solid var(--ink)" }}>
      <div className="space-y-7">
        <div>
          <span className="zine-label">Your name</span>
          <input
            type="text"
            className="zine-input"
            placeholder="Name or chat nickname"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />
          {errors.name && (
            <p className="mt-1 font-mono text-xs uppercase tracking-widest text-[var(--stamp-red)]">{errors.name}</p>
          )}
        </div>

        <div>
          <span className="zine-label">WhatsApp</span>
          <div className="flex gap-2">
            <DialCodePicker
              value={form.dialCode}
              onChange={(v) => set("dialCode", v)}
            />
            <input
              type="tel"
              inputMode="tel"
              className="zine-input flex-1 min-w-0"
              placeholder="555 123 4567"
              value={form.whatsapp}
              onChange={(e) => set("whatsapp", e.target.value)}
            />
          </div>
          {errors.whatsapp && (
            <p className="mt-1 font-mono text-xs uppercase tracking-widest text-[var(--stamp-red)]">{errors.whatsapp}</p>
          )}
        </div>

        <div>
          <span className="zine-label">Where you're based</span>
          <select
            className="zine-input"
            style={{ color: "var(--ink)" }}
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            aria-label="Country"
          >
            <option value="" style={{ color: "#0a0a0a" }}>Pick your country…</option>
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.name} style={{ color: "#0a0a0a" }}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>
          {errors.location && (
            <p className="mt-1 font-mono text-xs uppercase tracking-widest text-[var(--stamp-red)]">{errors.location}</p>
          )}
        </div>

        <StampGroup
          label="Pick your vibe"
          options={VIBES}
          value={form.vibe}
          onChange={(v) => set("vibe", v)}
          error={errors.vibe}
          onCream
        />

        <button type="submit" disabled={loading} className="btn-stamp btn-on-cream w-full text-2xl">
          {loading ? "ADDING…" : "STAMP ME IN"}
        </button>
      </div>
    </form>
  );
}

function StampGroup({
  label,
  options,
  value,
  onChange,
  error,
  onCream,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  onCream?: boolean;
}) {
  return (
    <div>
      <span className="zine-label">{label}</span>
      <div className="flex flex-wrap gap-3 pt-2">
        {options.map((o, i) => {
          const selected = value === o;
          return (
            <button
              key={o}
              type="button"
              onClick={() => onChange(o)}
              className={`stamp-pill ${onCream ? "on-cream" : ""} ${selected ? "selected" : "idle"}`}
              style={{ ["--rot" as never]: `${ROTS[i % ROTS.length]}deg` }}
            >
              {o}
            </button>
          );
        })}
      </div>
      {error && (
        <p className="mt-2 font-mono text-xs uppercase tracking-widest text-[var(--stamp-red)]">{error}</p>
      )}
    </div>
  );
}

function DialCodePicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const selected = COUNTRIES.find((c) => c.dial === value);
  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="zine-input flex items-center justify-between gap-2 pr-3 text-left"
        style={{ color: "var(--ink)", minWidth: "5.5rem" }}
        aria-label="Country code"
      >
        <span>{selected ? `${selected.flag} ${selected.dial}` : value}</span>
        <span aria-hidden className="text-xs">▾</span>
      </button>
      {open && (
        <ul
          className="absolute left-0 top-full z-50 mt-1 max-h-64 w-64 overflow-auto bg-[var(--cream)] py-1"
          style={{ border: "2px solid var(--ink)", color: "var(--ink)" }}
        >
          {COUNTRIES.map((c) => (
            <li key={c.code}>
              <button
                type="button"
                onClick={() => { onChange(c.dial); setOpen(false); }}
                className="block w-full px-3 py-2 text-left font-mono text-sm hover:bg-[var(--ink)] hover:text-[var(--cream)]"
              >
                {c.flag} {c.dial} {c.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
