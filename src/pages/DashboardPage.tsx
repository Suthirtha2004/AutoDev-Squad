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
      <div className="relative min-h-screen px-8 py-10 md:px-12 md:py-12 bg-[#0c0a12] text-[#f4f4f6] font-sans antialiased overflow-x-hidden selection:bg-purple-500/30">
        
        {/* Deep Ambient Cosmic Core - Inspired by Reflect */}
        <div className="fixed top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-purple-600/[0.04] blur-[160px] pointer-events-none" />
        <div className="fixed bottom-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/[0.03] blur-[140px] pointer-events-none" />

        {/* Dashboard Header - Scaled up typography for prominence */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 md:mb-12"
        >
          <div className="flex items-center gap-2.5 text-xs text-gray-500 mb-3 font-mono tracking-widest uppercase">
            <Cpu size={14} className="text-purple-400" />
            AutoDev Squad <span className="text-gray-700">/</span> Overview
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Launch Your <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-300 bg-clip-text text-transparent">AI Squad</span>
          </h1>
          <p className="text-sm md:text-base text-gray-400/80 mt-2 max-w-2xl font-normal leading-relaxed tracking-wide">
            Describe your project objective below to initialize your automated workspace nodes.
          </p>
        </motion.div>

        {/* Workspace Layout Container */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 relative z-10 items-start">
          
          {/* Left Column: Core Inputs & Selectors */}
          <div className="xl:col-span-2 space-y-8">
            
            {/* Project Idea Input Card - Enhanced readability & layout area */}
            <GlowCard glowColor="rgba(147,51,234,0.15)">
              <div className="p-8 bg-[#12101a]/60 backdrop-blur-2xl border border-white/[0.05] rounded-2xl shadow-[0_24px_60px_-15px_rgba(0,0,0,0.7)]">
                <label className="block text-xs font-semibold text-gray-400 tracking-widest uppercase font-mono mb-4">
                  Project Core Specification
                </label>
                <textarea
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="e.g. Build an AI-powered fitness platform for university students with social features, progress tracking, and personalized workout plans..."
                  rows={6}
                  className="w-full bg-transparent text-base text-white placeholder-gray-600 outline-none resize-none leading-relaxed font-normal transition-colors focus:placeholder-gray-500"
                />
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.04]">
                  <span className="text-xs font-mono text-gray-500 bg-black/30 px-3 py-1 rounded-md border border-white/[0.02]">
                    {idea.length} characters
                  </span>
                  {idea.length > 0 && idea.length < 10 && (
                    <span className="text-xs font-medium text-purple-400 animate-pulse">
                      Provide a slightly longer description to deploy nodes
                    </span>
                  )}
                </div>
              </div>
            </GlowCard>

            {/* Run Mode Selection - Larger interactive areas inspired by premium app cards */}
            <div>
              <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase font-mono mb-4">
                Execution Configuration
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    value: "full" as Mode,
                    icon: Layers,
                    title: "Full Pipeline Mode",
                    desc: "Orchestrate all 5 agents sequentially using structured prompt context chaining.",
                    glow: "rgba(147,51,234,0.18)",
                  },
                  {
                    value: "individual" as Mode,
                    icon: Bot,
                    title: "Isolated Node Mode",
                    desc: "Execute a singular standalone agent macro for micro-targeted modular updates.",
                    glow: "rgba(168,85,247,0.18)",
                  },
                ].map(({ value, icon: Icon, title, desc, glow }) => (
                  <motion.button
                    key={value}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => setMode(value)}
                    className={`relative text-left p-6 md:p-8 rounded-xl border transition-all duration-300 overflow-hidden group ${
                      mode === value
                        ? "border-purple-500/40 bg-gradient-to-b from-purple-500/[0.06] to-purple-500/[0.01] shadow-[0_0_40px_rgba(147,51,234,0.08),inset_0_0_20px_rgba(147,51,234,0.04)]"
                        : "border-white/[0.04] bg-[#12101a]/30 hover:border-white/[0.1] hover:bg-[#12101a]/50"
                    }`}
                  >
                    {mode === value && (
                      <div
                        className="absolute inset-0 pointer-events-none opacity-50"
                        style={{ background: `radial-gradient(circle at 15% 15%, ${glow} 0%, transparent 75%)` }}
                      />
                    )}
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 border transition-all ${
                      mode === value 
                        ? "bg-purple-500/15 border-purple-500/30 text-purple-300 shadow-[0_0_15px_rgba(147,51,234,0.2)]" 
                        : "bg-black/40 border-white/[0.05] text-gray-400 group-hover:text-gray-300"
                    }`}>
                      <Icon size={20} />
                    </div>
                    <p className={`text-base font-medium mb-1.5 tracking-tight transition-colors ${mode === value ? "text-white" : "text-gray-300"}`}>
                      {title}
                    </p>
                    <p className="text-sm text-gray-500 font-normal leading-relaxed">{desc}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Agent Grid Container - Scaled typography and alignment */}
            {mode === "individual" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.25 }}
                className="pt-2"
              >
                <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase font-mono mb-4">
                  Select Targeting Node
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

          {/* Right Column: Execution Control Center / Status Panel */}
          <div className="space-y-6">
            <GlowCard glowColor="rgba(147,51,234,0.12)">
              <div className="p-8 bg-[#12101a]/60 backdrop-blur-2xl border border-white/[0.05] rounded-2xl shadow-[0_24px_60px_-15px_rgba(0,0,0,0.7)]">
                <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase font-mono mb-6">
                  Workspace Summary
                </p>

                <div className="space-y-4 mb-8 border-b border-white/[0.06] pb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 font-normal">Workflow Architecture</span>
                    <span className={`font-medium ${mode === "full" ? "text-purple-400" : "text-indigo-400"}`}>
                      {mode === "full" ? "Full Matrix Pipeline" : "Isolated Node Stack"}
                    </span>
                  </div>
                  {mode === "individual" && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 font-normal">Active Worker</span>
                      <span className="font-medium text-white bg-white/[0.04] px-2.5 py-0.5 rounded border border-white/[0.03]">
                        {selectedAgent
                          ? AGENTS.find((a) => a.key === selectedAgent)?.name ?? "—"
                          : "Unallocated"}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 font-normal">Clusters Engaged</span>
                    <span className="font-mono font-medium text-white">
                      {mode === "full" ? "05 Nodes" : selectedAgent ? "01 Node" : "00 Nodes"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 font-normal">Est. Runtime</span>
                    <span className="font-mono text-gray-400">
                      {mode === "full" ? "~45 – 90s" : "~10 – 20s"}
                    </span>
                  </div>
                </div>

                {/* Big Bold Action Button - High contrast, high priority layout element */}
                <motion.button
                  whileHover={canRun ? { scale: 1.015 } : {}}
                  whileTap={canRun ? { scale: 0.985 } : {}}
                  onClick={handleRun}
                  disabled={!canRun}
                  className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                    canRun
                      ? "bg-[#f4f4f6] text-[#0c0a12] shadow-[0_20px_40px_-5px_rgba(147,51,234,0.25)] hover:bg-white active:brightness-95"
                      : "bg-white/[0.02] border border-white/[0.05] text-gray-600 cursor-not-allowed"
                  }`}
                >
                  <Zap size={15} className={canRun ? "fill-current" : ""} />
                  {mode === "full" ? "Initialize Full Sequence" : "Initialize Selected Node"}
                  <ArrowRight size={15} />
                </motion.button>

                {!canRun && (
                  <p className="text-xs text-gray-500 text-center mt-4 font-normal tracking-wide bg-black/20 py-2 px-3 rounded-lg border border-white/[0.02]">
                    {idea.trim().length <= 10
                      ? "Awaiting detailed instruction string to unlock pipeline action."
                      : "Please designate a cluster node target to invoke runtime execution."}
                  </p>
                )}
              </div>
            </GlowCard>

            {/* Pipeline Step Tracker - Clean vertical preview tracking layout */}
            {mode === "full" && (
              <GlowCard>
                <div className="p-6 bg-[#12101a]/30 border border-white/[0.04] rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.5)]">
                  <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase font-mono mb-4">
                    Sequential Cluster Queue
                  </p>
                  <div className="space-y-3">
                    {AGENTS.map((agent, i) => (
                      <div key={agent.key} className="flex items-center justify-between bg-black/20 px-4 py-3 border border-white/[0.03] rounded-xl">
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-600 font-mono">0{i + 1}</span>
                          <span className="text-sm text-gray-300 font-medium tracking-tight">{agent.name}</span>
                        </div>
                        <div
                          className="w-2 h-2 rounded-full bg-purple-500"
                          style={{ boxShadow: `0 0 12px 2px ${agent.glowColor || "rgba(168,85,247,0.5)"}` }}
                        />
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