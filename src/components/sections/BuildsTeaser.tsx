import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { buildCategories } from "@/content/builds";

export function BuildsTeaser() {
  return (
    <section className="mx-auto max-w-[900px] px-8 py-18">
      <SectionHeader
        title="Builds & Blogs"
        subtitle="I build things. Then I write about how I built them."
      />

      <ul className="grid gap-5 sm:grid-cols-2">
        {buildCategories.map((category) => (
          <li key={category.title} className="flex">
            <Link href="/builds" className="w-full no-underline">
              <Card tone={category.tone} className="h-full">
                <span aria-hidden className="mb-3 block text-[32px]">
                  {category.emoji}
                </span>
                <h3 className="text-base font-bold">{category.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#555]">
                  {category.description}
                </p>
              </Card>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-7 text-center">
        <ButtonLink href="/builds">Read the Build Log →</ButtonLink>
      </div>
    </section>
  );
}
