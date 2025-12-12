"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Globe, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import TextReveal from '@/components/ui/TextReveal';

const ServiceCard = ({
    title,
    description,
    icon: Icon,
    className,
    delay = 0
}: {
    title: string;
    description: string;
    icon: any;
    className?: string;
    delay?: number;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: "-100px", once: true }}
        transition={{ delay, duration: 0.8, ease: "easeOut" }}
        className={cn("group relative p-8 rounded-3xl bg-neutral-100 dark:bg-neutral-900 overflow-hidden border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800 transition-colors", className)}
    >
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />
        <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="mb-8 p-4 bg-white dark:bg-black rounded-2xl w-fit border border-neutral-200 dark:border-neutral-800">
                <Icon size={32} className="text-black dark:text-white" />
            </div>
            <div>
                <h3 className="text-2xl font-bold mb-4 font-heading">{title}</h3>
                <p className="text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">{description}</p>
            </div>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
                <ServiceCard
                    title="Social & Content Command"
                    description="Complete social media management & studio-grade production. We handle everything from strategy to posting."
                    icon={Smartphone}
                    className="md:col-span-1 bg-gradient-to-br from-neutral-100 to-white dark:from-neutral-900 dark:to-black"
                    delay={0.1}
                />
                <div className="md:col-span-2 grid grid-rows-2 gap-6">
                    <ServiceCard
                        title="Web & Digital Presence"
                        description="Full-stack dev, CMS, & 24/7 maintenance. High-performance websites built with Next.js."
                        icon={Globe}
                        delay={0.2}
                    />
                    <ServiceCard
                        title="AI & Growth Engine"
                        description="Next-gen content (Sora/Veo) & data-driven SEO. Leveraging AI to scale your brand faster."
                        icon={Sparkles}
                        className="bg-black text-white dark:bg-white dark:text-black"
                        delay={0.3}
                    />
                </div>
            </div>
        </section>
    );
}
