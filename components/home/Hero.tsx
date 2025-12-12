"use client";
import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from '@/components/ui/TextReveal';
import MagneticButton from '@/components/ui/MagneticButton';
import { ArrowDownRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-black text-black dark:text-white px-4">
            {/* Background Gradient / Fluid Effect */}
            <div className="absolute inset-0 bg-gradient-radial from-neutral-200/50 via-white to-white dark:from-neutral-900/50 dark:via-black dark:to-black opacity-40 pointer-events-none" />

            <div className="container mx-auto flex flex-col items-center text-center z-10">
                <h1 className="text-[12vw] md:text-[8vw] leading-[0.9] font-black font-heading tracking-tighter mb-8 text-neutral-950 dark:text-neutral-100">
                    <TextReveal>THE DIGITAL</TextReveal>
                    <br />
                    <TextReveal delay={0.2}>GROWTH PARTNER</TextReveal>
                </h1>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full max-w-4xl mt-10 p-4">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="text-lg md:text-xl font-medium text-neutral-500 max-w-md text-left"
                    >
                        We help ambitious brands and creators move from offline to online. Strategy, high-fidelity content, and AI-driven growth.
                    </motion.p>

                    <div className="mt-8 md:mt-0 flex gap-4">
                        <MagneticButton className="bg-black text-white dark:bg-white dark:text-black flex items-center gap-2">
                            See What We Do <ArrowDownRight size={18} />
                        </MagneticButton>
                        <MagneticButton className="border border-neutral-300 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900">
                            Our Work
                        </MagneticButton>
                    </div>
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
