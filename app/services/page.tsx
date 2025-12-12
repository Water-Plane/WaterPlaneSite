"use client";
import React from 'react';
import { motion } from 'framer-motion';

const services = [
    {
        title: "Website Development",
        price: "₹8k + ₹3.5k/yr",
        tagline: "Your 24/7 Digital HQ.",
        details: ["Next.js & React", "CMS Integration", "SEO Optimized", "1 Year Support"]
    },
    {
        title: "Social Media Mgmt",
        price: "₹6k/mo",
        tagline: "Content that Converts.",
        details: ["3 Reels / Week", "4 Posts / Week", "Community Mgmt", "Monthly Analytics"]
    },
    {
        title: "AI Content Creation",
        price: "₹1.8k-2k/mo",
        tagline: "Future-Proof Your Feed.",
        details: ["Sora / Veo Generated", "Runway Video", "Viral Formats", "Trendjacking"]
    },
    {
        title: "Content Shoot",
        price: "Custom",
        tagline: "High-Fidelity Visuals.",
        details: ["Creator Kit Shoot", "Full Studio Production", "Professional Editing", "Color Grading"]
    },
    {
        title: "SEO & Ads",
        price: "₹20k/mo / ₹10k/mo",
        tagline: "Get Found.",
        details: ["Keyword Strategy", "Technical SEO", "Meta & Google Ads", "ROI Tracking"]
    },
];

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-white text-neutral-900 pt-32 pb-24 px-4">
            <div className="container mx-auto">
                <header className="mb-24 text-center">
                    <h1 className="text-6xl md:text-9xl font-black font-heading mb-6 tracking-tighter">OUR SERVICES</h1>
                    <p className="text-xl text-neutral-500">Transparent pricing. Professional execution.</p>
                </header>

                <div className="flex flex-col gap-12">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ margin: "-100px" }}
                            transition={{ duration: 0.5 }}
                            className="sticky top-24 bg-neutral-50 border border-neutral-200 rounded-3xl p-8 md:p-12 shadow-sm transition-all hover:shadow-xl hover:scale-[1.01]"
                        >
                            <div className="flex flex-col md:flex-row justify-between md:items-start gap-8">
                                <div className="flex-1">
                                    <span className="inline-block px-3 py-1 bg-black text-white text-xs font-bold rounded-full mb-4">0{index + 1}</span>
                                    <h2 className="text-4xl font-bold font-heading mb-2">{service.title}</h2>
                                    <p className="text-2xl text-neutral-400 font-medium mb-8">{service.tagline}</p>

                                    <ul className="grid grid-cols-2 gap-4">
                                        {service.details.map((detail, i) => (
                                            <li key={i} className="flex items-center gap-2 text-neutral-600">
                                                <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full" />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="md:text-right">
                                    <p className="text-3xl font-bold">{service.price}</p>
                                    <button className="mt-6 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-neutral-800 transition-colors">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
