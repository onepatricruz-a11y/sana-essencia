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

test("sign-in emails set reply_to for English and Portuguese", async () => {
  const start = await fn("auth-start");
  await call(start, req("/api/auth/start", { method: "POST", body: { email: "en@ex.co" } }));
  await call(start, req("/api/auth/start", { method: "POST", body: { email: "pt@ex.co", lang: "pt" } }));
  assert.equal(outbox[0].reply_to, "hello@sanaessencia.co.uk");
  assert.equal(outbox[1].reply_to, "hello@sanaessencia.co.uk");
  assert.match(outbox[0].subject, /Blend Studio/);
  assert.match(outbox[1].subject, /Estúdio/);
  process.env.EMAIL_REPLY_TO = "replies@example.com";
  process.env.RESEND_API_KEY = "re_test";
  const sent = [];
  const restore = mockFetch(async (url, init) => {
    assert.equal(url, "https://api.resend.com/emails");
    sent.push(JSON.parse(init.body));
    return new Response(JSON.stringify({ id: "em_1" }), { status: 200 });
  });
  try {
    const r = await call(start, req("/api/auth/start", { method: "POST", body: { email: "via@ex.co", lang: "pt" } }));
    assert.equal(r.status, 200);
    assert.equal(sent.length, 1);
    assert.equal(sent[0].reply_to, "replies@example.com");
    assert.equal(sent[0].to, "via@ex.co");
    assert.match(sent[0].subject, /Estúdio/);
  } finally {
    restore();
    delete process.env.EMAIL_REPLY_TO;
    process.env.RESEND_API_KEY = "";
  }
});

test("Portuguese sign-in links go to the Brazilian Estúdio", async () => {
  const start = await fn("auth-start");
  await call(start, req("/api/auth/start", { method: "POST", body: { email: "a@b.com.br", lang: "pt" } }));
  assert.match(outbox[0].text, /sanaessencia\.com\.br\/estudio\/#entrar=/);
  assert.match(outbox[0].subject, /Estúdio/);
});

test("sign-in is limited per IP as well as per email", async () => {
  const { default: start, MAX_PER_IP, MAX_PER_EMAIL } = await import("../netlify/functions/auth-start.mjs");
  const ip = addr => ({ "x-nf-client-connection-ip": addr });
  for (let i = 0; i < MAX_PER_IP; i++) {
    const r = await call(start, req("/api/auth/start", { method: "POST", body: { email: `ip${i}@ex.co` }, headers: ip("203.0.113.10") }));
    assert.equal(r.status, 200);
  }
  assert.equal((await call(start, req("/api/auth/start", { method: "POST", body: { email: "over@ex.co" }, headers: ip("203.0.113.10") }))).status, 429, "one address cannot keep trying new emails");
  assert.equal((await call(start, req("/api/auth/start", { method: "POST", body: { email: "over@ex.co" }, headers: ip("203.0.113.99") }))).status, 200, "a different address is not blocked");
  for (let i = 0; i < MAX_PER_EMAIL; i++) {
    assert.equal((await call(start, req("/api/auth/start", { method: "POST", body: { email: "same@ex.co" }, headers: ip(`198.51.100.${i}`) }))).status, 200);
  }
  assert.equal((await call(start, req("/api/auth/start", { method: "POST", body: { email: "same@ex.co" }, headers: ip("198.51.100.50") }))).status, 429, "five per email still applies across addresses");
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

test("Seasonal packs stay unreleased while they are placeholders", async () => {
  const packsFn = await fn("packs"), admin = await fn("admin-grant");
  const { PACKS } = await import("../packs/index.mjs");
  const held = ["winter-2026", "christmas-2026", "valentine-2027", "namorados-2027"];
  assert.deepEqual(PACKS.map(p => p.id), held);
  for (const p of PACKS) {
    assert.equal(p.placeholder, true);
    assert.equal(p.releaseAt, "2099-01-01T00:00:00Z");
    assert.ok(p.blends.length);
    for (const b of p.blends) {
      assert.equal(b.placeholder, true);
      for (const name of Object.values(b.name)) assert.match(name, /^Placeholder:/);
    }
  }
  const realNow = Date.now;
  const forbidden = ["Winter Hearth", "Lareira", "Christmas", "Natal", "Valentine", "Namorados", "Fireside", "Clementine", "Rosa e Cumaru", "wh-1", "xm-1", "vl-1", "nm-1", "2099"];
  Date.now = () => Date.parse("2026-12-15T12:00:00Z");
  try {
    let r = await call(packsFn, req("/api/packs"));
    assert.deepEqual(r.body.packs, []);
    assert.equal(r.body.comingNext.title, "A new seasonal pack coming soon");
    assert.equal("releaseAt" in r.body.comingNext, false);
    const blob = JSON.stringify(r.body);
    for (const secret of forbidden) assert.equal(blob.includes(secret), false, secret);
    for (const id of held) assert.equal((await call(packsFn, req(`/api/packs/${id}`), { params: { id } })).status, 404, id);
    const s = await signIn("paid@example.com");
    assert.equal((await call(admin, req("/api/admin/grant", { method: "POST", body: { email: "paid@example.com", plan: "maker", days: 30 } }))).status, 401);
    await call(admin, req("/api/admin/grant", { method: "POST", body: { email: "paid@example.com", plan: "maker", days: 30 }, headers: { "x-admin-key": "admin-test" } }));
    r = await call(packsFn, req("/api/packs/christmas-2026", { headers: auth(s) }), { params: { id: "christmas-2026" } });
    assert.equal(r.status, 404, "a Maker still cannot open a placeholder pack");
    r = await call(packsFn, req("/api/packs?lang=pt"));
    assert.deepEqual(r.body.packs, []);
    assert.equal(r.body.comingNext.title, "Um novo pack sazonal em breve");
    for (const secret of forbidden) assert.equal(JSON.stringify(r.body).includes(secret), false, secret);
  } finally { Date.now = realNow; }
});

test("pack access: free sees a preview, Maker sees all, placeholders are not teased by name", async () => {
  const { listPacks, getPack } = await import("../lib/packs.mjs");
  const now = Date.parse("2026-12-15T12:00:00Z");
  const packs = [
    { id: "out", title: { en: "Out now", pt: "Já disponível" }, releaseAt: "2026-01-01T00:00:00Z", plan: "maker", preview: 1, blends: [
      { id: "a", name: { en: "One", pt: "Um" }, oils: { lavender: 60 } },
      { id: "b", name: { en: "Two", pt: "Dois" }, oils: { bergamot: 40 } },
    ] },
    { id: "later", title: { en: "Later", pt: "Depois" }, releaseAt: "2027-06-01T00:00:00Z", plan: "maker", preview: 1, blends: [
      { id: "c", name: { en: "Three" }, oils: { rose: 100 } },
    ] },
    { id: "hold", placeholder: true, title: { en: "Secret Placeholder", pt: "Segredo" }, releaseAt: "2099-01-01T00:00:00Z", plan: "maker", preview: 1, blends: [
      { id: "d", name: { en: "Placeholder: Hidden" }, oils: { clove: 100 } },
    ] },
  ];
  const free = listPacks({ now, packs });
  assert.deepEqual(free.packs.map(p => p.id), ["out"]);
  assert.equal(free.packs[0].unlocked, false);
  assert.equal(free.comingNext.title, "Later");
  assert.equal(free.comingNext.releaseAt, "2027-06-01T00:00:00Z");
  assert.equal(JSON.stringify(free).includes("Secret"), false);
  const preview = getPack("out", { now, packs });
  assert.equal(preview.unlocked, false);
  assert.equal(preview.blends.length, 1);
  assert.equal(preview.locked, 1);
  const maker = getPack("out", { plan: "maker", now, packs });
  assert.equal(maker.unlocked, true);
  assert.equal(maker.blends.length, 2);
  assert.equal(getPack("later", { now, packs }), null);
  assert.equal(getPack("hold", { plan: "maker", now: Date.parse("2100-01-02T00:00:00Z"), packs }), null);
  const onlyHeld = listPacks({ now: Date.parse("2100-01-02T00:00:00Z"), packs: packs.filter(p => p.placeholder) });
  assert.deepEqual(onlyHeld.packs, []);
  assert.equal(onlyHeld.comingNext.title, "A new seasonal pack coming soon");
  assert.equal("releaseAt" in onlyHeld.comingNext, false);
  assert.equal(listPacks({ now, packs: [] }).comingNext, null);
});

test("GDPR/LGPD: a maker can export and delete their data", async () => {
  const me = await fn("me");
  const s = await signIn("gdpr@example.com");
  const ex = await call(me, req("/api/me", { method: "POST", body: { action: "export" }, headers: auth(s) }));
  assert.equal(ex.body.data.email, "gdpr@example.com");
  await call(me, req("/api/me", { method: "POST", body: { action: "delete" }, headers: auth(s) }));
  assert.equal((await store.list("user/")).length, 0);
});

test("deleting an account also removes that email's licence and Play records", async () => {
  const me = await fn("me");
  const s = await signIn("gdpr2@example.com");
  await store.set("licence/AAAAA-BBBBB-CCCCC-DDDDD", { email: "gdpr2@example.com", product: "bT6IA", at: 1 });
  await store.set("licence/EEEEE-FFFFF-GGGGG-HHHHH", { email: "keep@example.com", product: "bT6IA", at: 1 });
  await store.set("play/token-user", { email: "gdpr2@example.com", productId: "maker_monthly", at: 1 });
  await store.set("play/token-keep", { email: "keep@example.com", productId: "maker_monthly", at: 1 });
  const r = await call(me, req("/api/me", { method: "POST", body: { action: "delete" }, headers: auth(s) }));
  assert.equal(r.status, 200);
  assert.equal(await store.get("user/gdpr2@example.com"), null);
  assert.equal(await store.get("licence/AAAAA-BBBBB-CCCCC-DDDDD"), null);
  assert.equal(await store.get("play/token-user"), null);
  assert.equal((await store.get("licence/EEEEE-FFFFF-GGGGG-HHHHH")).email, "keep@example.com");
  assert.equal((await store.get("play/token-keep")).email, "keep@example.com");
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
