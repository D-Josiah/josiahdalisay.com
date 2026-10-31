import { cn } from "@/lib/cn";

/**
 * Stretched artist's canvas: the woven threads plus the tooth of the
 * fabric.
 *
 * Laid over everything in a section, including any paint, because real
 * canvas weave shows through the pigment sitting on it. That is what ties
 * a painted shape to its ground instead of leaving it floating.
 *
 * Pure CSS and inert. The threads are soft bumps rather than hard lines:
 * a 1px band at this pitch reads as a screen door, a gradient reads as
 * fibre.
 */

/** Fine, high-frequency noise for the fabric's tooth. */
const tooth =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='t'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23t)'/%3E%3C/svg%3E\")";

/** One thread: a shadowed valley easing into a lit crest. */
const thread = (angle: number, pitch: number) =>
  `repeating-linear-gradient(${angle}deg,` +
  ` rgba(0,0,0,.5) 0px,` +
  ` rgba(0,0,0,0) ${(pitch * 0.35).toFixed(2)}px,` +
  ` rgba(255,255,255,.45) ${(pitch * 0.62).toFixed(2)}px,` +
  ` rgba(255,255,255,0) ${pitch}px)`;

export function CanvasTexture({
  /** Thread spacing in px. Smaller reads as finer linen. */
  pitch = 5,
  weave = 0.18,
  grain = 0.3,
  className,
}: {
  pitch?: number;
  weave?: number;
  grain?: number;
  className?: string;
}) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      {/* The weave, warp over weft. Offset by half a pitch so the threads
          interlock instead of crossing cleanly. */}
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          opacity: weave,
          backgroundImage: `${thread(90, pitch)}, ${thread(0, pitch)}`,
          backgroundPosition: `0 0, ${pitch / 2}px ${pitch / 2}px`,
        }}
      />
      {/* The tooth. Soft-light keeps the ground's brightness. */}
      <div
        className="absolute inset-0 mix-blend-soft-light"
        style={{ opacity: grain, backgroundImage: tooth }}
      />
    </div>
  );
}
