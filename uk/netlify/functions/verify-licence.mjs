// Checks a Blend Studio licence key with Payhip. The product secret keys live only in
// Netlify environment variables:
//   PAYHIP_SECRET_MAKER  - Maker plan, 12 months from purchase
//   PAYHIP_SECRET_STUDIO - Studio plan, 12 months from purchase (optional)
//   PAYHIP_SECRET_TRIAL  - free founding month, 31 days from claiming it (optional)
//   PAYHIP_TRIAL_UNTIL   - optional last day (YYYY-MM-DD) a free month can be claimed
const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { "content-type": "application/json", "cache-control": "no-store" }
});

export default async (req) => {
  if (req.method !== "POST") return json({ ok: false, error: "method" }, 405);
  let key = "";
  try { key = String((await req.json()).key || "").trim(); } catch (e) {}
  if (!/^[A-Za-z0-9-]{8,64}$/.test(key)) return json({ ok: false, error: "invalid" }, 400);
  const plans = [
    { secret: process.env.PAYHIP_SECRET_MAKER, days: 366 },
    { secret: process.env.PAYHIP_SECRET_STUDIO, days: 366 },
    { secret: process.env.PAYHIP_SECRET_TRIAL, days: 31, trial: true },
  ].filter(p => p.secret);
  if (!plans.length) return json({ ok: false, error: "not_ready" }, 503);
  const trialUntil = Date.parse((process.env.PAYHIP_TRIAL_UNTIL || "") + "T23:59:59Z");
  for (const { secret, days, trial } of plans) {
    try {
      const r = await fetch("https://payhip.com/api/v2/license/verify?license_key=" + encodeURIComponent(key), {
        headers: { "product-secret-key": secret }
      });
      if (!r.ok) continue;
      const text = await r.text();
      if (!text) continue;
      const d = (JSON.parse(text) || {}).data;
      if (d && d.enabled) {
        const bought = Date.parse(d.date) || Date.now();
        if (trial && trialUntil && bought > trialUntil) return json({ ok: false, error: "expired" });
        const end = bought + days * 864e5;               // 12 months, or 31 days for the free month
        if (end < Date.now()) return json({ ok: false, error: "expired" });
        return json({ ok: true, until: Math.min(end, Date.now() + 30 * 864e5) }); // re-checked at least monthly
      }
    } catch (e) { /* try the next product */ }
  }
  return json({ ok: false, error: "invalid" });
};

export const config = { path: "/api/verify-licence" };
