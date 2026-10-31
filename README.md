# josiahdalisay.com

Personal site for Josiah Dalisay, built from the `context/josiah-gumroad-style.html`
prototype. The design is preserved as-is; the implementation is a conventional
Next.js App Router project.

## Stack

| Concern   | Choice                                                    |
| --------- | --------------------------------------------------------- |
| Framework | Next.js 16 (App Router, React 19)                         |
| Language  | TypeScript, strict                                        |
| Styling   | Tailwind CSS v4, tokens declared in `src/app/globals.css` |
| Fonts     | `next/font` — Playfair Display (display), Outfit (body)   |
| Forms     | Server Action + Zod validation, email via Resend          |
| Hosting   | Static prerender; deploys to Vercel unchanged             |

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in RESEND_API_KEY
npm run dev
```

| Script              | Does                                      |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | Dev server on http://localhost:3000       |
| `npm run build`     | Production build (prerenders every route) |
| `npm run typecheck` | `tsc --noEmit`                            |
| `npm run lint`      | ESLint                                    |
| `npm run format`    | Prettier, with Tailwind class sorting     |

## Layout

```
src/
├── app/                  Routes. One folder per page, plus robots/sitemap.
│   ├── page.tsx          Home — composes the sections below.
│   ├── tech/             ┐ both render <DisciplinePage>, differing only
│   ├── marketing/        ┘ in which content entry they pass in
│   ├── builds/           Builds & Blogs index
│   └── globals.css       Design tokens, keyframes, the `press-*` primitives
├── components/
│   ├── layout/           Header and footer (the shell in app/layout.tsx)
│   ├── sections/         One component per band of the home page
│   ├── ui/               Button, Card, Tag, SectionHeader, …
│   ├── decor/            DoodleBackdrop + the hand-drawn doodle vocabulary
│   ├── mascot/           The bug: shared geometry, faces, three poses
│   └── contact/          The contact form (client)
├── content/              All copy and data. Edit here, not in JSX.
└── lib/contact/          Schema, Server Action, rate limiter, mailer
```

### Editing the site

Almost every change is a content change:

- **Copy, projects, services, posts** — `src/content/*.ts`. Each file is a typed
  array; add or reorder entries and the pages follow.
- **Colours, shadows, fonts** — the `@theme` block in `src/app/globals.css`.
  Everything downstream reads those tokens, so a rebrand is one file.
- **The doodle backdrop** — `src/components/decor/doodles.tsx` holds the
  drawings; `DoodleBackdrop.tsx` holds where they sit. Positions are authored
  rather than random so server and client render identically.

### Design notes

The prototype's signature is an element lifted off the page with a hard offset
shadow that it presses into on hover. That lives in `globals.css` as
`.press-sm`, `.press-md`, `.press-lift` and `.press-lift-sm` rather than being
repeated per component.

All animation is CSS keyframes or declarative SVG `<animate>`, so the mascots
and the marquee cost no JavaScript and work in server components. A global
`prefers-reduced-motion` rule disables them.

### The contact form

`ContactForm` posts to the `submitContactForm` Server Action, so it still works
with JavaScript disabled. The action validates with Zod, drops submissions that
fill the honeypot field, rate-limits per IP, and sends through Resend. On
failure it echoes the submitted values back so nothing the user typed is lost.

The rate limiter is an in-process `Map`, which is per-instance. If the site ever
runs multi-region, swap `src/lib/contact/rate-limit.ts` for a shared store.

Without `RESEND_API_KEY` the form validates normally and then reports a generic
send failure, logging the cause server-side.
