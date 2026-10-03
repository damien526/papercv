import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import TemplateSketch from "@/components/site/TemplateSketch";
import { TEMPLATES_META } from "@/lib/templates-meta";
import { jsonLdGraph, templatesIndexGraph } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/site";

const DESCRIPTION =
  "Four free resume templates: Clean, Compact, Executive, and Contrast. All ATS-friendly, all downloadable as PDF with no sign-up and no watermark.";

export const metadata: Metadata = {
  title: "Free ATS-Friendly Resume Templates",
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/templates") },
};

export default function TemplatesPage() {
  return (
    <div className="bg-paper-50 text-ink-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph(
            templatesIndexGraph({ description: DESCRIPTION, templates: TEMPLATES_META }),
          ),
        }}
      />
      <Nav />
      <main className="mx-auto max-w-6xl px-5 py-16">
        <h1 className="font-display text-[clamp(32px,5vw,52px)] tracking-tight">
          Templates that respect the reader
        </h1>
        <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-ink-500">
          A resume template has one job: make your experience effortless to read, for a human in six seconds and for
          an applicant tracking system in six milliseconds. These four do that job. Pick one in the builder and switch
          anytime; your content stays put.
        </p>
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {TEMPLATES_META.map((t) => (
            <div key={t.id} className="grid gap-5 rounded-2xl border border-paper-200 bg-white p-5 shadow-sm sm:grid-cols-[200px_1fr]">
              <Link href={`/templates/${t.id}`} className="block">
                <div className="aspect-[8.5/11] overflow-hidden rounded-lg border border-paper-200 transition hover:shadow-paper">
                  <TemplateSketch id={t.id} />
                </div>
              </Link>
              <div>
                <h2 className="text-[20px] font-semibold">
                  <Link href={`/templates/${t.id}`} className="hover:text-brand-600">{t.name}</Link>
                </h2>
                <p className="mt-1 text-[13.5px] font-medium text-brand-600">{t.tagline}</p>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-500">{t.description}</p>
                <p className="mt-3 text-[13px] text-ink-400">
                  <span className="font-semibold text-ink-500">Best for:</span> {t.bestFor}
                </p>
                <Link
                  href="/builder"
                  className="mt-4 inline-block rounded-lg bg-ink-900 px-4 py-2 text-[13px] font-semibold text-paper-50 transition hover:bg-ink-700"
                >
                  Use this template
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
