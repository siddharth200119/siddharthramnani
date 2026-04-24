const dotCells = Array.from({ length: 360 });

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02070d] text-[#f3f5f7]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:96px_96px] opacity-45"
      />

      <header className="relative z-20 flex h-24 w-full items-center justify-between px-8 font-mono text-base md:px-12 lg:px-16 2xl:px-20">
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="text-[#00f5d4]">siddharth</span>
          <span className="truncate text-white/55">@portfolio:~$</span>
          <span className="ml-1 h-6 w-2 shrink-0 animate-pulse bg-white/65" />
        </div>

        <nav className="hidden items-center gap-14 text-white/48 md:flex">
          <a
            href="#about-me"
            className="relative text-[#00f5d4] after:absolute after:-bottom-4 after:left-0 after:h-px after:w-6 after:bg-[#00f5d4]"
          >
            about me
          </a>
          <a href="#skills" className="transition hover:text-[#00f5d4]">
            skills
          </a>
          <a href="#journey" className="transition hover:text-[#00f5d4]">
            journey
          </a>
          <a href="#contact" className="transition hover:text-[#00f5d4]">
            contact
          </a>
        </nav>
      </header>

      <section
        id="about-me"
        className="relative z-10 grid min-h-[calc(100vh-6rem)] w-full grid-cols-1 items-center gap-12 px-8 pb-10 md:px-12 lg:grid-cols-[0.82fr_1.18fr] lg:px-16 xl:gap-20 2xl:px-20"
      >
        <div className="max-w-[720px]">
          <p className="font-mono text-xl text-[#19dff0]">{"// hello, I’m"}</p>

          <h1 className="mt-10 font-mono text-[3.9rem] leading-[0.95] tracking-normal text-white md:text-[6.6rem] xl:text-[7.8rem]">
            Siddharth
            <span className="block text-[#0dc8c5]">Ramnani_</span>
          </h1>

          <p className="mt-10 font-mono text-xl uppercase tracking-[0.24em] text-white/62">
            Curious. Analytical.{" "}
            <span className="text-[#00f5d4]">Always learning.</span>
          </p>

          <div className="mt-12 h-px w-[86%] bg-white/12" />

          <div className="mt-10 space-y-9 font-mono text-xl leading-9 text-white/78">
            <div className="grid grid-cols-[56px_1fr] gap-6">
              <span className="text-2xl text-[#00f5d4]">&gt;_</span>
              <p>
                I’m driven by <span className="text-[#00f5d4]">curiosity</span>{" "}
                and the need to understand how things really work.
              </p>
            </div>

            <div className="grid grid-cols-[56px_1fr] gap-6">
              <span className="text-2xl text-[#00f5d4]">&lt;/&gt;</span>
              <p>
                I don’t just want to use technology; I want to{" "}
                <span className="text-[#00f5d4]">understand</span> it,{" "}
                <span className="text-[#00f5d4]">improve</span> it, and{" "}
                <span className="text-[#00f5d4]">build</span> with it.
              </p>
            </div>

            <div className="grid grid-cols-[56px_1fr] gap-6">
              <span className="text-2xl text-[#00f5d4]">◎</span>
              <p>
                This portfolio isn’t just about what I’ve done; it’s about{" "}
                <span className="text-[#00f5d4]">where I’m heading</span>.
              </p>
            </div>
          </div>

          <a
            id="contact"
            href="mailto:hello@example.com"
            className="group mt-14 inline-flex items-center gap-4 font-mono text-xl text-[#00f5d4] transition hover:text-white"
          >
            <span>&gt; let’s connect</span>
            <span className="relative h-px w-16 bg-white/40 transition group-hover:w-20 group-hover:bg-[#00f5d4]">
              <span className="absolute -right-1 -top-[3px] h-2 w-2 rotate-45 border-r border-t border-current" />
            </span>
          </a>
        </div>

        <div className="relative hidden min-h-[820px] lg:block">
          <div className="absolute inset-y-[5%] left-[4%] right-[2%]">
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
    </main>
  );
}
