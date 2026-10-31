export type BuildKind = "build" | "blog";
export type BuildStatus = "published" | "coming-soon";

export type BuildEntry = {
  slug: string;
  title: string;
  excerpt: string;
  kind: BuildKind;
  status: BuildStatus;
  /** ISO date; drives ordering and <time> output. */
  publishedAt?: string;
};

export const buildEntries: readonly BuildEntry[] = [
  {
    slug: "hubspot-xero-integration",
    title: "HubSpot × Xero Integration",
    excerpt: "How I connected two platforms that don't natively talk to each other.",
    kind: "build",
    status: "published",
    publishedAt: "2026-08-14",
  },
  {
    slug: "round-robin-lead-allocation",
    title: "Round Robin Lead Allocation",
    excerpt: "Building a fair lead distribution system inside HubSpot.",
    kind: "build",
    status: "published",
    publishedAt: "2026-06-02",
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
