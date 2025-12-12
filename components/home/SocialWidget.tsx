"use client";
import React from 'react';

export default function SocialWidget() {
    return (
        <div className="w-full max-w-5xl mx-auto mt-16 p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold font-heading mb-2">Live Feeds</h3>
                <p className="text-neutral-500">See what's happening at WaterPlane right now.</p>
            </div>

            {/* 
            INSTRUCTIONS FOR USER:
            1. Go to Elfsight (https://elfsight.com) or Tagembed.
            2. Create an "Instagram Feed" or "All-in-One Social Wall" widget.
            3. Copy the installation code (usually a <script> and a <div>).
            4. Paste the <div> part below inside this container.
            5. Paste the <script> part in your layout.tsx or use a Script component.
         */}

            <div className="min-h-[400px] flex items-center justify-center bg-neutral-100 dark:bg-neutral-950 rounded-2xl border-2 border-dashed border-neutral-300 dark:border-neutral-800">
                <div className="text-center p-8">
                    <p className="font-mono text-sm text-neutral-400 mb-4">[ Social Feed Widget Placeholder ]</p>
                    <p className="text-neutral-500 max-w-md mx-auto">
                        To display real-time posts, integrate an <strong>Elfsight</strong> or <strong>Juicer.io</strong> widget here.
                        This allows you to curate and display your Instagram/LinkedIn feed dynamically without code changes.
                    </p>
                    <a
                        href="https://elfsight.com/instagram-feed-instalink/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-6 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium text-sm hover:opacity-80 transition-opacity"
                    >
                        Get Embed Code
                    </a>
                </div>
            </div>
        </div>
    );
}
