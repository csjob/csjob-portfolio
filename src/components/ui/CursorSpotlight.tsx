"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePointerMotion } from "@/components/providers/PointerMotionProvider";

export function CursorSpotlight() {
  const reduced = useReducedMotion();
  const { mouseX, mouseY } = usePointerMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Client-only: avoid hydration mismatch (server can't read matchMedia)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional post-mount sync
    setEnabled(!window.matchMedia("(pointer: coarse)").matches);
  }, []);

  if (reduced || !enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 pointer-events-none z-[60] mix-blend-screen"
      style={{
        x: mouseX,
        y: mouseY,
        width: 520,
        height: 520,
        transform: "translate(-50%, -50%)",
        background:
          "radial-gradient(circle at center, rgba(59,130,246,0.20) 0%, rgba(139,92,246,0.08) 30%, transparent 62%)",
        filter: "blur(18px)",
        opacity: 0.9,
      }}
    />
  );
}

