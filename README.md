# AKAI — Sarthak Goyal Portfolio

A single-page data science and machine learning portfolio built with React, Vite, Tailwind CSS, GSAP, and Lucide icons.

## Features

- Illustrated scroll-based portfolio chapters
- Responsive desktop and mobile layouts
- GSAP cinematic transitions
- Printable, single-page A4 resume
- Auto-hiding navigation bar
- Optional looping background music with a persistent mute/play control
- Real ink-style portfolio artwork and project illustrations

## Local development

Requirements:

- Node.js 18 or newer
- npm

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Production build

```bash
npm run build
npm run preview
```

The deployable static output is generated in `dist/`.

## Deployment

Deploy the `dist/` directory to a static host such as Vercel, Netlify, GitHub Pages, or Cloudflare Pages.

Build command:

```bash
npm run build
```

Publish directory:

```text
dist
```

The site uses hash-based navigation, so it does not require server-side route rewrites for `/resume`.

## Project structure

```text
public/
  images/       Portfolio artwork
  music/        Background music
src/
  assets/       Asset metadata
  components/   Reusable interface and illustration components
  hooks/        Scroll and navigation behavior
  pages/        Portfolio and resume pages
  lib/          Portfolio content
```

## Background music credit

**Track:** [Nikos Spiliotis - Love Waltz](https://www.youtube.com/watch?v=ZRgDMewQk-c&pp=0gcJCR0AztywvtLA)

**Artist:** [Nikos Spiliotis](https://www.youtube.com/user/nikospiliotis/videos)

The track is used under a YouTube Free license.

Music powered by [BreakingCopyright](https://www.youtube.com/watch?v=ZRgDMewQk-c&pp=0gcJCR0AztywvtLA).
