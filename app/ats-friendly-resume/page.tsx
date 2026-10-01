import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "What Makes a Resume ATS-Friendly in 2026 (Checklist)",
  description:
    "A plain-English checklist of what applicant tracking systems can and cannot parse: layout, headings, fonts, file format. And how PaperCV templates comply by default.",
  alternates: { canonical: "/ats-friendly-resume" },
};

const CHECKLIST = [
  {
    t: "Real text, not images",
    b: "An ATS reads the text layer of your PDF. If your resume is a scanned image, an exported picture, or text baked into graphics, there is nothing to read. Test: open your PDF and try to select a sentence with your cursor. If you can't, software can't either.",
  },
  {
    t: "Standard section headings",
    b: "Parsers look for headings they know: Experience, Education, Skills, Summary, Certifications. Clever headings like \"My journey\" or \"What I bring\" can land your work history in the wrong bucket, or nowhere.",
  },
  {
    t: "One clear reading order",
    b: "Multi-column layouts are fine when the underlying text order stays linear (modern parsers handle that). What breaks parsing is text boxes scattered around the page, tables used as layout, and headers or footers holding your contact details.",
  },
  {
    t: "Dates a machine can read",
    b: "Use consistent, conventional date formats like \"Mar 2022 - Present\" or \"2019 - 2022\". Parsers compute your years of experience from them; creative formats produce wrong numbers.",
  },
  {
    t: "Common fonts, embedded",
    b: "Stick to well-behaved text fonts and make sure the PDF embeds them. Decorative display fonts can map to garbage characters after extraction.",
  },
  {
    t: "PDF, unless asked otherwise",
    b: "A text-based PDF is the safest format in 2026: layout is frozen and every major ATS parses it. Only send a .docx when the application explicitly asks for one.",
  },
  {
    t: "No photo for US and UK applications",
    b: "Photos are standard in some countries and actively discouraged in the US and UK, where many employers remove them for compliance. When in doubt for international applications, leave it out. PaperCV templates are photo-free by design.",
  },
];

export default function AtsPage() {
  return (
    <div className="bg-paper-50 text-ink-900">
      <Nav />
      <main className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="font-display text-[clamp(32px,5vw,50px)] leading-[1.08] tracking-tight">
          What "ATS-friendly" actually means
        </h1>
        <div className="mt-7 space-y-5 text-[15.5px] leading-relaxed text-ink-600">
          <p>
            Most mid-size and large employers run applications through an applicant tracking system (ATS) before a
            human reads them. The software extracts your text, splits it into fields (name, roles, dates, skills),
            and makes it searchable for recruiters. When extraction fails, your resume isn't rejected dramatically;
            it just becomes a half-empty record nobody finds in searches. That is the quiet way good candidates
            disappear.
          </p>
          <p>
            The fix is not a secret format or paid "optimization". It is a short list of boring constraints, all of
            which are about making your document easy to read by a machine without making it ugly for the human who
            reads it next.
          </p>
        </div>

        <ol className="mt-10 space-y-7">
          {CHECKLIST.map((c, i) => (
            <li key={c.t} className="flex gap-4">
              <span className="font-display mt-[-4px] text-[30px] italic text-paper-300">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="text-[17px] font-semibold">{c.t}</h2>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-500">{c.b}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 rounded-2xl border border-paper-200 bg-paper-100/70 p-7">
          <h2 className="font-display text-[24px] tracking-tight">Where PaperCV fits</h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-ink-500">
            Every PaperCV template passes this checklist by construction: real selectable text, standard headings,
            a linear reading order (including the two-column Compact template), conventional date formatting,
            embedded text fonts, and PDF output. You focus on the content; the format is already right.
          </p>
          <Link
            href="/builder"
            className="mt-5 inline-block rounded-xl bg-brand-500 px-6 py-3 text-[14.5px] font-semibold text-white transition hover:bg-brand-600"
          >
            Build an ATS-friendly resume, free
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
