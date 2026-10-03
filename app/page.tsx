import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import HeroCta from "@/components/site/HeroCta";
import ResumeMock from "@/components/site/ResumeMock";
import TemplateSketch from "@/components/site/TemplateSketch";
import { TEMPLATES_META } from "@/lib/templates-meta";
import { homeGraph, jsonLdGraph } from "@/lib/jsonld";

const FAQ = [
  {
    q: "Is PaperCV really free?",
    a: "Yes. You can write your resume, pick any template, and download the PDF without paying, creating an account, or entering a card. There is no watermark and no locked download button. If we ever add paid extras, the core builder stays free.",
  },
  {
    q: "Where is my resume stored?",
    a: "In your own browser, using local storage on your device. PaperCV has no server-side storage and no accounts: your resume is never uploaded anywhere. You can also export your data as a JSON file and re-import it later or on another computer.",
  },
  {
    q: "Is the PDF ATS-friendly?",
    a: "Yes. Every template produces real, selectable text (no scanned images, no text in graphics), uses standard section headings, a single reading order, and embedded fonts. That is exactly what applicant tracking systems parse best.",
  },
  {
    q: "Do I need to create an account?",
    a: "No. There is no sign-up, no email confirmation, and no login. Open the builder and start typing. Your work autosaves in your browser as you type.",
  },
  {
    q: "What's the catch?",
    a: "There isn't one. PaperCV is a free tool built to be genuinely useful. It may later offer optional paid extras (like additional premium templates), but downloading your resume will never be the thing you pay for.",
  },
  {
    q: "Can I use my resume on another device?",
    a: "Yes. Use Export to save a small JSON file with all your resume data, then Import it on any other device. Since there are no accounts, that file is your backup; keep it somewhere safe.",
  },
  {
    q: "A4 or US Letter?",
    a: "Both. Switch the paper size in the Design panel. Use US Letter for the United States and Canada, A4 almost everywhere else.",
  },
];

const STEPS = [
  {
    name: "Fill in your details",
    text: "Open the builder and type your experience, education, and skills. Everything autosaves in your browser.",
  },
  {
    name: "Pick a template and style",
    text: "Choose one of four ATS-friendly templates, an accent color, typography, and paper size. The preview updates live.",
  },
  {
    name: "Download your PDF",
    text: "Click Download PDF. The file is generated on your device, with real selectable text and no watermark.",
  },
];

function Check() {
  return (
    <svg className="mt-[3px] shrink-0 text-brand-500" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="bg-paper-50 text-ink-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdGraph(homeGraph({ faq: FAQ, steps: STEPS })) }}
      />
      <Nav />

      {/* hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-paper-300 bg-paper-100 px-3 py-1 text-[12px] font-medium text-ink-500">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            No account. No watermark. No upload.
          </p>
          <h1 className="font-display text-[clamp(38px,6vw,64px)] leading-[1.04] tracking-tight">
            A free resume builder that <em className="text-brand-600">stays</em> free at the download button.
          </h1>
          <p className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-ink-500">
            You know the trick: you spend an hour writing your resume, then the download button asks for your card.
            PaperCV doesn't do that. Write, pick a template, download the PDF. The whole thing runs in your browser,
            so your resume never even leaves your device.
          </p>
          <HeroCta />
          <ul className="mt-9 grid max-w-md gap-2.5 text-[13.5px] text-ink-500">
            <li className="flex gap-2.5"><Check /> Real PDF with selectable text, built for applicant tracking systems</li>
            <li className="flex gap-2.5"><Check /> Autosaves in your browser; export your data as JSON anytime</li>
            <li className="flex gap-2.5"><Check /> Four templates, accent colors, A4 and US Letter</li>
          </ul>
        </div>
        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <Link
            href="/builder?example=1"
            className="group relative block"
            title="Open this example resume in the builder"
          >
            <div className="transition-transform duration-200 group-hover:-translate-y-1">
              <ResumeMock />
            </div>
            <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink-900 px-4 py-2 text-[12.5px] font-semibold text-paper-50 opacity-0 shadow-lg transition group-hover:opacity-100">
              Open this example in the builder →
            </span>
          </Link>
        </div>
      </section>

      {/* the promise */}
      <section className="border-y border-paper-200 bg-paper-100/60">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-3">
          {[
            {
              title: "Actually free",
              body: "The download button downloads. No trial that converts to a subscription, no watermark you pay to remove, no \"premium template\" ambush after an hour of writing.",
            },
            {
              title: "Private by design",
              body: "PaperCV is a static page: there is no server to send your resume to. Your name, your salary history, your phone number: all of it stays on your device.",
            },
            {
              title: "Built for ATS",
              body: "Plain selectable text, standard headings, one reading order, embedded fonts. The boring technical details that decide whether software can read your resume. We obsess over them so you don't have to.",
            },
          ].map((c) => (
            <div key={c.title}>
              <h2 className="font-display text-[26px] italic">{c.title}</h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink-500">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* how it works */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="font-display text-[clamp(28px,4vw,40px)] tracking-tight">Three steps, about ten minutes</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {[
            { n: "01", t: "Write", b: "Fill in your experience, education, and skills in a focused editor. Reorder or hide sections freely. Everything autosaves as you type." },
            { n: "02", t: "Style", b: "Pick a template, an accent color, serif or sans typography, and the paper size. The page preview updates live, exactly as the PDF will look." },
            { n: "03", t: "Download", b: "One click, one real PDF, generated on your device. Named properly, text selectable, ready to send." },
          ].map((s) => (
            <div key={s.n} className="relative">
              <div className="font-display text-[44px] italic text-paper-300">{s.n}</div>
              <h3 className="mt-1 text-[18px] font-semibold">{s.t}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-500">{s.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* templates */}
      <section className="border-t border-paper-200 bg-paper-100/60">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-[clamp(28px,4vw,40px)] tracking-tight">Four templates, zero gimmicks</h2>
            <Link href="/templates" className="text-[14px] font-semibold text-brand-600 transition hover:text-brand-700">
              About each template →
            </Link>
          </div>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-500">
            Every template is designed to parse cleanly in applicant tracking software and to look like a document a
            careful person made, not a flyer.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {TEMPLATES_META.map((t) => (
              <Link
                key={t.id}
                href={`/templates/${t.id}`}
                className="group rounded-xl border border-paper-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-paper"
              >
                <div className="aspect-[8.5/11] overflow-hidden rounded-lg border border-paper-200">
                  <TemplateSketch id={t.id} />
                </div>
                <div className="px-1 pb-1 pt-3">
                  <div className="text-[15px] font-semibold group-hover:text-brand-600">{t.name}</div>
                  <div className="mt-0.5 text-[12.5px] leading-snug text-ink-400">{t.tagline}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* honesty section */}
      <section className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h2 className="font-display text-[clamp(28px,4vw,40px)] tracking-tight">Why is it free?</h2>
        <p className="mt-5 text-[15.5px] leading-relaxed text-ink-500">
          Because the tool costs almost nothing to run: there are no servers processing your resume, your own browser
          does the work. PaperCV may eventually offer optional extras for power users, and if it does, they will be
          clearly labeled before you start, not revealed at the download button. A resume builder you can't afford to
          finish isn't free, whatever the homepage says.
        </p>
        <Link
          href="/builder"
          className="mt-8 inline-block rounded-xl bg-ink-900 px-7 py-3.5 text-[15px] font-semibold text-paper-50 transition hover:bg-ink-700"
        >
          Open the builder
        </Link>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-paper-200 bg-paper-100/60">
        <div className="mx-auto max-w-3xl px-5 py-20">
          <h2 className="font-display text-[clamp(28px,4vw,40px)] tracking-tight">Questions, answered plainly</h2>
          <dl className="mt-8 divide-y divide-paper-200">
            {FAQ.map((f) => (
              <div key={f.q} className="py-5">
                <dt className="text-[16px] font-semibold">{f.q}</dt>
                <dd className="mt-2 text-[14.5px] leading-relaxed text-ink-500">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Footer />
    </div>
  );
}
