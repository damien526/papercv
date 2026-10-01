import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-paper-200/80 bg-paper-50/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center gap-8 px-5">
        <Link href="/" className="flex items-baseline gap-0.5 text-[19px] tracking-tight text-ink-900">
          <span className="font-display italic">Paper</span>
          <span className="font-semibold">CV</span>
          <span className="ml-1 inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-brand-500" />
        </Link>
        <div className="hidden items-center gap-6 text-[13.5px] font-medium text-ink-500 sm:flex">
          <Link href="/templates" className="transition hover:text-ink-900">Templates</Link>
          <Link href="/ats-friendly-resume" className="transition hover:text-ink-900">ATS guide</Link>
          <Link href="/#faq" className="transition hover:text-ink-900">FAQ</Link>
        </div>
        <div className="ml-auto">
          <Link
            href="/builder"
            className="rounded-lg bg-ink-900 px-4 py-2 text-[13.5px] font-semibold text-paper-50 shadow-sm transition hover:bg-ink-700"
          >
            Open the builder
          </Link>
        </div>
      </nav>
    </header>
  );
}
