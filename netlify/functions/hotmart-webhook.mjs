// POST /api/webhooks/hotmart?k=SECRET  <- Hotmart webhook (postback) version 2.0.0
import { handle, json, readJson } from "../../lib/http.mjs";
import { hotmartAuthOk, handleHotmartEvent } from "../../lib/hotmart.mjs";

export default handle(async req => {
  if (req.method !== "POST") return json(null, 405, { error: "POST only" });
  if (!hotmartAuthOk(req)) return json(null, 401, { error: "bad hottok" });
  return json(null, 200, await handleHotmartEvent(await readJson(req, 256 * 1024)));
});

export const config = { path: "/api/webhooks/hotmart" };
