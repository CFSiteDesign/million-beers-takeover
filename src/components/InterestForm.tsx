import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const VIBES = ["Beach", "City", "Mountains", "Festival"];
const BUDGETS = ["Under $300", "$300–600", "$600–1,000", "$1,000+"];
const TIMINGS = ["Jan–Mar", "Apr–Jun", "Jul–Sep", "Oct–Dec", "Flexible"];

const schema = z.object({
  name: z.string().trim().min(1, "What do we call you?").max(80),
  whatsapp: z.string().trim().min(4, "Add your number").max(30),
  location: z.string().trim().min(1, "Tell us where").max(80),
  vibe: z.string().min(1, "Pick a vibe"),
  budget: z.string().min(1, "Pick a budget"),
  timing: z.string().min(1, "Pick a time"),
});

const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/invite/placeholder";

const ROTS = [-3, 2, -2, 3, -4, 2, -3, 3, -2];

export function InterestForm() {
  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    location: "",
    vibe: "",
    budget: "",
    timing: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = <K extends keyof typeof form>(k: K, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
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
    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).toUpperCase();
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
          <div className="mt-2 font-mono text-xs tracking-[0.3em]">MM TAKEOVER · {today}</div>
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

  const fields: Array<{ k: keyof typeof form; label: string; placeholder: string; type?: string }> = [
    { k: "name", label: "01 / Your name", placeholder: "Name or chat nickname" },
    { k: "whatsapp", label: "02 / WhatsApp", placeholder: "+1 555 123 4567", type: "tel" },
    { k: "location", label: "03 / Where you're based", placeholder: "City or country" },
  ];

  return (
    <form onSubmit={submit} className="bg-[var(--cream)] p-6 md:p-10" style={{ border: "4px solid var(--ink)" }}>
      <div className="space-y-7">
        {fields.map(({ k, label, placeholder, type }) => (
          <div key={k}>
            <span className="zine-label">{label}</span>
            <input
              type={type ?? "text"}
              className="zine-input"
              placeholder={placeholder}
              value={form[k]}
              onChange={(e) => set(k, e.target.value)}
            />
            {errors[k] && (
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-[var(--stamp-red)]">{errors[k]}</p>
            )}
          </div>
        ))}

        <StampGroup
          label="04 / Pick your vibe"
          options={VIBES}
          value={form.vibe}
          onChange={(v) => set("vibe", v)}
          error={errors.vibe}
          onCream
        />
        <StampGroup
          label="05 / Rough budget per person"
          options={BUDGETS}
          value={form.budget}
          onChange={(v) => set("budget", v)}
          error={errors.budget}
          onCream
        />
        <StampGroup
          label="06 / Best time of year"
          options={TIMINGS}
          value={form.timing}
          onChange={(v) => set("timing", v)}
          error={errors.timing}
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
