"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Outlook Add-in (Email Scanner)",
    problem: "Enterprise email security risks from phishing and malicious attachments.",
    solution:
      "Built a custom Outlook add-in that scans emails in real-time, flags suspicious content, and integrates with security policies. Reduces manual review time by 60%.",
    tech: [".NET", "Office.js", "REST APIs", "Azure"],
    visual: "email",
  },
  {
    id: 2,
    title: "Real-time IT Management System",
    problem: "IT teams needed instant visibility into system health and incidents.",
    solution:
      "Developed a SignalR-powered dashboard for real-time monitoring, alerting, and incident management. Sub-second updates across distributed teams.",
    tech: ["SignalR", "ASP.NET Core", "Angular", "SQL Server"],
    visual: "dashboard",
  },
  {
    id: 3,
    title: "Web API Systems",
    problem: "Legacy monoliths couldn't scale or support modern client needs.",
    solution:
      "Designed and built scalable REST/GraphQL APIs with clean architecture, authentication, rate limiting, and comprehensive documentation.",
    tech: ["ASP.NET Core", "Entity Framework", "JWT", "Swagger"],
    visual: "api",
  },
  {
    id: 4,
    title: "UI/Frontend Projects",
    problem: "Inconsistent UX and slow development cycles across products.",
    solution:
      "Created reusable component libraries, design systems, and optimized Angular/React applications with accessibility and performance in mind.",
    tech: ["Angular", "React", "TypeScript", "Tailwind"],
    visual: "ui",
  },
  {
    id: 5,
    title: "AI/ML Learning (Experimental)",
    problem: "Exploring intelligent automation and LLM integration possibilities.",
    solution:
      "Experimenting with GenAI, prompt engineering, and LLM APIs to build smarter internal tools and assistive features.",
    tech: ["Python", "OpenAI API", "LangChain", "Vector DBs"],
    visual: "ai",
  },
];

function ProjectVisual({ type }: { type: string }) {
  return (
    <div className="relative w-full h-40 md:h-48 rounded-xl bg-white/[0.03] border border-white/10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="scan-anim absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-blue-500/25 to-transparent" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        {type === "email" && (
          <div className="space-y-2 w-32">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-4 rounded bg-blue-500/20 animate-pulse"
                style={{ width: `${60 + i * 15}%` }}
              />
            ))}
            <div className="h-2 rounded bg-green-500/30 w-1/2 mt-2" />
          </div>
        )}
        {type === "dashboard" && (
          <div className="grid grid-cols-3 gap-1 w-24">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="h-6 rounded bg-purple-500/20"
                style={{ animationDelay: `${i * 50}ms` }}
              />
            ))}
          </div>
        )}
        {type === "api" && (
          <div className="font-mono text-xs text-blue-400/60">
            <span>GET /api/v1</span>
            <br />
            <span>POST /auth</span>
          </div>
        )}
        {type === "ui" && (
          <div className="flex gap-2">
            <div className="w-8 h-12 rounded bg-blue-500/20" />
            <div className="w-8 h-12 rounded bg-purple-500/20" />
            <div className="w-8 h-12 rounded bg-cyan-500/20" />
          </div>
        )}
        {type === "ai" && (
          <div className="text-4xl opacity-30">🤖</div>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      id="projects"
      data-story-section
      className="relative py-24 md:py-32 overflow-hidden"
      ref={ref}
    >
      <div className="px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">
            System Execution
          </span>
          <h2
            className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Executing{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent">
              Real-world Systems
            </span>
          </h2>
        </motion.div>
      </div>

      <div className="overflow-x-auto pb-12 scrollbar-hide snap-x snap-mandatory">
        <div className="flex gap-6 px-6 min-w-max lg:min-w-0 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:max-w-7xl lg:mx-auto lg:gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="w-[88vw] sm:w-[76vw] md:w-[64vw] lg:w-auto flex-shrink-0 snap-start rounded-2xl bg-white/[0.02] border border-white/10 p-6 hover:border-blue-500/30 transition-all duration-300 group"
              data-story-reveal
            >
              <ProjectVisual type={project.visual} />
              <h3 className="mt-6 text-xl font-semibold text-white group-hover:text-blue-300 transition-colors" style={{ fontFamily: "var(--font-sora)" }}>
                {project.title}
              </h3>
              <div className="mt-4 space-y-2">
                <div>
                  <span className="text-xs text-zinc-500 uppercase">Problem</span>
                  <p className="text-sm text-zinc-400 mt-0.5">{project.problem}</p>
                </div>
                <div>
                  <span className="text-xs text-zinc-500 uppercase">Solution</span>
                  <p className="text-sm text-zinc-400 mt-0.5">{project.solution}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-xs font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
