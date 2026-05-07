import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import CaseStudies from "@/components/home/CaseStudies";
import Testimonials from "@/components/home/Testimonials";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

export default async function Home() {
  const { data: caseStudies } = await supabase
    .from("case_studies")
    .select("slug, title, category, hero_image")
    .eq("featured_home", true)
    .order("created_at", { ascending: true });

  const { data: allStudiesForTestimonials } = await supabase
    .from("case_studies")
    .select("title, testimonials")
    .order("created_at", { ascending: true });

  const testimonials = (allStudiesForTestimonials ?? []).flatMap((p) =>
    (p.testimonials ?? []).map((t: { content: string; author: string; image: string }) => ({
      ...t,
      projectTitle: p.title,
    }))
  );

  return (
    <div className="flex flex-col w-full bg-black">
      <Hero />
      <Services />
      <CaseStudies projects={caseStudies ?? []} />
      <Testimonials testimonials={testimonials} />
    </div>
  );
}
