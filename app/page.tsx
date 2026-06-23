import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Workflow from "@/components/Workflow";
import Portfolio from "@/components/Portfolio";
// import BeforeAfter from "@/components/BeforeAfter";
import Stats from "@/components/Stats";
// import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Services />
      <Workflow />
      <Portfolio />
      {/* <BeforeAfter /> */}
      <Stats />
      {/* <Testimonials /> */}
      <About />
      <Contact />
    </main>
  );
}