"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface Testimonial {
    content: string;
    author: string;
    image: string;
}

export default function TestimonialScroll({ testimonials }: { testimonials: Testimonial[] }) {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-55%"]);

    return (
        <section ref={targetRef} className="relative h-[200vh] bg-neutral-900 text-white">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <div className="absolute top-12 left-12 z-10">
                    <h2 className="text-4xl font-bold font-heading mb-4">Client Feedback.</h2>
                    <p className="text-neutral-400">What they say about the process.</p>
                </div>

                <motion.div style={{ x }} className="flex gap-12 px-12 pt-12 md:pl-[30vw]">
                    {testimonials.map((t, i) => (
                        <div key={i} className="group relative h-[60vh] w-[80vw] md:w-[40vw] flex-shrink-0 bg-black rounded-3xl border border-neutral-800 p-8 md:p-12 flex flex-col justify-between">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden mb-6 border border-neutral-700">
                                <Image src={t.image} alt={t.author} fill className="object-cover" />
                            </div>
                            <p className="text-2xl md:text-3xl font-medium leading-relaxed tracking-wide">"{t.content}"</p>
                            <div className="mt-8">
                                <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest">{t.author}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
