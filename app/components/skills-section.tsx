"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import skillsData from "@/app/data/skills.json";

type Skill = {
  id: string;
  name: string;
  icon: string;
  image: string;
  level: number;
  summary: string;
  experience: string[];
  projects: string[];
};

type ActiveCard = {
  instanceKey: string;
  skill: Skill;
  fromLeft: number;
  fromTop: number;
  fromWidth: number;
  fromHeight: number;
  toLeft: number;
  toTop: number;
  toWidth: number;
  toHeight: number;
  expanded: boolean;
};

const skills = skillsData as Skill[];

function LevelBars({ level }: { level: number }) {
  const activeBars = Math.max(1, Math.round((level / 100) * 8));
  return (
    <div className="mt-3 sm:mt-6 flex items-center gap-1 sm:gap-1.5">
      {Array.from({ length: 8 }).map((_, index) => (
        <span
          key={index}
          className={`h-[2px] sm:h-[3px] w-3 sm:w-5 rounded-full ${
            index < activeBars ? "bg-[#00f5d4]" : "bg-white/18"
          }`}
        />
      ))}
    </div>
  );
}

function SkillImage({
  skill,
  className,
}: {
  skill: Skill;
  className?: string;
}) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <Image
        src={skill.image}
        alt={`${skill.name} logo`}
        fill
        sizes="(max-width: 640px) 32px, 56px"
        className="h-full w-full object-contain"
        unoptimized
      />
    </div>
  );
}

function CompactCardBody({ skill }: { skill: Skill }) {
  return (
    <div className="h-full w-full rounded-[8px] sm:rounded-[10px] border border-[#00f5d4]/20 bg-[#030d14]/70 px-4 py-5 sm:px-6 sm:py-7 text-left">
      <div className="mb-4 sm:mb-10 inline-flex h-10 w-10 sm:h-16 sm:w-16 items-center justify-center rounded-[6px] sm:rounded-[8px] border border-[#00f5d4]/35 bg-[#041822] p-1.5 sm:p-2.5">
        <SkillImage skill={skill} className="h-7 w-7 sm:h-11 sm:w-11" />
      </div>
      <p className="font-mono text-xl sm:text-[2rem] leading-none text-white/92 truncate">{skill.name}</p>
      <LevelBars level={skill.level} />
    </div>
  );
}

function SkillCard({
  skill,
  instanceKey,
  onEnter,
  onLeave,
}: {
  skill: Skill;
  instanceKey: string;
  onEnter: (skill: Skill, instanceKey: string, element: HTMLButtonElement) => void;
  onLeave: () => void;
}) {
  return (
    <button
      type="button"
      className="h-[140px] w-[160px] sm:h-[220px] sm:w-[300px] shrink-0 rounded-[8px] sm:rounded-[10px] text-left transition duration-200 hover:-translate-y-0.5"
      onMouseEnter={(event) => onEnter(skill, instanceKey, event.currentTarget)}
      onMouseLeave={onLeave}
      onFocus={(event) => onEnter(skill, instanceKey, event.currentTarget)}
      onBlur={onLeave}
      onClick={(event) => onEnter(skill, instanceKey, event.currentTarget)}
      aria-expanded={false}
    >
      <CompactCardBody skill={skill} />
    </button>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const removeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeCard, setActiveCard] = useState<ActiveCard | null>(null);

  const marqueeTop = useMemo(() => [...skills, ...skills], []);
  const marqueeBottom = useMemo(
    () => [...skills.slice().reverse(), ...skills.slice().reverse()],
    []
  );

  const clearTimers = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (removeTimerRef.current) {
      clearTimeout(removeTimerRef.current);
      removeTimerRef.current = null;
    }
  };

  const queueClose = () => {
    clearTimers();
    closeTimerRef.current = setTimeout(() => {
      setActiveCard((previous) =>
        previous ? { ...previous, expanded: false } : previous
      );
      removeTimerRef.current = setTimeout(() => {
        setActiveCard((previous) =>
          previous && !previous.expanded ? null : previous
        );
      }, 220);
    }, 120);
  };

  const openFromCard = (
    skill: Skill,
    instanceKey: string,
    element: HTMLButtonElement
  ) => {
    if (activeCard && activeCard.instanceKey === instanceKey && activeCard.expanded) {
      queueClose();
      return;
    }

    clearTimers();
    const sectionElement = sectionRef.current;
    if (!sectionElement) return;

    const sectionRect = sectionElement.getBoundingClientRect();
    const cardRect = element.getBoundingClientRect();

    const fromLeft = cardRect.left - sectionRect.left;
    const fromTop = cardRect.top - sectionRect.top;
    const fromWidth = cardRect.width;
    const fromHeight = cardRect.height;

    const toWidth = Math.min(760, sectionRect.width - 24);
    const toHeight = Math.min(500, sectionRect.height - 32);

    const preferredLeft = fromLeft - 20;
    const toLeft = Math.max(12, Math.min(sectionRect.width - toWidth - 12, preferredLeft));

    let toTop = fromTop - toHeight - 14;
    if (toTop < 24) toTop = fromTop + fromHeight + 14;
    toTop = Math.max(16, Math.min(sectionRect.height - toHeight - 16, toTop));

    setActiveCard({
      instanceKey,
      skill,
      fromLeft,
      fromTop,
      fromWidth,
      fromHeight,
      toLeft,
      toTop,
      toWidth,
      toHeight,
      expanded: false,
    });

    requestAnimationFrame(() => {
      setActiveCard((previous) =>
        previous && previous.instanceKey === instanceKey
          ? { ...previous, expanded: true }
          : previous
      );
    });
  };

  const pauseMarquee = activeCard !== null;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative mb-16 border-t border-white/10 px-6 pb-32 pt-10 sm:px-8 md:px-12 lg:px-16 2xl:px-20"
    >
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="font-mono text-[1.85rem] text-[#00f5d4]">{"// skills"}</p>
          <p className="mt-2 font-mono text-[2.1rem] text-white/92">
            Full Stack Developer
          </p>
        </div>
        <p className="hidden font-mono text-xl text-[#19dff0]/70 lg:block">
          {"// hover a skill to see more"}
        </p>
      </div>

      <div className="space-y-6 sm:space-y-10" onMouseLeave={queueClose}>
        <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_7%,black_93%,transparent)]">
          <div
            className="flex w-max gap-4 sm:gap-6"
            style={{
              animation: "skills-marquee-left 34s linear infinite",
              animationPlayState: pauseMarquee ? "paused" : "running",
            }}
          >
            {marqueeTop.map((skill, index) => (
              <SkillCard
                key={`${skill.id}-top-${index}`}
                skill={skill}
                instanceKey={`top-${index}`}
                onEnter={openFromCard}
                onLeave={queueClose}
              />
            ))}
          </div>
        </div>

        <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_7%,black_93%,transparent)]">
          <div
            className="flex w-max gap-4 sm:gap-6"
            style={{
              animation: "skills-marquee-right 40s linear infinite",
              animationPlayState: pauseMarquee ? "paused" : "running",
            }}
          >
            {marqueeBottom.map((skill, index) => (
              <SkillCard
                key={`${skill.id}-bottom-${index}`}
                skill={skill}
                instanceKey={`bottom-${index}`}
                onEnter={openFromCard}
                onLeave={queueClose}
              />
            ))}
          </div>
        </div>
      </div>

      {activeCard && (
        <div
          className="absolute z-40"
          style={{
            left: activeCard.expanded ? activeCard.toLeft : activeCard.fromLeft,
            top: activeCard.expanded ? activeCard.toTop : activeCard.fromTop,
            width: activeCard.expanded ? activeCard.toWidth : activeCard.fromWidth,
            height: activeCard.expanded ? activeCard.toHeight : activeCard.fromHeight,
            transition:
              "left 260ms ease, top 260ms ease, width 260ms ease, height 260ms ease",
          }}
          onMouseEnter={clearTimers}
          onMouseLeave={queueClose}
        >
          <div className="relative h-full w-full">
            <div
              className={`absolute inset-0 transition duration-200 ${
                activeCard.expanded ? "opacity-0" : "opacity-100"
              }`}
            >
              <CompactCardBody skill={activeCard.skill} />
            </div>

            <div
              className={`pointer-events-auto absolute inset-0 overflow-hidden rounded-[14px] border border-[#00f5d4]/45 bg-[#03111c]/95 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur transition duration-250 ${
                activeCard.expanded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              }`}
            >
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  queueClose();
                }}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-[10px] border border-white/10 bg-white/5 text-white/70 transition hover:border-white/20 hover:bg-white/10"
                aria-label="Close"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12" />
                  <path d="M18 6l-12 12" />
                </svg>
              </button>

              <div className="grid h-full gap-6 overflow-auto pr-2 md:grid-cols-[230px_1fr]">
                <div className="flex h-full flex-col rounded-[10px] border border-[#00f5d4]/35 bg-[#051a27] p-5">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-[8px] border border-[#00f5d4]/40 bg-[#062234] p-2">
                    <SkillImage skill={activeCard.skill} className="h-10 w-10" />
                  </div>
                  <p className="font-mono text-[2.2rem] leading-none text-white/95">
                    {activeCard.skill.name}
                  </p>
                  <p className="mt-3 font-mono text-base leading-7 text-white/72">
                    {activeCard.skill.summary}
                  </p>
                  <div className="mt-auto pt-6">
                    <p className="mb-2 font-mono text-[0.9rem] tracking-wide text-[#00f5d4]">
                      PROFICIENCY
                    </p>
                    <LevelBars level={activeCard.skill.level} />
                  </div>
                </div>

                <div className="grid h-full gap-4">
                  <div className="rounded-[10px] border border-[#00f5d4]/25 bg-[#041622]/70 p-4">
                    <p className="mb-3 font-mono text-[0.95rem] tracking-wide text-[#00f5d4]">
                      EXPERIENCE
                    </p>
                    <ul className="space-y-2 font-mono text-[1rem] leading-7 text-white/83">
                      {activeCard.skill.experience.map((item) => (
                        <li key={item} className="grid grid-cols-[12px_1fr] gap-2">
                          <span className="text-[#00f5d4]">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-[10px] border border-[#00f5d4]/25 bg-[#041622]/70 p-4">
                    <p className="mb-3 font-mono text-[0.95rem] tracking-wide text-[#00f5d4]">
                      PROJECTS
                    </p>
                    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {activeCard.skill.projects.map((item) => (
                        <li
                          key={item}
                          className="rounded-[6px] border border-[#00f5d4]/25 bg-[#03131e] px-3 py-2 font-mono text-[0.95rem] text-white/84"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
