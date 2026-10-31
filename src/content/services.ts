import type { Route } from "next";

export type ServiceDiscipline = {
  key: "tech" | "marketing";
  label: string;
  emoji: string;
  /** Theme colour token used for the dot, chips and card borders. */
  accent: "teal" | "orange";
  href: Route;
  blurb: string;
  /** Short labels shown on the home page. */
  items: readonly string[];
  /** Tool chips shown on the discipline's own page. */
  stack: readonly string[];
  /** Expanded cards shown on the discipline's own page. */
  detail: readonly { title: string; description: string }[];
  cta: { heading: string; body: string };
};

export const disciplines: readonly ServiceDiscipline[] = [
  {
    key: "tech",
    label: "Tech",
    emoji: "⚙️",
    accent: "teal",
    href: "/tech",
    blurb: "Things I build.",
    items: [
      "Custom builds",
      "Web development",
      "HubSpot integrations",
      "HubSpot setups & migrations",
    ],
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "WordPress",
      "Supabase",
      "Vercel",
      "GitHub",
      "Zapier",
    ],
    detail: [
      {
        title: "Custom Builds",
        description:
          "Web apps, internal tools and automation scripts, built to solve your specific problem.",
      },
      {
        title: "Web Development",
        description:
          "WordPress or custom coded in React/Next.js. Fast, responsive, SEO-ready.",
      },
      {
        title: "HubSpot Integrations",
        description: "Connect HubSpot to Xero, custom APIs, and third-party tools.",
      },
      {
        title: "HubSpot Setups & Migrations",
        description: "Clean CRM setup, data migration, and workflow configuration.",
      },
    ],
    cta: {
      heading: "Need tech help?",
      body: "Let's talk about what you're building.",
    },
  },
  {
    key: "marketing",
    label: "Marketing",
    emoji: "📣",
    accent: "orange",
    href: "/marketing",
    blurb: "Things I grow.",
    items: [
      "Paid ads setup",
      "Email marketing & reporting",
      "Funnels & landing pages",
      "Marketing automation",
    ],
    stack: ["HubSpot", "Google Ads", "Meta Ads", "Google Analytics", "Reddit Ads", "Figma"],
    detail: [
      {
        title: "Paid Ads Setup",
        description:
          "Meta, Google and Reddit ads, from strategy to launch to optimization.",
      },
      {
        title: "Email Marketing & Reporting",
        description: "Campaign setup, sequences, and performance dashboards.",
      },
      {
        title: "Funnels & Landing Pages",
        description: "High-converting pages and lead capture flows.",
      },
      {
        title: "Marketing Automation",
        description: "Workflows, triggers, and nurture sequences that run on autopilot.",
      },
    ],
    cta: {
      heading: "Ready to grow?",
      body: "Let's set up marketing that actually works.",
    },
  },
] as const;

export const getDiscipline = (key: ServiceDiscipline["key"]) => {
  const found = disciplines.find((d) => d.key === key);
  if (!found) throw new Error(`Unknown discipline: ${key}`);
  return found;
};
