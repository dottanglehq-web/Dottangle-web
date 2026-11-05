import 'dotenv/config';
import mongoose from 'mongoose';
import { once } from 'node:events';
import { createApp, processNotifications } from './app.js';
import Inquiry from './models/Inquiry.js';
import { businessEmail, notificationProviders, smtpTransport } from './notifications.js';
// Explicit invocation sends a labeled test inquiry to the configured business destinations.
if (!process.argv.includes('--send')) {
  console.log('Usage: node server/verify-live.js --send (sends admin and customer test emails to the business inbox)');
  process.exit(1);
}
let server;
try {
  await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
  await Inquiry.init();
  console.log('Live MongoDB authentication and inquiry indexes verified.');
  const transport = smtpTransport();
  if (transport) { await transport.verify(); transport.close(); console.log('Live SMTP authentication and TLS verified.'); }
  const env = { ...process.env };
  server = createApp({ env, ready: () => mongoose.connection.readyState === 1 }).listen(0, '127.0.0.1');
  await once(server, 'listening');
  const base = `http://127.0.0.1:${server.address().port}`;
  env.SITE_ORIGIN = base;
  const payload = { name: 'Dot Tangle Integration Test', email: businessEmail, phone: '+917973574376', company: 'Dot Tangle QA', services: ['Website Development'], subject: `Integration verification ${new Date().toISOString()}`, message: 'TEST INQUIRY — automated integration verification authorized by the site owner. This is not a customer lead. Verifies persistence, admin email, customer thank-you email.', website: '' };
  const submit = () => fetch(`${base}/api/inquiries`, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: base }, body: JSON.stringify(payload) });
  const response = await submit();
  const result = await response.json();
  if (response.status !== 201 || !result.success) throw new Error('Submission verification failed');
  console.log(`Live API saved test inquiry: ${result.submissionId}`);
  const duplicate = await submit();
  if (duplicate.status !== 200 || (await duplicate.json()).submissionId !== result.submissionId) throw new Error('Duplicate verification failed');
  console.log('Duplicate HTTP submission returned original ID; no duplicate created.');
  // Restrict the worker to this test; never dispatch unrelated customer jobs during verification.
  const scope = { submissionId: result.submissionId };
  const Model = Object.fromEntries(['updateMany','findOneAndUpdate','updateOne'].map(method => [method, (filter, ...args) => Inquiry[method]({ ...filter, ...scope }, ...args)]));
  await processNotifications({ Model, send: notificationProviders() });
  const item = await Inquiry.findOne(scope);
  for (const channel of ['admin','customer']) console.log(`${channel}: ${item.notifications[channel].status}`);
  console.log('SMTP acceptance is not proof of inbox receipt. Both email test roles use the business inbox; inspect it to confirm receipt and rendering.');
} catch (error) {
  console.error(`Live verification stopped: ${error.name}; code ${typeof error.code === 'string' || typeof error.code === 'number' ? error.code : 'unavailable'}. No credentials logged.`);
  process.exitCode = 1;
} finally {
  if (server) await new Promise(resolve => server.close(resolve));
  await mongoose.disconnect();
}
