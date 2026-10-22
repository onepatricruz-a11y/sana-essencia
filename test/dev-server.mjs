// Local stand-in for `netlify dev`: serves uk/ and routes /api/* to the functions (in-memory storage).
// node test/dev-server.mjs  -> http://localhost:8899/blend-studio/   (sign-in links are printed here)
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname } from "node:path";
process.env.SE_STORE ??= "memory";
process.env.ALLOW_DEV_EMAIL ??= "1";
process.env.SESSION_SECRET ??= "local-dev-secret-local-dev-secret";
process.env.ALLOWED_ORIGINS ??= "http://localhost:8899";
process.env.SITE_URL ??= "http://localhost:8899";
process.env.ADMIN_KEY ??= "local-admin";

const FN = ["auth-start", "auth-verify", "me", "claim-payhip", "payhip-webhook", "hotmart-webhook", "packs", "play-verify", "admin-grant"];
const routes = [];
for (const name of FN) {
  const mod = await import(`../netlify/functions/${name}.mjs`);
  for (const p of [].concat(mod.config.path)) routes.push({ re: new RegExp("^" + p.replace(/:(\w+)/g, "(?<$1>[^/]+)") + "$"), fn: mod.default });
}
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".json": "application/json", ".webmanifest": "application/manifest+json", ".png": "image/png", ".jpg": "image/jpeg", ".css": "text/css" };
const root = new URL("../uk/", import.meta.url).pathname;

createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const route = routes.find(r => r.re.test(url.pathname));
  if (route) {
    const body = ["GET", "HEAD", "OPTIONS"].includes(req.method) ? undefined : await new Promise(r => { let d = ""; req.on("data", c => d += c); req.on("end", () => r(d)); });
    const r = await route.fn(new Request(url, { method: req.method, headers: req.headers, body }), { params: route.re.exec(url.pathname).groups || {} });
    res.writeHead(r.status, Object.fromEntries(r.headers)); res.end(Buffer.from(await r.arrayBuffer())); return;
  }
  let file = join(root, decodeURIComponent(url.pathname));
  try { if ((await stat(file)).isDirectory()) file = join(file, "index.html"); res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" }); res.end(await readFile(file)); }
  catch { res.writeHead(404); res.end("not found"); }
}).listen(Number(process.env.PORT || 8899), () => console.log("dev server on", process.env.PORT || 8899));
