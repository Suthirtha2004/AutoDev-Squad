import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

// ---------------- GEMINI ----------------
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

async function callGemini(prompt: string, apiKey: string) {
  const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    }),
  });

  const text = await res.text();

  if (!res.ok) {
    return `GEMINI_ERROR: ${text}`;
  }

  const json = JSON.parse(text);

  return (
    json?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "EMPTY_RESPONSE"
  );
}

// ---------------- AGENT PROMPTS ----------------
const agentPrompts: Record<
  string,
  (idea: string, context?: string) => string
> = {
  pm: (idea) => `
You are a Product Manager AI.

Project: ${idea}

Generate:
- Features (8-10)
- MVP (3-4 features)
- Milestones
- User Stories
`,

  uiux: (idea, context) => `
You are a UI/UX Designer AI.

Project: ${idea}

Context:
${context || "None"}

Generate:
- Landing Page Ideas
- Dashboard Layout
- Color Palette
- UX Improvements
- Key Screens
`,

  architect: (idea, context) => `
You are a System Architect AI.

Project: ${idea}

Context:
${context || "None"}

Generate:
- Tech Stack
- Database Schema
- Architecture Overview
- API Design
- Scalability Plan
`,

  backend: (idea, context) => `
You are a Backend Engineer AI.

Project: ${idea}

Context:
${context || "None"}

Generate:
- Folder Structure
- API Routes
- Auth Flow
- DB Models
- Middleware
`,

  qa: (idea, context) => `
You are a QA Engineer AI.

Project: ${idea}

Context:
${context || "None"}

Generate:
- Edge Cases
- Security Issues
- Scalability Risks
- Testing Strategy
`,
};

// ---------------- MAIN ----------------
Deno.serve(async (req) => {
  console.log("🔥 REQUEST:", req.method, req.url);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const DB_URL = Deno.env.get("DB_URL");
    const SERVICE_ROLE_KEY = Deno.env.get("SERVICE_ROLE_KEY");
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

    if (!DB_URL || !SERVICE_ROLE_KEY || !GEMINI_API_KEY) {
      throw new Error("Missing env variables");
    }

    const supabase = createClient(DB_URL, SERVICE_ROLE_KEY);

    const url = new URL(req.url);
    const path = url.pathname.split("/").pop();

    console.log("📍 Route:", path);

    // ---------------- GET PROJECTS ----------------
    if (req.method === "GET" && path === "projects") {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;

      return new Response(JSON.stringify({ projects: data }), {
        headers: corsHeaders,
      });
    }

    // ---------------- GENERATE ----------------
    if (req.method === "POST" && path === "generate") {
      const body = await req.json();
      const { idea, mode, agentKey } = body;

      if (!idea) throw new Error("Idea required");

      const outputs: Record<string, string> = {};

      // ---------------- FULL PIPELINE ----------------
      if (mode === "full") {
        outputs.pm = await callGemini(
          agentPrompts.pm(idea),
          GEMINI_API_KEY
        );

        outputs.uiux = await callGemini(
          agentPrompts.uiux(idea, outputs.pm),
          GEMINI_API_KEY
        );

        const combined = `${outputs.pm}\n\n${outputs.uiux}`;

        outputs.architect = await callGemini(
          agentPrompts.architect(idea, combined),
          GEMINI_API_KEY
        );

        const combined2 = `${combined}\n\n${outputs.architect}`;

        outputs.backend = await callGemini(
          agentPrompts.backend(idea, combined2),
          GEMINI_API_KEY
        );

        const combined3 = `${combined2}\n\n${outputs.backend}`;

        outputs.qa = await callGemini(
          agentPrompts.qa(idea, combined3),
          GEMINI_API_KEY
        );
      }

      // ---------------- SINGLE AGENT ----------------
      else if (agentKey && agentPrompts[agentKey]) {
        outputs[agentKey] = await callGemini(
          agentPrompts[agentKey](idea),
          GEMINI_API_KEY
        );
      } else {
        throw new Error("Invalid mode or agentKey");
      }

      // ---------------- DB SAVE ----------------
      const { data, error } = await supabase
        .from("projects")
        .insert({
          idea,
          pm_output: outputs.pm || "",
          uiux_output: outputs.uiux || "",
          architect_output: outputs.architect || "",
          backend_output: outputs.backend || "",
          qa_output: outputs.qa || "",
        })
        .select()
        .single();

      if (error) throw error;

      return new Response(JSON.stringify({ project: data, outputs }), {
        headers: corsHeaders,
      });
    }

    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: corsHeaders,
    });
  } catch (err) {
    console.error("❌ ERROR:", err);

    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : String(err),
      }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
});