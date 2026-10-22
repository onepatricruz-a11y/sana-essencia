import { cfg, DAY } from "./config.mjs";
import { safeEqual } from "./crypto.mjs";
import { upsertGrant, revokeGrant } from "./entitlements.mjs";
import { store } from "./store.mjs";

// Hotmart webhook 2.0.0. Auth = the account's hottok in the X-HOTMART-HOTTOK header.
// https://developers.hotmart.com/docs/en/2.0.0/webhook/purchase-webhook/
export function hotmartAuthOk(req) {
  const c = cfg();
  const keyOk = !c.webhookUrlKey || safeEqual(new URL(req.url).searchParams.get("k"), c.webhookUrlKey);
  return keyOk && !!c.hotmartHottok && safeEqual(req.headers.get("x-hotmart-hottok"), c.hotmartHottok);
}

const GRANT = new Set(["PURCHASE_APPROVED", "PURCHASE_COMPLETE"]);
const REVOKE = new Set(["PURCHASE_REFUNDED", "PURCHASE_CHARGEBACK", "PURCHASE_CANCELED", "PURCHASE_PROTEST"]);

export async function handleHotmartEvent(ev) {
  if (!ev?.id || !ev.event) throw Object.assign(new Error("not a Hotmart event"), { status: 400 });
  const seen = `seen/hotmart/${ev.id}/${ev.event}`;
  if (await store.get(seen)) return { duplicate: true };
  const d = ev.data || {};
  const productId = String(d.product?.id ?? "");
  const p = cfg().hotmartProducts[productId];
  const email = d.buyer?.email || d.subscriber?.email;
  let action = "ignored";
  if (p && email) {
    const id = `hotmart:${productId}`;
    const sub = d.subscription;
    const isSub = !!(sub && (sub.subscriber?.code || sub.subscriber_code || sub.plan));
    if (GRANT.has(ev.event)) {
      const approved = Number(d.purchase?.approved_date) || ev.creation_date || Date.now();
      const days = isSub ? Number(sub.plan?.recurrency_period) || p.days || 31 : p.days || 365;
      await upsertGrant(email, id, { plan: p.plan, status: "active", until: approved + days * DAY, ref: d.purchase?.transaction, subscription: isSub });
      action = "granted";
    } else if (REVOKE.has(ev.event)) {
      await revokeGrant(email, id, ev.event.toLowerCase());
      action = "revoked";
    } else if (ev.event === "SUBSCRIPTION_CANCELLATION") {
      await upsertGrant(email, id, { status: "cancelled" }); // keeps access to the end of the paid month
      action = "cancelled";
    }
  }
  await store.set(seen, { at: Date.now(), action });
  return { action };
}
