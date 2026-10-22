import { store, userKey, normEmail } from "./store.mjs";
import { PLAN_RANK, DAY, GRACE_DAYS, cfg } from "./config.mjs";
import { signJwt } from "./crypto.mjs";

// A user record holds "grants": one per way they paid (Payhip, Hotmart, Google Play, a gift...).
// The best active grant decides their plan. Nothing else about the person is stored.
export async function getUser(email) {
  return (await store.get(userKey(email))) || { email: normEmail(email), created: Date.now(), grants: {} };
}

export async function saveUser(u) { u.updated = Date.now(); await store.set(userKey(u.email), u); }

export async function upsertGrant(email, id, patch) {
  const u = await getUser(email);
  const prev = u.grants[id] || {};
  const next = { ...prev, ...patch, updated: Date.now() };
  // Never shorten access by accident: a late webhook must not cut a longer paid period.
  if (prev.until && patch.until && patch.status !== "revoked") next.until = Math.max(prev.until, patch.until);
  u.grants[id] = next;
  await saveUser(u);
  return u;
}

export async function revokeGrant(email, id, reason) {
  const u = await getUser(email);
  if (!u.grants[id]) return u;
  u.grants[id] = { ...u.grants[id], status: "revoked", reason, until: Date.now(), updated: Date.now() };
  await saveUser(u);
  return u;
}

export function activePlan(u, now = Date.now()) {
  let best = { plan: "free", until: null, source: null };
  for (const [id, g] of Object.entries(u?.grants || {})) {
    if (g.status === "revoked") continue;
    if (g.until && g.until + GRACE_DAYS * DAY < now) continue;
    if ((PLAN_RANK[g.plan] ?? 0) > (PLAN_RANK[best.plan] ?? 0) ||
        (g.plan === best.plan && (g.until ?? Infinity) > (best.until ?? 0))) {
      best = { plan: g.plan, until: g.until ?? null, source: id };
    }
  }
  return best;
}

export const hasPlan = (u, plan) => (PLAN_RANK[activePlan(u).plan] ?? 0) >= (PLAN_RANK[plan] ?? 99);

// Short-lived signed token the Studio can keep so paid features work offline for a day.
export function entitlementToken(u) {
  const p = activePlan(u);
  return signJwt({ typ: "ent", sub: u.email, plan: p.plan, until: p.until }, cfg().sessionSecret, 24 * 3600);
}

export async function deleteUser(email) { await store.del(userKey(email)); }
