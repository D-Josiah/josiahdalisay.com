import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { getReadableBuildEntry, sortedBuildEntries } from "@/content/builds";
import { formatArticleDate } from "@/lib/format";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Builds & Blogs",
  description:
    "Build logs and lessons from the field by Josiah Dalisay: HubSpot integrations, automation patterns and marketing ops, written up in full.",
  alternates: { canonical: "/builds" },
};

export default function BuildsPage() {
  return (
    <section className="mx-auto max-w-[800px] px-8 pt-15 pb-22">
      <script
        type="application/ld+json"
        // Trusted, locally built JSON; nothing here comes from user input.
        dangerouslySetInnerHTML={{
          __html: jsonLd(breadcrumbSchema([{ name: "Home", path: "/" }])),
        }}
      />

      <SectionHeader
        title="Builds & Blogs"
        subtitle="Technical write-ups and lessons from the field."
      />

      <ul className="flex flex-col gap-4">
        {sortedBuildEntries.map((entry) => {
          const comingSoon = entry.status === "coming-soon";
          /* Only an entry with a body has a page to link to; the rest stay
             as plain cards rather than links into a 404. */
          const readable = getReadableBuildEntry(entry.slug);

          const inner = (
            <Card>
              <div className="flex flex-wrap items-center gap-2">
                <Tag
                  className={
                    comingSoon
                      ? "border-0 bg-[#ccc] text-[#666]"
                      : "bg-teal border-0 text-white"
                  }
                >
                  {comingSoon ? "Coming Soon" : "Build"}
                </Tag>
                {entry.publishedAt ? (
                  <time dateTime={entry.publishedAt} className="text-xs text-[#999]">
                    {formatArticleDate(entry.publishedAt)}
                  </time>
                ) : null}
              </div>

              <h2 className="mt-2 text-base font-bold">{entry.title}</h2>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[#555]">
                {entry.excerpt}
              </p>
              {readable ? (
                <p className="text-teal mt-2.5 text-[13px] font-semibold">
                  Read the write-up ↗
                </p>
              ) : null}
            </Card>
          );

          return (
            <li key={entry.slug}>
              {readable ? (
                <Link href={`/builds/${entry.slug}`} className="block">
                  {inner}
                </Link>
              ) : (
                inner
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
