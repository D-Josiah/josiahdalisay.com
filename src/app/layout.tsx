import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import { PaintFilters } from "@/components/decor/PaintFilters";
import { MascotDefs } from "@/components/mascot/MascotDefs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { site } from "@/content/site";
import { ogImageFor } from "@/lib/og";
import { jsonLd, siteGraph } from "@/lib/seo";
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
    // Plain "en" rather than a country variant. The buyers are in three
    // countries and the copy is written for all of them, so naming one
    // locale would mislabel the page for the other two.
    locale: "en",
    images: ogImageFor(""),
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ogImageFor(""),
  },
  alternates: { canonical: "/" },
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  // Spelled out rather than left to the default, including the richer
  // snippet limits, which is what lets Google show a fuller result.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
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
        <script
          type="application/ld+json"
          // Trusted, locally built JSON; nothing here comes from user input.
          dangerouslySetInnerHTML={{ __html: jsonLd(siteGraph()) }}
        />
        <PaintFilters />
        <MascotDefs />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
