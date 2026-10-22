// POST /api/play/verify {productId, purchaseToken} (signed in) -> Phase 3, Google Play subscriptions.
import { handle, json, readJson, sessionEmail } from "../../lib/http.mjs";
import { verifyPlaySubscription } from "../../lib/play.mjs";
import { activePlan, entitlementToken } from "../../lib/entitlements.mjs";

export default handle(async req => {
  if (req.method !== "POST") return json(req, 405, { error: "POST only" });
  const email = sessionEmail(req);
  if (!email) return json(req, 401, { error: "Please sign in" });
  const { productId, purchaseToken } = await readJson(req);
  const u = await verifyPlaySubscription(email, productId, purchaseToken);
  return json(req, 200, { me: { email, ...activePlan(u) }, entitlement: entitlementToken(u) });
});

export const config = { path: "/api/play/verify" };
