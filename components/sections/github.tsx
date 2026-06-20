"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { GitBranch, Star, Users, ExternalLink, AlertCircle } from "lucide-react";
import { githubUsername, codingProfiles } from "@/lib/data";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { Card } from "@/components/ui/card";

interface GithubUser {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
}

interface GithubRepo {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
}

export function GithubSection() {
  const [user, setUser] = React.useState<GithubUser | null>(null);
  const [repos, setRepos] = React.useState<GithubRepo[]>([]);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${githubUsername}`),
          fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=4`),
        ]);
        if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API request failed");
        const userData = await userRes.json();
        const reposData = await reposRes.json();
        if (!cancelled) {
          setUser(userData);
          setRepos(reposData);
        }
      } catch {
        if (!cancelled) setError(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="github" className="border-t border-border py-20 sm:py-28">
      <div className="container-px mx-auto max-w-6xl">
        <SectionEyebrow index="04" label="GitHub & coding profiles" />
        <h2 className="font-sans text-3xl font-bold tracking-tightest text-foreground sm:text-4xl">
          Activity & track record
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Live GitHub activity alongside a snapshot of competitive programming progress.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Card className="p-6">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-muted">
              GitHub overview
            </p>

            {error ? (
              <div className="flex items-center gap-2 text-sm text-muted">
                <AlertCircle className="h-4 w-4" />
                Live stats unavailable right now — view the profile directly.
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                <Stat icon={GitBranch} value={user?.public_repos} label="Repos" />
                <Stat icon={Users} value={user?.followers} label="Followers" />
                <Stat icon={Star} value={user?.following} label="Following" />
              </div>
            )}

            <a
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              View full profile
              <ExternalLink className="h-3 w-3" />
            </a>

            <div className="mt-6 overflow-hidden rounded-lg border border-border">
              {/* Contribution graph — public chart service, no token required. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://ghchart.rshah.org/3b82f6/${githubUsername}`}
                alt={`${githubUsername} GitHub contribution graph`}
                className="w-full"
                loading="lazy"
              />
            </div>
          </Card>

          <Card className="p-6">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-muted">
              Latest repositories
            </p>
            <div className="space-y-3">
              {repos.length === 0 && !error && (
                <p className="text-sm text-muted">Loading latest repositories…</p>
              )}
              {repos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-hover flex items-center justify-between gap-3 rounded-lg border border-border px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate font-sans text-sm font-medium text-foreground">
                      {repo.name}
                    </p>
                    <p className="truncate text-xs text-muted">
                      {repo.description ?? "No description provided"}
                    </p>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-3 font-mono text-xs text-muted">
                    {repo.language && <span>{repo.language}</span>}
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {repo.stargazers_count}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            <p className="mt-5 mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
              Coding profiles
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {codingProfiles.map((profile) => (
                <a
                  key={profile.platform}
                  href={profile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-hover rounded-lg border border-border p-4 text-center"
                >
                  <p className="font-sans text-lg font-bold text-foreground">{profile.value}</p>
                  <p className="mt-1 text-[11px] text-muted">{profile.stat}</p>
                  <p className="mt-2 font-mono text-[11px] text-primary">{profile.platform}</p>
                </a>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value?: number;
  label: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-1.5 rounded-lg border border-border bg-surface/60 py-3"
    >
      <Icon className="h-4 w-4 text-primary" />
      <span className="font-sans text-base font-bold text-foreground">
        {value !== undefined ? value : "—"}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-wide text-muted">{label}</span>
    </motion.div>
  );
}
