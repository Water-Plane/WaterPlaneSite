import React from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
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

        <ReactMarkdown
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-heading prose-headings:font-bold
            prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
            prose-p:text-neutral-300 prose-p:leading-relaxed
            prose-strong:text-white
            prose-blockquote:border-l-4 prose-blockquote:border-neutral-600 prose-blockquote:text-neutral-400 prose-blockquote:not-italic
            prose-li:text-neutral-300
            prose-a:text-white prose-a:underline"
        >
          {post.content}
        </ReactMarkdown>

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
