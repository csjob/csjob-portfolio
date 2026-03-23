"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const experiences = [
  {
    year: "2024 - Present",
    role: "Senior Full Stack Engineer",
    company: "Tech Company",
    highlights: [
      "Led architecture decisions for scalable .NET microservices",
      "Reduced API latency by 40% through optimization",
      "Mentored junior developers on best practices",
    ],
  },
  {
    year: "2022 - 2024",
    role: "Full Stack .NET Developer",
    company: "Enterprise Solutions",
    highlights: [
      "Built real-time dashboards with SignalR serving 10K+ users",
      "Implemented security-first email scanning add-in",
      "Collaborated with cross-functional teams on cloud migration",
    ],
  },
  {
    year: "2020 - 2022",
    role: "Software Developer",
    company: "Product Startup",
    highlights: [
      "Developed RESTful APIs and Angular frontends",
      "Established CI/CD pipelines with Azure DevOps",
      "Contributed to product roadmap and technical decisions",
    ],
  },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      data-story-section
      className="relative py-24 md:py-32 px-6 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">
            System Logs
          </span>
          <h2
            className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            System{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent">
              Logs
            </span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <motion.div
            data-timeline-line
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-transparent"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5 }}
            style={{ transformOrigin: "top" }}
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className={`relative flex flex-col md:flex-row items-start gap-6 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              data-story-reveal
              >
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-blue-500 -translate-x-1/2 mt-2 ring-4 ring-[#0A0A0F]" />
                <div
                  className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                    i % 2 === 1 ? "md:mr-8 md:text-right md:ml-auto" : "md:mr-8"
                  }`}
                >
                  <span className="text-xs font-mono text-blue-400">{exp.year}</span>
                  <h3 className="text-xl font-semibold text-white mt-1" style={{ fontFamily: "var(--font-sora)" }}>
                    {exp.role}
                  </h3>
                  <p className="text-zinc-500 text-sm">{exp.company}</p>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: i * 0.2 + 0.3 }}
                  className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-blue-500/20 transition-colors ${
                    i % 2 === 1 ? "md:mr-8 md:order-first" : "md:mr-8"
                  }`}
                >
                  <ul className="space-y-2">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="text-sm text-zinc-400 flex items-start gap-2">
                        <span className="text-blue-500 mt-1">→</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
