// POST /api/webhooks/payhip?k=SECRET  <- Payhip: paid, refunded, subscription.created, subscription.deleted
import { handle, json, readJson } from "../../lib/http.mjs";
import { payhipSignatureOk, handlePayhipEvent } from "../../lib/payhip.mjs";

export default handle(async req => {
  if (req.method !== "POST") return json(null, 405, { error: "POST only" });
  const ev = await readJson(req, 256 * 1024);
  if (!payhipSignatureOk(ev, req.url)) return json(null, 401, { error: "bad signature" });
  return json(null, 200, await handlePayhipEvent(ev));
});

export const config = { path: "/api/webhooks/payhip" };
