import { CASE_STUDIES } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import TestimonialScroll from "@/components/work/TestimonialScroll";
import TextReveal from "@/components/ui/TextReveal";

export async function generateStaticParams() {
    return CASE_STUDIES.map((project) => ({
        slug: project.slug,
    }));
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
    const project = CASE_STUDIES.find((p) => p.slug === params.slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            {/* Hero */}
            <section className="relative h-[80vh] w-full pt-32 px-4 md:px-12 flex flex-col justify-end pb-12">
                <div className="absolute inset-0 z-0 opacity-40">
                    <Image
                        src={project.heroImage}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
                </div>

                <div className="relative z-10">
                    <span className="block mb-4 text-neutral-400 font-mono uppercase tracking-widest">{project.category}</span>
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
                    <p className="text-xl md:text-2xl leading-relaxed text-neutral-300 font-light tracking-wide">
                        {project.content}
                    </p>
                </div>
            </section>

            {/* Gallery */}
            <section className="py-12 px-4 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {project.galleryImages.map((img, i) => (
                        <div key={i} className="relative aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                            <Image src={img} alt={`${project.title} gallery ${i + 1}`} fill className="object-cover" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <TestimonialScroll testimonials={project.testimonials} />
        </div>
    );
}
