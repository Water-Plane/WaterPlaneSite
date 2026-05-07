"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils'; // Assuming you have a cn utility

const team = [
    { name: "Aamin Simmi Singh", role: "", bio: "", image: "/team/Aamin.png" },
    { name: "Amrita Chaurasiya", role: "Director, Brand Ops", bio: "Brand consistency, SOP library, QA.", image: "/team/Amrita.png" },
    { name: "Ansh Verma", role: "Video Editor, Dives", bio: "Visual architect, high-retention editing.", image: "/team/Ansh.png" },
    { name: "Harshit Tiwari", role: "Co-CEO & CTO", bio: "Defines tech vision, AI workflows, technical roadmap.", image: "/team/Harshit.png" },
    { name: "Praneet Kaur", role: "Director, Growth", bio: "New business, CRM discipline, pipeline velocity.", image: "/team/Praneet.png" },
    { name: "Vansh Dixit", role: "Co-CEO & Director, Social", bio: "GTM vision, brand narrative, client services.", image: "/team/Vansh.png" },
    { name: "Vikhyat Chaudhary", role: "Director, Outreach", bio: "Personalized pitches, lead conversion.", image: "/team/Vikhyat.png" },
];

export default function Team() {
    const [hoveredMember, setHoveredMember] = useState<typeof team[0] | null>(null);

    return (
        <section className="py-24 px-4 bg-neutral-900 border-t border-neutral-800 text-white relative h-[80vh] flex items-center">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-4xl font-bold font-heading mb-12">The Squad.</h2>
                    <div className="space-y-4">
                        {team.map((member) => (
                            <div
                                key={member.name}
                                onMouseEnter={() => setHoveredMember(member)}
                                onMouseLeave={() => setHoveredMember(null)}
                                className="group cursor-pointer p-4 border-b border-white/10 hover:border-white transition-colors flex justify-between items-center"
                            >
                                <h3 className="text-xl md:text-2xl font-light group-hover:pl-4 transition-all duration-300">{member.name}</h3>
                                <span className="text-sm text-neutral-500 group-hover:text-white transition-colors">{member.role}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Preview Area */}
                <div className="hidden md:flex flex-col items-center justify-center p-8 relative h-[500px]">
                    <AnimatePresence mode="wait">
                        {hoveredMember ? (
                            <motion.div
                                key={hoveredMember.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="text-center"
                            >
                                <div className="relative w-64 h-80 mx-auto mb-6 rounded-2xl overflow-hidden shadow-2xl skew-y-3">
                                    <Image src={hoveredMember.image} alt={hoveredMember.name} fill className="object-cover" />
                                </div>
                                <h4 className="text-2xl font-bold font-heading">{hoveredMember.name}</h4>
                                <p className="text-neutral-400 mt-2 max-w-xs mx-auto">{hoveredMember.bio}</p>
                            </motion.div>
                        ) : (
                            <div className="text-neutral-600 text-center">
                                <p className="text-lg">Hover over a name to meet the team.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
