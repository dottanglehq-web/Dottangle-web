# Dot Tangle contact system

React/Vite frontend with Express, MongoDB and Nodemailer. Each accepted `/api/inquiries` submission stores the inquiry and exactly two email jobs atomically in one MongoDB document:

1. Admin inquiry notification to `dottanglehq@gmail.com`: all submitted fields, selected services, timestamp in India time, unique submission ID and customer Reply-To.
2. Automatic thank-you email to the customer's submitted email address, with subject `Thank You for Contacting Dot Tangle!`.

The public contact/calling number is **+91 7973574376**. Contact page and footer use ordinary telephone links. The form does not call any messaging API.

## Configure

Copy `.env.example` to `.env`; retain credentials only on the backend, never in `VITE_` variables or source control.

- `MONGO_URI` or `MONGODB_URI`: durable MongoDB database with backups and restricted access. Unique partial indexes protect new submission IDs and normalized-content hashes without modifying legacy inquiry details.
- `SMTP_HOST`, `SMTP_PORT` (587 with mandatory STARTTLS or 465 with TLS), `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`: authorized SMTP account. Gmail requires a valid app password with two-step verification. `SMTP_EMAIL` remains a legacy username alias. Production verifies TLS certificates.
- `ADMIN_EMAIL=dottanglehq@gmail.com`.
- `SITE_ORIGIN`: exact public origin; use `http://localhost:3000` for Vite development.
- `PORT=5000`.
- `TRUST_PROXY_HOPS`: leave blank unless the API runs behind a known trusted proxy topology. The built-in rate limiter is per API process; add a shared edge limiter before horizontal scaling.

## Run

```sh
npm ci
npm run dev
npm run server
```

The Express process must stay running to process email jobs every five seconds. In production, run `npm run build`, then `npm run server`; Express serves `dist`, API endpoints and SPA routes including `/thank-you`. Terminate HTTPS at a trusted reverse proxy. A static-only Vite deployment cannot run this backend or its retry worker. Local `.env` changes do not update remote hosting settings automatically.

## Reliability and security

The API returns success only after MongoDB persistence. It returns a friendly 503 if storage is unavailable, and periodically retries database connection. Provider outages preserve both inquiry and email jobs. The customer is redirected to `/thank-you` after durable acceptance; a provider failure does not incorrectly reject the saved inquiry. The page reports that confirmation is queued until SMTP acceptance is known. No customer details appear in URLs.

Jobs independently track `pending`, `sending`, `accepted`, `pending_configuration`, `retry`, `failed` and `uncertain`. SMTP acceptance is not proof of inbox receipt. Explicit send failures retry with exponential backoff up to eight attempts. Missing SMTP configuration does not exhaust attempts. Atomic claims prevent concurrent workers from sending the same job. Accepted jobs are skipped. State survives worker restarts.

Ambiguous network failures, expired claims and crashes after provider acceptance require reconciliation, since SMTP cannot guarantee exactly-once delivery. Deterministic Message-IDs aid reconciliation. Do not blindly resend an uncertain job.

```sh
node server/notifications-cli.js status
node server/notifications-cli.js status SUBMISSION_ID
node server/notifications-cli.js retry SUBMISSION_ID customer
node server/notifications-cli.js retry SUBMISSION_ID admin --confirmed-not-sent
```

Status prints only submission IDs, dates and delivery metadata. Inspect SMTP logs before using `--confirmed-not-sent` for uncertain jobs. Monitor failed jobs and storage availability. Restrict access and apply an appropriate database retention policy.

Field validation bounds types, lengths, email, phone, services and control characters. Templates escape user-provided HTML. Origin checks, a hidden honeypot and five requests per IP per fifteen minutes provide basic spam protection. Identical normalized inquiries return their original submission ID across retries/restarts. No public endpoint lists customer records. Newsletter subscriptions retain MongoDB persistence.

## Verification

```sh
npm test
npx playwright install chromium
npm run test:browser
npm run smtp:verify
npm run smtp:verify -- dottanglehq@gmail.com
node server/verify-live.js --send
```

Backend tests use an isolated real MongoDB instance and a local authenticated STARTTLS SMTP server. Chromium tests use the built frontend, real HTTP API and isolated MongoDB at desktop, tablet and mobile sizes, including storage outage recovery, telephone links, exactly two persisted jobs, thank-you redirect and home navigation. Screenshots are stored in ignored `test-results/`.

SMTP verification checks connectivity/TLS/authentication; the optional recipient sends a real test email. `verify-live.js --send` creates one labeled test inquiry in the configured database, verifies duplicate prevention and sends both email roles to the business inbox. It processes only its test inquiry. Check the receiving inbox to establish final receipt and rendering; a separate customer mailbox test requires an address you control.

The November 5, 2026 live verification passed MongoDB authentication/persistence, SMTP authentication/TLS, duplicate protection, and Gmail SMTP acceptance of both email roles. Final inbox receipt was not independently inspected.

Provider reference: [Nodemailer SMTP verification](https://nodemailer.com/smtp).

## Service catalog search

The service explorer keeps its sidebar and controlled search input mounted while filtering only the result area. Search trims surrounding whitespace, ignores case, supports partial names, category descriptions, technology, keywords and scope items, and accepts `sco` as an alias for `SEO`. Clear Search restores focus to the input; unmatched queries show a no-results message.

Category counts come from `serviceCategories.length`. Four focused categories share the existing SEO, AI and custom-software overview records where applicable; search deduplicates shared records by service ID and preserves existing detail URLs. Each new offering exposes its eight scope items in the existing modal. Catalog entries describe services offered by the agency; the contact form continues to use only its two email jobs.

Run `npm run test:services` for a production build, catalog assertions and Chromium desktop/mobile checks of typing/focus, all requested searches, clearing, no results, category count, scope lists and deep links.

## Vercel production deployment

`vercel.json` deploys the Vite assets plus `api/index.js`, which exposes the existing Express routes. Set MongoDB/SMTP/ADMIN_EMAIL and `SITE_ORIGIN` as backend production environment variables in Vercel. Local `.env` files are excluded from uploads. New inquiries schedule the same durable email worker via `waitUntil` after acknowledgement. A protected daily cron at 00:00 UTC (05:30 India time) retries queued jobs on Hobby; set a random `CRON_SECRET`. Frequent retries require the continuously running Express worker or an authorized external scheduler invoking `/api/notifications/retry` with its bearer secret. Do not assume a Vercel function's `setInterval` will run between requests.

The phone's Contact app uses the same `ContactForm` and response handling as `/contact`. Run `npm run test:phone` to verify app order, all apps, retained state, mobile behavior, malformed response recovery, offscreen suspension, reduced motion, actual form persistence and synthetic interaction timing. See [PERFORMANCE_CONTACT_AUDIT.md](PERFORMANCE_CONTACT_AUDIT.md) for evidence and limits.

Browser origin checks explicitly allow the two business addresses `https://dottangle.vercel.app` and `https://dottangel.vercel.app`, the configured `SITE_ORIGIN`, additional comma-separated `ALLOWED_ORIGINS`, and this project's Vercel deployment URLs. Trailing slashes are normalized. Other Vercel tenants and unrelated origins remain blocked.

Both email notifications use the shared white HTML template in `server/emailTemplate.js`, with the official logo embedded as an inline CID image, a short studio/services introduction, and verified website/Instagram/email/calling links. Plain-text alternatives contain the same contact links. The logo asset is explicitly bundled with the Vercel function; local authenticated SMTP tests verify the image MIME part and Content-ID.
