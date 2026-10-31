import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import { PaintFilters } from "@/components/decor/PaintFilters";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { site } from "@/content/site";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
      <body>
        <a
          href="#main"
          className="focus:border-ink focus:bg-yellow sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-200 focus:rounded-lg focus:border-2 focus:px-4 focus:py-2 focus:font-bold"
        >
          Skip to content
        </a>
        <PaintFilters />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
