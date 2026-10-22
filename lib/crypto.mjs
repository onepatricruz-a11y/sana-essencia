import { createHmac, createHash, randomBytes, timingSafeEqual } from "node:crypto";

export const b64url = buf => Buffer.from(buf).toString("base64url");
export const randomToken = (bytes = 32) => randomBytes(bytes).toString("base64url");
export const sha256hex = s => createHash("sha256").update(s).digest("hex");

export function safeEqual(a, b) {
  const x = Buffer.from(String(a ?? "")), y = Buffer.from(String(b ?? ""));
  return x.length === y.length && x.length > 0 && timingSafeEqual(x, y);
}

// Minimal HS256 JWT. Used for sign-in sessions and for the entitlement token the Studio keeps offline.
export function signJwt(payload, secret, ttlSeconds) {
  if (!secret || secret.length < 16) throw new Error("SESSION_SECRET missing or too short");
  const now = Math.floor(Date.now() / 1000);
  const body = { iat: now, exp: now + ttlSeconds, ...payload };
  const head = b64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const data = `${head}.${b64url(JSON.stringify(body))}`;
  return `${data}.${createHmac("sha256", secret).update(data).digest("base64url")}`;
}

export function verifyJwt(token, secret) {
  if (!token || !secret) return null;
  const parts = String(token).split(".");
  if (parts.length !== 3) return null;
  const expect = createHmac("sha256", secret).update(`${parts[0]}.${parts[1]}`).digest("base64url");
  if (!safeEqual(expect, parts[2])) return null;
  try {
    const head = JSON.parse(Buffer.from(parts[0], "base64url"));
    if (head.alg !== "HS256") return null;
    const body = JSON.parse(Buffer.from(parts[1], "base64url"));
    if (typeof body.exp !== "number" || body.exp < Math.floor(Date.now() / 1000)) return null;
    return body;
  } catch { return null; }
}
