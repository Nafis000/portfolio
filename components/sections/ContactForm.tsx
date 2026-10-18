"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendMessage, type ContactState } from "@/app/contact/actions";

const label = "font-display text-sm font-semibold uppercase tracking-[0.1em]";
const input =
  "mt-1.5 block w-full border-2 border-ink bg-sheet px-3 py-2.5 text-ink outline-none transition-shadow placeholder:text-ink-dim/70 focus:shadow-[0_0_0_3px_var(--color-ink)]";

export function ContactForm({ email }: { email: string | null }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendMessage, { status: "idle" });
  // Stamped when the form appears; the server rejects submissions faster than a human could type.
  const startedAt = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now());
  }, [state]);

  if (state.status === "sent") {
    return (
      <div role="status" className="border-2 border-ink bg-sheet p-6 text-ink">
        <p className="font-display text-2xl font-bold uppercase">Message saved</p>
        <p className="mt-2 max-w-[48ch]">
          Thanks. Your message is with me, and I’ll reply to <strong>{state.email}</strong>.
        </p>
      </div>
    );
  }

  const v = state.fields ?? {};
  return (
    <form action={action} className="grid gap-5 sm:grid-cols-2" noValidate>
      <div>
        <label htmlFor="c-name" className={label}>Name</label>
        <input id="c-name" name="name" autoComplete="name" required maxLength={120} defaultValue={v.name} className={input} />
      </div>
      <div>
        <label htmlFor="c-email" className={label}>Email</label>
        <input id="c-email" name="email" type="email" autoComplete="email" required maxLength={254} defaultValue={v.email} className={input} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="c-subject" className={label}>
          Subject <span className="font-sans text-xs font-normal normal-case tracking-normal">(optional)</span>
        </label>
        <input id="c-subject" name="subject" maxLength={200} defaultValue={v.subject} className={input} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="c-message" className={label}>Message</label>
        <textarea
          id="c-message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          defaultValue={v.message}
          aria-invalid={state.status === "error"}
          aria-describedby={state.status === "error" ? "c-error" : "c-privacy"}
          className={`${input} resize-y`}
        />
      </div>
      {/* Honeypot: hidden from people and assistive tech, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="c-website">Website</label>
        <input id="c-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedAt} type="hidden" name="started_at" defaultValue="" />

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="bg-ink px-6 py-3.5 font-display text-lg font-semibold uppercase tracking-[0.08em] text-sheet transition-colors hover:bg-mat-deep disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
        {state.status === "error" ? (
          <p id="c-error" role="alert" className="font-semibold">
            {state.error}
          </p>
        ) : (
          <p id="c-privacy" className="max-w-[46ch] text-sm">
            Your name, email and message are stored so I can reply{email ? <>, or write to {email}</> : null}. Nothing
            is shared.
          </p>
        )}
      </div>
    </form>
  );
}
