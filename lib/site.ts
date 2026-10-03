export const SITE = {
  name: "PaperCV",
  url: "https://www.papercv.app",
  title: "PaperCV: Free Resume Builder, No Sign-Up, No Paywall",
  description:
    "Build a clean, ATS-friendly resume and download the PDF for free. No account, no credit card, no watermark. Your resume never leaves your browser.",
  twitter: null as string | null,
  repo: "https://github.com/damien526/papercv",
};

/**
 * Who operates the site.
 *
 * These values already appear in the copy: /terms and /privacy name the
 * publisher and carry the contact address, as the law requires. The structured
 * data reads them from here so the two can't drift — and so the `sameAs` below
 * points at a profile that exists rather than at a plausible-looking URL.
 */
export const PUBLISHER_NAME = "Damien Yvert";

export const PUBLISHER_EMAIL = "damienyvert.dev@gmail.com";

/** The operator's only public profile, and so the graph's only `sameAs`. */
export const PUBLISHER_LINKEDIN = "https://www.linkedin.com/in/damien-yvert/";

/**
 * When the content last actually changed.
 *
 * This — not the build clock — is what the sitemap's `lastmod` and the
 * markup's `dateModified` carry. A clock date claims every page changed on
 * every push, including the pushes that didn't touch a line of copy, and a
 * sitemap that cries wolf ends up with its `lastmod` ignored. Then the day a
 * page really does change, the signal no longer carries.
 *
 * ⚠ Advance this by hand, and only when copy or `lib/templates-meta.ts`
 * changes. A styling tweak, a build fix or a component rename leave it alone.
 */
export const CONTENT_REVIEWED_ON = "2026-10-03";

/**
 * Absolute URL for an internal path.
 *
 * `next.config.ts` leaves `trailingSlash` at its default of false and
 * `vercel.json` sets `cleanUrls: true`, so interior pages are served WITHOUT a
 * trailing slash: `/templates`, not `/templates/`.
 *
 * The root keeps its slash here, for the sitemap. Note that Next normalises it
 * back out of the `<link rel="canonical">` to match `trailingSlash: false`, so
 * the canonical ships as `https://www.papercv.app` — which is the SAME URL as
 * `https://www.papercv.app/`: RFC 3986 treats an empty path as equivalent to
 * `/`, and Google normalises the two identically. Not worth fighting the
 * normaliser over.
 */
export function absoluteUrl(path = "/"): string {
  if (path === "" || path === "/") return `${SITE.url}/`;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Social card for a page. One shared card; `public/og/home.png` is real. */
export function ogImageUrl(): string {
  return absoluteUrl("/og/home.png");
}
