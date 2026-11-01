export type BuildKind = "build" | "blog";
export type BuildStatus = "published" | "coming-soon";

/**
 * One piece of article body.
 *
 * Deliberately a small closed set rather than a markdown string: every
 * block maps to one element with known styling, so a write-up cannot
 * quietly introduce a heading level or a raw tag that breaks the page or
 * the document outline search engines read.
 */
export type BuildBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: readonly string[] }
  | { type: "code"; lang?: string; code: string };

export type BuildFaq = { question: string; answer: string };

export type BuildEntry = {
  slug: string;
  title: string;
  excerpt: string;
  kind: BuildKind;
  status: BuildStatus;
  /** ISO date; drives ordering and <time> output. */
  publishedAt?: string;
  /** ISO date of the last substantive edit, if it has been revised. */
  updatedAt?: string;
  /**
   * The answer, up front, in one or two sentences.
   *
   * Roughly half of the passages an AI answer engine quotes come from the
   * opening of a page, so the conclusion leads and the reasoning follows.
   * It doubles as the meta description, which keeps the snippet and the
   * first thing a reader sees identical.
   */
  takeaway?: string;
  /**
   * Article body. An entry without one has no page: the route is not
   * generated and the index does not link it, so a listed-but-unwritten
   * post can never be indexed as a thin page.
   */
  body?: readonly BuildBlock[];
  /**
   * Self-contained questions and answers, emitted as FAQPage schema.
   *
   * Each answer has to stand on its own — an answer that depends on the
   * paragraph above it is no use to anything quoting it in isolation.
   */
  faq?: readonly BuildFaq[];
};

export const buildEntries: readonly BuildEntry[] = [
  {
    slug: "hubspot-xero-integration",
    title: "HubSpot × Xero Integration",
    excerpt:
      "How I connected a CRM and an accounting platform so invoices, contacts and deals stay in sync without anyone re-keying them.",
    kind: "build",
    status: "published",
    publishedAt: "2026-08-14",
    // Body still to be written — see docs/seo-aeo-plan.md, Phase 2a.
    // Until `body` is filled in there is no /builds/hubspot-xero-integration
    // page, by design.
  },
  {
    slug: "sales-team-allocation",
    title: "Sales Team Allocation",
    excerpt:
      "Building a system inside HubSpot that shares inbound leads evenly across the sales team.",
    kind: "build",
    status: "published",
    publishedAt: "2026-06-02",
    // Body still to be written — see docs/seo-aeo-plan.md, Phase 2a.
  },
  {
    slug: "calendly-webhook-automation",
    title: "Calendly Webhook Automation",
    excerpt: "Connecting calendar bookings to CRM workflows.",
    kind: "build",
    status: "coming-soon",
  },
  {
    slug: "square-payment-sync",
    title: "Square Payment Sync",
    excerpt: "Automating payment data flow between Square and HubSpot.",
    kind: "build",
    status: "coming-soon",
  },
] as const;

/** Published entries first, newest first; "coming soon" trails behind. */
export const sortedBuildEntries = [...buildEntries].sort((a, b) => {
  if (a.status !== b.status) return a.status === "published" ? -1 : 1;
  return (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "");
});

/**
 * Entries presented as published on the index.
 *
 * This is what `/builds/[slug]` enumerates, rather than the readable set:
 * Cache Components requires `generateStaticParams` to return at least one
 * param, and the readable set is empty until the first body is written.
 * A published entry without a body prerenders as a 404, which nothing
 * links to and the sitemap omits — so the route is live and correct from
 * the first deploy, and an article appears the moment it has prose.
 */
export const publishedBuildEntries = sortedBuildEntries.filter(
  (entry) => entry.status === "published",
);

/** An entry with a body: the only kind that gets a page of its own. */
export type ReadableBuildEntry = BuildEntry & {
  body: readonly BuildBlock[];
  publishedAt: string;
};

const hasBody = (entry: BuildEntry): entry is ReadableBuildEntry =>
  Boolean(entry.body?.length) && Boolean(entry.publishedAt);

/** Entries that have a page. Drives routing, the sitemap and index links. */
export const readableBuildEntries: readonly ReadableBuildEntry[] =
  sortedBuildEntries.filter(hasBody);

export const getReadableBuildEntry = (slug: string) =>
  readableBuildEntries.find((entry) => entry.slug === slug);

export const buildCategories = [
  {
    emoji: "💻",
    title: "Builds",
    description:
      "Technical deep dives into projects I've shipped: what I used, why I used it, and what I'd do differently.",
    tone: "yellow" as const,
  },
  {
    emoji: "✍️",
    title: "Blogs",
    description:
      "Lessons from the field: HubSpot tips, automation patterns, marketing ops, and things I've figured out the hard way.",
    tone: "cream" as const,
  },
] as const;
