"use client";
import React from "react";
import { motion } from "framer-motion";
import FadingVideo from "@/components/ui/FadingVideo";
import BlurText from "@/components/ui/BlurText";

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function Play({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <polygon points="6 4 20 12 6 20 6 4" />
    </svg>
  );
}

const fadeUp = {
  hidden: { filter: "blur(10px)", opacity: 0, y: 20 },
  visible: (delay: number) => ({
    filter: "blur(0px)",
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay },
  }),
};

const partners = ["Kunal Eddits", "Pukaar", "Stitch & Soul", "Vivo", "More"];

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Video – 120% size, top-anchored, centred */}
      <FadingVideo
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
        className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0"
        style={{ width: "120%", height: "120%" }}
      />

      {/* z-10 content layer */}
      <div className="relative z-10 flex flex-col h-full">
        {/* ── Hero centred content ── */}
        <div className="flex-1 flex flex-col items-center justify-center pt-24 px-4">
          {/* Badge */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.4}
            variants={fadeUp}
            className="liquid-glass rounded-full flex items-center gap-2 px-1.5 py-1.5 mb-6"
          >
            <span className="bg-white text-black px-3 py-1 rounded-full text-xs font-semibold font-body">
              New
            </span>
            <span className="text-sm text-white/90 pr-3 font-body">
              AI-Powered Growth Agency → Campaigns Live 2025
            </span>
          </motion.div>

          {/* Brand Name */}
          <BlurText
            text="WaterPlane"
            className="text-7xl md:text-8xl lg:text-[9rem] font-serif-heading italic text-white leading-[0.85] max-w-4xl text-center tracking-[-4px]"
          />

          {/* Tagline */}
          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.7}
            variants={fadeUp}
            className="mt-3 text-lg md:text-xl text-white/90 font-serif-heading italic text-center tracking-tight"
          >
            Digital Growth For The New Internet
          </motion.p>

          {/* Description */}
          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.9}
            variants={fadeUp}
            className="mt-3 text-sm md:text-base text-white/70 max-w-xl font-body font-light leading-relaxed text-center"
          >
            Strategy, high-fidelity content, and AI-driven growth for ambitious
            brands. We build digital ecosystems that scale.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={1.2}
            variants={fadeUp}
            className="flex items-center gap-6 mt-6"
          >
            <a
              href="/work"
              className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white flex items-center gap-2 font-body"
            >
              See Our Work <ArrowUpRight className="h-5 w-5" />
            </a>
            <a
              href="/services"
              className="text-white flex items-center gap-2 text-sm font-body"
            >
              View Services <Play className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={1.3}
            variants={fadeUp}
            className="flex items-stretch gap-4 mt-8"
          >
            {/* Stat 1 */}
            <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem] flex flex-col gap-3">
              {/* Clock icon */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <div>
                <p className="text-4xl font-serif-heading italic text-white tracking-[-1px] leading-none">
                  3x
                </p>
                <p className="text-xs text-white font-body font-light mt-2">
                  Average Brand Growth Rate
                </p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem] flex flex-col gap-3">
              {/* Globe icon */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <div>
                <p className="text-4xl font-serif-heading italic text-white tracking-[-1px] leading-none">
                  12+
                </p>
                <p className="text-xs text-white font-body font-light mt-2">
                  Brands Transformed
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Partners row ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={1.4}
          variants={fadeUp}
          className="flex flex-col items-center gap-4 pb-8"
        >
          <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body">
            Trusted by ambitious brands across India
          </span>
          <div className="flex items-center gap-8 md:gap-12 overflow-x-auto no-scrollbar px-4">
            {partners.map((name) => (
              <span
                key={name}
                className="font-serif-heading italic text-white text-xl md:text-2xl tracking-tight whitespace-nowrap"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
