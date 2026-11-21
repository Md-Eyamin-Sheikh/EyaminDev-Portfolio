/**
 * eyamin-agent-api - Cloudflare Worker for EyaminDev AI Lab
 *
 * Rules:
 * - All secrets (GEMINI_API_KEY) live strictly in wrangler secrets.
 * - Handles CORS for allowed frontend origins.
 * - Executes LLM prompts and returns plain-text execution traces / structured JSON.
 */

export interface Env {
  GEMINI_API_KEY?: string;
  ALLOWED_ORIGINS?: string;
}

const systemPrompts: Record<string, string> = {
  "support-agent": `You are an Autonomous Tier-1 Support Employee for ApexCloud Systems (a fictional cloud hosting company).
Evaluate the customer's inquiry. First output a brief reasoning trace (sentiment, detected intent, escalation routing), followed by a clean JSON object containing ticketId, priority, category, assignedQueue, and automatedResponse. Never execute HTML or scripts.`,

  "lead-qualifier": `You are an Autonomous SDR for NexusMetrics AI (a fictional analytics SaaS).
Analyze the inbound lead inquiry using the BANT framework. First output an extraction trace, followed by a JSON report containing leadScore (0-100), tier, recommendedAction, and crmTag array. Never execute HTML or scripts.`,

  "data-synthesizer": `You are an Automated Financial Document Processing Agent for GlobalLogistics Express (a fictional shipping company).
Normalize the messy multi-currency invoice logs. Output a synthesis pipeline log followed by a normalized accounting schema with invoiceNumber, vendor, currency, subtotal, tax, total, and validationStatus.`,
};

function getCorsHeaders(request: Request, env: Env): HeadersInit {
  const origin = request.headers.get("Origin") || "";
  const allowed = (env.ALLOWED_ORIGINS || "*").split(",").map((o) => o.trim());
  const isAllowed = allowed.includes("*") || allowed.includes(origin);

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin || "*" : allowed[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json",
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const corsHeaders = getCorsHeaders(request, env);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(request.url);

    // Health check endpoint
    if (url.pathname === "/health" || url.pathname === "/") {
      return new Response(JSON.stringify({ status: "healthy", service: "eyamin-agent-api" }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    // AI Agent execution endpoint
    if (url.pathname === "/api/agent" && request.method === "POST") {
      try {
        const body = (await request.json()) as { demoId?: string; prompt?: string };
        const demoId = body.demoId || "support-agent";
        const prompt = body.prompt || "";

        if (!prompt) {
          return new Response(JSON.stringify({ error: "Missing prompt" }), {
            status: 400,
            headers: corsHeaders,
          });
        }

        const apiKey = env.GEMINI_API_KEY;
        if (!apiKey) {
          return new Response(
            JSON.stringify({
              error: "Worker is missing GEMINI_API_KEY secret. Run: wrangler secret put GEMINI_API_KEY",
            }),
            { status: 503, headers: corsHeaders }
          );
        }

        const systemInstruction = systemPrompts[demoId] || systemPrompts["support-agent"];

        // Call Gemini REST API directly from the Worker
        const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const geminiRes = await fetch(geminiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: systemInstruction }],
            },
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 800,
            },
          }),
        });

        if (!geminiRes.ok) {
          const errText = await geminiRes.text();
          return new Response(
            JSON.stringify({ error: "Gemini API error", details: errText }),
            { status: 502, headers: corsHeaders }
          );
        }

        const geminiData: any = await geminiRes.json();
        const generatedText =
          geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated";

        return new Response(
          JSON.stringify({
            result: generatedText,
            status: "success",
            demoId,
          }),
          { status: 200, headers: corsHeaders }
        );
      } catch (err: any) {
        return new Response(
          JSON.stringify({ error: "Internal server error", message: err?.message || String(err) }),
          { status: 500, headers: corsHeaders }
        );
      }
    }

    return new Response(JSON.stringify({ error: "Not Found" }), {
      status: 404,
      headers: corsHeaders,
    });
  },
};
