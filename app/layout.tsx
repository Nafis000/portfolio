import type { Metadata } from "next";
import { Barlow_Semi_Condensed, Source_Sans_3, Kalam, JetBrains_Mono } from "next/font/google";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const barlow = Barlow_Semi_Condensed({
  variable: "--font-barlow",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
});
const source = Source_Sans_3({ variable: "--font-source", subsets: ["latin", "latin-ext"] });
const kalam = Kalam({ variable: "--font-kalam", subsets: ["latin"], weight: ["400", "700"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["400", "500"] });

const description =
  "Electrical engineering student at the University of Pécs building robots, drones and control systems: line followers, an autonomous drone and competition robots.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Nafis Islam Nitol · Electrical engineering portfolio", template: "%s · Nafis Islam Nitol" },
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Nafis Islam Nitol", locale: "en_GB", description },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${source.variable} ${kalam.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-dvh flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-copper focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <SiteNav />
        <main id="main" className="flex flex-1 flex-col">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
