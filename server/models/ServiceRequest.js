import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  docId: { type: String, required: true },
  title: { type: String, required: true },
  fileName: { type: String, required: true },
  fileType: String,
  fileSize: Number,
  uploadedAt: { type: Date, default: Date.now },
  status: { type: String, default: 'verified' }, // pending, verified, rejected
  downloadUrl: String
}, { _id: false });

const milestoneSchema = new mongoose.Schema({
  step: Number,
  title: String,
  description: String,
  status: { type: String, default: 'pending' }, // completed, in-progress, pending
  completedAt: Date
}, { _id: false });

const schema = new mongoose.Schema({
  referenceNumber: { type: String, required: true, unique: true }, // e.g. DOT-2026-1089
  customerId: String,
  customerEmail: { type: String, required: true, lowercase: true },
  customerName: { type: String, required: true },
  customerPhone: String,
  companyName: String,
  serviceId: { type: String, required: true },
  serviceName: { type: String, required: true },
  categoryName: String,
  status: { 
    type: String, 
    default: 'New',
    enum: ['New', 'Contacted', 'Consultation Scheduled', 'Documents Pending', 'In Progress', 'Completed', 'Rejected']
  },
  currentMilestoneIndex: { type: Number, default: 0 },
  milestones: [milestoneSchema],
  professionalFee: { type: Number, default: 0 },
  govtFee: { type: Number, default: 0 },
  taxes: { type: Number, default: 0 },
  totalFee: { type: Number, default: 0 },
  paymentStatus: { type: String, default: 'Pending', enum: ['Pending', 'Partially Paid', 'Paid', 'Refunded'] },
  assignedCaseOfficer: {
    name: { type: String, default: 'Senior Compliance Officer' },
    email: { type: String, default: 'support@dottangle.com' },
    phone: { type: String, default: '+91 7973574376' }
  },
  documents: [documentSchema],
  customerNotes: String,
  internalNotes: String,
  estimatedCompletionDate: Date
}, { timestamps: true });

schema.index({ customerEmail: 1 });
schema.index({ status: 1 });

export default mongoose.models.ServiceRequest || mongoose.model('ServiceRequest', schema);
