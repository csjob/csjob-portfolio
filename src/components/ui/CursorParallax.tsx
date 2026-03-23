"use client";

import { ReactNode, useEffect, useState } from "react";
import { useReducedMotion, motion, useSpring, useTransform } from "framer-motion";
import { usePointerMotion } from "@/components/providers/PointerMotionProvider";

export function CursorParallax({
  children,
  strength = 12,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const { normX, normY } = usePointerMotion();

  useEffect(() => {
    // Client-only: render static until mount to avoid hydration mismatch
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional post-mount sync
    setMounted(true);
  }, []);

  const translateX = useSpring(
    useTransform(normX, [0, 1], [-strength, strength]),
    { stiffness: 220, damping: 22, mass: 0.2 }
  );
  const translateY = useSpring(
    useTransform(normY, [0, 1], [strength, -strength]),
    { stiffness: 220, damping: 22, mass: 0.2 }
  );
  const rotateY = useSpring(
    useTransform(normX, [0, 1], [strength * 0.08, -strength * 0.08]),
    { stiffness: 220, damping: 22, mass: 0.2 }
  );
  const rotateX = useSpring(
    useTransform(normY, [0, 1], [-strength * 0.06, strength * 0.06]),
    { stiffness: 220, damping: 22, mass: 0.2 }
  );

  if (!mounted || reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{
        x: translateX,
        y: translateY,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
}

