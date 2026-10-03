import type { Metadata } from "next";
import BuilderShell from "@/components/BuilderShell";
import { absoluteUrl } from "@/lib/site";

/**
 * The builder is the application, and it is deliberately NOT indexed.
 *
 * WHY. This route renders `<BuilderShell />`, a client-only dark workspace
 * loaded with `ssr: false`. What a crawler received was the loading state:
 * no `<h1>`, twelve words of text, and a `priority: 0.9` entry in the sitemap
 * pointing at it. Google was being invited to index an empty app shell.
 *
 * WHY NOINDEX RATHER THAN ADDING CONTENT. The two obvious fixes both fail:
 *
 *   · Server-rendering a marketing header above the editor would push a
 *     full-height tool (`flex min-h-dvh flex-col`) down the page to serve a
 *     crawler, damaging the product for the people who actually use it.
 *   · Copying the home page's pitch here would make two pages compete for the
 *     same query with the same title. The home page already targets "free
 *     resume builder" — it IS that title — with 920 words behind it. /builder
 *     could only cannibalise it.
 *
 * So the page stays out of the index and out of the sitemap, while `follow`
 * keeps its links live and the ten inbound internal links keep it reachable.
 * The indexable surface for the query is the home page, /templates,
 * /free-resume-builder-no-sign-up and /ats-friendly-resume — all of which have
 * real content and all of which link here.
 */
export const metadata: Metadata = {
  title: "Resume Builder: Edit and Download Your PDF",
  description:
    "Write your resume, pick a template, and download the PDF. Free, no account, no watermark. Your resume is saved in your browser and never uploaded.",
  alternates: { canonical: absoluteUrl("/builder") },
  robots: { index: false, follow: true },
};

export default function BuilderPage() {
  return <BuilderShell />;
}
