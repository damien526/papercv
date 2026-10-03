import type { MetadataRoute } from "next";
import { CONTENT_REVIEWED_ON, absoluteUrl } from "@/lib/site";
import { TEMPLATES_META } from "@/lib/templates-meta";

export const dynamic = "force-static";

/**
 * Sitemap.
 *
 * `lastModified` is `CONTENT_REVIEWED_ON`, not the build clock. The nuance is
 * the whole file: `new Date()` announced that every page had changed on every
 * push, including the pushes that didn't touch a line of copy, and a sitemap
 * that cries wolf ends up with its `lastmod` ignored — so the day a page
 * really does change, the signal no longer carries.
 *
 * `changeFrequency` and `priority` are deliberately gone: Google has confirmed
 * it reads neither, and the only thing they did here was go stale. `/builder`
 * is gone too, and that one is not a cleanup — it was listed at priority 0.9
 * while rendering a client-only shell with no `<h1>` and twelve words of text.
 * See the note in `app/builder/page.tsx`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = CONTENT_REVIEWED_ON;

  const paths = [
    "/",
    "/templates",
    ...TEMPLATES_META.map((t) => `/templates/${t.id}`),
    "/free-resume-builder-no-sign-up",
    "/ats-friendly-resume",
    "/privacy",
    "/terms",
  ];

  return paths.map((path) => ({ url: absoluteUrl(path), lastModified }));
}
