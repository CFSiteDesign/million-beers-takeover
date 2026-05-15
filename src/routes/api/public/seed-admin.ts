import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const ADMIN_EMAIL = "madmonkeyadmin@theorox.com";

export const Route = createFileRoute("/api/public/seed-admin")({
  server: {
    handlers: {
      GET: async () => {
        const password = process.env.ADMIN_PASSWORD;
        if (!password) {
          return new Response("ADMIN_PASSWORD not configured", { status: 500 });
        }

        // Check if user already exists by listing and filtering
        const { data: list, error: listErr } = await supabaseAdmin.auth.admin.listUsers();
        if (listErr) return new Response(listErr.message, { status: 500 });

        let user = list.users.find((u) => u.email?.toLowerCase() === ADMIN_EMAIL);

        if (!user) {
          const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
            email: ADMIN_EMAIL,
            password,
            email_confirm: true,
          });
          if (createErr) return new Response(createErr.message, { status: 500 });
          user = created.user!;
        } else {
          // Sync password to current ADMIN_PASSWORD secret
          const { error: updErr } = await supabaseAdmin.auth.admin.updateUserById(user.id, { password });
          if (updErr) return new Response(updErr.message, { status: 500 });
        }

        // Ensure admin role row exists
        const { data: existingRoles } = await supabaseAdmin
          .from("user_roles")
          .select("id")
          .eq("user_id", user.id)
          .eq("role", "admin");

        if (!existingRoles || existingRoles.length === 0) {
          const { error: roleErr } = await supabaseAdmin
            .from("user_roles")
            .insert({ user_id: user.id, role: "admin" });
          if (roleErr) return new Response(roleErr.message, { status: 500 });
        }

        return new Response(
          JSON.stringify({ ok: true, email: ADMIN_EMAIL, userId: user.id }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      },
    },
  },
});
