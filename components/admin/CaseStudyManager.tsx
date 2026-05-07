"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { auth } from "@/lib/firebase";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Plus, Pencil, Trash2, X, Save, ChevronDown, ChevronUp } from "lucide-react";

interface Testimonial {
  content: string;
  author: string;
  image: string;
}

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  hero_image: string;
  content: string;
  gallery_images: string[];
  testimonials: Testimonial[];
  featured_home: boolean;
}

type FormData = Omit<CaseStudy, "id">;

const EMPTY: FormData = {
  slug: "",
  title: "",
  category: "",
  author: "",
  date: "",
  hero_image: "",
  content: "",
  gallery_images: [],
  testimonials: [],
};

export default function CaseStudyManager() {
  const [items, setItems] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<CaseStudy | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [testimonialImageFiles, setTestimonialImageFiles] = useState<(File | null)[]>([]);
  const [saving, setSaving] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("case_studies")
      .select("*")
      .order("created_at", { ascending: true });
    setItems(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openCreate() {
    setForm(EMPTY);
    setHeroFile(null);
    setGalleryFiles([]);
    setTestimonialImageFiles([]);
    setEditing(null);
    setCreating(true);
    setError("");
  }

  function openEdit(item: CaseStudy) {
    setForm({
      slug: item.slug,
      title: item.title,
      category: item.category,
      author: item.author,
      date: item.date,
      hero_image: item.hero_image,
      content: item.content,
      gallery_images: item.gallery_images ?? [],
      testimonials: item.testimonials ?? [],
    });
    setHeroFile(null);
    setGalleryFiles([]);
    setTestimonialImageFiles((item.testimonials ?? []).map(() => null));
    setEditing(item);
    setCreating(false);
    setError("");
  }

  function cancel() {
    setEditing(null);
    setCreating(false);
    setError("");
  }

  function addTestimonial() {
    setForm((f) => ({ ...f, testimonials: [...f.testimonials, { content: "", author: "", image: "" }] }));
    setTestimonialImageFiles((prev) => [...prev, null]);
  }

  function removeTestimonial(i: number) {
    setForm((f) => ({ ...f, testimonials: f.testimonials.filter((_, idx) => idx !== i) }));
    setTestimonialImageFiles((prev) => prev.filter((_, idx) => idx !== i));
  }

  function updateTestimonial(i: number, field: keyof Testimonial, value: string) {
    setForm((f) => {
      const updated = [...f.testimonials];
      updated[i] = { ...updated[i], [field]: value };
      return { ...f, testimonials: updated };
    });
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      let heroUrl = form.hero_image;
      let galleryUrls = [...form.gallery_images];

      if (heroFile) {
        const { url } = await uploadToCloudinary(heroFile, "waterplane/case-studies");
        heroUrl = url;
      }

      if (galleryFiles.length > 0) {
        const uploaded = await Promise.all(
          galleryFiles.map((f) => uploadToCloudinary(f, "waterplane/case-studies/gallery"))
        );
        galleryUrls = [...galleryUrls, ...uploaded.map((u) => u.url)];
      }

      const testimonialsMigrated = await Promise.all(
        form.testimonials.map(async (t, i) => {
          const file = testimonialImageFiles[i];
          if (file) {
            const { url } = await uploadToCloudinary(file, "waterplane/case-studies/testimonials");
            return { ...t, image: url };
          }
          return t;
        })
      );

      const payload = {
        ...form,
        hero_image: heroUrl,
        gallery_images: galleryUrls,
        testimonials: testimonialsMigrated,
      };

      const token = await auth.currentUser?.getIdToken();
      const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${token}` };

      if (editing) {
        await fetch(`/api/admin/case-studies/${editing.id}`, { method: "PATCH", headers, body: JSON.stringify(payload) });
      } else {
        await fetch("/api/admin/case-studies", { method: "POST", headers, body: JSON.stringify(payload) });
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
    if (!confirm("Delete this case study? This cannot be undone.")) return;
    const token = await auth.currentUser?.getIdToken();
    await fetch(`/api/admin/case-studies/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` },
    });
    await load();
  }

  async function toggleFeatured(item: CaseStudy) {
    const token = await auth.currentUser?.getIdToken();
    await fetch(`/api/admin/case-studies/${item.id}`, {
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
        <h2 className="text-xl font-bold font-heading">Case Studies</h2>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white text-xs font-mono tracking-widest uppercase hover:bg-white/10 transition-colors">
          <Plus size={14} /> New
        </button>
      </div>

      {/* Form */}
      {isOpen && (
        <div className="mb-8 bg-neutral-950 border border-neutral-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-mono text-sm uppercase tracking-widest text-neutral-400">
              {editing ? "Edit Case Study" : "New Case Study"}
            </h3>
            <button onClick={cancel} className="text-neutral-500 hover:text-white">
              <X size={18} />
            </button>
          </div>

          {/* Core fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(["title", "slug", "category", "author", "date"] as const).map((field) => (
              <div key={field} className="flex flex-col gap-1">
                <label className="text-xs font-mono text-neutral-500 uppercase tracking-wider">{field}</label>
                <input
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="bg-black border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white transition-colors"
                />
              </div>
            ))}

            <div className="flex flex-col gap-1">
              <label className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Hero Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setHeroFile(e.target.files?.[0] ?? null)}
                className="text-sm text-neutral-400 file:mr-3 file:py-1 file:px-3 file:rounded file:border file:border-neutral-600 file:text-xs file:bg-black file:text-white hover:file:bg-neutral-900"
              />
              {form.hero_image && !heroFile && (
                <p className="text-xs text-neutral-500 truncate">{form.hero_image}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Gallery Images (add more)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setGalleryFiles(Array.from(e.target.files ?? []))}
                className="text-sm text-neutral-400 file:mr-3 file:py-1 file:px-3 file:rounded file:border file:border-neutral-600 file:text-xs file:bg-black file:text-white hover:file:bg-neutral-900"
              />
              {form.gallery_images.length > 0 && (
                <p className="text-xs text-neutral-500">{form.gallery_images.length} existing image(s)</p>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-1 mt-4">
            <label className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Content (Markdown)</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={10}
              className="bg-black border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm font-mono focus:outline-none focus:border-white transition-colors resize-y"
              placeholder={"### 1. The Challenge\nYour story here...\n\n### 2. The Execution\n- **Bold item**\n\n> Blockquote\n\n### 3. The Result"}
            />
          </div>

          {/* Testimonials */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Testimonials</label>
              <button
                type="button"
                onClick={addTestimonial}
                className="flex items-center gap-1 text-xs font-mono text-neutral-400 hover:text-white border border-neutral-700 rounded-full px-3 py-1 transition-colors"
              >
                <Plus size={12} /> Add
              </button>
            </div>
            {form.testimonials.map((t, i) => (
              <div key={i} className="bg-black border border-neutral-800 rounded-xl p-4 mb-3">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-mono text-neutral-600">Testimonial {i + 1}</span>
                  <button type="button" onClick={() => removeTestimonial(i)} className="text-neutral-600 hover:text-red-400">
                    <X size={14} />
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <textarea
                    value={t.content}
                    onChange={(e) => updateTestimonial(i, "content", e.target.value)}
                    rows={2}
                    placeholder="Quote..."
                    className="bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-white transition-colors resize-none"
                  />
                  <input
                    value={t.author}
                    onChange={(e) => updateTestimonial(i, "author", e.target.value)}
                    placeholder="Author name / title"
                    className="bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-white transition-colors"
                  />
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-neutral-600 font-mono">Avatar image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const updated = [...testimonialImageFiles];
                        updated[i] = e.target.files?.[0] ?? null;
                        setTestimonialImageFiles(updated);
                      }}
                      className="text-sm text-neutral-400 file:mr-3 file:py-1 file:px-2 file:rounded file:border file:border-neutral-700 file:text-xs file:bg-black file:text-white"
                    />
                    {t.image && !testimonialImageFiles[i] && (
                      <p className="text-xs text-neutral-600 truncate">{t.image}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
        <p className="text-neutral-500 font-mono text-sm">No case studies yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <div key={item.id} className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{item.title}</p>
                    {item.featured_home && (
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20">homepage</span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 font-mono">{item.category} · {item.date} · {(item.testimonials ?? []).length} testimonial(s)</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFeatured(item)}
                    title={item.featured_home ? "Remove from homepage" : "Show on homepage"}
                    className={`p-1 text-base leading-none transition-colors ${item.featured_home ? "text-yellow-400" : "text-neutral-600 hover:text-neutral-300"}`}
                  >
                    ★
                  </button>
                  <button onClick={() => setExpanded(expanded === item.id ? null : item.id)} className="text-neutral-400 hover:text-white p-1">
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
                <div className="px-5 pb-4 border-t border-neutral-800 pt-4 space-y-1">
                  <p className="text-xs text-neutral-400 font-mono">Slug: {item.slug}</p>
                  <p className="text-xs text-neutral-400 font-mono">Author: {item.author}</p>
                  <p className="text-xs text-neutral-400 font-mono truncate">Hero: {item.hero_image}</p>
                  <p className="text-xs text-neutral-400 font-mono">Gallery: {(item.gallery_images ?? []).length} image(s)</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
