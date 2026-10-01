import { ResumeData, Section, uid } from "./types";

export function emptySection(kind: Section["kind"]): Section {
  const base = { id: uid(), kind, visible: true };
  switch (kind) {
    case "summary":
      return { ...base, title: "Summary", summary: "" };
    case "experience":
      return { ...base, title: "Experience", experience: [] };
    case "education":
      return { ...base, title: "Education", education: [] };
    case "skills":
      return { ...base, title: "Skills", skills: [] };
    case "projects":
      return { ...base, title: "Projects", projects: [] };
    case "certifications":
      return { ...base, title: "Certifications", certifications: [] };
    case "languages":
      return { ...base, title: "Languages", languages: [] };
    case "custom":
      return { ...base, title: "Section", custom: [] };
  }
}

export function emptyResume(): ResumeData {
  return {
    version: 1,
    basics: {
      fullName: "",
      headline: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      github: "",
    },
    sections: [
      emptySection("summary"),
      emptySection("experience"),
      emptySection("education"),
      emptySection("skills"),
    ],
    settings: {
      template: "clean",
      fontSet: "mixed",
      accent: "#1e3a5f",
      pageSize: "A4",
      density: "normal",
    },
  };
}
