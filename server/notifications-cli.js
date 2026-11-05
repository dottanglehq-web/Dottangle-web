import 'dotenv/config';
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
import mongoose from 'mongoose';
import Inquiry from './models/Inquiry.js';
const [action, submissionId, channel, confirmation] = process.argv.slice(2);
if (!mongoUri) { console.error('Pending Configuration: MONGO_URI'); process.exit(1); }
try {
  await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
  if (action === 'status') {
    const query = submissionId ? { submissionId } : { submissionId: { $exists: true } };
    const items = await Inquiry.find(query).select('submissionId notifications createdAt -_id').sort({ createdAt: -1 }).limit(50).lean();
    console.log(JSON.stringify(items, null, 2));
  } else if (action === 'retry' && submissionId && ['admin','customer'].includes(channel)) {
    const item = await Inquiry.findOne({ submissionId });
    if (!item) throw new Error('Submission not found');
    const state = item.notifications[channel].status;
    if (!['failed','pending_configuration','retry','uncertain'].includes(state)) throw new Error('This job cannot be safely requeued.');
    if (state === 'uncertain' && confirmation !== '--confirmed-not-sent') throw new Error('Reconcile provider logs first; use --confirmed-not-sent only after confirming no delivery.');
    const p=`notifications.${channel}`;
    await Inquiry.updateOne({ submissionId, [`${p}.status`]:state }, { $set:{ [`${p}.status`]:'pending', [`${p}.attempts`]:0, [`${p}.nextAttempt`]:new Date() }, $unset:{ [`${p}.errorCode`]:'', [`${p}.providerId`]:'' } });
    console.log('Job requeued.');
  } else throw new Error('Usage: node server/notifications-cli.js status [submission-id] | retry submission-id admin|customer [--confirmed-not-sent]');
} catch(error) { console.error(error.name === 'MongoServerSelectionError' ? 'Database unavailable.' : error.message); process.exitCode=1; }
finally { await mongoose.disconnect(); }
