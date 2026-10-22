// Browser check of the Maker gate. Needs: npm i puppeteer-core, Chrome, and `SITE_URL=http://sanaessencia.co.uk node test/dev-server.mjs` running.
import puppeteer from "puppeteer-core";
import { readFileSync } from "node:fs";
const browser = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome", headless: "new",
  args: ["--no-sandbox", "--host-resolver-rules=MAP sanaessencia.co.uk 127.0.0.1:8899"] });
const blend = { name: "Soft Landing", items: [{ id: "bergamot", parts: 3 }, { id: "lavender", parts: 4 }, { id: "cedarwood", parts: 3 }], format: "candle", size: 200, jars: 10, strength: 8 };
const prices = { oils: { bergamot: { price: 6, ml: 10 }, lavender: { price: 5, ml: 10 }, cedarwood: { price: 4, ml: 10 } }, mat: { waxKg: 5, container: 2.5, wick: 0.2, label: 0.5, feePct: 10 }, sell: { candle: 18 } };
async function open(origin, qs = "") {
  const ctx = await browser.createBrowserContext();
  const p = await ctx.newPage();
  p.on("pageerror", e => console.log("PAGE ERROR", origin, e.message));
  await p.goto(origin + "/blend-studio/", { waitUntil: "load" });
  await p.evaluate((b, pr) => { localStorage.setItem("se-blend-studio-current", JSON.stringify(b)); localStorage.setItem("se-maker-prices", JSON.stringify(pr)); }, blend, prices);
  await p.goto(origin + "/blend-studio/" + qs, { waitUntil: "networkidle0" });
  return p;
}
const visible = p => p.evaluate(() => !document.getElementById("maker-tools").hidden);
const costText = p => p.evaluate(() => document.getElementById("cost-out").innerText.replace(/\s+/g, " "));
const reloads = p => p.evaluate(() => performance.getEntriesByType("navigation")[0].type);

let p = await open("http://localhost:8899", "?maker=preview");
console.log("A localhost ?maker=preview -> tools visible:", await visible(p));
console.log("  cost:", await costText(p));
// shared materials bug: switch to spray, see bottle price
await p.evaluate(() => { const b = JSON.parse(localStorage.getItem("se-blend-studio-current")); b.format = "spray"; b.size = 100; b.strength = 2; localStorage.setItem("se-blend-studio-current", JSON.stringify(b)); });
await p.reload({ waitUntil: "networkidle0" });
console.log("  spray bottle field pre-filled with:", await p.evaluate(() => document.querySelector('[data-mat="container"]')?.value));
console.log("  spray cost:", await costText(p));

p = await open("http://sanaessencia.co.uk", "?maker=preview");
console.log("B production host ?maker=preview -> tools visible:", await visible(p));
console.log("  sign-in form visible:", await p.evaluate(() => !document.getElementById("se-signin").hidden));

// C: sign in on production host, admin grant, tools appear
await p.type("#se-email", "maker@example.com");
await p.click('#se-signin button[type=submit]');
await new Promise(r => setTimeout(r, 800));
const link = [...readFileSync("/tmp/dev.log", "utf8").matchAll(/(http:\/\/sanaessencia\.co\.uk\/blend-studio\/#signin=[\w-]+)/g)].pop()[1];
await fetch("http://localhost:8899/api/admin/grant", { method: "POST", headers: { "x-admin-key": "local-admin", "content-type": "application/json" }, body: JSON.stringify({ email: "maker@example.com", plan: "maker", days: 365 }) });
await p.goto(link.replace("#", "?x=1#"), { waitUntil: "networkidle0" });
await p.waitForNavigation({ waitUntil: "networkidle0", timeout: 5000 }).catch(() => {}); // page reloads once with the paid plan
console.log("C after sign-in + Maker grant -> tools visible:", await visible(p), "|", await p.evaluate(() => document.getElementById("se-who").textContent));
console.log("  hash cleared:", await p.evaluate(() => location.hash === ""));
// D: forged token in localStorage (soft gate)
p = await open("http://sanaessencia.co.uk");
await p.evaluate(() => { const b = btoa(JSON.stringify({ typ: "ent", sub: "x@y.z", plan: "maker", exp: 9999999999 })).replace(/=+$/, ""); localStorage.setItem("se-ent", "e30." + b + ".forged"); });
await p.reload({ waitUntil: "networkidle0" });
console.log("D forged entitlement, no session -> tools visible:", await visible(p));
// E: session for a FREE account on live host, plus forged paid token -> server says free, page reloads, tools hidden
p = await open("http://sanaessencia.co.uk");
await p.type("#se-email", "free@example.com"); await p.click('#se-signin button[type=submit]'); await new Promise(r => setTimeout(r, 800));
const link2 = [...readFileSync("/tmp/dev.log", "utf8").matchAll(/(http:\/\/sanaessencia\.co\.uk\/blend-studio\/#signin=[\w-]+)/g)].pop()[1];
await p.goto(link2.replace("#", "?y=1#"), { waitUntil: "networkidle0" });
await p.evaluate(() => { const s = localStorage.getItem("se-session"); const b = btoa(JSON.stringify({ typ: "ent", sub: "free@example.com", plan: "maker", exp: 9999999999 })).replace(/=+$/, ""); localStorage.setItem("se-ent", "e30." + b + ".forged"); });
await p.reload({ waitUntil: "networkidle0" });
await p.waitForNavigation({ waitUntil: "networkidle0", timeout: 5000 }).catch(() => {});
console.log("E free session + forged paid token -> tools visible after server check:", await visible(p), "|", await p.evaluate(() => document.getElementById("se-who").textContent));
await browser.close();
