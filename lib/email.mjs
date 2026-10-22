import { cfg } from "./config.mjs";

const TEXT = {
  en: {
    subject: "Your sign-in link for the Blend Studio",
    body: link => `Hello,\n\nTap this link to sign in to the Sana Essencia Blend Studio:\n\n${link}\n\nIt works once and expires in 20 minutes. If you didn't ask for it, you can ignore this email.\n\nSana Essencia`,
  },
  pt: {
    subject: "Seu link de acesso ao Estúdio de Blends",
    body: link => `Olá,\n\nToque neste link para entrar no Estúdio de Blends da Sana Essencia:\n\n${link}\n\nEle funciona uma vez e expira em 20 minutos. Se você não pediu, pode ignorar este e-mail.\n\nSana Essencia`,
  },
};

export const outbox = []; // used locally and in tests

export async function sendSignInEmail(to, link, lang = "en") {
  const t = TEXT[lang] || TEXT.en;
  const msg = { from: cfg().emailFrom, to, reply_to: cfg().emailReplyTo, subject: t.subject, text: t.body(link) };
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
