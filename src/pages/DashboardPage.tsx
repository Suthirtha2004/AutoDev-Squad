import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Zap, Bot, ArrowRight, Layers, Cpu,
} from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import AgentCard from "../components/ui/AgentCard";
import GlowCard from "../components/ui/GlowCard";
import { AGENTS } from "../lib/agents";
import type { AgentKey } from "../types";

type Mode = "full" | "individual";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [idea, setIdea] = useState("");
  const [mode, setMode] = useState<Mode>("full");
  const [selectedAgent, setSelectedAgent] = useState<AgentKey | null>(null);

  const canRun = idea.trim().length > 10 && (mode === "full" || selectedAgent !== null);

  function handleRun() {
    if (!canRun) return;
    const params = new URLSearchParams({ idea, mode });
    if (mode === "individual" && selectedAgent) params.set("agent", selectedAgent);
    navigate(`/workspace?${params.toString()}`);
  }

  return (
    <AppLayout>
      <div className="relative min-h-screen px-6 py-8">
        {/* Background orbs */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2 font-mono">
            <Cpu size={12} className="text-cyan-500" />
            AutoDev Squad / Dashboard
          </div>
          <h1 className="text-2xl font-black text-white">
            Launch Your <span className="text-cyan-400">AI Squad</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Describe your project idea and select how you want the agents to run.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left: Input & Mode */}
          <div className="xl:col-span-2 space-y-5">
            {/* Idea input */}
            <GlowCard glowColor="rgba(6,182,212,0.2)">
              <div className="p-6">
                <label className="block text-xs font-semibold text-gray-400 mb-3 tracking-widest uppercase">
                  Project Idea
                </label>
                <textarea
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="e.g. Build an AI-powered fitness platform for university students with social features, progress tracking, and personalized workout plans..."
                  rows={5}
                  className="w-full bg-transparent text-sm text-white placeholder-gray-600 outline-none resize-none leading-relaxed"
                />
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                  <span className="text-xs text-gray-600">{idea.length} characters</span>
                  {idea.length > 0 && idea.length < 10 && (
                    <span className="text-xs text-amber-400">Add more detail for better results</span>
                  )}
                </div>
              </div>
            </GlowCard>

            {/* Mode selection */}
            <div>
              <p className="text-xs font-semibold text-gray-400 mb-3 tracking-widest uppercase">
                Run Mode
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    value: "full" as Mode,
                    icon: Layers,
                    title: "Full Workflow",
                    desc: "All 5 agents run sequentially with prompt chaining",
                    glow: "rgba(6,182,212,0.3)",
                  },
                  {
                    value: "individual" as Mode,
                    icon: Bot,
                    title: "Individual Agent",
                    desc: "Select a single agent for targeted output",
                    glow: "rgba(245,158,11,0.3)",
                  },
                ].map(({ value, icon: Icon, title, desc, glow }) => (
                  <motion.button
                    key={value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setMode(value)}
                    className={`relative text-left p-5 rounded-2xl border transition-all overflow-hidden ${
                      mode === value
                        ? "border-cyan-500/40 bg-cyan-500/10"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    {mode === value && (
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: `radial-gradient(ellipse at top left, ${glow} 0%, transparent 60%)` }}
                      />
                    )}
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
                      mode === value ? "bg-cyan-500/20" : "bg-white/5"
                    }`}>
                      <Icon size={18} className={mode === value ? "text-cyan-400" : "text-gray-500"} />
                    </div>
                    <p className={`text-sm font-bold mb-1 ${mode === value ? "text-white" : "text-gray-300"}`}>
                      {title}
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Agent selection (individual mode) */}
            {mode === "individual" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xs font-semibold text-gray-400 mb-3 tracking-widest uppercase">
                  Select Agent
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {AGENTS.map((agent, i) => (
                    <AgentCard
                      key={agent.key}
                      agent={agent}
                      selected={selectedAgent === agent.key}
                      selectable
                      index={i}
                      onClick={() =>
                        setSelectedAgent(selectedAgent === agent.key ? null : agent.key)
                      }
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right: Summary panel */}
          <div className="space-y-5">
            <GlowCard glowColor="rgba(6,182,212,0.15)">
              <div className="p-6">
                <p className="text-xs font-semibold text-gray-400 mb-4 tracking-widest uppercase">
                  Run Summary
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Mode</span>
                    <span className={`font-semibold ${mode === "full" ? "text-cyan-400" : "text-amber-400"}`}>
                      {mode === "full" ? "Full Workflow" : "Individual"}
                    </span>
                  </div>
                  {mode === "individual" && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Agent</span>
                      <span className="font-semibold text-white">
                        {selectedAgent
                          ? AGENTS.find((a) => a.key === selectedAgent)?.name ?? "—"
                          : "Not selected"}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Agents</span>
                    <span className="font-semibold text-white">
                      {mode === "full" ? "5" : selectedAgent ? "1" : "0"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Est. time</span>
                    <span className="text-gray-400">
                      {mode === "full" ? "~45–90s" : "~10–20s"}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={canRun ? { scale: 1.03 } : {}}
                  whileTap={canRun ? { scale: 0.97 } : {}}
                  onClick={handleRun}
                  disabled={!canRun}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all ${
                    canRun
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
                      : "bg-white/5 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  <Zap size={16} />
                  {mode === "full" ? "Run Full Workflow" : "Run Agent"}
                  <ArrowRight size={14} />
                </motion.button>

                {!canRun && (
                  <p className="text-xs text-gray-600 text-center mt-2">
                    {idea.trim().length <= 10
                      ? "Enter a project idea to continue"
                      : "Select an agent to continue"}
                  </p>
                )}
              </div>
            </GlowCard>

            {/* Agent list preview */}
            {mode === "full" && (
              <GlowCard>
                <div className="p-5">
                  <p className="text-xs font-semibold text-gray-400 mb-3 tracking-widest uppercase">
                    Agent Pipeline
                  </p>
                  <div className="space-y-2">
                    {AGENTS.map((agent, i) => (
                      <div key={agent.key} className="flex items-center gap-3">
                        <span className="text-xs text-gray-700 w-4 font-mono">{i + 1}</span>
                        <div
                          className={`w-2 h-2 rounded-full bg-gradient-to-br ${agent.color}`}
                          style={{ boxShadow: `0 0 6px ${agent.glowColor}` }}
                        />
                        <span className="text-xs text-gray-400">{agent.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </GlowCard>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
