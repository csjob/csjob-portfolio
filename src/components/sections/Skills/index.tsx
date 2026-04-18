"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const categories = [
  {
    id: "MOD-01",
    name: "Backend",
    items: [
      { name: ".NET / C#", level: 95, detail: "ASP.NET Core, Entity Framework, Clean Architecture" },
      { name: "Web APIs", level: 90, detail: "RESTful design, SignalR, gRPC" },
      { name: "Database", level: 85, detail: "SQL Server, PostgreSQL, Redis" },
    ],
  },
  {
    id: "MOD-02",
    name: "Frontend",
    items: [
      { name: "Angular", level: 90, detail: "RxJS, NgRx, Angular Material" },
      { name: "React / Next.js", level: 80, detail: "TypeScript, Tailwind, Framer Motion" },
      { name: "UI/UX", level: 75, detail: "Responsive design, accessibility" },
    ],
  },
  {
    id: "MOD-03",
    name: "AI / ML",
    items: [
      { name: "Generative AI", level: 40, detail: "Exploring LLMs, prompt engineering" },
      { name: "ML Basics", level: 35, detail: "Learning fundamentals, PyTorch" },
    ],
  },
  {
    id: "MOD-04",
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <section id="skills" className="relative py-24 md:py-32 px-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
           style={{ backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      
      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-blue-400/80 font-mono text-xs tracking-widest uppercase">
              System Diagnostics
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Core{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Modules
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((cat, catIndex) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: catIndex * 0.1, duration: 0.5 }}
              className="group relative"
            >
              {/* HUD Brackets */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-blue-500/40 group-hover:border-blue-400 transition-colors" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-blue-500/40 group-hover:border-blue-400 transition-colors" />
              
              <div className="glass-card rounded-xl p-6 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-500 h-full">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {cat.name}
                  </h3>
                  <span className="font-mono text-[10px] text-zinc-500 tracking-tighter opacity-50 group-hover:opacity-100 transition-opacity">
                    {cat.id}
                  </span>
                </div>

                <div className="space-y-6">
                  {cat.items.map((item, i) => (
                    <div
                      key={item.name}
                      className="cursor-pointer group/item"
                      onClick={() => setActiveItem(activeItem === item.name ? null : item.name)}
                    >
                      <div className="flex justify-between items-end mb-2 px-1">
                        <span className="text-sm font-medium text-zinc-400 font-mono tracking-tight uppercase group-hover/item:text-white transition-colors">
                          {item.name}
                        </span>
                        <span className="text-xs text-blue-400/80 font-mono">
                          {item.level}%
                        </span>
                      </div>

                      {/* Segmented Progress Bar */}
                      <div className="relative h-2 bg-white/5 rounded-sm overflow-hidden flex gap-0.5 p-0.5 border border-white/10">
                        {Array.from({ length: 15 }).map((_, segmentIndex) => {
                          const threshold = (segmentIndex + 1) * (100 / 15);
                          return (
                            <motion.div
                              key={segmentIndex}
                              className="h-full flex-1 rounded-[1px]"
                              initial={{ opacity: 0, scaleY: 0 }}
                              animate={isInView ? { 
                                opacity: item.level >= threshold ? 1 : 0.1,
                                scaleY: 1,
                                backgroundColor: item.level >= threshold 
                                  ? (segmentIndex < 10 ? "#3b82f6" : "#8b5cf6") 
                                  : "rgba(255,255,255,0.1)"
                              } : {}}
                              transition={{ 
                                delay: (catIndex * 0.1) + (i * 0.05) + (segmentIndex * 0.02),
                                duration: 0.3
                              }}
                            />
                          );
                        })}
                      </div>

                      <AnimatePresence>
                        {activeItem === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            className="bg-blue-500/5 rounded-lg border border-blue-500/10 p-3 overflow-hidden"
                          >
                            <p className="text-[11px] text-blue-200/70 font-mono leading-relaxed uppercase tracking-wider">
                              <span className="text-blue-400 mr-2">▶</span>
                              {item.detail}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center"
        >
          <p className="text-xs text-zinc-500 font-mono tracking-[0.2em] uppercase">
            All system modules operational // redundancy checks pass
          </p>
        </motion.div>
      </div>
    </section>
  );
}
