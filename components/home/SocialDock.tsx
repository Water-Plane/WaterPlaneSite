"use client";
import React from 'react';
import TextReveal from '@/components/ui/TextReveal';
import SocialCard from './SocialCard';

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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <SocialCard
                        platform="instagram"
                        handle="@waterplane.in"
                        link="#"
                        followers="12.5K"
                        bio="Helping brands scale. 🚀 Offline to Online. #WaterPlane"
                        className="md:-rotate-3 translate-y-4 z-10 hover:z-20 hover:scale-105"
                    />
                    <SocialCard
                        platform="course"
                        handle="@waterplanedives"
                        link="#"
                        followers="Active Community"
                        bio="Learn the secrets of the New Internet. AI, Content, Growth."
                        className="z-10 hover:z-20 hover:scale-105"
                    />
                    <SocialCard
                        platform="linkedin"
                        handle="WaterPlane Agency"
                        link="#"
                        followers="5K"
                        bio="The Digital Growth Partner for the New Internet. Hiring now."
                        className="md:rotate-3 translate-y-4 z-10 hover:z-20 hover:scale-105"
                    />
                </div>
            </div>
        </section>
    );
}
