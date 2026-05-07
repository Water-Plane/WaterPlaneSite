import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import TestimonialScroll from "@/components/work/TestimonialScroll";
import TextReveal from "@/components/ui/TextReveal";
import type { Metadata } from "next";

interface Testimonial {
  content: string;
  author: string;
  image: string;
}

interface CaseStudy {
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  hero_image: string;
  content: string;
  gallery_images: string[];
  testimonials: Testimonial[];
}

async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  const { data } = await supabase
    .from("case_studies")
    .select("*")
    .eq("slug", slug)
    .single();
  return data ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getCaseStudy(slug);
  if (!project) return { title: "Not Found" };
  return { title: project.title, description: project.category };
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getCaseStudy(slug);
  if (!project) notFound();

  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="text-white font-bold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Hero */}
      <section className="relative h-[80vh] w-full pt-32 px-4 md:px-12 flex flex-col justify-end pb-12">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src={project.hero_image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        </div>

        <div className="relative z-10">
          <span className="block mb-4 text-neutral-400 font-mono uppercase tracking-widest">
            {project.category}
          </span>
          <h1 className="text-6xl md:text-9xl font-black font-heading mb-8 leading-none tracking-tight">
            <TextReveal>{project.title.toUpperCase()}</TextReveal>
          </h1>
          <div className="flex gap-12 text-sm font-medium tracking-wide">
            <div>
              <span className="block text-neutral-500 mb-1">Author</span>
              {project.author}
            </div>
            <div>
              <span className="block text-neutral-500 mb-1">Date</span>
              {project.date}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-32 px-4 md:px-12 container mx-auto">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold font-heading mb-8">The Strategy</h2>
          <div className="text-xl md:text-2xl leading-relaxed text-neutral-300 font-light tracking-wide space-y-6">
            {project.content.split("\n").map((line, i) => {
              if (line.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-3xl font-bold text-white mt-12 mb-6">
                    {line.replace("### ", "")}
                  </h3>
                );
              }
              if (line.startsWith("- ")) {
                return (
                  <div key={i} className="flex gap-3 ml-4">
                    <span className="text-neutral-500 mt-2">•</span>
                    <p className="flex-1">{renderFormattedText(line.replace("- ", ""))}</p>
                  </div>
                );
              }
              if (line.startsWith("> ")) {
                return (
                  <blockquote key={i} className="border-l-4 border-white pl-6 py-2 my-8 italic text-neutral-400">
                    "{renderFormattedText(line.replace("> ", ""))}"
                  </blockquote>
                );
              }
              if (line.trim() === "") return <div key={i} className="h-4" />;
              return <p key={i}>{renderFormattedText(line)}</p>;
            })}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(project.gallery_images ?? []).map((img, i) => (
            <div
              key={i}
              className="relative aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700"
            >
              <Image
                src={img}
                alt={`${project.title} gallery ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      {project.testimonials?.length > 0 && (
        <TestimonialScroll testimonials={project.testimonials} />
      )}
    </div>
  );
}
