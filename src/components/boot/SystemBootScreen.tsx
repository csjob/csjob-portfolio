"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BOOT_LINES = [
  "Initializing System...",
  "Loading Developer Profile...",
  "Running Security Checks...",
  "Authenticating...",
  "Access Granted.",
];

export function SystemBootScreen({
  name = "C S Job",
  onComplete,
}: {
  name?: string;
  onComplete: () => void;
}) {
  const [lineIndex, setLineIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const sleep = (ms: number) =>
      new Promise<void>((r) => setTimeout(r, ms));

    const run = async () => {
      for (let i = 0; i < BOOT_LINES.length; i++) {
        if (cancelled) return;
        setLineIndex(i);
        setTyped("");

        const line = BOOT_LINES[i];
        for (let j = 0; j <= line.length; j++) {
          if (cancelled) return;
          setTyped(line.slice(0, j));
          await sleep(18);
        }

        await sleep(260);
      }

      if (cancelled) return;
      setDone(true);
      await sleep(650);
      if (cancelled) return;
      onComplete();
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [onComplete]);

  const progress = lineIndex / BOOT_LINES.length;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#0A0A0F]"
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      style={{ pointerEvents: done ? "none" : "auto" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* scanline + subtle grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08)_0%,transparent_55%)]" />
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute left-0 right-0 top-0 h-24 bg-gradient-to-b from-blue-500/20 to-transparent animate-pulse" />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(59,130,246,0.18),transparent)]"
          style={{
            transform: `translateY(${(1 - progress) * 120}vh)`,
            opacity: 0.5,
          }}
        />
      </div>

      <div className="relative h-full max-w-5xl mx-auto px-6 flex flex-col justify-center">
        <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Column: Boot Text & Identity */}
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_18px_rgba(59,130,246,0.6)]" />
                  <span className="text-sm font-mono text-blue-300/90 tracking-widest">
                    SYSTEM BOOT
                  </span>
                </div>
                <span className="text-xs font-mono text-zinc-500">
                  SECURE / ENCRYPTED
                </span>
              </div>

              <div className="flex-grow space-y-2 font-mono text-sm md:text-base text-zinc-300 min-h-[160px]">
                {BOOT_LINES.slice(0, lineIndex).map((l) => (
                  <div key={l} className="text-blue-200/90 animate-in fade-in slide-in-from-left-2 duration-300">
                    {l}
                  </div>
                ))}
                <div className="text-blue-300/90 flex items-center gap-2">
                  <span>{typed}</span>
                  <span className="inline-block w-[8px] h-[14px] bg-blue-300/80 animate-pulse" />
                </div>
              </div>

              <div className="mt-6">
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 transition-all duration-300 ease-out"
                    style={{ width: `${Math.round(progress * 100)}%` }}
                  />
                </div>
                <div className="mt-3 text-xs text-zinc-500 font-mono tracking-widest flex justify-between">
                  <span>{done ? "READY" : "BOOTSTRAP IN PROGRESS"}</span>
                  <span>{Math.round(progress * 100)}%</span>
                </div>
              </div>

              <motion.div
                className="mt-8"
                initial={false}
                animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.35 }}
              >
                <div className="text-xs font-mono text-zinc-500 tracking-widest uppercase">
                  identity module loaded
                </div>
                <div className="mt-2 text-3xl md:text-5xl font-bold tracking-tight">
                  <span
                    className="bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent inline-block hover:animate-glitch"
                    style={{ fontFamily: "var(--font-sora)" }}
                  >
                    {name}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Avatar Video */}
            <motion.div 
              className="relative flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full max-w-[320px] aspect-square rounded-2xl overflow-hidden border border-white/5 bg-white/low-opacity-background flex items-center justify-center">
                {/* Decorative scanning effects */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-500/10 to-transparent scan-anim" />
                  <div className="absolute inset-0 border-[4px] border-blue-500/10 rounded-2xl" />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
                    <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse [animation-delay:200ms]" />
                  </div>
                </div>

                <video
                  src="/videos/cool-boy_scan.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-110"
                  style={{ mixBlendMode: 'screen' }}
                />
                
                {/* Glow behind video */}
                <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full -z-10" />
              </div>
              
              {/* Corner Accents */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-blue-400/50" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-blue-400/50" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

