# Rishik Ellendula — Portfolio

A production-grade personal portfolio built with Next.js 15 (App Router), TypeScript, Tailwind
CSS and Framer Motion. Dark by default, fully responsive, and structured so every section's
content lives in one place you can edit without touching component code.

## Tech stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS (hand-rolled design tokens, no default theme)
- Framer Motion for animation
- shadcn-style UI primitives (hand-authored, no CLI dependency)
- Lucide icons
- next-themes for the dark/light toggle

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To build and run a production server locally:

```bash
npm run build
npm run start
```

## Project structure

```
app/                  Routes, layout, global styles, sitemap/robots, contact API route
components/
  sections/            One file per page section (hero, about, skills, projects, ...)
  layout/              Navbar, footer, status bar
  projects/            Architecture diagram + screenshot carousel used inside Projects
  ui/                  Button, Card, Badge, Input, Textarea, Kbd, etc.
  command-palette.tsx  Ctrl/Cmd+K quick navigation
  preloader.tsx        Short boot animation on first load
lib/
  data.ts              ALL editable content: profile, skills, projects, achievements, certs
  metadata.ts          Site title/description/OG/JSON-LD config
  utils.ts             cn() class helper
types/                 Shared TypeScript interfaces for the content in lib/data.ts
public/                resume.pdf, og-image.png, favicon.ico, /projects screenshots
```

**To update content** (name, bio, projects, skills, achievements, certifications, social
links), edit `lib/data.ts`. You should not need to touch component files for routine edits.

## Things to swap before you ship this

1. **Resume** — `public/resume.pdf` is a placeholder. Replace it with your real resume,
   keeping the same filename, and the "Download Resume" buttons will serve it automatically.
2. **Domain** — `lib/metadata.ts` has `siteConfig.url` set to a placeholder domain. Update it
   to your real production URL once you have one; this feeds the sitemap, robots.txt,
   OpenGraph tags and JSON-LD structured data.
3. **OG image** — `public/og-image.png` is a generated placeholder matching the site's
   palette. Swap it for a real one if you want something more custom (1200×630px).
4. **Contact form** — `app/api/contact/route.ts` currently validates input and logs it to
   the server console; it does **not** send you an email yet. Wire it up to a real provider
   before relying on it, for example:
   - [Resend](https://resend.com) (`npm install resend`, a few lines in the route handler)
   - SendGrid / Nodemailer with SMTP credentials
   - A form backend like Formspree or Getform if you'd rather not write backend code
5. **Coding profile numbers** — `codingProfiles` in `lib/data.ts` (LeetCode, HackerRank,
   Smart Interviews) holds placeholder figures. Update them by hand, or wire them to an API
   if you maintain one. The GitHub stats panel and contribution graph next to it *are* live —
   they call the public GitHub API and a public chart service at request time, no token
   required.
6. **Certificate links & images** — `certifications` in `lib/data.ts` supports a
   `credentialUrl` field per certificate; add yours (e.g. your Credly badge links) to make
   the "View credential" links appear.
7. **Project screenshots** — drop images into `public/projects/` and pass their paths into
   `<ScreenshotCarousel slides={[...]} />` in `components/sections/projects.tsx` to replace
   the placeholder carousel frames.

## Notes on a few implementation choices

- Google Fonts aren't used (`next/font/google` requires a network call to Google's font CDN
  at build time, which fails in network-restricted environments such as this sandbox). The
  type system instead uses a curated system-font stack for the sans face and a monospace
  stack for labels/data, which renders natively and instantly with zero font-loading flash.
  If you want a specific webfont (e.g. Geist, Inter), it's a small change in
  `tailwind.config.ts` plus adding the font files locally to `public/fonts`.
- The GitHub contribution graph image comes from a public, unauthenticated chart service
  (`ghchart.rshah.org`). It's reliable for personal use but if it's ever down, consider
  swapping in `github-readme-stats` or a self-hosted chart.

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Framework preset: Next.js (auto-detected). No environment variables are required for the
   base site to work. If you wire up a contact-form email provider, add its API key as an
   environment variable in the Vercel project settings.
4. Deploy. Vercel will give you a `*.vercel.app` URL; attach your own domain from the
   project's Domains settings if you have one, and update `siteConfig.url` accordingly.

## Bonus features implemented

Resume download, GitHub stats + contribution graph + latest repos (live), coding profiles
panel, dark/light theme toggle, SEO metadata + OpenGraph + Twitter cards, JSON-LD structured
data (Person schema), `sitemap.xml` and `robots.txt`, a short animated boot screen on load,
a Cmd/Ctrl+K command palette, in-page project search, and scroll-reveal section animations
throughout.
