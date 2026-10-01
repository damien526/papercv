import { ResumeData } from "./types";

// Fictional example resume used by the "Load example" button.
export const SAMPLE_RESUME: ResumeData = {
  version: 1,
  basics: {
    fullName: "Maya Lindqvist",
    headline: "Senior Product Designer",
    email: "maya.lindqvist@example.com",
    phone: "+44 7700 900123",
    location: "London, UK",
    website: "mayalindqvist.example.com",
    linkedin: "linkedin.com/in/maya-lindqvist",
    github: "",
  },
  sections: [
    {
      id: "s-summary",
      kind: "summary",
      title: "Summary",
      visible: true,
      summary:
        "Product designer with 8 years of experience shipping B2B and consumer products from research to launch. Led the design of a billing platform used by 40,000 businesses; comfortable owning end-to-end flows, design systems, and the metrics behind them.",
    },
    {
      id: "s-exp",
      kind: "experience",
      title: "Experience",
      visible: true,
      experience: [
        {
          id: "e1",
          role: "Senior Product Designer",
          company: "Fieldnote",
          location: "London, UK",
          startDate: "Mar 2022",
          endDate: "",
          bullets: [
            "Led the redesign of the invoicing flow, cutting time-to-first-invoice from 11 minutes to 4 and lifting activation by 18%",
            "Built and documented a 60-component design system adopted by 3 product squads, reducing design-to-dev handoff time by a third",
            "Ran 40+ moderated usability sessions and turned findings into a quarterly research digest read by the whole company",
          ],
        },
        {
          id: "e2",
          role: "Product Designer",
          company: "Northbeam Studio",
          location: "Manchester, UK",
          startDate: "Jun 2019",
          endDate: "Feb 2022",
          bullets: [
            "Designed onboarding and checkout for 12 client products in fintech and health, including two apps that passed 1M downloads",
            "Introduced usability testing to the studio workflow; client revision rounds dropped from 5 to 2 on average",
          ],
        },
        {
          id: "e3",
          role: "UI Designer",
          company: "Brightside Agency",
          location: "Manchester, UK",
          startDate: "Sep 2017",
          endDate: "May 2019",
          bullets: [
            "Produced UI kits, landing pages, and marketing sites for 20+ clients under tight weekly deadlines",
          ],
        },
      ],
    },
    {
      id: "s-edu",
      kind: "education",
      title: "Education",
      visible: true,
      education: [
        {
          id: "ed1",
          degree: "BA (Hons) Graphic Design",
          school: "Manchester School of Art",
          location: "Manchester, UK",
          startDate: "2014",
          endDate: "2017",
          note: "First-class honours",
        },
      ],
    },
    {
      id: "s-skills",
      kind: "skills",
      title: "Skills",
      visible: true,
      skills: [
        {
          id: "sk1",
          label: "Design",
          skills:
            "Product design, Design systems, Prototyping, Interaction design, Accessibility (WCAG 2.2)",
        },
        {
          id: "sk2",
          label: "Tools",
          skills: "Figma, FigJam, Protopie, Webflow, Jira, Notion",
        },
        {
          id: "sk3",
          label: "Research",
          skills:
            "Usability testing, User interviews, Surveys, A/B test design, Analytics (Amplitude, GA4)",
        },
      ],
    },
    {
      id: "s-cert",
      kind: "certifications",
      title: "Certifications",
      visible: true,
      certifications: [
        {
          id: "c1",
          name: "Certified Professional in Accessibility Core Competencies (CPACC)",
          issuer: "IAAP",
          date: "2024",
        },
      ],
    },
    {
      id: "s-lang",
      kind: "languages",
      title: "Languages",
      visible: true,
      languages: [
        { id: "l1", language: "English", level: "Native" },
        { id: "l2", language: "Swedish", level: "Native" },
        { id: "l3", language: "French", level: "B1" },
      ],
    },
  ],
  settings: {
    template: "clean",
    fontSet: "mixed",
    accent: "#1e3a5f",
    pageSize: "A4",
    density: "normal",
  },
};
