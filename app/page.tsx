import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import CaseStudies from "@/components/home/CaseStudies";
import Testimonials from "@/components/home/Testimonials";
import Team from "@/components/home/Team";
import SocialDock from "@/components/home/SocialDock";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white dark:bg-black">
      <Hero />
      <Services />
      <CaseStudies />
      <Testimonials />
      <Team />
      <SocialDock />
    </div>
  );
}
