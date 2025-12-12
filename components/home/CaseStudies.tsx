"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const projects = [
    { title: "72 AI Labs", category: "AI & Strategy", image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop" },
    { title: "Parikshit Events", category: "Brand Experience", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop" },
    { title: "Pukaar", category: "Social Impact", image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1000&auto=format&fit=crop" },
    { title: "Shakti Center", category: "Wellness", image: "https://images.unsplash.com/photo-1544367563-12123d896889?q=80&w=1000&auto=format&fit=crop" },
    { title: "Priyanka Studio", category: "Visual Arts", image: "https://images.unsplash.com/photo-1542038784424-48edbb3b5198?q=80&w=1000&auto=format&fit=crop" },
    { title: "Kunal Edits", category: "Post-Production", image: "https://images.unsplash.com/photo-1574717436401-063851898909?q=80&w=1000&auto=format&fit=crop" },
];

export default function CaseStudies() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-black text-white">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <div className="absolute top-12 left-12 z-10">
                    <h2 className="text-4xl md:text-6xl font-bold font-heading">Real Results.<br />Real Growth.</h2>
                </div>

                <motion.div style={{ x }} className="flex gap-12 px-12 pt-32">
                    {projects.map((project, i) => (
                        <div key={i} className="group relative h-[60vh] w-[40vw] md:w-[30vw] flex-shrink-0 overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800">
                            <motion.div
                                className="absolute inset-0 scale-110 group-hover:scale-100 transition-transform duration-700"
                            >
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                                />
                            </motion.div>
                            <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/90 to-transparent">
                                <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest mb-2 block">{project.category}</span>
                                <h3 className="text-3xl font-bold font-heading">{project.title}</h3>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
