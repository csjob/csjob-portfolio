"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { MotionValue, useMotionValue } from "framer-motion";

type PointerMotionContextValue = {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  normX: MotionValue<number>;
  normY: MotionValue<number>;
};

const PointerMotionContext =
  createContext<PointerMotionContextValue | null>(null);

export function PointerMotionProvider({ children }: { children: ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const normX = useMotionValue(0.5);
  const normY = useMotionValue(0.5);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    const onPointerMove = (e: PointerEvent) => {
      const w = Math.max(window.innerWidth, 1);
      const h = Math.max(window.innerHeight, 1);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      normX.set(e.clientX / w);
      normY.set(e.clientY / h);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () =>
      window.removeEventListener("pointermove", onPointerMove);
  }, [mouseX, mouseY, normX, normY]);

  const value = useMemo(
    () => ({
      mouseX,
      mouseY,
      normX,
      normY,
    }),
    [mouseX, mouseY, normX, normY]
  );

  return (
    <PointerMotionContext.Provider value={value}>
      {children}
    </PointerMotionContext.Provider>
  );
}

export function usePointerMotion() {
  const ctx = useContext(PointerMotionContext);
  if (!ctx) {
    throw new Error("usePointerMotion must be used within PointerMotionProvider");
  }
  return ctx;
}

