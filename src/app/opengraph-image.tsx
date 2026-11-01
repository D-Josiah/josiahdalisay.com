import { ogCard, ogContentType, ogSize } from "@/lib/og";
import { site } from "@/content/site";

/**
 * Site-wide share card. Routes below inherit this unless they ship their
 * own `opengraph-image`, so one file covers /, /tech, /marketing and
 * /builds — the pages most likely to be pasted into a prospect's Slack.
 */
export const alt = `${site.name} — ${site.tagline}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({
    eyebrow: "Tech & Marketing",
    title: "Your go-to for tech and marketing.",
  });
}
