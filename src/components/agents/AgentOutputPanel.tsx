import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, Palette, Network, Code2, ShieldCheck, ChevronDown,
} from "lucide-react";
import type { AgentKey } from "../../types";
import { AGENT_MAP } from "../../lib/agents";
import MarkdownOutput from "../ui/MarkdownOutput";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Briefcase, Palette, Network, Code2, ShieldCheck,
};

interface Props {
  agentKey: AgentKey;
  content: string;
}

export default function AgentOutputPanel({ agentKey, content }: Props) {
  const [expanded, setExpanded] = useState(true);
  const agent = AGENT_MAP[agentKey];
  const Icon = iconMap[agent.icon] ?? Briefcase;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-white/10 overflow-hidden"
    >
      {/* Header */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-3 px-5 py-4 bg-white/[0.03] hover:bg-white/[0.05] transition-colors text-left"
      >
        <div
          className={`w-9 h-9 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center flex-shrink-0`}
          style={{ boxShadow: `0 4px 14px ${agent.glowColor}` }}
        >
          <Icon size={16} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 font-semibold tracking-widest uppercase">{agent.role}</p>
          <p className="text-sm font-bold text-white truncate">{agent.name}</p>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} className="text-gray-500" />
        </motion.div>
      </button>

      {/* Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 border-t border-white/5">
              <MarkdownOutput
                content={content}
                agentColor={agent.color}
                glowColor={agent.glowColor}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
