import 'dotenv/config';
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
import mongoose from 'mongoose';
import express from 'express';
import { fileURLToPath } from 'node:url';
import Inquiry from './models/Inquiry.js';
import { createApp, processNotifications } from './app.js';
import { notificationProviders } from './notifications.js';
let indexed = false;
let connecting = false;
const ready = () => indexed && mongoose.connection.readyState === 1;
async function connectDatabase() {
  if (connecting || ready() || !mongoUri) return;
  connecting = true;
  try {
    if (mongoose.connection.readyState === 0) await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    await Inquiry.init(); indexed = true;
  } catch { console.error('Database unavailable. Submissions will not be accepted.'); }
  finally { connecting = false; }
}
await connectDatabase();
if (!mongoUri) console.warn('MONGO_URI pending configuration. Submissions will not be accepted.');
const send = notificationProviders();
const app = createApp({ ready });
app.use(express.static(fileURLToPath(new URL('../dist', import.meta.url))));
app.get('/{*path}', (req,res) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'Not found.' });
  res.sendFile(fileURLToPath(new URL('../dist/index.html', import.meta.url)));
});
let running = false;
async function tick() {
  if (!ready()) { await connectDatabase(); return; }
  if (running) return;
  running = true;
  try {
    await processNotifications({ send });
  } catch { console.error('Notification worker/storage unavailable; durable jobs retained.'); }
  finally { running = false; }
}
const interval = setInterval(tick, 5000);
const server = app.listen(process.env.PORT || 5000, () => { console.log('Dot Tangle server started'); tick(); });
for (const signal of ['SIGINT','SIGTERM']) process.on(signal, () => { clearInterval(interval); server.close(async () => { while (running) await new Promise(r => setTimeout(r,100)); await mongoose.disconnect(); process.exit(0); }); });
