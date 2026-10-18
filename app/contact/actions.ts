"use server";

import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/types/database";

const message = z.object({
  name: z.string().trim().min(1, "Add your name.").max(120, "Keep your name under 120 characters."),
  email: z.email("Enter an email address I can reply to.").max(254),
  subject: z.string().trim().max(200, "Keep the subject under 200 characters.").optional(),
  message: z
    .string()
    .trim()
    .min(10, "Write at least a sentence (10 characters).")
    .max(5000, "Keep the message under 5,000 characters."),
});

export type ContactState =
  | { status: "idle" | "error"; error?: string; fields?: Partial<Record<"name" | "email" | "subject" | "message", string>> }
  | { status: "sent"; email: string };

const MIN_FILL_MS = 3000; // humans take longer than this; most bots don't

export async function sendMessage(_prev: ContactState, form: FormData): Promise<ContactState> {
  const fields = {
    name: String(form.get("name") ?? ""),
    email: String(form.get("email") ?? "").trim(),
    subject: String(form.get("subject") ?? "") || undefined,
    message: String(form.get("message") ?? ""),
  };

  // Honeypot filled: almost certainly a bot, so drop it quietly without storing anything.
  if (form.get("website")) return { status: "sent", email: fields.email };

  // Too fast (or no timing): ask again rather than pretend, in case it was a quick human.
  const startedAt = Number(form.get("started_at"));
  if (!startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "error", error: "That was quick. Give it a few seconds, then send again.", fields };
  }

  const parsed = message.safeParse(fields);
  if (!parsed.success) {
    return { status: "error", error: parsed.error.issues[0]?.message ?? "Check the form and try again.", fields };
  }

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
  const { error } = await supabase.from("contact_messages").insert(parsed.data);

  if (error) {
    if (error.message.includes("contact_rate_limited")) {
      return { status: "error", error: "Too many messages from this address recently. Try again in an hour.", fields };
    }
    console.error("[contact] insert failed", error.code);
    return {
      status: "error",
      error: "Your message couldn’t be saved just now. Try again in a minute, or email me directly.",
      fields,
    };
  }

  return { status: "sent", email: parsed.data.email };
}
