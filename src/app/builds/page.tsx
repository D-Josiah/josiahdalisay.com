import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { sortedBuildEntries } from "@/content/builds";

export const metadata: Metadata = {
  title: "Builds & Blogs",
  description: "Technical write-ups and lessons from the field.",
  alternates: { canonical: "/builds" },
};

const dateFormat = new Intl.DateTimeFormat("en-AU", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export default function BuildsPage() {
  return (
    <section className="mx-auto max-w-[800px] px-8 pt-15 pb-22">
      <SectionHeader
        title="Builds & Blogs"
        subtitle="Technical write-ups and lessons from the field."
      />

      <ul className="flex flex-col gap-4">
        {sortedBuildEntries.map((entry) => {
          const comingSoon = entry.status === "coming-soon";
          return (
            <li key={entry.slug}>
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
                      {dateFormat.format(new Date(entry.publishedAt))}
                    </time>
                  ) : null}
                </div>

                <h2 className="mt-2 text-base font-bold">{entry.title}</h2>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#555]">
                  {entry.excerpt}
                </p>
              </Card>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
