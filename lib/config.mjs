// Reads settings from environment variables so no secret lives in the code.
const json = (name, fallback) => {
  const raw = process.env[name];
  if (!raw) return fallback;
  try { return JSON.parse(raw); } catch { throw new Error(`${name} is not valid JSON`); }
};

export const cfg = () => ({
  siteUrl: process.env.SITE_URL || "https://sanaessencia.co.uk",
  brSiteUrl: process.env.BR_SITE_URL || "https://sanaessencia.com.br",
  allowedOrigins: (process.env.ALLOWED_ORIGINS || "https://sanaessencia.co.uk,https://sanaessencia.com.br")
    .split(",").map(s => s.trim()).filter(Boolean),
  sessionSecret: process.env.SESSION_SECRET || "",
  adminKey: process.env.ADMIN_KEY || "",
  resendKey: process.env.RESEND_API_KEY || "",
  emailFrom: process.env.EMAIL_FROM || "Sana Essencia <hello@sanaessencia.co.uk>",
  emailReplyTo: process.env.EMAIL_REPLY_TO || "hello@sanaessencia.co.uk",
  payhipApiKey: process.env.PAYHIP_API_KEY || "",
  webhookUrlKey: process.env.WEBHOOK_URL_KEY || "",
  payhipProducts: json("PAYHIP_PRODUCTS", {}),
  hotmartHottok: process.env.HOTMART_HOTTOK || "",
  hotmartProducts: json("HOTMART_PRODUCTS", {}),
  playPackage: process.env.PLAY_PACKAGE_NAME || "uk.co.sanaessencia.blendstudio",
  playProducts: json("PLAY_PRODUCTS", {}),
  googleServiceAccount: json("GOOGLE_SERVICE_ACCOUNT_JSON", null),
});

export const PLAN_RANK = { free: 0, maker: 1, studio: 2 };
export const DAY = 24 * 60 * 60 * 1000;
export const GRACE_DAYS = 3; // renewals can arrive a little late
