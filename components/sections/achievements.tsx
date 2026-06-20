"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { achievements } from "@/lib/data";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";

export function Achievements() {
  return (
    <section id="achievements" className="border-t border-border py-20 sm:py-28">
      <div className="container-px mx-auto max-w-6xl">
        <SectionEyebrow index="05" label="Achievements" />
        <h2 className="font-sans text-3xl font-bold tracking-tightest text-foreground sm:text-4xl">
          Competition record
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          A timeline of placements and milestones from hackathons and competitive programming.
        </p>

        <div className="relative mt-12 max-w-2xl">
          <div className="absolute left-[17px] top-2 h-[calc(100%-1rem)] w-px bg-border" />

          <div className="space-y-7">
            {achievements.map((item, i) => (
              <motion.div
                key={item.title + item.org}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="relative flex gap-5"
              >
                <span className="relative z-10 mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-primary/30 bg-background text-primary">
                  <Trophy className="h-4 w-4" />
                </span>
                <div className="glass w-full rounded-xl p-5">
                  <p className="font-sans text-base font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-1 font-mono text-xs text-primary">{item.org}</p>
                  <p className="mt-2 text-sm text-muted">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
