"use client";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative border-t border-white/10 px-6 pb-28 pt-14 sm:px-8 md:px-12 lg:px-16 2xl:px-20"
    >
      <div className="mx-auto grid w-full max-w-[1640px] gap-10 lg:grid-cols-[0.72fr_1fr]">
        <div>
          <p className="font-mono text-[1.85rem] text-[#00f5d4]">{"// contact"}</p>
          <h2 className="mt-4 max-w-[11ch] font-mono text-[2.8rem] leading-[1.03] text-white sm:text-[3.4rem] md:text-[4.8rem]">
            Let&apos;s build
            <span className="block text-[#00f5d4]">something real_</span>
          </h2>
          <p className="mt-6 max-w-[32ch] font-mono text-[1.05rem] leading-8 text-white/72 md:text-[1.2rem]">
            If you want to talk about product engineering, AI systems, or a
            project worth building carefully, reach out directly.
          </p>
        </div>

        <div className="grid gap-4">
          <a
            href="mailto:siddramnani@gmail.com"
            className="group rounded-[12px] border border-white/10 bg-[#04111b]/75 px-5 py-5 transition hover:border-[#00f5d4]/45 hover:bg-[#051723]"
          >
            <p className="font-mono text-[0.95rem] uppercase tracking-wide text-[#00f5d4]">
              Email
            </p>
            <p className="mt-3 break-all font-mono text-[1.5rem] leading-tight text-white sm:text-[1.9rem]">
              siddramnani@gmail.com
            </p>
            <p className="mt-4 font-mono text-[0.95rem] text-white/45 transition group-hover:text-white/70">
              mailto:siddramnani@gmail.com
            </p>
          </a>

          <a
            href="https://twitter.com/Siddharth200119"
            target="_blank"
            rel="noreferrer"
            className="group rounded-[12px] border border-white/10 bg-[#04111b]/75 px-5 py-5 transition hover:border-[#00f5d4]/45 hover:bg-[#051723]"
          >
            <p className="font-mono text-[0.95rem] uppercase tracking-wide text-[#00f5d4]">
              Twitter
            </p>
            <p className="mt-3 font-mono text-[1.5rem] leading-tight text-white sm:text-[1.9rem]">
              @Siddharth200119
            </p>
            <p className="mt-4 font-mono text-[0.95rem] text-white/45 transition group-hover:text-white/70">
              twitter.com/Siddharth200119
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
