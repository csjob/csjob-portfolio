"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const categories = [
  {
    name: "Backend",
    items: [
      { name: ".NET / C#", level: 95, detail: "ASP.NET Core, Entity Framework, Clean Architecture" },
      { name: "Web APIs", level: 90, detail: "RESTful design, SignalR, gRPC" },
      { name: "Database", level: 85, detail: "SQL Server, PostgreSQL, Redis" },
    ],
  },
  {
    name: "Frontend",
    items: [
      { name: "Angular", level: 90, detail: "RxJS, NgRx, Angular Material" },
      { name: "React / Next.js", level: 80, detail: "TypeScript, Tailwind, Framer Motion" },
      { name: "UI/UX", level: 75, detail: "Responsive design, accessibility" },
    ],
  },
  {
    name: "AI / ML",
    items: [
      { name: "Generative AI", level: 40, detail: "Exploring LLMs, prompt engineering" },
      { name: "ML Basics", level: 35, detail: "Learning fundamentals, PyTorch" },
    ],
  },
  {
    name: "Tools & Cloud",
    items: [
      { name: "Azure", level: 75, detail: "App Services, Functions, DevOps" },
      { name: "Docker & K8s", level: 65, detail: "Containerization, orchestration" },
      { name: "Git / CI/CD", level: 85, detail: "GitHub Actions, Azure DevOps" },
    ],
  },
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeCard, setActiveCard] = useState<{ cat: string; item: string } | null>(null);

  return (
    <section
      id="skills"
      data-story-section
      className="relative py-24 md:py-32 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">
            Core Modules
          </span>
          <h2
            className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Loading{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent">
              Core Modules
            </span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, catIndex) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: catIndex * 0.1 }}
              className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 hover:border-blue-500/30 transition-colors hover:shadow-[0_0_40px_rgba(59,130,246,0.12)] hover:-translate-y-0.5 transition-all"
              data-story-reveal
            >
              <h3 className="text-lg font-semibold text-blue-400 mb-4 font-mono">
                {cat.name}
              </h3>
              <div className="space-y-4">
                {cat.items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: catIndex * 0.1 + i * 0.05 }}
                    className="cursor-pointer group"
                    onClick={() =>
                      setActiveCard(
                        activeCard?.item === item.name ? null : { cat: cat.name, item: item.name }
                      )
                    }
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                        {item.name}
                      </span>
                      <span className="text-xs text-zinc-500">{item.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${item.level}%` } : {}}
                        transition={{ duration: 1, delay: catIndex * 0.1 + i * 0.1 }}
                      />
                    </div>
                    <AnimatePresence>
                      {activeCard?.item === item.name && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 text-xs text-zinc-500"
                        >
                          {item.detail}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
