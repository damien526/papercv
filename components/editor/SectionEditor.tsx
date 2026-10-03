"use client";

import {
  CertificationItem,
  CustomItem,
  EducationItem,
  ExperienceItem,
  LanguageItem,
  ProjectItem,
  Section,
  SkillGroup,
  uid,
} from "@/lib/resume/types";
import { AddButton, Field, Icons, IconButton, TextArea } from "../ui";

function move<T>(arr: T[], index: number, dir: -1 | 1): T[] {
  const next = [...arr];
  const j = index + dir;
  if (j < 0 || j >= next.length) return next;
  [next[index], next[j]] = [next[j], next[index]];
  return next;
}

function ItemFrame({
  onUp,
  onDown,
  onRemove,
  canUp,
  canDown,
  children,
}: {
  onUp: () => void;
  onDown: () => void;
  onRemove: () => void;
  canUp: boolean;
  canDown: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative mt-3 rounded-xl border border-ink-600/80 bg-ink-850 p-3 first:mt-0">
      <div className="absolute right-2 top-2 flex gap-0.5 opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">
        <IconButton onClick={onUp} title="Move up" disabled={!canUp}>{Icons.up}</IconButton>
        <IconButton onClick={onDown} title="Move down" disabled={!canDown}>{Icons.down}</IconButton>
        <IconButton onClick={onRemove} title="Remove" danger>{Icons.trash}</IconButton>
      </div>
      {children}
    </div>
  );
}

function bulletsToText(bullets: string[]): string {
  return bullets.join("\n");
}
function textToBullets(text: string): string[] {
  return text.split("\n").map((l) => l.replace(/^[-•*]\s*/, ""));
}

export default function SectionEditor({
  section,
  onChange,
}: {
  section: Section;
  onChange: (patch: Partial<Section>) => void;
}) {
  switch (section.kind) {
    case "summary":
      return (
        <TextArea
          label="Professional summary"
          value={section.summary ?? ""}
          onChange={(v) => onChange({ summary: v })}
          placeholder="Two to four sentences: who you are, your strongest results, what you want to do next."
          rows={4}
        />
      );

    case "experience": {
      const items = section.experience ?? [];
      const set = (experience: ExperienceItem[]) => onChange({ experience });
      return (
        <div>
          {items.map((e, i) => (
            <ItemFrame
              key={e.id}
              canUp={i > 0}
              canDown={i < items.length - 1}
              onUp={() => set(move(items, i, -1))}
              onDown={() => set(move(items, i, 1))}
              onRemove={() => set(items.filter((x) => x.id !== e.id))}
            >
              <div className="grid grid-cols-2 gap-2.5">
                <Field label="Job title" value={e.role} onChange={(v) => set(items.map((x) => (x.id === e.id ? { ...x, role: v } : x)))} placeholder="Senior Product Designer" />
                <Field label="Company" value={e.company} onChange={(v) => set(items.map((x) => (x.id === e.id ? { ...x, company: v } : x)))} placeholder="Fieldnote" />
                <Field label="Start" value={e.startDate} onChange={(v) => set(items.map((x) => (x.id === e.id ? { ...x, startDate: v } : x)))} placeholder="Mar 2022" />
                <Field label="End (empty = Present)" value={e.endDate} onChange={(v) => set(items.map((x) => (x.id === e.id ? { ...x, endDate: v } : x)))} placeholder="" />
                <Field className="col-span-2" label="Location" value={e.location} onChange={(v) => set(items.map((x) => (x.id === e.id ? { ...x, location: v } : x)))} placeholder="London, UK" />
              </div>
              <div className="mt-2.5">
                <TextArea
                  label="Achievements"
                  hint="one per line"
                  rows={4}
                  value={bulletsToText(e.bullets)}
                  onChange={(v) => set(items.map((x) => (x.id === e.id ? { ...x, bullets: textToBullets(v) } : x)))}
                  placeholder={"Led the redesign of the invoicing flow, lifting activation by 18%\nBuilt a 60-component design system adopted by 3 squads"}
                />
              </div>
            </ItemFrame>
          ))}
          <AddButton onClick={() => set([...items, { id: uid(), role: "", company: "", location: "", startDate: "", endDate: "", bullets: [] }])}>
            + Add position
          </AddButton>
        </div>
      );
    }

    case "education": {
      const items = section.education ?? [];
      const set = (education: EducationItem[]) => onChange({ education });
      return (
        <div>
          {items.map((e, i) => (
            <ItemFrame
              key={e.id}
              canUp={i > 0}
              canDown={i < items.length - 1}
              onUp={() => set(move(items, i, -1))}
              onDown={() => set(move(items, i, 1))}
              onRemove={() => set(items.filter((x) => x.id !== e.id))}
            >
              <div className="grid grid-cols-2 gap-2.5">
                <Field className="col-span-2" label="Degree" value={e.degree} onChange={(v) => set(items.map((x) => (x.id === e.id ? { ...x, degree: v } : x)))} placeholder="BSc Computer Science" />
                <Field className="col-span-2" label="School" value={e.school} onChange={(v) => set(items.map((x) => (x.id === e.id ? { ...x, school: v } : x)))} placeholder="University of Manchester" />
                <Field label="Start" value={e.startDate} onChange={(v) => set(items.map((x) => (x.id === e.id ? { ...x, startDate: v } : x)))} placeholder="2014" />
                <Field label="End" value={e.endDate} onChange={(v) => set(items.map((x) => (x.id === e.id ? { ...x, endDate: v } : x)))} placeholder="2017" />
                <Field label="Location" value={e.location} onChange={(v) => set(items.map((x) => (x.id === e.id ? { ...x, location: v } : x)))} placeholder="Manchester, UK" />
                <Field label="Note" value={e.note} onChange={(v) => set(items.map((x) => (x.id === e.id ? { ...x, note: v } : x)))} placeholder="First-class honours" />
              </div>
            </ItemFrame>
          ))}
          <AddButton onClick={() => set([...items, { id: uid(), degree: "", school: "", location: "", startDate: "", endDate: "", note: "" }])}>
            + Add education
          </AddButton>
        </div>
      );
    }

    case "skills": {
      const items = section.skills ?? [];
      const set = (skills: SkillGroup[]) => onChange({ skills });
      return (
        <div>
          {items.map((g, i) => (
            <ItemFrame
              key={g.id}
              canUp={i > 0}
              canDown={i < items.length - 1}
              onUp={() => set(move(items, i, -1))}
              onDown={() => set(move(items, i, 1))}
              onRemove={() => set(items.filter((x) => x.id !== g.id))}
            >
              <div className="grid gap-2.5">
                <Field label="Group" value={g.label} onChange={(v) => set(items.map((x) => (x.id === g.id ? { ...x, label: v } : x)))} placeholder="Tools" />
                <Field label="Skills (comma separated)" value={g.skills} onChange={(v) => set(items.map((x) => (x.id === g.id ? { ...x, skills: v } : x)))} placeholder="Figma, Webflow, Jira" />
              </div>
            </ItemFrame>
          ))}
          <AddButton onClick={() => set([...items, { id: uid(), label: "", skills: "" }])}>+ Add skill group</AddButton>
        </div>
      );
    }

    case "projects": {
      const items = section.projects ?? [];
      const set = (projects: ProjectItem[]) => onChange({ projects });
      return (
        <div>
          {items.map((p, i) => (
            <ItemFrame
              key={p.id}
              canUp={i > 0}
              canDown={i < items.length - 1}
              onUp={() => set(move(items, i, -1))}
              onDown={() => set(move(items, i, 1))}
              onRemove={() => set(items.filter((x) => x.id !== p.id))}
            >
              <div className="grid grid-cols-2 gap-2.5">
                <Field label="Project name" value={p.name} onChange={(v) => set(items.map((x) => (x.id === p.id ? { ...x, name: v } : x)))} placeholder="SqueezeVid" />
                <Field label="Link" value={p.link} onChange={(v) => set(items.map((x) => (x.id === p.id ? { ...x, link: v } : x)))} placeholder="github.com/you/project" />
              </div>
              <div className="mt-2.5 grid gap-2.5">
                <Field label="One-line description" value={p.description} onChange={(v) => set(items.map((x) => (x.id === p.id ? { ...x, description: v } : x)))} placeholder="Browser-based video compressor with an exact size target" />
                <TextArea
                  label="Highlights"
                  hint="one per line"
                  rows={3}
                  value={bulletsToText(p.bullets)}
                  onChange={(v) => set(items.map((x) => (x.id === p.id ? { ...x, bullets: textToBullets(v) } : x)))}
                />
              </div>
            </ItemFrame>
          ))}
          <AddButton onClick={() => set([...items, { id: uid(), name: "", link: "", description: "", bullets: [] }])}>+ Add project</AddButton>
        </div>
      );
    }

    case "certifications": {
      const items = section.certifications ?? [];
      const set = (certifications: CertificationItem[]) => onChange({ certifications });
      return (
        <div>
          {items.map((c, i) => (
            <ItemFrame
              key={c.id}
              canUp={i > 0}
              canDown={i < items.length - 1}
              onUp={() => set(move(items, i, -1))}
              onDown={() => set(move(items, i, 1))}
              onRemove={() => set(items.filter((x) => x.id !== c.id))}
            >
              <div className="grid grid-cols-2 gap-2.5">
                <Field className="col-span-2" label="Certification" value={c.name} onChange={(v) => set(items.map((x) => (x.id === c.id ? { ...x, name: v } : x)))} placeholder="AWS Solutions Architect Associate" />
                <Field label="Issuer" value={c.issuer} onChange={(v) => set(items.map((x) => (x.id === c.id ? { ...x, issuer: v } : x)))} placeholder="Amazon Web Services" />
                <Field label="Date" value={c.date} onChange={(v) => set(items.map((x) => (x.id === c.id ? { ...x, date: v } : x)))} placeholder="2025" />
              </div>
            </ItemFrame>
          ))}
          <AddButton onClick={() => set([...items, { id: uid(), name: "", issuer: "", date: "" }])}>+ Add certification</AddButton>
        </div>
      );
    }

    case "languages": {
      const items = section.languages ?? [];
      const set = (languages: LanguageItem[]) => onChange({ languages });
      return (
        <div>
          {items.map((l, i) => (
            <ItemFrame
              key={l.id}
              canUp={i > 0}
              canDown={i < items.length - 1}
              onUp={() => set(move(items, i, -1))}
              onDown={() => set(move(items, i, 1))}
              onRemove={() => set(items.filter((x) => x.id !== l.id))}
            >
              <div className="grid grid-cols-2 gap-2.5">
                <Field label="Language" value={l.language} onChange={(v) => set(items.map((x) => (x.id === l.id ? { ...x, language: v } : x)))} placeholder="French" />
                <Field label="Level" value={l.level} onChange={(v) => set(items.map((x) => (x.id === l.id ? { ...x, level: v } : x)))} placeholder="C1" />
              </div>
            </ItemFrame>
          ))}
          <AddButton onClick={() => set([...items, { id: uid(), language: "", level: "" }])}>+ Add language</AddButton>
        </div>
      );
    }

    case "custom": {
      const items = section.custom ?? [];
      const set = (custom: CustomItem[]) => onChange({ custom });
      return (
        <div>
          {items.map((c, i) => (
            <ItemFrame
              key={c.id}
              canUp={i > 0}
              canDown={i < items.length - 1}
              onUp={() => set(move(items, i, -1))}
              onDown={() => set(move(items, i, 1))}
              onRemove={() => set(items.filter((x) => x.id !== c.id))}
            >
              <div className="grid grid-cols-2 gap-2.5">
                <Field label="Title" value={c.title} onChange={(v) => set(items.map((x) => (x.id === c.id ? { ...x, title: v } : x)))} placeholder="Volunteer, Code Club" />
                <Field label="Date" value={c.date} onChange={(v) => set(items.map((x) => (x.id === c.id ? { ...x, date: v } : x)))} placeholder="2023" />
                <Field className="col-span-2" label="Subtitle" value={c.subtitle} onChange={(v) => set(items.map((x) => (x.id === c.id ? { ...x, subtitle: v } : x)))} placeholder="Weekly coding workshops for teenagers" />
              </div>
              <div className="mt-2.5">
                <TextArea
                  label="Details"
                  hint="one per line"
                  rows={3}
                  value={bulletsToText(c.bullets)}
                  onChange={(v) => set(items.map((x) => (x.id === c.id ? { ...x, bullets: textToBullets(v) } : x)))}
                />
              </div>
            </ItemFrame>
          ))}
          <AddButton onClick={() => set([...items, { id: uid(), title: "", subtitle: "", date: "", bullets: [] }])}>+ Add entry</AddButton>
        </div>
      );
    }
  }
}
