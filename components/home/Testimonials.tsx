"use client";
import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
    "WaterPlane completely transformed our digital presence...",
    "Professional, fast, and incredibly creative...",
    "The quality of production is unmatched...",
    "A true partner in growth...",
    "Exceeded all our expectations...",
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-white dark:bg-black overflow-hidden relative">
            <div className="flex whitespace-nowrap">
                {[...Array(2)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ x: 0 }}
                        animate={{ x: "-100%" }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                        className="flex gap-16 pr-16"
                    >
                        {testimonials.map((text, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                                <span className="text-5xl md:text-7xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 via-neutral-500 to-neutral-900 dark:from-neutral-100 dark:via-neutral-500 dark:to-neutral-100 opacity-50 hover:opacity-100 transition-opacity cursor-default">
                                    {text}
                                </span>
                                <div className="w-4 h-4 rounded-full bg-neutral-900 dark:bg-white" />
                            </div>
                        ))}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
