import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Waves, Building2, Mountain, Music, MessageCircle } from "lucide-react";

const VIBES = [
  { v: "Beach", Icon: Waves },
  { v: "City", Icon: Building2 },
  { v: "Mountains", Icon: Mountain },
  { v: "Festival", Icon: Music },
];
const BUDGETS = ["Under $300", "$300 to $600", "$600 to $1,000", "$1,000 plus, let's go big"];
const TIMINGS = ["Jan to Mar", "Apr to Jun", "Jul to Sep", "Oct to Dec", "Flexible, just tell me when"];

const schema = z.object({
  name: z.string().trim().min(1, "What do we call you?").max(80),
  whatsapp: z.string().trim().min(4, "Add your number").max(30),
  location: z.string().trim().min(1, "Tell us where").max(80),
  vibe: z.string().min(1, "Pick a vibe"),
  budget: z.string().min(1, "Pick a budget"),
  timing: z.string().min(1, "Pick a time"),
});

const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/invite/placeholder";

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

  const validateField = (k: string, v: string) => {
    const partial = schema.pick({ [k]: true } as Record<string, true>);
    const r = partial.safeParse({ [k]: v });
    setErrors((e) => ({ ...e, [k]: r.success ? "" : r.error.issues[0].message }));
  };

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
    return (
      <div className="relative overflow-hidden rounded-2xl border border-[var(--amber)]/40 bg-[var(--card)] p-8 text-center shadow-[var(--shadow-amber)]">
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="absolute block rounded-full bg-[var(--foam)]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: 4 + Math.random() * 10,
                height: 4 + Math.random() * 10,
                opacity: 0.6,
                animation: `pop ${0.6 + Math.random()}s ease-out forwards`,
                animationDelay: `${Math.random() * 0.6}s`,
              }}
            />
          ))}
        </div>
        <h3 className="font-display text-3xl text-[var(--cream)]">YOU'RE ON THE LIST.</h3>
        <p className="mx-auto mt-4 max-w-md text-[var(--cream)]/80">
          We'll be in touch when there's something worth saying. In the meantime, get back in
          the chat.
        </p>
        <a
          href={WHATSAPP_GROUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="foam-btn mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--amber)] px-7 py-3 font-display text-lg tracking-wider text-[var(--primary-foreground)] shadow-[var(--shadow-amber)]"
        >
          <MessageCircle className="h-5 w-5" /> OPEN WHATSAPP GROUP
        </a>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-lg border border-[var(--border)] bg-black/40 px-4 py-3 text-[var(--cream)] placeholder:text-[var(--cream)]/40 transition focus:border-[var(--amber)] focus:outline-none focus:ring-4 focus:ring-[var(--amber)]/30";
  const errCls = "mt-1 text-sm text-[var(--destructive)]";

  return (
    <form
      onSubmit={submit}
      className="relative rounded-2xl border border-[var(--amber)]/30 bg-[var(--card)]/80 p-6 shadow-[var(--shadow-amber)] backdrop-blur-md md:p-10"
    >
      <div className="space-y-6">
        <Field label="What do we call you?" error={errors.name}>
          <input
            className={inputCls}
            placeholder="Name or chat nickname"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={(e) => validateField("name", e.target.value)}
          />
        </Field>

        <Field label="Drop your WhatsApp number" error={errors.whatsapp}>
          <input
            type="tel"
            className={inputCls}
            placeholder="+1 555 123 4567"
            value={form.whatsapp}
            onChange={(e) => set("whatsapp", e.target.value)}
            onBlur={(e) => validateField("whatsapp", e.target.value)}
          />
        </Field>

        <Field label="Where in the world are you?" error={errors.location}>
          <input
            className={inputCls}
            placeholder="City or country"
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            onBlur={(e) => validateField("location", e.target.value)}
          />
        </Field>

        <Field label="Pick your vibe" error={errors.vibe}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {VIBES.map(({ v, Icon }) => (
              <button
                type="button"
                key={v}
                onClick={() => {
                  set("vibe", v);
                  validateField("vibe", v);
                }}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition ${
                  form.vibe === v
                    ? "border-[var(--amber)] bg-[var(--amber)]/15 text-[var(--cream)]"
                    : "border-[var(--border)] bg-black/30 text-[var(--cream)]/80 hover:border-[var(--amber)]/50"
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-sm font-semibold">{v}</span>
              </button>
            ))}
          </div>
        </Field>

        <Field label="Rough budget per person, flights aside" error={errors.budget}>
          <Segmented
            options={BUDGETS}
            value={form.budget}
            onChange={(v) => {
              set("budget", v);
              validateField("budget", v);
            }}
          />
        </Field>

        <Field label="Best time of year" error={errors.timing}>
          <Segmented
            options={TIMINGS}
            value={form.timing}
            onChange={(v) => {
              set("timing", v);
              validateField("timing", v);
            }}
          />
        </Field>

        <button
          type="submit"
          disabled={loading}
          className="foam-btn relative w-full rounded-full bg-[var(--amber)] px-8 py-4 font-display text-xl tracking-widest text-[var(--primary-foreground)] shadow-[var(--shadow-amber)] transition disabled:opacity-60"
        >
          {loading ? "ADDING…" : "ADD ME TO THE LIST"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold tracking-wide text-[var(--cream)]">
        {label}
      </span>
      {children}
      {error && <p className="mt-1 text-sm text-[var(--destructive)]">{error}</p>}
    </label>
  );
}

function Segmented({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          type="button"
          key={o}
          onClick={() => onChange(o)}
          className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition ${
            value === o
              ? "border-[var(--amber)] bg-[var(--amber)]/15 text-[var(--cream)]"
              : "border-[var(--border)] bg-black/30 text-[var(--cream)]/80 hover:border-[var(--amber)]/50"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
