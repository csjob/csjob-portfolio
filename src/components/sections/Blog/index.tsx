"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const posts = [
  {
    title: ".NET Development Unleashed",
    excerpt:
      "A deep dive into .NET development, covering my experiences, best practices, and tips for building scalable applications with .NET technologies.",
    tag: ".NET",
  },
  {
    title: "A Journey To Python Django",
    excerpt:
      "My experience learning Python Django and building web applications with it. Tips, tricks, and common pitfalls to avoid.",
    tag: "Python",
  },
  {
    title: "GIT — BIT BY BIT",
    excerpt:
      "Exploring GIT, GitHub, and how they can supercharge your development workflow. Branching strategies, pull requests, and collaboration tips.",
    tag: "GIT",
  },
];

export function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      id="blog"
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
            Knowledge Base
          </span>
          <h2
            className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Knowledge{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Base
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl bg-white/[0.02] border border-white/10 p-6 hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
              data-story-reveal
            >
              <span className="text-xs font-mono text-blue-400">{post.tag}</span>
              <h3 className="mt-3 text-lg font-semibold text-white group-hover:text-blue-300 transition-colors" style={{ fontFamily: "var(--font-sora)" }}>
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-500 line-clamp-2">{post.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Read more
                <span>→</span>
              </span>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-zinc-500 text-sm">More posts coming soon. Follow the journey.</p>
        </motion.div>
      </div>
    </section>
  );
}
