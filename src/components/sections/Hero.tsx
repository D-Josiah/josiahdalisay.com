import Image from "next/image";
import { CanvasTexture } from "@/components/decor/CanvasTexture";
import { PaintPanel } from "@/components/decor/PaintPanel";
import { DoodleBackdrop } from "@/components/decor/DoodleBackdrop";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/content/site";

/**
 * Dried orange paint on white canvas.
 *
 * Three stacked layers, bottom up: the bare canvas ground, a block of
 * paint with a ragged brushed edge, then the weave laid back over the
 * top. The weave goes last because real canvas shows through pigment —
 * that is what keeps the paint sitting on the ground rather than
 * floating above it.
 */
export function Hero() {
  return (
    <section className="bg-cream relative overflow-hidden px-8 pt-16 pb-14 text-center">
      <PaintPanel />
      <DoodleBackdrop tone="onColor" density="sparse" />
      <CanvasTexture />

      <div className="relative z-10 mx-auto max-w-[900px] px-4 py-6">
        {/* Each clause is its own block, so a narrow screen wraps inside a
            clause instead of orphaning a word onto a third line. */}
        <h1 className="font-display mx-auto mb-6 max-w-[14ch] text-[clamp(34px,7vw,76px)] leading-[1.08] tracking-[-2px] text-balance text-white sm:max-w-none">
          <span className="block">Your go-to for</span>
          <span className="block">
            <span className="text-yellow">tech</span> and{" "}
            <span className="text-ink">marketing.</span>
          </span>
        </h1>

        <div className="mb-7 flex flex-wrap items-center justify-center gap-5">
          <Image
            src="/josiah.jpg"
            alt={site.name}
            width={80}
            height={80}
            priority
            className="size-20 rounded-full border-2 border-white object-cover"
          />
          {/* Centred while the portrait sits above it; left-aligned once the
              two sit side by side. */}
          <p className="max-w-[400px] text-center text-[15px] leading-relaxed text-white sm:text-left">
            {site.intro}
          </p>
        </div>

        <div className="mb-4 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/#contact">Reach Out</ButtonLink>
          <ButtonLink href="/#projects" variant="secondary">
            See my work
          </ButtonLink>
        </div>

        <ul className="mt-2.5 flex flex-wrap justify-center gap-2">
          {site.credentials.map((credential) => (
            <li
              key={credential}
              className="rounded-[20px] bg-white/18 px-4 py-2 text-[13px] font-semibold text-white"
            >
              {credential}
            </li>
          ))}
        </ul>

        {/* Most of the people reading this are in another country. The one
            thing they need answered before anything else is whether the
            hours work, so it sits above the fold rather than on a page
            they would have to go looking for. */}
        <p className="mt-5 text-[13px] text-white/75">{site.availability}</p>
      </div>
    </section>
  );
}
