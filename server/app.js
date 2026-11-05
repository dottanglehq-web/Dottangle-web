import { randomUUID, createHash } from 'node:crypto';
import express from 'express';
import rateLimit from 'express-rate-limit';
import Inquiry from './models/Inquiry.js';
import Newsletter from './models/Newsletter.js';
export function validateInquiry(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('Invalid form.');
  const clean = (key, max, min = 0) => {
    const value = body[key] ?? '';
    if (typeof value !== 'string' || /[\u0000-\u0008\u000b-\u001f\u007f]/.test(value)) throw new Error(`Invalid ${key}.`);
    const result = value.trim().normalize('NFC');
    if (result.length < min || result.length > max) throw new Error(`Please check ${key} (${min}–${max} characters).`);
    return result;
  };
  if (body.website) throw new Error('Unable to accept this form.');
  const data = { name: clean('name', 120, 2), email: clean('email', 254, 3).toLowerCase(), phone: clean('phone', 30, 7), company: clean('company', 160), subject: clean('subject', 200, 2), message: clean('message', 4000, 10) };
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email)) throw new Error('Please enter a valid email address.');
  if (!/^\+?[\d ()-]+$/.test(data.phone) || !/^\d{7,15}$/.test(data.phone.replace(/\D/g,''))) throw new Error('Please enter a valid phone number.');
  if (!Array.isArray(body.services) || body.services.length < 1 || body.services.length > 12 || body.services.some(v => typeof v !== 'string' || !v.trim() || v.length > 160 || /[\r\n<>]/.test(v))) throw new Error('Please select a service.');
  data.services = [...new Set(body.services.map(v => v.trim()))].sort();
  if (/[\r\n]/.test(data.name + data.email + data.subject)) throw new Error('Invalid contact details.');
  return data;
}
export function createApp({ Model = Inquiry, ready = () => true, env = process.env, onAccepted } = {}) {
  const app = express();
  app.disable('x-powered-by');
  if (env.TRUST_PROXY_HOPS) app.set('trust proxy', Number(env.TRUST_PROXY_HOPS));
  app.use(express.json({ limit: '32kb' }));
  app.use('/api', (req,res,next) => {
    res.set('Cache-Control','no-store');
    if (req.method === 'POST' && req.get('origin') && req.get('origin') !== env.SITE_ORIGIN) return res.status(403).json({ error: 'Request origin is not allowed.' });
    next();
  });
  const limiter = rateLimit({ windowMs: 15*60*1000, limit: 5, standardHeaders: 'draft-8', legacyHeaders: false, message: { error: 'Too many requests. Please try again in 15 minutes.' } });
  app.get('/api/health', (req,res) => res.status(ready() ? 200 : 503).json({ status: ready() ? 'ready' : 'storage_unavailable', agency: 'Dot Tangle' }));
  app.post('/api/inquiries', limiter, async (req,res) => {
    let data;
    try { data = validateInquiry(req.body); } catch (error) { return res.status(400).json({ error: error.message }); }
    if (!ready()) return res.status(503).json({ error: 'We could not save your inquiry. Please try again shortly.' });
    const dedupeKey = createHash('sha256').update(JSON.stringify(data)).digest('hex');
    try {
      let item; let duplicate = false;
      try { item = await Model.create({ ...data, dedupeKey, submissionId: randomUUID() }); }
      catch (error) { if (error.code !== 11000) throw error; item = await Model.findOne({ dedupeKey }); duplicate = true; }
      if (!item) throw new Error('Storage failure');
      res.status(duplicate ? 200 : 201).json({ success: true, submissionId: item.submissionId, confirmationStatus: item.notifications.customer.status });
      // Scheduling failure must never turn an already persisted inquiry into an HTTP failure.
      try { onAccepted?.(item.submissionId); } catch { console.error('Email scheduling unavailable; durable jobs retained.'); }
    } catch { res.status(503).json({ error: 'We could not save your inquiry. Please try again shortly.' }); }
  });
  app.post('/api/newsletter', limiter, async (req,res) => {
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) || email.length > 254) return res.status(400).json({ error: 'Valid email is required.' });
    if (!ready()) return res.status(503).json({ error: 'Subscription temporarily unavailable.' });
    try { await Newsletter.updateOne({ email }, { $setOnInsert: { email } }, { upsert: true }); res.status(201).json({ success: true }); }
    catch { res.status(503).json({ error: 'Subscription temporarily unavailable.' }); }
  });
  // No public endpoint exposes customer records.
  app.use((err,req,res,next) => res.status(err.status === 413 ? 413 : 400).json({ error: 'Unable to process this request.' }));
  return app;
}
export async function processNotifications({ Model = Inquiry, send, now = new Date(), scope = {}, maxPerChannel = 20, deadline = Infinity }) {
  for (const channel of ['admin','customer']) {
    const p = `notifications.${channel}`;
    // An expired send may have reached the provider. Require reconciliation instead of resending blindly.
    await Model.updateMany({ ...scope, [`${p}.status`]: 'sending', [`${p}.lockedUntil`]: { $lt: now } }, { $set: { [`${p}.status`]: 'uncertain', [`${p}.errorCode`]: 'DELIVERY_RECONCILIATION_REQUIRED' } });
    for (let count = 0; count < maxPerChannel; count++) {
      if (Date.now() >= deadline) return;
      const token = randomUUID();
      const item = await Model.findOneAndUpdate({ ...scope, [`${p}.status`]: { $in: ['pending','retry','pending_configuration'] }, [`${p}.nextAttempt`]: { $lte: now }, [`${p}.attempts`]: { $lt: 8 } }, { $set: { [`${p}.status`]: 'sending', [`${p}.lockToken`]: token, [`${p}.lockedUntil`]: new Date(now.getTime()+120000) }, $inc: { [`${p}.attempts`]: 1 } }, { returnDocument: 'after' });
      if (!item) break;
      let result;
      try { result = { ...await send(item, channel), errorCode: null }; }
      catch (error) {
        const configuration = error.code === 'PENDING_CONFIGURATION';
        const uncertain = ['ETIMEDOUT','ESOCKET','ECONNRESET','ECONNABORTED'].includes(error.code);
        result = { status: configuration ? 'pending_configuration' : uncertain ? 'uncertain' : item.notifications[channel].attempts >= 8 ? 'failed' : 'retry', errorCode: configuration ? 'PENDING_CONFIGURATION' : uncertain ? 'DELIVERY_RECONCILIATION_REQUIRED' : 'PROVIDER_REJECTED', nextAttempt: new Date(now.getTime() + Math.min(3600000, 30000 * 2 ** item.notifications[channel].attempts)) };
        if (configuration) result.attempts = 0;
      }
      await Model.updateOne({ _id: item._id, [`${p}.lockToken`]: token, [`${p}.status`]: 'sending' }, { $set: Object.fromEntries(Object.entries(result).map(([k,v]) => [`${p}.${k}`,v])), $unset: { [`${p}.lockedUntil`]: '', [`${p}.lockToken`]: '' } });
    }
  }
}
