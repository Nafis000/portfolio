"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const credentials = z.object({
  email: z.email().max(254),
  password: z.string().min(8).max(200),
});

export type LoginState = { error: string | null; email: string };

// One generic message for every failure so the form doesn't reveal which accounts exist.
const FAILED = "That email and password don’t match an administrator account.";

export async function signIn(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const parsed = credentials.safeParse({ email, password: formData.get("password") });
  if (!parsed.success) return { error: "Enter a valid email and a password of at least 8 characters.", email };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    // Supabase Auth rate-limits password sign-in; surface that distinctly so the owner knows to wait.
    if (error.status === 429) return { error: "Too many attempts. Wait a few minutes and try again.", email };
    return { error: FAILED, email };
  }

  const { data: isAdmin } = await supabase.rpc("current_user_is_admin");
  if (isAdmin !== true) {
    await supabase.auth.signOut();
    return { error: FAILED, email };
  }

  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
