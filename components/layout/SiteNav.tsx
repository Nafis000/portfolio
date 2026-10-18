import Link from "next/link";
import { getNavigation } from "@/lib/content";

// A drawing title block: ruled cells across the top of the sheet.
export async function SiteNav() {
  const links = await getNavigation();
  return (
    <header className="sticky top-0 z-40 border-b border-chalk/25 bg-mat-deep/92 backdrop-blur-sm">
      <nav aria-label="Main" className="mx-auto flex max-w-[1440px] items-stretch">
        <Link
          href="/"
          className="flex items-center gap-3 border-r border-chalk/25 px-4 py-3 font-display text-lg font-semibold tracking-wide text-chalk hover:text-copper sm:px-6"
        >
          Nafis Islam Nitol
        </Link>
        <ul className="hidden flex-1 items-stretch md:flex">
          {links.map((l) => (
            <li key={l.href} className="flex border-r border-chalk/25 last:border-r-0">
              <Link
                href={l.href}
                className="flex items-center px-4 font-display text-[0.95rem] font-medium uppercase tracking-[0.08em] text-chalk-dim transition-colors hover:bg-chalk/5 hover:text-chalk lg:px-5"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <details className="group relative ml-auto md:hidden">
          <summary className="flex h-full cursor-pointer list-none items-center border-l border-chalk/25 px-5 font-display text-sm font-medium uppercase tracking-[0.08em] text-chalk [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">Menu</span>
            <span className="hidden group-open:inline">Close</span>
          </summary>
          <ul className="absolute right-0 top-full w-56 border border-chalk/25 bg-mat-deep">
            {links.map((l) => (
              <li key={l.href} className="border-b border-chalk/15 last:border-b-0">
                <Link
                  href={l.href}
                  className="block px-5 py-3 font-display uppercase tracking-[0.08em] text-chalk-dim hover:text-chalk"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </nav>
    </header>
  );
}
