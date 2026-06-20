export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0-100
}

export interface SkillCategory {
  id: string;
  label: string;
  items: SkillItem[];
}

export interface ArchitectureNode {
  label: string;
  x: number;
  y: number;
}

export interface ArchitectureConnection {
  path: string;
}

export interface ProjectArchitecture {
  nodes: ArchitectureNode[];
  connections: ArchitectureConnection[];
  flowDescription: string;
}

export interface Project {
  slug: string;
  name: string;
  status: "Production" | "Active Development" | "Stable";
  description: string;
  features?: string[];
  tech: string[];
  github: string;
  demo?: string;
  highlight?: boolean;
  slides?: string[];
  architecture?: ProjectArchitecture;
}

export interface Achievement {
  title: string;
  org: string;
  detail: string;
  date?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date?: string;
  credentialUrl?: string;
}

