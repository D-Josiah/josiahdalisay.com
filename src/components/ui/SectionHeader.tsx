import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  title: ReactNode;
  subtitle?: ReactNode;
  /** Inverts text colours for use on the dark process band. */
  tone?: "light" | "dark";
  /** Rendered inline next to the title (the peeking mascot). */
  adornment?: ReactNode;
  className?: string;
};

export function SectionHeader({
  title,
  subtitle,
  tone = "light",
  adornment,
  className,
}: Props) {
  return (
    <div className={cn("mb-9 text-center", className)}>
      <h2
        className={cn(
          "font-display text-[clamp(28px,4vw,42px)] tracking-[-1.5px]",
          adornment ? "inline-flex items-center justify-center gap-3" : null,
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {title}
        {adornment}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-1.5 text-[15px]",
            tone === "dark" ? "text-white/50" : "text-[#888]",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
