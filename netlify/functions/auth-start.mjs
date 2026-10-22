// POST /api/auth/start {email, lang:"en"|"pt"}  -> emails a one-time sign-in link. No passwords.
import { handle, json, readJson } from "../../lib/http.mjs";
import { cfg } from "../../lib/config.mjs";
import { randomToken, sha256hex } from "../../lib/crypto.mjs";
import { store, isEmail, normEmail } from "../../lib/store.mjs";
import { sendSignInEmail } from "../../lib/email.mjs";

const TTL = 20 * 60 * 1000, MAX_PER_HOUR = 5;

export default handle(async req => {
  if (req.method !== "POST") return json(req, 405, { error: "POST only" });
  const { email, lang } = await readJson(req);
  if (!isEmail(email)) return json(req, 400, { error: "Please check the email address" });
  const e = normEmail(email);

  const rlKey = `rl/signin/${sha256hex(e)}`;
  const rl = (await store.get(rlKey)) || { n: 0, since: Date.now() };
  if (Date.now() - rl.since > 3600_000) { rl.n = 0; rl.since = Date.now(); }
  if (++rl.n > MAX_PER_HOUR) return json(req, 429, { error: "Too many links asked for. Try again in an hour." });
  await store.set(rlKey, rl);

  const token = randomToken();
  await store.set(`signin/${sha256hex(token)}`, { email: e, exp: Date.now() + TTL });
  const c = cfg(), pt = lang === "pt";
  // The token sits after "#", so it never reaches server logs or other sites.
  const link = pt ? `${c.brSiteUrl}/estudio/#entrar=${token}` : `${c.siteUrl}/blend-studio/#signin=${token}`;
  await sendSignInEmail(e, link, pt ? "pt" : "en");
  return json(req, 200, { ok: true });
});

export const config = { path: "/api/auth/start" };
