"use client";

import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import CaseStudyManager from "@/components/admin/CaseStudyManager";
import BlogManager from "@/components/admin/BlogManager";
import { TextScramble } from "@/components/ui/text-scramble";
import { LogOut, BookOpen, Briefcase } from "lucide-react";

type Tab = "case-studies" | "blogs";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("case-studies");

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "case-studies", label: "Case Studies", icon: <Briefcase size={16} /> },
    { id: "blogs", label: "Blogs", icon: <BookOpen size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
        <TextScramble
          text="WATERPLANE CMS"
          textClassName="text-sm font-mono tracking-widest"
        />
        <div className="flex items-center gap-4">
          <span className="text-xs text-neutral-500 font-mono hidden sm:block">
            {user?.email}
          </span>
          <button
            onClick={() => signOut(auth)}
            className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors font-mono uppercase tracking-wider"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-neutral-800 px-6 flex gap-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-mono uppercase tracking-wider transition-colors border-b-2 -mb-px ${
              activeTab === tab.id
                ? "border-white text-white"
                : "border-transparent text-neutral-500 hover:text-neutral-300"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <main className="p-6">
        {activeTab === "case-studies" && <CaseStudyManager />}
        {activeTab === "blogs" && <BlogManager />}
      </main>
    </div>
  );
}
