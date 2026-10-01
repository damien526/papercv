import { DensityId, FontSetId, ResumeSettings } from "../resume/types";

export interface PdfTheme {
  accent: string;
  ink: string;
  muted: string;
  faint: string;
  rule: string;
  bodyFont: string;
  headingFont: string;
  nameFont: string;
  // sizes in pt
  name: number;
  headline: number;
  heading: number;
  body: number;
  small: number;
  // spacing in pt
  margin: number;
  sectionGap: number;
  itemGap: number;
  lineHeight: number;
}

const DENSITY: Record<DensityId, { space: number; size: number }> = {
  compact: { space: 0.8, size: 0.95 },
  normal: { space: 1, size: 1 },
  relaxed: { space: 1.22, size: 1.03 },
};

const FONTS: Record<FontSetId, { body: string; heading: string; name: string }> = {
  sans: { body: "Inter", heading: "Inter", name: "Inter" },
  serif: { body: "SourceSerif", heading: "SourceSerif", name: "SourceSerif" },
  mixed: { body: "Inter", heading: "Inter", name: "SourceSerif" },
};

export function buildTheme(settings: ResumeSettings): PdfTheme {
  const d = DENSITY[settings.density];
  const f = FONTS[settings.fontSet];
  return {
    accent: settings.accent,
    ink: "#19191b",
    muted: "#55565c",
    faint: "#8a8b92",
    rule: "#dcdcd7",
    bodyFont: f.body,
    headingFont: f.heading,
    nameFont: f.name,
    name: 24 * d.size,
    headline: 10.5 * d.size,
    heading: 9 * d.size,
    body: 9.3 * d.size,
    small: 8.4 * d.size,
    margin: 46 * (settings.density === "compact" ? 0.85 : 1),
    sectionGap: 14 * d.space,
    itemGap: 9 * d.space,
    lineHeight: 1.42,
  };
}

export function displayUrl(value: string): string {
  return value.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function hrefUrl(value: string): string {
  if (/^https?:\/\//.test(value)) return value;
  return "https://" + value;
}

export function dateRange(start: string, end: string): string {
  if (!start && !end) return "";
  if (!start) return end;
  return `${start} - ${end || "Present"}`;
}
