import { Helmet } from "react-helmet-async";
import Hero from "@/components/sections/Hero";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Awards from "@/components/sections/Awards";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Soumadeep Dey — Full Stack Developer</title>
        <meta
          name="description"
          content="Full Stack Developer portfolio of Soumadeep Dey — React, Node.js, TypeScript specialist with 2+ years building scalable enterprise web applications."
        />
        <meta name="keywords" content="Full Stack Developer, React Developer, Node.js, TypeScript, MERN Stack, Kolkata, India" />
      </Helmet>
      <Hero />
      <MarqueeStrip />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Awards />
      <Contact />
    </>
  );
}
