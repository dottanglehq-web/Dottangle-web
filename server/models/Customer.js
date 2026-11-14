import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  customerId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  phone: String,
  company: String,
  businessType: String,
  role: { type: String, default: 'client' }, // 'client' or 'admin'
  isVerified: { type: Boolean, default: true },
  lastLogin: Date
}, { timestamps: true });

export default mongoose.models.Customer || mongoose.model('Customer', schema);
