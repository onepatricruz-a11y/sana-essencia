import { PACKS } from "../packs/index.mjs";
import { PLAN_RANK } from "./config.mjs";

const pick = (obj, lang) => (obj && (obj[lang] || obj.en || obj.pt)) || "";
const forMarket = (p, market) => !p.markets || p.markets.includes(market);
// Shown when the only packs still ahead are unchecked placeholders. No title, no date, no formula.
const NEUTRAL_NEXT = { en: "A new seasonal pack coming soon", pt: "Um novo pack sazonal em breve" };

// What anyone can see: released packs, plus the title and date of the next real one.
// Placeholder packs are never named and never served, even after their hold date.
export function listPacks({ plan = "free", lang = "en", market = "uk", now = Date.now(), packs = PACKS } = {}) {
  const mine = packs.filter(p => forMarket(p, market)).sort((a, b) => Date.parse(a.releaseAt) - Date.parse(b.releaseAt));
  const released = mine.filter(p => !p.placeholder && Date.parse(p.releaseAt) <= now);
  const nextReal = mine.find(p => !p.placeholder && Date.parse(p.releaseAt) > now);
  const held = mine.some(p => p.placeholder);
  return {
    packs: released.map(p => ({
      id: p.id, title: pick(p.title, lang), releaseAt: p.releaseAt, count: p.blends.length,
      unlocked: (PLAN_RANK[plan] ?? 0) >= (PLAN_RANK[p.plan] ?? 1),
    })),
    comingNext: nextReal
      ? { title: pick(nextReal.title, lang), releaseAt: nextReal.releaseAt }
      : held ? { title: pick(NEUTRAL_NEXT, lang) } : null,
  };
}

export function getPack(id, { plan = "free", lang = "en", market = "uk", now = Date.now(), packs = PACKS } = {}) {
  const p = packs.find(x => x.id === id && forMarket(x, market));
  if (!p || p.placeholder || Date.parse(p.releaseAt) > now) return null; // unreleased or unchecked packs simply don't exist yet
  const unlocked = (PLAN_RANK[plan] ?? 0) >= (PLAN_RANK[p.plan] ?? 1);
  const blends = (unlocked ? p.blends : p.blends.slice(0, p.preview ?? 1))
    .map(b => ({ id: b.id, name: pick(b.name, lang), oils: b.oils }));
  return { id: p.id, title: pick(p.title, lang), releaseAt: p.releaseAt, unlocked, blends, locked: p.blends.length - blends.length };
}
