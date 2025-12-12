"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
}

export default function TextReveal({ children, className, delay = 0 }: TextRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });
    const phrases = children.split(" ");

    return (
        <span ref={ref} className={cn("inline-block", className)}>
            {phrases.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.2em] -mb-[0.1em] pb-[0.1em]">
                    <motion.span
                        initial={{ y: "110%" }}
                        animate={isInView ? { y: "0%" } : {}}
                        transition={{
                            duration: 0.8,
                            ease: [0.33, 1, 0.68, 1], // Custom easy ease
                            delay: delay + i * 0.03, // Stagger effect
                        }}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}
