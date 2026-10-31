import type { Route } from "next";

/**
 * The home page asks "What can I help you with?" and answers in the
 * visitor's own words. Each card states the problem they arrived with,
 * then a concrete example of the work that solves it.
 */
export type Need = {
  slug: string;
  /** Phrased from the visitor's side. */
  title: string;
  description: string;
  /** Concrete, recognisable examples — this is what builds trust. */
  examples: readonly string[];
  discipline: "tech" | "marketing";
  tone: "teal" | "orange" | "purple" | "yellow";
  href: Route;
};

export const needs: readonly Need[] = [
  {
    slug: "hubspot",
    title: "Help with HubSpot",
    description:
      "Set up from scratch, migrated off another CRM, or cleaned up after someone else configured it.",
    examples: [
      "Portal setup",
      "CRM migration",
      "Workflow configuration",
      "Reporting dashboards",
    ],
    discipline: "tech",
    tone: "orange",
    href: "/tech",
  },
  {
    slug: "integrations",
    title: "My tools don't talk to each other",
    description:
      "Custom integrations between platforms that have no native connection. Built properly, not duct-taped.",
    examples: [
      "HubSpot × Xero",
      "Calendly → CRM",
      "Square payment sync",
      "Custom API work",
    ],
    discipline: "tech",
    tone: "teal",
    href: "/tech",
  },
  {
    slug: "build",
    title: "Something built from scratch",
    description:
      "A website, a web app, an internal tool, or a script that does the job nobody wants to do manually.",
    examples: [
      "Next.js & React sites",
      "WordPress builds",
      "Internal tools",
      "Automation scripts",
    ],
    discipline: "tech",
    tone: "purple",
    href: "/tech",
  },
  {
    slug: "leads",
    title: "More leads coming in",
    description:
      "Paid acquisition and the landing pages behind it, set up so you can actually see what's working.",
    examples: ["Google & Meta Ads", "Reddit Ads", "Landing pages", "Funnel tracking"],
    discipline: "marketing",
    tone: "yellow",
    href: "/marketing",
  },
  {
    slug: "automation",
    title: "Marketing that runs itself",
    description:
      "Sequences, triggers and nurture flows so the follow-up happens whether or not you remember.",
    examples: [
      "Email sequences",
      "Lifecycle workflows",
      "Lead scoring",
      "Round-robin routing",
    ],
    discipline: "marketing",
    tone: "orange",
    href: "/marketing",
  },
  {
    slug: "both",
    title: "Honestly, all of the above",
    description:
      "One person across the whole thing, the build and the growth, so nothing falls between two agencies.",
    examples: ["Site + CRM + ads", "End-to-end setup", "Ongoing support"],
    discipline: "tech",
    tone: "teal",
    href: "/#contact",
  },
] as const;
