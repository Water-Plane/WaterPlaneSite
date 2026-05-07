"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutGrid, Info, Mail, BookOpen, Briefcase } from "lucide-react";

export default function NavBar() {
    const pathname = usePathname();

    const links = [
        { name: "Work", href: "/work", icon: Briefcase },
        { name: "Services", href: "/services", icon: LayoutGrid },
        { name: "About", href: "/about", icon: Info },
        { name: "Blogs", href: "/blogs", icon: BookOpen },
    ];

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <nav className="flex items-center gap-2 p-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-md shadow-2xl">
                {/* Home Logo Button */}
                <Link
                    href="/"
                    className={cn(
                        "relative flex items-center justify-center p-2 rounded-full transition-all duration-300 group hover:bg-white/10",
                        pathname === "/" ? "bg-white/10" : ""
                    )}
                >
                    <div className="relative w-8 h-8">
                        <Image
                            src="/logos/waterplane-white_text_blackBG.svg"
                            alt="Home"
                            fill
                            className="object-contain"
                        />
                    </div>
                </Link>

                {/* Separator */}
                <div className="w-px h-6 bg-white/10 mx-1" />

                {links.map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "relative flex items-center justify-center p-3 rounded-full transition-all duration-300 group hover:bg-white/10",
                                isActive ? "text-white bg-white/10" : "text-neutral-400"
                            )}
                        >
                            <span className="sr-only">{link.name}</span>
                            <Icon size={24} strokeWidth={1.5} />
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-white/5 rounded-full -z-10"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}

                            {/* Tooltip */}
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-900 border border-neutral-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {link.name}
                            </span>
                        </Link>
                    );
                })}
                <div className="w-px h-8 bg-white/10 mx-2" />
                <Link
                    href="https://cal.com/waterplane"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full font-medium text-sm hover:scale-105 transition-transform"
                >
                    <Mail size={16} />
                    <span className="hidden sm:inline">Let's Talk</span>
                </Link>
            </nav>
        </div>
    );
}
