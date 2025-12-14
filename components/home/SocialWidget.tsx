"use client";
import React, { useState } from 'react';
import Script from 'next/script';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function SocialWidget() {
    const [hovered, setHovered] = useState<'agency' | 'dives' | null>(null);

    return (
        <div className="w-full max-w-7xl mx-auto mt-16 p-4 md:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl">
            <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold font-heading mb-2">Live Feeds</h3>
                <p className="text-neutral-500">The Pulse of WaterPlane.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 h-[600px] md:h-[500px]">
                {/* Agency Feed */}
                <motion.div
                    className={cn(
                        "relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950",
                        "cursor-default transition-colors duration-500"
                    )}
                    initial={{ flex: 1 }}
                    animate={{ flex: hovered === 'agency' ? 2 : (hovered === 'dives' ? 1 : 1.5) }}
                    onMouseEnter={() => setHovered('agency')}
                    onMouseLeave={() => setHovered(null)}
                >
                    <div className="absolute top-0 left-0 w-full p-4 bg-white/80 dark:bg-black/80 backdrop-blur-sm z-10 border-b border-neutral-200 dark:border-neutral-800">
                        <h4 className="font-bold flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span> WaterPlane Agency
                        </h4>
                    </div>
                    <div className="w-full h-full overflow-y-auto pt-16">
                        <div className="elfsight-app-7bcf906c-6592-47a5-bff6-29dd2dcebcb6" data-elfsight-app-lazy></div>
                    </div>
                </motion.div>

                {/* Dives Feed */}
                <motion.div
                    className={cn(
                        "relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950",
                        "cursor-default transition-colors duration-500"
                    )}
                    initial={{ flex: 1 }}
                    animate={{ flex: hovered === 'dives' ? 2 : (hovered === 'agency' ? 1 : 1.5) }}
                    onMouseEnter={() => setHovered('dives')}
                    onMouseLeave={() => setHovered(null)}
                >
                    <div className="absolute top-0 left-0 w-full p-4 bg-white/80 dark:bg-black/80 backdrop-blur-sm z-10 border-b border-neutral-200 dark:border-neutral-800">
                        <h4 className="font-bold flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span> WaterPlane Dives
                        </h4>
                    </div>
                    <div className="w-full h-full overflow-y-auto pt-16">
                        <div className="elfsight-app-c43e9aa5-a809-4182-9ce7-0c799974b9f0" data-elfsight-app-lazy></div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
