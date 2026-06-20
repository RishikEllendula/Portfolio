"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { profile, stats } from "@/lib/data";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function About() {
  return (
    <section id="about" className="border-t border-border py-20 sm:py-28">
      <div className="container-px mx-auto max-w-6xl">
        <SectionEyebrow index="01" label="About" />

        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <h2 className="font-sans text-3xl font-bold tracking-tightest text-foreground sm:text-4xl">
              Builder first, student by schedule.
            </h2>

            <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
              <span className="flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1">
                <GraduationCap className="h-3.5 w-3.5 text-primary" />
                {profile.degree}
              </span>
              <span className="rounded-md border border-border bg-surface px-2.5 py-1">
                {profile.university}
              </span>
              <span className="rounded-md border border-success/30 bg-success/10 px-2.5 py-1 text-success">
                CGPA {profile.cgpa}
              </span>
            </div>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
              {profile.about}
            </p>

            <div className="mt-7">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
                Currently focused on
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <Badge key={interest} variant="primary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Card className="flex h-full flex-col justify-between p-5">
                  <span className="font-sans text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="mt-2 font-mono text-[11px] uppercase tracking-wide text-muted">
                    {stat.label}
                  </span>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
