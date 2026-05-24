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
  const mode =
    searchParams.get("mode") === "individual" ? "individual" : "full";
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

  const [outputs, setOutputs] = useState<Partial<Record<AgentKey, string>>>(
    {}
  );

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
  }, []);

  async function run() {
    setLoading(true);
    setError(null);

    const firstKey = mode === "full" ? "pm" : agentKey;

    setSteps((prev) =>
      prev.map((s) =>
        s.agentKey === firstKey ? { ...s, status: "running" } : s
      )
    );

    try {
      const result = await generateProject({
        idea,
        mode: mode === "full" ? "full" : "individual",
        agentKey: mode === "individual" ? agentKey : undefined,
      });

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
            if (s.agentKey === key)
              return { ...s, status: "done" };

            if (
              i < relevantKeys.length - 1 &&
              s.agentKey === relevantKeys[i + 1]
            ) {
              return { ...s, status: "running" };
            }

            return s;
          })
        );

        await new Promise((r) => setTimeout(r, 300));
      }

      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");

      setSteps((prev) =>
        prev.map((s) =>
          s.status === "running"
            ? { ...s, status: "pending" }
            : s
        )
      );
    } finally {
      setLoading(false);
    }
  }

  const activeAgent = AGENTS.find((a) =>
    steps.some((s) => s.agentKey === a.key && s.status === "running")
  );

  const outputEntries = Object.entries(outputs) as [
    AgentKey,
    string
  ][];

  return (
    <AppLayout>
      {/* 🔥 CRITICAL FIX: allow page scrolling */}
      <div className="relative min-h-screen px-6 py-8 overflow-y-auto">

        <div className="fixed top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-700/5 blur-[150px] pointer-events-none" />

        {/* HEADER */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-white mb-4"
          >
            <ArrowLeft size={14} /> Back
          </button>

          <h1 className="text-2xl font-black text-white">
            Workspace
          </h1>

          <p className="text-sm text-gray-500 mt-1">{idea}</p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">

          {/* SIDEBAR */}
          <div className="xl:col-span-1">
            <GlowCard glowColor="rgba(6,182,212,0.1)">
              <div className="p-5">
                <WorkflowTimeline steps={steps} />

                {done && (
                  <div className="mt-4 text-emerald-400 text-xs">
                    ✓ Completed
                  </div>
                )}
              </div>
            </GlowCard>
          </div>

          {/* OUTPUT AREA */}
          {/* 🔥 CRITICAL FIX: scrollable column */}
          <div className="xl:col-span-3 space-y-4 max-h-screen overflow-y-auto pr-2">

            {/* LOADING */}
            <AnimatePresence>
              {loading && outputEntries.length === 0 && (
                <motion.div>
                  <LoadingOrb
                    label={
                      activeAgent
                        ? `${activeAgent.name} working...`
                        : "Loading..."
                    }
                    agentColor={
                      activeAgent?.color ??
                      "from-cyan-500 to-blue-600"
                    }
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ERROR */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* OUTPUTS */}
            {outputEntries.map(([key, content]) => (
              <AgentOutputPanel
                key={key}
                agentKey={key}
                content={content}
              />
            ))}

            {/* LOADING CONTINUATION */}
            {loading && outputEntries.length > 0 && (
              <div className="p-4 text-gray-400 text-sm">
                Generating next agent...
              </div>
            )}

            {/* DONE */}
            {done && (
              <div className="text-emerald-400 text-sm font-semibold">
                All agents completed
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}