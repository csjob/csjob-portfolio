# C S Job — Full Stack .NET Engineer Portfolio

A premium, futuristic personal portfolio built with Next.js, featuring a cybersecurity-inspired dark theme, smooth animations, and an immersive storytelling experience.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion, GSAP-ready
- **3D:** Three.js + React Three Fiber (Hero section)
- **Smooth Scroll:** Lenis

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Customization

1. **Resume:** Add your `resume.pdf` to the `public` folder and it will be served at `/resume.pdf`.

2. **Contact links:** Update email, GitHub, and LinkedIn URLs in `src/components/sections/Contact/index.tsx`.

3. **Experience:** Edit the timeline in `src/components/sections/Experience/index.tsx` with your real roles.

4. **Projects:** Modify project data in `src/components/sections/Projects/index.tsx`.

## Features

- Full-screen Hero with Three.js particle grid
- Typing + rotating keyword animation
- Custom cursor with glow (desktop only)
- Magnetic buttons
- Glassmorphism UI
- Scroll-triggered section animations
- Fully responsive (mobile-first)
- Performance optimized (lazy-loaded Three.js)

## Build

```bash
npm run build
npm start
```
