import { cfg } from "./config.mjs";
import { verifyJwt } from "./crypto.mjs";

export function cors(req) {
  const origin = req.headers.get("origin");
  const ok = origin && cfg().allowedOrigins.includes(origin);
  return ok ? {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "authorization, content-type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Max-Age": "600",
    Vary: "Origin",
  } : { Vary: "Origin" };
}

export const json = (req, status, body) => new Response(JSON.stringify(body), {
  status,
  headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...(req ? cors(req) : {}) },
});

export const preflight = req => req.method === "OPTIONS" ? new Response(null, { status: 204, headers: cors(req) }) : null;

export async function readJson(req, max = 64 * 1024) {
  const text = await req.text();
  if (text.length > max) throw Object.assign(new Error("too large"), { status: 413 });
  if (!text) return {};
  try { return JSON.parse(text); } catch { throw Object.assign(new Error("bad json"), { status: 400 }); }
}

// Returns the signed-in email, or null.
export function sessionEmail(req) {
  const h = req.headers.get("authorization") || "";
  const m = h.match(/^Bearer\s+(.+)$/i);
  const body = m ? verifyJwt(m[1], cfg().sessionSecret) : null;
  return body && body.typ === "session" ? body.sub : null;
}

// Wraps a handler so thrown errors become tidy JSON answers instead of stack traces.
export const handle = fn => async (req, context) => {
  const pre = preflight(req);
  if (pre) return pre;
  try { return await fn(req, context); } catch (e) {
    if (!e.status) console.error(e);
    return json(req, e.status || 500, { error: e.status ? e.message : "server error" });
  }
};
