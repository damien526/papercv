import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-paper-200 bg-paper-100/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:grid-cols-3">
        <div>
          <div className="flex items-baseline gap-0.5 text-[17px] text-ink-900">
            <span className="font-display italic">Paper</span>
            <span className="font-semibold">CV</span>
            <span className="ml-1 inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-brand-500" />
          </div>
          <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-ink-400">
            A free resume builder that runs entirely in your browser. No account, no watermark, and your resume never
            leaves your device.
          </p>
        </div>
        <div className="text-[13.5px]">
          <div className="mb-3 font-semibold text-ink-900">PaperCV</div>
          <ul className="space-y-2 text-ink-500">
            <li><Link className="transition hover:text-ink-900" href="/builder">Resume builder</Link></li>
            <li><Link className="transition hover:text-ink-900" href="/templates">Resume templates</Link></li>
            <li><Link className="transition hover:text-ink-900" href="/ats-friendly-resume">ATS-friendly resumes</Link></li>
            <li><Link className="transition hover:text-ink-900" href="/free-resume-builder-no-sign-up">Why no sign-up</Link></li>
            <li><Link className="transition hover:text-ink-900" href="/privacy">Privacy</Link></li>
            <li><Link className="transition hover:text-ink-900" href="/terms">Terms of use</Link></li>
            <li><a className="transition hover:text-ink-900" href="mailto:damienyvert.dev@gmail.com">Contact</a></li>
          </ul>
        </div>
        <div className="text-[13.5px]">
          <div className="mb-3 font-semibold text-ink-900">More free tools</div>
          <ul className="space-y-2 text-ink-500">
            <li><a className="transition hover:text-ink-900" href="https://undercap.vercel.app" rel="noopener">Undercap: compress video to a target size</a></li>
            <li><a className="transition hover:text-ink-900" href="https://graphmint.vercel.app" rel="noopener">Graphmint: make charts online</a></li>
            <li><a className="transition hover:text-ink-900" href="https://music-waveform.com" rel="noopener">Waveform: audio visualizer</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper-200 py-5 text-center text-[12px] text-ink-400">
        {SITE.name} · Published by Damien Yvert · Free forever for the core builder · Built with care, no dark patterns
      </div>
    </footer>
  );
}
