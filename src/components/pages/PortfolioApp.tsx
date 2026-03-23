"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { AIAssistant } from "@/components/sections/AIAssistant";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";
import { SystemBootScreen } from "@/components/boot/SystemBootScreen";
import { ScrollStory } from "@/components/story/ScrollStory";

export default function PortfolioApp() {
  const [bootDone, setBootDone] = useState(false);

  return (
    <div>
      <motion.div
        className="fixed inset-x-0 top-0 z-[60]"
        initial={{ opacity: 1 }}
        animate={{ opacity: bootDone ? 0 : 1 }}
        transition={{ duration: 0.35 }}
        style={{ pointerEvents: bootDone ? "none" : "auto" }}
      >
        <Navbar />
      </motion.div>

      {!bootDone && (
        <SystemBootScreen name="C S Job" onComplete={() => setBootDone(true)} />
      )}

      {bootDone && (
        <>
          <ScrollStory enabled={bootDone} />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <AIAssistant />
            <Blog />
            <Contact />
          </main>
        </>
      )}
    </div>
  );
}

