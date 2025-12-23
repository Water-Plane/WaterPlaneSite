"use client";
import React from 'react';
import MagneticButton from '@/components/ui/MagneticButton';
import Link from 'next/link';

export default function DivesPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-24 px-4 relative flex flex-col items-center justify-center">
            <div className="container mx-auto text-center z-10">
                <h1 className="text-5xl md:text-8xl font-heading font-bold tracking-tighter mb-6">
                    COMING SOON
                </h1>
                <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-12 font-sans">
                    We are crafting deep dives into the future of digital growth.
                </p>

                <Link href="/">
                    <MagneticButton className="bg-white text-black border-none hover:bg-gray-200 font-bold px-8 py-4">
                        Return Home
                    </MagneticButton>
                </Link>
            </div>
        </div>
    );
}
