"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ResumeData, Section, SectionKind, uid } from "@/lib/resume/types";
import { emptyResume, emptySection } from "@/lib/resume/defaults";
import { SAMPLE_RESUME } from "@/lib/resume/sample";
import { exportJson, importJson, loadResume, saveResume } from "@/lib/resume/storage";
import { downloadBlob, renderResumeBlob, resumeFilename } from "@/lib/pdf/render";
import PdfPreview from "./preview/PdfPreview";
import SectionEditor from "./editor/SectionEditor";
import StylePanel from "./editor/StylePanel";
import { Field, Icons, IconButton } from "./ui";

type Tab = "content" | "style";
type MobileTab = "edit" | "preview";

const SECTION_LABEL: Record<SectionKind, string> = {
  summary: "Summary",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
  certifications: "Certifications",
  languages: "Languages",
  custom: "Custom section",
};

export default function Builder() {
  const [data, setData] = useState<ResumeData | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [tab, setTab] = useState<Tab>("content");
  const [mobileTab, setMobileTab] = useState<MobileTab>("edit");
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [rendering, setRendering] = useState(false);
  const renderGen = useRef(0);
  const fileInput = useRef<HTMLInputElement>(null);

  // Load from localStorage on mount (client only).
  useEffect(() => {
    const stored = loadResume();
    setData(stored ?? emptyResume());
  }, []);

  const isEmpty = useMemo(() => {
    if (!data) return true;
    return (
      !data.basics.fullName &&
      !data.basics.email &&
      data.sections.every((s) => {
        if (s.kind === "summary") return !s.summary?.trim();
        const arr = s.experience ?? s.education ?? s.skills ?? s.projects ?? s.certifications ?? s.languages ?? s.custom;
        return !arr || arr.length === 0;
      })
    );
  }, [data]);

  // Autosave + debounced PDF render.
  useEffect(() => {
    if (!data) return;
    saveResume(data);
    const gen = ++renderGen.current;
    setRendering(true);
    const handle = setTimeout(() => {
      renderResumeBlob(data)
        .then((b) => {
          if (gen === renderGen.current) {
            setBlob(b);
            setRendering(false);
          }
        })
        .catch(() => {
          if (gen === renderGen.current) setRendering(false);
        });
    }, 250);
    return () => clearTimeout(handle);
  }, [data]);

  const update = useCallback((fn: (d: ResumeData) => ResumeData) => {
    setData((d) => (d ? fn(d) : d));
  }, []);

  const updateSection = useCallback(
    (id: string, patch: Partial<Section>) => {
      update((d) => ({ ...d, sections: d.sections.map((s) => (s.id === id ? { ...s, ...patch } : s)) }));
    },
    [update]
  );

  const moveSection = useCallback(
    (id: string, dir: -1 | 1) => {
      update((d) => {
        const i = d.sections.findIndex((s) => s.id === id);
        const j = i + dir;
        if (i < 0 || j < 0 || j >= d.sections.length) return d;
        const sections = [...d.sections];
        [sections[i], sections[j]] = [sections[j], sections[i]];
        return { ...d, sections };
      });
    },
    [update]
  );

  const addSection = useCallback(
    (kind: SectionKind) => {
      const s = { ...emptySection(kind), id: uid() };
      update((d) => ({ ...d, sections: [...d.sections, s] }));
      setOpenSection(s.id);
    },
    [update]
  );

  async function handleDownload() {
    if (!data || downloading) return;
    setDownloading(true);
    try {
      const b = await renderResumeBlob(data);
      downloadBlob(b, resumeFilename(data));
    } finally {
      setDownloading(false);
    }
  }

  function handleExportJson() {
    if (!data) return;
    const b = new Blob([exportJson(data)], { type: "application/json" });
    downloadBlob(b, resumeFilename(data).replace(/\.pdf$/, ".json"));
  }

  function handleImportFile(file: File) {
    file.text().then((text) => {
      try {
        setData(importJson(text));
      } catch {
        window.alert("That file does not look like a PaperCV JSON export.");
      }
    });
  }

  if (!data) {
    return (
      <div className="grid min-h-dvh place-items-center bg-ink-950 text-ink-400">
        <div className="animate-pulse text-sm">Opening your resume…</div>
      </div>
    );
  }

  const missingKinds = (["summary", "experience", "education", "skills", "projects", "certifications", "languages"] as SectionKind[]).filter(
    (k) => !data.sections.some((s) => s.kind === k)
  );

  return (
    <div className="flex min-h-dvh flex-col bg-ink-950 text-ink-100">
      {/* top bar */}
      <header className="z-20 flex h-14 shrink-0 items-center gap-3 border-b border-ink-700 bg-ink-900/90 px-4 backdrop-blur">
        <Link href="/" className="flex items-baseline gap-0.5 text-[17px] tracking-tight">
          <span className="font-display italic">Paper</span>
          <span className="font-semibold">CV</span>
          <span className="ml-1 inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-brand-500" />
        </Link>
        <span className="hidden text-[12px] text-ink-500 sm:block">
          {rendering ? "Rendering…" : "Saved in this browser. Nothing leaves your device."}
        </span>
        <div className="ml-auto flex items-center gap-2">
          {isEmpty ? (
            <button
              type="button"
              onClick={() => setData(structuredClone(SAMPLE_RESUME))}
              className="rounded-lg border border-ink-600 px-3 py-1.5 text-[12.5px] font-medium text-ink-200 transition hover:border-brand-400 hover:text-brand-300"
            >
              Load example
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Clear this resume and start over?")) setData(emptyResume());
              }}
              className="hidden rounded-lg border border-ink-600 px-3 py-1.5 text-[12.5px] font-medium text-ink-300 transition hover:border-ink-400 hover:text-ink-100 sm:block"
            >
              New
            </button>
          )}
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className="hidden rounded-lg border border-ink-600 px-3 py-1.5 text-[12.5px] font-medium text-ink-300 transition hover:border-ink-400 hover:text-ink-100 sm:block"
          >
            Import
          </button>
          <button
            type="button"
            onClick={handleExportJson}
            className="hidden rounded-lg border border-ink-600 px-3 py-1.5 text-[12.5px] font-medium text-ink-300 transition hover:border-ink-400 hover:text-ink-100 sm:block"
            title="Save your data as a JSON file you can re-import later"
          >
            Export
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleImportFile(f);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading || isEmpty}
            className="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-1.5 text-[13px] font-semibold text-white shadow-[0_4px_16px_-4px_rgba(67,96,245,0.6)] transition hover:bg-brand-400 disabled:opacity-40 disabled:shadow-none"
          >
            {Icons.download}
            {downloading ? "Preparing…" : "Download PDF"}
          </button>
        </div>
      </header>

      {/* mobile tab switch */}
      <div className="flex border-b border-ink-700 bg-ink-900 md:hidden">
        {(
          [
            ["edit", "Edit"],
            ["preview", "Preview"],
          ] as [MobileTab, string][]
        ).map(([t, label]) => (
          <button
            key={t}
            type="button"
            onClick={() => setMobileTab(t)}
            className={`flex-1 py-2.5 text-[13px] font-medium transition ${
              mobileTab === t ? "border-b-2 border-brand-500 text-ink-100" : "text-ink-400"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex min-h-0 flex-1">
        {/* editor panel */}
        <aside
          className={`w-full shrink-0 flex-col border-r border-ink-700 bg-ink-800 md:flex md:w-[440px] lg:w-[480px] ${
            mobileTab === "edit" ? "flex" : "hidden"
          }`}
        >
          <div className="flex gap-1 border-b border-ink-700 px-4 pt-3">
            {(
              [
                ["content", "Content"],
                ["style", "Design"],
              ] as [Tab, string][]
            ).map(([t, label]) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`rounded-t-lg px-4 py-2 text-[13px] font-medium transition ${
                  tab === t
                    ? "border border-b-0 border-ink-700 bg-ink-850 text-ink-100"
                    : "text-ink-400 hover:text-ink-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="panel-scroll min-h-0 flex-1 overflow-y-auto bg-ink-850 p-4 pb-28 md:pb-8">
            {tab === "style" ? (
              <StylePanel settings={data.settings} onChange={(patch) => update((d) => ({ ...d, settings: { ...d.settings, ...patch } }))} />
            ) : (
              <div className="space-y-3">
                {/* basics */}
                <div className="rounded-xl border border-ink-600/80 bg-ink-800 p-3.5">
                  <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-300">
                    About you
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <Field className="col-span-2" label="Full name" value={data.basics.fullName} onChange={(v) => update((d) => ({ ...d, basics: { ...d.basics, fullName: v } }))} placeholder="Maya Lindqvist" />
                    <Field className="col-span-2" label="Job title" value={data.basics.headline} onChange={(v) => update((d) => ({ ...d, basics: { ...d.basics, headline: v } }))} placeholder="Senior Product Designer" />
                    <Field label="Email" type="email" value={data.basics.email} onChange={(v) => update((d) => ({ ...d, basics: { ...d.basics, email: v } }))} placeholder="you@example.com" />
                    <Field label="Phone" value={data.basics.phone} onChange={(v) => update((d) => ({ ...d, basics: { ...d.basics, phone: v } }))} placeholder="+44 7700 900123" />
                    <Field label="Location" value={data.basics.location} onChange={(v) => update((d) => ({ ...d, basics: { ...d.basics, location: v } }))} placeholder="London, UK" />
                    <Field label="Website" value={data.basics.website} onChange={(v) => update((d) => ({ ...d, basics: { ...d.basics, website: v } }))} placeholder="yoursite.com" />
                    <Field label="LinkedIn" value={data.basics.linkedin} onChange={(v) => update((d) => ({ ...d, basics: { ...d.basics, linkedin: v } }))} placeholder="linkedin.com/in/you" />
                    <Field label="GitHub" value={data.basics.github} onChange={(v) => update((d) => ({ ...d, basics: { ...d.basics, github: v } }))} placeholder="github.com/you" />
                  </div>
                </div>

                {/* sections */}
                {data.sections.map((s, i) => {
                  const open = openSection === s.id;
                  return (
                    <div key={s.id} className={`rounded-xl border bg-ink-800 transition ${open ? "border-ink-500" : "border-ink-600/80"}`}>
                      <div className="flex items-center gap-1 px-2 py-1.5">
                        <button
                          type="button"
                          onClick={() => setOpenSection(open ? null : s.id)}
                          className="flex min-w-0 flex-1 items-center gap-2 rounded-lg px-1.5 py-1.5 text-left"
                        >
                          <span className={`text-ink-500 transition-transform ${open ? "rotate-90" : ""}`}>{Icons.chevron}</span>
                          {open ? (
                            <input
                              value={s.title}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => updateSection(s.id, { title: e.target.value })}
                              className="w-full rounded border border-transparent bg-transparent px-1 text-[13.5px] font-semibold text-ink-100 outline-none focus:border-ink-500"
                            />
                          ) : (
                            <span className={`truncate text-[13.5px] font-semibold ${s.visible ? "text-ink-100" : "text-ink-500 line-through"}`}>
                              {s.title || SECTION_LABEL[s.kind]}
                            </span>
                          )}
                        </button>
                        <IconButton onClick={() => moveSection(s.id, -1)} title="Move section up" disabled={i === 0}>{Icons.up}</IconButton>
                        <IconButton onClick={() => moveSection(s.id, 1)} title="Move section down" disabled={i === data.sections.length - 1}>{Icons.down}</IconButton>
                        <IconButton onClick={() => updateSection(s.id, { visible: !s.visible })} title={s.visible ? "Hide from resume" : "Show on resume"}>
                          {s.visible ? Icons.eye : Icons.eyeOff}
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            if (window.confirm(`Remove the "${s.title}" section?`)) {
                              update((d) => ({ ...d, sections: d.sections.filter((x) => x.id !== s.id) }));
                            }
                          }}
                          title="Delete section"
                          danger
                        >
                          {Icons.trash}
                        </IconButton>
                      </div>
                      {open ? (
                        <div className="border-t border-ink-700 p-3.5">
                          <SectionEditor section={s} onChange={(patch) => updateSection(s.id, patch)} />
                        </div>
                      ) : null}
                    </div>
                  );
                })}

                {/* add section */}
                <div className="rounded-xl border border-dashed border-ink-600 p-3.5">
                  <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-ink-400">Add a section</div>
                  <div className="flex flex-wrap gap-1.5">
                    {[...missingKinds, "custom" as SectionKind].map((k) => (
                      <button
                        key={k}
                        type="button"
                        onClick={() => addSection(k)}
                        className="rounded-full border border-ink-600 px-3 py-1 text-[12px] font-medium text-ink-300 transition hover:border-brand-400 hover:text-brand-300"
                      >
                        + {SECTION_LABEL[k]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* desk / preview */}
        <main
          className={`min-h-0 flex-1 ${mobileTab === "preview" ? "block" : "hidden"} md:block`}
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        >
          <div className="panel-scroll h-[calc(100dvh-96px)] overflow-y-auto px-4 py-8 md:h-[calc(100dvh-56px)] md:px-10">
            <div className="mx-auto max-w-[820px]">
              {isEmpty && !blob ? (
                <div className="mt-24 text-center">
                  <p className="font-display text-3xl italic text-ink-300">A blank page, for now.</p>
                  <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-ink-400">
                    Fill in your details on the left, or load the example resume to see how PaperCV lays things out.
                  </p>
                  <button
                    type="button"
                    onClick={() => setData(structuredClone(SAMPLE_RESUME))}
                    className="mt-6 rounded-lg bg-brand-500 px-5 py-2 text-[13.5px] font-semibold text-white transition hover:bg-brand-400"
                  >
                    Load example resume
                  </button>
                </div>
              ) : (
                <PdfPreview blob={blob} />
              )}
            </div>
          </div>
        </main>
      </div>

      {/* mobile bottom action */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-ink-700 bg-ink-900/95 p-3 backdrop-blur md:hidden">
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading || isEmpty}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-500 py-2.5 text-[14px] font-semibold text-white disabled:opacity-40"
        >
          {Icons.download}
          {downloading ? "Preparing…" : "Download PDF"}
        </button>
      </div>
    </div>
  );
}
