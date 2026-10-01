import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import TemplateSketch from "@/components/site/TemplateSketch";
import { TEMPLATES_META, templateMeta } from "@/lib/templates-meta";

export function generateStaticParams() {
  return TEMPLATES_META.map((t) => ({ slug: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = templateMeta(slug);
  if (!t) return {};
  return {
    title: `${t.name} Resume Template: Free, ATS-Friendly, No Sign-Up`,
    description: `${t.tagline}. Use the ${t.name} template free in the PaperCV builder and download your resume as a PDF with no account and no watermark.`,
    alternates: { canonical: `/templates/${t.id}` },
  };
}

export default async function TemplatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = templateMeta(slug);
  if (!t) notFound();

  const others = TEMPLATES_META.filter((x) => x.id !== t.id);

  return (
    <div className="bg-paper-50 text-ink-900">
      <Nav />
      <main className="mx-auto max-w-5xl px-5 py-16">
        <p className="text-[13px] font-medium text-ink-400">
          <Link href="/templates" className="hover:text-ink-900">Templates</Link> / {t.name}
        </p>
        <div className="mt-6 grid items-start gap-12 md:grid-cols-[320px_1fr]">
          <div className="mx-auto w-full max-w-[320px]">
            <div className="aspect-[8.5/11] overflow-hidden rounded-xl border border-paper-200 bg-white shadow-paper">
              <TemplateSketch id={t.id} />
            </div>
          </div>
          <div>
            <h1 className="font-display text-[clamp(32px,5vw,48px)] tracking-tight">The {t.name} template</h1>
            <p className="mt-2 text-[15px] font-medium text-brand-600">{t.tagline}</p>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-500">{t.description}</p>
            <ul className="mt-6 space-y-2.5">
              {t.details.map((d) => (
                <li key={d} className="flex gap-2.5 text-[14px] text-ink-500">
                  <svg className="mt-[3px] shrink-0 text-brand-500" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[13.5px] text-ink-400">
              <span className="font-semibold text-ink-500">Best for:</span> {t.bestFor}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/builder"
                className="rounded-xl bg-brand-500 px-6 py-3 text-[14.5px] font-semibold text-white shadow-[0_8px_28px_-8px_rgba(67,96,245,0.65)] transition hover:bg-brand-600"
              >
                Use {t.name}, free
              </Link>
              <Link href="/templates" className="self-center text-[14px] font-semibold text-ink-500 underline decoration-paper-300 decoration-2 underline-offset-4 hover:text-ink-900">
                Compare all templates
              </Link>
            </div>
            <p className="mt-5 text-[12.5px] text-ink-400">
              Free means free: no account, no watermark, no paywall at the download button. Your resume stays in your
              browser.
            </p>
          </div>
        </div>

        <section className="mt-20">
          <h2 className="font-display text-[26px] tracking-tight">Other templates</h2>
          <div className="mt-6 grid grid-cols-3 gap-5">
            {others.map((o) => (
              <Link key={o.id} href={`/templates/${o.id}`} className="group rounded-xl border border-paper-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-paper">
                <div className="aspect-[8.5/11] overflow-hidden rounded-lg border border-paper-200">
                  <TemplateSketch id={o.id} />
                </div>
                <div className="px-1 pt-2.5 text-[14px] font-semibold group-hover:text-brand-600">{o.name}</div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
