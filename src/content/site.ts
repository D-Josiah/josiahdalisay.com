/** Single source of truth for identity, nav and SEO defaults. */
export const site = {
  name: "Josiah Dalisay",
  initials: "JD",
  title: "Josiah Dalisay | Tech & Marketing",
  tagline: "Your go-to for tech and marketing.",
  description:
    "Developer and marketer in one. Custom builds, web development, HubSpot integrations, paid ads, funnels and marketing automation.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://josiahdalisay.com",
  email: "hello@josiahdalisay.com",
  intro:
    "Hi, I'm Josiah. I bring your marketing and tech together to help your business run smoothly and reach more customers. I can help with campaigns, CRMs, websites, and automations.",
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
