"use client";

import { useEffect, ReactNode } from "react";

declare global {
  interface Window {
    Lenis?: new (options?: { lerp?: number; smooth?: boolean }) => {
      raf: (time: number) => void;
      scrollTo: (target: string | number | HTMLElement) => void;
      destroy: () => void;
      on: (
        event: string,
        callback: (...args: unknown[]) => void
      ) => void;
      off: (
        event: string,
        callback: (...args: unknown[]) => void
      ) => void;
    };
  }
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    let lenis: InstanceType<NonNullable<typeof window.Lenis>> | null = null;
    let previousScrollBehavior: string | null = null;
    let scrollerCleanup: null | (() => void) = null;

    const initLenis = async () => {
      try {
        const Lenis = (await import("@studio-freight/lenis")).default;
        lenis = new Lenis({
          lerp: 0.1,
          smoothWheel: true,
          syncTouch: true,
        });

        previousScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";

        // Keep GSAP ScrollTrigger in sync with Lenis's virtual scroll.
        try {
          const gsapMod = await import("gsap");
          const ScrollTriggerMod = await import("gsap/ScrollTrigger");
          const gsap = gsapMod.default;
          const { ScrollTrigger } = ScrollTriggerMod;
          gsap.registerPlugin(ScrollTrigger);

          const onLenisScroll = () => ScrollTrigger.update();
          // Lenis emits scroll events on every frame of virtual scroll.
          lenis.on("scroll", onLenisScroll);
          scrollerCleanup = () => {
            lenis?.off?.("scroll", onLenisScroll);
          };

          // Ensure measurements are correct after Lenis starts.
          setTimeout(() => ScrollTrigger.refresh(), 50);
        } catch {
          // If gsap/ScrollTrigger isn't available, keep Lenis only.
        }

        function raf(time: number) {
          lenis?.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      } catch {
        // Fallback: native scroll if Lenis fails
      }
    };

    initLenis();

    return () => {
      lenis?.destroy();
      scrollerCleanup?.();
      if (previousScrollBehavior !== null) {
        document.documentElement.style.scrollBehavior = previousScrollBehavior;
      }
    };
  }, []);

  return <>{children}</>;
}
