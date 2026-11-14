/**
 * Dottangel Portfolio Projects & Verified Client Websites
 * Authentic data from live web audits and verified client engagements.
 */

export const PORTFOLIO_PROJECTS = [
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
    shortDescription: 'High-converting official exam voucher marketplace listed in Pearson’s Registered Partner Directory. Delivers verified PTE, TOEFL, GRE, and Duolingo vouchers with 10-second automated dispatch, instant score calculators, and Razorpay/UPI gateway integration.',
    overview: 'Apex Vouchers is India’s premier trusted test voucher platform, officially registered and verified in Pearson’s Registered Partner Directory. Built to solve high upfront international testing fees for study-abroad aspirants and students, Apex Vouchers provides genuine, guaranteed valid exam vouchers at India’s lowest pricing. The platform features sub-10-second automated code issuance upon successful checkout, real-time score conversion calculators, and high-trust student verification.',
    objectives: [
      'Offer official PTE Academic, TOEFL iBT, and GRE exam vouchers at guaranteed lowest prices in India (saving ₹2,000+ per exam)',
      'Architect a resilient sub-10-second automated voucher code dispatch engine via Email and SMS',
      'Establish unquestioned student credibility through verified Pearson Registered Partner directory listing',
      'Integrate interactive PTE-to-IELTS score converters and study abroad eligibility tools to drive high organic traffic'
    ],
    features: [
      'Official Pearson Partner Directory accredited partner status and authentic trust seal',
      '10-second automated voucher code generation and encrypted delivery engine',
      'Razorpay & instant UPI QR payment gateway with instant webhook receipt generation',
      'Dynamic Pearson PTE score calculator with instant IELTS band equivalents',
      'Automated SMS & WhatsApp instant code dispatch with 24/7 student booking support',
      'Zero-CLS ultra-fast mobile checkout optimized for high-volume student booking windows'
    ],
    designHighlights: [
      'Modern obsidian dark aesthetic with high-contrast electric indigo and purple gradients',
      'Uncompromising trust badges: Pearson Partner Directory seal, verified student reviews, and SSL encryption',
      'Transparent pricing comparison tables highlighting student savings (e.g. ₹14,999 vs ₹17,000)'
    ],
    technologies: ['Next.js 14', 'React', 'Tailwind CSS', 'Razorpay & Instant UPI', 'Automated Dispatch API', 'Node.js'],
    metrics: [
      { label: 'Automated Dispatch', value: '10 Sec' },
      { label: 'Pearson Directory', value: 'Verified Partner' },
      { label: 'Pricing Advantage', value: '₹2,000+ Off' },
      { label: 'Checkout Success', value: '99.8%' }
    ],
    inHeroStrip: true,
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
    shortDescription: 'Modern, high-converting digital storefront and brand identity for Cardiff\'s premier organic cold-pressed juice and superfood bowl brand.',
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
    featured: true,
    order: 3
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
    featured: true,
    order: 4
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
    featured: true,
    order: 5
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
    shortDescription: 'Interactive, cyberpunk-inspired community portal and hackathon management platform for CT University\'s premier engineering student club.',
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
    featured: true,
    order: 6
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
    featured: true,
    order: 7
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
    shortDescription: 'Luxury culinary showcase, banquet room reservations, and event catering portal for Melbourne\'s premier Indian and Sri Lankan restaurant.',
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
    featured: true,
    order: 8
  }
];

export const PORTFOLIO_CATEGORIES = [
  'All Projects',
  'Featured',
  'eCommerce',
  'Fashion & Boutique',
  'Food & Beverage',
  'Health & Herbal Products',
  'Education & Technology'
];

export function getPortfolioProject(slug) {
  return PORTFOLIO_PROJECTS.find(p => p.slug === slug || p.id === slug) || null;
}

export function filterPortfolioProjects(category) {
  if (!category || category === 'All Projects') return PORTFOLIO_PROJECTS;
  if (category === 'Featured') return PORTFOLIO_PROJECTS.filter(p => p.featured || p.isTopFeatured);
  return PORTFOLIO_PROJECTS.filter(p => 
    p.category === category || 
    (category === 'eCommerce' && (p.category.includes('eCommerce') || p.category === 'Fashion & Boutique'))
  );
}

