import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ADMIN_EMAIL = "madmonkeyadmin@theorox.com";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Admin login — MM Takeover" }, { name: "robots", content: "noindex" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
    // Best-effort seed of the admin account on first load
    fetch("/api/public/seed-admin").catch(() => {});
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Make sure the admin user exists before attempting to sign in
    await fetch("/api/public/seed-admin").catch(() => {});
    const { error } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password,
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    navigate({ to: "/admin" });
  };

  return (
    <div className="min-h-screen bg-[var(--ink)] text-[var(--cream)] flex items-center justify-center p-6">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-[var(--cream)] text-[var(--ink)] p-8"
        style={{ border: "4px solid var(--ink)", boxShadow: "10px 10px 0 0 var(--amber)" }}
      >
        <h1 className="font-display text-4xl mb-2">Admin login</h1>
        <p className="font-mono text-xs uppercase tracking-widest opacity-60 mb-6 break-all">
          {ADMIN_EMAIL}
        </p>

        <label className="zine-label">Password</label>
        <input
          type="password"
          required
          minLength={6}
          autoFocus
          className="zine-input mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading} className="btn-stamp btn-on-cream w-full text-xl">
          {loading ? "…" : "LOG IN"}
        </button>

        <Link to="/" className="mt-6 block text-center font-mono text-xs uppercase tracking-widest opacity-60">
          ← back to site
        </Link>
      </form>
    </div>
  );
}
