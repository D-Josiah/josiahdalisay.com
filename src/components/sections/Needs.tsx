import Link from "next/link";
import { Card, toneStyles } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { needs } from "@/content/needs";

/**
 * "What can I help you with?" — the services grid, phrased as the problem
 * the visitor arrived with rather than a list of what's on offer.
 */
export function Needs() {
  return (
    <section id="services" className="mx-auto max-w-[1100px] px-8 py-18">
      <SectionHeader title="What can I help you with?" />

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {needs.map((need) => {
          const tone = toneStyles[need.tone];
          return (
            <li key={need.slug} className="flex">
              <Link href={need.href} className="group block w-full no-underline">
                <Card tone={need.tone} className="flex h-full flex-col">
                  <h3 className="text-[17px] leading-snug font-bold">{need.title}</h3>
                  <p className={`mt-2 text-[13px] leading-relaxed ${tone.muted}`}>
                    {need.description}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {need.examples.map((example) => (
                      <li
                        key={example}
                        className={`rounded-xl px-2.5 py-[3px] text-[11px] font-semibold ${
                          need.tone === "yellow"
                            ? "bg-ink/10 text-ink"
                            : "bg-white/20 text-white"
                        }`}
                      >
                        {example}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-5 text-xs font-bold opacity-80 group-hover:opacity-100">
                    That&rsquo;s me →
                  </span>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
