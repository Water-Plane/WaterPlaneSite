"use client";
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TextScramble } from '@/components/ui/text-scramble';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { Entropy } from '@/components/ui/entropy';
import { ArrowDownRight } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
    const { scrollY } = useScroll();
    const logoOpacity = useTransform(scrollY, [0, 300], [0.1, 0]);

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white px-4">

            {/* Entropy particle background — screen blend makes black transparent */}
            <div
                className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
                style={{ mixBlendMode: 'screen' }}
            >
                <div style={{ transform: 'translate(-50%, -50%) scale(2)', position: 'absolute', top: '50%', left: '50%' }}>
                    <Entropy size={900} withBackground={false} className="opacity-30" />
                </div>
            </div>

            {/* Immersive Logo Backdrop */}
            <motion.div
                style={{ opacity: logoOpacity }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
            >
                <div className="relative w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] opacity-10 blur-3xl">
                    <Image
                        src="/logos/waterplane-white_text_blackBG.svg"
                        alt="WaterPlane Background"
                        fill
                        className="object-contain"
                    />
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="container mx-auto flex flex-col items-center text-center z-10 w-full">
                {/* Logo */}
                <div className="mb-10 relative w-[80vw] h-[25vw] md:w-[950px] md:h-[200px]">
                    <Image
                        src="/logos/waterplane-white_text_blackBG.svg"
                        alt="WaterPlane"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Main heading with TextScramble */}
                <h1 className="leading-[0.9] font-black font-heading mb-8 flex flex-col items-center gap-2">
                    <TextScramble
                        text="DIGITAL GROWTH"
                        textClassName="text-[10vw] md:text-[6vw] font-black font-heading leading-[0.9] tracking-wide"
                    />
                    <TextScramble
                        text="FOR THE NEW INTERNET"
                        textClassName="text-[7vw] md:text-[4.5vw] font-black font-heading leading-[0.9] tracking-wide"
                    />
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="text-lg md:text-xl font-medium text-neutral-400 max-w-lg text-center mt-4"
                >
                    We help ambitious brands and creators move from offline to online.
                    Strategy, high-fidelity content, and AI-driven growth.
                </motion.p>

                {/* CTAs using LiquidButton */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="mt-10 flex flex-wrap gap-4 justify-center"
                >
                    <a href="/services" className="inline-block">
                        <LiquidButton size="lg" className="text-white border border-white/20 flex items-center gap-2">
                            See What We Do <ArrowDownRight size={18} />
                        </LiquidButton>
                    </a>
                    <a href="/work" className="inline-block">
                        <LiquidButton size="lg" className="text-neutral-300 border border-neutral-700 flex items-center gap-2">
                            Our Work
                        </LiquidButton>
                    </a>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-400"
            >
                <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-12 bg-neutral-800 overflow-hidden">
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
