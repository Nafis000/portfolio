import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

const NOTICES: Record<string, string> = {
  "not-admin": "That account isn’t an administrator, so it was signed out.",
};

export default function LoginPage({ searchParams }: PageProps<"/admin/login">) {
  return (
    <div className="mx-auto max-w-md bg-sheet text-ink shadow-[0_30px_60px_-28px_rgb(5_20_14/0.85),0_2px_6px_rgb(5_20_14/0.25)]">
      <div className="border-b-2 border-ink px-7 py-6">
        <h1 className="text-4xl font-bold uppercase leading-none">Admin sign in</h1>
        <p className="mt-2 text-ink-dim">For the site owner. Visitors don’t need an account.</p>
      </div>
      <div className="px-7 py-7">
        <Suspense fallback={<div className="h-72" aria-busy="true" />}>
          <LoginWithNotice searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function LoginWithNotice({ searchParams }: { searchParams: PageProps<"/admin/login">["searchParams"] }) {
  const { error } = await searchParams;
  return <LoginForm notice={typeof error === "string" ? (NOTICES[error] ?? null) : null} />;
}
