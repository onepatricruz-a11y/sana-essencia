// Key-value storage. Netlify Blobs in production, an in-memory map in tests and local runs.
const memory = new Map();

async function blobs() {
  const { getStore } = await import("@netlify/blobs");
  return getStore({ name: "se-accounts", consistency: "strong" });
}

const useMemory = () => process.env.SE_STORE === "memory";

export const store = {
  async get(key) {
    if (useMemory()) return memory.has(key) ? structuredClone(memory.get(key)) : null;
    return (await blobs()).get(key, { type: "json" });
  },
  async set(key, value) {
    if (useMemory()) { memory.set(key, structuredClone(value)); return; }
    await (await blobs()).setJSON(key, value);
  },
  async del(key) {
    if (useMemory()) { memory.delete(key); return; }
    await (await blobs()).delete(key);
  },
  async list(prefix) {
    if (useMemory()) return [...memory.keys()].filter(k => k.startsWith(prefix));
    const { blobs: items } = await (await blobs()).list({ prefix });
    return items.map(b => b.key);
  },
  _reset() { memory.clear(); },
};

export const userKey = email => `user/${normEmail(email)}`;
export const normEmail = e => String(e || "").trim().toLowerCase();
export const isEmail = e => /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/.test(normEmail(e)) && normEmail(e).length <= 254;
