import { PACKS } from "../packs/index.mjs";
import { PLAN_RANK } from "./config.mjs";

const pick = (obj, lang) => (obj && (obj[lang] || obj.en || obj.pt)) || "";
const forMarket = (p, market) => !p.markets || p.markets.includes(market);

// What anyone can see: released packs, plus the title and date of the next one (to build anticipation).
export function listPacks({ plan = "free", lang = "en", market = "uk", now = Date.now() }) {
  const mine = PACKS.filter(p => forMarket(p, market)).sort((a, b) => Date.parse(a.releaseAt) - Date.parse(b.releaseAt));
  const released = mine.filter(p => Date.parse(p.releaseAt) <= now);
  const next = mine.find(p => Date.parse(p.releaseAt) > now);
  return {
    packs: released.map(p => ({
      id: p.id, title: pick(p.title, lang), releaseAt: p.releaseAt, count: p.blends.length,
      unlocked: (PLAN_RANK[plan] ?? 0) >= (PLAN_RANK[p.plan] ?? 1),
    })),
    comingNext: next ? { title: pick(next.title, lang), releaseAt: next.releaseAt } : null,
  };
}

export function getPack(id, { plan = "free", lang = "en", market = "uk", now = Date.now() }) {
  const p = PACKS.find(x => x.id === id && forMarket(x, market));
  if (!p || Date.parse(p.releaseAt) > now) return null; // unreleased packs simply don't exist yet
  const unlocked = (PLAN_RANK[plan] ?? 0) >= (PLAN_RANK[p.plan] ?? 1);
  const blends = (unlocked ? p.blends : p.blends.slice(0, p.preview ?? 1))
    .map(b => ({ id: b.id, name: pick(b.name, lang), oils: b.oils }));
  return { id: p.id, title: pick(p.title, lang), releaseAt: p.releaseAt, unlocked, blends, locked: p.blends.length - blends.length };
}
