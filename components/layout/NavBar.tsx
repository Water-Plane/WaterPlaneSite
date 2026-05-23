"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutGrid, Info, BookOpen, Briefcase } from "lucide-react";

function ArrowUpRight({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

const links = [
  { name: "Work", href: "/work", icon: Briefcase },
  { name: "Services", href: "/services", icon: LayoutGrid },
  { name: "About", href: "/about", icon: Info },
  { name: "Blogs", href: "/blogs", icon: BookOpen },
];

export default function NavBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="fixed top-4 left-0 right-0 px-6 lg:px-16 z-50">
      <div className="flex items-center justify-between">
        {/* Left: logo circle */}
        <Link
          href="/"
          className={cn(
            "liquid-glass w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
            !isHome && "bg-black/40"
          )}
        >
          <span className="font-serif-heading italic text-white text-xl leading-none select-none">
            w
          </span>
        </Link>

        {/* Centre: pill nav — desktop only */}
        <div
          className={cn(
            "hidden md:flex rounded-full px-1.5 py-1.5 items-center gap-1",
            isHome ? "liquid-glass" : "bg-black/60 backdrop-blur-sm border border-white/10"
          )}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 text-sm font-medium text-white/90 font-body rounded-full transition-colors hover:bg-white/10",
                pathname === link.href && "bg-white/10 text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="https://cal.com/waterplane"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black rounded-full px-4 py-2 text-sm font-medium font-body flex items-center gap-1.5 whitespace-nowrap ml-1"
          >
            Let&apos;s Talk <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Mobile: compact CTA */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            href="https://cal.com/waterplane"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black rounded-full px-4 py-2 text-sm font-medium font-body"
          >
            Let&apos;s Talk
          </Link>
        </div>

        {/* Right: invisible spacer keeps logo centred on desktop */}
        <div className="hidden md:block w-12 h-12" />
      </div>
    </div>
  );
}
