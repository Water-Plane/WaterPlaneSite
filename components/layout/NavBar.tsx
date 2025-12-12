"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutGrid, Home, Info, Droplets, Mail } from "lucide-react";

export default function NavBar() {
    const pathname = usePathname();

    const links = [
        { name: "Home", href: "/", icon: Home },
        { name: "Services", href: "/services", icon: LayoutGrid },
        { name: "Dives", href: "/dives", icon: Droplets },
        { name: "About", href: "/about", icon: Info },
    ];

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <nav className="flex items-center gap-2 p-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-md shadow-2xl">
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
                    href="mailto:hello@waterplane.in"
                    className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full font-medium text-sm hover:scale-105 transition-transform"
                >
                    <Mail size={16} />
                    <span>Let's Talk</span>
                </Link>
            </nav>
        </div>
    );
}
