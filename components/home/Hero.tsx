"use client";
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TextReveal from '@/components/ui/TextReveal';
import MagneticButton from '@/components/ui/MagneticButton';
import { ArrowDownRight } from 'lucide-react';
import Image from 'next/image';
import ASMRStaticBackground from '@/components/ui/asmr-background';

export default function Hero() {
    const { scrollY } = useScroll();
    const logoScale = useTransform(scrollY, [0, 500], [1, 1.5]);
    const logoOpacity = useTransform(scrollY, [0, 300], [0.1, 0]);

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-black text-black dark:text-white px-4">

            {/* ASMR Static Background */}
            <div className="absolute inset-0 z-0">
                <ASMRStaticBackground />
            </div>

            {/* Immersive Logo Backdrop */}
            <motion.div
                style={{ scale: logoScale, opacity: logoOpacity }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
            >
                <div className="relative w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] opacity-20 dark:opacity-10 blur-3xl">
                    <Image
                        src="/logos/waterplane-white_text_blackBG.svg" // Using white logo for dark mode effect primarily, logic handled by CSS blend if needed but simple opacity is safer
                        alt="WaterPlane Background"
                        fill
                        className="hidden dark:block object-contain"
                    />
                    <Image
                        src="/logos/waterplane-black_text_WhiteBG.svg" // Using black logo for light mode
                        alt="WaterPlane Background"
                        fill
                        className="block dark:hidden object-contain"
                    />
                </div>
            </motion.div>

            {/* Main Logo Branding (Front and Center) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] md:w-[30vw] h-[20vh] z-0 opacity-5">
                <Image
                    src="/logos/waterplane-white_text_blackBG.svg"
                    alt="WaterPlane Logo Immersive"
                    fill
                    className="hidden dark:block object-contain"
                />
                <Image
                    src="/logos/waterplane-black_text_WhiteBG.svg"
                    alt="WaterPlane Logo Immersive"
                    fill
                    className="block dark:hidden object-contain"
                />
            </div>


            <div className="container mx-auto flex flex-col items-center text-center z-10 w-full">
                {/* Logo Container - Scaled to be dominant */}
                <div className="mb-14 relative w-[80vw] h-[25vw] md:w-[950px] md:h-[240px]">
                    <Image
                        src="/logos/waterplane-white_text_blackBG.svg"
                        alt="WaterPlane"
                        fill
                        className="hidden dark:block object-contain"
                        priority
                    />
                    <Image
                        src="/logos/waterplane-black_text_WhiteBG.svg"
                        alt="WaterPlane"
                        fill
                        className="block dark:hidden object-contain"
                        priority
                    />
                </div>

                <h1 className="text-[10vw] md:text-[6vw] leading-[0.9] font-black font-heading tracking-wide mb-8 text-neutral-950 dark:text-neutral-100">
                    <TextReveal>DIGITAL GROWTH</TextReveal>
                    <br />
                    <TextReveal delay={0.2}>FOR THE NEW INTERNET</TextReveal>
                </h1>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-4xl mt-10 p-4">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="text-lg md:text-xl font-medium text-neutral-500 max-w-lg text-center"
                    >
                        We help ambitious brands and creators move from offline to online. Strategy, high-fidelity content, and AI-driven growth.
                    </motion.p>
                </div>

                <div className="mt-8 flex gap-4">
                    <a href="/services" className="inline-block">
                        <MagneticButton className="bg-black text-white dark:bg-white dark:text-black flex items-center gap-2 px-8 py-4 text-sm md:text-base">
                            See What We Do <ArrowDownRight size={18} />
                        </MagneticButton>
                    </a>
                    <a href="/work" className="inline-block">
                        <MagneticButton className="border border-neutral-300 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 px-8 py-4 text-sm md:text-base">
                            Our Work
                        </MagneticButton>
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-400"
            >
                <span className="text-xs font-mono uppercase">Scroll</span>
                <div className="w-[1px] h-12 bg-neutral-300 dark:bg-neutral-800 overflow-hidden">
                    <motion.div
                        className="w-full h-1/2 bg-black dark:bg-white"
                        animate={{ y: ["-100%", "200%"] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                </div>
            </motion.div>
        </section>
    );
}
