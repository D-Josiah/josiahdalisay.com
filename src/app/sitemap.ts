import type { MetadataRoute } from "next";
import { readableBuildEntries } from "@/content/builds";
import { site } from "@/content/site";

const staticRoutes = ["", "/tech", "/marketing", "/builds"] as const;

/* Build time doubles as the last-modified stamp for these static routes. */
const buildTime = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified: buildTime,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    /**
     * Articles carry their own dates rather than the build stamp. A page
     * whose lastModified moves on every deploy teaches a crawler that the
     * date means nothing, which costs the one signal that would otherwise
     * get a genuinely updated post re-read promptly.
     */
    ...readableBuildEntries.map((entry) => ({
      url: `${site.url}/builds/${entry.slug}`,
      lastModified: new Date(entry.updatedAt ?? entry.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
