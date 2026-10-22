# Sana Essencia server (accounts, paid plans, seasonal packs)

**Status: built and tested on the box only. Not deployed, nothing pushed, no live setting touched.**

## In plain words
A small program that runs next to sanaessencia.co.uk on Netlify. It answers three questions:
1. **Who is this?** A maker types their email and gets a one-time sign-in link (no passwords).
2. **Have they paid, and until when?** Payhip and Hotmart tell the server automatically after every
   sale, refund or cancellation. Buyers can also paste their Payhip licence key. Later, Google Play too.
3. **What can they open?** Seasonal packs unlock on their release date. Free users see one blend
   from each pack and Maker plan users see all of them. The packs are not in the website's code, so nobody can read them for free.

It stores only the email address, plan, dates and payment references. Makers can download or erase
their data (`/api/me`), which covers UK GDPR and LGPD access and erasure requests.

## Endpoints
| Path | What it does |
|---|---|
| `POST /api/auth/start` `{email, lang}` | Emails a sign-in link (EN → Blend Studio, PT → Estúdio). 5 an hour per email and 20 an hour per IP address. |
| `POST /api/auth/verify` `{token}` | Single-use, 20 min. Returns a 60-day session + 24 h entitlement token. |
| `GET /api/me` / `POST /api/me {action:"export"\|"delete"}` | Plan, until when; data export/erasure. |
| `POST /api/claim/payhip` `{licenseKey}` | Checks the key with Payhip's licence API; one key = one account. |
| `POST /api/webhooks/payhip?k=…` | Payhip `paid`, `refunded`, `subscription.created`, `subscription.deleted`. |
| `POST /api/webhooks/hotmart?k=…` | Hotmart 2.0.0: approved/complete grant; refund/chargeback/cancel revoke; subscription cancel = access to end of the month. |
| `GET /api/packs`, `GET /api/packs/:id` | Released packs (+ "coming next" teaser), per market (UK/BR) and language. |
| `POST /api/play/verify` `{productId, purchaseToken}` | Phase 3: checks a Google Play subscription and acknowledges it. Not yet run against real Google. |
| `POST /api/admin/grant` (header `x-admin-key`) | Gift plans, founding testers, studios, support fixes. |

## Run the tests
```
cd /workspace/se-server && npm install && npm test     # 17 tests, no network, in-memory storage
```

## How it would go live (later, with Patricia's OK)
1. Copy `netlify/`, `lib/`, `packs/`, `package.json` to the root of the `sana-essencia` repo on a new branch.
2. Replace `netlify.toml` with `netlify.toml.proposed` (publish `uk/`, functions from `netlify/functions`),
   so the function code and packs are never published as plain files.
3. Set the variables from `.env.example` in Netlify → Site configuration → Environment variables.
4. Open a deploy preview, run a £1 test product through Payhip and Hotmart, then merge.
5. Put the webhook URLs (with `?k=`) into Payhip (Settings → Developer) and Hotmart (Ferramentas → Webhook).
6. Wire `client/se-account.js` into the Studio: "Sign in", "I already paid, paste licence key", pack list.

## Design notes and known limits
- **Webhook security:** Payhip's `signature` is sha256(API key), the same on every call, and Hotmart's
  hottok is a fixed token. Neither signs the body, so each webhook URL also carries a secret `?k=`.
- **Dedupe:** each event is processed once (`seen/…` keys). Late or repeated renewals never shorten access.
- **Netlify Blobs** holds `user/<email>`, `licence/<key>`, `play/<token>`, `signin/<hash>`, `rl/…`, `seen/…`.
- **Paid features in the Studio's own code** (costing, PDFs) can only be gated "softly" with the entitlement token.
  A technical person could bypass that. Anything that must be protected (packs, sync, IFRA storage) has to come from the server.
- **Brazil site** is on GitHub Pages, so it calls `https://sanaessencia.co.uk/api` (CORS allowed). Moving it to Netlify is optional.
- `packs/index.mjs` blends are placeholders. Winter, Christmas, Valentine's and Dia dos Namorados are marked `Placeholder:` and each `releaseAt` is 2099-01-01. Placeholder packs are never served. If every pack still ahead is a placeholder, the "coming next" line is "A new seasonal pack coming soon" and does not name the pack.
