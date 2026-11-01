import { notFound } from "next/navigation";
import { getReadableBuildEntry, publishedBuildEntries } from "@/content/builds";
import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

/** Mirrors the page's params so each card is rendered once, at build time. */
export function generateStaticParams() {
  return publishedBuildEntries.map((entry) => ({ slug: entry.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getReadableBuildEntry(slug);
  if (!entry) notFound();

  return ogCard({ eyebrow: "Build Log", title: entry.title });
}
