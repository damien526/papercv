import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Answer engines and their training crawlers, named one by one.
 *
 * This changes nothing about what they are allowed to do — the wildcard
 * already permitted it. Writing them out makes the decision legible: a free
 * tool that wants to be cited correctly by an assistant has every interest in
 * being read by one, and silence reads as oversight rather than as a choice.
 */
const ANSWER_ENGINES = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "ClaudeBot",
  "Claude-User",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
];

/**
 * THE RSC TEXT PAYLOADS — the reason this file is no longer three lines.
 *
 * Next drops a React payload in plain text next to every page it exports, and
 * this project's export is the worst case of it in the folder. `out/` carried
 * roughly forty of them: `index.txt`, `builder.txt`, `templates.txt`,
 * `terms.txt`, `privacy.txt`, `ats-friendly-resume.txt`,
 * `free-resume-builder-no-sign-up.txt`, `_not-found.txt`, every
 * `templates/<id>.txt`, plus `__next._full.txt`, `__next._tree.txt` and
 * `__next.<route>.__PAGE__.txt` inside EACH route directory.
 *
 * Every one of them answers 200 and contains the same prose as the page it
 * shadows, wrapped in serialisation jargon. Left open, each page of the site
 * exists twice over.
 *
 * `/*.txt$` closes the lot in one pattern. The three `Allow` lines below carve
 * back the files that are meant to be read as text — and they win despite
 * being listed after, because Google resolves conflicts by LONGEST MATCHING
 * PATTERN, not by order: `/llms.txt` (9 characters) beats `/*.txt$` (7).
 */
const DISALLOW = ["/*.txt$"];

/**
 * Text files that are the point rather than an artefact:
 *   · `llms.txt` — written for assistants, and linked as such;
 *   · the IndexNow key — Bing fetches it to verify submissions, and a blocked
 *     key makes `npm run indexnow` fail verification;
 *   · `security.txt` — RFC 9116 expects it to be fetchable.
 */
const ALLOW = [
  "/llms.txt",
  "/cc7ab363c4a80c76f663895194866fe8.txt",
  "/.well-known/security.txt",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: ["/", ...ALLOW], disallow: DISALLOW },
      ...ANSWER_ENGINES.map((userAgent) => ({
        userAgent,
        allow: ["/", ...ALLOW],
        disallow: DISALLOW,
      })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
