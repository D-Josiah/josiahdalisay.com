import Image from "next/image";
import { toolIconUrl, tools } from "@/content/tools";

/**
 * Infinite logo marquee.
 *
 * The track is two identical halves and the animation translates it by
 * -50%, so the loop point lands exactly where it started. For that to
 * look continuous each half must be at least as wide as the viewport —
 * otherwise the track runs out mid-scroll and leaves a blank stretch —
 * so the list repeats enough times to cover a wide display.
 */

const REPEATS_PER_HALF = 3;
/** Seconds per repeat, so more repeats scroll at the same apparent speed. */
const SECONDS_PER_REPEAT = 20;

const half = Array.from({ length: REPEATS_PER_HALF }, () => tools).flat();
const track = [...half, ...half];

export function ToolMarquee() {
  return (
    <section
      aria-label="Tools I use"
      className="overflow-hidden border-y-[1.5px] border-[#eee] bg-white py-5"
    >
      <p className="mb-5 text-center text-[11px] font-bold tracking-[2px] text-[#aaa] uppercase">
        Tools I Use
      </p>
      <div className="overflow-hidden">
        <ul
          className="animate-marquee flex w-max gap-10"
          style={{ animationDuration: `${REPEATS_PER_HALF * SECONDS_PER_REPEAT}s` }}
        >
          {track.map((tool, index) => {
            // Only the first pass through the list is announced; the rest
            // are visual duplicates.
            const decorative = index >= tools.length;
            return (
              <li key={`${tool.slug}-${index}`} className="flex items-center">
                <Image
                  src={toolIconUrl(tool)}
                  alt={decorative ? "" : tool.name}
                  aria-hidden={decorative}
                  width={24}
                  height={24}
                  unoptimized
                  className="h-6 w-auto"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
