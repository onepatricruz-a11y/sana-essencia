import { cfg } from "./config.mjs";

const TEXT = {
  en: {
    subject: "Your sign-in link for the Blend Studio",
    hello: "Hello,",
    intro: "Use the button below to sign in to the Blend Studio.",
    button: "Sign in to Sana Essencia",
    copy: "If the button does not work, copy this link into your browser:",
    expires: mins => `This link works once and expires in ${mins}. If you didn't ask for it, you can ignore this email.`,
  },
  pt: {
    subject: "Seu link de acesso ao Estúdio de Blends",
    hello: "Olá,",
    intro: "Use o botão abaixo para entrar no Estúdio de Blends.",
    button: "Entrar na Sana Essencia",
    copy: "Se o botão não funcionar, copie este link no navegador:",
    expires: mins => `Este link funciona uma vez e expira em ${mins}. Se você não pediu, pode ignorar este e-mail.`,
  },
};

// Plain text and a simple HTML twin. No images, no tracking, no web fonts: those hurt delivery.
const esc = s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function expiryPhrase(ttlMs, lang) {
  const minutes = Math.max(1, Math.round(Number(ttlMs) / 60000) || 1);
  return lang === "pt"
    ? (minutes === 1 ? "1 minuto" : `${minutes} minutos`)
    : (minutes === 1 ? "1 minute" : `${minutes} minutes`);
}

function footerFor(lang) {
  const url = lang === "pt" ? cfg().brSiteUrl : cfg().siteUrl;
  let host = lang === "pt" ? "sanaessencia.com.br" : "sanaessencia.co.uk";
  try { host = new URL(url).host || host; } catch { /* keep the public host */ }
  return { url, host };
}

function plainText(t, link, mins, foot) {
  return [
    "Sana Essencia",
    "",
    t.hello,
    "",
    t.intro,
    "",
    t.button,
    link,
    "",
    t.expires(mins),
    "",
    `Sana Essencia`,
    foot.host,
  ].join("\n");
}

function htmlEmail(t, link, mins, foot, lang) {
  const href = esc(link);
  // Warm brand button (the Studio's own gold) with dark text. A real link, not an image.
  const button = `<a href="${href}" style="display:inline-block;background:#C4893B;color:#2B1E25;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.2;text-decoration:none;padding:12px 22px;border-radius:6px;">${esc(t.button)}</a>`;
  return `<!DOCTYPE html>
<html lang="${lang === "pt" ? "pt" : "en"}">
<body style="margin:0;padding:0;background:#F6EEE1;">
  <div style="max-width:480px;margin:0 auto;padding:32px 20px;font-family:Georgia,'Times New Roman',serif;color:#2B1E25;font-size:16px;line-height:1.5;">
    <p style="margin:0 0 16px;font-size:22px;">Sana Essencia</p>
    <p style="margin:0 0 12px;">${esc(t.hello)}</p>
    <p style="margin:0 0 20px;">${esc(t.intro)}</p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 20px;">
      <tr><td bgcolor="#C4893B" style="background:#C4893B;border-radius:6px;">${button}</td></tr>
    </table>
    <p style="margin:0 0 8px;font-size:14px;color:#6E5C64;">${esc(t.copy)}</p>
    <p style="margin:0 0 20px;font-size:14px;word-break:break-all;"><a href="${href}" style="color:#94601F;">${href}</a></p>
    <p style="margin:0 0 24px;font-size:14px;color:#6E5C64;">${esc(t.expires(mins))}</p>
    <p style="margin:0;font-size:13px;color:#6E5C64;">Sana Essencia · <a href="${esc(foot.url)}" style="color:#6E5C64;">${esc(foot.host)}</a></p>
  </div>
</body>
</html>`;
}

export const outbox = []; // used locally and in tests

export async function sendSignInEmail(to, link, lang = "en", ttlMs = 20 * 60 * 1000) {
  const t = TEXT[lang] || TEXT.en;
  const useLang = TEXT[lang] ? lang : "en";
  const mins = expiryPhrase(ttlMs, useLang);
  const foot = footerFor(useLang);
  const msg = {
    from: cfg().emailFrom,
    to,
    reply_to: cfg().emailReplyTo,
    subject: t.subject,
    text: plainText(t, link, mins, foot),
    html: htmlEmail(t, link, mins, foot, useLang),
  };
  if (!cfg().resendKey) {
    // Without an email service, links are only printed in local runs/tests, never on a real site.
    if (process.env.ALLOW_DEV_EMAIL !== "1") throw Object.assign(new Error("Sign-in email isn't set up yet"), { status: 503 });
    outbox.push(msg); console.log(`[dev email] to ${to}: ${link}`); return { dev: true };
  }
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${cfg().resendKey}`, "content-type": "application/json" },
    body: JSON.stringify(msg),
  });
  if (!r.ok) throw Object.assign(new Error("email failed"), { status: 502 });
  return r.json();
}
