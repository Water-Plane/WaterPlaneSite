import React from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  published_at: string;
  cover_image: string;
  content: string;
  tags: string[];
}

async function getPost(slug: string): Promise<BlogPost | null> {
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  return data ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export const revalidate = 60;

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24 px-4">
      <article className="container mx-auto max-w-3xl">
        {/* Hero image */}
        {post.cover_image && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 border border-neutral-800">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Meta */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(post.tags ?? []).map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono text-neutral-500 border border-neutral-700 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-4xl md:text-6xl font-black font-heading leading-tight mb-6">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 mb-12 pb-8 border-b border-neutral-800">
          <span className="text-sm font-mono text-neutral-400">{post.author}</span>
          <span className="text-neutral-700">·</span>
          <span className="text-sm font-mono text-neutral-500">{post.published_at}</span>
        </div>

        {/* Content rendered as plain text with newlines — for full markdown, add a parser */}
        <div className="prose prose-invert prose-lg max-w-none">
          {post.content.split("\n").map((line, i) => {
            if (line.startsWith("### ")) {
              return <h3 key={i} className="text-xl font-bold font-heading mt-8 mb-3">{line.slice(4)}</h3>;
            }
            if (line.startsWith("## ")) {
              return <h2 key={i} className="text-2xl font-bold font-heading mt-10 mb-4">{line.slice(3)}</h2>;
            }
            if (line.startsWith("# ")) {
              return <h1 key={i} className="text-3xl font-bold font-heading mt-10 mb-4">{line.slice(2)}</h1>;
            }
            if (line.startsWith("> ")) {
              return (
                <blockquote key={i} className="border-l-2 border-neutral-600 pl-4 my-4 text-neutral-400 italic">
                  {line.slice(2)}
                </blockquote>
              );
            }
            if (line.startsWith("- ")) {
              return <li key={i} className="ml-4 text-neutral-300 list-disc">{line.slice(2)}</li>;
            }
            if (line === "") {
              return <div key={i} className="h-4" />;
            }
            return (
              <p key={i} className="text-neutral-300 leading-relaxed">
                {line}
              </p>
            );
          })}
        </div>

        <div className="mt-16 pt-8 border-t border-neutral-800">
          <a
            href="/blogs"
            className="text-sm font-mono text-neutral-500 hover:text-white transition-colors uppercase tracking-widest"
          >
            ← Back to Insights
          </a>
        </div>
      </article>
    </div>
  );
}
