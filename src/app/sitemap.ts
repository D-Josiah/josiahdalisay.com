import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const routes = ["", "/tech", "/marketing", "/builds"] as const;

/* Build time doubles as the last-modified stamp for these static routes. */
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
