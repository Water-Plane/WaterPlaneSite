"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CASE_STUDIES } from '@/lib/data';
import { ArrowUpRight } from 'lucide-react';
import TextReveal from '@/components/ui/TextReveal';

export default function WorkPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4">
            <div className="container mx-auto">
                <header className="mb-24 px-4">
                    <h1 className="text-6xl md:text-9xl font-black font-heading tracking-tighter mb-8">
                        <TextReveal>SELECTED WORK</TextReveal>
                    </h1>
                    <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl font-light leading-relaxed">
                        A collection of projects where we defined digital identities, engineered growth, and built the new internet.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 px-2">
                    {CASE_STUDIES.map((project, index) => (
                        <motion.div
                            key={project.slug}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative flex flex-col gap-6"
                        >
                            <Link href={`/work/${project.slug}`} className="block w-full">
                                <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-neutral-900">
                                    <div className="absolute inset-0 z-10 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                                    <Image
                                        src={project.heroImage}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* Hoverlay Overlay Button */}
                                    <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-lg">
                                            <ArrowUpRight size={20} />
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <div className="flex flex-col gap-2 px-2">
                                <div className="flex justify-between items-start">
                                    <Link href={`/work/${project.slug}`} className="group-hover:underline decoration-1 underline-offset-4 decoration-neutral-500">
                                        <h2 className="text-3xl md:text-4xl font-bold font-heading">{project.title}</h2>
                                    </Link>
                                    <span className="text-xs font-mono uppercase tracking-widest border border-white/20 rounded-full px-3 py-1 text-neutral-400">
                                        {project.category}
                                    </span>
                                </div>
                                <p className="text-neutral-400 line-clamp-2 md:max-w-[90%] text-sm md:text-base">
                                    {project.content.substring(0, 150).replace(/[#*]/g, '')}...
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
