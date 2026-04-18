"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";

const links = [
  { href: "mailto:csjob.developer@gmail.com", label: "Email", icon: "✉️" },
  { href: "https://github.com/csjob", label: "GitHub", icon: "⌘" },
  { href: "https://www.linkedin.com/in/cs-job/", label: "LinkedIn", icon: "in" },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      id="contact"
      data-story-section
      className="relative py-24 md:py-32 px-6 overflow-hidden"
      ref={ref}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">
            Establish Connection
          </span>
          <h2
            className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Let&apos;s Build Something Scalable & Intelligent
          </h2>
          <p className="mt-6 text-lg text-zinc-500 max-w-2xl mx-auto">
            Whether you&apos;re looking for a Full Stack .NET Engineer, exploring collaboration
            on scalable systems, or just want to connect — I&apos;d love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-blue-500/50 transition-all duration-300"
            >
              <span className="text-xl">{link.icon}</span>
              <span className="font-medium">{link.label}</span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <MagneticButton
            as="a"
            href="mailto:csjob@example.com"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/25"
          >
            Start a Conversation
          </MagneticButton>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-24 pt-8 border-t border-white/5"
        >
          <p className="text-zinc-600 text-sm">
            © {new Date().getFullYear()} C S Job. Built with Next.js, Tailwind & passion.
          </p>
        </motion.footer>
      </div>
    </section>
  );
}
