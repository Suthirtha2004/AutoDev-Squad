import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, AlertCircle, CheckCircle2, Cpu } from "lucide-react";

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

  const [steps, setSteps] = useState<WorkflowStep[]>(
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
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    if (!idea) {
      navigate("/dashboard");
      return;
    }

    run();
  }, []);

  // ✅ AUTO SCROLL FIX
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [outputs, loading]);

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

      const relevantKeys = mode === "full" ? ALL_AGENT_KEYS : [agentKey];

      for (let i = 0; i < relevantKeys.length; i++) {
        const key = relevantKeys[i];
        const output = result.outputs[key];

        if (output) {
          setOutputs((prev) => ({ ...prev, [key]: output }));
        }

        setSteps((prev) =>
          prev.map((s) => {
            if (s.agentKey === key) return { ...s, status: "done" };

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

  const outputEntries = Object.entries(outputs) as [AgentKey, string][];

  return (
    <AppLayout>
      {/* ROOT FIXED LAYOUT */}
      <div className="h-screen flex flex-col px-8 py-10 bg-[#0c0a12] text-white overflow-hidden">

        {/* HEADER */}
        <div className="shrink-0 mb-8">
          <motion.div>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-xs text-gray-500 hover:text-white mb-5"
            >
              <ArrowLeft size={12} /> Return
            </button>

            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
              <Cpu size={14} className="text-purple-400" />
              AutoDev Squad / Workspace
            </div>

            <h1 className="text-3xl font-semibold">
              Squad <span className="text-purple-400">Workspace</span>
            </h1>

            <p className="text-gray-400 mt-2">{idea}</p>
          </motion.div>
        </div>

        {/* GRID (IMPORTANT min-h-0 FIX) */}
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-4 gap-8 min-h-0">

          {/* LEFT */}
          <div className="xl:col-span-1 min-h-0">
            <GlowCard glowColor="rgba(147,51,234,0.15)">
              <WorkflowTimeline steps={steps} />

              {done && (
                <div className="mt-5 text-green-400 text-xs flex items-center gap-2">
                  <CheckCircle2 size={14} />
                  Completed
                </div>
              )}
            </GlowCard>
          </div>

          {/* RIGHT SCROLL FIX */}
          <div className="xl:col-span-3 flex flex-col min-h-0">

            <div className="flex-1 overflow-y-auto pr-3 space-y-5">

              {/* LOADING */}
              {loading && outputEntries.length === 0 && (
                <LoadingOrb
                  label={
                    activeAgent
                      ? `${activeAgent.name} working...`
                      : "Initializing..."
                  }
                />
              )}

              {/* ERROR */}
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl flex gap-2">
                  <AlertCircle size={16} />
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

              {/* LOADING CONTINUE */}
              {loading && outputEntries.length > 0 && (
                <div className="text-gray-500 text-xs animate-pulse">
                  Generating next agent...
                </div>
              )}

              {/* DONE */}
              {done && (
                <div className="text-center text-gray-500 text-xs">
                  All agents completed
                </div>
              )}

              {/* AUTO SCROLL TARGET */}
              <div ref={bottomRef} />
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}