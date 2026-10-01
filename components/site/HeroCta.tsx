"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeroCta() {
  const router = useRouter();
  const [name, setName] = useState("");

  function go() {
    const n = name.trim();
    router.push(n ? `/builder?name=${encodeURIComponent(n)}` : "/builder");
  }

  return (
    <div className="mt-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          go();
        }}
        className="flex max-w-xl flex-col gap-3 sm:flex-row"
      >
        <label className="sr-only" htmlFor="hero-name">
          Your name
        </label>
        <input
          id="hero-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          autoComplete="name"
          className="w-full flex-1 rounded-xl border border-paper-300 bg-white px-5 py-3.5 text-[15px] text-ink-900 shadow-sm outline-none transition placeholder:text-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
        />
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-brand-500 px-7 py-3.5 text-[15.5px] font-semibold text-white shadow-[0_8px_28px_-8px_rgba(67,96,245,0.65)] transition hover:bg-brand-600"
        >
          Build my resume, free
        </button>
      </form>
      <div className="mt-4 flex items-center gap-5 text-[13px] text-ink-400">
        <span>Starts instantly. No sign-up, your name goes straight onto the page.</span>
        <Link
          href="/templates"
          className="shrink-0 text-[14px] font-semibold text-ink-500 underline decoration-paper-300 decoration-2 underline-offset-4 transition hover:text-ink-900"
        >
          See the templates
        </Link>
      </div>
    </div>
  );
}
