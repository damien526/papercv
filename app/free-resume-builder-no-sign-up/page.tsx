import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { contentPageGraph, jsonLdGraph } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/site";

const DESCRIPTION =
  "PaperCV is a resume builder with no sign-up, no email, no credit card, and no paywall at the download button. Build your resume and download the PDF in minutes.";

export const metadata: Metadata = {
  // 74 characters with the "| PaperCV" suffix, past the width Google renders.
  // The paywall promise moves to the description, which has room for it.
  title: "Free Resume Builder, No Sign-Up Required",
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/free-resume-builder-no-sign-up") },
};

export default function NoSignUpPage() {
  return (
    <div className="bg-paper-50 text-ink-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph(
            contentPageGraph({
              path: "/free-resume-builder-no-sign-up",
              name: "Free resume builder with no sign-up",
              description: DESCRIPTION,
              crumb: "No sign-up",
            }),
          ),
        }}
      />
      <Nav />
      <main className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="font-display text-[clamp(32px,5vw,50px)] leading-[1.08] tracking-tight">
          A resume builder with no sign-up. Really none.
        </h1>
        <div className="mt-8 space-y-6 text-[15.5px] leading-relaxed text-ink-600">
          <p>
            If you searched for a resume builder with no sign-up, you have probably already been burned. The usual
            pattern goes like this: a homepage says free, you spend forty minutes writing your resume, and then the
            download button suddenly wants an account, an email confirmation, and in the worst cases a credit card
            for a trial that quietly becomes a subscription.
          </p>
          <p>
            PaperCV was built as the opposite of that pattern. Here is the entire flow: you open{" "}
            <Link href="/builder" className="font-semibold text-brand-600 underline decoration-2 underline-offset-2">the builder</Link>,
            you type, you click Download PDF, and a PDF downloads. That is the whole story. There is no account
            system at all, so a sign-up wall is not even technically possible.
          </p>
          <h2 className="font-display pt-4 text-[28px] tracking-tight text-ink-900">How can it work without an account?</h2>
          <p>
            Resume builders ask you to sign up because your data lives on their servers, and because an email address
            is worth money to them. PaperCV keeps your data where you are: in your browser's local storage. The PDF
            is generated on your device too. No server ever sees your resume, which means no account is needed to
            protect it, and nobody can email you about a discount on a subscription you never wanted.
          </p>
          <p>
            The honest trade-off: since there is no account, your resume lives in the browser you wrote it in. If you
            want to move it to another device or keep a backup, click Export and you get a small JSON file with
            everything in it. Import it anywhere, anytime. Your data stays yours, in a file you can actually hold.
          </p>
          <h2 className="font-display pt-4 text-[28px] tracking-tight text-ink-900">What you get, concretely</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Four ATS-friendly templates (single column, two column, centered, and a bold color header)</li>
            <li>Accent colors, serif or sans typography, three density levels, A4 and US Letter</li>
            <li>A real PDF with selectable text and embedded fonts, named after you, with no watermark</li>
            <li>Autosave while you type, plus JSON export and import for backups</li>
          </ul>
          <p>
            It takes about ten minutes to go from a blank page to a finished PDF. If you want to see how a completed
            resume looks first, open the builder and press "Load example".
          </p>
        </div>
        <Link
          href="/builder"
          className="mt-10 inline-block rounded-xl bg-brand-500 px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_28px_-8px_rgba(67,96,245,0.65)] transition hover:bg-brand-600"
        >
          Start writing, no sign-up
        </Link>
      </main>
      <Footer />
    </div>
  );
}
