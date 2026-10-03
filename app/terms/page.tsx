import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { contentPageGraph, jsonLdGraph } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/site";

const DESCRIPTION =
  "The short, readable terms for using PaperCV: free, provided as is, your resume stays yours and stays on your device.";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/terms") },
};

export default function TermsPage() {
  return (
    <div className="bg-paper-50 text-ink-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph(
            contentPageGraph({
              path: "/terms",
              name: "Terms of Use",
              description: DESCRIPTION,
              crumb: "Terms",
            }),
          ),
        }}
      />
      <Nav />
      <main className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="font-display text-[clamp(32px,5vw,50px)] tracking-tight">Terms of use</h1>
        <p className="mt-3 text-[13px] text-ink-400">Last updated: October 1, 2026</p>
        <div className="mt-7 space-y-8 text-[15px] leading-relaxed text-ink-600">
          <p>
            These terms are deliberately short and written to be read. By using PaperCV (papercv.app) you
            agree to them.
          </p>

          <section>
            <h2 className="font-display text-[24px] tracking-tight text-ink-900">The service</h2>
            <p className="mt-3">
              PaperCV is a free resume builder that runs in your browser. The core builder (all templates, PDF
              download, JSON export and import) is free, with no account and no watermark. The service is provided
              "as is" and "as available", without warranties of any kind. We work to keep it accurate and online,
              but we do not guarantee uninterrupted availability or that it is free of defects.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[24px] tracking-tight text-ink-900">Your content stays yours</h2>
            <p className="mt-3">
              Everything you write in the builder is and remains entirely yours. PaperCV claims no rights over your
              resume. Your content is stored on your own device only (see the{" "}
              <Link href="/privacy" className="font-semibold text-brand-600 underline decoration-2 underline-offset-2">
                privacy page
              </Link>
              ), which also means you are responsible for keeping a backup: use Export to save a JSON copy. We
              cannot recover a draft that your browser deleted, because we never had it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[24px] tracking-tight text-ink-900">No hiring outcome is promised</h2>
            <p className="mt-3">
              PaperCV produces well-formed, ATS-friendly PDF files, and our{" "}
              <Link href="/ats-friendly-resume" className="font-semibold text-brand-600 underline decoration-2 underline-offset-2">
                ATS guide
              </Link>{" "}
              reflects honest, general knowledge about how applicant tracking systems parse documents. But every
              employer's software and process is different, and the content of your resume is yours. We do not
              guarantee that any resume made here will pass a given screening system or lead to interviews or
              employment.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[24px] tracking-tight text-ink-900">Acceptable use</h2>
            <p className="mt-3">
              Use PaperCV for lawful purposes. Do not use it to produce documents that impersonate another real
              person without their consent or that contain unlawful content, and do not attempt to disrupt the
              service or misrepresent its origin.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[24px] tracking-tight text-ink-900">Liability</h2>
            <p className="mt-3">
              To the maximum extent permitted by law, PaperCV and its publisher are not liable for indirect or
              consequential damages arising from the use of the service, including lost opportunities, lost data you
              did not back up, or decisions made by employers and their software. Nothing in these terms excludes
              liability that cannot legally be excluded.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[24px] tracking-tight text-ink-900">Changes and contact</h2>
            <p className="mt-3">
              If these terms change, the date above changes with them, and material changes will be visible on this
              page before they apply. PaperCV is published by Damien Yvert. Questions:{" "}
              <a className="font-semibold text-brand-600 underline decoration-2 underline-offset-2" href="mailto:damienyvert.dev@gmail.com">
                damienyvert.dev@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
