import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";
import { ScreenshotCarousel } from "@/components/projects/screenshot-carousel";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const statusVariant: Record<string, "primary" | "success" | "default"> = {
  Production: "success",
  "Active Development": "primary",
  Stable: "default",
};

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative overflow-hidden py-16 sm:py-24">
      {/* Background grid */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grid-pattern bg-[size:56px_56px] bg-radial-glow grid-mask opacity-40"
      />

      <div className="container-px mx-auto max-w-6xl">
        {/* Back Link */}
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          BACK TO HOMEPAGE
        </Link>

        {/* Hero Section */}
        <div className="flex flex-col gap-5 border-b border-border pb-10 mb-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-sans text-3xl font-bold tracking-tightest text-foreground sm:text-4xl md:text-5xl">
                {project.name}
              </h1>
              <Badge variant={statusVariant[project.status]}>{project.status}</Badge>
            </div>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              {project.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <Badge key={t} variant="outline">
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-row items-center gap-3 mt-4 md:mt-0">
            <Button asChild variant="outline">
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                Source Code
              </a>
            </Button>
            {project.demo && (
              <Button asChild>
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  Live Demo
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Feature Breakdown */}
          <Card className="p-6 sm:p-8">
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted mb-6">
              Key Features & Implementation
            </h2>
            {project.features && project.features.length > 0 ? (
              <ul className="space-y-4">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted">
                Detailed feature breakdown coming soon. Check the github repository for implementation details.
              </p>
            )}
          </Card>

          {/* System Architecture */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                System Architecture
              </h2>
            </div>
            <ArchitectureDiagram architecture={project.architecture} />
          </div>
        </div>

        {/* Screenshots Gallery */}
        <div className="mt-12">
          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted mb-4">
            Screenshots & Interface
          </h2>
          <ScreenshotCarousel projectName={project.name} slides={project.slides} />
        </div>
      </div>
    </div>
  );
}
