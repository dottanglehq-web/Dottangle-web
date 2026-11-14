import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  serviceId: { type: String, required: true, unique: true },
  categoryId: { type: String, required: true },
  title: { type: String, required: true },
  shortDesc: { type: String, required: true },
  overview: String,
  audience: String,
  professionalFee: { type: Number, default: 0 },
  govtFee: { type: Number, default: 0 },
  timeline: { type: String, default: '5-7 Working Days' },
  deliverables: [String],
  documentsRequired: [String],
  eligibility: [String],
  process: [String],
  faqs: [{ question: String, answer: String }],
  isPublished: { type: Boolean, default: true }
}, { timestamps: true });

schema.index({ categoryId: 1 });

export default mongoose.models.ServiceItem || mongoose.model('ServiceItem', schema);
