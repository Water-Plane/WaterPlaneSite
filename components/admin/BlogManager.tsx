"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { auth } from "@/lib/firebase";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Plus, Pencil, Trash2, X, Save, ChevronDown, ChevronUp } from "lucide-react";

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
  published: boolean;
  featured_home: boolean;
}

const EMPTY: Omit<BlogPost, "id"> = {
  slug: "",
  title: "",
  excerpt: "",
  author: "",
  published_at: new Date().toISOString().split("T")[0],
  cover_image: "",
  content: "",
  tags: [],
  published: false,
};

export default function BlogManager() {
  const [items, setItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Omit<BlogPost, "id">>(EMPTY);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("published_at", { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openCreate() {
    setForm(EMPTY);
    setCoverFile(null);
    setTagsInput("");
    setEditing(null);
    setCreating(true);
    setError("");
  }

  function openEdit(item: BlogPost) {
    setForm({
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      author: item.author,
      published_at: item.published_at,
      cover_image: item.cover_image,
      content: item.content,
      tags: item.tags ?? [],
      published: item.published,
    });
    setTagsInput((item.tags ?? []).join(", "));
    setCoverFile(null);
    setEditing(item);
    setCreating(false);
    setError("");
  }

  function cancel() {
    setEditing(null);
    setCreating(false);
    setError("");
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      let coverUrl = form.cover_image;

      if (coverFile) {
        const { url } = await uploadToCloudinary(coverFile, "waterplane/blogs");
        coverUrl = url;
      }

      const payload = {
        ...form,
        cover_image: coverUrl,
        tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
      };

      const token = await auth.currentUser?.getIdToken();
      const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${token}` };

      if (editing) {
        await fetch(`/api/admin/blogs/${editing.id}`, { method: "PATCH", headers, body: JSON.stringify(payload) });
      } else {
        await fetch("/api/admin/blogs", { method: "POST", headers, body: JSON.stringify(payload) });
      }

      await load();
      cancel();
    } catch (e) {
      setError(String(e));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this blog post? This cannot be undone.")) return;
    const token = await auth.currentUser?.getIdToken();
    await fetch(`/api/admin/blogs/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` },
    });
    await load();
  }

  async function toggleFeatured(item: BlogPost) {
    const token = await auth.currentUser?.getIdToken();
    await fetch(`/api/admin/blogs/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ featured_home: !item.featured_home }),
    });
    await load();
  }

  const isOpen = creating || !!editing;

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold font-heading">Blog Posts</h2>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white text-xs font-mono tracking-widest uppercase hover:bg-white/10 transition-colors">
          <Plus size={14} /> New
        </button>
      </div>

      {/* Form */}
      {isOpen && (
        <div className="mb-8 bg-neutral-950 border border-neutral-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-mono text-sm uppercase tracking-widest text-neutral-400">
              {editing ? "Edit Blog Post" : "New Blog Post"}
            </h3>
            <button onClick={cancel} className="text-neutral-500 hover:text-white">
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(["title", "slug", "author", "published_at"] as const).map((field) => (
              <div key={field} className="flex flex-col gap-1">
                <label className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                  {field.replace("_", " ")}
                </label>
                <input
                  value={form[field] as string}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  type={field === "published_at" ? "date" : "text"}
                  className="bg-black border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white transition-colors"
                />
              </div>
            ))}

            <div className="flex flex-col gap-1">
              <label className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                Tags (comma-separated)
              </label>
              <input
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="bg-black border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white transition-colors"
                placeholder="marketing, ai, growth"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                Cover Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
                className="text-sm text-neutral-400 file:mr-3 file:py-1 file:px-3 file:rounded file:border file:border-neutral-600 file:text-xs file:bg-black file:text-white hover:file:bg-neutral-900"
              />
              {form.cover_image && !coverFile && (
                <p className="text-xs text-neutral-500 truncate">{form.cover_image}</p>
              )}
            </div>

            <div className="flex items-center gap-3 pt-4">
              <input
                type="checkbox"
                id="published"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="w-4 h-4 accent-white"
              />
              <label htmlFor="published" className="text-sm text-neutral-300">
                Published (visible on /blogs)
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-1 mt-4">
            <label className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
              Excerpt
            </label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              rows={2}
              className="bg-black border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white transition-colors resize-y"
            />
          </div>

          <div className="flex flex-col gap-1 mt-4">
            <label className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
              Content (Markdown)
            </label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={12}
              className="bg-black border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm font-mono focus:outline-none focus:border-white transition-colors resize-y"
            />
          </div>

          {error && <p className="text-red-400 text-xs font-mono mt-3">{error}</p>}

          <div className="flex gap-3 mt-5">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white text-xs font-mono tracking-widest uppercase hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              <Save size={14} /> {saving ? "Saving…" : "Save"}
            </button>
            <button onClick={cancel} className="text-sm text-neutral-500 hover:text-white transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <p className="text-neutral-500 font-mono text-sm">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-neutral-500 font-mono text-sm">No blog posts yet. Create one above.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <div key={item.id} className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{item.title}</p>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                      item.published
                        ? "bg-green-900/30 text-green-400 border border-green-800"
                        : "bg-neutral-800 text-neutral-500 border border-neutral-700"
                    }`}>
                      {item.published ? "live" : "draft"}
                    </span>
                    {item.featured_home && (
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20">homepage</span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 font-mono">{item.author} · {item.published_at}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFeatured(item)}
                    title={item.featured_home ? "Remove from homepage" : "Show on homepage"}
                    className={`p-1 text-base leading-none transition-colors ${item.featured_home ? "text-yellow-400" : "text-neutral-600 hover:text-neutral-300"}`}
                  >
                    ★
                  </button>
                  <button
                    onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                    className="text-neutral-400 hover:text-white p-1"
                  >
                    {expanded === item.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  <button onClick={() => openEdit(item)} className="text-neutral-400 hover:text-white p-1">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-neutral-400 hover:text-red-400 p-1">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              {expanded === item.id && (
                <div className="px-5 pb-4 border-t border-neutral-800 pt-4">
                  <p className="text-xs text-neutral-400 font-mono mb-1">Slug: {item.slug}</p>
                  <p className="text-xs text-neutral-400 font-mono mb-1">Tags: {(item.tags ?? []).join(", ")}</p>
                  <p className="text-xs text-neutral-400 mb-1">{item.excerpt}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
