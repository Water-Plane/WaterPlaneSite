import React from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import { TextScramble } from "@/components/ui/text-scramble";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Insights, case notes and strategy writing from the WaterPlane team.",
};

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  published_at: string;
  cover_image: string;
  tags: string[];
}

async function getPosts(): Promise<BlogPost[]> {
  const { data } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, author, published_at, cover_image, tags")
    .eq("published", true)
    .order("published_at", { ascending: false });
  return data ?? [];
}

export const revalidate = 60;

export default async function BlogsPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <header className="mb-20 text-center">
          <h1 className="text-5xl md:text-8xl font-black font-heading mb-6">
            INSIGHTS.
          </h1>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Strategy, culture, and behind-the-scenes from the WaterPlane team.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="text-neutral-500 font-mono text-center">
            No posts yet — check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/blogs/${post.slug}`} className="group block">
                <article className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-600 transition-colors">
                  {post.cover_image && (
                    <div className="relative w-full aspect-video overflow-hidden">
                      <Image
                        src={post.cover_image}
                        alt={post.title}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {(post.tags ?? []).slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono text-neutral-500 border border-neutral-700 px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <TextScramble
                      text={post.title.toUpperCase()}
                      textClassName="text-lg font-bold font-heading tracking-wide"
                    />
                    <p className="text-neutral-400 text-sm mt-3 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-800">
                      <span className="text-xs font-mono text-neutral-500">{post.author}</span>
                      <span className="text-xs font-mono text-neutral-600">{post.published_at}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
