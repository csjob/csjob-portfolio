"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [show, setShow] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isHoveringRef = useRef(false);
  const isVisibleRef = useRef(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    // Client-only: avoid hydration mismatch (server can't read matchMedia)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional post-mount sync
    setShow(!window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      x.set(e.clientX);
      y.set(e.clientY);

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      const nextIsHovering = !!target?.closest("a, button, [data-cursor-hover]");
      if (nextIsHovering !== isHoveringRef.current) {
        isHoveringRef.current = nextIsHovering;
        setIsHovering(nextIsHovering);
      }
    };

    const handleMouseEnter = () => {
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
      isHoveringRef.current = false;
      setIsHovering(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y]);

  if (!show) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{ scale: isHovering ? 2 : 1, opacity: isVisible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        style={{ x, y, transform: "translate(-50%, -50%)" }}
      >
        <motion.div
          className={`rounded-full bg-white transition-colors ${
            isHovering ? "w-4 h-4 opacity-80" : "w-2 h-2 opacity-100"
          }`}
          initial={false}
        />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{ scale: isHovering ? 1.5 : 1, opacity: isVisible ? 1 : 0.6 }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        style={{ x, y, transform: "translate(-50%, -50%)" }}
      >
        <motion.div
          className={`rounded-full border-2 border-blue-500/60 transition-all ${
            isHovering ? "w-12 h-12 opacity-40" : "w-8 h-8 opacity-30"
          }`}
          animate={{
            boxShadow: isHovering
              ? "0 0 30px rgba(59, 130, 246, 0.6)"
              : "0 0 15px rgba(59, 130, 246, 0.3)",
          }}
        />
      </motion.div>
    </>
  );
}
