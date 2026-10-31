/** Logos for the "Tools I Use" marquee. Served by simpleicons' CDN. */
export type Tool = { name: string; slug: string; hex: string };

export const tools: readonly Tool[] = [
  { name: "React", slug: "react", hex: "61DAFB" },
  { name: "Next.js", slug: "nextdotjs", hex: "000000" },
  { name: "WordPress", slug: "wordpress", hex: "21759B" },
  { name: "HubSpot", slug: "hubspot", hex: "FF7A59" },
  { name: "Supabase", slug: "supabase", hex: "3FCF8E" },
  { name: "Vercel", slug: "vercel", hex: "000000" },
  { name: "Zapier", slug: "zapier", hex: "FF4A00" },
  { name: "Google Ads", slug: "googleads", hex: "4285F4" },
  { name: "Meta", slug: "meta", hex: "0081FB" },
  { name: "Figma", slug: "figma", hex: "F24E1E" },
  { name: "TypeScript", slug: "typescript", hex: "3178C6" },
  { name: "Google Analytics", slug: "googleanalytics", hex: "E37400" },
] as const;

export const toolIconUrl = (tool: Tool) =>
  `https://cdn.simpleicons.org/${tool.slug}/${tool.hex}`;
