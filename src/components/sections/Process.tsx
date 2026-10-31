import { CanvasTexture } from "@/components/decor/CanvasTexture";
import { DoodleBackdrop } from "@/components/decor/DoodleBackdrop";
import { PaintPanel } from "@/components/decor/PaintPanel";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card, toneStyles } from "@/components/ui/Card";
import { processSteps } from "@/content/process";

/**
 * Same build-up as the hero — canvas ground, a block of dried paint with
 * a ragged edge, then the weave laid back over the top — mixed in ink
 * rather than orange, so the page reads as two pigments on one canvas and
 * the coloured step cards still carry.
 */
export function Process() {
  return (
    <section className="bg-cream relative overflow-hidden px-8 py-14">
      <PaintPanel color="#1a1a1a" />
      <DoodleBackdrop tone="onDark" />
      <CanvasTexture />

      <div className="relative z-10 px-4 py-6 text-white">
        <SectionHeader
          tone="dark"
          title="How it works"
          subtitle="Simple. No confusion. No runaround."
        />

        <ol className="mx-auto grid max-w-[900px] gap-5 md:grid-cols-3">
          {processSteps.map((step) => {
            const tone = toneStyles[step.tone];
            return (
              <li key={step.step} className="flex">
                <Card tone={step.tone} padding="p-7" className="w-full text-center">
                  <div className="font-display mb-2 text-4xl">{step.step}</div>
                  <h3 className="mb-2 text-base font-bold">{step.title}</h3>
                  <p className={`text-[13px] leading-relaxed ${tone.muted}`}>
                    {step.description}
                  </p>
                </Card>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
