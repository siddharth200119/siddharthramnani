 "use client";

import { useEffect, useRef, useState } from "react";
import ContactSection from "@/app/components/contact-section";
import JourneySection from "@/app/components/journey-section";
import SkillsSection from "@/app/components/skills-section";

const dotCells = Array.from({ length: 360 });
const navItems = [
  { id: "about-me", label: "about me" },
  { id: "skills", label: "skills" },
  { id: "journey", label: "journey" },
  { id: "contact", label: "contact" },
];

export default function Home() {
  const [activeNav, setActiveNav] = useState("about-me");
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && navItems.some((item) => item.id === hash)) {
        setActiveNav(hash);
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    const updateIndicator = () => {
      const navElement = navRef.current;
      const activeLink = linkRefs.current[activeNav];
      if (!navElement || !activeLink) {
        setIndicator((previous) => ({ ...previous, visible: false }));
        return;
      }

      const navRect = navElement.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setIndicator({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
        visible: true,
      });
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeNav]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#02070d] pt-20 text-[#f3f5f7] md:pt-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:96px_96px] opacity-45"
      />

      <header className="fixed inset-x-0 top-0 z-50 flex h-20 w-full items-center justify-between bg-[#02070d]/90 px-6 font-mono text-sm backdrop-blur sm:px-8 sm:text-base md:h-24 md:px-12 lg:px-16 2xl:px-20">
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="text-[#00f5d4]">siddharth</span>
          <span className="truncate text-white/55">@portfolio:~$</span>
          <span className="ml-1 h-6 w-2 shrink-0 animate-pulse bg-white/65" />
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-[10px] border border-white/10 bg-white/5 text-white/75 transition hover:border-white/20 hover:bg-white/10 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((value) => !value)}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M4 7h16" />
            <path d="M4 12h16" />
            <path d="M4 17h16" />
          </svg>
        </button>

        <nav
          ref={navRef}
          className="relative hidden items-center gap-14 pb-4 text-white/48 md:flex"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              ref={(element) => {
                linkRefs.current[item.id] = element;
              }}
              href={`#${item.id}`}
              onClick={() => setActiveNav(item.id)}
              className={`transition hover:text-[#00f5d4] ${
                activeNav === item.id ? "text-[#00f5d4]" : ""
              }`}
            >
              {item.label}
            </a>
          ))}
          <span
            aria-hidden="true"
            className={`absolute bottom-0 h-px bg-[#00f5d4] transition-[left,width,opacity] duration-300 ${
              indicator.visible ? "opacity-100" : "opacity-0"
            }`}
            style={{ left: indicator.left, width: indicator.width }}
          />
        </nav>
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        id="mobile-nav"
        className={`fixed inset-x-0 top-20 z-50 origin-top border-t border-white/10 bg-[#02070d]/95 px-6 py-5 font-mono text-base backdrop-blur transition md:hidden ${
          mobileOpen ? "scale-y-100 opacity-100" : "pointer-events-none scale-y-95 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => {
                setActiveNav(item.id);
                setMobileOpen(false);
              }}
              className={`flex items-center justify-between rounded-[10px] border border-white/10 bg-white/5 px-4 py-3 transition hover:border-white/20 hover:bg-white/10 ${
                activeNav === item.id ? "text-[#00f5d4]" : "text-white/78"
              }`}
            >
              <span>{item.label}</span>
              <span className="text-white/35">→</span>
            </a>
          ))}
        </div>
      </div>

      <section
        id="about-me"
        className="relative z-10 grid min-h-[calc(100vh-5rem)] w-full grid-cols-1 items-center gap-10 px-6 pb-10 sm:px-8 md:min-h-[calc(100vh-6rem)] md:px-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12 lg:px-16 xl:gap-20 2xl:px-20"
      >
        <div className="max-w-[760px]">
          <p className="font-mono text-base text-[#19dff0] sm:text-lg md:text-xl">
            {"// hello, I’m"}
          </p>

          <h1 className="mt-8 font-mono text-[3.1rem] leading-[0.95] tracking-normal text-white sm:text-[3.8rem] md:mt-10 md:text-[5.2rem] lg:text-[6.4rem] xl:text-[7.8rem]">
            Siddharth
            <span className="block text-[#0dc8c5]">Ramnani_</span>
          </h1>

          <p className="mt-8 font-mono text-sm uppercase tracking-normal text-white/62 sm:text-base md:mt-10 md:text-xl">
            Curious. Analytical.{" "}
            <span className="text-[#00f5d4]">Always learning.</span>
          </p>

          <div className="mt-10 h-px w-[86%] bg-white/12 md:mt-12" />

          <div className="mt-8 space-y-8 font-mono text-base leading-8 text-white/78 sm:mt-10 sm:text-lg sm:leading-9 lg:text-xl">
            <div className="grid grid-cols-[32px_1fr] gap-4 sm:grid-cols-[44px_1fr] sm:gap-6 lg:grid-cols-[56px_1fr]">
              <span className="text-lg text-[#00f5d4] sm:text-xl lg:text-2xl">
                &gt;_
              </span>
              <p>
                I’m driven by <span className="text-[#00f5d4]">curiosity</span>{" "}
                and the need to understand how things really work.
              </p>
            </div>

            <div className="grid grid-cols-[32px_1fr] gap-4 sm:grid-cols-[44px_1fr] sm:gap-6 lg:grid-cols-[56px_1fr]">
              <span className="text-lg text-[#00f5d4] sm:text-xl lg:text-2xl">
                &lt;/&gt;
              </span>
              <p>
                I don’t just want to use technology; I want to{" "}
                <span className="text-[#00f5d4]">understand</span> it,{" "}
                <span className="text-[#00f5d4]">improve</span> it, and{" "}
                <span className="text-[#00f5d4]">build</span> with it.
              </p>
            </div>

            <div className="grid grid-cols-[32px_1fr] gap-4 sm:grid-cols-[44px_1fr] sm:gap-6 lg:grid-cols-[56px_1fr]">
              <span className="text-lg text-[#00f5d4] sm:text-xl lg:text-2xl">
                ◎
              </span>
              <p>
                This portfolio isn’t just about what I’ve done; it’s about{" "}
                <span className="text-[#00f5d4]">where I’m heading</span>.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="group mt-10 inline-flex items-center gap-3 font-mono text-base text-[#00f5d4] transition hover:text-white sm:mt-12 sm:text-lg md:mt-14 md:gap-4 md:text-xl"
          >
            <span>&gt; let’s connect</span>
            <span className="relative h-px w-10 bg-white/40 transition sm:w-14 md:w-16 md:group-hover:w-20 md:group-hover:bg-[#00f5d4]">
              <span className="absolute -right-1 -top-[3px] h-2 w-2 rotate-45 border-r border-t border-current" />
            </span>
          </a>
        </div>

        <div className="relative hidden min-h-[720px] lg:block xl:min-h-[820px] 2xl:min-h-[920px]">
          <div className="absolute inset-y-[6%] left-[4%] right-[2%]">
            <div className="absolute inset-0 grid grid-cols-[repeat(24,minmax(0,1fr))] gap-x-5 gap-y-4 opacity-60">
              {dotCells.map((_, index) => (
                <span
                  key={index}
                  className={`h-0.5 w-0.5 rounded-full ${
                    index % 11 === 0 ? "bg-[#00f5d4]" : "bg-[#0aa7b6]"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="absolute left-[8%] top-[11%] h-8 w-8 border-l border-t border-[#00f5d4]" />
          <div className="absolute bottom-[10%] right-[6%] h-8 w-8 border-b border-r border-[#00f5d4]" />

          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center font-mono text-[10rem] leading-none text-[#0aa7b6] drop-shadow-[0_0_28px_rgba(0,245,212,0.22)]">
            <span className="-mr-8 text-[#0caec1]">&lt;</span>
            <span className="rotate-[13deg] text-[#149bb8]">/</span>
            <span className="-ml-8 text-[#0caec1]">&gt;</span>
          </div>
        </div>
      </section>
      <SkillsSection />
      <JourneySection />
      <ContactSection />
    </main>
  );
}
