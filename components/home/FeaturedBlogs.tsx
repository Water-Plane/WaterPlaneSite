"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

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

export default function FeaturedBlogs({ posts }: { posts: BlogPost[] }) {
    if (posts.length === 0) return null;

    return (
        <section className="bg-black text-white py-24 px-4 border-t border-neutral-900">
            <div className="container mx-auto max-w-6xl">
                <div className="flex items-end justify-between mb-12">
                    <h2 className="text-4xl md:text-6xl font-bold font-heading">From the Blog.</h2>
                    <Link
                        href="/blogs"
                        className="text-sm font-mono text-neutral-400 hover:text-white transition-colors underline underline-offset-4 decoration-neutral-700"
                    >
                        All posts →
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <Link key={post.id} href={`/blogs/${post.slug}`} className="group block">
                            <article className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-600 transition-colors h-full flex flex-col">
                                {post.cover_image && (
                                    <div className="relative w-full aspect-video overflow-hidden">
                                        <Image
                                            src={post.cover_image}
                                            alt={post.title}
                                            fill
                                            className="object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </div>
                                )}
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {(post.tags ?? []).slice(0, 2).map((tag) => (
                                            <span key={tag} className="text-xs font-mono text-neutral-500 border border-neutral-700 px-2 py-0.5 rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-base font-bold font-heading leading-snug mb-2 group-hover:underline decoration-1 underline-offset-4 decoration-neutral-500">
                                        {post.title}
                                    </h3>
                                    <p className="text-neutral-400 text-sm line-clamp-2 flex-1">{post.excerpt}</p>
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-800">
                                        <span className="text-xs font-mono text-neutral-500">{post.author}</span>
                                        <span className="text-xs font-mono text-neutral-600">{post.published_at}</span>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
