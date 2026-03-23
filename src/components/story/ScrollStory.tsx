"use client";

import { useEffect } from "react";

export function ScrollStory({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled) return;

    let ctx: { revert: () => void } | null = null;

    const run = async () => {
      const gsapMod = await import("gsap");
      const gsap = gsapMod.default;
      const ScrollTriggerMod = await import("gsap/ScrollTrigger");
      const { ScrollTrigger } = ScrollTriggerMod;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const reveals = Array.from(
          document.querySelectorAll<HTMLElement>("[data-story-reveal]")
        );

        gsap.set(reveals, { opacity: 0, y: 24 });

        reveals.forEach((el) => {
          const trigger = el.closest("[data-story-section]") ?? el;
          ScrollTrigger.create({
            trigger,
            start: "top 80%",
            end: "bottom 20%",
            onEnter: () => {
              gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out",
              });
            },
            once: true,
          });
        });

        const aiPanel = document.querySelector<HTMLElement>(
          "[data-ai-panel]"
        );
        if (aiPanel) {
          gsap.set(aiPanel, { opacity: 0, y: 30 });
          ScrollTrigger.create({
            trigger: "#ai",
            start: "top 75%",
            end: "bottom 30%",
            onEnter: () => {
              gsap.to(aiPanel, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
              });
            },
            once: true,
          });
        }

        const timelineLine = document.querySelector<HTMLElement>(
          "[data-timeline-line]"
        );
        if (timelineLine) {
          gsap.set(timelineLine, { transformOrigin: "top", scaleY: 0 });
          ScrollTrigger.create({
            trigger: "#experience",
            start: "top 70%",
            end: "bottom 25%",
            scrub: true,
            onUpdate: (self) => {
              const p = Math.max(0, Math.min(1, self.progress));
              gsap.set(timelineLine, { scaleY: p });
            },
          });
        }
      });

      // Ensure layout is measured after Lenis/boot transitions.
      setTimeout(() => {
        try {
          ScrollTrigger.refresh();
        } catch {
          // ignore
        }
      }, 80);
    };

    run();

    return () => {
      ctx?.revert();
    };
  }, [enabled]);

  return null;
}

