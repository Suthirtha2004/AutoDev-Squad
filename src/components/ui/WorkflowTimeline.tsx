import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, Palette, Network, Code2, ShieldCheck,
  CheckCircle2, Loader2, Circle,
} from "lucide-react";
import type { WorkflowStep } from "../../types";
import { AGENT_MAP } from "../../lib/agents";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Briefcase, Palette, Network, Code2, ShieldCheck,
};

interface Props {
  steps: WorkflowStep[];
}

export default function WorkflowTimeline({ steps }: Props) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-5 top-0 bottom-0 w-px bg-white/10" />

      <div className="space-y-4">
        {steps.map((step, i) => {
          const agent = AGENT_MAP[step.agentKey];
          const Icon = iconMap[agent.icon] ?? Briefcase;
          const isRunning = step.status === "running";
          const isDone = step.status === "done";
          const isSkipped = step.status === "skipped";

          return (
            <motion.div
              key={step.agentKey}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative flex items-center gap-4 pl-2"
            >
              {/* Step icon */}
              <div className="relative z-10 flex-shrink-0">
                <AnimatePresence mode="wait">
                  {isRunning ? (
                    <motion.div
                      key="running"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className={`w-8 h-8 rounded-full bg-gradient-to-br ${agent.color} flex items-center justify-center`}
                      style={{ boxShadow: `0 0 16px ${agent.glowColor}` }}
                    >
                      <Loader2 size={14} className="text-white animate-spin" />
                    </motion.div>
                  ) : isDone ? (
                    <motion.div
                      key="done"
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      className={`w-8 h-8 rounded-full bg-gradient-to-br ${agent.color} flex items-center justify-center`}
                    >
                      <CheckCircle2 size={14} className="text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="pending"
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isSkipped ? "bg-white/5" : "bg-white/5"
                      } border border-white/10`}
                    >
                      {isSkipped ? (
                        <Circle size={12} className="text-gray-600" />
                      ) : (
                        <Icon size={14} className="text-gray-600" />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Label */}
              <div className={`transition-colors duration-300 ${
                isRunning ? "text-white" : isDone ? "text-gray-300" : "text-gray-600"
              }`}>
                <p className="text-sm font-semibold leading-tight">{agent.name}</p>
                <p className="text-xs mt-0.5 capitalize">
                  {isRunning ? (
                    <span className="text-cyan-400 animate-pulse">Processing...</span>
                  ) : isDone ? (
                    <span className="text-emerald-400">Completed</span>
                  ) : isSkipped ? (
                    <span className="text-gray-600">Skipped</span>
                  ) : (
                    <span className="text-gray-600">Waiting</span>
                  )}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
