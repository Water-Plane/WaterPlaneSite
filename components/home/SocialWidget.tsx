"use client";
import React from 'react';
import Script from 'next/script';

export default function SocialWidget() {
    return (
        <div className="w-full max-w-5xl mx-auto mt-16 p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl">
            <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold font-heading mb-2">Live Feeds</h3>
                <p className="text-neutral-500">See what's happening at WaterPlane right now.</p>
            </div>

            {/* Elfsight Widget Integration */}
            <div className="min-h-[400px] flex items-center justify-center bg-neutral-100 dark:bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
                <div className="elfsight-app-7bcf906c-6592-47a5-bff6-29dd2dcebcb6" data-elfsight-app-lazy></div>
            </div>
        </div>
    );
}
