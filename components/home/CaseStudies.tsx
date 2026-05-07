"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface Project {
    slug: string;
    title: string;
    category: string;
    hero_image: string;
}

export default function CaseStudies({ projects }: { projects: Project[] }) {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-black text-white">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <div className="absolute top-12 left-12 z-10">
                    <h2 className="text-4xl md:text-6xl font-bold font-heading">Real Results.<br />Real Growth.</h2>
                </div>

                <motion.div style={{ x }} className="flex gap-12 px-12 pt-32">
                    {projects.map((project, i) => (
                        <div key={i} className="group relative h-[60vh] w-[85vw] md:w-[60vw] lg:w-[40vw] flex-shrink-0 overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800">
                            <Link href={`/work/${project.slug}`} className="block h-full w-full">
                                <div className="absolute inset-0 scale-110 group-hover:scale-100 transition-transform duration-700">
                                    <Image
                                        src={project.hero_image}
                                        alt={project.title}
                                        fill
                                        className="object-cover grayscale brightness-[0.4] blur-[2px] group-hover:grayscale-0 group-hover:brightness-90 group-hover:blur-0 transition-all duration-700"
                                    />
                                </div>
                                <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/90 to-transparent flex flex-col items-start gap-4">
                                    <div>
                                        <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest mb-2 block">{project.category}</span>
                                        <h3 className="text-3xl font-bold font-heading">{project.title}</h3>
                                    </div>

                                    <div className="px-6 py-3 bg-white text-black rounded-full font-medium text-sm hover:scale-105 transition-transform flex items-center gap-2">
                                        Read Case Study
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M7 17L17 7" />
                                            <path d="M7 7h10v10" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
