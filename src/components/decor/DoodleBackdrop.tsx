import type { ComponentType } from "react";
import { cn } from "@/lib/cn";
import {
  BarGraph,
  Braces,
  Caret,
  ChatBubble,
  CodeTag,
  DeskPlant,
  DotArc,
  DottedBlob,
  Flick,
  GitBranch,
  Headphones,
  Laptop,
  Mug,
  Rings,
  Spark,
  Sparkle,
  StickyNote,
  Terminal,
  Wifi,
} from "./doodles";

/**
 * Decorative scatter of hand-drawn doodles behind a section, modelled on
 * the album-art reference: white marks over flat colour, drawn here from
 * a code / Claude / work-from-home vocabulary.
 *
 * Positions are authored rather than random so the server and client
 * render identically and the composition stays balanced around the
 * section's own content, which sits in the middle column.
 */

type Placement = {
  Doodle: ComponentType;
  /** Percentage offsets within the backdrop box. */
  left: number;
  top: number;
  /** Rendered width in px at the widest breakpoint. */
  size: number;
  rotate?: number;
  /** Hidden below `md` to keep small screens uncluttered. */
  desktopOnly?: boolean;
  /** Kept at `sparse` density. Six marks, well out in the gutters. */
  core?: boolean;
};

/**
 * Left gutter, right gutter, then filler that only appears on wide screens.
 * The six `core` marks carry the motif on their own; the rest are filler
 * for sections that can afford a denser field.
 */
const layout: readonly Placement[] = [
  { Doodle: CodeTag, left: 5, top: 12, size: 96, rotate: -10, core: true },
  {
    Doodle: Terminal,
    left: 13,
    top: 40,
    size: 80,
    rotate: 6,
    desktopOnly: true,
    core: true,
  },
  { Doodle: Mug, left: 3, top: 68, size: 70, rotate: -6, core: true },
  { Doodle: GitBranch, left: 19, top: 8, size: 58, rotate: 0, desktopOnly: true },
  { Doodle: Flick, left: 10, top: 26, size: 60, rotate: -8, desktopOnly: true },
  { Doodle: DeskPlant, left: 22, top: 80, size: 68, rotate: 4, desktopOnly: true },
  { Doodle: BarGraph, left: 85, top: 16, size: 82, rotate: 6, core: true },
  {
    Doodle: Laptop,
    left: 90,
    top: 46,
    size: 94,
    rotate: -8,
    core: true,
    desktopOnly: true,
  },
  {
    Doodle: ChatBubble,
    left: 76,
    top: 76,
    size: 86,
    rotate: 6,
    desktopOnly: true,
    core: true,
  },
  { Doodle: Braces, left: 80, top: 32, size: 56, rotate: 0, desktopOnly: true },
  { Doodle: DotArc, left: 95, top: 72, size: 56, rotate: 180, desktopOnly: true },
  { Doodle: Headphones, left: 70, top: 8, size: 58, rotate: -10, desktopOnly: true },
  { Doodle: Sparkle, left: 83, top: 90, size: 54, rotate: 12, desktopOnly: true },
  { Doodle: Wifi, left: 30, top: 6, size: 52, desktopOnly: true },
  { Doodle: StickyNote, left: 7, top: 52, size: 54, rotate: 10, desktopOnly: true },
  { Doodle: Spark, left: 72, top: 92, size: 42, desktopOnly: true },
  { Doodle: Caret, left: 27, top: 90, size: 40, rotate: -6, desktopOnly: true },
  { Doodle: DottedBlob, left: 88, top: 90, size: 96, rotate: 4, desktopOnly: true },
  { Doodle: Rings, left: 16, top: 94, size: 40, desktopOnly: true },
];

const tones = {
  /** White doodles on a saturated panel — the reference treatment. */
  onColor: "text-ink [--doodle-fill:#ffffff] opacity-95",
  /** Outlined doodles on the cream page background. */
  onCream: "text-ink [--doodle-fill:#ffffff] opacity-55",
  /** Warm doodles on the dark band. */
  onInk: "text-yellow [--doodle-fill:transparent] opacity-35",
  /** White marks on near-black, for the dark hero. */
  onDark: "text-white [--doodle-fill:rgba(255,255,255,.08)] opacity-65",
} as const;

export type DoodleTone = keyof typeof tones;

/** `sparse` keeps only the core marks — use it behind headline copy. */
export type DoodleDensity = "sparse" | "full";

export function DoodleBackdrop({
  tone = "onColor",
  density = "full",
  className,
}: {
  tone?: DoodleTone;
  density?: DoodleDensity;
  className?: string;
}) {
  const placements = density === "sparse" ? layout.filter((item) => item.core) : layout;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden select-none",
        tones[tone],
        className,
      )}
    >
      {placements.map(({ Doodle, left, top, size, rotate = 0, desktopOnly }, index) => (
        <span
          key={index}
          className={cn(
            "absolute block [&>svg]:size-full",
            desktopOnly && "hidden md:block",
          )}
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: `clamp(${Math.round(size * 0.5)}px, ${(size / 13).toFixed(1)}vw, ${size}px)`,
            aspectRatio: "1",
            transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
          }}
        >
          <Doodle />
        </span>
      ))}
    </div>
  );
}
