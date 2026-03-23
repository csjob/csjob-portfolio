"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CursorParallax } from "@/components/ui/CursorParallax";

const cards = [
  {
    title: "Who I am",
    content:
      "C S Job — Full Stack .NET Engineer. I build secure, scalable systems and ship high-quality user experiences with Angular and modern frontends.",
    icon: "⚙️",
  },
  {
    title: "What I do",
    content:
      "Design and implement cybersecurity-first backends, resilient APIs, and real-time dashboards. I focus on maintainability, performance, and practical security in every layer.",
    icon: "🚀",
  },
  {
    title: "Current focus",
    content:
      "AI-enabled workflows, scalable architectures, and defense-in-depth security. Exploring GenAI/LLMs to build intelligent applications that stay safe and reliable.",
    icon: "🛡️",
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      data-story-section
      className="relative py-24 md:py-32 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
          data-story-reveal
        >
          <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">
            Identity Module
          </span>
          <h2
            className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Initializing{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Identity Module
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, i) => (
            <CursorParallax
              key={card.title}
              strength={4}
              className="group"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-blue-500/30 transition-all duration-300 overflow-hidden"
                data-story-reveal
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <span className="text-2xl mb-4 block">{card.icon}</span>
                  <h3
                    className="text-xl font-semibold text-white mb-3"
                    style={{ fontFamily: "var(--font-sora)" }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">{card.content}</p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </CursorParallax>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
            I believe in systems that scale without compromising security. Every line of code
            is a commitment to quality, maintainability, and the people who use what we build.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
