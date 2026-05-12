import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Lead = {
  id: string;
  created_at: string;
  name: string;
  whatsapp: string;
  location: string;
  vibe: string;
};

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Leads — MM Takeover Admin" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate({ to: "/auth" });
        return;
      }
      const uid = sess.session.user.id;
      if (!mounted) return;
      setUserId(uid);

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", uid);
      const admin = !!roles?.some((r) => r.role === "admin");
      if (!mounted) return;
      setIsAdmin(admin);

      if (admin) {
        const { data, error } = await supabase
          .from("takeover_interest")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) toast.error(error.message);
        if (mounted) setLeads((data as Lead[]) ?? []);
      }
      if (mounted) setLoading(false);
    };

    init();
    return () => { mounted = false; };
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  const exportCsv = () => {
    if (!leads) return;
    const headers = ["created_at", "name", "whatsapp", "location", "vibe"];
    const rows = leads.map((l) =>
      headers.map((h) => `"${String((l as any)[h] ?? "").replace(/"/g, '""')}"`).join(","),
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mm-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div className="min-h-screen bg-[var(--ink)] text-[var(--cream)] flex items-center justify-center font-mono">LOADING…</div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[var(--ink)] text-[var(--cream)] flex items-center justify-center p-6">
        <div className="max-w-md text-center bg-[var(--cream)] text-[var(--ink)] p-8" style={{ border: "4px solid var(--ink)" }}>
          <h1 className="font-display text-3xl mb-3">No admin access</h1>
          <p className="font-mono text-sm mb-2 break-all">Logged in as: {userId}</p>
          <p className="font-mono text-xs opacity-70 mb-6">
            Ask the project owner to grant you the <strong>admin</strong> role for this user ID, then refresh.
          </p>
          <button onClick={signOut} className="btn-stamp btn-on-cream w-full">SIGN OUT</button>
          <Link to="/" className="mt-4 block font-mono text-xs uppercase tracking-widest underline">← back to site</Link>
        </div>
      </div>
    );
  }

  const filtered = (leads ?? []).filter((l) => {
    if (!filter) return true;
    const f = filter.toLowerCase();
    return [l.name, l.whatsapp, l.location, l.vibe].some((v) =>
      v?.toLowerCase().includes(f),
    );
  });

  const total = leads?.length ?? 0;
  const byVibe = countBy(leads ?? [], "vibe");

  return (
    <div className="min-h-screen bg-[var(--ink)] text-[var(--cream)] p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-4xl md:text-5xl">Leads</h1>
            <p className="font-mono text-xs uppercase tracking-widest opacity-60">MM Takeover · admin</p>
          </div>
          <div className="flex gap-2">
            <button onClick={exportCsv} className="btn-stamp">EXPORT CSV</button>
            <button onClick={signOut} className="btn-stamp">SIGN OUT</button>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Stat label="Total leads" value={total} />
          <StatList label="By vibe" entries={byVibe} />
        </section>

        <input
          className="zine-input mb-4 bg-[var(--cream)] text-[var(--ink)]"
          placeholder="Search name, country, vibe…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <div className="overflow-x-auto bg-[var(--cream)] text-[var(--ink)]" style={{ border: "4px solid var(--cream)" }}>
          <table className="w-full text-sm">
            <thead className="font-mono text-xs uppercase tracking-widest bg-[var(--ink)] text-[var(--cream)]">
              <tr>
                <th className="p-3 text-left">When</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">WhatsApp</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Vibe</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="p-6 text-center font-mono text-xs uppercase tracking-widest opacity-60">No leads yet</td></tr>
              )}
              {filtered.map((l) => (
                <tr key={l.id} className="border-t border-[var(--ink)]/10">
                  <td className="p-3 font-mono text-xs whitespace-nowrap">{new Date(l.created_at).toLocaleString()}</td>
                  <td className="p-3 font-medium">{l.name}</td>
                  <td className="p-3 font-mono text-xs">{l.whatsapp}</td>
                  <td className="p-3">{l.location}</td>
                  <td className="p-3">{l.vibe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function countBy<T extends Record<string, any>>(arr: T[], key: keyof T) {
  const m: Record<string, number> = {};
  for (const x of arr) {
    const k = String(x[key] ?? "—");
    m[k] = (m[k] ?? 0) + 1;
  }
  return Object.entries(m).sort((a, b) => b[1] - a[1]);
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-[var(--cream)] text-[var(--ink)] p-5" style={{ border: "4px solid var(--cream)" }}>
      <div className="font-mono text-xs uppercase tracking-widest opacity-60">{label}</div>
      <div className="font-display text-5xl mt-2">{value}</div>
    </div>
  );
}

function StatList({ label, entries }: { label: string; entries: [string, number][] }) {
  return (
    <div className="bg-[var(--cream)] text-[var(--ink)] p-5" style={{ border: "4px solid var(--cream)" }}>
      <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-2">{label}</div>
      {entries.length === 0 ? (
        <div className="font-mono text-xs opacity-60">—</div>
      ) : (
        <ul className="space-y-1">
          {entries.map(([k, v]) => (
            <li key={k} className="flex justify-between font-mono text-sm">
              <span>{k}</span><span className="font-bold">{v}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
