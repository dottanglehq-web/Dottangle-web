import { timingSafeEqual } from 'node:crypto';
import { createApp, processNotifications } from './app.js';
import { ensureDatabase } from './database.js';
import { notificationProviders } from './notifications.js';
export function createServerlessHandler({ schedule, connect = ensureDatabase, send = notificationProviders(), env = process.env } = {}) {
  let ready = false;
  const run = options => processNotifications({ send, maxPerChannel: 20, deadline: Date.now() + 180000, ...options });
  const app = createApp({ env, ready: () => ready, onAccepted: submissionId => schedule(run({ scope: { submissionId }, maxPerChannel: 1 }).catch(() => { console.error('Email worker unavailable; durable jobs retained.'); })) });
  app.get('/api/notifications/retry', async (req,res) => {
    const expected = env.CRON_SECRET && `Bearer ${env.CRON_SECRET}`;
    const actual = req.get('authorization') || '';
    if (!expected) return res.status(503).json({ error: 'Retry scheduler is not configured.' });
    if (Buffer.byteLength(actual) !== Buffer.byteLength(expected) || !timingSafeEqual(Buffer.from(actual), Buffer.from(expected))) return res.status(401).json({ error: 'Unauthorized.' });
    if (!ready) return res.status(503).json({ error: 'Storage unavailable.' });
    try { await run({}); res.json({ success: true, message: 'Email retry batch processed.' }); }
    catch { res.status(503).json({ error: 'Email worker unavailable; durable jobs retained.' }); }
  });
  app.use('/api', (req,res) => res.status(404).json({ error: 'API endpoint not found.' }));
  return async (req,res) => {
    try { await connect(env); ready = true; } catch { ready = false; }
    app(req,res);
  };
}
