import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mat-grid flex min-h-[70dvh] items-center px-6">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-6xl font-bold uppercase text-chalk">Page not found</h1>
        <p className="mt-2 font-hand text-2xl text-copper">open circuit</p>
        <p className="mt-4 text-lg text-chalk-dim">There&rsquo;s nothing connected at this address.</p>
        <Link
          href="/"
          className="mt-8 inline-block bg-copper px-6 py-3 font-display font-semibold uppercase tracking-[0.08em] text-ink hover:bg-chalk"
        >
          Back to the start
        </Link>
      </div>
    </div>
  );
}
