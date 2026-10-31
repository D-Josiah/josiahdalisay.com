"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { navLinks, site } from "@/content/site";

/**
 * Sticky header. Client-side only for the mobile disclosure and the
 * active-route highlight; the markup itself is static.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  /** Anchor links point at a section, not a page, so they never highlight. */
  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-100 border-b-[1.5px] border-[#eee] bg-white/95 backdrop-blur-[8px]">
      <nav className="flex items-center justify-between px-8 py-4" aria-label="Main">
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className="press press-sm bg-orange flex size-10 items-center justify-center rounded-[10px] text-base font-black text-white"
        >
          {site.initials}
        </Link>

        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 md:flex">
            {navLinks
              .filter((link) => !link.cta)
              .map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "hover:text-orange text-sm font-medium no-underline",
                      isActive(link.href) ? "text-orange" : "text-ink",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
          </ul>

          {navLinks
            .filter((link) => link.cta)
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="press press-sm border-ink bg-yellow text-ink rounded-lg border-[1.5px] px-[18px] py-2 text-sm font-bold no-underline"
              >
                {link.label}
              </Link>
            ))}

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
            className="press press-sm border-ink flex size-9 items-center justify-center rounded-lg border-[1.5px] bg-white md:hidden"
          >
            <span aria-hidden className="text-base leading-none">
              {open ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </nav>

      {open ? (
        <ul id="mobile-nav" className="border-t border-[#eee] px-8 pb-4 md:hidden">
          {navLinks
            .filter((link) => !link.cta)
            .map((link) => (
              <li key={link.href} className="border-b border-[#f2f2f2] last:border-0">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-ink block py-3 text-sm font-medium no-underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
        </ul>
      ) : null}
    </header>
  );
}
