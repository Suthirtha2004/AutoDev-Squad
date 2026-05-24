import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Cpu, Zap, ArrowRight, Bot, Layers, Code2, ShieldCheck,
  Briefcase, Palette, Network,
} from "lucide-react";
import { AGENTS } from "../lib/agents";

const features = [
  {
    icon: Zap,
    title: "Autonomous AI Agents",
    desc: "5 specialized AI agents collaborate using prompt chaining to architect your entire product.",
  },
  {
    icon: Layers,
    title: "Full Workflow Mode",
    desc: "Run all agents sequentially — each output feeds context to the next for cohesive results.",
  },
  {
    icon: Bot,
    title: "Individual Agent Mode",
    desc: "Select any single agent for targeted output without running the full pipeline.",
  },
];

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Briefcase, Palette, Network, Code2, ShieldCheck,
};

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#080711] text-white overflow-hidden">
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(147,51,234,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147,51,234,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Cosmic Orb Centerpiece (Reflect Black Hole Look) */}
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[150px] bg-purple-600/20 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[32%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full border-[6px] border-purple-400 shadow-[0_0_80px_20px_rgba(168,85,247,0.6)] bg-black pointer-events-none opacity-40 z-0" />

      {/* Ambient corner blooms */}
      <div className="fixed top-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-200px] right-[-100px] w-[500px] h-[500px] rounded-full bg-purple-900/20 blur-[100px] pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/5 bg-black/10 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Cpu size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            AutoDev <span className="text-purple-400">Squad</span>
          </span>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-sm font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow border border-purple-400/20"
        >
          Launch App <ArrowRight size={14} />
        </motion.button>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold tracking-widest uppercase mb-8 backdrop-blur-sm"
        >
          <Zap size={12} className="text-purple-400" />
          Agentic AI Platform
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-6 max-w-4xl"
        >
          Your Virtual{" "}
          <span
            className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent"
            style={{ filter: "drop-shadow(0 0 30px rgba(168,85,247,0.3))" }}
          >
            AI Software Company
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-400 max-w-2xl leading-relaxed mb-10"
        >
          Describe your startup idea. Five autonomous AI agents collaborate — PM, Designer, Architect,
          Developer, and QA — to build a complete project blueprint in minutes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-shadow text-sm border border-purple-400/20"
          >
            <Zap size={16} /> Start Building <ArrowRight size={14} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/projects")}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm text-gray-300 hover:border-purple-500/30 hover:text-white transition-colors text-sm font-semibold"
          >
            <Layers size={16} /> View Projects
          </motion.button>
        </motion.div>

        {/* Animated hero visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="relative mt-20 w-full max-w-4xl"
        >
          <div className="relative bg-[#0d0c1d]/60 backdrop-blur-md border border-white/10 rounded-3xl p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

            <p className="text-xs text-purple-400/60 mb-4 font-mono">// Agent Pipeline Preview</p>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              {AGENTS.map((agent, i) => {
                const Icon = iconMap[agent.icon] ?? Briefcase;
                return (
                  <motion.div
                    key={agent.key}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${agent.color || "from-purple-500 to-indigo-600"} flex items-center justify-center shadow-lg`}
                      style={{ boxShadow: `0 4px 16px ${agent.glowColor || "rgba(147,51,234,0.3)"}` }}
                    >
                      <Icon size={16} className="text-white" />
                    </div>
                    {i < AGENTS.length - 1 && (
                      <ArrowRight size={14} className="text-gray-700 mx-1" />
                    )}
                  </motion.div>
                );
              })}
            </div>
            <p className="text-xs text-center text-gray-500 mt-4 font-mono">
              PM → Designer → Architect → Developer → QA
            </p>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 py-20 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-black text-center mb-12"
        >
          Built for <span className="text-purple-400">Scale</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:border-purple-500/30 transition-colors overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500/10 to-indigo-600/10 border border-purple-500/20 flex items-center justify-center mb-4">
                <Icon size={20} className="text-purple-400" />
              </div>
              <h3 className="font-bold text-white mb-2">{title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Agent Showcase */}
      <section className="relative z-10 px-6 py-20 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-black text-center mb-4"
        >
          Meet the <span className="text-purple-400">AI Squad</span>
        </motion.h2>
        <p className="text-center text-gray-400 mb-12 text-sm max-w-xl mx-auto">
          Five specialized agents, each an expert in their domain, working together using Gemini AI prompt chaining.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {AGENTS.map((agent, i) => {
            const Icon = iconMap[agent.icon] ?? Briefcase;
            return (
              <motion.div
                key={agent.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, scale: 1.03 }}
                className="group bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all overflow-hidden relative"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at top left, ${agent.glowColor || "rgba(168,85,247,0.15)"} 0%, transparent 60%)`,
                  }}
                />
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${agent.color || "from-purple-500 to-indigo-600"} flex items-center justify-center mb-3`}
                  style={{ boxShadow: `0 4px 16px ${agent.glowColor || "rgba(168,85,247,0.2)"}` }}
                >
                  <Icon size={18} className="text-white" />
                </div>
                <p className="text-xs font-bold text-white leading-tight mb-1">{agent.name}</p>
                <p className="text-xs text-gray-400">{agent.role}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-2xl mx-auto bg-white/[0.01] border border-white/5 rounded-3xl p-12 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-600/5 pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
          <h2 className="text-3xl font-black mb-4">Ready to build your product?</h2>
          <p className="text-gray-400 mb-8 text-sm">
            Enter your idea and watch five AI agents architect your entire software product.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 font-bold shadow-xl shadow-purple-500/30 text-sm border border-purple-400/20"
          >
            <Zap size={16} /> Launch AutoDev Squad <ArrowRight size={14} />
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 px-8 py-6 text-center text-xs text-gray-500 bg-black/20">
        @Copyright 2026 by AutoDev Squad — Agentic AI
      </footer>
    </div>
  );
}