import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import {
  getReadableBuildEntry,
  publishedBuildEntries,
  type BuildBlock,
} from "@/content/builds";
import { formatArticleDate } from "@/lib/format";
import { ogImageFor } from "@/lib/og";
import { articleSchema, breadcrumbSchema, faqSchema, jsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

/**
 * Only an entry with a body gets a page; everything else 404s.
 *
 * A listed-but-unwritten post rendered as an empty page would get crawled
 * as a thin one, which costs more than the missing article does — a
 * handful of near-empty URLs is how a small site teaches a search engine
 * to discount the rest of it. So the params cover every published entry
 * (Cache Components needs at least one), and `notFound()` below rejects
 * the ones with no prose yet.
 *
 * `dynamicParams = false` would normally close off unlisted slugs, but
 * Cache Components rejects that segment config; the same `notFound()`
 * handles them.
 */
export function generateStaticParams() {
  return publishedBuildEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getReadableBuildEntry(slug);
  if (!entry) return {};

  const description = entry.takeaway ?? entry.excerpt;

  return {
    title: entry.title,
    description,
    alternates: { canonical: `/builds/${slug}` },
    openGraph: {
      type: "article",
      title: entry.title,
      description,
      url: `/builds/${slug}`,
      publishedTime: entry.publishedAt,
      modifiedTime: entry.updatedAt ?? entry.publishedAt,
      images: ogImageFor(`/builds/${slug}`),
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description,
      images: ogImageFor(`/builds/${slug}`),
    },
  };
}

function Block({ block }: { block: BuildBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="font-display mt-10 mb-3 text-[clamp(22px,3vw,30px)] tracking-[-1px]">
          {block.text}
        </h2>
      );
    case "ul":
      return (
        <ul className="my-4 flex list-disc flex-col gap-2 pl-5 text-[15px] leading-relaxed text-[#444]">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "code":
      return (
        <pre className="border-ink my-5 overflow-x-auto rounded-xl border-2 bg-[#1a1a1a] p-4 text-[13px] leading-relaxed text-[#eaeaea]">
          <code>{block.code}</code>
        </pre>
      );
    case "p":
      return <p className="my-4 text-[15px] leading-relaxed text-[#444]">{block.text}</p>;
  }
}

export default async function BuildEntryPage({ params }: Props) {
  const { slug } = await params;
  const entry = getReadableBuildEntry(slug);
  if (!entry) notFound();

  const schemas = [
    articleSchema(entry),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Builds & Blogs", path: "/builds" },
    ]),
    ...(entry.faq?.length ? [faqSchema(entry.faq)] : []),
  ];

  return (
    <article className="mx-auto max-w-[760px] px-8 pt-12 pb-22">
      <script
        type="application/ld+json"
        // Trusted, locally built JSON; nothing here comes from user input.
        dangerouslySetInnerHTML={{ __html: jsonLd(...schemas) }}
      />

      {/* Visible breadcrumb as well as the markup: the schema earns the
          search result, the link earns the click back. */}
      <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-[#888]">
        <Link href="/builds" className="hover:text-ink underline decoration-dotted">
          Builds &amp; Blogs
        </Link>
      </nav>

      <header>
        <h1 className="font-display text-[clamp(30px,5vw,50px)] leading-[1.1] tracking-[-2px]">
          {entry.title}
        </h1>
        <time dateTime={entry.publishedAt} className="mt-3 block text-[13px] text-[#999]">
          {formatArticleDate(entry.publishedAt)}
        </time>

        {/* The conclusion, before the reasoning. Roughly half of what AI
            answer engines quote comes from the opening of a page, so the
            takeaway is the first prose a reader or a crawler meets. */}
        {entry.takeaway ? (
          <p className="border-orange mt-6 border-l-4 pl-4 text-[17px] leading-relaxed font-medium text-[#222]">
            {entry.takeaway}
          </p>
        ) : null}
      </header>

      <div className="mt-4">
        {entry.body.map((block, index) => (
          <Block key={index} block={block} />
        ))}
      </div>

      {entry.faq?.length ? (
        <section className="mt-14">
          <h2 className="font-display mb-5 text-[clamp(22px,3vw,30px)] tracking-[-1px]">
            Questions
          </h2>
          <div className="flex flex-col gap-4">
            {entry.faq.map((item) => (
              <Card key={item.question}>
                <h3 className="text-base font-bold">{item.question}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-[#555]">
                  {item.answer}
                </p>
              </Card>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
