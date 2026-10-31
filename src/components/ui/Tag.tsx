import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Pill used for project tags and the "Coming soon" marker. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "rounded-xl border border-black/15 px-2.5 py-[3px] text-[11px] font-semibold",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Larger outlined pill used for credentials and tech-stack lists. */
export function CredentialTag({ children }: { children: ReactNode }) {
  return (
    <span className="border-ink rounded-[20px] border-[1.5px] bg-white px-5 py-2.5 text-sm font-semibold">
      {children}
    </span>
  );
}
