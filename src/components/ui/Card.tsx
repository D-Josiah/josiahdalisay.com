import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Colour schemes shared by bento cards, process steps and category tiles. */
export const toneStyles = {
  teal: { surface: "bg-teal text-white", border: "border-teal", muted: "text-white/80" },
  orange: {
    surface: "bg-orange text-white",
    border: "border-orange",
    muted: "text-white/80",
  },
  purple: {
    surface: "bg-purple text-white",
    border: "border-purple",
    muted: "text-white/80",
  },
  ink: { surface: "bg-ink text-white", border: "border-ink", muted: "text-white/70" },
  yellow: { surface: "bg-yellow text-ink", border: "border-ink", muted: "text-ink/70" },
  cream: { surface: "bg-cream text-ink", border: "border-ink", muted: "text-[#555]" },
  white: { surface: "bg-white text-ink", border: "border-ink", muted: "text-[#555]" },
} as const;

export type Tone = keyof typeof toneStyles;

type CardProps = ComponentProps<"div"> & {
  tone?: Tone;
  /** Overrides just the border colour, leaving the surface as the tone's. */
  accentBorder?: Tone;
  /** Padding utility, so a caller can run roomier than the default. */
  padding?: string;
  children: ReactNode;
};

/** The prototype's bordered, hard-shadowed card, on a flat surface. */
export function Card({
  tone = "white",
  accentBorder,
  padding = "p-6",
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        "press-lift rounded-card relative overflow-hidden border-2",
        padding,
        toneStyles[tone].surface,
        accentBorder ? toneStyles[accentBorder].border : "border-ink",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
