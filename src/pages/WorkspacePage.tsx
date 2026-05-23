import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Zap, AlertCircle, CheckCircle2, Cpu } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import WorkflowTimeline from "../components/ui/WorkflowTimeline";
import AgentOutputPanel from "../components/agents/AgentOutputPanel";
import LoadingOrb from "../components/ui/LoadingOrb";
import GlowCard from "../components/ui/GlowCard";
import { generateProject } from "../lib/api";
import { AGENTS } from "../lib/agents";
import type { AgentKey, WorkflowStep } from "../types";

const ALL_AGENT_KEYS: AgentKey[] = ["pm", "uiux", "architect", "backend", "qa"];

export default function WorkspacePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const idea = searchParams.get("idea") ?? "";
  const mode = searchParams.get("mode") === "individual" ? "individual" : "full";
  const agentKey = (searchParams.get("agent") ?? "") as AgentKey;

  const [steps, setSteps] = useState<WorkflowStep[]>(() =>
    ALL_AGENT_KEYS.map((key) => ({
      agentKey: key,
      status:
        mode === "full"
          ? "pending"
          : key === agentKey
          ? "pending"
          : "skipped",
    }))
  );
  const [outputs, setOutputs] = useState<Partial<Record<AgentKey, string>>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    if (!idea) {
      navigate("/dashboard");
      return;
    }

    run();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function run() {
    setLoading(true);
    setError(null);

    // Mark first relevant agent as running
    const firstKey = mode === "full" ? "pm" : agentKey;
    setSteps((prev) =>
      prev.map((s) => (s.agentKey === firstKey ? { ...s, status: "running" } : s))
    );

    try {
      const result = await generateProject({
        idea,
        mode: mode === "full" ? "full" : "individual",
        agentKey: mode === "individual" ? agentKey : undefined,
      });

      // Animate steps completing one by one
      const relevantKeys =
        mode === "full" ? ALL_AGENT_KEYS : [agentKey];

      for (let i = 0; i < relevantKeys.length; i++) {
        const key = relevantKeys[i];
        const output = result.outputs[key];

        if (output) {
          setOutputs((prev) => ({ ...prev, [key]: output }));
        }

        setSteps((prev) =>
          prev.map((s) => {
            if (s.agentKey === key) return { ...s, status: "done" };
            if (i < relevantKeys.length - 1 && s.agentKey === relevantKeys[i + 1])
              return { ...s, status: "running" };
            return s;
          })
        );

        await new Promise((r) => setTimeout(r, 300));
      }

      setDone(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
      setSteps((prev) =>
        prev.map((s) => (s.status === "running" ? { ...s, status: "pending" } : s))
      );
    } finally {
      setLoading(false);
    }
  }

  const activeAgent = AGENTS.find(
    (a) => steps.find((s) => s.agentKey === a.key && s.status === "running")
  );

  const outputEntries = Object.entries(outputs) as [AgentKey, string][];

  return (
    <AppLayout>
      <div className="relative min-h-screen px-6 py-8">
        <div className="fixed top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-700/5 blur-[150px] pointer-events-none" />

        {/* Back + header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </button>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1 font-mono">
            <Cpu size={12} className="text-cyan-500" />
            AutoDev Squad / Workspace
          </div>
          <h1 className="text-2xl font-black text-white">
            {mode === "full" ? (
              <>
                Full <span className="text-cyan-400">Workflow</span>
              </>
            ) : (
              <>
                {AGENTS.find((a) => a.key === agentKey)?.name ?? "Agent"}{" "}
                <span className="text-cyan-400">Output</span>
              </>
            )}
          </h1>
          <p className="text-sm text-gray-500 mt-1 max-w-2xl line-clamp-2">
            {idea}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Sidebar: timeline */}
          <div className="xl:col-span-1">
            <GlowCard glowColor="rgba(6,182,212,0.1)">
              <div className="p-5">
                <p className="text-xs font-semibold text-gray-400 mb-4 tracking-widest uppercase">
                  {mode === "full" ? "Workflow Progress" : "Agent Status"}
                </p>
                <WorkflowTimeline steps={steps} />

                {done && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
                  >
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    <span className="text-xs text-emerald-400 font-semibold">All done!</span>
                  </motion.div>
                )}
              </div>
            </GlowCard>

            {done && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/projects")}
                className="mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-all"
              >
                View Saved Projects
              </motion.button>
            )}
          </div>

          {/* Main: outputs */}
          <div className="xl:col-span-3 space-y-4">
            {/* Loading state */}
            <AnimatePresence>
              {loading && outputEntries.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <GlowCard glowColor={activeAgent?.glowColor ?? "rgba(6,182,212,0.2)"}>
                    <LoadingOrb
                      label={
                        activeAgent
                          ? `${activeAgent.name} is working...`
                          : "Initializing agents..."
                      }
                      agentColor={activeAgent?.color ?? "from-cyan-500 to-blue-600"}
                    />
                  </GlowCard>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error state */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 p-5 rounded-2xl bg-red-500/10 border border-red-500/20"
              >
                <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-400 mb-1">Generation Failed</p>
                  <p className="text-xs text-red-300/70">{error}</p>
                  <button
                    onClick={run}
                    className="mt-3 flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300"
                  >
                    <Zap size={12} /> Retry
                  </button>
                </div>
              </motion.div>
            )}

            {/* Streaming output panels */}
            {outputEntries.map(([key, content]) => (
              <AgentOutputPanel key={key} agentKey={key} content={content} />
            ))}

            {/* Still loading after some outputs */}
            {loading && outputEntries.length > 0 && activeAgent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl border border-white/10 overflow-hidden"
              >
                <LoadingOrb
                  label={`${activeAgent.name} is working...`}
                  agentColor={activeAgent.color}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
