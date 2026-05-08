import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Admin login — MM Takeover" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setLoading(false);
      if (error) return toast.error(error.message);
      toast.success("Account created. Logging in…");
      navigate({ to: "/admin" });
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) return toast.error(error.message);
      navigate({ to: "/admin" });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--ink)] text-[var(--cream)] flex items-center justify-center p-6">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-[var(--cream)] text-[var(--ink)] p-8"
        style={{ border: "4px solid var(--ink)", boxShadow: "10px 10px 0 0 var(--amber)" }}
      >
        <h1 className="font-display text-4xl mb-6">{mode === "login" ? "Admin login" : "Create admin"}</h1>

        <label className="zine-label">Email</label>
        <input type="email" required className="zine-input mb-4" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label className="zine-label">Password</label>
        <input type="password" required minLength={6} className="zine-input mb-6" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit" disabled={loading} className="btn-stamp btn-on-cream w-full text-xl">
          {loading ? "…" : mode === "login" ? "LOG IN" : "SIGN UP"}
        </button>

        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="mt-4 w-full text-center font-mono text-xs uppercase tracking-widest underline"
        >
          {mode === "login" ? "Need an account? Sign up" : "Have an account? Log in"}
        </button>

        <Link to="/" className="mt-6 block text-center font-mono text-xs uppercase tracking-widest opacity-60">
          ← back to site
        </Link>
      </form>
    </div>
  );
}
