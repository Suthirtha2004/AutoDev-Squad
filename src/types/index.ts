export type AgentKey = "pm" | "uiux" | "architect" | "backend" | "qa";

export interface AgentConfig {
  key: AgentKey;
  name: string;
  role: string;
  description: string;
  color: string;
  glowColor: string;
  icon: string;
  outputs: string[];
}

export interface Project {
  id: string;
  idea: string;
  pm_output: string;
  uiux_output: string;
  architect_output: string;
  backend_output: string;
  qa_output: string;
  mode: string;
  created_at: string;
}

export interface GenerateRequest {
  idea: string;
  mode: "full" | "individual";
  agentKey?: AgentKey;
}

export interface GenerateResponse {
  project: Project;
  outputs: Partial<Record<AgentKey, string>>;
}

export type WorkflowStep = {
  agentKey: AgentKey;
  status: "pending" | "running" | "done" | "skipped";
};
