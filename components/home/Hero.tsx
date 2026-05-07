"use client";
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TextScramble } from '@/components/ui/text-scramble';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { Waves } from '@/components/ui/wave-background';
import { ArrowDownRight } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
    const { scrollY } = useScroll();
    const bgOpacity = useTransform(scrollY, [0, 400], [1, 0]);

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white px-4">

            {/* Wave background */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ opacity: bgOpacity }}
            >
                <Waves
                    strokeColor="rgba(255,255,255,0.12)"
                    backgroundColor="#000000"
                />
            </motion.div>

            {/* Radial vignette so text stays readable at edges */}
            <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(0,0,0,0.6) 100%)',
                }}
            />

            {/* Main Content */}
            <div className="container mx-auto flex flex-col items-center text-center z-10 w-full">

                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-10 relative w-[72vw] h-[22vw] md:w-[860px] md:h-[180px]"
                >
                    <Image
                        src="/logos/waterplane-white_text_blackBG.svg"
                        alt="WaterPlane"
                        fill
                        className="object-contain"
                        priority
                    />
                </motion.div>

                {/* Main heading */}
                <h1 className="leading-none font-black font-heading mb-6 flex flex-col items-center gap-4">
                    <TextScramble
                        text="DIGITAL GROWTH"
                        textClassName="text-[11vw] md:text-[7vw] font-black font-heading leading-none tracking-[0.08em] text-white"
                    />
                    <TextScramble
                        text="FOR THE NEW INTERNET"
                        textClassName="text-[7vw] md:text-[4.5vw] font-black font-heading leading-none tracking-[0.1em] text-white/90"
                    />
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-base md:text-lg font-medium text-white/60 max-w-md text-center mt-2 leading-relaxed"
                >
                    Strategy, high-fidelity content, and AI-driven growth
                    for ambitious brands.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="mt-10 flex flex-wrap gap-4 justify-center"
                >
                    <a href="/services" className="inline-block">
                        <LiquidButton
                            size="lg"
                            className="text-white border border-white/30 flex items-center gap-2 px-8"
                        >
                            See What We Do <ArrowDownRight size={18} />
                        </LiquidButton>
                    </a>
                    <a href="/work" className="inline-block">
                        <LiquidButton
                            size="lg"
                            className="text-white/70 border border-white/15 flex items-center gap-2 px-8 hover:text-white hover:border-white/30 transition-colors"
                        >
                            Our Work
                        </LiquidButton>
                    </a>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
            >
                <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-12 bg-white/20 overflow-hidden">
                    <motion.div
                        className="w-full h-1/2 bg-white"
                        animate={{ y: ["-100%", "200%"] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                </div>
            </motion.div>
        </section>
    );
}
