import { createSign } from "node:crypto";
import { cfg, DAY } from "./config.mjs";
import { b64url } from "./crypto.mjs";
import { upsertGrant } from "./entitlements.mjs";
import { store, normEmail } from "./store.mjs";

// Phase 3. The Studio, inside the Google Play app, buys with the Digital Goods API + Payment Request API,
// then sends us the purchaseToken. We check it with Google and acknowledge it (Google refunds
// unacknowledged purchases after 3 days).
// https://developer.chrome.com/docs/android/trusted-web-activity/receive-payments-play-billing
// https://developers.google.com/android-publisher/api-ref/rest/v3/purchases.subscriptionsv2/get
// STATUS: written against Google's documentation, not yet run against a real Play account.

let cached = null;
export async function googleAccessToken() {
  if (cached && cached.exp > Date.now() + 60_000) return cached.token;
  const sa = cfg().googleServiceAccount;
  if (!sa?.client_email || !sa?.private_key) throw Object.assign(new Error("Google Play is not set up yet"), { status: 503 });
  const now = Math.floor(Date.now() / 1000);
  const head = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(JSON.stringify({
    iss: sa.client_email, scope: "https://www.googleapis.com/auth/androidpublisher",
    aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600,
  }));
  const sig = createSign("RSA-SHA256").update(`${head}.${claim}`).sign(sa.private_key, "base64url");
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${head}.${claim}.${sig}` }),
  });
  if (!r.ok) throw Object.assign(new Error("Google sign-in failed"), { status: 502 });
  const j = await r.json();
  cached = { token: j.access_token, exp: Date.now() + (j.expires_in || 3600) * 1000 };
  return cached.token;
}

const API = "https://androidpublisher.googleapis.com/androidpublisher/v3/applications";
const OK_STATES = new Set(["SUBSCRIPTION_STATE_ACTIVE", "SUBSCRIPTION_STATE_IN_GRACE_PERIOD", "SUBSCRIPTION_STATE_CANCELED"]);

export async function verifyPlaySubscription(email, productId, purchaseToken) {
  const c = cfg();
  const p = c.playProducts[productId];
  if (!p) throw Object.assign(new Error("unknown product"), { status: 400 });
  if (!purchaseToken || purchaseToken.length > 4096) throw Object.assign(new Error("missing purchase token"), { status: 400 });
  const tokenKey = `play/${purchaseToken.slice(0, 200)}`;
  const bound = await store.get(tokenKey);
  if (bound && bound.email !== normEmail(email)) throw Object.assign(new Error("This purchase belongs to another account"), { status: 409 });

  const access = await googleAccessToken();
  const r = await fetch(`${API}/${c.playPackage}/purchases/subscriptionsv2/tokens/${encodeURIComponent(purchaseToken)}`, {
    headers: { authorization: `Bearer ${access}` },
  });
  if (!r.ok) throw Object.assign(new Error("Google couldn't confirm this purchase"), { status: 402 });
  const sub = await r.json();
  const line = (sub.lineItems || []).find(l => l.productId === productId) || sub.lineItems?.[0];
  const until = line?.expiryTime ? Date.parse(line.expiryTime) : 0;
  // CANCELED in Google's sense = will not renew, but still paid up to expiryTime.
  if (!OK_STATES.has(sub.subscriptionState) || until < Date.now()) {
    throw Object.assign(new Error("This subscription is not active"), { status: 402 });
  }
  if (sub.acknowledgementState === "ACKNOWLEDGEMENT_STATE_PENDING") {
    await fetch(`${API}/${c.playPackage}/purchases/subscriptions/${encodeURIComponent(productId)}/tokens/${encodeURIComponent(purchaseToken)}:acknowledge`, {
      method: "POST", headers: { authorization: `Bearer ${access}`, "content-type": "application/json" }, body: "{}",
    });
  }
  await store.set(tokenKey, { email: normEmail(email), productId, at: Date.now() });
  return upsertGrant(email, `play:${productId}`, {
    plan: p.plan, status: sub.subscriptionState === "SUBSCRIPTION_STATE_CANCELED" ? "cancelled" : "active",
    until, subscription: true, ref: sub.latestOrderId || null,
  });
}
