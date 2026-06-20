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
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const statusVariant: Record<string, "primary" | "success" | "default"> = {
  Production: "success",
  "Active Development": "primary",
  Stable: "default",
};

export function Projects() {
  const [query, setQuery] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!triggerRef.current || !containerRef.current) return;

    // Get the horizontal translation distance
    const scrollWidth = containerRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    const xVal = -(scrollWidth - viewportWidth + 80);

    const pin = gsap.fromTo(
      containerRef.current,
      { x: 0 },
      {
        x: xVal,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          invalidateOnRefresh: true,
        },
      }
    );

    return () => {
      pin.kill();
    };
  }, { scope: triggerRef });

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
    <section id="projects" className="border-t border-border">
      {/* Desktop Horizontal Pinning Section */}
      <div ref={triggerRef} className="relative hidden md:block bg-background/50 overflow-hidden">
        <div className="flex h-screen items-center py-10">
          <div
            ref={containerRef}
            className="flex gap-8 px-12 sm:px-24"
            style={{ width: "max-content" }}
          >
            {/* Header Card */}
            <div className="w-[360px] flex-shrink-0 flex flex-col justify-center pr-6">
              <SectionEyebrow index="03" label="Projects" />
              <h2 className="font-sans text-4xl font-bold tracking-tightest text-foreground sm:text-5xl mt-3">
                Things I&apos;ve shipped
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Full systems, not just notebooks — each one built end-to-end with a real API,
                a real database and a real interface.
              </p>
              <div className="mt-8 flex items-center gap-2 text-xs font-mono text-primary/80 animate-pulse">
                <span>↓</span> Scroll down to slide projects
              </div>
            </div>

            {/* Project Cards in horizontal track */}
            {projects.map((project, idx) => (
              <div
                key={project.slug}
                className="w-[440px] h-[500px] flex-shrink-0 flex flex-col justify-between glass border border-border/80 rounded-2xl p-6 hover:border-primary/40 hover:scale-[1.01] transition-all duration-300 shadow-2xl relative overflow-hidden group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted">0{idx + 1}</span>
                      {project.highlight && (
                        <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary border border-primary/20">
                          Featured
                        </span>
                      )}
                    </div>
                    <Badge variant={statusVariant[project.status]}>{project.status}</Badge>
                  </div>

                  <h3 className="font-sans text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>

                  <p className="mt-3 text-xs leading-relaxed text-muted line-clamp-3">
                    {project.description}
                  </p>

                  <div className="mt-4">
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted">
                      Key Highlights
                    </p>
                    <ul className="space-y-2">
                      {project.features?.slice(0, 3).map((feat) => (
                        <li key={feat} className="flex gap-2 text-xs text-foreground/80 line-clamp-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 5).map((t) => (
                      <Badge key={t} variant="outline" className="text-[10px] py-0 px-1.5">
                        {t}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium text-muted hover:text-foreground transition-colors"
                    >
                      <Github className="h-3.5 w-3.5" />
                      Source
                    </a>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                      Case Study
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Vertical Grid Section */}
      <div className="container-px mx-auto max-w-6xl py-20 sm:py-28 md:hidden">
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
