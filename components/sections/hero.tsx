"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Github, Linkedin, Download, Code2, Terminal, BadgeCheck } from "lucide-react";
import { profile, socialLinks } from "@/lib/data";
import { Button } from "@/components/ui/button";

import dynamic from "next/dynamic";

const HeroCanvas3D = dynamic(
  () => import("@/components/canvas/three-canvas").then((mod) => mod.HeroCanvas3D),
  {
    ssr: false,
    loading: () => (
      <div className="relative h-[350px] w-full md:h-[480px] rounded-2xl overflow-hidden bg-radial-glow border border-border/30 bg-surface/10 animate-pulse flex items-center justify-center font-mono text-xs text-muted">
        Loading 3D Canvas...
      </div>
    ),
  }
);

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  code: Code2,
  terminal: Terminal,
  "badge-check": BadgeCheck,
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.08 * i, ease: "easeOut" as const },
  }),
};

export function Hero() {
  const [isZoomed, setIsZoomed] = React.useState(false);

  return (
    <section className="relative overflow-hidden pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grid-pattern bg-[size:56px_56px] bg-radial-glow grid-mask opacity-60"
      />

      <div className="container-px relative mx-auto max-w-6xl">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.25fr]">
          <div>
            {/* Profile Photo Card (top left) */}
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate="show"
              className="mb-6 inline-block"
            >
              <div
                onClick={() => setIsZoomed(true)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-surface p-1.5 shadow-xl transition-all hover:border-primary/50 hover:scale-[1.03] hover:shadow-primary/10 duration-300 w-32 h-[150px] sm:w-40 sm:h-[190px]"
              >
                <div className="relative h-full w-full overflow-hidden rounded-xl">
                  <Image
                    src="/rishik.jpg"
                    alt="Rishik Ellendula"
                    width={160}
                    height={160}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="font-mono text-[10px] text-white border border-white/20 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                      Zoom
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="show"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-xs text-muted"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-success" />
              </span>
              {profile.status}
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="show"
              className="font-sans text-4xl font-bold leading-[1.08] tracking-tightest text-foreground sm:text-5xl lg:text-6xl"
            >
              {profile.name}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="show"
              className="mt-4 font-mono text-sm text-primary sm:text-base"
            >
              {profile.title}
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate="show"
              className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={5}
              initial="hidden"
              animate="show"
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button asChild size="lg">
                <a href="#projects">
                  View Projects
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={profile.resumeHref} download>
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <a href="#contact">Contact Me</a>
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={6}
              initial="hidden"
              animate="show"
              className="mt-10 flex items-center gap-3"
            >
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon] ?? Code2;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    title={link.label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="flex flex-col gap-6 w-full"
          >
            {/* 3D Canvas Visual */}
            <HeroCanvas3D />

            {/* Mock IDE Card */}
            <div className="relative w-full glass rounded-2xl p-5 font-mono text-[12.5px] leading-relaxed shadow-2xl sm:text-sm">
              <div className="mb-3 flex items-center gap-2 border-b border-border pb-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-2 text-xs text-muted">profile.ts</span>
              </div>
              <pre className="overflow-x-auto whitespace-pre text-muted">
                <span className="text-primary">const</span> <span className="text-foreground">engineer</span> = {"{"}
                {"\n  "}<span className="text-muted">name:</span> <span className="text-success">&quot;Rishik Ellendula&quot;</span>,
                {"\n  "}<span className="text-muted">role:</span> <span className="text-success">&quot;AI Engineer&quot;</span>,
                {"\n  "}<span className="text-muted">university:</span> <span className="text-success">&quot;{profile.university}&quot;</span>,
                {"\n  "}<span className="text-muted">cgpa:</span> <span className="text-warning">{profile.cgpa}</span>,
                {"\n  "}<span className="text-muted">stack:</span> [<span className="text-success">&quot;Python&quot;</span>, <span className="text-success">&quot;Next.js&quot;</span>, <span className="text-success">&quot;LangChain&quot;</span>],
                {"\n  "}<span className="text-muted">focus:</span> [<span className="text-success">&quot;RAG&quot;</span>, <span className="text-success">&quot;LLMOps&quot;</span>, <span className="text-success">&quot;Full Stack&quot;</span>],
                {"\n  "}<span className="text-muted">status:</span> <span className="text-success">&quot;shipping&quot;</span>,
                {"\n"}{"}"}<span className="ml-1 inline-block h-3.5 w-[7px] animate-blink bg-primary align-middle" />
              </pre>

              {/* Degree Badge (placed at bottom-right) */}
              <div className="absolute -bottom-5 -right-5 hidden rounded-xl border border-border bg-surface px-4 py-3 font-mono text-xs text-muted shadow-xl sm:block">
                <span className="text-success">●</span> Final Year · {profile.degree}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src="/rishik.jpg"
                alt="Rishik Ellendula"
                width={500}
                height={625}
                className="max-h-[80vh] w-auto rounded-xl object-contain"
                priority
              />
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 border border-white/10 text-white/80 hover:text-white hover:bg-black/80 transition-colors"
                aria-label="Close photo"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
