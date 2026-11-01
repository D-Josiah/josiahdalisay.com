import { ImageResponse } from "next/og";
import { site } from "@/content/site";

/** Facebook/LinkedIn/Slack all crop to this; anything else gets letterboxed. */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/**
 * Absolute `og:image` metadata for a route, pinned to the canonical host.
 *
 * Next resolves the `opengraph-image` file convention against the
 * deployment origin rather than `metadataBase`, which locally produces
 * `http://localhost:3000/...` and on Vercel can produce the project's
 * `.vercel.app` URL. Either one is a card that points at the wrong host
 * — and on a preview deployment, at a URL that may not stay reachable.
 * Declaring `images` explicitly overrides the convention's tag while the
 * route keeps generating the PNG.
 */
export function ogImageFor(path: string) {
  const url = `${site.url}${path}/opengraph-image`;
  return [{ url, ...ogSize, type: ogContentType }];
}

const INK = "#1a1a1a";
const ORANGE = "#ff4500";
const YELLOW = "#ffc900";
const CREAM = "#fafaf8";

/**
 * Shared card for every OG image on the site.
 *
 * No webfont is fetched: `ImageResponse` needs font binaries at render
 * time, so pulling Playfair from Google Fonts would make every build
 * depend on a network call that can fail. The card leans on colour,
 * weight and the offset border instead — recognisable as this site
 * without the brand serif, and it cannot break a deploy.
 */
export function ogCard({
  eyebrow,
  title,
  /**
   * Footer line under the name. Defaults to the markets rather than the
   * tagline, which the headline already carries on the site-wide card:
   * a share card is often the first thing a prospect abroad sees, and
   * "US · UK · AU" answers "do they work with people like me" in the
   * space a repeated slogan would have wasted.
   */
  footnote = "Remote · US · UK · AU",
}: {
  eyebrow: string;
  title: string;
  footnote?: string;
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: CREAM,
        padding: 72,
        border: `16px solid ${ORANGE}`,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: ORANGE,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            fontSize: title.length > 48 ? 64 : 80,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: -2,
            color: INK,
            // Satori has no multi-line clamp, so long titles are kept
            // in range by the size step above rather than by truncation.
            maxWidth: 940,
          }}
        >
          {title}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: YELLOW,
            border: `3px solid ${INK}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: 700,
            color: INK,
          }}
        >
          {site.initials}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: INK }}>{site.name}</div>
          <div style={{ fontSize: 22, color: "#666" }}>{footnote}</div>
        </div>
      </div>
    </div>,
    ogSize,
  );
}
