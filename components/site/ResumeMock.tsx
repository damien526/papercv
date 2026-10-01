/* A pure-CSS replica of the "Clean" template, used as the hero visual. */
export default function ResumeMock() {
  return (
    <div className="relative">
      {/* sheet behind, for depth */}
      <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-[1.2deg] rounded-[4px] bg-paper-200/80" />
      <div className="relative rounded-[4px] bg-white p-7 shadow-paper sm:p-9" style={{ aspectRatio: "8.5/11" }}>
        <div className="text-[clamp(17px,2.2vw,24px)] font-bold tracking-tight text-[#19191b]">Maya Lindqvist</div>
        <div className="mt-1 text-[clamp(10px,1.2vw,12.5px)] font-medium text-[#1e3a5f]">Senior Product Designer</div>
        <div className="mt-2 text-[clamp(7px,0.85vw,9px)] text-[#55565c]">
          maya.lindqvist@example.com &nbsp;·&nbsp; +44 7700 900123 &nbsp;·&nbsp; London, UK &nbsp;·&nbsp; linkedin.com/in/maya-lindqvist
        </div>
        <div className="mt-3 h-px bg-[#19191b]" />

        <MockHeading>Summary</MockHeading>
        <p className="mt-1.5 text-[clamp(7px,0.9vw,9.5px)] leading-relaxed text-[#2b2c30]">
          Product designer with 8 years of experience shipping B2B and consumer products from research to launch. Led
          the design of a billing platform used by 40,000 businesses.
        </p>

        <MockHeading>Experience</MockHeading>
        <div className="mt-1.5 flex items-baseline justify-between">
          <div>
            <div className="text-[clamp(7.5px,0.95vw,10px)] font-semibold text-[#19191b]">Senior Product Designer</div>
            <div className="text-[clamp(7px,0.9vw,9.5px)] font-medium text-[#1e3a5f]">Fieldnote</div>
          </div>
          <div className="text-[clamp(6.5px,0.8vw,8.5px)] text-[#55565c]">Mar 2022 - Present</div>
        </div>
        <ul className="mt-1 space-y-0.5 text-[clamp(7px,0.88vw,9.3px)] leading-relaxed text-[#2b2c30]">
          <li className="flex gap-1.5"><span className="text-[#55565c]">•</span>Led the redesign of the invoicing flow, lifting activation by 18%</li>
          <li className="flex gap-1.5"><span className="text-[#55565c]">•</span>Built a 60-component design system adopted by 3 product squads</li>
          <li className="flex gap-1.5"><span className="text-[#55565c]">•</span>Ran 40+ moderated usability sessions across two product lines</li>
        </ul>
        <div className="mt-2 flex items-baseline justify-between">
          <div>
            <div className="text-[clamp(7.5px,0.95vw,10px)] font-semibold text-[#19191b]">Product Designer</div>
            <div className="text-[clamp(7px,0.9vw,9.5px)] font-medium text-[#1e3a5f]">Northbeam Studio</div>
          </div>
          <div className="text-[clamp(6.5px,0.8vw,8.5px)] text-[#55565c]">Jun 2019 - Feb 2022</div>
        </div>
        <ul className="mt-1 space-y-0.5 text-[clamp(7px,0.88vw,9.3px)] leading-relaxed text-[#2b2c30]">
          <li className="flex gap-1.5"><span className="text-[#55565c]">•</span>Designed onboarding and checkout for 12 client products in fintech</li>
        </ul>

        <MockHeading>Skills</MockHeading>
        <p className="mt-1.5 text-[clamp(7px,0.88vw,9.3px)] leading-relaxed text-[#2b2c30]">
          <span className="font-semibold">Design:</span> <span className="text-[#55565c]">Product design, Design systems, Prototyping, Accessibility</span>
        </p>
        <p className="mt-0.5 text-[clamp(7px,0.88vw,9.3px)] leading-relaxed text-[#2b2c30]">
          <span className="font-semibold">Tools:</span> <span className="text-[#55565c]">Figma, Protopie, Webflow, Jira, Notion</span>
        </p>
      </div>
    </div>
  );
}

function MockHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3.5 flex items-center gap-2">
      <span className="text-[clamp(6.5px,0.8vw,8.5px)] font-bold uppercase tracking-[0.16em] text-[#1e3a5f]">
        {children}
      </span>
      <span className="h-px flex-1 bg-[#dcdcd7]" />
    </div>
  );
}
