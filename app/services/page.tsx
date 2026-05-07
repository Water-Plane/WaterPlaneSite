"use client";
import React from 'react';
import { motion } from 'framer-motion';

const services = [
    {
        number: "01",
        title: "Custom Web Applications",
        tagline: "Scalable software tailored to your business logic.",
        details: [
            "SaaS MVPs & Client Portals",
            "Custom CRMs & ERP Systems",
            "Complex E-commerce Platforms",
            "Full-Stack MERN Architecture",
        ]
    },
    {
        number: "02",
        title: "AI Solutions & Automation",
        tagline: "Intelligent systems that eliminate manual work.",
        details: [
            "Custom Gen AI Chatbots",
            "WhatsApp Business Bots",
            "Autonomous Meta Ads Agents",
            "Python Workflow Automation",
        ]
    },
    {
        number: "03",
        title: "Internal Tools & Utilities",
        tagline: "Custom software to supercharge your daily operations.",
        details: [
            "Inventory & Data Dashboards",
            "Desktop Productivity Apps",
            "Cross-Platform Utilities (Windows/Mac/Linux)",
            "Custom Client Portals",
        ]
    },
    {
        number: "04",
        title: "API & Integrations",
        tagline: "Connecting your digital ecosystem seamlessly.",
        details: [
            "Custom API Development",
            "Payment Gateways (Stripe/Razorpay)",
            "Headless CMS Integration",
            "Secure Data Pipelines",
        ]
    },
    {
        number: "05",
        title: "Tech Consulting & Audits",
        tagline: "Blueprinting your technical roadmap before you build.",
        details: [
            "System Architecture Design",
            "Codebase & Speed Audits",
            "Security Vulnerability Checks",
            "Infrastructure Scaling",
        ]
    },
];

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-24 px-4">
            <div className="container mx-auto max-w-5xl">
                <header className="mb-24 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-9xl font-black font-heading mb-6 tracking-tighter"
                    >
                        OUR SERVICES
                    </motion.h1>
                    <p className="text-xl text-neutral-400">Engineered solutions. Scalable infrastructure.</p>
                </header>

                <div className="flex flex-col gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="sticky top-24 bg-neutral-950 border border-neutral-800 rounded-3xl p-8 md:p-12 hover:border-neutral-600 transition-colors"
                        >
                            <div className="flex flex-col md:flex-row justify-between md:items-start gap-8">
                                <div className="flex-1">
                                    <span className="inline-block px-3 py-1 bg-white text-black text-xs font-bold rounded-full mb-4 font-mono">
                                        {service.number}
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2">{service.title}</h2>
                                    <p className="text-lg text-neutral-400 mb-8">{service.tagline}</p>

                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {service.details.map((detail, i) => (
                                            <li key={i} className="flex items-center gap-3 text-neutral-300 text-sm">
                                                <div className="w-1 h-1 bg-neutral-500 rounded-full flex-shrink-0" />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex-shrink-0">
                                    <a
                                        href="https://cal.com/waterplane"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium text-sm hover:scale-105 transition-transform"
                                    >
                                        Let&apos;s Talk
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M7 17L17 7" />
                                            <path d="M7 7h10v10" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
