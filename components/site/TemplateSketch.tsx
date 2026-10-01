import { TemplateId } from "@/lib/resume/types";

/* Light-background CSS sketches of the four templates, used on marketing pages. */
export default function TemplateSketch({ id, accent = "#1e3a5f" }: { id: TemplateId; accent?: string }) {
  const line = (w: string, extra = "") => <div className={`h-[5px] rounded-full bg-[#2b2c30]/70 ${w} ${extra}`} />;
  const faint = (w: string, extra = "") => <div className={`h-[4px] rounded-full bg-[#55565c]/30 ${w} ${extra}`} />;

  if (id === "contrast")
    return (
      <div className="h-full w-full overflow-hidden bg-white">
        <div className="flex h-[30%] flex-col justify-center gap-[6px] px-5" style={{ backgroundColor: accent }}>
          <div className="h-[7px] w-1/2 rounded-full bg-white/90" />
          <div className="h-[4px] w-1/3 rounded-full bg-white/60" />
        </div>
        <div className="flex flex-col gap-[7px] px-5 pt-4">
          <div className="flex items-center gap-2">
            <div className="h-[10px] w-[5px] rounded-sm" style={{ backgroundColor: accent }} />
            {line("w-1/4")}
          </div>
          {faint("w-full")}
          {faint("w-5/6")}
          {faint("w-full")}
          <div className="mt-[3px] flex items-center gap-2">
            <div className="h-[10px] w-[5px] rounded-sm" style={{ backgroundColor: accent }} />
            {line("w-1/3")}
          </div>
          {faint("w-full")}
          {faint("w-2/3")}
        </div>
      </div>
    );

  if (id === "compact")
    return (
      <div className="flex h-full w-full flex-col overflow-hidden bg-white px-5 pt-5">
        <div className="h-[7px] w-1/2 rounded-full bg-[#19191b]/80" />
        <div className="mt-[6px] h-[4px] w-1/3 rounded-full" style={{ backgroundColor: accent }} />
        <div className="mt-4 flex flex-1 gap-3">
          <div className="flex flex-[1.8] flex-col gap-[7px] border-r border-[#dcdcd7] pr-3">
            {line("w-1/2")}
            {faint("w-full")}
            {faint("w-5/6")}
            {faint("w-full")}
            {faint("w-3/4")}
            <div className="mt-[3px]">{line("w-2/5")}</div>
            {faint("w-full")}
            {faint("w-5/6")}
          </div>
          <div className="flex flex-1 flex-col gap-[7px]">
            {line("w-3/4")}
            {faint("w-full")}
            {faint("w-2/3")}
            <div className="mt-[3px]">{line("w-2/3")}</div>
            {faint("w-full")}
            {faint("w-1/2")}
          </div>
        </div>
      </div>
    );

  if (id === "executive")
    return (
      <div className="flex h-full w-full flex-col items-center overflow-hidden bg-white px-5 pt-6">
        <div className="h-[7px] w-1/2 rounded-full bg-[#19191b]/80" />
        <div className="mt-[6px] h-[4px] w-1/4 rounded-full" style={{ backgroundColor: accent }} />
        <div className="mt-[8px] h-[3.5px] w-2/3 rounded-full bg-[#55565c]/25" />
        <div className="mt-5 flex w-full items-center gap-2">
          <div className="h-px flex-1 bg-[#dcdcd7]" />
          {line("w-1/5")}
          <div className="h-px flex-1 bg-[#dcdcd7]" />
        </div>
        <div className="mt-[8px] flex w-full flex-col gap-[7px]">
          {faint("w-full")}
          {faint("w-5/6 mx-auto")}
          {faint("w-full")}
        </div>
        <div className="mt-4 flex w-full items-center gap-2">
          <div className="h-px flex-1 bg-[#dcdcd7]" />
          {line("w-1/4")}
          <div className="h-px flex-1 bg-[#dcdcd7]" />
        </div>
        <div className="mt-[8px] flex w-full flex-col gap-[7px]">
          {faint("w-full")}
          {faint("w-3/4 mx-auto")}
        </div>
      </div>
    );

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-white px-5 pt-5">
      <div className="h-[7px] w-1/2 rounded-full bg-[#19191b]/80" />
      <div className="mt-[6px] h-[4px] w-1/3 rounded-full" style={{ backgroundColor: accent }} />
      <div className="mt-[9px] h-px w-full bg-[#19191b]/60" />
      <div className="mt-[9px] flex items-center gap-2">
        <div className="h-[5px] w-1/5 rounded-full" style={{ backgroundColor: accent }} />
        <div className="h-px flex-1 bg-[#dcdcd7]" />
      </div>
      <div className="mt-[7px] flex flex-col gap-[7px]">
        {faint("w-full")}
        {faint("w-5/6")}
      </div>
      <div className="mt-[12px] flex items-center gap-2">
        <div className="h-[5px] w-1/4 rounded-full" style={{ backgroundColor: accent }} />
        <div className="h-px flex-1 bg-[#dcdcd7]" />
      </div>
      <div className="mt-[7px] flex flex-col gap-[7px]">
        {line("w-2/5")}
        {faint("w-full")}
        {faint("w-5/6")}
        {faint("w-full")}
      </div>
    </div>
  );
}
