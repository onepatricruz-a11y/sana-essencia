import { cfg, DAY } from "./config.mjs";
import { sha256hex, safeEqual } from "./crypto.mjs";
import { upsertGrant, revokeGrant } from "./entitlements.mjs";
import { store, normEmail } from "./store.mjs";

// Payhip signs webhooks with sha256(API key). That value never changes, so we ALSO require a
// secret ?k= in the webhook URL. https://help.payhip.com/article/115-webhooks
export function payhipSignatureOk(body, url) {
  const c = cfg();
  if (!c.payhipApiKey) return false;
  const keyOk = !c.webhookUrlKey || safeEqual(new URL(url).searchParams.get("k"), c.webhookUrlKey);
  return keyOk && safeEqual(body?.signature, sha256hex(c.payhipApiKey));
}

const grantId = key => `payhip:${key}`;

export async function handlePayhipEvent(ev) {
  const products = cfg().payhipProducts;
  const seen = `seen/payhip/${ev.type}/${ev.id || ev.subscription_id}`;
  if (await store.get(seen)) return { duplicate: true };
  const now = Date.now();
  let touched = 0;

  if (ev.type === "paid" || ev.type === "refunded") {
    for (const it of ev.items || []) {
      const p = products[it.product_key];
      if (!p) continue;
      touched++;
      if (ev.type === "paid") {
        const start = (ev.date ? ev.date * 1000 : now);
        await upsertGrant(ev.email, grantId(it.product_key), {
          plan: p.plan, status: "active", until: start + (p.days || 365) * DAY,
          ref: ev.id, licence: it.license_key || null, gift: !!ev.is_gift,
        });
      } else if (Number(ev.amount_refunded) >= Number(ev.price)) {
        await revokeGrant(ev.email, grantId(it.product_key), "refunded");
      }
    }
  } else if (ev.type === "subscription.created" || ev.type === "subscription.deleted") {
    const p = products[ev.product_link];
    if (p) {
      touched++;
      if (ev.type === "subscription.created") {
        await upsertGrant(ev.customer_email, grantId(ev.product_link), {
          plan: p.plan, status: "active", until: now + (p.days || 31) * DAY, ref: ev.subscription_id, subscription: true,
        });
      } else {
        // Cancelled: keep access until the end of what they already paid for (until stays as is).
        await upsertGrant(ev.customer_email, grantId(ev.product_link), { status: "cancelled" });
      }
    }
  }
  await store.set(seen, { at: now });
  return { touched };
}

// A maker types the licence key from their Payhip receipt. We ask Payhip if it's valid.
// https://payhip.com/api-reference  GET /api/v2/license/verify
export async function claimLicence(email, licenseKey) {
  const key = String(licenseKey || "").trim().toUpperCase();
  if (!/^[A-Z0-9]{5}(-[A-Z0-9]{5}){3}$/.test(key)) throw Object.assign(new Error("That doesn't look like a licence key"), { status: 400 });
  const bound = await store.get(`licence/${key}`);
  if (bound && bound.email !== normEmail(email)) throw Object.assign(new Error("This key is already linked to another email"), { status: 409 });

  for (const [code, p] of Object.entries(cfg().payhipProducts)) {
    if (!p.secret) continue;
    const r = await fetch(`https://payhip.com/api/v2/license/verify?license_key=${encodeURIComponent(key)}`, {
      headers: { "product-secret-key": p.secret },
    });
    const text = r.ok ? await r.text() : "";
    if (!text) continue; // Payhip answers empty when the key isn't for this product
    let data; try { data = JSON.parse(text).data; } catch { continue; }
    if (!data || data.license_key?.toUpperCase() !== key) continue;
    if (!data.enabled) throw Object.assign(new Error("This licence has been switched off (for example after a refund)"), { status: 403 });
    const start = data.date ? Date.parse(data.date) : Date.now();
    await store.set(`licence/${key}`, { email: normEmail(email), product: code, at: Date.now() });
    return upsertGrant(email, grantId(code), { plan: p.plan, status: "active", until: start + (p.days || 365) * DAY, licence: key });
  }
  throw Object.assign(new Error("We couldn't find that licence key"), { status: 404 });
}
