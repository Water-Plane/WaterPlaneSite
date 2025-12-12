"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Instagram, Linkedin, MonitorPlay, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming cn utility

interface SocialCardProps {
    platform: "instagram" | "linkedin" | "course";
    handle: string;
    link: string;
    followers?: string;
    bio?: string;
    className?: string;
}

export default function SocialCard({ platform, handle, link, followers, bio, className }: SocialCardProps) {
    const isInsta = platform === "instagram";
    const isLinkedIn = platform === "linkedin";

    return (
        <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5 }}
            className={cn(
                "relative group overflow-hidden rounded-3xl border transition-all duration-300",
                "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800",
                "hover:shadow-2xl hover:border-neutral-300 dark:hover:border-neutral-700",
                className
            )}
        >
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-3">
                    <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center text-white",
                        isInsta ? "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500" :
                            isLinkedIn ? "bg-[#0077b5]" : "bg-black dark:bg-white dark:text-black"
                    )}>
                        {isInsta && <Instagram size={24} />}
                        {isLinkedIn && <Linkedin size={24} />}
                        {platform === "course" && <MonitorPlay size={24} />}
                    </div>
                    <div>
                        <h3 className="font-bold text-sm md:text-base">{handle}</h3>
                        <p className="text-xs text-neutral-500">{platform === "course" ? "Academy" : platform}</p>
                    </div>
                </div>
                <ExternalLink size={18} className="text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Content Mock */}
            <div className="p-6 bg-neutral-50 dark:bg-black/50 h-full min-h-[200px]">
                {/* Stats */}
                {followers && (
                    <div className="flex gap-4 mb-6 text-sm">
                        <div><span className="font-bold">{followers}</span> <span className="text-neutral-500">followers</span></div>
                    </div>
                )}
                {/* Bio */}
                {bio && <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-6 line-clamp-2">{bio}</p>}

                {/* Grid Mock for Insta / Content for LinkedIn */}
                {isInsta ? (
                    <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="aspect-square bg-neutral-200 dark:bg-neutral-800 rounded-lg overflow-hidden relative">
                                <motion.div
                                    className="absolute inset-0 bg-black/10 dark:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                                />
                                {i === 1 && <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full shadow-sm" />}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-3">
                        <div className="h-4 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                        <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                        <div className="h-4 w-1/2 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                    </div>
                )}
            </div>

            {/* CTA Overlay */}
            <div className="absolute inset-0 bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.a>
    );
}
