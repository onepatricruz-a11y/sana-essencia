// POST /api/admin/grant  header x-admin-key  {email, plan:"maker"|"studio", days, note}
// For gift plans, founding testers, workshop studios, partners, or fixing a support case by hand.
import { handle, json, readJson } from "../../lib/http.mjs";
import { cfg, DAY, PLAN_RANK } from "../../lib/config.mjs";
import { safeEqual } from "../../lib/crypto.mjs";
import { isEmail } from "../../lib/store.mjs";
import { upsertGrant, revokeGrant, activePlan } from "../../lib/entitlements.mjs";

export default handle(async req => {
  if (req.method !== "POST") return json(null, 405, { error: "POST only" });
  if (!cfg().adminKey || !safeEqual(req.headers.get("x-admin-key"), cfg().adminKey)) return json(null, 401, { error: "no" });
  const { email, plan, days = 365, note = "", revoke = false } = await readJson(req);
  if (!isEmail(email) || !(plan in PLAN_RANK) || plan === "free") return json(null, 400, { error: "email and plan needed" });
  const id = `manual:${plan}`;
  const u = revoke ? await revokeGrant(email, id, "admin")
    : await upsertGrant(email, id, { plan, status: "active", until: Date.now() + Number(days) * DAY, note });
  return json(null, 200, { email: u.email, ...activePlan(u) });
});

export const config = { path: "/api/admin/grant" };
