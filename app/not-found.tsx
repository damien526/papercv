import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { absoluteUrl } from "@/lib/site";

/**
 * The 404 declares its own `noindex`, which overrides the `index: true` of the
 * root layout, and pins its canonical to the home page.
 *
 * Both matter: the page answers under an unlimited number of addresses, and
 * the layout's `canonical: "/"` was the only thing pointing anywhere at all.
 * `follow` stays true — the links below are the way out for a crawler as much
 * as for a reader.
 */
export const metadata: Metadata = {
  title: "Page not found",
  description: "That page does not exist. Head back to the PaperCV resume builder.",
  robots: { index: false, follow: true },
  alternates: { canonical: absoluteUrl("/") },
};

export default function NotFound() {
  return (
    <div className="bg-paper-50 text-ink-900">
      <Nav />
      <main className="mx-auto max-w-2xl px-5 py-24 text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-brand-600">404</p>
        <h1 className="mt-4 font-display text-[clamp(32px,5vw,48px)] tracking-tight">
          This page doesn&apos;t exist
        </h1>
        <p className="mt-5 text-[16px] leading-relaxed text-ink-500">
          The link may be out of date. Your resume is safe either way: it lives in your own
          browser, not on a server.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/builder"
            className="rounded-full bg-ink-900 px-6 py-3 text-[14px] font-semibold text-paper-50 transition hover:bg-ink-800"
          >
            Open the builder
          </Link>
          <Link
            href="/templates"
            className="rounded-full border border-paper-300 px-6 py-3 text-[14px] font-semibold transition hover:border-ink-900"
          >
            Browse templates
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
