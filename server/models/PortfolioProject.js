import mongoose from 'mongoose';

const PortfolioProjectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  clientName: { type: String, default: '' },
  url: { type: String, required: true },
  logo: { type: String, required: true },
  screenshot: { type: String, required: true },
  category: { type: String, required: true },
  industry: { type: String, default: '' },
  location: { type: String, default: '' },
  tagline: { type: String, default: '' },
  shortDescription: { type: String, required: true },
  overview: { type: String, default: '' },
  objectives: [{ type: String }],
  features: [{ type: String }],
  designHighlights: [{ type: String }],
  technologies: [{ type: String }],
  metrics: [{
    label: { type: String },
    value: { type: String }
  }],
  inHeroStrip: { type: Boolean, default: true },
  published: { type: Boolean, default: true },
  featured: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.PortfolioProject || mongoose.model('PortfolioProject', PortfolioProjectSchema);

