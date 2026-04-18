"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CursorParallax } from "@/components/ui/CursorParallax";

const ROTATING_KEYWORDS = ["Cybersecurity", "AI", "Cloud APIs"];

const GRADIENT =
  "bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent";

export function HeroContent() {
  const [keywordIndex, setKeywordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage1NameRef = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const stage3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const keyword = ROTATING_KEYWORDS[keywordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < keyword.length) {
            setDisplayText(keyword.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setKeywordIndex((prev) => (prev + 1) % ROTATING_KEYWORDS.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, keywordIndex]);

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx: { revert: () => void } | null = null;

    const run = async () => {
      const gsapMod = await import("gsap");
      const gsap = gsapMod.default;
      const ScrollTriggerMod = await import("gsap/ScrollTrigger");
      const { ScrollTrigger } = ScrollTriggerMod;
      gsap.registerPlugin(ScrollTrigger);

      const stage1 = stage1Ref.current;
      const stage1Name = stage1NameRef.current;
      const stage2 = stage2Ref.current;
      const stage3 = stage3Ref.current;
      if (!stage1 || !stage1Name || !stage2 || !stage3) return;

      const sourceC = stage1Name.querySelector<HTMLElement>(".cs-letter-c");
      const sourceS = stage1Name.querySelector<HTMLElement>(".cs-letter-s");
      const targetC = stage2.querySelector<HTMLElement>(".name-c");
      const targetS = stage2.querySelector<HTMLElement>(".name-s");
      if (!sourceC || !sourceS || !targetC || !targetS) return;

      const sourceCRect = sourceC.getBoundingClientRect();
      const sourceSRect = sourceS.getBoundingClientRect();
      const targetCRect = targetC.getBoundingClientRect();
      const targetSRect = targetS.getBoundingClientRect();

      const cDeltaX = targetCRect.left - sourceCRect.left;
      const cDeltaY = targetCRect.top - sourceCRect.top;
      const sDeltaX = targetSRect.left - sourceSRect.left;
      const sDeltaY = targetSRect.top - sourceSRect.top;

      const stage2SourceC = stage2.querySelector<HTMLElement>(".name-c");
      const stage2SourceS = stage2.querySelector<HTMLElement>(".name-s");
      const stage3TargetC = stage3.querySelector<HTMLElement>(".course-c");
      const stage3TargetS = stage3.querySelector<HTMLElement>(".course-s");
      if (!stage2SourceC || !stage2SourceS || !stage3TargetC || !stage3TargetS) return;

      const stage2CRect = stage2SourceC.getBoundingClientRect();
      const stage2SRect = stage2SourceS.getBoundingClientRect();
      const stage3CRect = stage3TargetC.getBoundingClientRect();
      const stage3SRect = stage3TargetS.getBoundingClientRect();

      const cDelta2X = stage3CRect.left - stage2CRect.left;
      const cDelta2Y = stage3CRect.top - stage2CRect.top;
      const sDelta2X = stage3SRect.left - stage2SRect.left;
      const sDelta2Y = stage3SRect.top - stage2SRect.top;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        // Stage 1: keep C S Job centered and visible first.
        tl.fromTo(stage1, { opacity: 1 }, { opacity: 1 }, 0);
        tl.to(
          stage1.querySelector(".stage1-rest"),
          {
            opacity: 0,
            y: -40,
            filter: "blur(8px)",
          },
          0.36
        );

        // Move C and S downward from first section.
        tl.fromTo(
          sourceC,
          { x: 0, y: 0 },
          { x: cDeltaX, y: cDeltaY },
          0.34
        );
        tl.fromTo(
          sourceS,
          { x: 0, y: 0 },
          { x: sDeltaX, y: sDeltaY },
          0.36
        );
        tl.to(
          stage1Name.querySelector(".job-part"),
          { opacity: 0, y: -20 },
          0.38
        );
        tl.to(
          stage1Name,
          { opacity: 0, y: 10 },
          0.44
        );
        tl.to(stage1, { opacity: 0 }, 0.52);

        // Stage 2: full-page centered Cherukara Shaji Job.
        tl.fromTo(
          stage2,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0 },
          0.5
        );
        tl.fromTo(stage2.querySelector(".full-name"), { scale: 0.98 }, { scale: 1 }, 0.5);
        tl.fromTo(
          stage2.querySelectorAll(".name-rest"),
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0 },
          0.52
        );
        tl.fromTo(
          stage2.querySelector(".name-job"),
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0 },
          0.54
        );
        tl.fromTo(
          stage2.querySelector(".name-c"),
          { opacity: 0 },
          { opacity: 1 },
          0.62
        );
        tl.fromTo(
          stage2.querySelector(".name-s"),
          { opacity: 0 },
          { opacity: 1 },
          0.64
        );

        // Stage 3: same style as above - move C/S down to Computer/Science initials.
        tl.fromTo(stage2, { opacity: 1 }, { opacity: 1 }, 0.7);
        tl.fromTo(
          stage2SourceC,
          { x: 0, y: 0 },
          { x: cDelta2X, y: cDelta2Y },
          0.78
        );
        tl.fromTo(
          stage2SourceS,
          { x: 0, y: 0 },
          { x: sDelta2X, y: sDelta2Y },
          0.8
        );
        tl.to(stage2.querySelectorAll(".name-rest"), { opacity: 0, y: -12 }, 0.82);
        tl.to(stage2.querySelector(".name-job"), { opacity: 0, y: -12 }, 0.82);
        tl.to(stage2, { opacity: 0 }, 0.92);

        tl.fromTo(
          stage3,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0 },
          0.9
        );
        tl.fromTo(
          stage3.querySelectorAll(".course-rest"),
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0 },
          0.92
        );
        tl.fromTo(
          stage3.querySelector(".course-c"),
          { opacity: 0 },
          { opacity: 1 },
          0.96
        );
        tl.fromTo(
          stage3.querySelector(".course-s"),
          { opacity: 0 },
          { opacity: 1 },
          0.98
        );
        // Hold Computer Science full-screen before releasing to next section.
        tl.fromTo(stage3, { opacity: 1 }, { opacity: 1 }, 1.08);
      });
    };

    run();

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center overflow-hidden"
    >
      {/* Stage 1: C S Job */}
      <div
        ref={stage1Ref}
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base font-mono text-blue-400/90 tracking-widest uppercase"
          >
            Welcome
          </motion.p>

          {/* Stage-1 title: C S Job */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-sora)", perspective: "1200px" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div
              ref={stage1NameRef}
              className="inline-flex items-baseline origin-center whitespace-nowrap gap-[0.2em]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="inline-flex items-baseline">
                <span className={`cs-letter-c inline-block ${GRADIENT}`}>C</span>
              </span>
              <span className="inline-flex items-baseline">
                <span className={`cs-letter-s inline-block ${GRADIENT}`}>S</span>
              </span>
              <span className="job-part inline-block overflow-hidden whitespace-nowrap transition-opacity">
                <span className={`inline ${GRADIENT}`}>Job</span>
              </span>
            </div>
          </motion.h1>

          <div className="stage1-rest space-y-4">
            <motion.div
              className="text-xl sm:text-2xl md:text-3xl text-blue-300/90 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Full Stack .NET Engineer
            </motion.div>

            <motion.div
              className="min-h-[2.5rem] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <span className="text-lg md:text-xl text-purple-300/90 font-mono">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
            </motion.div>
          </div>
        </motion.div>

        <CursorParallax strength={5} className="stage1-rest w-full flex justify-center mt-6">
          <motion.p
            className="max-w-2xl text-base md:text-lg text-zinc-400 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Building Scalable & Secure Systems | Angular & Cloud-Ready APIs |
            Exploring AI, GenAI & LLMs for Intelligent Applications | Aspiring
            Tech Leader
          </motion.p>
        </CursorParallax>



        <motion.div
          className="stage1-rest absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-zinc-500 hover:text-blue-400 transition-colors"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-2"
            >
              <motion.div className="w-1 h-2 rounded-full bg-current" />
            </motion.div>
          </a>
        </motion.div>
      </div>

      {/* Stage 2: centered full-name section */}
      <div
        ref={stage2Ref}
        className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none"
      >
        <h2
          className="full-name inline-flex items-baseline gap-[0.2em] whitespace-nowrap text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-sora)" }}
        >
          <span className="inline-flex items-baseline">
            <span className={`name-c opacity-0 ${GRADIENT}`}>C</span>
            <span className={`name-rest opacity-0 ${GRADIENT}`}>herukara</span>
          </span>
          <span className="inline-flex items-baseline">
            <span className={`name-s opacity-0 ${GRADIENT}`}>S</span>
            <span className={`name-rest opacity-0 ${GRADIENT}`}>haji</span>
          </span>
          <span className={`name-job opacity-0 ${GRADIENT}`}>Job</span>
        </h2>
      </div>

      {/* Stage 3: centered course section */}
      <div
        ref={stage3Ref}
        className="absolute inset-0 flex items-center justify-center pt-20 sm:pt-24 opacity-0 pointer-events-none"
      >
        <h2
          className="inline-flex items-baseline gap-[0.2em] whitespace-nowrap text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-sora)" }}
        >
          <span className="inline-flex items-baseline">
            <span className={`course-c opacity-0 ${GRADIENT}`}>C</span>
            <span className={`course-rest opacity-0 ${GRADIENT}`}>omputer</span>
          </span>
          <span className="inline-flex items-baseline">
            <span className={`course-s opacity-0 ${GRADIENT}`}>S</span>
            <span className={`course-rest opacity-0 ${GRADIENT}`}>cience</span>
          </span>
        </h2>
      </div>

    </div>
  );
}
