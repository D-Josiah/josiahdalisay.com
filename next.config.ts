import type { NextConfig } from "next";

/**
 * Origin of the Virtual Office app, which lives in its own Vercel project.
 * Set `OFFICE_ORIGIN` (e.g. https://office.example.vercel.app) to switch the
 * proxy on; with it unset the rewrite is skipped and /office 404s here.
 */
const officeOrigin = process.env.OFFICE_ORIGIN?.replace(/\/+$/, "");

const nextConfig: NextConfig = {
  // Every route here is static; Cache Components keeps it that way by
  // flagging anything that would silently opt a page into dynamic rendering.
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  /**
   * Serve the Virtual Office under this domain.
   *
   * A rewrite, never a redirect: a redirect would move the browser to the
   * office's own origin, and Supabase would then set its auth cookie on
   * that host instead of this one. Sign-in fails silently when that
   * happens, because the cookie is written somewhere the app never reads.
   * A rewrite keeps the URL — and so the cookie — on this domain.
   */
  async rewrites() {
    if (!officeOrigin) return [];
    return [
      { source: "/office", destination: `${officeOrigin}/office` },
      { source: "/office/:path*", destination: `${officeOrigin}/office/:path*` },
    ];
  },

  /**
   * Keep the office out of search results.
   *
   * Caveat, verified against a live proxy: these headers do NOT reach a
   * response produced by an external rewrite. Next serves the upstream's
   * headers verbatim, so this rule only fires when `OFFICE_ORIGIN` is
   * unset and /office is handled locally.
   *
   * Real enforcement therefore has to be sent by the office app itself.
   * This stays as a backstop for the un-proxied case.
   */
  async headers() {
    return [
      {
        source: "/office/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
