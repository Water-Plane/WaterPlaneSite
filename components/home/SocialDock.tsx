"use client";
import React from 'react';
import { Linkedin, Instagram, MonitorPlay } from 'lucide-react';

export default function SocialDock() {
    const socials = [
        { name: "@waterplane.in", icon: Instagram, href: "#", label: "Client" },
        { name: "@waterplanedives", icon: MonitorPlay, href: "#", label: "Edu" },
        { name: "LinkedIn", icon: Linkedin, href: "#", label: "B2B" },
    ];

    return (
        <section className="py-24 flex flex-col items-center justify-center bg-white dark:bg-black">
            <h2 className="text-3xl font-bold font-heading mb-8">Connect With Us.</h2>
            <div className="flex gap-4 p-2 bg-neutral-100 dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xl">
                {socials.map((social) => (
                    <a
                        key={social.name}
                        href={social.href}
                        className="flex flex-col items-center gap-2 p-4 px-6 rounded-2xl hover:bg-white dark:hover:bg-black hover:shadow-lg transition-all duration-300 group"
                    >
                        <div className="p-3 bg-white dark:bg-black rounded-full shadow-sm group-hover:scale-110 transition-transform">
                            <social.icon size={24} />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-bold">{social.name}</p>
                            <p className="text-xs text-neutral-500">{social.label}</p>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}
