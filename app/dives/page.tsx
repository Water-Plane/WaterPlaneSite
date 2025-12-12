"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code, Cpu } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';

export default function DivesPage() {
    return (
        <div className="dark min-h-screen bg-black text-green-500 font-mono selection:bg-green-500 selection:text-black pt-32 pb-24 px-4 overflow-hidden relative">
            {/* Matrix/Grid Background */}
            <div className="fixed inset-0 bg-[linear-gradient(rgba(0,50,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,50,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="fixed inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

            <div className="container mx-auto relative z-10">
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center border-b border-green-900/50 pb-24 mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="p-4 border border-green-500 rounded-full mb-8 bg-green-900/10"
                    >
                        <Terminal size={48} />
                    </motion.div>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 text-white uppercase glitch-text">
                        WaterPlane Dives 🤿
                    </h1>
                    <p className="text-xl md:text-2xl text-green-400/80 max-w-2xl">
                        [Tech. Trends. No Jargon.] <br />
                        The Lab for Learners & Future Architects.
                    </p>

                    <div className="mt-12 flex gap-6">
                        <MagneticButton className="bg-green-500 text-black border-none hover:bg-green-400 font-bold">
                            Join the Movement
                        </MagneticButton>
                        <MagneticButton className="bg-transparent text-green-500 border border-green-500 hover:bg-green-900/20">
                            Read Protocols
                        </MagneticButton>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="group p-6 border border-green-900 bg-black/50 hover:bg-green-900/10 transition-colors rounded-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 opacity-50 font-xs">sys_log_0{i}</div>
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">Future of AI Agents</h3>
                            <p className="text-green-600/80 mb-4">Decoding the neural pathways of tomorrow's digital workforce.</p>
                            <div className="flex items-center gap-2 text-sm text-green-700">
                                <Code size={16} />
                                <span>Analysis</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
