import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderOpen, Zap, Clock, ChevronRight, Search,
  Briefcase, Palette, Network, Code2, ShieldCheck, Cpu, X,
} from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import GlowCard from "../components/ui/GlowCard";
import AgentOutputPanel from "../components/agents/AgentOutputPanel";
import { fetchProjects } from "../lib/api";
import { AGENTS } from "../lib/agents";
import type { Project, AgentKey } from "../types";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Briefcase, Palette, Network, Code2, ShieldCheck,
};

function formatDate(ts: string) {
  return new Date(ts).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const OUTPUT_KEYS: { key: AgentKey; field: keyof Project }[] = [
  { key: "pm", field: "pm_output" },
  { key: "uiux", field: "uiux_output" },
  { key: "architect", field: "architect_output" },
  { key: "backend", field: "backend_output" },
  { key: "qa", field: "qa_output" },
];

export default function SavedProjectsPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = projects.filter((p) =>
    p.idea.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="relative min-h-screen px-6 py-8">
        <div className="fixed top-0 left-1/2 w-[600px] h-[300px] -translate-x-1/2 rounded-full bg-blue-700/5 blur-[100px] pointer-events-none" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2 font-mono">
            <Cpu size={12} className="text-cyan-500" />
            AutoDev Squad / Saved Projects
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-black text-white">
                Saved <span className="text-cyan-400">Projects</span>
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {projects.length} project{projects.length !== 1 ? "s" : ""} generated
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-bold shadow-lg shadow-cyan-500/25"
            >
              <Zap size={14} /> New Project
            </motion.button>
          </div>
        </motion.div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-cyan-500/40 transition-colors"
          />
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                  className="w-2 h-2 rounded-full bg-cyan-400"
                />
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-32 text-red-400 text-sm">{error}</div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <FolderOpen size={40} className="text-gray-700 mb-4" />
            <p className="text-gray-500 font-semibold mb-1">
              {search ? "No matching projects" : "No projects yet"}
            </p>
            <p className="text-sm text-gray-600 mb-6">
              {search ? "Try a different search term" : "Generate your first project to see it here"}
            </p>
            {!search && (
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-all"
              >
                Go to Dashboard
              </button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((project, i) => {
              const hasOutputs = OUTPUT_KEYS.filter((o) => project[o.field]).length;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <GlowCard
                    glowColor="rgba(6,182,212,0.12)"
                    hover
                    onClick={() => setSelected(project)}
                  >
                    <div className="p-5">
                      {/* Mode badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold tracking-wider uppercase border ${
                          project.mode === "full"
                            ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
                            : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                        }`}>
                          {project.mode === "full" ? "Full Workflow" : project.mode}
                        </span>
                        <ChevronRight size={14} className="text-gray-600" />
                      </div>

                      {/* Idea */}
                      <p className="text-sm font-semibold text-white leading-snug mb-3 line-clamp-3">
                        {project.idea}
                      </p>

                      {/* Agent outputs indicator */}
                      <div className="flex gap-1.5 mb-4">
                        {AGENTS.map((agent) => {
                          const field = OUTPUT_KEYS.find((o) => o.key === agent.key)?.field;
                          const hasOutput = field ? Boolean(project[field]) : false;
                          const Icon = iconMap[agent.icon] ?? Briefcase;
                          return (
                            <div
                              key={agent.key}
                              title={agent.name}
                              className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                                hasOutput
                                  ? `bg-gradient-to-br ${agent.color}`
                                  : "bg-white/5"
                              }`}
                              style={hasOutput ? { boxShadow: `0 2px 8px ${agent.glowColor}` } : undefined}
                            >
                              <Icon size={10} className="text-white" />
                            </div>
                          );
                        })}
                      </div>

                      {/* Timestamp */}
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <Clock size={11} />
                        {formatDate(project.created_at)}
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Project detail drawer */}
        <AnimatePresence>
          {selected && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelected(null)}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed right-0 top-0 h-screen w-full max-w-2xl bg-[#080b12] border-l border-white/10 z-50 overflow-y-auto"
              >
                <div className="sticky top-0 flex items-start justify-between gap-4 px-6 py-5 bg-[#080b12]/90 backdrop-blur-sm border-b border-white/10 z-10">
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 font-semibold tracking-widest uppercase mb-1">Project Details</p>
                    <p className="text-sm font-bold text-white line-clamp-2">{selected.idea}</p>
                    <p className="text-xs text-gray-600 mt-1">{formatDate(selected.created_at)}</p>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <X size={14} className="text-gray-400" />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  {OUTPUT_KEYS.map(({ key, field }) => {
                    const content = selected[field] as string;
                    if (!content) return null;
                    return <AgentOutputPanel key={key} agentKey={key} content={content} />;
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}
