import { motion } from "framer-motion";
import {
  Briefcase,
  Palette,
  Network,
  Code2,
  ShieldCheck,
  CheckCircle2,
  Circle,
} from "lucide-react";
import type { AgentConfig } from "../../types";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Briefcase,
  Palette,
  Network,
  Code2,
  ShieldCheck,
};

interface Props {
  agent: AgentConfig;
  selected?: boolean;
  selectable?: boolean;
  onClick?: () => void;
  index?: number;
}

export default function AgentCard({ agent, selected, selectable, onClick, index = 0 }: Props) {
  const Icon = iconMap[agent.icon] ?? Briefcase;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ scale: 1.03, y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative group rounded-2xl p-5 border transition-all duration-300 cursor-pointer overflow-hidden ${
        selected
          ? "border-white/30 bg-white/[0.06]"
          : "border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/20"
      }`}
    >
      {/* Glow background */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top left, ${agent.glowColor} 0%, transparent 60%)`,
        }}
      />

      {/* Selection indicator */}
      {selectable && (
        <div className="absolute top-4 right-4">
          {selected ? (
            <CheckCircle2 size={18} className="text-cyan-400" />
          ) : (
            <Circle size={18} className="text-gray-600" />
          )}
        </div>
      )}

      {/* Icon */}
      <div className="relative mb-4">
        <div
          className={`w-11 h-11 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center shadow-lg`}
          style={{ boxShadow: `0 4px 20px ${agent.glowColor}` }}
        >
          <Icon size={20} className="text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1">
          {agent.role}
        </p>
        <h3 className="text-sm font-bold text-white mb-2">{agent.name}</h3>
        <p className="text-xs text-gray-400 leading-relaxed mb-4">{agent.description}</p>

        {/* Output tags */}
        <div className="flex flex-wrap gap-1.5">
          {agent.outputs.map((output) => (
            <span
              key={output}
              className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400"
            >
              {output}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
