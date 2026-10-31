export type ProjectTone = "teal" | "orange" | "purple" | "ink";

export type Project = {
  slug: string;
  title: string;
  description: string;
  tone: ProjectTone;
  tags: readonly string[];
  /** Spans two columns in the bento grid. */
  featured?: boolean;
  /** Renders the live pill and the mock browser preview. */
  live?: { url: string };
  link?: { href: string; label: string };
};

export const projects: readonly Project[] = [
  {
    slug: "lsat-academy",
    title: "LSAT Academy",
    description:
      "Full marketing system: website, CRM, funnels, Google Ads, email sequences.",
    tone: "teal",
    tags: ["Tech + Marketing"],
    featured: true,
    live: { url: "https://lsatacademy.com.au" },
  },
  {
    slug: "hubspot-xero",
    title: "HubSpot × Xero",
    description:
      "Custom integration syncing invoices, contacts, and deals between platforms.",
    tone: "orange",
    tags: ["HubSpot"],
    link: { href: "/builds", label: "Read the Build Log ↗" },
  },
  {
    slug: "round-robin",
    title: "Round Robin Allocation",
    description: "Automated lead routing system for balanced sales team distribution.",
    tone: "purple",
    tags: ["HubSpot", "Sales Ops"],
  },
  {
    slug: "calendly-automation",
    title: "Calendly Automation",
    description: "Webhook-driven workflows connecting Calendly events to HubSpot CRM.",
    tone: "teal",
    tags: ["HubSpot", "Webhooks"],
  },
  {
    slug: "square-automation",
    title: "Square Automation",
    description: "Payment syncing and automated receipt workflows with Square + HubSpot.",
    tone: "ink",
    tags: ["HubSpot", "Square", "Automation"],
  },
] as const;
