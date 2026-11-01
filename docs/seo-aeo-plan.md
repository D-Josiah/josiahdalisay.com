# SEO & AEO plan — josiahdalisay.com

**Goal:** inbound enquiries from US, AU and UK businesses. Not local walk-ins.
**Positioning decision:** location-neutral. No city or country stated anywhere on
the site. Framed as remote, working across US/UK/AU timezones.
**Market priority:** all three equally — one global English site, no hreflang.

---

## Where the site stands today

Already in place (good foundation, don't redo):

- `metadataBase`, per-route canonicals, title template, OG + Twitter tags
- Explicit `robots` directives including `max-snippet: -1` and
  `max-image-preview: large` — these are what let Google show a full snippet
- `Person` + `WebSite` JSON-LD in the root layout
- `sitemap.xml` and `robots.txt` as route handlers
- `/office` excluded from crawling
- All four routes statically rendered — fast, which still matters

The real gaps, in order of how much they cost you:

| #   | Gap                                                                                                                              | Why it matters                                                                                                                          |
| --- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **No article pages.** `/builds` lists four titles and excerpts. There is no page to rank, and nothing for an AI engine to quote. | Four indexable pages total means near-zero query surface. This is the whole ballgame.                                                   |
| 2   | **`site.profiles` is empty**, so `sameAs` is omitted.                                                                            | Off-domain sources produce ~6.5× more AI citations than your own site. With no `sameAs`, nothing consolidates into one entity.          |
| 3   | **No OG images.**                                                                                                                | Every share into a US/UK Slack or LinkedIn renders as a bare grey card. Pure trust loss on the channel most likely to carry a referral. |
| 4   | **No service, FAQ, or breadcrumb schema.**                                                                                       | Service pages are unlabelled to machines; no question-shaped content for answer engines to lift.                                        |
| 5   | **No geo signals at all.** No `areaServed`, no timezone statement.                                                               | A US buyer has no way to tell whether you can work their hours.                                                                         |
| 6   | **AI crawler access unverified.** Vercel's AI-bots managed ruleset can 403 GPTBot/ClaudeBot regardless of robots.txt.            | If it's on, you are invisible to AI search no matter what else you do.                                                                  |
| 7   | **`en-AU` date formatting** on `/builds`.                                                                                        | Minor, but it's a local signal in a location-neutral site.                                                                              |

---

## Phase 1 — Technical foundation — **DONE**

Shipped and verified against a production build. None of it needed content from you.

1. **Entity graph.** Replace the two-schema setup with a linked graph: `Person`
   → `ProfessionalService` (with `areaServed: US, GB, AU` and
   `availableLanguage: en`) → `Service` per discipline → `WebSite`. Add
   `BreadcrumbList` on sub-pages and `Article` on build posts. Nodes reference
   each other by `@id` so engines read one entity, not five.

2. **`/builds/[slug]` article routes.** A real content model with body blocks,
   `generateStaticParams`, per-post metadata, `Article` schema, and an FAQ block
   per post. Routes only exist for posts that have a body — no thin pages get
   indexed. _Two posts need bodies written; that's Phase 2._

3. **Dynamic OG images** via `next/og` `ImageResponse` — site-wide default plus
   per-post, generated at build time, footed with `Remote · US · UK · AU`.
   No webfont is fetched, so a Google Fonts outage can't fail a deploy.

   > Worth knowing: Next resolves the `opengraph-image` file convention
   > against the *deployment* origin, not `metadataBase` — which produced
   > `http://localhost:3000/...` locally and would produce the `.vercel.app`
   > URL on a preview. `ogImageFor()` in `src/lib/og.tsx` pins every card to
   > the canonical host.

4. **robots.txt: explicit AI crawler allows** for `OAI-SearchBot`, `GPTBot`,
   `ChatGPT-User`, `ClaudeBot`, `Claude-SearchBot`, `PerplexityBot`,
   `Google-Extended`, `Bingbot`, `Applebot-Extended`, `CCBot`. A wildcard
   `Allow: /` already covers them, but named blocks are unambiguous and survive
   anyone later adding a disallow.

5. **`/llms.txt`.** A plain-text map of the site for AI agents. Google has said
   it does not use it and it won't move rankings — Chrome Lighthouse does check
   for it, and it costs nothing. Low priority, included because it's cheap.

6. **Location-neutral formatting.** Swap `en-AU` dates for a format that reads
   correctly in all three markets.

7. **Timezone availability signal** above the fold in the hero, in the practice
   schema description, and in `/llms.txt` — so a US or UK buyer gets an answer
   to "can this person work my hours" without asking. Single source:
   `site.availability`.

### Files touched

| File | What |
|---|---|
| `src/lib/seo.ts` | Rewritten as one `@graph` with `@id` cross-references; adds breadcrumb, FAQ and article schema |
| `src/lib/og.tsx` | New — shared OG card renderer and canonical-host image metadata |
| `src/lib/format.ts` | New — market-neutral date formatting |
| `src/content/site.ts` | Adds `areaServed` and `availability` |
| `src/content/builds.ts` | Article body/FAQ content model; `readableBuildEntries`, `publishedBuildEntries` |
| `src/app/builds/[slug]/` | New — article page and per-post OG card |
| `src/app/opengraph-image.tsx` | New — site-wide share card |
| `src/app/llms.txt/route.ts` | New |
| `src/app/robots.ts` | Named AI-crawler allow blocks, `host` |
| `src/app/sitemap.ts` | Article URLs with real dates |
| `src/app/layout.tsx` | Emits the graph; explicit OG images and `locale` |
| `src/app/{tech,marketing}/page.tsx`, `src/app/builds/page.tsx` | Breadcrumb schema; index links to articles |
| `src/components/sections/Hero.tsx` | Availability line |

### Verify after deploy (your side, 10 minutes)

- Vercel → Firewall → confirm the **AI bots managed ruleset is not denying**
  traffic. Then Observability → CDN Requests → confirm `GPTBot`,
  `OAI-SearchBot`, `ClaudeBot`, `PerplexityBot` are getting `200`s, not
  `403`/`429`. A 403 is always the firewall, never robots.txt.
- Google Rich Results Test on `/`, `/tech`, `/builds/<slug>`.
- Paste a URL into Slack and LinkedIn; confirm the OG card renders.

---

## Phase 2 — Content

This is where the actual ranking comes from, and it's the part I can't do for
you: it requires facts about work you did.

### 2a. Write the two published build logs

`hubspot-xero-integration` and `sales-team-allocation` are live on the index with
no article behind them. Each wants roughly 1,200–1,800 words:

- **The problem**, in the client's words, with a number in it
- **What you tried that didn't work** — this is the part that gets cited,
  because nobody else writes it
- **The architecture**, with a diagram or code
- **The outcome**, quantified
- **An FAQ block** of 4–6 real questions, each answer self-contained in 2–3
  sentences

> Answer-first structure matters: analysis of Google AI Overview citations found
> ~55% came from the first 30% of the source page. Lead with the answer, then
> explain. Never bury the conclusion.

### 2b. Target the queries foreign buyers actually type

Your current pages say "HubSpot integrations". Nobody searches that. They search:

- `sync hubspot and xero invoices automatically`
- `hubspot round robin lead assignment not working`
- `hubspot to xero integration cost`
- `hire hubspot developer remote`
- `calendly hubspot webhook workflow`

One page per question cluster, each answering in the first paragraph. Three or
four of these beat twenty thin pages.

### 2c. An FAQ page

Highest-leverage single page for AEO. FAQ sections correlate with higher AI
citation rates, and `FAQPage` schema adds a boost when each answer stands alone.
Write for the cross-border objection set:

- How do you work with clients in different timezones?
- What hours do you overlap with US Eastern / UK / AEST?
- How do you handle contracts and payment across borders?
- What's your rate, and in what currency?
- How do we communicate — Slack, email, calls?
- What happens if something breaks at 2am my time?

Answer these honestly and specifically. Vague answers get skipped by both buyers
and answer engines.

### 2d. Case studies with numbers

`LSAT Academy` is your strongest asset and currently gets one sentence. A real
case study — before, what you built, after, with figures — is what a US buyer
sends to their boss to justify hiring you.

---

## Phase 3 — Off-site (the biggest AEO lever)

**~85% of brand mentions in AI answers come from external domains.** You cannot
win AEO from your own site alone. This phase matters more than Phase 1.

1. **Fill `site.profiles`** so `sameAs` can emit. Send me the URLs for:
   LinkedIn, GitHub, HubSpot Partner/Solutions directory listing, X, dev.to,
   Upwork/Clutch if you use them.

2. **Get listed where buyers and AI crawlers both look:**
   - HubSpot Solutions Directory — highest-intent listing available to you, and
     it's a `.hubspot.com` domain, which carries weight
   - GitHub profile README that actually describes the services
   - LinkedIn with a headline matching the queries above, not a job title

3. **Earn third-party mentions.** Ranked by effort-to-return:
   - Answer HubSpot Community threads properly, with a link to the build log
   - `r/hubspot`, `r/marketingops`, `r/nocode` — answer, don't promote
   - Cross-post build logs to dev.to and Hashnode with canonical back to you
   - One guest post on a marketing-ops publication beats ten directory links

4. **Reviews.** Two or three detailed reviews on Clutch or G2 from existing
   clients, naming what you built. Review content is heavily cited by AI answers
   for "is X any good" queries.

---

## Phase 4 — Measurement

| Tool                       | What for                                                                                  | Note                                                                 |
| -------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Google Search Console      | Country-filtered to US, GB, AU separately                                                 | Set up first. Unfiltered data will hide which market is moving.      |
| Bing Webmaster Tools       | Powers ChatGPT search and Copilot                                                         | Commonly skipped; cheap and directly relevant to AEO.                |
| Analytics referrer segment | `chatgpt.com`, `perplexity.ai`, `claude.ai`, `copilot.microsoft.com`                      | Your only direct read on AI-driven traffic.                          |
| Manual prompt checks       | Ask each engine your target questions monthly                                             | Log whether you're cited and what it says. The only real AEO metric. |
| HubSpot AEO tools          | You're HubSpot certified — its AEO prompt tracking and metrics are built for exactly this | Worth switching on since you already have access.                    |

**Don't expect movement before week 6–8.** New pages on a site with one commit
of history take time. If nothing moves by week 10, the problem is content depth,
not technical setup.

---

## Honest assessment

Phase 1 is a day's work and removes every technical blocker. It will not, by
itself, bring you a single US client — a technically perfect four-page site has
nothing to rank.

Phases 2 and 3 are what actually work, and both need things only you have:
details of real projects, and real client relationships. The two unwritten build
logs are the highest-value items on this entire list.
