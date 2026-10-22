import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { createHash, generateKeyPairSync } from "node:crypto";
import { store, outbox, req, call, signIn, mockFetch } from "./helpers.mjs";

const fn = async name => (await import(`../netlify/functions/${name}.mjs`)).default;
const auth = s => ({ authorization: `Bearer ${s}` });
const sig = createHash("sha256").update("payhip-api-key").digest("hex");
const DAY = 86400000;

beforeEach(() => { store._reset(); outbox.length = 0; });

test("sign-in link works once and gives a free plan", async () => {
  const start = await fn("auth-start"), verify = await fn("auth-verify"), me = await fn("me");
  let r = await call(start, req("/api/auth/start", { method: "POST", body: { email: "Maker@Example.com" } }));
  assert.equal(r.status, 200);
  assert.equal(outbox.length, 1);
  assert.equal(outbox[0].to, "maker@example.com");
  const token = outbox[0].text.match(/#signin=([\w-]+)/)[1];
  r = await call(verify, req("/api/auth/verify", { method: "POST", body: { token } }));
  assert.equal(r.status, 200);
  assert.equal(r.body.me.plan, "free");
  const again = await call(verify, req("/api/auth/verify", { method: "POST", body: { token } }));
  assert.equal(again.status, 401, "link is single use");
  r = await call(me, req("/api/me", { headers: auth(r.body.session) }));
  assert.equal(r.body.me.email, "maker@example.com");
});

test("Portuguese sign-in links go to the Brazilian Estúdio", async () => {
  const start = await fn("auth-start");
  await call(start, req("/api/auth/start", { method: "POST", body: { email: "a@b.com.br", lang: "pt" } }));
  assert.match(outbox[0].text, /sanaessencia\.com\.br\/estudio\/#entrar=/);
  assert.match(outbox[0].subject, /Estúdio/);
});

test("bad emails, rate limit and CORS", async () => {
  const start = await fn("auth-start");
  assert.equal((await call(start, req("/api/auth/start", { method: "POST", body: { email: "nope" } }))).status, 400);
  for (let i = 0; i < 5; i++) await call(start, req("/api/auth/start", { method: "POST", body: { email: "x@y.co" } }));
  const r = await call(start, req("/api/auth/start", { method: "POST", body: { email: "x@y.co" } }));
  assert.equal(r.status, 429);
  assert.equal(r.res.headers.get("access-control-allow-origin"), "https://sanaessencia.co.uk");
  const evil = await start(new Request("https://sanaessencia.co.uk/api/auth/start", { method: "OPTIONS", headers: { origin: "https://evil.example" } }));
  assert.equal(evil.headers.get("access-control-allow-origin"), null);
});

test("me rejects missing or forged sessions", async () => {
  const me = await fn("me");
  assert.equal((await call(me, req("/api/me"))).status, 401);
  assert.equal((await call(me, req("/api/me", { headers: auth("a.b.c") }))).status, 401);
});

test("Payhip yearly purchase unlocks Maker; full refund removes it", async () => {
  const hook = await fn("payhip-webhook"), me = await fn("me");
  const session = await signIn("buyer@example.com");
  const paid = { id: "TX1", type: "paid", email: "buyer@example.com", price: 5900, date: Math.floor(Date.now() / 1000), items: [{ product_key: "bT6IA" }], signature: sig };
  assert.equal((await call(hook, req("/api/webhooks/payhip?k=wrong", { method: "POST", body: paid }))).status, 401, "needs URL key");
  assert.equal((await call(hook, req("/api/webhooks/payhip?k=hook", { method: "POST", body: { ...paid, signature: "x" } }))).status, 401, "needs signature");
  assert.equal((await call(hook, req("/api/webhooks/payhip?k=hook", { method: "POST", body: paid }))).status, 200);
  let r = await call(me, req("/api/me", { headers: auth(session) }));
  assert.equal(r.body.me.plan, "maker");
  assert.ok(r.body.me.until > Date.now() + 360 * DAY);
  const dup = await call(hook, req("/api/webhooks/payhip?k=hook", { method: "POST", body: paid }));
  assert.equal(dup.body.duplicate, true);
  await call(hook, req("/api/webhooks/payhip?k=hook", { method: "POST", body: { ...paid, type: "refunded", amount_refunded: 5900 } }));
  r = await call(me, req("/api/me", { headers: auth(session) }));
  assert.equal(r.body.me.plan, "free");
});

test("Payhip monthly membership: cancelling keeps access to the end of the month", async () => {
  const hook = await fn("payhip-webhook"), me = await fn("me");
  const session = await signIn("monthly@example.com");
  const base = { subscription_id: "S1", customer_email: "monthly@example.com", product_link: "MONTH", signature: sig };
  await call(hook, req("/api/webhooks/payhip?k=hook", { method: "POST", body: { ...base, type: "subscription.created", status: "active" } }));
  assert.equal((await call(me, req("/api/me", { headers: auth(session) }))).body.me.plan, "maker");
  await call(hook, req("/api/webhooks/payhip?k=hook", { method: "POST", body: { ...base, type: "subscription.deleted", status: "canceled" } }));
  assert.equal((await call(me, req("/api/me", { headers: auth(session) }))).body.me.plan, "maker", "still paid up");
});

test("Payhip licence key claim, and one key cannot be shared", async () => {
  const claim = await fn("claim-payhip");
  const restore = mockFetch(async (url, init) => {
    assert.match(url, /payhip\.com\/api\/v2\/license\/verify\?license_key=ABCDE-FGHIJ-KLMNP-QRSTU/);
    assert.equal(init.headers["product-secret-key"], "maker-secret");
    return new Response(JSON.stringify({ data: { enabled: true, license_key: "ABCDE-FGHIJ-KLMNP-QRSTU", date: new Date().toISOString() } }));
  });
  try {
    const s1 = await signIn("one@example.com"), s2 = await signIn("two@example.com");
    assert.equal((await call(claim, req("/api/claim/payhip", { method: "POST", body: { licenseKey: "bad" }, headers: auth(s1) }))).status, 400);
    const r = await call(claim, req("/api/claim/payhip", { method: "POST", body: { licenseKey: "abcde-fghij-klmnp-qrstu" }, headers: auth(s1) }));
    assert.equal(r.status, 200);
    assert.equal(r.body.me.plan, "maker");
    const r2 = await call(claim, req("/api/claim/payhip", { method: "POST", body: { licenseKey: "ABCDE-FGHIJ-KLMNP-QRSTU" }, headers: auth(s2) }));
    assert.equal(r2.status, 409);
  } finally { restore(); }
});

test("Payhip disabled (refunded) licence is refused", async () => {
  const claim = await fn("claim-payhip");
  const restore = mockFetch(async () => new Response(JSON.stringify({ data: { enabled: false, license_key: "ABCDE-FGHIJ-KLMNP-QRSTU" } })));
  try {
    const s = await signIn("r@example.com");
    assert.equal((await call(claim, req("/api/claim/payhip", { method: "POST", body: { licenseKey: "ABCDE-FGHIJ-KLMNP-QRSTU" }, headers: auth(s) }))).status, 403);
  } finally { restore(); }
});

test("Hotmart: approved unlocks, chargeback removes, hottok required", async () => {
  const hook = await fn("hotmart-webhook"), me = await fn("me");
  const s = await signIn("cliente@exemplo.com.br");
  const ev = { id: "HP-1", event: "PURCHASE_APPROVED", version: "2.0.0", creation_date: Date.now(), data: { product: { id: 777 }, buyer: { email: "cliente@exemplo.com.br" }, purchase: { transaction: "HP-1", approved_date: Date.now() } } };
  assert.equal((await call(hook, req("/api/webhooks/hotmart?k=hook", { method: "POST", body: ev }))).status, 401);
  const H = { "x-hotmart-hottok": "hottok-test" };
  assert.equal((await call(hook, req("/api/webhooks/hotmart?k=hook", { method: "POST", body: ev, headers: H }))).body.action, "granted");
  assert.equal((await call(me, req("/api/me", { headers: auth(s) }))).body.me.plan, "maker");
  await call(hook, req("/api/webhooks/hotmart?k=hook", { method: "POST", body: { ...ev, id: "HP-2", event: "PURCHASE_CHARGEBACK" }, headers: H }));
  assert.equal((await call(me, req("/api/me", { headers: auth(s) }))).body.me.plan, "free");
});

test("Hotmart monthly subscription uses the plan's period", async () => {
  const hook = await fn("hotmart-webhook"), me = await fn("me");
  const s = await signIn("mensal@exemplo.com.br");
  const H = { "x-hotmart-hottok": "hottok-test" };
  const ev = { id: "HP-9", event: "PURCHASE_APPROVED", data: { product: { id: 777 }, buyer: { email: "mensal@exemplo.com.br" }, purchase: { approved_date: Date.now() }, subscription: { subscriber: { code: "S" }, plan: { recurrency_period: 30 } } } };
  await call(hook, req("/api/webhooks/hotmart?k=hook", { method: "POST", body: ev, headers: H }));
  const until = (await call(me, req("/api/me", { headers: auth(s) }))).body.me.until;
  assert.ok(until > Date.now() + 29 * DAY && until < Date.now() + 31 * DAY);
});

test("Seasonal packs: free sees a preview, Maker sees all, future packs stay hidden", async () => {
  const packs = await fn("packs"), admin = await fn("admin-grant");
  const { PACKS } = await import("../packs/index.mjs");
  const winter = PACKS.find(p => p.id === "winter-2026");
  const realNow = Date.now;
  Date.now = () => Date.parse("2026-11-20T12:00:00Z");
  try {
    let r = await call(packs, req("/api/packs"));
    assert.deepEqual(r.body.packs.map(p => p.id), ["winter-2026"]);
    assert.equal(r.body.comingNext.title, "Christmas Gifting");
    r = await call(packs, req("/api/packs/winter-2026"), { params: { id: "winter-2026" } });
    assert.equal(r.body.unlocked, false);
    assert.equal(r.body.blends.length, 1);
    assert.equal(r.body.locked, winter.blends.length - 1);
    assert.equal((await call(packs, req("/api/packs/valentine-2027"), { params: { id: "valentine-2027" } })).status, 404, "not released yet");
    const s = await signIn("paid@example.com");
    assert.equal((await call(admin, req("/api/admin/grant", { method: "POST", body: { email: "paid@example.com", plan: "maker", days: 30 } }))).status, 401);
    await call(admin, req("/api/admin/grant", { method: "POST", body: { email: "paid@example.com", plan: "maker", days: 30 }, headers: { "x-admin-key": "admin-test" } }));
    r = await call(packs, req("/api/packs/winter-2026", { headers: auth(s) }), { params: { id: "winter-2026" } });
    assert.equal(r.body.unlocked, true);
    assert.equal(r.body.blends.length, winter.blends.length);
    r = await call(packs, req("/api/packs?lang=pt"));
    assert.ok(!r.body.packs.some(p => p.id === "winter-2026"), "UK winter pack is not shown in Brazil");
  } finally { Date.now = realNow; }
});

test("GDPR/LGPD: a maker can export and delete their data", async () => {
  const me = await fn("me");
  const s = await signIn("gdpr@example.com");
  const ex = await call(me, req("/api/me", { method: "POST", body: { action: "export" }, headers: auth(s) }));
  assert.equal(ex.body.data.email, "gdpr@example.com");
  await call(me, req("/api/me", { method: "POST", body: { action: "delete" }, headers: auth(s) }));
  assert.equal((await store.list("user/")).length, 0);
});

test("Google Play: verifies with Google, acknowledges, binds token to one account", async () => {
  const { privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
  process.env.GOOGLE_SERVICE_ACCOUNT_JSON = JSON.stringify({ client_email: "sa@x.iam.gserviceaccount.com", private_key: privateKey.export({ type: "pkcs8", format: "pem" }) });
  const play = await fn("play-verify");
  const calls = [];
  const restore = mockFetch(async (url, init) => {
    calls.push(url);
    if (url.includes("oauth2")) return new Response(JSON.stringify({ access_token: "AT", expires_in: 3600 }));
    if (url.includes(":acknowledge")) return new Response("{}");
    return new Response(JSON.stringify({ subscriptionState: "SUBSCRIPTION_STATE_ACTIVE", acknowledgementState: "ACKNOWLEDGEMENT_STATE_PENDING", latestOrderId: "GPA.1", lineItems: [{ productId: "maker_monthly", expiryTime: new Date(Date.now() + 30 * DAY).toISOString() }] }));
  });
  try {
    const s = await signIn("android@example.com");
    const r = await call(play, req("/api/play/verify", { method: "POST", body: { productId: "maker_monthly", purchaseToken: "tok123" }, headers: auth(s) }));
    assert.equal(r.status, 200);
    assert.equal(r.body.me.plan, "maker");
    assert.ok(calls.some(u => u.includes("subscriptionsv2/tokens/tok123")));
    assert.ok(calls.some(u => u.includes(":acknowledge")));
    const s2 = await signIn("other@example.com");
    assert.equal((await call(play, req("/api/play/verify", { method: "POST", body: { productId: "maker_monthly", purchaseToken: "tok123" }, headers: auth(s2) }))).status, 409);
  } finally { restore(); delete process.env.GOOGLE_SERVICE_ACCOUNT_JSON; }
});
