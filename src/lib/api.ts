import axios from "axios";
import { EDGE_FUNCTION_URL, edgeFunctionHeaders } from "./supabase";
import type { GenerateRequest, GenerateResponse, Project } from "../types";

export async function generateProject(payload: GenerateRequest): Promise<GenerateResponse> {
  const { data } = await axios.post<GenerateResponse>(
    `${EDGE_FUNCTION_URL}/generate`,
    payload,
    { headers: edgeFunctionHeaders }
  );
  return data;
}

export async function fetchProjects(): Promise<Project[]> {
  const { data } = await axios.get<{ projects: Project[] }>(
    `${EDGE_FUNCTION_URL}/projects`,
    { headers: edgeFunctionHeaders }
  );
  return data.projects;
}
