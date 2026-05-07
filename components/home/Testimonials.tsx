"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface Testimonial {
    content: string;
    author: string;
    image: string;
    projectTitle: string;
}

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const allTestimonials = testimonials.slice(0, 6);
    const count = allTestimonials.length;

    const endX = count <= 2 ? "-30%" : count <= 4 ? "-50%" : "-65%";
    const x = useTransform(scrollYProgress, [0, 1], ["1%", endX]);

    const sectionHeight = count === 0 ? "0vh" : count <= 2 ? "130vh" : count <= 4 ? "180vh" : "240vh";

    if (count === 0) return null;

    return (
        <section ref={targetRef} className="relative bg-white dark:bg-black text-black dark:text-white" style={{ height: sectionHeight }}>
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <div className="absolute top-12 left-12 z-10 max-w-md">
                    <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6">Client Feedback.</h2>
                    <p className="text-lg text-neutral-500">
                        Partners who expanded their horizons with us.
                    </p>
                </div>

                <motion.div style={{ x }} className="flex gap-8 px-12 md:pl-[30vw]">
                    {allTestimonials.map((t, i) => (
                        <div key={i} className="group relative w-[80vw] md:w-[45vw] lg:w-[28vw] flex-shrink-0 bg-neutral-100 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col justify-between gap-5">
                            <div className="flex items-center justify-between">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-neutral-300 dark:border-neutral-700">
                                    <Image src={t.image} alt={t.author} fill className="object-cover" />
                                </div>
                                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 11L8 11C6.89543 11 6 11.8954 6 13V17C6 18.1046 6.89543 19 8 19H11V14C11 12.3431 12.3431 11 14 11H14.5M10 11V11.5C10 12.3284 9.32843 13 8.5 13H8M10 11C10 8.23858 12.2386 6 15 6H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M19.5 11L17.5 11C16.3954 11 15.5 11.8954 15.5 13V17C15.5 18.1046 16.3954 19 17.5 19H20.5V14C20.5 12.3431 21.8431 11 23.5 11H24M19.5 11V11.5C19.5 12.3284 18.8284 13 18 13H17.5M19.5 11C19.5 8.23858 21.7386 6 24.5 6H25.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>

                            <p className="text-sm md:text-base font-medium leading-relaxed text-neutral-700 dark:text-neutral-300">"{t.content}"</p>

                            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4">
                                <p className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-widest">{t.author}</p>
                                <p className="text-xs text-neutral-500 mt-0.5">{t.projectTitle}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
