"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import TextReveal from '@/components/ui/TextReveal';

// Assets
import SocialImg from '../../assets/HomePageHeroContent/socialAndContentCommand.png';
import WebImg from '../../assets/HomePageHeroContent/WebDigial.png';
import AiImg from '../../assets/HomePageHeroContent/Ai&GrowthEngine.png';

const ServiceCard = ({
    title,
    description,
    image,
    className,
    delay = 0,
    isTall = false
}: {
    title: string;
    description: string;
    image: any;
    className?: string;
    delay?: number;
    isTall?: boolean;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: "-100px", once: true }}
        transition={{ delay, duration: 0.8, ease: "easeOut" }}
        className={cn("group relative rounded-3xl bg-neutral-100 dark:bg-neutral-900 overflow-hidden border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800 transition-colors flex flex-col", className)}
    >
        {/* Hover Highlight */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500 z-10 pointer-events-none" />

        {/* Image Container */}
        <div className={cn(
            "relative w-full overflow-hidden z-0",
            // For tall cards, we let the image take up available space but ensure text has room.
            // We use aspect-ratio or fixed heights to ensure consistency.
            isTall ? "flex-1 min-h-[300px]" : "h-56 md:h-64"
        )}>
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
            />
        </div>

        {/* Text Content */}
        <div className="relative z-20 p-6 md:p-8 pt-6 bg-neutral-100 dark:bg-neutral-900 border-t border-transparent group-hover:border-neutral-200 dark:group-hover:border-neutral-800 transition-colors">
            <h3 className="text-2xl font-bold mb-3 font-heading">{title}</h3>
            <p className="text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed text-sm md:text-base">{description}</p>
        </div>
    </motion.div>
);

export default function Services() {
    return (
        <section className="py-24 px-4 container mx-auto" id="services">
            <div className="mb-16">
                <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6">
                    <TextReveal>WE BUILD</TextReveal><br />
                    <TextReveal delay={0.1}>DIGITAL ECOSYSTEMS.</TextReveal>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto">
                <ServiceCard
                    title="Social & Content Command"
                    description="Complete social media management & studio-grade production."
                    image={SocialImg}
                    className="md:col-span-1 bg-gradient-to-br from-neutral-100 to-white dark:from-neutral-900 dark:to-black h-full"
                    delay={0.1}
                    isTall={true}
                />
                <div className="md:col-span-2 grid grid-rows-2 gap-6">
                    <ServiceCard
                        title="Web & Digital Presence"
                        description="Full-stack dev, CMS, & 24/7 maintenance. High-performance websites built with Next.js."
                        image={WebImg}
                        delay={0.2}
                    />
                    <ServiceCard
                        title="AI & Growth Engine"
                        description="Next-gen content (Sora/Veo) & data-driven SEO. Leveraging AI to scale your brand faster."
                        image={AiImg}
                        delay={0.3}
                    />
                </div>
            </div>
        </section>
    );
}
