"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Loader2, Mail, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { profile } from "@/lib/data";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [form, setForm] = React.useState({ name: "", email: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setErrorMsg("Network error. Please try again in a moment.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="border-t border-border py-20 sm:py-28">
      <div className="container-px mx-auto max-w-6xl">
        <SectionEyebrow index="07" label="Contact" />

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="font-sans text-3xl font-bold tracking-tightest text-foreground sm:text-4xl">
              Let&apos;s build something.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
              Open to AI engineering and full-stack roles, internships, and interesting
              collaborations. The fastest way to reach me is email.
            </p>

            <div className="mt-7 space-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="glass-hover flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm text-foreground"
              >
                <Mail className="h-4 w-4 text-primary" />
                {profile.email}
              </a>
              <a
                href="https://github.com/RishikEllendula"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-hover flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm text-foreground"
              >
                <Github className="h-4 w-4 text-primary" />
                github.com/RishikEllendula
              </a>
              <a
                href="https://www.linkedin.com/in/rishik-ellendula-09625729a/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-hover flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm text-foreground"
              >
                <Linkedin className="h-4 w-4 text-primary" />
                linkedin.com/in/rishik-ellendula
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 sm:p-7">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-muted">
                    Name
                  </label>
                  <Input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-muted">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-muted">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="What are you working on?"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={status === "loading"}>
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>

                {status === "success" && (
                  <p className="flex items-center gap-2 text-sm text-success">
                    <CheckCircle2 className="h-4 w-4" />
                    Message sent. I&apos;ll get back to you soon.
                  </p>
                )}
                {status === "error" && (
                  <p className="flex items-center gap-2 text-sm text-warning">
                    <AlertCircle className="h-4 w-4" />
                    {errorMsg}
                  </p>
                )}
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
