import { TemplateId } from "./resume/types";

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  tagline: string;
  description: string;
  bestFor: string;
  details: string[];
  /**
   * How the template spends the page. Facts here must match `lib/pdf/document.tsx`
   * and `lib/pdf/theme.ts` — point sizes, column ratios, which sections move to a
   * sidebar. If the renderer changes, this changes with it.
   *
   * These two fields exist because the four template pages used to carry about
   * 210 words each, one `<h2>` ("Other templates"), and an `<h1>` that did not
   * contain the word "resume". They were the thinnest pages on the site and the
   * ones a search for "clean resume template" was supposed to land on.
   */
  layout: { title: string; body: string[] };
  /** What an applicant tracking system actually receives from this layout. */
  ats: string[];
  /** Honest redirection, and the internal links that come with it. */
  insteadOf: { id: TemplateId; when: string }[];
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
    layout: {
      title: "How Clean uses the page",
      body: [
        "Your name sits at 24pt at the top left, your headline directly under it in your accent color, and your contact details on one line below that. A full-width hairline closes the header, and from there the page is one column: section title, entries, section title, entries, all the way down.",
        "Every section heading carries a thin rule that runs to the right edge, which is the only ornament in the template. Dates and locations are pushed to the right margin on each entry, so a recruiter skimming the right-hand edge gets your timeline without reading a word of the left-hand side. Body text is set at 9.3pt on 1.42 line height inside a 46pt margin — roughly 16mm of white space on all four sides, which is what keeps a dense page readable.",
        "Because nothing is boxed, floated or absolutely positioned, the page grows and shrinks honestly: add two jobs and the content flows onto a second page rather than shuffling the layout around. Switch the density to compact and the type and spacing scale down together, which buys back about a fifth of the vertical space before anything starts to feel tight.",
      ],
    },
    ats: [
      "One column means one reading order, so there is no ambiguity about what the parser sees first.",
      "Every line is real text in the PDF, including the name and the contact details — nothing is an image.",
      "Section titles are plain words (\"Experience\", \"Education\"), which is what keyword matchers look for.",
    ],
    insteadOf: [
      { id: "compact", when: "you have more skills and certifications than will fit in one column" },
      { id: "executive", when: "you are applying for senior roles and want a calmer, centered header" },
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
    layout: {
      title: "What goes in the sidebar, and what does not",
      body: [
        "The split is not a slider you set — it is a rule about section kinds. Skills, education, certifications and languages move to the narrow column; experience, projects, summary and anything custom stay in the wide one. The two columns are weighted roughly two to one, separated by a three-quarter-point vertical rule, with the sidebar titles marked by a short accent tick instead of a full-width line.",
        "That division is what recovers the space. Those four section kinds are the ones made of short items — a list of tools, two degrees, a certification, three languages — and in a single column each of them burns a full page width on text that occupies a third of it. Moved to the sidebar, they stack in the room they actually need while your experience gets the wide measure it deserves.",
        "The header stays full width above both columns, with the name a point smaller than Clean sets it and the page margin at 92% of standard, which are the two further concessions to fitting on one page. If you are a page and a bit long in Clean, this layout is usually what brings you back to one without touching a word of your copy.",
      ],
    },
    ats: [
      "The columns are not a table. The PDF holds the main column's text first and the sidebar's after it, so a parser reads your experience, then your skills — never two columns interleaved line by line.",
      "Everything is selectable text, so a copy-paste into an application form comes out in a sensible order.",
      "If you would rather not rely on any of that, Clean is the single-column version of the same typography.",
    ],
    insteadOf: [
      { id: "clean", when: "you already fit on one page and want the simplest possible structure" },
      { id: "contrast", when: "you want the top of the page to make a visual statement" },
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
    layout: {
      title: "Why the centered header reads as senior",
      body: [
        "Executive centers everything in the header and spaces it out. Your name is set a point larger than the other templates use, with letter spacing opened up slightly; your headline sits under it in small caps with wide tracking; your contact line is centered beneath both. The effect is a letterhead rather than a heading, and it is the one deliberate piece of styling in the template.",
        "Section titles are centered too, framed by a rule on each side, so the page reads as a series of balanced blocks rather than a list. Everything below the header is a single column at the standard margin — the restraint is the point. There is no accent band, no sidebar, no color beyond the headline and the section titles.",
        "This is the template that most rewards the typography setting. With Serif, body and headings are both set in Source Serif and the whole page takes on the tone of a printed document; with Mixed, your name is serif and the body stays in Inter, which keeps the long passages crisp while the letterhead still carries weight. Either pairing is what makes the layout feel considered rather than plain.",
      ],
    },
    ats: [
      "Centered text parses exactly like left-aligned text: alignment is a visual property, not a structural one.",
      "The rules flanking each section title are drawn shapes, not characters, so they never end up inside your section headings as stray punctuation.",
      "The small-caps headline is real text with tracking applied, not an image or a font trick — it extracts as the words you typed.",
    ],
    insteadOf: [
      { id: "clean", when: "you want the same restraint with a conventional left-aligned header" },
      { id: "compact", when: "your experience runs long and you need the page back" },
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
    layout: {
      title: "One strong statement, then get out of the way",
      body: [
        "The accent band runs edge to edge. Unlike the other three templates, the page itself carries no padding in Contrast — the colored header supplies its own, which is what lets the color reach the paper's edge instead of floating in a white frame. Your name, headline and contact line sit on top of it in white, the headline at slightly reduced opacity so the name stays dominant.",
        "Below the band, the template goes quiet: one column, standard margins, and a short thick tick in your accent color marking each section title. That is the whole design. The reason it works is the contrast in the name — a single loud element followed by a page that behaves itself, rather than color sprinkled throughout competing with your sentences.",
        "The band takes its color from the accent you pick in the builder, so this is the template where that choice matters most. A saturated color reads as design or marketing; a deep navy or forest green reads as a conservative firm that happens to have a cover. Both are one click apart, and the rest of the page does not change.",
      ],
    },
    ats: [
      "The colored band is a filled rectangle with text drawn on top, not an image of text — your name and email extract as characters.",
      "White-on-color type is still type. Parsers read the text layer and never see the color at all.",
      "If a specific employer's system worries you, the same content in Clean is one click away and loses only the band.",
    ],
    insteadOf: [
      { id: "clean", when: "the application is conservative and you want no color at all" },
      { id: "executive", when: "you want presence without color, from typography instead" },
    ],
  },
];

export function templateMeta(slug: string): TemplateMeta | undefined {
  return TEMPLATES_META.find((t) => t.id === slug);
}
