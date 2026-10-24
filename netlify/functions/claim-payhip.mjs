// POST /api/claim/payhip {licenseKey} (signed in) -> links a Payhip licence key to this account.
import { handle, json, readJson, sessionEmail } from "../../lib/http.mjs";
import { claimLicence } from "../../lib/payhip.mjs";
import { activePlan, entitlementToken } from "../../lib/entitlements.mjs";

export default handle(async req => {
  if (req.method !== "POST") return json(req, 405, { error: "POST only" });
  const email = sessionEmail(req);
  if (!email) return json(req, 401, { error: "Please sign in" });
  const { licenseKey } = await readJson(req);
  const u = await claimLicence(email, licenseKey);
  return json(req, 200, { me: { email, ...activePlan(u) }, entitlement: entitlementToken(u) });
});

export const config = { path: "/api/claim/payhip" };
