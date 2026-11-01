/**
 * Article date formatting.
 *
 * Fixed to `en-GB` rather than `en-AU`, and read out as "14 Aug 2026":
 * day-month-year with a named month is the one layout that cannot be
 * misread in any of the three markets this site sells into, whereas
 * 14/08/2026 and 08/14/2026 mean different things on either side of the
 * Atlantic. The locale tag is an implementation detail of getting that
 * shape — nothing on the page claims a country.
 */
const articleDate = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export const formatArticleDate = (iso: string) => articleDate.format(new Date(iso));
