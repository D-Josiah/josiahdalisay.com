import Link from "next/link";
import { Card, toneStyles } from "@/components/ui/Card";
import { LiveBadge } from "@/components/ui/LiveBadge";
import { MockBrowser } from "@/components/ui/MockBrowser";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { ButtonLink } from "@/components/ui/Button";
import { PeekBug } from "@/components/mascot/PeekBug";
import { projects } from "@/content/projects";

/** Bento grid of shipped work; the first card spans two columns. */
export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-[1100px] scroll-mt-24 px-8 py-18">
      <SectionHeader title="Projects" adornment={<PeekBug className="w-15 shrink-0" />} />

      <ul className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-4">
        {projects.map((project) => {
          const tone = toneStyles[project.tone];
          return (
            <li
              key={project.slug}
              className={project.featured ? "min-[480px]:col-span-2" : undefined}
            >
              <Card tone={project.tone} className="h-full">
                <div className="flex items-start justify-between gap-2">
                  <ul className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <li key={tag}>
                        <Tag
                          className={
                            project.tone === "ink"
                              ? "border-0 bg-white/10 text-white/80"
                              : "border-0 bg-white/20 text-white"
                          }
                        >
                          {tag}
                        </Tag>
                      </li>
                    ))}
                  </ul>
                  {project.live ? <LiveBadge /> : null}
                </div>

                <h3 className="mt-2.5 text-base font-bold">{project.title}</h3>
                <p className={`mt-1.5 text-[13px] leading-relaxed ${tone.muted}`}>
                  {project.description}
                </p>

                {project.live ? (
                  <MockBrowser>
                    <a
                      href={project.live.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="press press-sm border-ink bg-yellow text-ink mt-2.5 inline-block rounded-md border-[1.5px] px-3.5 py-1.5 text-xs font-bold no-underline"
                    >
                      Visit Site ↗
                    </a>
                  </MockBrowser>
                ) : null}

                {project.link ? (
                  <Link
                    href={project.link.href}
                    className="press press-sm border-ink text-ink mt-3.5 inline-block rounded-md border-[1.5px] bg-white px-3.5 py-1.5 text-xs font-bold no-underline"
                  >
                    {project.link.label}
                  </Link>
                ) : null}
              </Card>
            </li>
          );
        })}
      </ul>

      <div className="mt-7 text-center">
        <ButtonLink href="/builds" variant="secondary">
          See More →
        </ButtonLink>
      </div>
    </section>
  );
}
