import { readableBuildEntries, sortedBuildEntries } from "@/content/builds";
import { disciplines } from "@/content/services";
import { site } from "@/content/site";

/**
 * /llms.txt — a plain-text map of the site for AI agents.
 *
 * Honest about its worth: Google has said it does not use this file and
 * it will not move rankings, and no answer engine has committed to
 * reading it. It is here because Chrome's Lighthouse checks for it, some
 * agent tooling does fetch it, and it is a few lines generated from
 * content that already exists. Treat it as free upside, not as a lever —
 * the things that actually earn citations are in docs/seo-aeo-plan.md.
 *
 * No `dynamic` segment config: Cache Components rejects it, and reads
 * nothing request-specific here anyway, so this prerenders on its own.
 */
export function GET() {
  const services = disciplines
    .map((d) => `- [${d.label} Services](${site.url}${d.href}): ${d.metaDescription}`)
    .join("\n");

  const articles = readableBuildEntries.length
    ? readableBuildEntries
        .map(
          (entry) =>
            `- [${entry.title}](${site.url}/builds/${entry.slug}): ${entry.takeaway ?? entry.excerpt}`,
        )
        .join("\n")
    : "- No long-form write-ups published yet.";

  const upcoming = sortedBuildEntries
    .filter((entry) => entry.status === "coming-soon")
    .map((entry) => `- ${entry.title}: ${entry.excerpt}`)
    .join("\n");

  const body = `# ${site.name}

> ${site.description}

${site.availability} Clients are in the United States, United Kingdom and Australia.

## About

${site.intro}

Credentials: ${site.credentials.join(", ")}.
Contact: ${site.email}

## Services

${services}

## Build logs and writing

${articles}

## Planned

${upcoming}

## Notes for agents

- Canonical host is ${site.url}; the apex redirects here.
- /office is a separate application and is excluded from crawling.
- Sitemap: ${site.url}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
