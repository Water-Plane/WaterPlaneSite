import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import CaseStudies from "@/components/home/CaseStudies";
import Testimonials from "@/components/home/Testimonials";
import FeaturedBlogs from "@/components/home/FeaturedBlogs";
import SocialDock from "@/components/home/SocialDock";
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

  const { data: featuredBlogs } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, author, published_at, cover_image, tags")
    .eq("featured_home", true)
    .eq("published", true)
    .order("published_at", { ascending: false });

  return (
    <div className="flex flex-col w-full bg-black">
      <Hero />
      <Services />
      <CaseStudies projects={caseStudies ?? []} />
      <Testimonials testimonials={testimonials} />
      <FeaturedBlogs posts={featuredBlogs ?? []} />
      <SocialDock />
    </div>
  );
}
