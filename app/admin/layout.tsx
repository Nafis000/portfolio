import type { Metadata } from "next";

// Keep the admin area out of search results. This is hygiene only; authorization is enforced server-side.
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="mat-grid grow min-h-[80dvh] px-4 py-14 sm:px-8 lg:py-20">
      {children}
    </div>
  );
}
