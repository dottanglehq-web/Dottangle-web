import mongoose from 'mongoose';
const delivery = new mongoose.Schema({
  status: { type: String, default: 'pending' }, attempts: { type: Number, default: 0 },
  nextAttempt: { type: Date, default: Date.now }, providerId: String, errorCode: String,
  lockedUntil: Date, lockToken: String
}, { _id: false });
const schema = new mongoose.Schema({
  submissionId: { type: String, required: true },
  dedupeKey: { type: String, required: true },
  name: String, email: String, phone: String, company: String, subject: String,
  services: [String], message: String,
  status: { type: String, default: 'new' },
  notifications: { admin: { type: delivery, default: () => ({}) }, customer: { type: delivery, default: () => ({}) } }
}, { timestamps: true });
schema.index({ submissionId: 1 }, { unique: true, partialFilterExpression: { submissionId: { $type: 'string' } } });
schema.index({ dedupeKey: 1 }, { unique: true, partialFilterExpression: { dedupeKey: { $type: 'string' } } });
export default mongoose.models.Inquiry || mongoose.model('Inquiry', schema);
