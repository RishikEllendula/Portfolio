import { profile, socialLinks } from "@/lib/data";

export const siteConfig = {
  name: profile.name,
  title: `${profile.name} — ${profile.title}`,
  description: profile.tagline,
  // Replace with your real production domain before deploying.
  url: "https://rishikellendula.dev",
  ogImage: "/og-image.png",
  keywords: [
    "Rishik Ellendula",
    "AI Engineer",
    "Full Stack Developer",
    "GenAI",
    "RAG",
    "LangChain",
    "LangGraph",
    "LLMOps",
    "Machine Learning Engineer",
    "Anurag University",
  ],
};

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    description: profile.tagline,
    url: siteConfig.url,
    email: `mailto:${profile.email}`,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: profile.university,
    },
    sameAs: socialLinks.map((link) => link.href),
  };
}
