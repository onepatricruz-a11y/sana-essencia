// POST /api/auth/verify {token} -> {session, me}. The link works once.
import { handle, json, readJson } from "../../lib/http.mjs";
import { cfg } from "../../lib/config.mjs";
import { sha256hex, signJwt } from "../../lib/crypto.mjs";
import { store } from "../../lib/store.mjs";
import { getUser, saveUser, activePlan, entitlementToken } from "../../lib/entitlements.mjs";

export default handle(async req => {
  if (req.method !== "POST") return json(req, 405, { error: "POST only" });
  const { token } = await readJson(req);
  const key = `signin/${sha256hex(String(token || ""))}`;
  const rec = token ? await store.get(key) : null;
  if (!rec || rec.exp < Date.now()) return json(req, 401, { error: "This link has expired. Ask for a new one." });
  await store.del(key);
  const u = await getUser(rec.email);
  u.lastSignIn = Date.now();
  await saveUser(u);
  const session = signJwt({ typ: "session", sub: u.email }, cfg().sessionSecret, 60 * 24 * 3600);
  return json(req, 200, { session, me: { email: u.email, ...activePlan(u) }, entitlement: entitlementToken(u) });
});

export const config = { path: "/api/auth/verify" };
