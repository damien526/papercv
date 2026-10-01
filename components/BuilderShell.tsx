"use client";

import dynamic from "next/dynamic";

const Builder = dynamic(() => import("./Builder"), {
  ssr: false,
  loading: () => (
    <div className="grid min-h-dvh place-items-center bg-ink-950 text-ink-400">
      <div className="animate-pulse text-sm">Opening the builder…</div>
    </div>
  ),
});

export default function BuilderShell() {
  return <Builder />;
}
