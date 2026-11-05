import mongoose from 'mongoose';
import Inquiry from './models/Inquiry.js';
let connecting;
export async function ensureDatabase(env = process.env) {
  const uri = env.MONGO_URI || env.MONGODB_URI;
  if (!uri) throw new Error('Database configuration unavailable');
  if (!connecting) {
    connecting = (async () => {
      if (mongoose.connection.readyState !== 1) await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000, maxPoolSize: 5, waitQueueTimeoutMS: 5000 });
      await Inquiry.init();
    })().catch(error => { connecting = undefined; throw error; });
  }
  await connecting;
  if (mongoose.connection.readyState !== 1) { connecting = undefined; throw new Error('Database unavailable'); }
}
