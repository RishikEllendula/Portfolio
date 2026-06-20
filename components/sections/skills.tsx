"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Layout,
  Server,
  BrainCircuit,
  Database,
  Cloud,
  Cpu,
} from "lucide-react";
import { skillCategories } from "@/lib/data";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { Card } from "@/components/ui/card";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  programming: Code2,
  frontend: Layout,
  backend: Server,
  "ai-genai": BrainCircuit,
  database: Database,
  "cloud-devops": Cloud,
  iot: Cpu,
};

export function Skills() {
  const [active, setActive] = React.useState(skillCategories[0].id);
  const activeCategory = skillCategories.find((c) => c.id === active) ?? skillCategories[0];

  return (
    <section id="skills" className="border-t border-border py-20 sm:py-28">
      <div className="container-px mx-auto max-w-6xl">
        <SectionEyebrow index="02" label="Skills" />
        <h2 className="font-sans text-3xl font-bold tracking-tightest text-foreground sm:text-4xl">
          Stack & proficiency
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          A working set of tools across the AI, full-stack and infrastructure layers — chosen
          because they hold up in production, not just in tutorials.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {skillCategories.map((cat) => {
            const Icon = categoryIcons[cat.id] ?? Code2;
            const isActive = cat.id === active;
            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border bg-surface text-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-8 grid gap-4 sm:grid-cols-2"
        >
          {activeCategory.items.map((skill) => (
            <Card key={skill.name} className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-sans text-sm font-semibold text-foreground">
                  {skill.name}
                </span>
                <span className="font-mono text-xs text-muted">{skill.level}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/60">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-primary/70 to-accent"
                />
              </div>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
