import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, default: 'global' },
  heroHeadline: { type: String, default: 'Your Complete Business Growth Partner' },
  heroSubheadline: { type: String, default: 'From business registration and legal compliance to eCommerce, technology and digital marketing — everything your business needs under one roof.' },
  experienceYears: { type: String, default: '8+' },
  projectsCompleted: { type: String, default: '150+' },
  clientsServed: { type: String, default: '50+' },
  serviceCategoriesCount: { type: String, default: '10+' },
  phone: { type: String, default: '+91 7973574376' },
  email: { type: String, default: 'dottanglehq@gmail.com' },
  address: { type: String, default: 'Ludhiana, Punjab, India - 141001' },
  announcementText: { type: String, default: 'Accepting New Client Registrations & Growth Projects Worldwide' },
  packages: [{
    id: String,
    name: String,
    tagline: String,
    price: Number,
    originalPrice: Number,
    features: [String],
    isPopular: Boolean
  }]
}, { timestamps: true });

export default mongoose.models.SiteSettings || mongoose.model('SiteSettings', schema);

