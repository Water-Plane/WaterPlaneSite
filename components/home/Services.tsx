"use client";
import React from "react";
import { motion } from "framer-motion";
import FadingVideo from "@/components/ui/FadingVideo";

const cards = [
  {
    title: "Social & Content Command",
    description:
      "Complete social media management & studio-grade production. High-fidelity content that converts and builds lasting brand identity.",
    tags: ["Content Strategy", "Studio Grade", "Brand Voice", "Social Growth"],
    icon: (
      // Photo / scenery icon
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white">
        <path d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21H5Zm1-4h12l-3.75-5-3 4L9 13l-3 4Z" />
      </svg>
    ),
  },
  {
    title: "Web & Digital Presence",
    description:
      "Full-stack development, CMS & 24/7 maintenance. High-performance websites built with Next.js that rank, convert, and scale.",
    tags: ["Next.js", "Full-Stack", "CMS Ready", "24/7 Support"],
    icon: (
      // Monitor / web icon
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white">
        <path d="M4 6.47 5.76 10H20v8H4V6.47M22 4h-4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.89-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4Z" />
      </svg>
    ),
  },
  {
    title: "AI & Growth Engine",
    description:
      "Next-gen AI content (Sora/Veo) & data-driven SEO. Leverage machine intelligence to scale your brand faster than ever before.",
    tags: ["Sora / Veo", "AI Content", "SEO Growth", "Data-Driven"],
    icon: (
      // Lightbulb / AI icon
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white">
        <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1Zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7Z" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black" id="services">
      {/* Background Video – full bleed */}
      <FadingVideo
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0"
        preload="metadata"
      />

      {/* Content */}
      <div className="relative z-10 px-8 md:px-16 lg:px-20 pt-24 pb-10 flex flex-col min-h-screen">
        {/* ── Header ── */}
        <div className="mb-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm font-body text-white/80 mb-6"
          >
            // Services
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif-heading italic text-white text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px]"
          >
            Growth
            <br />
            evolved
          </motion.h2>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col"
            >
              {/* Top row: icon + tags */}
              <div className="flex items-start justify-between gap-4">
                <div className="liquid-glass rounded-[0.75rem] w-11 h-11 flex items-center justify-center flex-shrink-0">
                  {card.icon}
                </div>
                <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Bottom: title + description */}
              <div className="mt-6">
                <h3 className="font-serif-heading italic text-white text-3xl md:text-4xl tracking-[-1px] leading-none">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm text-white/90 font-body font-light leading-snug max-w-[32ch]">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
