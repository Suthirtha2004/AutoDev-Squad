import type { AgentConfig } from "../../types";

export const AGENTS: AgentConfig[] = [
  {
    key: "pm",
    name: "Product Manager AI",
    role: "PM Agent",
    description: "Breaks down features, plans the MVP, creates milestones and user stories.",
    color: "from-cyan-500 to-blue-600",
    glowColor: "rgba(6,182,212,0.4)",
    icon: "Briefcase",
    outputs: ["Feature Breakdown", "MVP Planning", "Milestones", "User Stories"],
  },
  {
    key: "uiux",
    name: "UI/UX Designer AI",
    role: "Design Agent",
    description: "Generates landing page concepts, dashboard layouts, and color palettes.",
    color: "from-pink-500 to-rose-600",
    glowColor: "rgba(236,72,153,0.4)",
    icon: "Palette",
    outputs: ["Landing Page Ideas", "Dashboard Layouts", "Color Palettes", "UX Improvements"],
  },
  {
    key: "architect",
    name: "System Architect AI",
    role: "Architecture Agent",
    description: "Selects tech stack, designs database schema, and plans system architecture.",
    color: "from-emerald-500 to-teal-600",
    glowColor: "rgba(16,185,129,0.4)",
    icon: "Network",
    outputs: ["Tech Stack", "Database Schema", "Architecture Plan", "Scalability"],
  },
  {
    key: "backend",
    name: "Backend Developer AI",
    role: "Dev Agent",
    description: "Generates API routes, folder structure, auth flow, and backend logic.",
    color: "from-amber-500 to-orange-600",
    glowColor: "rgba(245,158,11,0.4)",
    icon: "Code2",
    outputs: ["API Generation", "Folder Structure", "Auth Flow", "Backend Logic"],
  },
  {
    key: "qa",
    name: "QA Tester AI",
    role: "QA Agent",
    description: "Finds edge cases, scalability issues, validates inputs, and recommends tests.",
    color: "from-violet-500 to-purple-600",
    glowColor: "rgba(139,92,246,0.4)",
    icon: "ShieldCheck",
    outputs: ["Edge Cases", "Scalability Issues", "Validation Checks", "Testing Strategy"],
  },
];

export const AGENT_MAP = Object.fromEntries(AGENTS.map((a) => [a.key, a])) as Record<
  string,
  AgentConfig
>;
