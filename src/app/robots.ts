import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Crawlers that read and cite pages inside AI answers.
 *
 * A wildcard `Allow: /` already permits all of these, so the named
 * blocks change nothing today. They are here as a standing declaration:
 * the next person to add a `Disallow` under `*` — or a plugin that does
 * it for them — would otherwise shut off AI search without anyone
 * noticing, and these rules are far more specific, so they win.
 *
 * Worth knowing: robots.txt is not where AI crawlers usually get blocked.
 * A firewall rule is, and it answers 403 before this file is ever read.
 * See docs/seo-aeo-plan.md for the Vercel check.
 */
const aiCrawlers = [
  "OAI-SearchBot", // ChatGPT search results
  "GPTBot", // OpenAI training + retrieval
  "ChatGPT-User", // fetches a page when a user's prompt needs it
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // gates Gemini / AI Overviews grounding, not ranking
  "Applebot-Extended",
  "Bingbot", // also feeds Copilot and ChatGPT's web results
  "CCBot", // Common Crawl, the seed corpus for many models
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Crawlers only read robots.txt from the origin root, so this file
      // governs the proxied /office app too.
      { userAgent: "*", allow: "/", disallow: "/office" },
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: "/office",
      })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
