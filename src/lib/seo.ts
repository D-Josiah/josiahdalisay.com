import type { BuildFaq, ReadableBuildEntry } from "@/content/builds";
import { disciplines, type ServiceDiscipline } from "@/content/services";
import { site } from "@/content/site";

/**
 * Stable `@id`s for the entities this site describes.
 *
 * Every schema node is addressed rather than repeated. A search engine
 * reading `author: { @id: …#person }` on an article and `@id: …#person`
 * on the Person in the root layout learns they are the same entity; two
 * separate inline Person objects, however identical, read as two people
 * and split the signals that are supposed to accumulate on one.
 */
const id = {
  person: `${site.url}/#person`,
  practice: `${site.url}/#practice`,
  website: `${site.url}/#website`,
  service: (key: ServiceDiscipline["key"]) => `${site.url}/${key}#service`,
} as const;

/** A bare reference to an entity defined elsewhere in the graph. */
const ref = (value: string) => ({ "@id": value });

/**
 * schema.org Person markup.
 *
 * A meta description does not affect ranking — it only controls the
 * snippet. What actually helps a name query resolve to this site is
 * entity data: telling search engines who the page is about, and which
 * other profiles are the same person, so the signals consolidate instead
 * of competing.
 */
function personNode() {
  const skills = disciplines.flatMap((d) => d.detail.map((item) => item.title));

  return {
    "@type": "Person",
    "@id": id.person,
    name: site.name,
    url: site.url,
    image: `${site.url}/josiah.jpg`,
    description: site.description,
    jobTitle: "Developer and Marketer",
    email: `mailto:${site.email}`,
    knowsAbout: skills,
    knowsLanguage: "en",
    // Omitted entirely when empty: an empty sameAs is worse than none.
    ...(site.profiles.length > 0 ? { sameAs: [...site.profiles] } : {}),
  };
}

/**
 * The practice: what is actually being bought, as distinct from the
 * person doing it.
 *
 * `ProfessionalService` rather than `LocalBusiness`, and with no address
 * or geo: the clients are in other countries, and the honest machine-
 * readable statement is "serves these markets", not "is located here".
 * `areaServed` is the field a search engine reads to decide whether this
 * site is a plausible result for a buyer in the US or the UK, so leaving
 * it out is what makes a site look local by default.
 */
function practiceNode() {
  return {
    "@type": "ProfessionalService",
    "@id": id.practice,
    name: site.name,
    url: site.url,
    image: `${site.url}/josiah.jpg`,
    // The availability line rides along in the description because
    // schema.org has no timezone or remote-work property: an engine
    // summarising this entity will quote the description, so the answer
    // to "can you work my hours" needs to be inside it.
    description: `${site.description} ${site.availability}`,
    slogan: site.tagline,
    email: `mailto:${site.email}`,
    founder: ref(id.person),
    employee: ref(id.person),
    areaServed: site.areaServed.map((code) => ({
      "@type": "Country",
      identifier: code,
    })),
    availableLanguage: { "@type": "Language", name: "English", alternateName: "en" },
    serviceType: disciplines.flatMap((d) => [...d.items]),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: disciplines.map((d) => ref(id.service(d.key))),
    },
  };
}

/** One discipline as a purchasable service, linked from the catalog. */
function serviceNode(discipline: ServiceDiscipline) {
  return {
    "@type": "Service",
    "@id": id.service(discipline.key),
    name: `${discipline.label} Services`,
    url: `${site.url}${discipline.href}`,
    description: discipline.metaDescription,
    provider: ref(id.practice),
    areaServed: site.areaServed.map((code) => ({
      "@type": "Country",
      identifier: code,
    })),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${site.url}/#contact`,
      availableLanguage: { "@type": "Language", name: "English" },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${discipline.label} work`,
      itemListElement: discipline.detail.map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item.title,
          description: item.description,
        },
      })),
    },
  };
}

/** Marks the site itself as the person's, and names it for sitelinks. */
function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": id.website,
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: "en",
    author: ref(id.person),
    publisher: ref(id.practice),
  };
}

/**
 * The whole graph, emitted once from the root layout.
 *
 * A single `@graph` beats several sibling scripts: the nodes can
 * cross-reference by `@id`, and an engine parses one connected
 * description instead of guessing how unrelated blobs relate.
 */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personNode(),
      practiceNode(),
      ...disciplines.map(serviceNode),
      websiteNode(),
    ],
  };
}

/**
 * Trail of ancestors for a sub-page, root first, excluding the page
 * itself — Google renders the current page from the URL, and listing it
 * twice is what produces a duplicated last crumb.
 */
export function breadcrumbSchema(trail: readonly { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

/**
 * FAQPage markup.
 *
 * Of the structured data types available here this is the one with a
 * measurable effect on whether an answer engine quotes a page, and the
 * effect depends on each answer being complete on its own. Schema alone
 * earns nothing — it makes an already-extractable answer easier to lift.
 */
export function faqSchema(items: readonly BuildFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** A build log as an Article, authored by the Person already in the graph. */
export function articleSchema(entry: ReadableBuildEntry) {
  const url = `${site.url}/builds/${entry.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${url}#article`,
    headline: entry.title,
    description: entry.takeaway ?? entry.excerpt,
    url,
    mainEntityOfPage: url,
    datePublished: entry.publishedAt,
    dateModified: entry.updatedAt ?? entry.publishedAt,
    inLanguage: "en",
    author: ref(id.person),
    publisher: ref(id.practice),
    isPartOf: ref(id.website),
  };
}

/** Serialises one or more schema objects for a single inline script. */
export function jsonLd(...nodes: readonly object[]) {
  return JSON.stringify(nodes.length === 1 ? nodes[0] : nodes);
}
