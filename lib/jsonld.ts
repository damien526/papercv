/**
 * Structured data for the site.
 *
 * ⚠ THE RULE THIS FILE EXISTS FOR — JSON-LD is read one page at a time. An
 * `@id` declared elsewhere does not exist: a page that writes
 * `publisher: { '@id': '…/#org' }` without declaring the `#org` node in the
 * same document produces a dangling reference, which engines drop in silence.
 * The `#website` / `#org` / `#person` base is therefore REPEATED ON EVERY
 * PAGE — that is what `siteGraph()` is for. Never "factor it out" to one page.
 *
 * What this replaced: markup on the home page and NOWHERE ELSE. /templates,
 * the four template pages, /ats-friendly-resume and
 * /free-resume-builder-no-sign-up shipped with no structured data at all, so
 * nothing tied them to the site or to each other.
 *
 * `@id` NAMING CONVENTION:
 *   · global entities → fragment on the root     `/#website`, `/#org`, `/#person`
 *   · per-page nodes  → fragment on the page URL `/templates/clean#page`
 */
import {
  CONTENT_REVIEWED_ON,
  PUBLISHER_EMAIL,
  PUBLISHER_LINKEDIN,
  PUBLISHER_NAME,
  SITE,
  absoluteUrl,
  ogImageUrl,
} from "./site";

export const WEBSITE_ID = `${absoluteUrl("/")}#website`;
export const ORG_ID = `${absoluteUrl("/")}#org`;
export const PERSON_ID = `${absoluteUrl("/")}#person`;
/** One application, one identifier, whichever page describes it. */
export const APP_ID = `${absoluteUrl("/")}#app`;

/** The page that names the publisher, as the law requires it to. */
const PUBLISHER_PAGE = absoluteUrl("/terms");

type Node = Record<string, unknown>;

const ref = (id: string) => ({ "@id": id });

const breadcrumbId = (url: string) => `${url}#breadcrumb`;

/**
 * The site, its publisher, and the person behind it. Three identical nodes on
 * every page: this is what lets an engine resolve the brand as one stable
 * entity rather than as a pile of unrelated pages.
 *
 * `sameAs` is declared on `Person` only, and carries one address: the
 * operator's LinkedIn profile, which exists. `Organization` has none — the
 * site has no company page, and a personal profile is not one. An invented
 * `sameAs` points at nothing and damages the entity instead of strengthening it.
 */
export function siteGraph(): Node[] {
  return [
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: absoluteUrl("/"),
      name: SITE.name,
      description: SITE.description,
      inLanguage: "en",
      publisher: ref(ORG_ID),
    },
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE.name,
      url: absoluteUrl("/"),
      email: PUBLISHER_EMAIL,
      // Reciprocal of `Person.worksFor` below: both directions are declared,
      // or the link only holds one way.
      founder: ref(PERSON_ID),
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/og/home.png"),
        width: 1200,
        height: 630,
      },
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: PUBLISHER_NAME,
      url: PUBLISHER_PAGE,
      email: PUBLISHER_EMAIL,
      sameAs: [PUBLISHER_LINKEDIN],
      worksFor: ref(ORG_ID),
    },
  ];
}

/**
 * What the tool does, for an engine. The list is capabilities that are real
 * and checkable in the app; it is not a sales pitch.
 */
const FEATURE_LIST = [
  "Four ATS-friendly resume templates",
  "PDF download with no account and no watermark",
  "Runs entirely in the browser: the resume is never uploaded",
  "Work saved in the browser between visits",
  "Accent colour, font size and spacing controls",
];

/** The application itself — ONE node for the whole site, with a stable `@id`. */
export function webApplication(): Node {
  return {
    "@type": "WebApplication",
    "@id": APP_ID,
    name: SITE.name,
    url: absoluteUrl("/builder"),
    description: SITE.description,
    screenshot: ogImageUrl(),
    image: ogImageUrl(),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript",
    inLanguage: "en",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: FEATURE_LIST,
    isPartOf: ref(WEBSITE_ID),
    publisher: ref(ORG_ID),
    author: ref(PERSON_ID),
  };
}

/**
 * The document itself — one node per page, and only one.
 *
 * The type stays `WebPage` even on pages that carry an FAQ. The two nodes are
 * deliberately separate: `FAQPage` is the markup Google stopped displaying in
 * 2023 and may stop reading, `WebPage` carries the durable signals.
 */
export function webPage({
  url,
  name,
  description,
  mainEntity,
  hasBreadcrumb,
}: {
  url: string;
  name: string;
  description: string;
  mainEntity?: string;
  hasBreadcrumb?: boolean;
}): Node {
  return {
    "@type": "WebPage",
    "@id": `${url}#page`,
    url,
    name,
    description,
    inLanguage: "en",
    dateModified: CONTENT_REVIEWED_ON,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: ogImageUrl(),
      width: 1200,
      height: 630,
    },
    isPartOf: ref(WEBSITE_ID),
    ...(mainEntity ? { mainEntity: ref(mainEntity) } : {}),
    ...(hasBreadcrumb ? { breadcrumb: ref(breadcrumbId(url)) } : {}),
    publisher: ref(ORG_ID),
  };
}

export function faqPage(url: string, items: readonly { q: string; a: string }[]): Node {
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    inLanguage: "en",
    isPartOf: ref(WEBSITE_ID),
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function howTo(
  url: string,
  name: string,
  steps: readonly { name: string; text: string }[],
): Node {
  return {
    "@type": "HowTo",
    "@id": `${url}#howto`,
    name,
    inLanguage: "en",
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function breadcrumb(url: string, trail: { name: string; url: string }[]): Node {
  return {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId(url),
    itemListElement: trail.map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step.name,
      item: step.url,
    })),
  };
}

export const HOME_CRUMB = { name: SITE.name, url: absoluteUrl("/") };
export const TEMPLATES_CRUMB = { name: "Templates", url: absoluteUrl("/templates") };

/* -------------------------------------------------------------------------- */
/*                          One graph per page shape                          */
/* -------------------------------------------------------------------------- */

/** Home: the base, the document, the application, the FAQ, the how-to. */
export function homeGraph({
  faq,
  steps,
}: {
  faq: readonly { q: string; a: string }[];
  steps: readonly { name: string; text: string }[];
}): Node[] {
  const url = absoluteUrl("/");
  return [
    ...siteGraph(),
    webPage({ url, name: SITE.title, description: SITE.description, mainEntity: APP_ID }),
    webApplication(),
    faqPage(url, faq),
    howTo(url, "How to make a resume with PaperCV", steps),
  ];
}

/**
 * The templates index: an `ItemList` of the four templates.
 *
 * `ItemList` rather than four loose nodes, because the page IS a list and
 * saying so lets an engine read the set as a set.
 */
export function templatesIndexGraph({
  description,
  templates,
}: {
  description: string;
  templates: readonly { id: string; name: string; tagline: string }[];
}): Node[] {
  const url = absoluteUrl("/templates");
  return [
    ...siteGraph(),
    webPage({ url, name: "Free ATS-friendly resume templates", description, hasBreadcrumb: true }),
    {
      "@type": "ItemList",
      "@id": `${url}#list`,
      name: "PaperCV resume templates",
      numberOfItems: templates.length,
      itemListElement: templates.map((t, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: t.name,
        description: t.tagline,
        url: absoluteUrl(`/templates/${t.id}`),
      })),
    },
    breadcrumb(url, [HOME_CRUMB, TEMPLATES_CRUMB]),
  ];
}

/** One template page: document, breadcrumb, and the base. */
export function templateGraph({
  id,
  name,
  tagline,
  description,
}: {
  id: string;
  name: string;
  tagline: string;
  description: string;
}): Node[] {
  const url = absoluteUrl(`/templates/${id}`);
  return [
    ...siteGraph(),
    webPage({ url, name: `The ${name} template`, description, hasBreadcrumb: true }),
    {
      "@type": "CreativeWork",
      "@id": `${url}#template`,
      name: `${name} resume template`,
      headline: tagline,
      description,
      url,
      inLanguage: "en",
      isAccessibleForFree: true,
      isPartOf: ref(WEBSITE_ID),
      creator: ref(PERSON_ID),
      publisher: ref(ORG_ID),
    },
    breadcrumb(url, [HOME_CRUMB, TEMPLATES_CRUMB, { name, url }]),
  ];
}

/** An editorial or policy page: document, breadcrumb, optional FAQ. */
export function contentPageGraph({
  path,
  name,
  description,
  crumb,
  faq,
}: {
  path: string;
  name: string;
  description: string;
  crumb: string;
  faq?: readonly { q: string; a: string }[];
}): Node[] {
  const url = absoluteUrl(path);
  return [
    ...siteGraph(),
    webPage({ url, name, description, hasBreadcrumb: true }),
    ...(faq && faq.length > 0 ? [faqPage(url, faq)] : []),
    breadcrumb(url, [HOME_CRUMB, { name: crumb, url }]),
  ];
}

/**
 * Wraps a page's nodes in a single `@graph` and returns the string to drop
 * into the `<script>`. One `@context`, one block: nodes can cite each other by
 * `@id` with nothing dangling.
 */
export function jsonLdGraph(nodes: Node[]): string {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(
    /</g,
    "\\u003c",
  );
}
