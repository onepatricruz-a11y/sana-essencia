// POST /api/auth/start {email, lang:"en"|"pt"}  -> emails a one-time sign-in link. No passwords.
import { handle, json, readJson } from "../../lib/http.mjs";
import { cfg } from "../../lib/config.mjs";
import { randomToken, sha256hex } from "../../lib/crypto.mjs";
import { store, isEmail, normEmail } from "../../lib/store.mjs";
import { sendSignInEmail } from "../../lib/email.mjs";

const TTL = 20 * 60 * 1000;
export const MAX_PER_EMAIL = 5;
// A workshop or a household can share one address. One address still cannot try a new email indefinitely.
export const MAX_PER_IP = 20;
const HOUR = 3600_000;

// Netlify sets context.ip and x-nf-client-connection-ip. Anything else can be forged by the caller.
function clientIp(req, context) {
  const fromContext = typeof context?.ip === "string" ? context.ip.trim() : "";
  if (fromContext) return fromContext;
  return (req.headers.get("x-nf-client-connection-ip") || "").trim();
}

async function allow(key, max) {
  const now = Date.now();
  const rl = (await store.get(key)) || { n: 0, since: now };
  if (now - rl.since > HOUR) { rl.n = 0; rl.since = now; }
  if (rl.n >= max) return false;
  rl.n += 1;
  await store.set(key, rl);
  return true;
}

export default handle(async (req, context) => {
  if (req.method !== "POST") return json(req, 405, { error: "POST only" });
  const { email, lang } = await readJson(req);
  if (!isEmail(email)) return json(req, 400, { error: "Please check the email address" });
  const e = normEmail(email);

  const ip = clientIp(req, context) || "unknown";
  const tooMany = "Too many links asked for. Try again in an hour.";
  if (!(await allow(`rl/signin-ip/${sha256hex(ip)}`, MAX_PER_IP))) return json(req, 429, { error: tooMany });
  if (!(await allow(`rl/signin/${sha256hex(e)}`, MAX_PER_EMAIL))) return json(req, 429, { error: tooMany });

  const token = randomToken();
  await store.set(`signin/${sha256hex(token)}`, { email: e, exp: Date.now() + TTL });
  const c = cfg(), pt = lang === "pt";
  // The token sits after "#", so it never reaches server logs or other sites.
  const link = pt ? `${c.brSiteUrl}/estudio/#entrar=${token}` : `${c.siteUrl}/blend-studio/#signin=${token}`;
  await sendSignInEmail(e, link, pt ? "pt" : "en");
  return json(req, 200, { ok: true });
});

export const config = { path: "/api/auth/start" };
