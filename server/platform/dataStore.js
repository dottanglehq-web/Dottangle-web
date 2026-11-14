import { randomUUID, pbkdf2Sync, randomBytes } from 'node:crypto';
import mongoose from 'mongoose';
import Inquiry from '../models/Inquiry.js';
import Blog from '../models/Blog.js';
import Customer from '../models/Customer.js';
import ServiceRequest from '../models/ServiceRequest.js';
import SiteSettings from '../models/SiteSettings.js';
import ServiceItem from '../models/ServiceItem.js';
import PortfolioProject from '../models/PortfolioProject.js';
import { serviceCategories } from '../../src/data/servicesCatalog.js';
import { archivedServices } from '../../src/data/businessServicesData.js';

// Crypto utilities for lightweight, secure password hashing without external dependencies
export function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password, stored) {
  if (!stored || !stored.includes(':')) return false;
  const [salt, hash] = stored.split(':');
  const check = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return check === hash;
}

// Generate simple HMAC session token
export function createSessionToken(userId, role) {
  const payload = Buffer.from(JSON.stringify({ userId, role, exp: Date.now() + 7 * 24 * 3600 * 1000 })).toString('base64url');
  const sig = pbkdf2Sync(payload, process.env.ADMIN_SECRET || 'dottangle-secret-key-2026', 100, 16, 'sha256').toString('hex');
  return `${payload}.${sig}`;
}

export function verifySessionToken(token) {
  if (!token || !token.includes('.')) return null;
  const [payload, sig] = token.split('.');
  const checkSig = pbkdf2Sync(payload, process.env.ADMIN_SECRET || 'dottangle-secret-key-2026', 100, 16, 'sha256').toString('hex');
  if (sig !== checkSig) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (Date.now() > data.exp) return null;
    return data;
  } catch {
    return null;
  }
}

// Initial In-Memory Seed Storage for fallback resilience
const initialBlogs = [
  {
    slug: 'how-to-register-private-limited-company-india',
    title: 'How to Register a Private Limited Company in India (2026 Step-by-Step Guide)',
    excerpt: 'A complete, legal roadmap to incorporating a Private Limited Company under SPICe+ MCA V3, name approval, capital requirements, and post-incorporation compliances.',
    content: `
# How to Register a Private Limited Company in India (2026 Guide)

Starting a company in India has never been faster, but regulatory rigor under the Ministry of Corporate Affairs (MCA) V3 portal requires meticulous preparation. Whether you are bootstrapping a tech startup or establishing a manufacturing enterprise, a Private Limited Company (Pvt Ltd) remains the gold standard for limited liability, investor credibility, and perpetual succession.

## Why Choose a Private Limited Company?
1. **Limited Liability Protection:** Shareholders are only liable up to the unpaid value of their subscribed shares.
2. **Equity Fundraising:** Venture capital firms and angel investors mandate a Private Limited entity structure for issuing equity or convertible notes (CCPS).
3. **Statutory Credibility:** Customers, banks, and enterprise vendors prefer transacting with an MCA-registered entity having an active Corporate Identification Number (CIN).

## Mandatory Pre-Requisites
- **Minimum 2 Directors & Shareholders** (At least one director must be an Indian resident who spent ≥ 182 days in India).
- **Class 3 Digital Signature Certificate (DSC)** with encryption for all proposed directors.
- **Unique Name Reservation:** Must adhere to Rule 8 of the Companies (Incorporation) Rules, 2014.
- **Registered Office Address:** Utility bill (electricity, water, or gas not older than 2 months) + Rent Agreement + Owner NOC.

## The 5-Step SPICe+ Incorporation Process
1. **Name Reservation (RUN / SPICe+ Part A):** Propose two distinct names reflecting the primary business activity.
2. **SPICe+ Part B Filing:** Simultaneous application for DIN, Incorporation, PAN, TAN, and EPFO/ESIC registrations.
3. **Drafting e-MOA (INC-33) and e-AOA (INC-34):** Codifying company objectives and internal governance articles.
4. **AGILE-PRO-S Submission:** Integrated application for opening the corporate bank account, professional tax registration, and optional GSTIN.
5. **Certificate of Incorporation (COI):** MCA issues the official COI along with CIN, PAN, and TAN within 5–7 business days.

## Post-Incorporation Compliances
Within 180 days of incorporation, the company must file **Form INC-20A (Declaration of Commencement of Business)** confirming that shareholders have deposited their initial paid-up capital into the company bank account.
    `,
    category: 'Company Registration',
    tags: ['Pvt Ltd', 'MCA', 'Incorporation', 'Startup India', 'SPICe+'],
    author: { name: 'Dottangel Secretarial Practice Group', role: 'Corporate Secretarial Team', avatar: '/images/agency-designer.jpg' },
    featuredImage: '/images/agency-team.jpg',
    readingTime: '7 min read',
    views: 420,
    isPublished: true,
    isFeatured: true,
    publishedAt: new Date('2026-10-15'),
    seoTitle: 'How to Register a Private Limited Company in India (2026 Guide)',
    metaDescription: 'Step-by-step guide to Private Limited Company registration in India. SPICe+ MCA V3, name approval, DIN, DSC, and post-incorporation checklist.',
    focusKeywords: ['private limited company registration', 'SPICe+ MCA', 'company incorporation india', 'startup registration'],
    faqs: [
      { question: 'What is the minimum capital required for a Pvt Ltd company?', answer: 'Under the Companies Act, 2013, there is no minimum paid-up capital requirement. You can start with as little as ₹1,000.' },
      { question: 'Can an NRI or foreign national be a director?', answer: 'Yes. NRIs and foreign nationals can be directors and shareholders, provided at least one director on the board is a resident Indian.' },
      { question: 'How long does the entire incorporation take?', answer: 'Once all KYC documents and name reservations are prepared, MCA typically approves the incorporation within 7 to 10 working days.' }
    ],
    relatedServiceId: 'private-limited-company'
  },
  {
    slug: 'gst-registration-and-return-filing-complete-roadmap',
    title: 'GST Registration & Return Filing: The Complete Compliance Roadmap for Indian Businesses',
    excerpt: 'Understand mandatory GST thresholds, interstate supply rules, input tax credit (ITC) reconciliation, and monthly GSTR-1 vs GSTR-3B filing schedules.',
    content: `
# GST Registration & Return Filing: Complete Indian Business Roadmap

The Goods and Services Tax (GST) is the backbone of Indian indirect taxation. Whether you sell physical goods on Amazon or provide digital consulting services across state lines, compliance with the GST regime ensures seamless input tax credit and prevents severe departmental penalties.

## Who Must Register for GST?
1. **Turnover Exceeding Thresholds:** Businesses with annual turnover exceeding ₹40 Lakhs for goods (₹20 Lakhs for special category states) or ₹20 Lakhs for services.
2. **Inter-State Sellers:** Anyone supplying goods or services across state borders, regardless of turnover.
3. **eCommerce Sellers:** Any merchant listing products on Amazon, Flipkart, Meesho, or Shopify.
4. **Casual Taxable Persons & Reverse Charge (RCM):** Entities receiving services liable to reverse charge.

## Key Monthly & Quarterly Returns
- **GSTR-1 (Outward Supplies):** Must be filed by the 11th of every month (or 13th under the QRMP scheme). Documents all sales invoices, credit notes, and HSN codes.
- **GSTR-3B (Summary Return):** Must be filed by the 20th of every month. Calculates total output tax liability, sets off Input Tax Credit (ITC) from GSTR-2B, and settles net cash liability.
- **GSTR-9 & 9C (Annual Return):** Comprehensive annual reconciliation due by December 31st following the financial year.

## Critical Tip: GSTR-2B ITC Matching
Never claim arbitrary ITC in your GSTR-3B. Under Section 16(2)(aa) of the CGST Act, you can only claim ITC that appears in your auto-drafted **GSTR-2B** statement uploaded by your vendors.
    `,
    category: 'GST & Taxation',
    tags: ['GST', 'GSTR-1', 'GSTR-3B', 'Input Tax Credit', 'Taxation'],
    author: { name: 'Dottangel Tax Advisory Desk', role: 'Chartered Indirect Tax Advisors', avatar: '/images/agency-designer.jpg' },
    featuredImage: '/images/editorial-hero.jpg',
    readingTime: '6 min read',
    views: 310,
    isPublished: true,
    isFeatured: true,
    publishedAt: new Date('2026-10-22'),
    seoTitle: 'GST Registration & Return Filing Complete Roadmap',
    metaDescription: 'Complete guide to GST registration thresholds, GSTR-1 and GSTR-3B return schedules, and GSTR-2B input tax credit reconciliation.',
    focusKeywords: ['gst registration india', 'gstr 3b return', 'gstr 1 filing', 'gst input tax credit'],
    faqs: [
      { question: 'Is GST mandatory for selling on Amazon or Flipkart?', answer: 'Yes. Interstate e-commerce supply requires mandatory GST registration irrespective of business turnover.' },
      { question: 'What is the penalty for late GST return filing?', answer: 'Late fees are ₹50 per day (₹20 for nil returns) plus 18% per annum interest on outstanding net cash tax liabilities.' }
    ],
    relatedServiceId: 'gst-registration'
  },
  {
    slug: 'trademark-registration-process-classes-avoiding-objections',
    title: 'How to Register a Trademark in India: Classes, Process, and Avoiding Objections',
    excerpt: 'Protect your brand name, logo, and slogan with the Controller General of Patents, Designs & Trademarks. Learn class classification and legal reply drafting.',
    content: `
# Trademark Registration in India: Securing Your Brand Identity

Your brand name and logo are the most valuable assets of your business. Without a registered trademark, any competitor can copy your brand identity, launch copycat products, and divert your hard-earned customer goodwill.

## The Difference Between ™ and ®
- **™ (Trademark Applied):** You can legally use the ™ symbol immediately upon submitting Form TM-A and receiving your application acknowledgment number.
- **® (Registered Trademark):** You can only use the ® symbol after the Trademark Registry issues the final Certificate of Registration without pending oppositions.

## Understanding the 45 Trademark Classes
- **Classes 1 to 34:** Physical goods (e.g., Class 25 for Clothing, Class 9 for Software & Hardware, Class 3 for Cosmetics).
- **Classes 35 to 45:** Services (e.g., Class 35 for eCommerce & Advertising, Class 42 for Software Development, Class 41 for Education).

## The Registration Lifecycle
1. **Comprehensive Search:** Phonetic and visual similarity search on the IP India database.
2. **Application Filing (TM-A):** Submitting applicant details, user affidavit, logo representation, and class description.
3. **Examination Report (Objection Stage):** The Examiner may raise objections under Section 9 (lack of distinctiveness) or Section 11 (similarity to existing marks). A legal reply must be filed within 30 days.
4. **Journal Publication:** If accepted, the mark is advertised in the official Trademark Journal for 4 months for public opposition.
5. **Registration Certificate:** If no opposition is filed, the digital Certificate of Registration is issued, valid for 10 years.
    `,
    category: 'Trademark & Legal',
    tags: ['Trademark', 'IP India', 'Brand Protection', 'Copyright', 'Legal'],
    author: { name: 'Dottangel Intellectual Property Group', role: 'IP Attorneys & Consultants', avatar: '/images/agency-designer.jpg' },
    featuredImage: '/images/agency-team.jpg',
    readingTime: '5 min read',
    views: 280,
    isPublished: true,
    isFeatured: false,
    publishedAt: new Date('2026-10-28'),
    seoTitle: 'Trademark Registration in India: Classes and Process',
    metaDescription: 'Step-by-step guide to trademark registration in India. Nice classification, TM-A filing, overcoming Section 9 & 11 objections.',
    focusKeywords: ['trademark registration india', 'trademark objection reply', 'trademark classes', 'brand registration'],
    faqs: [
      { question: 'How long is a trademark valid in India?', answer: 'A registered trademark is valid for 10 years from the filing date and can be renewed indefinitely every 10 years via Form TM-R.' },
      { question: 'What is the government fee for trademark registration?', answer: 'The government fee is ₹4,500 for Individuals, Startups, and MSMEs (with Udyam certificate), and ₹9,000 for other commercial companies.' }
    ],
    relatedServiceId: 'trademark-registration'
  },
  {
    slug: 'how-to-start-selling-on-amazon-india-scale-ecommerce',
    title: 'How to Start Selling on Amazon India & Scale to ₹10 Lakhs/Month',
    excerpt: 'Master Amazon Seller Central: GTIN exemption, brand registry, product listing SEO, FBA inventory management, and high-ROAS PPC advertising campaigns.',
    content: `
# How to Start Selling on Amazon India & Scale to ₹10 Lakhs/Month

eCommerce in India is expanding exponentially, and Amazon India represents the largest single marketplace opportunity for manufacturers, D2C brands, and retail traders. However, listing products is not enough—profitable scaling requires rigorous catalogue optimization, Amazon Buy Box dominance, and systematic PPC advertising.

## 1. Setting Up Seller Central & Brand Registry
- Register your Seller Central account with GSTIN, PAN, and active bank account details.
- Secure **Amazon Brand Registry** by connecting your registered or pending trademark (Form TM-A). Brand Registry unlocks A+ Content (EBC), Brand Stores, and Sponsored Brand video ads.

## 2. High-Converting Product Listings
- **Keyword-Rich Titles:** Brand + Material/Model + Key Feature + Size/Color + Category keyword.
- **Bullet Points:** Answer customer objections, highlight certifications, and include secondary keywords.
- **Visuals:** High-resolution white-background main image (≥ 1600x1600 px for zoom), accompanied by 6 lifestyle infographics and scale demonstration photos.

## 3. Fulfillment Strategy: FBA vs Easy Ship
Fulfillment by Amazon (FBA) guarantees the coveted **Prime Badge**, improves Buy Box win rate by over 60%, and offloads customer service and returns processing directly to Amazon fulfillment centers.

## 4. Scaling with Amazon Sponsored Ads (PPC)
- **Auto Campaigns:** Discover high-converting search terms.
- **Exact Match Manual Campaigns:** Scale bids on high-intent buyer keywords with low ACOS (Advertising Cost of Sales).
- **Sponsored Display Ads:** Retarget shoppers who viewed your product or competitor listings without purchasing.
    `,
    category: 'Amazon & Flipkart',
    tags: ['Amazon Seller', 'eCommerce Management', 'Amazon PPC', 'FBA', 'Flipkart'],
    author: { name: 'Dottangel eCommerce Growth Team', role: 'Marketplace Operations Specialists', avatar: '/images/agency-designer.jpg' },
    featuredImage: '/images/editorial-hero.jpg',
    readingTime: '8 min read',
    views: 540,
    isPublished: true,
    isFeatured: true,
    publishedAt: new Date('2026-11-01'),
    seoTitle: 'How to Start Selling on Amazon India & Scale eCommerce',
    metaDescription: 'A practical playbook for selling on Amazon India. Brand Registry, A+ Content, FBA logistics, Buy Box strategy, and Amazon PPC scaling.',
    focusKeywords: ['amazon seller central india', 'amazon fba india', 'amazon ppc advertising', 'ecommerce management india'],
    faqs: [
      { question: 'Do I need a trademark to sell on Amazon?', answer: 'A trademark is not strictly mandatory to sell, but it is required for Amazon Brand Registry, protecting your listings against hijackers and unlocking A+ Content.' },
      { question: 'What is a healthy ACOS in Amazon PPC?', answer: 'A healthy target ACOS (Advertising Cost of Sales) is typically between 15% and 25%, depending on your gross profit margins.' }
    ],
    relatedServiceId: 'amazon-seller-management'
  },
  {
    slug: 'shopify-vs-woocommerce-which-ecommerce-platform-is-best',
    title: 'Shopify vs WooCommerce: The Ultimate eCommerce Platform Comparison',
    excerpt: 'An objective architectural comparison of hosted Shopify vs self-hosted WooCommerce covering scalability, transaction fees, checkout customization, and total cost of ownership.',
    content: `
# Shopify vs WooCommerce: Choosing the Right Engine for Your D2C Brand

Choosing the right eCommerce foundation determines your brand's checkout conversion, hosting overhead, and speed to market. Both Shopify and WooCommerce dominate the global online retail landscape, but they cater to very different operational philosophies.

## Architecture Comparison
- **Shopify:** Fully managed, hosted SaaS platform. Security, PCI compliance, server autoscaling, and payment gateways are handled out-of-the-box.
- **WooCommerce:** Open-source WordPress plugin. Full code and database ownership, self-hosted on your own cloud servers (AWS, DigitalOcean, Cloudways).

## Key Decision Factors
1. **Speed to Market:** Shopify launches in days with minimal technical debt. WooCommerce requires configuring hosting, SSL, caching, and database tuning.
2. **Checkout Conversion:** Shopify’s **Shop Pay** delivers the highest one-click checkout conversion in the industry.
3. **Total Cost of Ownership (TCO):** WooCommerce has no monthly platform subscription or transaction fees, but requires developer maintenance and premium plugin licenses. Shopify charges monthly subscriptions plus transaction fees if not using Shopify Payments.
4. **Custom Integrations & Indian Payment Gateways:** Both platforms integrate seamlessly with Razorpay, Cashfree, Shiprocket, and Bluedart.
    `,
    category: 'Shopify',
    tags: ['Shopify', 'WooCommerce', 'eCommerce', 'Web Development', 'D2C'],
    author: { name: 'Dottangel Engineering Practice', role: 'Fullstack eCommerce Architects', avatar: '/images/agency-designer.jpg' },
    featuredImage: '/images/agency-team.jpg',
    readingTime: '6 min read',
    views: 390,
    isPublished: true,
    isFeatured: false,
    publishedAt: new Date('2026-11-03'),
    seoTitle: 'Shopify vs WooCommerce: Which eCommerce Platform is Best?',
    metaDescription: 'Detailed comparison of Shopify vs WooCommerce for Indian D2C brands. Transaction fees, checkout optimization, hosting, and scalability analyzed.',
    focusKeywords: ['shopify vs woocommerce', 'shopify development india', 'woocommerce store setup', 'd2c ecommerce platform'],
    faqs: [
      { question: 'Can I migrate from WooCommerce to Shopify later?', answer: 'Yes. Product catalogues, customer accounts, and order histories can be migrated seamlessly using automated migration tools.' }
    ],
    relatedServiceId: 'shopify-store-development'
  },
  {
    slug: 'which-business-licences-do-you-need-in-india',
    title: 'Which Business Licences Do You Actually Need to Start a Company in India?',
    excerpt: 'A comprehensive checklist of statutory licences: FSSAI food licence, Shop & Establishment Act, Import Export Code (IEC), ISO, and Trade Licences explained.',
    content: `
# Business Licences in India: Complete Compliance Checklist

Launching a commercial enterprise requires more than company incorporation. Depending on your industry, physical location, and workforce size, you must secure mandatory central, state, and municipal operating licences to operate lawfully.

## 1. Shop & Establishment Act Registration
Mandatory for any commercial office, shop, or physical work premise. Regulates working hours, employee holidays, and wage payment terms under respective state labour departments.

## 2. FSSAI Food Licences (For Food & Beverages)
- **FSSAI Basic Registration:** Annual turnover up to ₹12 Lakhs (petty manufacturers, cloud kitchens, retail food counters).
- **FSSAI State Licence:** Annual turnover between ₹12 Lakhs and ₹20 Crores.
- **FSSAI Central Licence:** Annual turnover > ₹20 Crores, food importers/exporters, or multi-state operating brands.

## 3. Import Export Code (IEC)
Issued by the Directorate General of Foreign Trade (DGFT). Mandatory for any entity importing or exporting commercial goods or cross-border software remittances.

## 4. Municipal Trade Licence
Permit granted by the local municipal corporation to carry out a specific trade or commercial activity within local zoning boundaries.
    `,
    category: 'Licences & Certifications',
    tags: ['FSSAI', 'Shop and Establishment', 'IEC Code', 'Trade Licence', 'Compliance'],
    author: { name: 'Dottangel Regulatory Compliance Team', role: 'Licensing & Statutory Experts', avatar: '/images/agency-designer.jpg' },
    featuredImage: '/images/editorial-hero.jpg',
    readingTime: '7 min read',
    views: 350,
    isPublished: true,
    isFeatured: false,
    publishedAt: new Date('2026-11-04'),
    seoTitle: 'Which Business Licences Do You Need in India?',
    metaDescription: 'Checklist of mandatory business licences in India: FSSAI food licence, Shop & Establishment, DGFT IEC Code, and municipal trade permits.',
    focusKeywords: ['business licences india', 'fssai licence registration', 'shop and establishment act', 'import export code'],
    faqs: [
      { question: 'Does a 100% online software company need a Shop & Establishment licence?', answer: 'In most Indian states, any commercial establishment with an office premise or employees requires Shop & Establishment registration.' }
    ],
    relatedServiceId: 'fssai-registration'
  }
];

// Sample Initial Requests / Inquiries for CRM
const initialInquiries = [
  {
    submissionId: 'INQ-2026-8812',
    name: 'Vikramjit Singh',
    email: 'vikram@punjabtextiles.com',
    phone: '+91 98140 12345',
    company: 'Punjab Textiles & Weaves',
    subject: 'Complete Pvt Ltd Incorporation & Trademark Protection',
    services: ['Private Limited Company Registration', 'Trademark Registration', 'GST Registration'],
    message: 'We are expanding our manufacturing facility and want to incorporate a Private Limited entity with trademark registration for our clothing label.',
    status: 'In Progress',
    assignedTo: 'Sharvan Kumar',
    notes: 'Incorporation documents verified. Name approval RUN application submitted to MCA.',
    createdAt: new Date('2026-11-06T10:30:00Z')
  },
  {
    submissionId: 'INQ-2026-8813',
    name: 'Priya Sharma',
    email: 'priya@organicglow.in',
    phone: '+91 98765 43210',
    company: 'Organic Glow Cosmetics',
    subject: 'Amazon & Flipkart Seller Onboarding + Shopify Store',
    services: ['Amazon Seller Account Management', 'Shopify Store Development', 'FSSAI Registration'],
    message: 'Looking for turnkey eCommerce management across Amazon, Flipkart, and our own custom D2C Shopify store with marketing ads.',
    status: 'Consultation Scheduled',
    assignedTo: 'Amanpreet Kaur',
    notes: 'Consultation call scheduled for Monday at 3:00 PM IST via Google Meet.',
    createdAt: new Date('2026-11-07T14:15:00Z')
  }
];

// Sample Initial Service Requests for Customer Portal
const initialServiceRequests = [
  {
    referenceNumber: 'DOT-2026-1042',
    customerEmail: 'vikram@punjabtextiles.com',
    customerName: 'Vikramjit Singh',
    customerPhone: '+91 98140 12345',
    companyName: 'Punjab Textiles & Weaves',
    serviceId: 'private-limited-company',
    serviceName: 'Private Limited Company Registration',
    categoryName: 'Business Registration Services',
    status: 'In Progress',
    currentMilestoneIndex: 2,
    milestones: [
      { step: 1, title: 'KYC & DSC Preparation', description: 'Class 3 Digital Signatures procured for all proposed directors.', status: 'completed', completedAt: new Date('2026-11-06') },
      { step: 2, title: 'Name Reservation (RUN)', description: 'Company name submitted on MCA V3 Portal and approved.', status: 'completed', completedAt: new Date('2026-11-07') },
      { step: 3, title: 'SPICe+ Part B Filing', description: 'Preparation and submission of SPICe+, e-MOA, e-AOA, and AGILE-PRO-S.', status: 'in-progress' },
      { step: 4, title: 'MCA Scrutiny & Approval', description: 'Review by Central Registration Centre (CRC) officer.', status: 'pending' },
      { step: 5, title: 'Certificate of Incorporation', description: 'Issuance of Certificate of Incorporation with CIN, PAN, and TAN.', status: 'pending' },
      { step: 6, title: 'Bank Account & Post-Setup', description: 'Corporate bank account activation and INC-20A business commencement.', status: 'pending' }
    ],
    professionalFee: 6999,
    govtFee: 1500,
    taxes: 1260,
    totalFee: 9759,
    paymentStatus: 'Paid',
    documents: [
      { docId: 'DOC-1', title: 'Director PAN Cards', fileName: 'pan-cards-directors.pdf', fileType: 'application/pdf', fileSize: 420000, status: 'verified', downloadUrl: '#' },
      { docId: 'DOC-2', title: 'Registered Office Electricity Bill', fileName: 'electricity-bill-office.pdf', fileType: 'application/pdf', fileSize: 680000, status: 'verified', downloadUrl: '#' }
    ],
    customerNotes: 'Please expedite name reservation under Punjab Textiles Pvt Ltd.',
    internalNotes: 'CRC filing ready. Waiting for final DSC signoff.',
    estimatedCompletionDate: new Date('2026-11-15')
  }
];


const initialProjects = [
  {
    id: 'apex-vouchers',
    slug: 'apex-vouchers',
    title: 'Apex Vouchers',
    clientName: 'Apex Vouchers',
    url: 'https://apexvouchers.com/',
    logo: '/brands/apex-vouchers.png',
    screenshot: '/portfolio/apex-vouchers.webp',
    category: 'eCommerce & FinTech',
    industry: 'Official Certification & Exam Voucher Engine',
    location: 'India & Global',
    tagline: 'Guaranteed Lowest Official Exam Vouchers with 10-Second Automated Delivery',
    shortDescription: 'Official exam voucher engine listed in Pearson’s Registered Partner Directory. Delivers discounted PTE, TOEFL, GRE, and Duolingo vouchers with 10-second automated code dispatch.',
    overview: 'Apex Vouchers is India’s premier trusted test voucher platform, officially registered and verified in Pearson’s Registered Partner Directory.',
    objectives: [
      'Offer official exam vouchers at guaranteed lowest prices in India',
      'Sub-10-second automated code issuance',
      'Pearson Partner Directory accreditation and authentic partner seal',
      'Dynamic PTE-to-IELTS score converters'
    ],
    features: [
      'Pearson Partner Directory verification',
      'Sub-10-second automated dispatch',
      'Razorpay & instant UPI QR gateway',
      'PTE score calculator and IELTS band equivalency'
    ],
    designHighlights: [
      'High-trust obsidian noir and electric purple aesthetic',
      'Pearson Partner Directory seal and verified student reviews'
    ],
    technologies: ['Next.js 14', 'React', 'Tailwind CSS', 'Razorpay & UPI', 'Node.js'],
    metrics: [
      { label: 'Automated Dispatch', value: '10 Sec' },
      { label: 'Pearson Directory', value: 'Verified Partner' },
      { label: 'Pricing Advantage', value: '₹2,000+ Off' },
      { label: 'Checkout Success', value: '99.8%' }
    ],
    inHeroStrip: true,
    published: true,
    featured: true,
    isTopFeatured: true,
    order: 1
  },
  {
    id: 'eternal-sips',
    slug: 'eternal-sips',
    title: 'Eternal Sips',
    clientName: 'Eternal Sips UK Ltd',
    url: 'https://eternalsips.com/',
    logo: '/brands/eternal-sips.png',
    screenshot: '/portfolio/eternal-sips.webp',
    category: 'Food & Beverage',
    industry: 'Cold-Pressed Juices, Smoothies & Superfood Harvest Bowls',
    location: 'Cardiff, Wales, United Kingdom',
    tagline: 'Freshness Beyond Time — Pure, Plant-Powered Daily Rituals',
    shortDescription: "Modern, high-converting digital storefront and brand identity for Cardiff's premier organic cold-pressed juice and superfood bowl brand.",
    overview: 'Eternal Sips blends traditional Indian botanical nourishment with contemporary sustainable British lifestyle culture. We engineered an aesthetic, ultra-fast online platform showcasing their cold-pressed juice cleanses, artisanal smoothie rituals, and superfood harvest bowls.',
    objectives: [
      'Showcase 100% natural, raw ingredients with vibrant botanical design',
      'Provide intuitive online menu discovery and instant order tracking',
      'Communicate brand pillars: Longevity, Freshness, Sustainability, and Daily Renewal',
      'Optimize mobile performance for on-the-go lifestyle and wellness orders'
    ],
    features: [
      'Interactive visual menu with dietary filters (Vegan, Gluten-Free, Raw)',
      'Digital order tracking and pickup/delivery dispatch routing',
      'Harvest Bowl customizer (Veda Vitals, Hrida Bliss)',
      'Nutrition transparency labels and allergen information cards',
      'Fast-loading progressive media delivery with zero CLS'
    ],
    designHighlights: [
      'Inviting sage-green and fresh citrus color palette evoking pure vitality',
      'Playful fluid curves, organic micro-interactions, and high-res beverage imagery',
      'Clean typography pairing editorial serifs with modern accessible sans-serifs'
    ],
    technologies: ['React', 'Next.js Architecture', 'Tailwind CSS', 'Vite', 'Responsive Web'],
    metrics: [
      { label: 'Mobile Page Speed', value: '98/100' },
      { label: 'Menu Conversion Rate', value: '+42%' },
      { label: 'Customer Retention', value: '4.9 ★' }
    ],
    inHeroStrip: true,
    published: true,
    featured: true,
    order: 2
  },
  {
    id: 'rangrezz-boutique',
    slug: 'rangrezz-boutique',
    title: 'Rangrezz Boutique',
    clientName: 'Rangrezz Boutique Studio',
    url: 'https://rangrezzboutique.com/',
    logo: '/brands/rangrezz-boutique.png',
    screenshot: '/portfolio/rangrezz-boutique.webp',
    category: 'Fashion & Boutique',
    industry: 'Indian Ethnic Wear, Designer Sarees & Custom Stitching',
    location: 'Vrindavan, Uttar Pradesh, India',
    tagline: 'Festive Indian Elegance & Handcrafted Bridal Couture from Vrindavan',
    shortDescription: 'Luxury ethnic wear eCommerce boutique featuring bridal lehengas, Anarkali suits, custom designer stitching, and sacred Vrindavan Gopi dresses.',
    overview: 'Rangrezz Boutique Studio is a premier traditional fashion house located near ISKCON Temple in Vrindavan. We built an omnichannel eCommerce storefront supporting catalog browsing, bridal consultation booking, and seamless multi-channel checkout.',
    objectives: [
      'Digitize a bespoke physical boutique into an international retail presence',
      'Support pan-India prepaid and Cash on Delivery logistics with automated tracking',
      'Enable direct WhatsApp bridal consultation and custom measurement uploads',
      'Preserve the cultural, spiritual grace and royalty of Vrindavan couture'
    ],
    features: [
      'Rich multi-collection catalog (Gopi Dresses, Lehengas, Sarees, Fabrics)',
      'Integrated Razorpay gateway supporting UPI, Netbanking, Cards & EMI',
      'WhatsApp direct checkout bridge for personalized sizing and fabric selection',
      'Custom measurement form and bespoke bridal stitching schedule booking',
      'Real-time inventory updates and Pan-India delivery tracking'
    ],
    designHighlights: [
      'Regal crimson and warm gold palette reflecting royal heritage and celebration',
      'Intricate arch motifs inspired by sacred temple architecture of Braj',
      'High-detail zoom on hand-embroidery, zardozi work, and textile weaves'
    ],
    technologies: ['eCommerce Platform', 'Razorpay Payments', 'WhatsApp Commerce', 'Tailwind CSS', 'Node.js'],
    metrics: [
      { label: 'Pan-India Reach', value: '28 States' },
      { label: 'Checkout Success', value: '99.2%' },
      { label: 'Catalog Browsing Time', value: '4.8 mins' }
    ],
    inHeroStrip: true,
    published: true,
    featured: true,
    order: 2
  },
  {
    id: 'balaji-nar-singh-herbals',
    slug: 'balaji-nar-singh-herbals',
    title: 'Balaji Nar Singh Herbals',
    clientName: 'Balaji Nar Singh Herbals (BNH)',
    url: 'https://balajinarsingharbels.com/',
    logo: '/brands/balaji-nar-singh-herbals.png',
    screenshot: '/portfolio/balaji-nar-singh-herbals.webp',
    category: 'Health & Herbal Products',
    industry: 'Ayurvedic Botanicals, Raw Herbs & Wholesale Processing',
    location: 'Shivpuri, Madhya Pradesh, India',
    tagline: 'Rooted in Nature, Ready for Global B2B Herbal Commerce',
    shortDescription: 'Comprehensive B2B digital catalog and bulk inquiry management system for an established (1996) bulk trader and processor of Ayurvedic botanicals.',
    overview: 'Balaji Nar Singh Herbals is a trusted processor and exporter of raw natural herbs, medicinal roots (Ashwagandha, Shatavari, Giloy, Gokhru), and botanical extracts. We developed an enterprise B2B portal engineered for pharmaceutical buyers and bulk distributors.',
    objectives: [
      'Modernize legacy trade operations into a high-trust digital wholesale platform',
      'Provide comprehensive technical specifications and purity certifications per herb',
      'Streamline wholesale quote generation and bulk container export inquiries',
      'Showcase sustainable forest sourcing, solar drying, and strict lab testing'
    ],
    features: [
      'Botanical catalog classified by root, leaf, gum, and medicinal extract',
      'Dynamic RFQ (Request for Quotation) generator with MOQ volume tiers',
      'Lab testing Certificate of Analysis (COA) download center',
      'Interactive sourcing map highlighting Central Indian harvest regions',
      'Direct WhatsApp and encrypted inquiry dispatch to sales executives'
    ],
    designHighlights: [
      'Earthy olive, cream, and forest-green palette establishing botanical authenticity',
      'Clean typography with high legibility for botanical nomenclature (Latin binomials)',
      'Macro photography of dried roots, leaves, and processing facilities'
    ],
    technologies: ['Modern Web Architecture', 'B2B RFQ Engine', 'Vite', 'Responsive Design'],
    metrics: [
      { label: 'Global B2B Inquiries', value: '+140%' },
      { label: 'Export Lead Time', value: '-30%' },
      { label: 'Verified Catalog Items', value: '150+' }
    ],
    inHeroStrip: true,
    published: true,
    featured: true,
    order: 3
  },
  {
    id: 'helybely',
    slug: 'helybely',
    title: 'HelyBely',
    clientName: 'HelyBely Naturals',
    url: 'https://helybely.myshopify.com/',
    logo: '/brands/helybely.png',
    screenshot: '/portfolio/helybely.webp',
    category: 'eCommerce',
    industry: 'D2C Personal Care, Alum Crystal Deodorants & Grooming',
    location: 'India',
    tagline: 'Pure Mineral Wellness & All-Day Natural Freshness',
    shortDescription: 'High-conversion Shopify D2C eCommerce store for natural personal care essentials, featuring organic potassium alum deodorant sticks.',
    overview: 'HelyBely is an emerging direct-to-consumer brand transforming daily grooming through natural, chemical-free mineral solutions. We designed and built a mobile-first Shopify storefront optimized for repeat subscribers and fast checkout.',
    objectives: [
      'Build a modern, welcoming D2C shopping experience on Shopify',
      'Educate consumers on the health benefits of potassium alum vs synthetic antiperspirants',
      'Maximize Average Order Value (AOV) through fragrance bundles and multi-packs',
      'Achieve sub-second product load times on mobile 4G/5G connections'
    ],
    features: [
      'Custom Shopify 2.0 theme tailored for skincare and personal wellness',
      'Variant bundle selector (Aloe Vera, Chandan, Charcoal, Rose)',
      '1-Click Express Checkout via UPI, Google Pay, and Cash on Delivery',
      'Verified customer review widgets with before/after lifestyle feedback',
      'Automated post-purchase shipping updates via SMS and WhatsApp'
    ],
    designHighlights: [
      'Clean pastel aesthetics with crisp product lifestyle photography',
      'Engaging ingredient breakdown cards with benefit-focused icons',
      'Frictionless thumb-zone navigation optimized for smartphone shoppers'
    ],
    technologies: ['Shopify Liquid', 'Dawn Framework 2.0', 'JavaScript', 'CSS3 Modules'],
    metrics: [
      { label: 'Mobile Conversion', value: '3.6%' },
      { label: 'Checkout Abandonment', value: '-28%' },
      { label: 'Bundle Uptake', value: '45%' }
    ],
    inHeroStrip: true,
    published: true,
    featured: true,
    order: 4
  },
  {
    id: 'techverse-ct-university',
    slug: 'techverse-ct-university',
    title: 'Techverse CT University',
    clientName: 'CT University School of Engineering & Technology',
    url: 'https://techverse.ctuniversity.in/',
    logo: '/brands/techverse.png',
    screenshot: '/portfolio/techverse-ct-university.webp',
    category: 'Education & Technology',
    industry: 'Academic Tech Club, National Hackathons & Coding Events',
    location: 'Ludhiana, Punjab, India',
    tagline: 'The Ultimate Tech Club Where Innovation Meets Execution',
    shortDescription: "Interactive, cyberpunk-inspired community portal and hackathon management platform for CT University's premier engineering student club.",
    overview: 'TechVerse is the technical flagship club of CT University, hosting national coding competitions, workshops, and the flagship 24-hour "Code Crafter" hackathon. We engineered a dark-mode, high-energy platform for student registrations and team tracking.',
    objectives: [
      'Create an electrifying, modern dark-mode digital presence for student engineers',
      'Manage nationwide team registrations and submissions for "Code Crafter"',
      'Showcase student-built hardware, AI, and web projects with interactive galleries',
      'Bridge the gap between campus developers and industry recruiting partners'
    ],
    features: [
      'Cyberpunk dark-mode interface with animated glow accents and terminal elements',
      'Hackathon registration portal with multi-member team formation and resume uploads',
      'Real-time announcement ticker for upcoming workshops, hiring, and challenges',
      'Interactive student project gallery with live GitHub repository links',
      'Event schedule timeline with calendar ICS export integration'
    ],
    designHighlights: [
      'Neo-digital neon accents (cyan, electric purple, cyber gold) on deep space noir',
      'Fluid particle and subtle canvas background effects with reduced-motion fallbacks',
      'Futuristic typography, badge pills, and glassmorphic telemetry cards'
    ],
    technologies: ['React 18', 'Vite', 'Tailwind CSS', 'Framer Motion', 'REST APIs'],
    metrics: [
      { label: 'Hackathon Signups', value: '1,200+' },
      { label: 'Colleges Represented', value: '45+' },
      { label: 'Student Engagement', value: '10k+ Views' }
    ],
    inHeroStrip: true,
    published: true,
    featured: true,
    order: 5
  },
  {
    id: 'toscaninis',
    slug: 'toscaninis',
    title: "Toscanini's",
    clientName: "Toscanini's European Cafe & Gelateria",
    url: 'https://www.toscaninis.com.au/',
    logo: '/brands/toscaninis.png',
    screenshot: '/portfolio/toscaninis.webp',
    category: 'Food & Beverage',
    industry: 'Italian Café, European Bistro & Artisanal Gelato Bar',
    location: 'Caroline Springs, Victoria, Australia',
    tagline: "Caroline Springs' Best Italian Dining, Coffee & Gelato",
    shortDescription: 'Atmospheric digital dining experience, online menu showcase, and table reservation platform for a celebrated European café in Melbourne.',
    overview: "Toscanini's is a cherished Italian cafe and European dining destination in CS Square, Caroline Springs. We designed a rich, warm web experience showcasing their artisanal wood-fired pizzas, house-made pastas, and famous in-house gelato bar.",
    objectives: [
      'Deliver an appetizing, authentic European dining atmosphere online',
      'Provide responsive, easy-to-read menus across breakfast, lunch, dinner, and gelato',
      'Streamline weekend table bookings and corporate function inquiries',
      'Promote local delivery via UberEats and direct pickup calls'
    ],
    features: [
      'Full digital menu with dietary indicators (Gluten-Free, Vegetarian, Dairy-Free)',
      'Integrated Table Reservation request engine with confirmation SMS',
      'Artisanal gelato flavor counter updated with daily seasonal specials',
      'Function and private event booking inquiry coordinator for large groups',
      'One-tap Google Maps directions and direct click-to-call integration'
    ],
    designHighlights: [
      'Moody charcoal and warm cream palette mirroring bistro interior ambiance',
      'Mouth-watering photography of wood-fired pizzas, lattes, and fresh gelato',
      'Elegant torn-paper border accents and classic serif restaurant branding'
    ],
    technologies: ['WordPress', 'PHP', 'Custom CSS', 'Google Maps API', 'Responsive Web'],
    metrics: [
      { label: 'Table Bookings', value: '+65%' },
      { label: 'Mobile Menu Visits', value: '85%' },
      { label: 'Local Search Rank', value: '#1 in Area' }
    ],
    inHeroStrip: true,
    published: true,
    featured: true,
    order: 6
  },
  {
    id: 'waadiya',
    slug: 'waadiya',
    title: 'Waadiya',
    clientName: 'Waadiya South Asian Cuisine',
    url: 'https://waadiya.com.au/',
    logo: '/brands/waadiya.png',
    screenshot: '/portfolio/waadiya.webp',
    category: 'Food & Beverage',
    industry: 'Authentic Indian & Sri Lankan Fine Dining & Event Venue',
    location: 'Mount Waverley, Victoria, Australia',
    tagline: 'The Home of Authentic Indian and Sri Lankan Coastal Cuisine',
    shortDescription: "Luxury culinary showcase, banquet room reservations, and event catering portal for Melbourne's premier Indian and Sri Lankan restaurant.",
    overview: 'Waadiya is an acclaimed dining destination in Mount Waverley, renowned for royal seafood feasts, Sri Lankan hoppers, kottu roti, and a 90-guest private event hall. We engineered a luxury website celebrating the culinary heritage of South Asia.',
    objectives: [
      'Showcase the unique fusion of authentic Sri Lankan and North Indian flavors',
      'Drive high-ticket banquet hall bookings for weddings, birthdays, and corporate events',
      'Offer intuitive digital table reservations and takeaway ordering links',
      'Highlight their award-winning Royal Seafood Feast and cocktail collection'
    ],
    features: [
      'Full visual food and cocktail menu with spice level and allergen filters',
      'Interactive 90-seat Function Room floor plan and AV equipment package booking',
      'Real-time table reservation system integrated with restaurant management',
      'Signature dish carousel spotlighting the Royal Waadiya Seafood Platter',
      'Mobile-optimized catering quotation and event request workflows'
    ],
    designHighlights: [
      'Deep emerald noir with rich saffron and warm terracotta accents',
      'Editorial South Asian culinary typography and bespoke ornamentations',
      'High-impact full-bleed imagery capturing steam, sizzle, and banquet tables'
    ],
    technologies: ['WordPress Engine', 'Custom Theme', 'Reservation System', 'CSS3', 'SEO Suite'],
    metrics: [
      { label: 'Function Inquiries', value: '3x Growth' },
      { label: 'Average Party Size', value: '18 Guests' },
      { label: 'Weekend Table Fill', value: '100%' }
    ],
    inHeroStrip: true,
    published: true,
    featured: true,
    order: 7
  }
];

// In-Memory state containers for resilient fallback
class DataStore {
  constructor() {
    this.blogs = [...initialBlogs];
    this.portfolioProjects = JSON.parse(JSON.stringify(initialProjects));
    this.inquiries = [...initialInquiries];
    this.serviceRequests = [...initialServiceRequests];
    this.customers = [
      {
        customerId: 'CUST-1001',
        email: 'client@dottangle.com',
        passwordHash: hashPassword('Client@2026!'),
        name: 'Demo Client User',
        phone: '+91 7973574376',
        company: 'Apex Growth Ventures',
        role: 'client'
      },
      {
        customerId: 'ADMIN-001',
        email: 'admin@dottangle.com',
        passwordHash: hashPassword(process.env.ADMIN_PASSWORD || 'Dottangle@2026!'),
        name: 'Dottangle Administrator',
        phone: '+91 7973574376',
        company: 'Dottangle Agency HQ',
        role: 'admin'
      }
    ];
    this.services = [
      ...serviceCategories.map(s => ({ ...s, active: true, archived: false })),
      ...archivedServices.map(s => ({ ...s, active: false, archived: true }))
    ];
    this.siteSettings = {
      heroHeadline: 'Your Complete Business Growth Partner',
      heroSubheadline: 'From business registration and legal compliance to eCommerce, technology and digital marketing — everything your business needs under one roof.',
      experienceYears: '8+',
      projectsCompleted: '150+',
      clientsServed: '50+',
      serviceCategoriesCount: '20 Active Practices',
      phone: '+91 7973574376',
      email: 'dottanglehq@gmail.com',
      address: 'Ludhiana, Punjab, India - 141001',
      announcementText: 'Accepting New Client Registrations & Growth Projects Worldwide',
      heroMarqueeEnabled: true,
      heroMarqueeSpeed: 30,
      whatsappUrl: 'https://wa.me/917973574376',
      instagramUrl: 'https://www.instagram.com/dottangle/',
      facebookUrl: 'https://www.facebook.com/dottangle',
      linkedinUrl: 'https://www.linkedin.com/company/dottangle',
      youtubeUrl: 'https://www.youtube.com/@dottangle'
    };
  }

  isMongoReady() {
    return mongoose.connection.readyState === 1;
  }

  // --- BLOG OPERATIONS ---
  async getBlogs({ category, tag, search, includeUnpublished = false } = {}) {
    if (this.isMongoReady()) {
      try {
        const filter = {};
        if (!includeUnpublished) filter.isPublished = true;
        if (category && category !== 'All') filter.category = category;
        if (tag) filter.tags = tag;
        if (search) {
          filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { excerpt: { $regex: search, $options: 'i' } }
          ];
        }
        return await Blog.find(filter).sort({ publishedAt: -1 }).lean();
      } catch (e) {
        console.warn('Mongo getBlogs fallback to memory store');
      }
    }
    return this.blogs.filter(b => {
      if (!includeUnpublished && !b.isPublished) return false;
      if (category && category !== 'All' && b.category !== category) return false;
      if (tag && (!b.tags || !b.tags.includes(tag))) return false;
      if (search) {
        const q = search.toLowerCase();
        return b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q);
      }
      return true;
    });
  }

  async getBlogBySlug(slug) {
    if (this.isMongoReady()) {
      try {
        const blog = await Blog.findOneAndUpdate({ slug }, { $inc: { views: 1 } }, { new: true }).lean();
        if (blog) return blog;
      } catch (e) {
        console.warn('Mongo getBlogBySlug fallback');
      }
    }
    const b = this.blogs.find(item => item.slug === slug);
    if (b) b.views = (b.views || 0) + 1;
    return b;
  }

  async saveBlog(blogData) {
    if (!blogData.slug) blogData.slug = blogData.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    if (this.isMongoReady()) {
      try {
        return await Blog.findOneAndUpdate(
          { slug: blogData.slug },
          { $set: blogData },
          { upsert: true, new: true }
        ).lean();
      } catch (e) {
        console.warn('Mongo saveBlog fallback');
      }
    }
    const idx = this.blogs.findIndex(b => b.slug === blogData.slug);
    if (idx >= 0) {
      this.blogs[idx] = { ...this.blogs[idx], ...blogData, updatedAt: new Date() };
      return this.blogs[idx];
    }
    const newBlog = { ...blogData, createdAt: new Date(), updatedAt: new Date() };
    this.blogs.unshift(newBlog);
    return newBlog;
  }

  async deleteBlog(slug) {
    if (this.isMongoReady()) {
      try {
        await Blog.deleteOne({ slug });
      } catch (e) {
        console.warn('Mongo deleteBlog fallback');
      }
    }
    this.blogs = this.blogs.filter(b => b.slug !== slug);
    return true;
  }

  // --- INQUIRY / CRM OPERATIONS ---
  async getInquiries({ search, status, limit = 50, skip = 0 } = {}) {
    if (this.isMongoReady()) {
      try {
        const query = {};
        if (status && status !== 'All') query.status = status;
        if (search) {
          query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { company: { $regex: search, $options: 'i' } },
            { submissionId: { $regex: search, $options: 'i' } }
          ];
        }
        const total = await Inquiry.countDocuments(query);
        const items = await Inquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
        return { total, items };
      } catch (e) {
        console.warn('Mongo getInquiries fallback');
      }
    }
    let filtered = [...this.inquiries];
    if (status && status !== 'All') filtered = filtered.filter(i => i.status === status);
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(i => 
        (i.name && i.name.toLowerCase().includes(q)) ||
        (i.email && i.email.toLowerCase().includes(q)) ||
        (i.company && i.company.toLowerCase().includes(q)) ||
        (i.submissionId && i.submissionId.toLowerCase().includes(q))
      );
    }
    return {
      total: filtered.length,
      items: filtered.slice(skip, skip + limit)
    };
  }

  async updateInquiryStatus(submissionId, { status, notes, assignedTo }) {
    if (this.isMongoReady()) {
      try {
        const update = {};
        if (status) update.status = status;
        if (notes !== undefined) update.notes = notes;
        if (assignedTo !== undefined) update.assignedTo = assignedTo;
        return await Inquiry.findOneAndUpdate({ submissionId }, { $set: update }, { new: true }).lean();
      } catch (e) {
        console.warn('Mongo updateInquiry fallback');
      }
    }
    const item = this.inquiries.find(i => i.submissionId === submissionId);
    if (item) {
      if (status) item.status = status;
      if (notes !== undefined) item.notes = notes;
      if (assignedTo !== undefined) item.assignedTo = assignedTo;
      item.updatedAt = new Date();
    }
    return item;
  }

  // --- CUSTOMER & AUTH OPERATIONS ---
  async findCustomerByEmail(email) {
    if (this.isMongoReady()) {
      try {
        const doc = await Customer.findOne({ email: email.toLowerCase() }).lean();
        if (doc) return doc;
      } catch (e) {
        console.warn('Mongo findCustomer fallback');
      }
    }
    return this.customers.find(c => c.email.toLowerCase() === email.toLowerCase()) || null;
  }

  async createCustomer(data) {
    const customerId = `CUST-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCustomer = {
      customerId,
      email: data.email.toLowerCase(),
      passwordHash: hashPassword(data.password),
      name: data.name,
      phone: data.phone || '',
      company: data.company || '',
      role: data.role || 'client'
    };
    if (this.isMongoReady()) {
      try {
        await Customer.create(newCustomer);
      } catch (e) {
        console.warn('Mongo createCustomer fallback');
      }
    }
    this.customers.push(newCustomer);
    return newCustomer;
  }

  // --- SERVICE REQUEST / TRACKING OPERATIONS ---
  async getServiceRequestsForCustomer(email) {
    if (this.isMongoReady()) {
      try {
        return await ServiceRequest.find({ customerEmail: email.toLowerCase() }).sort({ createdAt: -1 }).lean();
      } catch (e) {
        console.warn('Mongo getServiceRequests fallback');
      }
    }
    return this.serviceRequests.filter(r => r.customerEmail.toLowerCase() === email.toLowerCase());
  }

  async getServiceRequestByReference(refNumber) {
    if (this.isMongoReady()) {
      try {
        const item = await ServiceRequest.findOne({ referenceNumber: refNumber }).lean();
        if (item) return item;
      } catch (e) {
        console.warn('Mongo getServiceRequestByReference fallback');
      }
    }
    return this.serviceRequests.find(r => r.referenceNumber.toUpperCase() === refNumber.toUpperCase()) || null;
  }

  async createServiceRequest(data) {
    const referenceNumber = `DOT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRequest = {
      referenceNumber,
      customerId: data.customerId || '',
      customerEmail: data.customerEmail.toLowerCase(),
      customerName: data.customerName,
      customerPhone: data.customerPhone || '',
      companyName: data.companyName || '',
      serviceId: data.serviceId,
      serviceName: data.serviceName,
      categoryName: data.categoryName || 'Business Services',
      status: 'New',
      currentMilestoneIndex: 0,
      milestones: [
        { step: 1, title: 'Requirements & Document Collection', description: 'Initial review of business details and required KYC proof.', status: 'in-progress' },
        { step: 2, title: 'Eligibility & Conflict Scrutiny', description: 'Internal verification against regulatory checklists.', status: 'pending' },
        { step: 3, title: 'Government Portal Submission', description: 'Statutory form filing on official MCA/GST/IP India systems.', status: 'pending' },
        { step: 4, title: 'Department Scrutiny & Processing', description: 'Officer examination and compliance confirmation.', status: 'pending' },
        { step: 5, title: 'Final Approval & Certificate Issuance', description: 'Issuance of registration certificate or licence.', status: 'pending' },
        { step: 6, title: 'Post-Approval Setup & Handover', description: 'Delivery of all documentation, logins, and operational guide.', status: 'pending' }
      ],
      professionalFee: data.professionalFee || 4999,
      govtFee: data.govtFee || 1000,
      taxes: Math.round((data.professionalFee || 4999) * 0.18),
      totalFee: (data.professionalFee || 4999) + (data.govtFee || 1000) + Math.round((data.professionalFee || 4999) * 0.18),
      paymentStatus: 'Pending',
      documents: data.documents || [],
      customerNotes: data.customerNotes || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    if (this.isMongoReady()) {
      try {
        await ServiceRequest.create(newRequest);
      } catch (e) {
        console.warn('Mongo createServiceRequest fallback');
      }
    }
    this.serviceRequests.unshift(newRequest);
    return newRequest;
  }

  // --- SETTINGS OPERATIONS ---
  async getSettings() {
    if (this.isMongoReady()) {
      try {
        const settings = await SiteSettings.findOne({ key: 'global' }).lean();
        if (settings) return settings;
      } catch (e) {
        console.warn('Mongo getSettings fallback');
      }
    }
    return this.siteSettings;
  }

  // --- SERVICE MANAGEMENT OPERATIONS ---
  async getServices({ includeArchived = false } = {}) {
    if (!includeArchived) {
      return this.services.filter(s => s.active !== false && !s.archived);
    }
    return this.services;
  }

  async getServiceById(id) {
    return this.services.find(s => s.id === id) || null;
  }

  async updateService(id, data) {
    const idx = this.services.findIndex(s => s.id === id);
    if (idx !== -1) {
      this.services[idx] = { ...this.services[idx], ...data, updatedAt: new Date() };
      return this.services[idx];
    }
    return null;
  }

  async createService(data) {
    const newService = {
      id: data.id || `practice-${Date.now()}`,
      name: data.name,
      shortName: data.shortName || data.name,
      tagline: data.tagline || '',
      description: data.description || '',
      iconName: data.iconName || 'Cpu',
      badge: data.badge || 'Practice Area',
      active: data.active !== false,
      archived: false,
      subServices: data.subServices || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.services.push(newService);
    return newService;
  }

  // --- PORTFOLIO OPERATIONS ---
  async getPortfolioProjects({ category, includeUnpublished = false } = {}) {
    if (this.isMongoReady()) {
      try {
        const filter = {};
        if (!includeUnpublished) filter.published = { $ne: false };
        if (category && category !== 'All Projects' && category !== 'Business Websites') {
          filter.category = category;
        }
        const items = await PortfolioProject.find(filter).sort({ order: 1, createdAt: -1 }).lean();
        if (items && items.length > 0) return items;
      } catch (e) {
        console.warn('Mongo getPortfolioProjects fallback to memory store');
      }
    }
    return this.portfolioProjects.filter(p => {
      if (!includeUnpublished && p.published === false) return false;
      if (category && category !== 'All Projects' && category !== 'Business Websites') {
        if (category === 'eCommerce') return p.category === 'eCommerce' || p.category === 'Fashion & Boutique';
        return p.category === category;
      }
      return true;
    }).sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async getPortfolioProjectBySlug(slug) {
    if (this.isMongoReady()) {
      try {
        const item = await PortfolioProject.findOne({ $or: [{ slug }, { id: slug }] }).lean();
        if (item) return item;
      } catch (e) {
        console.warn('Mongo getPortfolioProjectBySlug fallback');
      }
    }
    return this.portfolioProjects.find(p => p.slug === slug || p.id === slug) || null;
  }

  async createPortfolioProject(data) {
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newProject = {
      id: slug,
      slug,
      title: data.title,
      clientName: data.clientName || '',
      url: data.url,
      logo: data.logo,
      screenshot: data.screenshot,
      category: data.category || 'eCommerce',
      industry: data.industry || '',
      location: data.location || '',
      tagline: data.tagline || '',
      shortDescription: data.shortDescription || '',
      overview: data.overview || '',
      objectives: Array.isArray(data.objectives) ? data.objectives : [],
      features: Array.isArray(data.features) ? data.features : [],
      designHighlights: Array.isArray(data.designHighlights) ? data.designHighlights : [],
      technologies: Array.isArray(data.technologies) ? data.technologies : [],
      metrics: Array.isArray(data.metrics) ? data.metrics : [],
      inHeroStrip: data.inHeroStrip !== false,
      published: data.published !== false,
      featured: data.featured !== false,
      order: Number(data.order) || this.portfolioProjects.length + 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    if (this.isMongoReady()) {
      try {
        await PortfolioProject.create(newProject);
      } catch (e) {
        console.warn('Mongo createPortfolioProject fallback');
      }
    }
    this.portfolioProjects.push(newProject);
    return newProject;
  }

  async updatePortfolioProject(idOrSlug, data) {
    if (this.isMongoReady()) {
      try {
        const updated = await PortfolioProject.findOneAndUpdate(
          { $or: [{ id: idOrSlug }, { slug: idOrSlug }] },
          { $set: { ...data, updatedAt: new Date() } },
          { new: true }
        ).lean();
        if (updated) return updated;
      } catch (e) {
        console.warn('Mongo updatePortfolioProject fallback');
      }
    }
    const idx = this.portfolioProjects.findIndex(p => p.id === idOrSlug || p.slug === idOrSlug);
    if (idx !== -1) {
      this.portfolioProjects[idx] = { ...this.portfolioProjects[idx], ...data, updatedAt: new Date() };
      return this.portfolioProjects[idx];
    }
    return null;
  }

  async deletePortfolioProject(idOrSlug) {
    if (this.isMongoReady()) {
      try {
        await PortfolioProject.deleteOne({ $or: [{ id: idOrSlug }, { slug: idOrSlug }] });
      } catch (e) {
        console.warn('Mongo deletePortfolioProject fallback');
      }
    }
    const beforeLen = this.portfolioProjects.length;
    this.portfolioProjects = this.portfolioProjects.filter(p => p.id !== idOrSlug && p.slug !== idOrSlug);
    return this.portfolioProjects.length < beforeLen;
  }

  async updateSettings(data) {
    if (this.isMongoReady()) {
      try {
        return await SiteSettings.findOneAndUpdate({ key: 'global' }, { $set: data }, { upsert: true, new: true }).lean();
      } catch (e) {
        console.warn('Mongo updateSettings fallback');
      }
    }
    this.siteSettings = { ...this.siteSettings, ...data };
    return this.siteSettings;
  }
}

export const platformStore = new DataStore();

