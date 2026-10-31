import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { CredentialTag } from "@/components/ui/Tag";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { ServiceDiscipline } from "@/content/services";

/** Shared body for /tech and /marketing — same layout, different content. */
export function DisciplinePage({ discipline }: { discipline: ServiceDiscipline }) {
  return (
    <>
      <section className="mx-auto max-w-[800px] px-8 pt-15 pb-10">
        <SectionHeader title={`${discipline.label} Services`} subtitle={discipline.blurb} />

        <ul className="mb-8 flex flex-wrap justify-center gap-2.5">
          {discipline.stack.map((item) => (
            <li key={item}>
              <CredentialTag>{item}</CredentialTag>
            </li>
          ))}
        </ul>

        <ul className="flex flex-col gap-4">
          {discipline.detail.map((item) => (
            <li key={item.title}>
              <Card accentBorder={discipline.accent}>
                <h3 className="text-base font-bold">{item.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#555]">
                  {item.description}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-8 pt-4 pb-22 text-center">
        <h2 className="font-display mb-3.5 text-[clamp(32px,5vw,48px)] tracking-[-2px]">
          {discipline.cta.heading}
        </h2>
        <p className="mx-auto mb-8 max-w-[480px] text-[17px] text-[#666]">
          {discipline.cta.body}
        </p>
        <ButtonLink href="/#contact">Reach Out</ButtonLink>
      </section>
    </>
  );
}
