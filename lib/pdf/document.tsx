import React from "react";
import { Document, Link, Page, Text, View } from "@react-pdf/renderer";
import {
  Basics,
  CertificationItem,
  CustomItem,
  EducationItem,
  ExperienceItem,
  LanguageItem,
  ProjectItem,
  ResumeData,
  Section,
  SkillGroup,
  TemplateId,
} from "../resume/types";
import { PdfTheme, buildTheme, dateRange, displayUrl, hrefUrl } from "./theme";

/* ----------------------------- shared blocks ----------------------------- */

function ContactLine({ basics, t, color, center }: { basics: Basics; t: PdfTheme; color: string; center?: boolean }) {
  const entries: { key: string; text: string; href?: string }[] = [];
  if (basics.email) entries.push({ key: "em", text: basics.email });
  if (basics.phone) entries.push({ key: "ph", text: basics.phone });
  if (basics.location) entries.push({ key: "lo", text: basics.location });
  if (basics.website) entries.push({ key: "we", text: displayUrl(basics.website), href: hrefUrl(basics.website) });
  if (basics.linkedin) entries.push({ key: "li", text: displayUrl(basics.linkedin), href: hrefUrl(basics.linkedin) });
  if (basics.github) entries.push({ key: "gh", text: displayUrl(basics.github), href: hrefUrl(basics.github) });
  if (entries.length === 0) return null;
  // Each entry carries its own leading separator so a line break never leaves
  // a dangling dot at the end of a line.
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 6,
        justifyContent: center ? "center" : "flex-start",
      }}
    >
      {entries.map((e, i) => (
        <View key={e.key} style={{ flexDirection: "row" }}>
          {i > 0 ? <Text style={{ fontSize: t.small, color, opacity: 0.55 }}>{"  ·  "}</Text> : null}
          {e.href ? (
            <Link src={e.href} style={{ fontSize: t.small, color, textDecoration: "none", lineHeight: 1.5 }}>
              {e.text}
            </Link>
          ) : (
            <Text style={{ fontSize: t.small, color, lineHeight: 1.5 }}>{e.text}</Text>
          )}
        </View>
      ))}
    </View>
  );
}

function Bullets({ bullets, t }: { bullets: string[]; t: PdfTheme }) {
  const list = bullets.map((b) => b.trim()).filter(Boolean);
  if (list.length === 0) return null;
  return (
    <View style={{ marginTop: 3 }}>
      {list.map((b, i) => (
        <View key={i} style={{ flexDirection: "row", marginBottom: 1.5 }}>
          <Text style={{ width: 11, fontSize: t.body, color: t.muted }}>•</Text>
          <Text style={{ flex: 1, fontSize: t.body, color: t.ink, lineHeight: t.lineHeight }}>{b}</Text>
        </View>
      ))}
    </View>
  );
}

function EntryHeader({
  left,
  leftSub,
  right,
  rightSub,
  t,
}: {
  left: string;
  leftSub?: string;
  right?: string;
  rightSub?: string;
  t: PdfTheme;
}) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
      <View style={{ flex: 1, paddingRight: 10 }}>
        <Text style={{ fontSize: t.body + 0.7, fontWeight: 600, color: t.ink }}>{left}</Text>
        {leftSub ? (
          <Text style={{ fontSize: t.body, fontWeight: 500, color: t.accent, marginTop: 1 }}>{leftSub}</Text>
        ) : null}
      </View>
      <View style={{ alignItems: "flex-end" }}>
        {right ? <Text style={{ fontSize: t.small, color: t.muted }}>{right}</Text> : null}
        {rightSub ? <Text style={{ fontSize: t.small, color: t.faint, marginTop: 1 }}>{rightSub}</Text> : null}
      </View>
    </View>
  );
}

function ExperienceBlock({ items, t, narrow }: { items: ExperienceItem[]; t: PdfTheme; narrow?: boolean }) {
  return (
    <View>
      {items.map((e, i) => (
        <View key={e.id} style={{ marginTop: i === 0 ? 0 : t.itemGap }} minPresenceAhead={28}>
          <EntryHeader
            left={e.role}
            leftSub={e.company}
            right={narrow ? undefined : dateRange(e.startDate, e.endDate)}
            rightSub={narrow ? undefined : e.location}
            t={t}
          />
          {narrow && (e.startDate || e.endDate || e.location) ? (
            <Text style={{ fontSize: t.small, color: t.faint, marginTop: 1 }}>
              {[dateRange(e.startDate, e.endDate), e.location].filter(Boolean).join("  ·  ")}
            </Text>
          ) : null}
          <Bullets bullets={e.bullets} t={t} />
        </View>
      ))}
    </View>
  );
}

function EducationBlock({ items, t, narrow }: { items: EducationItem[]; t: PdfTheme; narrow?: boolean }) {
  return (
    <View>
      {items.map((e, i) => (
        <View key={e.id} style={{ marginTop: i === 0 ? 0 : t.itemGap * 0.8 }} wrap={false}>
          <EntryHeader
            left={e.degree}
            leftSub={e.school}
            right={narrow ? undefined : dateRange(e.startDate, e.endDate)}
            rightSub={narrow ? undefined : e.location}
            t={t}
          />
          {narrow && (e.startDate || e.endDate) ? (
            <Text style={{ fontSize: t.small, color: t.faint, marginTop: 1 }}>{dateRange(e.startDate, e.endDate)}</Text>
          ) : null}
          {e.note ? <Text style={{ fontSize: t.small, color: t.muted, marginTop: 2 }}>{e.note}</Text> : null}
        </View>
      ))}
    </View>
  );
}

function SkillsBlock({ items, t, stacked }: { items: SkillGroup[]; t: PdfTheme; stacked?: boolean }) {
  return (
    <View>
      {items.map((g, i) => (
        <View key={g.id} style={{ marginTop: i === 0 ? 0 : stacked ? 5 : 3.5 }} wrap={false}>
          <Text style={{ fontSize: t.body, lineHeight: t.lineHeight }}>
            {g.label ? <Text style={{ fontWeight: 600, color: t.ink }}>{g.label + ":  "}</Text> : null}
            <Text style={{ color: t.muted }}>{g.skills}</Text>
          </Text>
        </View>
      ))}
    </View>
  );
}

function ProjectsBlock({ items, t }: { items: ProjectItem[]; t: PdfTheme }) {
  return (
    <View>
      {items.map((p, i) => (
        <View key={p.id} style={{ marginTop: i === 0 ? 0 : t.itemGap * 0.85 }} minPresenceAhead={24}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: t.body + 0.5, fontWeight: 600, color: t.ink }}>{p.name}</Text>
            {p.link ? (
              <Link src={hrefUrl(p.link)} style={{ fontSize: t.small, color: t.accent, textDecoration: "none" }}>
                {displayUrl(p.link)}
              </Link>
            ) : null}
          </View>
          {p.description ? (
            <Text style={{ fontSize: t.body, color: t.muted, marginTop: 1.5, lineHeight: t.lineHeight }}>
              {p.description}
            </Text>
          ) : null}
          <Bullets bullets={p.bullets} t={t} />
        </View>
      ))}
    </View>
  );
}

function CertificationsBlock({ items, t }: { items: CertificationItem[]; t: PdfTheme }) {
  return (
    <View>
      {items.map((c, i) => (
        <View key={c.id} style={{ marginTop: i === 0 ? 0 : 4 }} wrap={false}>
          <Text style={{ fontSize: t.body, lineHeight: t.lineHeight }}>
            <Text style={{ fontWeight: 600, color: t.ink }}>{c.name}</Text>
            {c.issuer ? <Text style={{ color: t.muted }}>{",  " + c.issuer}</Text> : null}
            {c.date ? <Text style={{ color: t.faint }}>{"  ·  " + c.date}</Text> : null}
          </Text>
        </View>
      ))}
    </View>
  );
}

function LanguagesBlock({ items, t, stacked }: { items: LanguageItem[]; t: PdfTheme; stacked?: boolean }) {
  const list = items.filter((l) => l.language);
  if (list.length === 0) return null;
  if (stacked) {
    return (
      <View>
        {list.map((l, i) => (
          <View key={l.id} style={{ flexDirection: "row", justifyContent: "space-between", marginTop: i === 0 ? 0 : 3 }}>
            <Text style={{ fontSize: t.body, fontWeight: 500, color: t.ink }}>{l.language}</Text>
            {l.level ? <Text style={{ fontSize: t.small, color: t.muted }}>{l.level}</Text> : null}
          </View>
        ))}
      </View>
    );
  }
  const text = list.map((l) => (l.level ? `${l.language} (${l.level})` : l.language)).join("   ·   ");
  return <Text style={{ fontSize: t.body, color: t.muted, lineHeight: t.lineHeight }}>{text}</Text>;
}

function CustomBlock({ items, t }: { items: CustomItem[]; t: PdfTheme }) {
  return (
    <View>
      {items.map((c, i) => (
        <View key={c.id} style={{ marginTop: i === 0 ? 0 : t.itemGap * 0.85 }} minPresenceAhead={24}>
          <EntryHeader left={c.title} leftSub={c.subtitle || undefined} right={c.date || undefined} t={t} />
          <Bullets bullets={c.bullets} t={t} />
        </View>
      ))}
    </View>
  );
}

function SummaryBlock({ text, t }: { text: string; t: PdfTheme }) {
  return <Text style={{ fontSize: t.body, color: t.ink, lineHeight: t.lineHeight + 0.08 }}>{text}</Text>;
}

function sectionBody(s: Section, t: PdfTheme, opts?: { narrow?: boolean }) {
  switch (s.kind) {
    case "summary":
      return s.summary?.trim() ? <SummaryBlock text={s.summary} t={t} /> : null;
    case "experience":
      return s.experience?.length ? <ExperienceBlock items={s.experience} t={t} narrow={opts?.narrow} /> : null;
    case "education":
      return s.education?.length ? <EducationBlock items={s.education} t={t} narrow={opts?.narrow} /> : null;
    case "skills":
      return s.skills?.length ? <SkillsBlock items={s.skills} t={t} stacked={opts?.narrow} /> : null;
    case "projects":
      return s.projects?.length ? <ProjectsBlock items={s.projects} t={t} /> : null;
    case "certifications":
      return s.certifications?.length ? <CertificationsBlock items={s.certifications} t={t} /> : null;
    case "languages":
      return s.languages?.length ? <LanguagesBlock items={s.languages} t={t} stacked={opts?.narrow} /> : null;
    case "custom":
      return s.custom?.length ? <CustomBlock items={s.custom} t={t} /> : null;
  }
}

function hasContent(s: Section, t: PdfTheme): boolean {
  return s.visible && sectionBody(s, t) !== null;
}

/* ------------------------- section title variants ------------------------ */

function TitleRuled({ title, t }: { title: string; t: PdfTheme }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 7 }}>
      <Text
        style={{
          fontSize: t.heading,
          fontWeight: 700,
          color: t.accent,
          letterSpacing: 1.6,
          textTransform: "uppercase",
          fontFamily: t.headingFont,
        }}
      >
        {title}
      </Text>
      <View style={{ flex: 1, height: 0.75, backgroundColor: t.rule, marginLeft: 10, marginTop: 1 }} />
    </View>
  );
}

function TitleCentered({ title, t }: { title: string; t: PdfTheme }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
      <View style={{ flex: 1, height: 0.75, backgroundColor: t.rule }} />
      <Text
        style={{
          fontSize: t.heading,
          fontWeight: 700,
          color: t.ink,
          letterSpacing: 2.2,
          textTransform: "uppercase",
          marginHorizontal: 12,
          fontFamily: t.headingFont,
        }}
      >
        {title}
      </Text>
      <View style={{ flex: 1, height: 0.75, backgroundColor: t.rule }} />
    </View>
  );
}

function TitleTick({ title, t }: { title: string; t: PdfTheme }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 7 }}>
      <View style={{ width: 3.5, height: t.heading + 3, backgroundColor: t.accent, marginRight: 7, borderRadius: 1 }} />
      <Text
        style={{
          fontSize: t.heading + 0.5,
          fontWeight: 700,
          color: t.ink,
          letterSpacing: 1.2,
          textTransform: "uppercase",
          fontFamily: t.headingFont,
        }}
      >
        {title}
      </Text>
    </View>
  );
}

/* ------------------------------- templates ------------------------------- */

function SectionsColumn({
  sections,
  t,
  Title,
  narrow,
}: {
  sections: Section[];
  t: PdfTheme;
  Title: React.ComponentType<{ title: string; t: PdfTheme }>;
  narrow?: boolean;
}) {
  return (
    <View>
      {sections.map((s, i) => (
        <View key={s.id} style={{ marginTop: i === 0 ? 0 : t.sectionGap }}>
          <Title title={s.title} t={t} />
          {sectionBody(s, t, { narrow })}
        </View>
      ))}
    </View>
  );
}

function CleanTemplate({ data, t }: { data: ResumeData; t: PdfTheme }) {
  const sections = data.sections.filter((s) => hasContent(s, t));
  return (
    <Page size={data.settings.pageSize} style={{ padding: t.margin, fontFamily: t.bodyFont, color: t.ink }}>
      <View style={{ marginBottom: t.sectionGap + 2 }}>
        <Text style={{ fontFamily: t.nameFont, fontSize: t.name, fontWeight: 700, letterSpacing: 0.2 }}>
          {data.basics.fullName}
        </Text>
        {data.basics.headline ? (
          <Text style={{ fontSize: t.headline, color: t.accent, fontWeight: 500, marginTop: 3 }}>
            {data.basics.headline}
          </Text>
        ) : null}
        <ContactLine basics={data.basics} t={t} color={t.muted} />
        <View style={{ height: 1, backgroundColor: t.ink, marginTop: 12, opacity: 0.85 }} />
      </View>
      <SectionsColumn sections={sections} t={t} Title={TitleRuled} />
    </Page>
  );
}

const SIDE_KINDS = new Set(["skills", "education", "certifications", "languages"]);

function CompactTemplate({ data, t }: { data: ResumeData; t: PdfTheme }) {
  const sections = data.sections.filter((s) => hasContent(s, t));
  const main = sections.filter((s) => !SIDE_KINDS.has(s.kind));
  const side = sections.filter((s) => SIDE_KINDS.has(s.kind));
  return (
    <Page size={data.settings.pageSize} style={{ padding: t.margin * 0.92, fontFamily: t.bodyFont, color: t.ink }}>
      <View style={{ marginBottom: t.sectionGap }}>
        <Text style={{ fontFamily: t.nameFont, fontSize: t.name - 1, fontWeight: 700 }}>{data.basics.fullName}</Text>
        {data.basics.headline ? (
          <Text style={{ fontSize: t.headline, color: t.accent, fontWeight: 500, marginTop: 2.5 }}>
            {data.basics.headline}
          </Text>
        ) : null}
        <ContactLine basics={data.basics} t={t} color={t.muted} />
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1.95, paddingRight: 18 }}>
          <SectionsColumn sections={main} t={t} Title={TitleRuled} />
        </View>
        <View style={{ width: 0.75, backgroundColor: t.rule }} />
        <View style={{ flex: 1, paddingLeft: 16 }}>
          <SectionsColumn sections={side} t={t} Title={TitleTick} narrow />
        </View>
      </View>
    </Page>
  );
}

function ExecutiveTemplate({ data, t }: { data: ResumeData; t: PdfTheme }) {
  const sections = data.sections.filter((s) => hasContent(s, t));
  return (
    <Page size={data.settings.pageSize} style={{ padding: t.margin, fontFamily: t.bodyFont, color: t.ink }}>
      <View style={{ marginBottom: t.sectionGap + 4, alignItems: "center" }}>
        <Text
          style={{
            fontFamily: t.nameFont,
            fontSize: t.name + 1,
            fontWeight: 700,
            letterSpacing: 1,
            textAlign: "center",
          }}
        >
          {data.basics.fullName}
        </Text>
        {data.basics.headline ? (
          <Text
            style={{
              fontSize: t.headline - 0.5,
              color: t.accent,
              fontWeight: 600,
              marginTop: 4,
              letterSpacing: 2.4,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            {data.basics.headline}
          </Text>
        ) : null}
        <ContactLine basics={data.basics} t={t} color={t.muted} center />
      </View>
      <SectionsColumn sections={sections} t={t} Title={TitleCentered} />
    </Page>
  );
}

function ContrastTemplate({ data, t }: { data: ResumeData; t: PdfTheme }) {
  const sections = data.sections.filter((s) => hasContent(s, t));
  return (
    <Page size={data.settings.pageSize} style={{ fontFamily: t.bodyFont, color: t.ink }}>
      <View
        style={{
          backgroundColor: t.accent,
          paddingHorizontal: t.margin,
          paddingTop: t.margin * 0.72,
          paddingBottom: t.margin * 0.52,
        }}
      >
        <Text style={{ fontFamily: t.nameFont, fontSize: t.name, fontWeight: 700, color: "#ffffff" }}>
          {data.basics.fullName}
        </Text>
        {data.basics.headline ? (
          <Text style={{ fontSize: t.headline, color: "#ffffff", opacity: 0.88, fontWeight: 500, marginTop: 3 }}>
            {data.basics.headline}
          </Text>
        ) : null}
        <ContactLine basics={data.basics} t={t} color="#ffffff" />
      </View>
      <View style={{ paddingHorizontal: t.margin, paddingTop: t.sectionGap + 4, paddingBottom: t.margin }}>
        <SectionsColumn sections={sections} t={t} Title={TitleTick} />
      </View>
    </Page>
  );
}

const TEMPLATES: Record<TemplateId, React.ComponentType<{ data: ResumeData; t: PdfTheme }>> = {
  clean: CleanTemplate,
  compact: CompactTemplate,
  executive: ExecutiveTemplate,
  contrast: ContrastTemplate,
};

export function ResumeDocument({ data }: { data: ResumeData }) {
  const t = buildTheme(data.settings);
  const Template = TEMPLATES[data.settings.template] ?? CleanTemplate;
  const author = data.basics.fullName || "PaperCV";
  return (
    <Document
      title={`${data.basics.fullName || "Resume"} resume`}
      author={author}
      creator="PaperCV (paper-cv.vercel.app)"
      producer="PaperCV"
    >
      <Template data={data} t={t} />
    </Document>
  );
}
