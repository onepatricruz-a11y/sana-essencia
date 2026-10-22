/* Sana Essencia account helper for the Blend Studio (UK) and Estúdio (BR).
   - SE.account.makerAllowed(): the single answer the Studio's `const MAKER` uses.
     Live domain: only a signed-in Maker or Studio account. Deploy previews/localhost: ?maker=preview also works.
   - Handles the emailed sign-in link, and the optional sign-in box (#se-account) in the Maker plan card.
   - Keeps the session in localStorage, plus a 24-hour plan token so paid tools work offline.
   When the server's answer differs from what the page started with, the page reloads once. */
(function () {
  "use strict";
  var LIVE = /(^|\.)sanaessencia\.(co\.uk|com\.br)$/.test(location.hostname);
  // Same site on sanaessencia.co.uk and deploy previews; the Brazilian site (GitHub Pages) calls the UK server.
  var API = /(^|\.)sanaessencia\.com\.br$/.test(location.hostname) ? "https://sanaessencia.co.uk/api" : "/api";
  var PT = (document.documentElement.lang || "").toLowerCase().indexOf("pt") === 0;
  var K = { session: "se-session", ent: "se-ent" };
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (e) {} }
  function call(path, opts) {
    opts = opts || {};
    var h = { "content-type": "application/json" }, s = get(K.session);
    if (s) h.authorization = "Bearer " + s;
    return fetch(API + path, { method: opts.method || "GET", headers: h, body: opts.body ? JSON.stringify(opts.body) : undefined })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) {
        if (!r.ok) { var err = new Error(j.error || (PT ? "Algo deu errado" : "Something went wrong")); err.status = r.status; throw err; } return j; }); });
  }
  function keep(j) { if (j.session) set(K.session, j.session); if (j.entitlement) set(K.ent, j.entitlement); return j.me || j; }
  // Reads the plan from the saved token without the network. Never trusted without a session.
  function cachedPlan() {
    var t = get(K.ent); if (!t || !get(K.session)) return { plan: "free" };
    try { var b = JSON.parse(atob(t.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
      return b.exp * 1000 > Date.now() ? { plan: b.plan, until: b.until, email: b.sub } : { plan: "free", email: b.sub }; } catch (e) { return { plan: "free" }; }
  }
  var paid = function (p) { return !!p && (p.plan === "maker" || p.plan === "studio"); };
  var preview = (function () { try {
    if (LIVE) { sessionStorage.removeItem("se-maker"); return false; }
    if (new URLSearchParams(location.search).get("maker") === "preview") sessionStorage.setItem("se-maker", "1");
    return sessionStorage.getItem("se-maker") === "1";
  } catch (e) { return false; } })();
  var startedWith = preview || paid(cachedPlan());

  var account = {
    makerAllowed: function () { return startedWith; },
    plan: cachedPlan,
    start: function (email, lang) { return call("/auth/start", { method: "POST", body: { email: email, lang: lang || (PT ? "pt" : "en") } }); },
    finishFromLink: function () {
      var m = location.hash.match(/(?:signin|entrar)=([\w-]+)/); if (!m) return Promise.resolve(null);
      history.replaceState(null, "", location.pathname + location.search);
      return call("/auth/verify", { method: "POST", body: { token: m[1] } }).then(keep);
    },
    // Online: the server decides. Offline: the last answer, for up to 24 hours. A rejected session signs out.
    refresh: function () {
      if (!get(K.session)) { set(K.ent, null); return Promise.resolve({ plan: "free" }); }
      return call("/me").then(keep, function (e) { if (e.status === 401) { account.signOut(); return { plan: "free" }; } return cachedPlan(); });
    },
    claimPayhip: function (key) { return call("/claim/payhip", { method: "POST", body: { licenseKey: key } }).then(keep); },
    packs: function (lang) { return call("/packs?lang=" + (lang || (PT ? "pt" : "en"))); },
    pack: function (id, lang) { return call("/packs/" + encodeURIComponent(id) + "?lang=" + (lang || (PT ? "pt" : "en"))); },
    exportData: function () { return call("/me", { method: "POST", body: { action: "export" } }); },
    deleteData: function () { return call("/me", { method: "POST", body: { action: "delete" } }).then(function (j) { account.signOut(); return j; }); },
    signOut: function () { set(K.session, null); set(K.ent, null); },
    // Phase 3, only inside the Google Play app (Trusted Web Activity with Play Billing enabled).
    playAvailable: function () {
      if (!("getDigitalGoodsService" in window)) return Promise.resolve(false);
      return window.getDigitalGoodsService("https://play.google.com/billing").then(function () { return true; }, function () { return false; });
    },
    playBuy: function (productId) {
      var req = new PaymentRequest([{ supportedMethods: "https://play.google.com/billing", data: { sku: productId } }],
        { total: { label: "Total", amount: { currency: "GBP", value: "0" } } });
      return req.show().then(function (res) {
        return call("/play/verify", { method: "POST", body: { productId: productId, purchaseToken: res.details.purchaseToken } })
          .then(function (j) { res.complete("success"); return keep(j); }, function (e) { res.complete("fail"); throw e; });
      });
    }
  };
  window.SE = window.SE || {}; window.SE.account = account;

  // Reload once if the server's answer changes whether paid tools should show.
  function settle(p) {
    renderBox(p);
    if ((preview || paid(p)) !== startedWith) location.reload();
  }

  /* Optional sign-in box: <div id="se-account"> with #se-signin, #se-signed/#se-who/#se-signout, #se-licence/#se-key. */
  function $(id) { return document.getElementById(id); }
  function say(msg) { var t = $("toast"); if (!t) { alert(msg); return; } t.textContent = msg; t.hidden = false; clearTimeout(say.t); say.t = setTimeout(function () { t.hidden = true; }, 3200); }
  function renderBox(p) {
    if (!$("se-account")) return;
    var signedIn = !!(p && p.email) && !!get(K.session);
    $("se-signin").hidden = signedIn;
    $("se-signed").hidden = !signedIn;
    $("se-licence").hidden = !signedIn || paid(p);
    if (!signedIn) return;
    var until = p.until ? new Date(p.until).toLocaleDateString(PT ? "pt-BR" : "en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";
    $("se-who").textContent = paid(p)
      ? (PT ? "Conectado como " + p.email + " · plano " + (p.plan === "studio" ? "Ateliê" : "Criador") + (until ? " até " + until : "")
            : "Signed in as " + p.email + " · " + (p.plan === "studio" ? "Studio" : "Maker") + " plan" + (until ? " until " + until : ""))
      : (PT ? "Conectado como " + p.email + " · plano gratuito" : "Signed in as " + p.email + " · free plan");
  }
  function bind() {
    var f = $("se-signin"), l = $("se-licence"), o = $("se-signout");
    if (f) f.addEventListener("submit", function (e) { e.preventDefault();
      account.start($("se-email").value.trim()).then(function () { say(PT ? "Enviamos o link de acesso para o seu e-mail" : "Check your email for the sign-in link"); }, function (err) { say(err.message); }); });
    if (l) l.addEventListener("submit", function (e) { e.preventDefault();
      account.claimPayhip($("se-key").value).then(settle, function (err) { say(err.message); }); });
    if (o) o.addEventListener("click", function () { account.signOut(); settle({ plan: "free" }); });
    account.finishFromLink().then(function () { return account.refresh(); }).then(settle, function (err) { say(err.message); settle(account.plan()); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind); else bind();
})();
