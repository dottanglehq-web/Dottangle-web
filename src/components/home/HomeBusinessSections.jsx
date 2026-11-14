import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Receipt, 
  Scale, 
  Award, 
  Coins, 
  Store, 
  Code2, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Check, 
  ShieldCheck, 
  Zap, 
  ShoppingBag, 
  Layers, 
  Briefcase, 
  Factory, 
  UtensilsCrossed, 
  Cpu, 
  Users, 
  ChevronRight,
  BookOpen
} from 'lucide-react';
import './HomeBusinessSections.css';

export default function HomeBusinessSections() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('/api/blogs?limit=3')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.articles && data.articles.length > 0) {
          setBlogs(data.articles);
        } else {
          // Reliable fallback seed
          setBlogs([
            {
              slug: 'pvt-ltd-vs-llp-guide-2026',
              title: 'Private Limited vs LLP: Complete Incorporation Guide for Founders in 2026',
              category: 'Business Registration',
              readTime: '6 min read',
              publishedAt: '2026-02-15'
            },
            {
              slug: 'amazon-seller-growth-playbook',
              title: 'The 2026 Amazon India Seller Playbook: Scale GMV with Catalog & PPC Mastery',
              category: 'eCommerce Management',
              readTime: '8 min read',
              publishedAt: '2026-02-18'
            },
            {
              slug: 'gst-itc-reconciliation-guide',
              title: 'GSTR-2B Input Tax Credit Reconciliation: Practical Guide to Prevent GST Notices',
              category: 'GST & Taxation',
              readTime: '7 min read',
              publishedAt: '2026-02-22'
            }
          ]);
        }
      })
      .catch(() => {
        setBlogs([
          {
            slug: 'pvt-ltd-vs-llp-guide-2026',
            title: 'Private Limited vs LLP: Complete Incorporation Guide for Founders in 2026',
            category: 'Business Registration',
            readTime: '6 min read',
            publishedAt: '2026-02-15'
          },
          {
            slug: 'amazon-seller-growth-playbook',
            title: 'The 2026 Amazon India Seller Playbook: Scale GMV with Catalog & PPC Mastery',
            category: 'eCommerce Management',
            readTime: '8 min read',
            publishedAt: '2026-02-18'
          },
          {
            slug: 'gst-itc-reconciliation-guide',
            title: 'GSTR-2B Input Tax Credit Reconciliation: Practical Guide to Prevent GST Notices',
            category: 'GST & Taxation',
            readTime: '7 min read',
            publishedAt: '2026-02-22'
          }
        ]);
      });
  }, []);

  const serviceCategoriesOverview = [
    {
      id: 'business-registration',
      name: 'Business Registration',
      icon: <Building2 size={24} />,
      desc: 'Incorporate Private Limited, LLP, OPC, Section 8, and Partnership firms with end-to-end MCA processing.',
      subservices: ['Private Limited Company', 'LLP Registration', 'One Person Company', 'Startup India & MSME'],
      link: '/services/business-registration'
    },
    {
      id: 'gst-taxation',
      name: 'GST & Taxation',
      icon: <Receipt size={24} />,
      desc: 'Seamless GST registration, monthly GSTR-1 & 3B return filing, annual returns, and income tax compliance.',
      subservices: ['GST Registration & Filing', 'GSTR-1 & GSTR-3B', 'GST Notice Assistance', 'Income Tax Filing'],
      link: '/services/gst-taxation'
    },
    {
      id: 'ai-development',
      name: 'AI & Business Automation',
      icon: <Cpu size={24} />,
      desc: 'Autonomous AI agents, customer support bots, automated WhatsApp workflows, and enterprise GenAI models.',
      subservices: ['Custom AI Agents & RAG', 'WhatsApp Business Flows', 'Intelligent Document OCR', 'Process Automation'],
      link: '/services/ai-development'
    },
    {
      id: 'accounting-financial',
      name: 'Accounting & Payroll',
      icon: <Coins size={24} />,
      desc: 'Professional bookkeeping, cloud accounting, TDS management, monthly payroll, and statutory balance sheets.',
      subservices: ['Monthly Bookkeeping', 'Payroll Management', 'TDS & GST Reconciliation', 'Audit Coordination'],
      link: '/services/accounting-financial'
    },
    {
      id: 'ecommerce-management',
      name: 'Complete eCommerce',
      icon: <Store size={24} />,
      desc: 'Full-service Amazon, Flipkart, Meesho and Shopify store setup, cataloging, A+ content, and PPC ads.',
      subservices: ['Amazon Account Management', 'Flipkart Seller Hub', 'Shopify Store Setup', 'Marketplace Ads & PPC'],
      link: '/services/ecommerce-management'
    },
    {
      id: 'web-development',
      name: 'Website & Technology',
      icon: <Code2 size={24} />,
      desc: 'Bespoke web applications, high-performance eCommerce platforms, custom portals, and automated ERP workflows.',
      subservices: ['Custom Web Development', 'React & Next.js Platforms', 'Mobile App Development', 'API Integrations'],
      link: '/services/web-development'
    },
    {
      id: 'performance-marketing',
      name: 'Digital Marketing & Ads',
      icon: <TrendingUp size={24} />,
      desc: 'Data-driven Google SEO, high-ROAS Meta and Google Ads, influencer marketing, and conversion optimization.',
      subservices: ['Technical & Local SEO', 'Google Search & Shopping Ads', 'Meta Performance Marketing', 'Brand Identity Design'],
      link: '/services/performance-marketing'
    }
  ];

  const packages = [
    {
      title: 'Startup Launchpad',
      subtitle: 'Complete legal, registration and banking foundation for early founders.',
      price: '₹7,499',
      period: '+ Govt. Fees',
      featured: false,
      features: [
        'Private Limited Incorporation (MCA)',
        '2 Director DIN & DSC Setup',
        'Company PAN & TAN Allotment',
        'MSME / Udyam Registration',
        'Zero-Balance Corporate Current Account',
        '100% Paperless Digital Filing'
      ],
      link: '/service/pvt-ltd-registration'
    },
    {
      title: 'Complete Compliance Suite',
      subtitle: 'All-inclusive monthly GST, payroll, bookkeeping and annual ROC retainer.',
      price: '₹4,499',
      period: '/ month',
      featured: true,
      features: [
        'Monthly GST Return Filing (GSTR-1, 3B)',
        'Monthly Cloud Bookkeeping & Ledger',
        'Payroll & TDS Management (up to 10 staff)',
        'Quarterly 26AS & 2B Reconciliation',
        'Annual ROC Filing & Financial Reports',
        'Dedicated CA / Senior Accountant'
      ],
      link: '/service/gst-return-filing'
    },
    {
      title: 'eCommerce Growth Accelerator',
      subtitle: 'Datics-inspired full-funnel Amazon, Flipkart & Shopify scaling.',
      price: '₹14,999',
      period: '/ month',
      featured: false,
      features: [
        'Amazon & Flipkart Seller Central Setup',
        '40 Optimized Listings with Keyword SEO',
        'A+ Content (EBC) & Brand Store Design',
        'Marketplace PPC Ads Campaign Setup',
        'Inventory Sync & Account Health Guard',
        'Bi-Weekly Sales & ROAS Performance Reviews'
      ],
      link: '/service/amazon-seller-management'
    }
  ];

  const industries = [
    { icon: <Cpu size={22} />, title: 'Tech Startups & SaaS' },
    { icon: <ShoppingBag size={22} />, title: 'D2C Brands & Retailers' },
    { icon: <Store size={22} />, title: 'Marketplace Sellers' },
    { icon: <Factory size={22} />, title: 'Manufacturers & Exporters' },
    { icon: <UtensilsCrossed size={22} />, title: 'F&B, Food & Cloud Kitchens' },
    { icon: <Briefcase size={22} />, title: 'Professional Firms & Clinics' }
  ];

  const steps = [
    {
      num: '01',
      title: 'Choose a Service',
      desc: 'Browse our catalog of 100+ business registration, legal, eCommerce, tech, and digital marketing services.'
    },
    {
      num: '02',
      title: 'Submit Requirements',
      desc: 'Provide your basic details and required documents digitally via our secure direct upload or dedicated WhatsApp channel.'
    },
    {
      num: '03',
      title: 'Expert Consultation',
      desc: 'Connect 1-on-1 with a qualified Chartered Accountant, Company Secretary, or eCommerce Growth Specialist.'
    },
    {
      num: '04',
      title: 'Filing & Processing',
      desc: 'Our professionals verify and execute government filings (MCA, GSTN, ROC) and platform setups with zero friction.'
    },
    {
      num: '05',
      title: 'Real-time Milestone Tracking',
      desc: 'Monitor each phase of your application in real-time with your unique reference code in our live status tracker.'
    },
    {
      num: '06',
      title: 'Delivery & Ongoing Care',
      desc: 'Receive official statutory certificates, incorporation dossiers, or live eCommerce store assets.'
    }
  ];

  return (
    <>
      {/* SECTION 1: Explore All Services */}
      <section className="hb-section" id="all-services-overview">
        <div className="container">
          <div className="text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="hb-badge-tag">
              <ShieldCheck size={14} /> Full-Stack Business Solutions
            </div>
            <h2 className="hb-section-title">
              Everything Your Business Needs <br />
              <span className="serif-italic gradient-coral-text">Under One Roof.</span>
            </h2>
            <p className="hb-section-subtitle" style={{ margin: '0 auto' }}>
              From legal incorporation and GST filings to marketplace eCommerce scaling, web applications, and paid acquisition — we power your company at every milestone.
            </p>
          </div>

          <div className="hb-services-grid">
            {serviceCategoriesOverview.map(cat => (
              <div key={cat.id} className="hb-service-card">
                <div>
                  <div className="hb-card-icon-wrap">
                    {cat.icon}
                  </div>
                  <h3>{cat.name}</h3>
                  <p>{cat.desc}</p>
                  <ul className="hb-card-subservices">
                    {cat.subservices.map((sub, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={14} />
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to={cat.link} className="hb-card-footer-link">
                  <span>Explore {cat.name}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: Complete eCommerce Management (Datics-Inspired) */}
      <section className="hb-section" id="ecommerce-management-showcase">
        <div className="container">
          <div className="hb-ecommerce-showcase">
            <div className="hb-ecom-header">
              <div>
                <div className="hb-badge-tag">
                  <Store size={14} /> Complete eCommerce Management
                </div>
                <h2 className="hb-section-title" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)' }}>
                  Scale Your Brand on <br />
                  <span className="serif-italic gradient-coral-text">India's Leading Marketplaces.</span>
                </h2>
                <p className="hb-section-subtitle">
                  We handle end-to-end account launch, catalog optimization, A+ content, multi-channel inventory, and high-ROAS PPC advertising on Amazon, Flipkart, Meesho, Myntra, and Shopify.
                </p>
              </div>

              <div>
                <div style={{ marginBottom: '16px', color: '#94A3B8', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Supported Platforms & Channels:
                </div>
                <div className="hb-ecom-platforms">
                  <span className="hb-platform-pill amazon">Amazon India & Global</span>
                  <span className="hb-platform-pill flipkart">Flipkart Seller Hub</span>
                  <span className="hb-platform-pill meesho">Meesho Supplier Panel</span>
                  <span className="hb-platform-pill shopify">Shopify D2C Stores</span>
                  <span className="hb-platform-pill">Myntra Partner Portal</span>
                  <span className="hb-platform-pill">WooCommerce & Custom</span>
                </div>
              </div>
            </div>

            <div className="hb-ecom-pillars-grid">
              <div className="hb-pillar-item">
                <h4><Store size={18} color="var(--coral-400)" /> Marketplace Management</h4>
                <p>Complete account setup, brand registry, daily account health checks, policy compliance, and Buy Box retention.</p>
              </div>
              <div className="hb-pillar-item">
                <h4><Layers size={18} color="var(--coral-400)" /> Catalog & A+ Content</h4>
                <p>High-converting product titles, bullet points, optimized lifestyle infographics, Enhanced Brand Content (EBC) and Brand Stores.</p>
              </div>
              <div className="hb-pillar-item">
                <h4><TrendingUp size={18} color="var(--coral-400)" /> Sponsored Ads & PPC</h4>
                <p>Keyword-targeted Sponsored Products, Sponsored Brands, Sponsored Display, and cross-channel Meta & Google Shopping ads.</p>
              </div>
              <div className="hb-pillar-item">
                <h4><ShieldCheck size={18} color="var(--coral-400)" /> Operations & Inventory</h4>
                <p>Multi-channel stock synchronization, FBA/Easy Ship shipment creation, returns reconciliation, and negative review resolution.</p>
              </div>
            </div>

            <div className="hb-ecom-stats-row">
              <div className="hb-stat-box">
                <div className="hb-stat-num">3.8x</div>
                <div className="hb-stat-label">Average GMV Growth</div>
              </div>
              <div className="hb-stat-box">
                <div className="hb-stat-num">99.4%</div>
                <div className="hb-stat-label">Seller Account Health</div>
              </div>
              <div className="hb-stat-box">
                <div className="hb-stat-num">100+</div>
                <div className="hb-stat-label">Brand Catalogs Managed</div>
              </div>
              <div className="hb-stat-box">
                <div className="hb-stat-num">24/7</div>
                <div className="hb-stat-label">Listing & Price Monitoring</div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link to="/services/ecommerce-management" className="btn btn-primary" style={{ marginRight: '14px' }}>
                <span>Explore eCommerce Services</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn btn-glass">
                <span>Book Marketplace Audit</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: How It Works */}
      <section className="hb-section" id="how-it-works">
        <div className="container">
          <div className="text-center" style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div className="hb-badge-tag">
              <Zap size={14} /> Seamless Digital Workflow
            </div>
            <h2 className="hb-section-title">
              How Dottangel Works for <br />
              <span className="serif-italic gradient-coral-text">Your Business.</span>
            </h2>
            <p className="hb-section-subtitle" style={{ margin: '0 auto' }}>
              Zero legal jargon, zero physical paperwork. Our technology-driven platform coordinates with accredited professionals to process your business requirements seamlessly.
            </p>
          </div>

          <div className="hb-steps-grid">
            {steps.map(step => (
              <div key={step.num} className="hb-step-card">
                <div className="hb-step-number">{step.num}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Business Setup & Growth Packages */}
      <section className="hb-section" id="business-packages">
        <div className="container">
          <div className="text-center" style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div className="hb-badge-tag">
              <Coins size={14} /> Transparent All-Inclusive Packages
            </div>
            <h2 className="hb-section-title">
              Curated Bundles for <br />
              <span className="serif-italic gradient-coral-text">Every Growth Stage.</span>
            </h2>
            <p className="hb-section-subtitle" style={{ margin: '0 auto' }}>
              Transparent pricing with zero hidden fees. Includes professional drafting, filing, and ongoing dedicated advisor support.
            </p>
          </div>

          <div className="hb-packages-grid">
            {packages.map((pkg, idx) => (
              <div key={idx} className={`hb-package-card ${pkg.featured ? 'featured' : ''}`}>
                {pkg.featured && <div className="hb-package-badge">Most Popular</div>}
                <div>
                  <div className="hb-pkg-title">{pkg.title}</div>
                  <div className="hb-pkg-sub">{pkg.subtitle}</div>
                  <div className="hb-pkg-price">
                    <span className="hb-pkg-amount">{pkg.price}</span>
                    <span className="hb-pkg-period">{pkg.period}</span>
                  </div>
                  <ul className="hb-pkg-features">
                    {pkg.features.map((feat, fidx) => (
                      <li key={fidx}>
                        <Check size={16} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to={pkg.link} className={`btn ${pkg.featured ? 'btn-primary' : 'btn-glass'}`} style={{ width: '100%', justifyContent: 'center' }}>
                  <span>Get Started with {pkg.title}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link to="/tools/cost-calculator" className="hb-card-footer-link" style={{ fontSize: '0.95rem' }}>
              <span>Need a custom estimate? Try our interactive Cost Calculator</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5: Industries We Serve */}
      <section className="hb-section" id="industries-we-serve">
        <div className="container">
          <div className="text-center" style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div className="hb-badge-tag">
              <Briefcase size={14} /> Domain Expertise
            </div>
            <h2 className="hb-section-title">
              Industries We Power Across <br />
              <span className="serif-italic gradient-coral-text">India & Globally.</span>
            </h2>
            <p className="hb-section-subtitle" style={{ margin: '0 auto' }}>
              Tailored statutory compliance, marketplace operations, and software engineering for specialized industry sectors.
            </p>
          </div>

          <div className="hb-industries-grid">
            {industries.map((ind, idx) => (
              <div key={idx} className="hb-industry-card">
                <div className="hb-industry-icon">
                  {ind.icon}
                </div>
                <h4 className="hb-industry-title">{ind.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Latest Articles & Knowledge Base */}
      <section className="hb-section" id="knowledge-centre-feed">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '36px' }}>
            <div>
              <div className="hb-badge-tag">
                <BookOpen size={14} /> Knowledge Centre & Guides
              </div>
              <h2 className="hb-section-title" style={{ marginBottom: 0 }}>
                Latest Compliance & Growth <br />
                <span className="serif-italic gradient-coral-text">Insights for Founders.</span>
              </h2>
            </div>
            <Link to="/blog" className="btn btn-glass">
              <span>View All Articles</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {blogs.map((article, idx) => (
              <Link 
                key={article.slug || idx} 
                to={`/blog/${article.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="glass-card" style={{ padding: '28px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'transform 0.25s ease' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--coral-400)', letterSpacing: '0.05em' }}>
                        {article.category || 'Business Guide'}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {article.readTime || '5 min read'}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.18rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.4, marginBottom: '12px' }}>
                      {article.title}
                    </h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--coral-400)', fontSize: '0.88rem', fontWeight: 600, marginTop: '20px' }}>
                    <span>Read Guide</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STATUTORY REGULATORY DISCLAIMER */}
      <section style={{ padding: '24px 0 40px', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.02)', 
            border: '1px solid var(--border-subtle)', 
            borderRadius: 'var(--radius-md)', 
            padding: '20px 24px', 
            fontSize: '0.82rem', 
            color: 'var(--text-muted)',
            lineHeight: 1.6
          }}>
            <strong style={{ color: 'var(--text-body)' }}>Regulatory Compliance & Statutory Disclaimer:</strong> Dottangel (operating under Dottangel Solutions) is a technology-enabled business facilitation and management platform. We are not a law firm and do not directly provide legal or audit opinions. All statutory, legal, accounting, tax filing, and company secretarial services are coordinated with and executed through independent, duly qualified, and certified Chartered Accountants (CAs), Company Secretaries (CSs), and Advocates registered with their respective statutory bodies (ICAI, ICSI, and Bar Council of India).
          </div>
        </div>
      </section>
    </>
  );
}

