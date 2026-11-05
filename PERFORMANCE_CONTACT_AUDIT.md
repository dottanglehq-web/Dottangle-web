# Mobile phone, contact API and production audit

The phone now has seven apps in this order: Projects, Contact, Browser, Services, About Us, Portfolio, Settings. Camera/Gallery code and the camera shortcut are removed. The Contact app reuses the website's actual form; Projects/Portfolio cards link to case studies/live sites, Browser retains its search, Services retains interactive detail navigation, About links to the studio section, and Settings preserves appearance/wallpaper controls.

## Root causes and changes

- The phone ran an infinite float animation, including during interaction and when offscreen. It now has a finite entrance animation, no infinite phone animations, and reduced blur/shadow work on touch/mobile screens.
- Drag-to-unlock previously updated React state and measured layout for every pointer move, and repeatedly scheduled unlock timeouts. It now measures once per gesture, updates only the knob transform at most once per animation frame, and handles pointer cancellation and keyboard access without timeout accumulation.
- App switches destroyed browser/form state. Visited panels are now retained in a bounded seven-app cache, while app content is lazy loaded. Clock updates are isolated from the phone state and stop outside the viewport or in a hidden browser tab. Memoized cards avoid rerendering unchanged service content.
- The desktop cursor previously ran an endless animation loop and recreated listeners after visibility changes. It now animates only until its position settles. Scroll parallax uses cached nodes, cancels pending frames, and is disabled for touch/reduced-motion screens. Offscreen hero animations pause; mobile hero blur/animation work is reduced.
- The hosted API returned 404 because the deployment only served the Vite frontend. A Vercel Node function now routes the existing Express API, reuses MongoDB connection/index initialization, and schedules the existing two-job email worker with `waitUntil`. The response confirms persistence before waiting for SMTP. SPA routes have explicit rewrites.
- The frontend blindly called `res.json()` on host error pages. Shared request handling now rejects HTML, empty, malformed JSON and invalid success payloads with a friendly message, retaining entered information and preventing false redirects.

## Local verification

- `npm test`: 13 tests pass, including durable storage, independent retries, concurrent worker claims, duplicate protection, local authenticated STARTTLS SMTP, malformed response handling, scoped serverless background dispatch and authenticated retry routing.
- `npm run test:phone`: desktop and Pixel 5 mobile emulation. All seven apps, home/back interactions, retained browser/form state, power/drag unlock, settings, real embedded form submission and thank-you redirect pass. HTML/empty/malformed responses retain the draft and show a friendly error.
- Twelve warm app switches under 4x CPU throttling: desktop p95 125–205 ms; mobile-emulation p95 57–105 ms across two recorded runs for click to two animation frames. This is a local synthetic interaction measurement, not real Android frame-rate or Core Web Vitals evidence.
- After garbage collection, JavaScript heap changed from 5,004,204 to 5,059,012 bytes on desktop and 4,956,848 to 5,015,616 bytes on mobile emulation in the final run. The panel cache stayed at seven. This short check does not prove absence of all memory leaks.
- Zero infinite animations in the phone; zero phone clock intervals when offscreen. Reduced-motion behavior verified.
- Desktop/tablet/mobile contact browser tests and desktop/mobile service-search regressions pass. The production build passes with the existing main-chunk size warning.
- Live MongoDB authentication, duplicate protection and Gmail SMTP authentication/TLS verified locally. Test inquiry `d95fdb7b-1c81-44ab-8db2-3d638eb085e2`: both email jobs accepted. Both test roles used the controlled business inbox; recipient inbox inspection is still required to prove final receipt and rendering.

## Hosting and retry operation

Production target selected by the owner: `https://dottangel.vercel.app`. Backend-only production variables are configured in Vercel; `.env`, `.env.local`, test outputs and local hosting metadata remain excluded from Git/uploads. No messaging API integration exists; +91 7973574376 is a contact/calling number.

`/api/notifications/retry` requires `Authorization: Bearer <CRON_SECRET>`. Vercel Hobby's daily cron invokes it at 00:00 UTC (05:30 India time), with bounded batches and an invocation deadline. New accepted submissions schedule immediate independent email dispatch. The daily cron is a fallback, not a five-second retry schedule. For prompt retry during outages or higher volume, run the existing Express worker continuously or configure an authorized external frequent scheduler. The queue remains in MongoDB if a function is interrupted; ambiguous sends still require reconciliation.

Chrome DevTools MCP is unavailable in this session, so a full DevTools/Lighthouse trace and physical low-end Android/60 FPS verification were not performed. Browser emulation and source/runtime checks are the evidence available here.

Provider references: [Vercel waitUntil](https://vercel.com/docs/functions/functions-api-reference/vercel-functions-package), [Vercel rewrites](https://vercel.com/docs/routing/rewrites), [cron protection](https://vercel.com/docs/cron-jobs/manage-cron-jobs), [cron limits](https://vercel.com/docs/cron-jobs/usage-and-pricing).

## Production verification — November 5, 2026

Deployed successfully to **https://dottangel.vercel.app**. `/`, `/contact`, and `/thank-you` return 200; `/api/health` returns 200 with JSON and `status: ready`. Unauthenticated retry calls return JSON 401; an authenticated live retry run returned 200.

A real Pixel 5-emulated browser submitted the embedded phone contact form. Production inquiry `fe2ad227-da45-429e-860b-25cdb5f888fe` was saved, redirected to `/thank-you`, and an identical repeat returned the original ID. Both independently tracked email jobs became `accepted` through production Gmail SMTP. The test sent both email roles to the controlled business inbox. Final inbox receipt and rendering still require recipient inspection.

| Feature | Verified result |
|---|---|
| Phone simulator performance | Optimized; no infinite phone animation or offscreen clock timers |
| Mobile animations | Mobile-emulated interactions and reduced-motion checks pass; physical Android 60 FPS not measured |
| Projects app | First, with linked project cards |
| Contact app | Second, using the actual form and API |
| Browser app | Third; queries survive app switches |
| Camera and Gallery | Removed, including the lock-screen camera shortcut |
| Remaining apps | Services, About Us, Portfolio, Settings open and work in the requested order |
| Contact form | Live production JSON response and thank-you redirect verified |
| MongoDB storage | Live persistence and duplicate protection verified |
| Gmail admin notification | Production SMTP accepted; inbox inspection outstanding |
| Customer confirmation email | Production SMTP accepted for the submitted controlled address; inbox inspection outstanding |
| SMTP authentication | Verified locally and by production sends |
| Notification retries | Existing independent retry tests pass; protected production retry endpoint verified; daily Hobby fallback configured |
| Thank You page | Desktop/tablet/mobile local checks and live mobile redirect pass |
