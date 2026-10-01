import { TemplateId } from "./resume/types";

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  tagline: string;
  description: string;
  bestFor: string;
  details: string[];
}

export const TEMPLATES_META: TemplateMeta[] = [
  {
    id: "clean",
    name: "Clean",
    tagline: "A single-column classic that recruiters can scan in seconds",
    description:
      "Clean is the template to pick when you are not sure which template to pick. One column, a strong name line, discreet section rules, and nothing that gets between a recruiter and your experience. It parses perfectly in applicant tracking systems because it is plain, honest typography on a page.",
    bestFor: "Any role, any seniority. The safest choice for corporate applications.",
    details: [
      "Single column, top-to-bottom reading order",
      "Section headings in your accent color with a hairline rule",
      "Dates and locations right-aligned so the eye can skim them",
    ],
  },
  {
    id: "compact",
    name: "Compact",
    tagline: "Two columns that fit more on one page without feeling crowded",
    description:
      "Compact moves your skills, education, certifications, and languages into a narrow sidebar, which frees the main column for what recruiters read first: your experience. If you keep getting told your resume runs onto a second page, this layout usually brings it back to one.",
    bestFor: "People with many skills or certifications, and anyone fighting the one-page limit.",
    details: [
      "Main column for experience and projects, sidebar for the rest",
      "Reading order stays linear for applicant tracking systems",
      "Hairline divider instead of boxes, so the page stays light",
    ],
  },
  {
    id: "executive",
    name: "Executive",
    tagline: "A centered, understated layout with serif presence",
    description:
      "Executive centers your name and title like a letterhead and frames each section heading between two rules. Paired with the serif typography option it reads calm and senior, the kind of resume you expect from someone who has nothing to prove with decoration.",
    bestFor: "Senior roles, management, law, finance, academia.",
    details: [
      "Centered letterhead header with wide letter spacing",
      "Section titles framed by symmetric rules",
      "Works beautifully with the Serif and Mixed typography options",
    ],
  },
  {
    id: "contrast",
    name: "Contrast",
    tagline: "A bold color header that makes the top of your resume unmissable",
    description:
      "Contrast opens with a full-width band in your accent color, white name and contact on top of it, then switches to a quiet single column. You get one strong visual statement and then the content takes over. Despite the color, it stays fully ATS-safe: everything is real text.",
    bestFor: "Design, marketing, product, startups, any role where a bit of personality helps.",
    details: [
      "Full-bleed accent header with white type",
      "Thick accent ticks mark each section",
      "Everything remains selectable, parseable text",
    ],
  },
];

export function templateMeta(slug: string): TemplateMeta | undefined {
  return TEMPLATES_META.find((t) => t.id === slug);
}
