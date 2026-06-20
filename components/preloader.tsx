"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

const lines = ["initializing system", "loading profile", "ready"];

export function Preloader() {
  const [visible, setVisible] = React.useState(true);
  const [lineIndex, setLineIndex] = React.useState(0);

  React.useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setVisible(false);
      return;
    }

    const lineTimer = setInterval(() => {
      setLineIndex((i) => Math.min(i + 1, lines.length - 1));
    }, 220);

    const hideTimer = setTimeout(() => setVisible(false), 850);

    return () => {
      clearInterval(lineTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
        >
          <div className="font-mono text-sm text-muted">
            <span className="text-primary">$</span> {lines[lineIndex]}
            <span className="ml-1 inline-block h-3.5 w-[7px] animate-blink bg-primary align-middle" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
