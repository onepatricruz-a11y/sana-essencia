// Checks a Blend Studio licence key with Payhip. The product secret keys live only in
// Netlify environment variables (PAYHIP_SECRET_MAKER, and optionally PAYHIP_SECRET_STUDIO).
const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { "content-type": "application/json", "cache-control": "no-store" }
});

export default async (req) => {
  if (req.method !== "POST") return json({ ok: false, error: "method" }, 405);
  let key = "";
  try { key = String((await req.json()).key || "").trim(); } catch (e) {}
  if (!/^[A-Za-z0-9-]{8,64}$/.test(key)) return json({ ok: false, error: "invalid" }, 400);
  const secrets = [process.env.PAYHIP_SECRET_MAKER, process.env.PAYHIP_SECRET_STUDIO].filter(Boolean);
  if (!secrets.length) return json({ ok: false, error: "not_ready" }, 503);
  for (const secret of secrets) {
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
        const yearEnd = bought + 366 * 864e5;            // plans are yearly
        if (yearEnd < Date.now()) return json({ ok: false, error: "expired" });
        return json({ ok: true, until: Math.min(yearEnd, Date.now() + 30 * 864e5) }); // re-checked monthly
      }
    } catch (e) { /* try the next product */ }
  }
  return json({ ok: false, error: "invalid" });
};

export const config = { path: "/api/verify-licence" };
