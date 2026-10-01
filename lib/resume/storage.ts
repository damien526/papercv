import { ResumeData } from "./types";
import { emptyResume } from "./defaults";

const KEY = "papercv:resume:v1";

export function loadResume(): ResumeData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.version === 1 && parsed.basics && Array.isArray(parsed.sections)) {
      return normalize(parsed as ResumeData);
    }
    return null;
  } catch {
    return null;
  }
}

export function saveResume(data: ResumeData): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // storage full or blocked; nothing we can do, data stays in memory
  }
}

export function clearResume(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}

// Merge a parsed object onto a fresh resume so missing fields never crash the app.
export function normalize(input: Partial<ResumeData>): ResumeData {
  const base = emptyResume();
  const settings = { ...base.settings, ...(input.settings ?? {}) };
  const basics = { ...base.basics, ...(input.basics ?? {}) };
  const sections = Array.isArray(input.sections) && input.sections.length > 0 ? input.sections : base.sections;
  return { version: 1, basics, sections, settings };
}

export function importJson(text: string): ResumeData {
  const parsed = JSON.parse(text);
  if (!parsed || typeof parsed !== "object") throw new Error("Not a PaperCV file");
  return normalize(parsed);
}

export function exportJson(data: ResumeData): string {
  return JSON.stringify(data, null, 2);
}

export function isResumeEmpty(data: ResumeData | null): boolean {
  if (!data) return true;
  return (
    !data.basics.fullName &&
    !data.basics.email &&
    data.sections.every((s) => {
      if (s.kind === "summary") return !s.summary?.trim();
      const arr =
        s.experience ?? s.education ?? s.skills ?? s.projects ?? s.certifications ?? s.languages ?? s.custom;
      return !arr || arr.length === 0;
    })
  );
}
