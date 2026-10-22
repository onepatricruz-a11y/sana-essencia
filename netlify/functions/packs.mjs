// GET /api/packs?lang=en&market=uk          -> released packs + what's coming next
// GET /api/packs/winter-2026?lang=en        -> blends (all for Maker plan, a preview for free users)
import { handle, json, sessionEmail } from "../../lib/http.mjs";
import { getUser, activePlan } from "../../lib/entitlements.mjs";
import { listPacks, getPack } from "../../lib/packs.mjs";

export default handle(async (req, context) => {
  if (req.method !== "GET") return json(req, 405, { error: "GET only" });
  const q = new URL(req.url).searchParams;
  const lang = q.get("lang") === "pt" ? "pt" : "en";
  const market = q.get("market") === "br" || lang === "pt" ? "br" : "uk";
  const email = sessionEmail(req);
  const plan = email ? activePlan(await getUser(email)).plan : "free";
  const id = context?.params?.id || q.get("id");
  if (!id) return json(req, 200, listPacks({ plan, lang, market }));
  const pack = getPack(id, { plan, lang, market });
  return pack ? json(req, 200, pack) : json(req, 404, { error: "No pack with that name yet" });
});

export const config = { path: ["/api/packs", "/api/packs/:id"] };
