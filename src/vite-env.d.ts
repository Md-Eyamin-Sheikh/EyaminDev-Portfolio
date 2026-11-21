/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public Cloudflare Worker AI Endpoint (e.g., https://eyamin-agent-api.workers.dev) */
  readonly VITE_AGENT_API_URL?: string;
  /** Public Cloudflare Turnstile Site Key for bot protection */
  readonly VITE_TURNSTILE_SITE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

