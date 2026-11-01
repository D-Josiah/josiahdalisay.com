/** Single source of truth for identity, nav and SEO defaults. */
export const site = {
  name: "Josiah Dalisay",
  initials: "JD",
  title: "Josiah Dalisay | Tech & Marketing",
  tagline: "Your go-to for tech and marketing.",
  description:
    "Josiah Dalisay is a developer and marketer in one, helping businesses with HubSpot setups and integrations, websites, paid ads and marketing automation.",
  /**
   * Canonical origin. The apex 308-redirects to www on Vercel, so this
   * must be the www form: canonical tags, OG urls and the sitemap all
   * read from it, and pointing them at a URL that redirects is untidy
   * for search engines and link previews. Flip both together if the
   * redirect is ever reversed.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.josiahdalisay.com",
  email: "hello@josiahdalisay.com",
  intro:
    "Hi, I'm Josiah. I bring your marketing and tech together to help your business run smoothly and reach more customers. I can help with campaigns, CRMs, websites, and automations.",
  /**
   * Profiles that belong to the same person. Emitted as schema.org
   * `sameAs`, which is how a search engine learns this site and those
   * profiles are one entity rather than several.
   */
  profiles: [] as readonly string[],
  /**
   * Markets the work is for, as ISO 3166-1 country codes. Emitted as
   * schema.org `areaServed`.
   *
   * The site states no city or country of its own on purpose: the buyers
   * are abroad, and a local address narrows the entity rather than
   * widening it. This is the one place geography is declared, and it
   * describes the clients, not a base of operations.
   */
  areaServed: ["US", "GB", "AU"] as const,
  /**
   * Timezone reach, stated once so a US or UK buyer gets an answer to
   * "can you work my hours" without having to ask. Also feeds the
   * practice schema, where it answers the same question for an engine
   * summarising the site.
   */
  availability: "Remote, working across US, UK and Australian timezones.",
  credentials: [
    "Computer Science Background",
    "Marketing Agency Experience",
    "HubSpot Certified",
  ],
} as const;

export type NavLink = { href: string; label: string; cta?: boolean };

export const navLinks: readonly NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/builds", label: "Builds & Blogs" },
  { href: "/#contact", label: "Let's Talk", cta: true },
] as const;

export const footerNav = [
  {
    heading: "Navigate",
    links: [
      { href: "/#projects", label: "Projects" },
      { href: "/builds", label: "Builds & Blogs" },
      { href: "/#contact", label: "Contact" },
    ],
  },
  {
    heading: "Services",
    links: [
      { href: "/tech", label: "Tech" },
      { href: "/marketing", label: "Marketing" },
    ],
  },
] as const;
