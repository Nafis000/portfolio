"use client";

import { useActionState } from "react";
import { signIn, type LoginState } from "../actions";

const field =
  "mt-1.5 block w-full border-2 border-ink bg-white px-3 py-2.5 text-ink outline-none transition-shadow focus:shadow-[0_0_0_3px_var(--color-copper)]";

export function LoginForm({ notice }: { notice: string | null }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(signIn, { error: notice, email: "" });

  return (
    <form action={action} className="space-y-5" noValidate>
      <div>
        <label htmlFor="email" className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-ink-dim">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          defaultValue={state.email}
          aria-invalid={Boolean(state.error)}
          aria-describedby={state.error ? "login-error" : undefined}
          className={field}
        />
      </div>
      <div>
        <label htmlFor="password" className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-ink-dim">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          minLength={8}
          aria-invalid={Boolean(state.error)}
          aria-describedby={state.error ? "login-error" : undefined}
          className={field}
        />
      </div>
      <p id="login-error" role="alert" className="min-h-6 text-copper-deep">
        {state.error}
      </p>
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-ink px-6 py-3.5 font-display text-lg font-semibold uppercase tracking-[0.08em] text-sheet transition-colors hover:bg-copper-deep disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
