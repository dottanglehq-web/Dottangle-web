import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
}, { _id: false });

const schema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  tags: [String],
  author: {
    name: { type: String, default: 'Dottangel Advisory Team' },
    role: { type: String, default: 'Corporate & Growth Strategist' },
    avatar: { type: String, default: '/images/agency-designer.jpg' }
  },
  featuredImage: { type: String, default: '/images/editorial-hero.jpg' },
  readingTime: { type: String, default: '6 min read' },
  views: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  publishedAt: { type: Date, default: Date.now },
  seoTitle: String,
  metaDescription: String,
  focusKeywords: [String],
  faqs: [faqSchema],
  relatedServiceId: String
}, { timestamps: true });

schema.index({ category: 1 });
schema.index({ isPublished: 1 });

export default mongoose.models.Blog || mongoose.model('Blog', schema);
