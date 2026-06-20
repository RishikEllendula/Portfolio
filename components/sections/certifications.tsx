"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { certifications } from "@/lib/data";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { Card } from "@/components/ui/card";

export function Certifications() {
  return (
    <section id="certifications" className="border-t border-border py-20 sm:py-28">
      <div className="container-px mx-auto max-w-6xl">
        <SectionEyebrow index="06" label="Certifications" />
        <h2 className="font-sans text-3xl font-bold tracking-tightest text-foreground sm:text-4xl">
          Certifications
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Cloud and full-stack credentials earned alongside coursework.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card className="flex h-full flex-col p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                  <Award className="h-5 w-5" />
                </div>
                <p className="mt-4 font-sans text-sm font-semibold leading-snug text-foreground">
                  {cert.name}
                </p>
                <p className="mt-1 font-mono text-xs text-muted">{cert.issuer}</p>

                <div className="mt-4 flex-1" />

                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                  >
                    View credential
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <span className="font-mono text-[11px] text-muted/70">
                    credential link not yet attached
                  </span>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
