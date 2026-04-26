"use client";

import { useMemo, useState } from "react";
import journeyData from "@/app/data/journey.json";

type JourneyItem = {
  id: string;
  period: string;
  duration: string;
  organization: string;
  role: string;
  location: string;
  highlights: string[];
  techStack: string[];
};

type JourneyData = {
  professionalExperience: JourneyItem[];
  education: JourneyItem[];
};

const typedJourneyData = journeyData as JourneyData;

type TabMode = "experience" | "education";

function TabButton({
  active,
  label,
  onClick,
  icon,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  icon: "briefcase" | "cap";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-3 border-b pb-3 font-mono text-[1.05rem] transition ${
        active
          ? "border-[#00f5d4] text-[#00f5d4]"
          : "border-white/20 text-white/55 hover:text-white/85"
      }`}
    >
      {icon === "briefcase" ? (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <rect x="3" y="7" width="18" height="13" rx="2" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M2 9l10-5 10 5-10 5L2 9Z" />
          <path d="M6 11v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4" />
          <path d="M22 10v5" />
        </svg>
      )}
      {label}
    </button>
  );
}

export default function JourneySection() {
  const [mode, setMode] = useState<TabMode>("experience");

  const items = useMemo(
    () =>
      mode === "experience"
        ? typedJourneyData.professionalExperience
        : typedJourneyData.education,
    [mode]
  );

  return (
    <section
      id="journey"
      className="relative border-t border-white/10 pb-28 pt-12"
    >
      <div className="mx-auto w-full px-6 sm:px-8 md:px-12 lg:w-[calc(100%-20vw)] lg:px-0">
        <div className="grid items-start gap-10 lg:grid-cols-[0.68fr_1fr]">
          <div>
            <p className="font-mono text-[1.85rem] text-[#00f5d4]">{"// journey"}</p>
            <h2 className="mt-4 max-w-[12ch] font-mono text-[2.6rem] leading-[1.03] text-white sm:text-[3.2rem] md:text-[4.8rem]">
              The path that
              <span className="block text-[#00f5d4]">shaped me_</span>
            </h2>
          </div>

          <div className="relative mt-2 hidden min-h-[210px] lg:block">
            <div className="absolute inset-y-0 right-0 w-[64%]">
              <div className="absolute inset-0 grid grid-cols-[repeat(8,minmax(0,1fr))] gap-x-6 gap-y-4 opacity-55">
                {Array.from({ length: 160 }).map((_, index) => (
                  <span
                    key={index}
                    className={`h-0.5 w-0.5 rounded-full ${
                      index % 8 === 0 ? "bg-[#00f5d4]" : "bg-[#0aa7b6]"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="relative flex h-full items-center justify-start">
              <div className="relative w-full max-w-[460px] px-12 py-10">
                <div className="absolute left-0 top-0 h-10 w-10 border-l border-t border-[#00f5d4]" />
                <div className="absolute bottom-0 right-0 h-10 w-10 border-b border-r border-[#00f5d4]" />
                <p className="font-mono text-[2rem] leading-[1.35] text-center text-white/82">
                  A timeline of my education and work experience so far.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-8">
          <TabButton
            active={mode === "experience"}
            label="Experience"
            onClick={() => setMode("experience")}
            icon="briefcase"
          />
          <TabButton
            active={mode === "education"}
            label="Education"
            onClick={() => setMode("education")}
            icon="cap"
          />
        </div>

        <div className="mt-6 space-y-4">
          {items.map((item, index) => (
            <article key={item.id} className="grid gap-4 lg:grid-cols-[220px_22px_1fr] lg:gap-6">
              <div className="pt-3 font-mono">
                <p className="text-[1.05rem] text-[#00f5d4]">{item.period}</p>
                <p className="mt-1 text-white/55">{item.duration}</p>
              </div>

              <div className="relative hidden lg:block">
                <span
                  className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/18 ${
                    index === items.length - 1 ? "opacity-60" : ""
                  }`}
                />
                <span className="absolute left-1/2 top-3 h-5 w-5 -translate-x-1/2 rounded-full border border-[#00f5d4] bg-[#021118] shadow-[0_0_0_2px_rgba(0,245,212,0.18)]" />
              </div>

              <div className="rounded-[12px] border border-white/10 bg-[#04111b]/75 p-5 md:p-6">
                <div className="grid gap-5 xl:grid-cols-[1fr_360px] xl:gap-7">
                  <div>
                    <h3 className="font-mono text-[2.1rem] leading-none text-white/95">
                      {item.organization}
                    </h3>
                    <p className="mt-2 font-mono text-[1.5rem] text-[#00f5d4]">
                      {item.role}
                    </p>
                    <p className="mt-2 font-mono text-base text-white/58">{item.location}</p>

                    <ul className="mt-4 space-y-2.5 font-mono text-[1.05rem] leading-8 text-white/82">
                      {item.highlights.map((point) => (
                        <li key={point} className="grid grid-cols-[14px_1fr] gap-2">
                          <span className="text-[#00f5d4]">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 border-t border-white/14 pt-5 xl:mt-0 xl:border-t-0 xl:border-l xl:pt-0 xl:pl-6">
                    <p className="mb-3 font-mono text-[1.15rem] text-white/72">Tech Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {item.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-[8px] border border-white/20 bg-[#061a2a] px-3 py-1.5 font-mono text-[1rem] text-[#00f5d4]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
