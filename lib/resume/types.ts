export type SectionKind =
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "languages"
  | "custom";

export interface Basics {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string; // empty = Present
  bullets: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  note: string;
}

export interface SkillGroup {
  id: string;
  label: string; // e.g. "Languages", "Tools"
  skills: string; // comma-separated, kept as text for ATS friendliness
}

export interface ProjectItem {
  id: string;
  name: string;
  link: string;
  description: string;
  bullets: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  level: string;
}

export interface CustomItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  bullets: string[];
}

export interface Section {
  id: string;
  kind: SectionKind;
  title: string; // user-editable heading
  visible: boolean;
  // one of the following depending on kind
  summary?: string;
  experience?: ExperienceItem[];
  education?: EducationItem[];
  skills?: SkillGroup[];
  projects?: ProjectItem[];
  certifications?: CertificationItem[];
  languages?: LanguageItem[];
  custom?: CustomItem[];
}

export type TemplateId = "clean" | "compact" | "executive" | "contrast";
export type FontSetId = "sans" | "serif" | "mixed";
export type PageSizeId = "A4" | "LETTER";
export type DensityId = "compact" | "normal" | "relaxed";

export interface ResumeSettings {
  template: TemplateId;
  fontSet: FontSetId;
  accent: string; // hex
  pageSize: PageSizeId;
  density: DensityId;
}

export interface ResumeData {
  version: 1;
  basics: Basics;
  sections: Section[];
  settings: ResumeSettings;
}

export const ACCENTS = [
  { label: "Ink", value: "#1a1c20" },
  { label: "Navy", value: "#1e3a5f" },
  { label: "Blue", value: "#2d55d4" },
  { label: "Teal", value: "#0f766e" },
  { label: "Forest", value: "#2d6a4f" },
  { label: "Burgundy", value: "#7f1d3a" },
  { label: "Rust", value: "#b4451f" },
  { label: "Plum", value: "#6b2d7f" },
];

export function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}
