"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Github, Mail, Search } from "lucide-react";
import { profile, projects } from "@/lib/data";
import { Kbd } from "@/components/ui/kbd";

interface Command {
  id: string;
  label: string;
  hint: string;
  action: () => void;
  icon?: React.ReactNode;
}

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const goTo = React.useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const commands: Command[] = React.useMemo(() => {
    const sectionCommands: Command[] = [
      { id: "go-about", label: "About", hint: "Section", action: () => goTo("about") },
      { id: "go-skills", label: "Skills", hint: "Section", action: () => goTo("skills") },
      { id: "go-projects", label: "Projects", hint: "Section", action: () => goTo("projects") },
      { id: "go-achievements", label: "Achievements", hint: "Section", action: () => goTo("achievements") },
      { id: "go-certifications", label: "Certifications", hint: "Section", action: () => goTo("certifications") },
      { id: "go-contact", label: "Contact", hint: "Section", action: () => goTo("contact") },
    ];

    const projectCommands: Command[] = projects.map((p) => ({
      id: `project-${p.slug}`,
      label: p.name,
      hint: "Project",
      icon: <ArrowRight className="h-3.5 w-3.5" />,
      action: () => goTo("projects"),
    }));

    const utilityCommands: Command[] = [
      {
        id: "open-github",
        label: "Open GitHub profile",
        hint: "Link",
        icon: <Github className="h-3.5 w-3.5" />,
        action: () => window.open("https://github.com/RishikEllendula", "_blank"),
      },
      {
        id: "email",
        label: `Email ${profile.email}`,
        hint: "Link",
        icon: <Mail className="h-3.5 w-3.5" />,
        action: () => window.open(`mailto:${profile.email}`),
      },
      {
        id: "resume",
        label: "Download resume",
        hint: "File",
        action: () => window.open(profile.resumeHref, "_blank"),
      },
    ];

    return [...sectionCommands, ...projectCommands, ...utilityCommands];
  }, [goTo]);

  const filtered = React.useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter((c) => c.label.toLowerCase().includes(q));
  }, [commands, query]);

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[activeIndex];
      if (cmd) {
        cmd.action();
        setOpen(false);
      }
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs text-muted transition-colors hover:border-primary/40 hover:text-foreground sm:flex"
        aria-label="Open command palette"
      >
        <Search className="h-3.5 w-3.5" />
        <span>Search</span>
        <span className="ml-2 flex items-center gap-0.5">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="glass w-full max-w-lg overflow-hidden rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
            >
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <Search className="h-4 w-4 text-muted" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActiveIndex(0);
                  }}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Jump to a section, project or link…"
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted/70 focus:outline-none"
                />
                <Kbd>esc</Kbd>
              </div>
              <ul className="max-h-80 overflow-y-auto py-2">
                {filtered.length === 0 && (
                  <li className="px-4 py-6 text-center text-sm text-muted">No matches found.</li>
                )}
                {filtered.map((cmd, i) => (
                  <li key={cmd.id}>
                    <button
                      onClick={() => {
                        cmd.action();
                        setOpen(false);
                      }}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                        i === activeIndex ? "bg-primary/10 text-foreground" : "text-foreground/90"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        {cmd.icon}
                        {cmd.label}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-wide text-muted">
                        {cmd.hint}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
