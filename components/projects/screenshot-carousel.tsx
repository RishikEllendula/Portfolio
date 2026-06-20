"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

interface ScreenshotCarouselProps {
  projectName: string;
  slides?: string[];
}

export function ScreenshotCarousel({ projectName, slides }: ScreenshotCarouselProps) {
  const items = slides && slides.length > 0 ? slides : ["Dashboard", "Evaluation Run", "Cost Analytics"];
  const [index, setIndex] = React.useState(0);

  const go = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + items.length) % items.length);
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-surface/60">
      <div className="relative flex h-52 items-center justify-center sm:h-64">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center gap-2 text-muted"
          >
            <ImageIcon className="h-8 w-8" />
            <span className="font-mono text-xs">
              {projectName} — {items[index]}
            </span>
            <span className="font-mono text-[10px] text-muted/70">
              add a screenshot to /public/projects to replace this placeholder
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={() => go(-1)}
        aria-label="Previous screenshot"
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/80 p-1.5 text-muted hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next screenshot"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/80 p-1.5 text-muted hover:text-foreground"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      <div className="flex items-center justify-center gap-1.5 border-t border-border py-2">
        {items.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              i === index ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
