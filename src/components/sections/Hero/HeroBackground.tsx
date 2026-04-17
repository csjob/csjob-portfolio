"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./HeroScene").then((mod) => mod.HeroScene), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[#0A0A0F]" />
  ),
});

export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Scene />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/20 via-transparent to-[#0A0A0F]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0A0A0F_60%)] opacity-70" />
    </div>
  );
}
