"use client";
import React from 'react';
import TextReveal from '@/components/ui/TextReveal';
import SocialCard from './SocialCard';
import SocialWidget from './SocialWidget';

export default function SocialDock() {
    return (
        <section className="py-32 px-4 bg-neutral-50 dark:bg-black relative overflow-hidden">
            <div className="container mx-auto">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6">
                        <TextReveal>STAY CONNECTED.</TextReveal>
                    </h2>
                    <p className="text-xl text-neutral-500">
                        Follow our journey across the digital landscape.
                    </p>
                </div>

                <SocialWidget />

                <div className="mt-12 text-center">
                    <p className="text-sm text-neutral-400">
                        Find us on <a href="https://www.linkedin.com/company/waterplane" className="underline hover:text-black dark:hover:text-white transition-colors">LinkedIn</a> and <a href="https://instagram.com/waterplane.in" className="underline hover:text-black dark:hover:text-white transition-colors">Instagram</a>.
                    </p>
                </div>
            </div>
        </section>
    );
}
