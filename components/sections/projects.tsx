"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Github, Search } from "lucide-react";
import { projects } from "@/lib/data";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";
import { ScreenshotCarousel } from "@/components/projects/screenshot-carousel";

const statusVariant: Record<string, "primary" | "success" | "default"> = {
  Production: "success",
  "Active Development": "primary",
  Stable: "default",
};

export function Projects() {
  const [query, setQuery] = React.useState("");

  const featured = projects.find((p) => p.highlight);
  const rest = projects.filter((p) => !p.highlight);

  const filteredRest = rest.filter((p) => {
    const q = query.toLowerCase();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tech.some((t) => t.toLowerCase().includes(q))
    );
  });

  const featuredMatches =
    !query ||
    featured?.name.toLowerCase().includes(query.toLowerCase()) ||
    featured?.tech.some((t) => t.toLowerCase().includes(query.toLowerCase()));

  return (
    <section id="projects" className="border-t border-border py-20 sm:py-28">
      <div className="container-px mx-auto max-w-6xl">
        <SectionEyebrow index="03" label="Projects" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-sans text-3xl font-bold tracking-tightest text-foreground sm:text-4xl">
              Things I&apos;ve shipped
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
              Full systems, not just notebooks — each one built end-to-end with a real API,
              a real database and a real interface.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects or tech…"
              className="pl-9"
            />
          </div>
        </div>

        {featured && featuredMatches && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="mt-10"
          >
            <Card className="p-7 sm:p-8">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="font-sans text-2xl font-bold tracking-tight text-foreground">
                    {featured.name}
                  </h3>
                  <Badge variant={statusVariant[featured.status]}>{featured.status}</Badge>
                </div>
                 <div className="flex items-center gap-2">
                  <Button asChild size="sm" variant="outline">
                    <a href={featured.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-3.5 w-3.5" />
                      Source
                    </a>
                  </Button>
                  <Button asChild size="sm">
                    <Link href={`/projects/${featured.slug}`}>
                      Case Study
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>

              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
                {featured.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {featured.tech.map((t) => (
                  <Badge key={t} variant="outline">
                    {t}
                  </Badge>
                ))}
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <div>
                  <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
                    Feature Breakdown
                  </p>
                  <ul className="space-y-2.5">
                    {featured.features?.map((feature) => (
                      <li key={feature} className="flex gap-2.5 text-sm text-foreground/90">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
                    Architecture
                  </p>
                  <ArchitectureDiagram />
                </div>
              </div>

              <div className="mt-8">
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
                  Screenshots
                </p>
                <ScreenshotCarousel projectName={featured.name} />
              </div>
            </Card>
          </motion.div>
        )}

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {filteredRest.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Card className="flex h-full flex-col p-6">
                <CardContent className="flex-1">
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-sans text-lg font-semibold tracking-tight text-foreground">
                      {project.name}
                    </h3>
                    <Badge variant={statusVariant[project.status]}>{project.status}</Badge>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <Badge key={t} variant="outline">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                 <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-foreground"
                  >
                    <Github className="h-3.5 w-3.5" />
                    Source
                  </a>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    View Details & Architecture
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}

          {filteredRest.length === 0 && !featuredMatches && (
            <p className="col-span-full py-10 text-center text-sm text-muted">
              No projects match &quot;{query}&quot;.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
