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
      <div className="relative min-h-screen px-8 py-10 md:px-12 md:py-12 bg-[#0c0a12] text-[#f4f4f6] font-sans antialiased overflow-x-hidden selection:bg-purple-500/30">
        
        {/* Deep Core Spectral Radial Ambient Backdrops */}
        <div className="fixed top-[-5%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-purple-600/[0.03] blur-[150px] pointer-events-none" />
        <div className="fixed bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/[0.02] blur-[130px] pointer-events-none" />

        {/* Scaled Top Header Layout */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 md:mb-12"
        >
          <div className="flex items-center gap-2.5 text-xs text-gray-500 mb-3 font-mono tracking-widest uppercase">
            <Cpu size={14} className="text-purple-400" />
            AutoDev Squad <span className="text-gray-700">/</span> Project Repository
          </div>
          
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
                Saved <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">Projects</span>
              </h1>
              <p className="text-sm md:text-base text-gray-400/80 mt-1.5 font-normal tracking-wide">
                {projects.length} workspace architecture cluster{projects.length !== 1 ? "s" : ""} securely indexed
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white text-[#0c0a12] text-xs font-semibold tracking-wide shadow-[0_20px_40px_-5px_rgba(147,51,234,0.15)] transition-all hover:bg-neutral-100 border-t border-white/20"
            >
              <Zap size={14} className="fill-current" /> New Project
            </motion.button>
          </div>
        </motion.div>

        {/* Upgraded High Contrast Search Section */}
        <div className="relative mb-8 max-w-lg group">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-purple-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search indexing specifications..."
            className="w-full bg-[#12101a]/40 backdrop-blur-xl border border-white/[0.05] rounded-xl pl-11 pr-5 py-3.5 text-base text-white placeholder-gray-600 outline-none focus:border-purple-500/40 transition-all focus:bg-[#12101a]/70"
          />
        </div>

        {/* Content Conditions */}
        {loading ? (
          <div className="flex items-center justify-center py-40">
            <div className="flex gap-2 bg-purple-500/[0.02] border border-white/[0.03] px-6 py-4 rounded-xl backdrop-blur-md">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.15, 0.8] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                  className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                />
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-40 bg-red-500/[0.02] border border-red-500/10 rounded-2xl max-w-xl mx-auto text-red-400/90 text-sm font-mono tracking-wide">
            Execution Interface Error: {error}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-36 text-center max-w-md mx-auto bg-[#12101a]/20 border border-white/[0.03] rounded-2xl p-8"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/[0.01] border border-white/[0.04] flex items-center justify-center mb-5 text-gray-600 shadow-inner">
              <FolderOpen size={24} />
            </div>
            <p className="text-base font-medium text-gray-300 mb-1">
              {search ? "No matches located in directory" : "Repository database unallocated"}
            </p>
            <p className="text-sm text-gray-500 mb-6 max-w-xs leading-relaxed">
              {search ? "Modify search matrix filters and attempt string match sequence again." : "Generate your first end-to-end squad workflow model structure to view output index keys."}
            </p>
            {!search && (
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs font-medium text-gray-400 hover:text-white hover:border-purple-500/20 hover:bg-purple-500/[0.02] transition-all tracking-wide"
              >
                Go to Dashboard Terminal
              </button>
            )}
          </motion.div>
        ) : (
          /* Card Matrix Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((project, i) => {
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <GlowCard
                    glowColor="rgba(147,51,234,0.15)"
                    hover
                    onClick={() => setSelected(project)}
                  >
                    <div className="p-6 bg-[#12101a]/60 backdrop-blur-2xl border border-white/[0.05] rounded-2xl shadow-xl hover:border-purple-500/30 transition-all flex flex-col h-full min-h-[220px]">
                      
                      {/* Badge Header Row */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-[10px] px-2.5 py-1 rounded border font-semibold tracking-widest uppercase font-mono ${
                          project.mode === "full"
                            ? "bg-purple-500/[0.05] border-purple-500/20 text-purple-400"
                            : "bg-indigo-500/[0.05] border-indigo-500/20 text-indigo-400"
                        }`}>
                          {project.mode === "full" ? "Pipeline Matrix" : "Isolated Node"}
                        </span>
                        <div className="w-6 h-6 rounded-lg bg-white/[0.01] border border-white/[0.03] flex items-center justify-center text-gray-600 transition-colors group-hover:text-gray-400">
                          <ChevronRight size={14} />
                        </div>
                      </div>

                      {/* Main Objective Spec String */}
                      <p className="text-base font-medium text-white leading-snug mb-5 line-clamp-3 flex-1 tracking-tight">
                        {project.idea}
                      </p>

                      {/* Lower Analytics Metarow */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/[0.04] gap-2">
                        {/* Render Matrix Clusters Allocations */}
                        <div className="flex gap-1">
                          {AGENTS.map((agent) => {
                            const field = OUTPUT_KEYS.find((o) => o.key === agent.key)?.field;
                            const hasOutput = field ? Boolean(project[field]) : false;
                            const Icon = iconMap[agent.icon] ?? Briefcase;
                            return (
                              <div
                                key={agent.key}
                                title={agent.name}
                                className={`w-6 h-6 rounded-md flex items-center justify-center border transition-all ${
                                  hasOutput
                                    ? "bg-purple-500/10 border-purple-500/30 text-purple-400"
                                    : "bg-black/30 border-white/[0.02] text-gray-700"
                                }`}
                                style={hasOutput ? { boxShadow: "0 0 10px rgba(168,85,247,0.1)" } : undefined}
                              >
                                <Icon size={11} className={hasOutput ? "text-purple-400" : "text-gray-600"} />
                              </div>
                            );
                          })}
                        </div>

                        {/* Node Timestamp */}
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
                          <Clock size={12} className="text-gray-600" />
                          {formatDate(project.created_at)}
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Premium Full Height Slide-Out Panel Drawer */}
        <AnimatePresence>
          {selected && (
            <>
              {/* Overlay shadow backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelected(null)}
                className="fixed inset-0 bg-black/75 backdrop-blur-md z-40"
              />
              
              {/* Drawer Layout Surface */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 320, damping: 32 }}
                className="fixed right-0 top-0 h-screen w-full max-w-2xl bg-[#0b0910] border-l border-white/[0.05] z-50 overflow-y-auto shadow-2xl"
              >
                {/* Header Static Module */}
                <div className="sticky top-0 flex items-start justify-between gap-6 px-8 py-6 bg-[#0b0910]/90 backdrop-blur-xl border-b border-white/[0.05] z-10">
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-500 font-semibold tracking-widest uppercase font-mono mb-1.5">
                      Workspace Node Configuration
                    </p>
                    <h2 className="text-lg font-medium text-white line-clamp-2 tracking-tight leading-snug">
                      {selected.idea}
                    </h2>
                    <div className="flex items-center gap-1.5 text-xs text-purple-400/70 font-mono mt-2">
                      <Clock size={11} /> {formatDate(selected.created_at)}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setSelected(null)}
                    className="flex-shrink-0 w-9 h-9 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] flex items-center justify-center transition-all group"
                  >
                    <X size={15} className="text-gray-400 group-hover:text-white transition-colors" />
                  </button>
                </div>

                {/* Content Stream Container */}
                <div className="p-8 space-y-6">
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