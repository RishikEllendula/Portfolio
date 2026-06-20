import type {
  SocialLink,
  Stat,
  SkillCategory,
  Project,
  Achievement,
  Certification,
} from "@/types";

export const profile = {
  name: "Rishik Ellendula",
  initials: "RE",
  title: "AI Engineer | Full Stack Developer | GenAI Builder",
  tagline:
    "Final-year AI & Machine Learning student building production-grade AI applications, developer tools, and scalable software systems.",
  location: "Hyderabad, India",
  email: "rishikellendula@gmail.com",
  resumeHref: "/resume.pdf",
  status: "Open to AI Engineering & Full Stack roles",
  university: "Anurag University",
  degree: "B.Tech, Artificial Intelligence & Machine Learning",
  cgpa: "9.14",
  year: "Final Year",
  about:
    "I care more about whether something ships and holds up under real use than whether it looks good in a slide deck. Most of what I build starts as a personal itch — a workflow that should be faster, a model that should be easier to evaluate, a tool I wished existed — and ends up as a full system with an API, a database, and a UI someone other than me can actually use.",
  interests: [
    "Generative AI",
    "Software Engineering",
    "LLM Systems",
    "Full Stack Development",
    "Cloud Computing",
  ],
} as const;

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/RishikEllendula", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rishik-ellendula-09625729a/",
    icon: "linkedin",
  },
  { label: "LeetCode", href: "https://leetcode.com/", icon: "code" },
  { label: "HackerRank", href: "https://www.hackerrank.com/", icon: "terminal" },
  { label: "Credly", href: "https://www.credly.com/", icon: "badge-check" },
];

export const stats: Stat[] = [
  { label: "Problems Solved", value: "700+" },
  { label: "AWS Certifications", value: "3" },
  { label: "Hackathon Placements", value: "3" },
  { label: "Major Projects Shipped", value: "3" },
  { label: "CGPA", value: "9.14" },
];

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    label: "Programming",
    items: [
      { name: "Python", level: 92 },
      { name: "Java", level: 75 },
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "C++", level: 65 },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: [
      { name: "React", level: 85 },
      { name: "Next.js", level: 85 },
      { name: "Angular", level: 65 },
      { name: "Tailwind CSS", level: 88 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      { name: "FastAPI", level: 88 },
      { name: "Flask", level: 78 },
      { name: "Node.js", level: 75 },
      { name: "Express.js", level: 75 },
    ],
  },
  {
    id: "ai-genai",
    label: "AI & GenAI",
    items: [
      { name: "LangChain", level: 88 },
      { name: "LangGraph", level: 82 },
      { name: "RAG", level: 90 },
      { name: "RAGAS", level: 80 },
      { name: "DeepEval", level: 75 },
      { name: "OpenAI", level: 85 },
      { name: "Groq", level: 85 },
      { name: "Gemini", level: 75 },
    ],
  },
  {
    id: "database",
    label: "Database",
    items: [
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB", level: 78 },
      { name: "ChromaDB", level: 80 },
      { name: "Redis", level: 70 },
    ],
  },
  {
    id: "cloud-devops",
    label: "Cloud & DevOps",
    items: [
      { name: "AWS", level: 80 },
      { name: "Docker", level: 78 },
      { name: "Vercel", level: 85 },
    ],
  },
  {
    id: "iot",
    label: "IoT",
    items: [
      { name: "Arduino", level: 75 },
      { name: "ESP32", level: 75 },
      { name: "Raspberry Pi", level: 68 },
      { name: "MQTT", level: 65 },
      { name: "Blynk", level: 65 },
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "llmops-monitoring-platform",
    name: "LLMOps Monitoring Platform",
    status: "Production",
    description:
      "Enterprise-grade LLM observability platform for monitoring, evaluating, and optimizing AI applications in production — built as a full-stack capstone covering the entire LLM operations lifecycle.",
    features: [
      "LangGraph-powered copilot for natural-language queries over system metrics",
      "RAGAS evaluation pipeline scoring faithfulness, relevance & precision",
      "DeepEval monitoring for regression detection across model versions",
      "Security dashboard surfacing prompt-injection & PII risk signals",
      "Per-request cost tracking across multiple model providers",
      "Multi-model analytics comparing latency, cost and quality side by side",
    ],
    tech: ["FastAPI", "Next.js", "PostgreSQL", "Redis", "ChromaDB", "LangGraph", "Docker"],
    github: "https://github.com/Rishik-2004/LLMops-Monitoring-Platform",
    highlight: true,
    slides: ["Dashboard", "Evaluation Run", "Cost Analytics"],
    architecture: {
      nodes: [
        { label: "Next.js\nDashboard", x: 30, y: 40 },
        { label: "FastAPI\nGateway", x: 230, y: 40 },
        { label: "LangGraph\nCopilot", x: 430, y: 10 },
        { label: "RAGAS / DeepEval\nEvaluators", x: 430, y: 75 },
        { label: "PostgreSQL", x: 230, y: 130 },
        { label: "Redis\nCache", x: 30, y: 130 },
        { label: "ChromaDB\nVector Store", x: 430, y: 140 },
      ],
      connections: [
        { path: "M170,63 H220" },
        { path: "M370,55 C390,45 400,35 420,30" },
        { path: "M370,65 C390,75 400,80 420,95" },
        { path: "M300,86 V120" },
        { path: "M100,86 V120" },
        { path: "M370,68 C390,85 400,105 420,150" },
      ],
      flowDescription: "Request flow: dashboard → API gateway → copilot / evaluators → storage layer",
    },
  },
  {
    slug: "vibe-code-explainer",
    name: "Vibe Code Explainer",
    status: "Active Development",
    description:
      "A VS Code extension that turns Git diffs into plain-English explanations, so reviewers and teammates can understand what changed and why without reading raw diffs line by line.",
    features: [
      "Real-time Change Detection — Automatically detects code changes made by AI tools (Cursor, Copilot, Windsurf, etc.)",
      "AI-Powered Explanations — Understand what changed and why in plain English",
      "Visual Diff Viewer — Side-by-side comparison of old vs new code with animations",
      "Learning Path — Tracks programming concepts you encounter and your mastery progress",
      "Session Summary — Review all changes made in a single coding session",
      "Multiple AI Providers — Supports OpenAI (GPT-4), Anthropic (Claude), and local LLMs",
    ],
    tech: ["TypeScript", "VS Code API", "React", "OpenAI", "Anthropic", "Ollama"],
    github: "https://github.com/RishikEllendula/Vibe-Code-Explainer",
    slides: ["Extension Sidebar", "Diff Summary", "Mastery Tracker"],
    architecture: {
      nodes: [
        { label: "React Webview\nUI Sidebar", x: 30, y: 40 },
        { label: "VS Code\nExtension Host", x: 230, y: 40 },
        { label: "Git CLI /\nDiff Engine", x: 230, y: 130 },
        { label: "AI Provider API\n(Claude/GPT)", x: 430, y: 10 },
        { label: "Local Ollama\n(AI Model)", x: 430, y: 75 },
        { label: "Concept\nMastery Store", x: 430, y: 140 },
      ],
      connections: [
        { path: "M170,63 H220" },
        { path: "M300,86 V120" },
        { path: "M370,55 C390,45 400,35 420,30" },
        { path: "M370,63 H420" },
        { path: "M370,68 C390,85 400,105 420,150" },
      ],
      flowDescription: "Execution flow: React webview → VS Code extension host → Git CLI (diff extraction) → LLM API / Local Ollama → mastery tracker database",
    },
  },
  {
    slug: "smart-convenient-stores",
    name: "Smart Convenient Stores",
    status: "Stable",
    description:
      "A MEAN-stack platform that lets shoppers compare prices across nearby stores in real time, while giving store owners a simple dashboard to manage inventory and pricing.",
    features: [
      "User Authentication — Secure registration and login with JWT token integration",
      "Role-based Access Control — Separate owner (inventory CRUD) and customer roles",
      "Real-time Comparison — Compare local grocery prices across multiple store inventories",
      "Search Engine — Fuzzy-matching algorithms powered by optimized MongoDB indexing",
      "Interactive Map — Geolocation features mapping and locating local convenience stores",
    ],
    tech: ["MongoDB", "Express.js", "Angular", "Node.js"],
    github: "https://github.com/RishikEllendula/Smart-Convenient-Store",
    slides: ["Store Finder Map", "Owner Dashboard", "Price Comparison UI"],
    architecture: {
      nodes: [
        { label: "Angular 20 SPA\nClient", x: 30, y: 40 },
        { label: "Node.js &\nExpress REST API", x: 230, y: 40 },
        { label: "MongoDB\n(Mongoose)", x: 430, y: 40 },
        { label: "JWT\nAuthenticator", x: 230, y: 130 },
        { label: "Geolocation\nMaps API", x: 430, y: 130 },
      ],
      connections: [
        { path: "M170,63 H220" },
        { path: "M370,63 H420" },
        { path: "M300,86 V120" },
        { path: "M370,68 C390,85 400,105 420,150" },
      ],
      flowDescription: "Data flow: Angular UI → Express Gateway (JWT Validation) → MongoDB / Maps API → JSON Response",
    },
  },
  {
    slug: "hive-startup-intelligence",
    name: "Hive Startup Intelligence",
    status: "Active Development",
    description:
      "A production-grade, multi-agent VC analysis platform built as an open-source contribution to the Aden Hive Framework (YC W25) for full VC-grade investment analysis.",
    features: [
      "Multi-Agent VC Pipeline — 4-stage autonomous pipeline (Research, Competitor, Market, Verdict)",
      "Compare Mode — Parallel execution of dual pipelines using asyncio.gather for head-to-head VC comparisons",
      "Groq Llama 3.3 Inference — Extremely low-latency VC insights using Groq-accelerated models",
      "Pipeline Visualizer — Node graph interface showing stages firing with animated connector lines",
      "Live Logs Console — Interactive CLI-style log interface displaying backend agent state transitions",
      "Premium UI Design — Space Grotesk typography, 3D tilt cards, and cursor-reactive particles",
    ],
    tech: ["Python", "FastAPI", "React", "TypeScript", "Vite", "Groq SDK", "asyncio"],
    github: "https://github.com/RishikEllendula/Startup_Analyzer",
    slides: ["Dashboard Landing", "Agent Pipeline Graph", "VC Verdict Report"],
    architecture: {
      nodes: [
        { label: "React SPA Client\n(Vite)", x: 30, y: 40 },
        { label: "FastAPI Server\n(Uvicorn)", x: 230, y: 40 },
        { label: "Groq LLM SDK\n(Llama 3.3)", x: 430, y: 10 },
        { label: "Parallel asyncio\nPipelines", x: 230, y: 130 },
        { label: "Aden Hive\nFramework", x: 430, y: 130 },
      ],
      connections: [
        { path: "M170,63 H220" },
        { path: "M370,55 C390,45 400,35 420,30" },
        { path: "M300,86 V120" },
        { path: "M370,153 H420" },
      ],
      flowDescription: "Analysis flow: input idea → FastAPI gateway → parallel asyncio pipeline nodes → Groq Llama 3.3 inference → Aden Hive state response",
    },
  },
  {
    slug: "visionmate-ai",
    name: "VisionMate AI",
    status: "Active Development",
    description:
      "Full-stack object detection, tracking, scene understanding, and visual Q&A platform powered by YOLOv8, FastAPI, OpenCV, and Claude AI.",
    features: [
      "Real-time Detection — OpenCV frame capture feeding instant object detection from webcam feeds",
      "Object Tracking — Custom intersection-over-union tracker coupled with DeepSORT wrapper integration",
      "Claude Scene Analysis — Claude Vision API endpoint for natural language description & Q&A reports",
      "Privacy Blur Mode — Haar Cascades & Gaussian filters for real-time face blurring toggle",
      "JWT Security — Pbkdf2 password hashing with custom secure JSON web token authentication",
      "Structured Exports — Custom ReportLab pipeline exporting logs into CSV, JSON, and PDF reports",
    ],
    tech: ["Python", "FastAPI", "OpenCV", "YOLOv8", "DeepSORT", "Claude AI", "SQLite"],
    github: "https://github.com/RishikEllendula/VisionMate-AI",
    slides: ["Live Detection", "Analysis Analytics", "PDF Reports Export"],
    architecture: {
      nodes: [
        { label: "HTML5 Dashboard\n(Webcam / File)", x: 30, y: 40 },
        { label: "FastAPI Backend\nGateway", x: 230, y: 40 },
        { label: "YOLOv8 Detector\n/ DeepSORT", x: 230, y: 130 },
        { label: "Claude Vision\n/ Haiku API", x: 430, y: 10 },
        { label: "SQLite /\nPostgreSQL", x: 430, y: 130 },
      ],
      connections: [
        { path: "M170,63 H220" },
        { path: "M300,86 V120" },
        { path: "M370,55 C390,45 400,35 420,30" },
        { path: "M370,65 C390,75 400,80 420,140" },
      ],
      flowDescription: "Processing pipeline: Webcam/upload → FastAPI gateway → YOLOv8 detection & DeepSORT tracking → Claude scene understanding & Q&A → database logs",
    },
  },
  {
    slug: "binance-futures-trading-bot",
    name: "Binance Futures Trading Bot",
    status: "Stable",
    description:
      "A clean, production-style Python CLI application for placing orders on the Binance Futures Testnet (USDT-M), featuring signature signing and retries.",
    features: [
      "Order Type Execution — Automated placement for MARKET, LIMIT, and STOP_MARKET orders",
      "HMAC-SHA256 Signing — High-performance secure query signing for API key authentication",
      "Dry-run Validation — Command preview mode evaluating client parameters before posting orders",
      "Transient Retry Engine — Automatic execution retries on transient network and API failures",
      "Layered Architecture — Separate validation logic, REST gateway client, and CLI handlers",
    ],
    tech: ["Python", "Binance API", "HMAC-SHA256", "argparse"],
    github: "https://github.com/RishikEllendula/Trading_Bot",
    slides: ["CLI Terminal View", "Signature Verification", "JSON API Response"],
    architecture: {
      nodes: [
        { label: "CLI Input\n(argparse)", x: 30, y: 40 },
        { label: "Order Management\nClient", x: 230, y: 40 },
        { label: "Binance REST\nAPI Gateway", x: 430, y: 40 },
        { label: "Signature Engine\n(HMAC-SHA256)", x: 230, y: 130 },
        { label: "Local Logs /\nFile System", x: 430, y: 130 },
      ],
      connections: [
        { path: "M170,63 H220" },
        { path: "M370,63 H420" },
        { path: "M300,86 V120" },
        { path: "M370,68 C390,85 400,105 420,150" },
      ],
      flowDescription: "Execution flow: CLI parameters → Order Client validation → signature signing → Binance REST endpoint → structured logging output",
    },
  },
  {
    slug: "gesture-drive-ai",
    name: "GestureDrive AI",
    status: "Stable",
    description:
      "A computer-vision-powered hand gesture control program that lets you drive and play games using MediaPipe landmark tracking and Windows key hooks.",
    features: [
      "Hand Landmark Tracking — Google MediaPipe tracking mapping 21 3D landmarks in real time",
      "OS Keyboard Hooking — Direct system-level WASD and Arrow key emulation via Windows hooks",
      "Anti-Bot Bypass — Simulated key holding patterns emulating genuine mechanical switches",
      "Multi-Game Support — Native responsiveness for web games, 2D platforms, and 3D arcade games",
    ],
    tech: ["Python", "OpenCV", "MediaPipe", "Windows API"],
    github: "https://github.com/RishikEllendula/SynapseDrive",
    slides: ["Webcam Capture Feed", "Landmarks Mapping Overlay", "OS Hook Execution"],
    architecture: {
      nodes: [
        { label: "USB Webcam\nVideo Stream", x: 30, y: 40 },
        { label: "OpenCV Image\nPreprocessor", x: 230, y: 40 },
        { label: "Google MediaPipe\n3D Tracker", x: 430, y: 40 },
        { label: "Gesture\nClassifier", x: 230, y: 130 },
        { label: "OS Keyboard\nEmulation Hook", x: 430, y: 130 },
      ],
      connections: [
        { path: "M170,63 H220" },
        { path: "M370,63 H420" },
        { path: "M300,86 V120" },
        { path: "M370,153 H420" },
      ],
      flowDescription: "Operation flow: Webcam capture → OpenCV frames → MediaPipe 3D landmarker tracking → finger state classification → hardware-level keyboard hooks",
    },
  },
  {
    slug: "emergency-triage-priority-engine",
    name: "Emergency Triage Priority Engine",
    status: "Stable",
    description:
      "A full-stack clinical application designed to efficiently triage emergency patients based on real-time vitals and symptoms using custom priority calculations.",
    features: [
      "Live Triage Algorithm — Dynamic 0-100 priority scoring based on age, high-risk symptoms, and vitals (Heart rate, BP, SpO2, Temp, Resp Rate)",
      "Spring Boot API — High-performance backend REST API built with Java 17, Spring Boot, and Hibernate/JPA",
      "Spring Security Authentication — Secure endpoints and JWT integration for authorized clinical staff",
      "Aiven MySQL Storage — Cloud-hosted MySQL database persistence tracking and auditing patient triage history",
      "Clinical Dashboard — Interactive, real-time medical dashboard showing case statistics and category distribution",
      "Orchestrated Containerization — Complete Docker and Docker Compose setup for consistent cross-environment runtime deployment",
    ],
    tech: ["Java", "Spring Boot", "Spring Security", "MySQL", "Docker", "JavaScript"],
    github: "https://github.com/RishikEllendula/Triage_Engine",
    slides: ["Clinical Dashboard", "Patient Record Flow", "Docker Container Setup"],
    architecture: {
      nodes: [
        { label: "Vanilla JS UI\n(Dashboard)", x: 30, y: 40 },
        { label: "Spring Boot API\n(Java 17)", x: 230, y: 40 },
        { label: "MySQL DB\n(Aiven Cloud)", x: 430, y: 40 },
        { label: "Spring Security\n/ JWT", x: 230, y: 130 },
        { label: "Docker Compose\n(Deployment)", x: 430, y: 130 },
      ],
      connections: [
        { path: "M170,63 H220" },
        { path: "M370,63 H420" },
        { path: "M300,86 V120" },
        { path: "M370,68 C390,85 400,105 420,150" },
      ],
      flowDescription: "Clinical flow: patient vitals input → Spring Boot API (JWT auth validation) → database transactions (MySQL) → real-time priority scores displayed on UI",
    },
  },
  {
    slug: "ai-powered-job-portal",
    name: "AI-Powered Job Portal",
    status: "Stable",
    description:
      "A complete web-based job recommendation and market intelligence system built entirely with R & Shiny, incorporating custom keyword detection algorithms.",
    features: [
      "Resume PDF Parser — Advanced text extraction parsing and digesting PDF and DOCX resume formats",
      "NLP Skill Extraction — Lexical keywords scanner mapping resumes against a dictionary of 200+ technical skills",
      "Live Web Scraping — Dynamic job crawlers scraping opportunities from Naukri, Internshala, and LinkedIn",
      "Jaccard Matching Algorithm — Weighted matching score scoring candidates against scraped vacancy details",
      "Interactive Shiny Dashboard — Modern dark-themed R Shiny user interface for real-time visualization",
      "R Markdown Reports — Automatically compiles user profile statistics and matching lists into downloadable HTML/PDF reports",
    ],
    tech: ["R", "R Shiny", "NLP", "SQLite", "ggplot2"],
    github: "https://github.com/RishikEllendula/Job-Match-Engine",
    slides: ["Shiny Dashboard UI", "Skill Gap Map", "Report Download Flow"],
    architecture: {
      nodes: [
        { label: "Shiny UI Dashboard\n(R App)", x: 30, y: 40 },
        { label: "R Shiny Server\n(App Logic)", x: 230, y: 40 },
        { label: "Resume Parser\n(NLP Engine)", x: 230, y: 130 },
        { label: "Match Engine\n(Jaccard)", x: 430, y: 10 },
        { label: "SQLite Database\n(User Data)", x: 430, y: 130 },
      ],
      connections: [
        { path: "M170,63 H220" },
        { path: "M300,86 V120" },
        { path: "M370,55 C390,45 400,35 420,30" },
        { path: "M370,65 C390,75 400,80 420,140" },
      ],
      flowDescription: "Processing flow: Resume upload → Shiny Server parses text (NLP) → matching engine scores jobs → results persistent in SQLite database",
    },
  },
];

export const achievements: Achievement[] = [
  {
    title: "1st Place",
    org: "Teja's 2K25",
    detail: "Ranked 1st out of 200+ competing teams",
  },
  {
    title: "2nd Place",
    org: "Teja's 2K26",
    detail: "Ranked 2nd out of 300+ competing teams",
  },
  {
    title: "3rd Place",
    org: "MindSprint National Hackathon",
    detail: "Ranked 3rd out of 650+ competing teams nationwide",
  },
  {
    title: "Diamond Coder",
    org: "Smart Interviews",
    detail: "Placed in the top 3% of all ranked participants",
  },
  {
    title: "700+ Problems Solved",
    org: "Competitive Programming",
    detail: "Across LeetCode, HackerRank and Smart Interviews combined",
  },
];

export const certifications: Certification[] = [
  {
    name: "AWS Academy Introduction to Cloud",
    issuer: "AWS Academy",
  },
  {
    name: "AWS Academy Cloud Foundations",
    issuer: "AWS Academy",
  },
  {
    name: "AWS Academy Cloud Architecting",
    issuer: "AWS Academy",
  },
  {
    name: "Cloud Virtual Internship",
    issuer: "AICTE",
  },
  {
    name: "Web Full Stack Developer Internship",
    issuer: "AICTE",
  },
];

export const githubUsername = "RishikEllendula";

export const codingProfiles = [
  {
    platform: "LeetCode",
    handle: "Update with your handle",
    stat: "Problems Solved",
    // Placeholder — wire this up to the LeetCode stats API of your choice, or update by hand.
    value: "400+",
    href: "https://leetcode.com/",
  },
  {
    platform: "HackerRank",
    handle: "Update with your handle",
    stat: "Problems Solved",
    value: "200+",
    href: "https://www.hackerrank.com/",
  },
  {
    platform: "Smart Interviews",
    handle: "Diamond Coder",
    stat: "Percentile Rank",
    value: "Top 3%",
    href: "https://www.smartinterviews.in/",
  },
];
