"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { TextScramble } from '@/components/ui/text-scramble';

const TEAM = [
    "Aamin Simmi Singh",
    "Amrita Chaurasia",
    "Harshit Tiwari",
    "Praneet Kaur",
    "Vansh Dixit",
    "Vansh Gupta",
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-24 px-4">
            <div className="container mx-auto max-w-5xl">
                <header className="mb-24 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-black font-heading mb-8"
                    >
                        FROM OFFLINE <br /> TO ONLINE.
                    </motion.h1>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                        We started in a small room. Now we build entire digital rooms for brands. This is our story.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
                    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl -rotate-1 hover:rotate-0 transition-all duration-500 border border-white/10">
                        <Image
                            src="/journey.jpg"
                            alt="WaterPlane Journey"
                            width={1200}
                            height={800}
                            className="w-full h-auto"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold font-heading mb-6">The Journey</h2>
                        <p className="text-lg text-neutral-400 mb-6 leading-relaxed">
                            WaterPlane was born from a simple observation: Great businesses were failing to translate their offline excellence into online dominance.
                        </p>
                        <p className="text-lg text-neutral-400 leading-relaxed">
                            We bridge that gap. We don&apos;t just &ldquo;post content&rdquo;&mdash;we engineer digital ecosystems. From technical SEO frameworks to cinematic storytelling, we are the architects of the New Internet.
                        </p>
                    </div>
                </div>

                <div className="bg-neutral-900 rounded-3xl p-12 border border-neutral-800 mb-24">
                    <h2 className="text-4xl font-bold font-heading mb-12 text-center">Our Philosophy: The Dual-Track Model</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="p-8 bg-black rounded-2xl border border-neutral-800">
                            <h3 className="text-2xl font-bold mb-4 text-white">Track A: Brand</h3>
                            <p className="text-neutral-400">
                                Building the narrative. Who you are, what you stand for, and why it matters. Long-term equity and recognition.
                            </p>
                        </div>
                        <div className="p-8 bg-black rounded-2xl border border-neutral-800">
                            <h3 className="text-2xl font-bold mb-4 text-white">Track B: Client</h3>
                            <p className="text-neutral-400">
                                Driving the revenue. Lead generation, conversion optimization, and customer service. Immediate impact and ROI.
                            </p>
                        </div>
                    </div>
                    <div className="mt-12 text-center text-neutral-500 font-mono text-sm">
                        Goal Alignment governed by RACI Model.
                    </div>
                </div>

                {/* Team Section */}
                <div>
                    <h2 className="text-4xl font-bold font-heading mb-2 text-center">The Squad.</h2>
                    <p className="text-center text-neutral-500 font-mono text-sm mb-12">The people who make it happen.</p>
                    <div className="grid grid-cols-1 divide-y divide-neutral-800 border border-neutral-800 rounded-2xl overflow-hidden">
                        {TEAM.map((name, i) => (
                            <motion.div
                                key={name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="flex items-center justify-between px-8 py-5 bg-neutral-950 hover:bg-neutral-900 transition-colors group"
                            >
                                <TextScramble
                                    text={name.toUpperCase()}
                                    textClassName="text-xl md:text-2xl font-light tracking-widest"
                                />
                                <span className="text-neutral-700 font-mono text-xs group-hover:text-neutral-400 transition-colors">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
