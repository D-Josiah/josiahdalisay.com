import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

const base =
  "press inline-block cursor-pointer rounded-[10px] border-2 border-ink px-7 py-3.5 text-[15px] font-bold no-underline";

const variants = {
  primary: "bg-yellow text-ink press-md",
  secondary: "bg-white text-ink press-md",
  invert: "bg-ink text-white press-md",
} as const;

export type ButtonVariant = keyof typeof variants;

type OwnProps = {
  variant?: ButtonVariant;
  /** Repaints the hard shadow white, for use on the ink panels. */
  onDark?: boolean;
  className?: string;
  children: ReactNode;
};

/** Anchor-flavoured button: renders a next/link for internal navigation. */
export function ButtonLink({
  variant = "primary",
  onDark = false,
  className,
  href,
  children,
  ...rest
}: OwnProps & ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], onDark && "press-light", className)}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  onDark = false,
  className,
  children,
  ...rest
}: OwnProps & ComponentProps<"button">) {
  return (
    <button
      className={cn(
        base,
        variants[variant],
        onDark && "press-light",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
