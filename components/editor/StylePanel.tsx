"use client";

import { ACCENTS, ResumeSettings, TemplateId } from "@/lib/resume/types";
import { Segmented } from "../ui";

/* Miniature CSS sketches of each template so the picker reads at a glance. */
function Thumb({ id, accent }: { id: TemplateId; accent: string }) {
  const line = (w: string, extra = "") => <div className={`h-[3px] rounded-full bg-ink-300/70 ${w} ${extra}`} />;
  const faint = (w: string, extra = "") => <div className={`h-[2.5px] rounded-full bg-ink-400/40 ${w} ${extra}`} />;

  if (id === "contrast")
    return (
      <div className="h-full w-full overflow-hidden rounded-[5px] bg-white">
        <div className="flex h-[34%] flex-col justify-center gap-[3px] px-2" style={{ backgroundColor: accent }}>
          <div className="h-[4px] w-1/2 rounded-full bg-white/90" />
          <div className="h-[2.5px] w-1/3 rounded-full bg-white/60" />
        </div>
        <div className="flex flex-col gap-[4px] px-2 pt-2">
          <div className="flex items-center gap-1">
            <div className="h-[6px] w-[3px] rounded-sm" style={{ backgroundColor: accent }} />
            {line("w-1/4")}
          </div>
          {faint("w-full")}
          {faint("w-5/6")}
          <div className="mt-[2px] flex items-center gap-1">
            <div className="h-[6px] w-[3px] rounded-sm" style={{ backgroundColor: accent }} />
            {line("w-1/3")}
          </div>
          {faint("w-full")}
        </div>
      </div>
    );

  if (id === "compact")
    return (
      <div className="flex h-full w-full flex-col overflow-hidden rounded-[5px] bg-white px-2 pt-2">
        <div className="h-[4px] w-1/2 rounded-full bg-ink-700/80" />
        <div className="mt-[3px] h-[2.5px] w-1/3 rounded-full" style={{ backgroundColor: accent }} />
        <div className="mt-2 flex flex-1 gap-1.5">
          <div className="flex flex-[1.8] flex-col gap-[4px] border-r border-ink-200/60 pr-1.5">
            {line("w-1/2")}
            {faint("w-full")}
            {faint("w-5/6")}
            {faint("w-full")}
          </div>
          <div className="flex flex-1 flex-col gap-[4px]">
            {line("w-3/4")}
            {faint("w-full")}
            {faint("w-2/3")}
          </div>
        </div>
      </div>
    );

  if (id === "executive")
    return (
      <div className="flex h-full w-full flex-col items-center overflow-hidden rounded-[5px] bg-white px-2 pt-2.5">
        <div className="h-[4px] w-1/2 rounded-full bg-ink-700/80" />
        <div className="mt-[3px] h-[2.5px] w-1/4 rounded-full" style={{ backgroundColor: accent }} />
        <div className="mt-2 flex w-full items-center gap-1">
          <div className="h-px flex-1 bg-ink-300/50" />
          {line("w-1/5")}
          <div className="h-px flex-1 bg-ink-300/50" />
        </div>
        <div className="mt-[4px] flex w-full flex-col gap-[4px]">
          {faint("w-full")}
          {faint("w-5/6 mx-auto")}
        </div>
      </div>
    );

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[5px] bg-white px-2 pt-2">
      <div className="h-[4px] w-1/2 rounded-full bg-ink-700/80" />
      <div className="mt-[3px] h-[2.5px] w-1/3 rounded-full" style={{ backgroundColor: accent }} />
      <div className="mt-[5px] h-px w-full bg-ink-700/60" />
      <div className="mt-[5px] flex items-center gap-1">
        <div className="h-[3px] w-1/5 rounded-full" style={{ backgroundColor: accent }} />
        <div className="h-px flex-1 bg-ink-300/50" />
      </div>
      <div className="mt-[4px] flex flex-col gap-[4px]">
        <div className="h-[2.5px] w-full rounded-full bg-ink-400/40" />
        <div className="h-[2.5px] w-5/6 rounded-full bg-ink-400/40" />
      </div>
    </div>
  );
}

const TEMPLATE_OPTIONS: { id: TemplateId; label: string }[] = [
  { id: "clean", label: "Clean" },
  { id: "compact", label: "Compact" },
  { id: "executive", label: "Executive" },
  { id: "contrast", label: "Contrast" },
];

export default function StylePanel({
  settings,
  onChange,
}: {
  settings: ResumeSettings;
  onChange: (patch: Partial<ResumeSettings>) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-ink-400">Template</div>
        <div className="grid grid-cols-4 gap-2">
          {TEMPLATE_OPTIONS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange({ template: t.id })}
              className={`group flex flex-col items-center gap-1.5 rounded-lg border p-1.5 pt-2 transition ${
                settings.template === t.id
                  ? "border-brand-500 bg-brand-500/10"
                  : "border-ink-600 hover:border-ink-500 hover:bg-ink-700/40"
              }`}
            >
              <div className="aspect-[8.5/11] w-full overflow-hidden rounded-[6px] shadow-sm">
                <Thumb id={t.id} accent={settings.accent} />
              </div>
              <span
                className={`text-[11px] font-medium ${
                  settings.template === t.id ? "text-brand-300" : "text-ink-400 group-hover:text-ink-200"
                }`}
              >
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-ink-400">Accent color</div>
        <div className="flex flex-wrap items-center gap-2">
          {ACCENTS.map((a) => (
            <button
              key={a.value}
              type="button"
              title={a.label}
              aria-label={a.label}
              onClick={() => onChange({ accent: a.value })}
              className={`h-7 w-7 rounded-full transition ${
                settings.accent === a.value
                  ? "ring-2 ring-brand-400 ring-offset-2 ring-offset-ink-800"
                  : "hover:scale-110"
              }`}
              style={{ backgroundColor: a.value }}
            />
          ))}
          <label
            className="relative grid h-7 w-7 cursor-pointer place-items-center overflow-hidden rounded-full border border-ink-500 text-[13px] text-ink-300 transition hover:border-ink-300"
            title="Custom color"
          >
            +
            <input
              type="color"
              value={settings.accent}
              onChange={(e) => onChange({ accent: e.target.value })}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-ink-400">Typography</div>
          <Segmented
            size="sm"
            value={settings.fontSet}
            onChange={(v) => onChange({ fontSet: v })}
            options={[
              { label: "Sans", value: "sans" },
              { label: "Serif", value: "serif" },
              { label: "Mixed", value: "mixed" },
            ]}
          />
        </div>
        <div>
          <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-ink-400">Paper</div>
          <Segmented
            size="sm"
            value={settings.pageSize}
            onChange={(v) => onChange({ pageSize: v })}
            options={[
              { label: "A4", value: "A4" },
              { label: "US Letter", value: "LETTER" },
            ]}
          />
        </div>
      </div>

      <div>
        <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-ink-400">Density</div>
        <Segmented
          size="sm"
          value={settings.density}
          onChange={(v) => onChange({ density: v })}
          options={[
            { label: "Compact", value: "compact" },
            { label: "Normal", value: "normal" },
            { label: "Relaxed", value: "relaxed" },
          ]}
        />
      </div>
    </div>
  );
}
