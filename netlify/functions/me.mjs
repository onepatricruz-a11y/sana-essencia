// GET  /api/me          -> plan + a 24-hour entitlement token for offline use
// POST /api/me {action:"export"|"delete"} -> UK GDPR / LGPD: see or erase everything we hold
import { handle, json, readJson, sessionEmail } from "../../lib/http.mjs";
import { getUser, activePlan, entitlementToken, deleteUser } from "../../lib/entitlements.mjs";

export default handle(async req => {
  const email = sessionEmail(req);
  if (!email) return json(req, 401, { error: "Please sign in" });
  const u = await getUser(email);
  if (req.method === "GET") return json(req, 200, { me: { email, ...activePlan(u) }, entitlement: entitlementToken(u) });
  if (req.method !== "POST") return json(req, 405, { error: "GET or POST" });
  const { action } = await readJson(req);
  if (action === "export") return json(req, 200, { data: u });
  if (action === "delete") { await deleteUser(email); return json(req, 200, { deleted: true }); }
  return json(req, 400, { error: "unknown action" });
});

export const config = { path: "/api/me" };
