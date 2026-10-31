import Link from "next/link";
import { footerNav, site } from "@/content/site";

/* Resolved once at build time. The footer is fully static, so reading the
   clock during render would make the whole page dynamic for one number. */
const copyrightYear = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="border-hairline border-t-[1.5px] bg-white px-8 py-9 text-center">
      <div className="mx-auto mb-5 flex max-w-[900px] flex-wrap items-start justify-between gap-8 border-b border-[#e8e8e8] pb-5">
        <div className="text-left">
          <div className="text-orange mb-2 text-2xl font-black">{site.initials}</div>
          <p className="max-w-[260px] text-sm leading-relaxed text-[#888]">
            {site.tagline}
          </p>
        </div>

        <div className="flex gap-10 text-left">
          {footerNav.map((group) => (
            <div key={group.heading}>
              <p className="mb-2.5 text-xs font-bold tracking-[1.5px] text-[#aaa] uppercase">
                {group.heading}
              </p>
              <ul className="flex flex-col gap-1.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-orange text-sm text-[#555] no-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[13px] text-[#bbb]">
        &copy; {copyrightYear} {site.name}. All rights reserved.
      </p>
    </footer>
  );
}
