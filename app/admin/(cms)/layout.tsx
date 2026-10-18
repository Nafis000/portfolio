import Link from "next/link";
import { MODULES } from "@/lib/admin/modules";
import { signOut } from "../actions";

// Admin chrome. Navigation only: each page re-checks the admin on the server (requireAdmin).
export default function CmsLayout({ children }: LayoutProps<"/admin">) {
  const links = [
    { href: "/admin", label: "Overview" },
    ...MODULES.map((m) => ({ href: m.singleton ? `/admin/${m.key}/1` : `/admin/${m.key}`, label: m.label })),
    { href: "/admin/media", label: "Media library" },
    { href: "/admin/messages", label: "Messages" },
  ];

  return (
    <div className="mx-auto grid max-w-[1280px] gap-6 lg:grid-cols-[220px_1fr]">
      <nav aria-label="Content sections" className="self-start bg-sheet text-ink lg:sticky lg:top-20">
        <p className="border-b-2 border-ink px-5 py-4 font-display text-lg font-bold uppercase">Content desk</p>
        <ul className="py-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="block px-5 py-2 hover:bg-ink hover:text-sheet">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2 border-t border-sheet-line px-5 py-4">
          <Link href="/" className="text-sm underline underline-offset-4">
            View the site
          </Link>
          <form action={signOut}>
            <button type="submit" className="text-sm underline underline-offset-4">
              Sign out
            </button>
          </form>
        </div>
      </nav>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
