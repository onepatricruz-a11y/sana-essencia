process.env.SE_STORE = "memory";
process.env.ALLOW_DEV_EMAIL = "1";
process.env.SESSION_SECRET = "test-secret-test-secret-test-secret";
process.env.ADMIN_KEY = "admin-test";
process.env.PAYHIP_API_KEY = "payhip-api-key";
process.env.WEBHOOK_URL_KEY = "hook";
process.env.HOTMART_HOTTOK = "hottok-test";
process.env.PAYHIP_PRODUCTS = JSON.stringify({
  bT6IA: { plan: "maker", days: 365, secret: "maker-secret" },
  MONTH: { plan: "maker", days: 31, subscription: true },
  W5V4U: { plan: "studio", days: 365, secret: "" },
});
process.env.HOTMART_PRODUCTS = JSON.stringify({ "777": { plan: "maker", days: 365 } });
process.env.PLAY_PRODUCTS = JSON.stringify({ maker_monthly: { plan: "maker" } });
process.env.RESEND_API_KEY = "";

const { store } = await import("../lib/store.mjs");
const { outbox } = await import("../lib/email.mjs");
export { store, outbox };

export const BASE = "https://sanaessencia.co.uk";
export function req(path, { method = "GET", body, headers = {} } = {}) {
  return new Request(BASE + path, {
    method, headers: { "content-type": "application/json", origin: BASE, ...headers },
    body: body === undefined ? undefined : typeof body === "string" ? body : JSON.stringify(body),
  });
}
export const call = async (fn, r, context = {}) => { const res = await fn(r, context); return { status: res.status, body: await res.json().catch(() => null), res }; };

export async function signIn(email) {
  const start = (await import("../netlify/functions/auth-start.mjs")).default;
  const verify = (await import("../netlify/functions/auth-verify.mjs")).default;
  await call(start, req("/api/auth/start", { method: "POST", body: { email } }));
  const token = outbox.at(-1).text.match(/#signin=([\w-]+)/)[1];
  const r = await call(verify, req("/api/auth/verify", { method: "POST", body: { token } }));
  return r.body.session;
}

// Swap global fetch for a fake during a test.
export function mockFetch(handler) {
  const real = globalThis.fetch;
  globalThis.fetch = async (url, init) => handler(String(url), init || {});
  return () => { globalThis.fetch = real; };
}
