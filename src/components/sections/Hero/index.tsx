"use client";

import { HeroBackground } from "./HeroBackground";
import { HeroContent } from "./HeroContent";

export function Hero() {
  return (
    <section
      id="hero"
      data-story-section
      className="relative"
      style={{ minHeight: "420vh" }}
    >
      <div className="sticky top-0 h-screen w-full">
        <HeroBackground />
        <HeroContent />
      </div>
    </section>
  );
}
