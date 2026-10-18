import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Server-side gate for every admin page and action. The role comes from the database
// (private.admins via current_user_is_admin), never from anything the browser sends.
export async function requireAdmin() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) redirect("/admin/login");

  const { data: isAdmin, error } = await supabase.rpc("current_user_is_admin");
  if (error || isAdmin !== true) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=not-admin");
  }

  return { supabase, email: (data.claims.email as string | undefined) ?? "administrator" };
}
