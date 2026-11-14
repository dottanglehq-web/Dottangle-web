import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  Receipt, 
  Scale, 
  Award, 
  Coins, 
  Store, 
  Globe, 
  TrendingUp, 
  Cpu, 
  ChevronDown, 
  ArrowRight,
  Calculator,
  Compass,
  FileCheck,
  UserCheck
} from 'lucide-react';
import './NavbarMegaMenu.css';

export default function Navbar({ onOpenAudit }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress((window.scrollY / docHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mega-menu categories for the quick desktop & mobile explorer
  const megaMenuCategories = [
    {
      id: 'business-registration',
      name: 'Business Registration',
      icon: Building2,
      color: '#2563EB',
      bg: 'rgba(37, 99, 235, 0.12)',
      border: 'rgba(37, 99, 235, 0.3)',
      tagline: 'Company, LLP & Startup India incorporation',
      featured: [
        { title: 'Private Limited Company', path: '/services/business-registration/private-limited-company', desc: 'MCA SPICe+ incorporation with DIN, DSC & PAN' },
        { title: 'LLP Registration', path: '/services/business-registration/llp-registration', desc: 'Limited liability with partnership flexibility' },
        { title: 'One Person Company (OPC)', path: '/services/business-registration/opc-registration', desc: '100% corporate identity for solo entrepreneurs' },
        { title: 'Startup India / DPIIT', path: '/services/business-registration/startup-india-registration', desc: '3-year 80-IAC tax holiday & tender benefits' },
        { title: 'MSME Udyam Registration', path: '/services/business-registration/msme-udyam-registration', desc: 'Priority bank lending & delayed payment recourse' },
        { title: 'Annual ROC Compliance', path: '/services/business-registration/annual-company-compliance', desc: 'AOC-4, MGT-7 filings & secretarial audit' }
      ]
    },
    {
      id: 'gst-taxation',
      name: 'GST & Taxation',
      icon: Receipt,
      color: '#059669',
      bg: 'rgba(5, 150, 105, 0.12)',
      border: 'rgba(5, 150, 105, 0.3)',
      tagline: 'Indirect & direct tax compliance and ITR',
      featured: [
        { title: 'GST Registration', path: '/services/gst-taxation/gst-registration', desc: '15-digit GSTIN allotment & state clearance' },
        { title: 'Monthly GST Return Filing', path: '/services/gst-taxation/gst-return-filing', desc: 'GSTR-1 & GSTR-3B monthly compliance' },
        { title: 'GSTR-2B ITC Reconciliation', path: '/services/gst-taxation/gst-reconciliation', desc: 'Eliminate input tax credit purchase mismatches' },
        { title: 'GST Notice Reply Assistance', path: '/services/gst-taxation/gst-notice-assistance', desc: 'Defend scrutiny ASMT-10 & DRC-01 notices' },
        { title: 'Income Tax Return (ITR)', path: '/services/gst-taxation/income-tax-return-filing', desc: 'Corporate, firm and individual tax filings' },
        { title: 'Quarterly TDS Returns', path: '/services/gst-taxation/tds-return-filing', desc: 'Form 24Q & 26Q with Form 16/16A generation' }
      ]
    },
    {
      id: 'accounting-financial',
      name: 'Accounting & Compliance',
      icon: Coins,
      color: '#D97706',
      bg: 'rgba(217, 119, 6, 0.12)',
      border: 'rgba(217, 119, 6, 0.3)',
      tagline: 'Cloud bookkeeping, payroll & statutory audit',
      featured: [
        { title: 'Cloud Bookkeeping (Zoho/Tally)', path: '/services/accounting-financial/bookkeeping', desc: 'Daily ledger entry and bank reconciliation' },
        { title: 'Employee Payroll & Payslips', path: '/services/accounting-financial/payroll-management', desc: 'PF/ESIC/PT deduction & salary processing' },
        { title: 'Financial Statements (Schedule III)', path: '/services/accounting-financial/financial-statement-prep', desc: 'Balance Sheet & P&L adhering to Indian GAAP' },
        { title: 'Statutory Audit Coordination', path: '/services/accounting-financial/audit-coordination', desc: 'Complete working schedules for CA audit sign-off' },
        { title: 'CFO MIS & Cashflow Reporting', path: '/services/accounting-financial/financial-reporting', desc: 'Gross margin, burn rate & runway forecasting' },
        { title: 'Accounting Software Setup', path: '/services/accounting-financial/accounting-software-setup', desc: 'Custom chart of accounts and tax rule sync' }
      ]
    },
    {
      id: 'ecommerce-management',
      name: 'eCommerce Management',
      icon: Store,
      color: '#E11D48',
      bg: 'rgba(225, 29, 72, 0.12)',
      border: 'rgba(225, 29, 72, 0.3)',
      tagline: 'Marketplaces (Amazon/Flipkart) & Shopify D2C',
      featured: [
        { title: 'Amazon Seller Account Management', path: '/services/ecommerce-management/amazon-seller-management', desc: 'Brand Registry, Buy Box ops & FBA logistics' },
        { title: 'Flipkart & Meesho Management', path: '/services/ecommerce-management/flipkart-seller-management', desc: 'Assured badge & promotional growth ops' },
        { title: 'Shopify Store Development', path: '/services/ecommerce-management/shopify-store-development', desc: 'High-speed D2C storefront with Indian PG & shipping' },
        { title: 'Multi-Channel Stock Sync', path: '/services/ecommerce-management/multi-channel-stock-sync', desc: 'Unified inventory across Amazon, Flipkart & store' },
        { title: 'Amazon PPC & Sponsored Ads', path: '/services/ecommerce-management/amazon-ppc-management', desc: 'Profitable ACOS scaling & search term mining' },
        { title: 'Returns & RTO Safe-T Claims', path: '/services/ecommerce-management/returns-refunds-coordination', desc: 'Courier damage claim recovery & RTO reduction' }
      ]
    },
    {
      id: 'web-development',
      name: 'Website & Technology',
      icon: Globe,
      color: '#0284C7',
      bg: 'rgba(2, 132, 199, 0.12)',
      border: 'rgba(2, 132, 199, 0.3)',
      tagline: 'Custom web apps, Next.js & enterprise software',
      featured: [
        { title: 'Custom Web Application Development', path: '/services/web-development/custom-web-dev', desc: 'High-performance React & Next.js platforms' },
        { title: 'Mobile App Development (iOS & Android)', path: '/services/mobile-app-development/cross-platform-dev', desc: 'React Native & Flutter native cross-platform apps' },
        { title: 'Custom CRM & ERP Solutions', path: '/services/custom-software/crm-development', desc: 'Unified departmental operational workflows' },
        { title: 'Cloud Infrastructure & DevOps', path: '/services/cloud-devops/aws-cloud', desc: 'AWS/GCP architectures with automated CI/CD' }
      ]
    },
    {
      id: 'digital-marketing',
      name: 'Digital Marketing & Branding',
      icon: TrendingUp,
      color: '#C026D3',
      bg: 'rgba(192, 38, 211, 0.12)',
      border: 'rgba(192, 38, 211, 0.3)',
      tagline: 'Google SEO, Meta Ads & luxury identity',
      featured: [
        { title: 'Technical SEO & Search Dominance', path: '/services/digital-marketing/seo-dominance', desc: 'Page 1 search rankings & qualified organic leads' },
        { title: 'Meta & Google Ads Engine', path: '/services/digital-marketing/meta-ads', desc: 'High-ROAS paid customer acquisition funnels' },
        { title: 'Brand Identity & Logo Design', path: '/services/graphic-design/brand-identity', desc: 'Luxury typography, colour palettes & brand books' },
        { title: 'Conversion Rate Optimization (CRO)', path: '/services/digital-marketing/cro-optimization', desc: 'Double checkout conversion on existing traffic' }
      ]
    },
    {
      id: 'ai-development',
      name: 'AI & Business Automation',
      icon: Cpu,
      color: '#8B5CF6',
      bg: 'rgba(139, 92, 246, 0.12)',
      border: 'rgba(139, 92, 246, 0.3)',
      tagline: 'Autonomous AI agents, WhatsApp & workflows',
      featured: [
        { title: 'Custom AI Chatbots & RAG', path: '/services/ai-development/custom-ai-chatbots', desc: 'Zero-hallucination support trained on company data' },
        { title: 'WhatsApp Business Automation', path: '/services/ai-development/ai-workflow-automation', desc: 'Automate order tracking, alerts & lead recovery' },
        { title: 'AI CRM & Document Processing', path: '/services/ai-development/ai-document-processing', desc: 'Automatic field extraction & lead prioritization' },
        { title: 'Enterprise Generative AI', path: '/services/ai-development/generative-ai', desc: 'Custom fine-tuned LLMs & multi-agent systems' }
      ]
    }
  ];

  const currentCategory = megaMenuCategories[activeCategoryIndex] || megaMenuCategories[0];

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%`, opacity: scrolled ? 1 : 0 }}
        aria-hidden="true"
      />

      <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`} id="siteHeader">
        <div className="header-container">
          {/* Brand Logo Lockup */}
          <div className="nav-brand-group">
            <Link to="/" className="brand-logo" id="brandLogo" aria-label="Dottangle - Home">
              <img
                src="/dottangle-logo.png"
                srcSet="/dottangle-logo-mobile.png 261w, /dottangle-logo.png 800w"
                sizes="(max-width: 600px) 130px, 160px"
                alt="Dottangle"
                className="brand-lockup-img dottangle-lockup-img"
                width="160"
                height="44"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Home
            </NavLink>

            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              About Us
            </NavLink>

            {/* Services with Mega-Menu Trigger */}
            <div className="nav-item-dropdown">
              <NavLink to="/services" className={({ isActive }) => `nav-link nav-dropdown-trigger ${isActive ? 'active' : ''}`}>
                <span>Services</span>
                <ChevronDown size={14} className="chevron" aria-hidden="true" />
              </NavLink>

              {/* Desktop Mega-Menu Overlay */}
              <div className="desktop-mega-menu" role="region" aria-label="Services Catalog Explorer">
                <div className="mega-menu-inner">
                  {/* Left Column: Categories Navigation */}
                  <div className="mega-categories-nav">
                    {megaMenuCategories.map((cat, idx) => {
                      const Icon = cat.icon;
                      const isSelected = activeCategoryIndex === idx;
                      return (
                        <button
                          key={cat.id}
                          className={`mega-cat-btn ${isSelected ? 'active' : ''}`}
                          onMouseEnter={() => setActiveCategoryIndex(idx)}
                          onClick={() => setActiveCategoryIndex(idx)}
                          type="button"
                          style={{
                            '--cat-accent': cat.color,
                            '--cat-bg': cat.bg,
                            '--cat-border': cat.border
                          }}
                        >
                          <span
                            className="cat-icon"
                            style={{
                              color: cat.color,
                              background: cat.bg,
                              border: `1.5px solid ${cat.border}`,
                              borderRadius: '9px',
                              width: '28px',
                              height: '28px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              boxShadow: isSelected ? `0 2px 10px ${cat.border}` : 'none'
                            }}
                          >
                            <Icon size={16} strokeWidth={2.2} />
                          </span>
                          <span className="cat-btn-label">{cat.name}</span>
                          <span className="cat-arrow">→</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Column: Dynamic Subservices Panel */}
                  <div className="mega-content-panel">
                    <div>
                      <div className="mega-header-info">
                        <div>
                          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: currentCategory.color }} />
                            <span>{currentCategory.name}</span>
                          </h4>
                          <span style={{ fontSize: '0.82rem', color: '#64748b' }}>{currentCategory.tagline}</span>
                        </div>
                        <Link to={`/services/${currentCategory.id}`} className="mega-view-all" style={{ color: currentCategory.color }}>
                          <span>View Full {currentCategory.name} Directory</span>
                          <ArrowRight size={14} />
                        </Link>
                      </div>

                      <div className="mega-subservices-grid">
                        {currentCategory.featured.map((item) => (
                          <Link key={item.title} to={item.path} className="mega-sub-link">
                            <span className="mega-sub-title">
                              <span>{item.title}</span>
                              <span style={{ opacity: 0.5, fontSize: '0.8rem' }}>↗</span>
                            </span>
                            <span className="mega-sub-desc">{item.desc}</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Quick Bar */}
                    <div className="mega-bottom-bar">
                      <span>Interactive Business Tools & Estimators:</span>
                      <div className="mega-bottom-links">
                        <Link to="/tools/cost-calculator">Cost Calculator →</Link>
                        <Link to="/tools/document-checklist">Document Checklist →</Link>
                        <Link to="/tools/track">Application Tracker →</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <NavLink to="/industries" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Industries
            </NavLink>

            <NavLink to="/pricing" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Pricing
            </NavLink>

            <NavLink to="/blog" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Blog & Guides
            </NavLink>

            <NavLink to="/work" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Case Studies
            </NavLink>

            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Contact
            </NavLink>
          </nav>

          {/* Header Action CTAs */}
          <div className="header-actions">
            <Link to="/contact" className="btn-start-project magnetic-btn" id="headerCtaBtn">
              <span className="btn-shine" />
              <span>Get Free Consultation</span>
              <svg className="arrow-icon" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="8" x2="13" y2="8" />
                <polyline points="9 4 13 8 9 12" />
              </svg>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              className={`mobile-menu-toggle ${mobileOpen ? 'is-active' : ''}`}
              onClick={() => setMobileOpen(prev => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Mobile Drawer Backdrop */}
        {mobileOpen && (
          <div
            className="mobile-drawer-backdrop"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile Drawer Navigation */}
        <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`} id="mobileDrawer">
          <nav className="mobile-nav">
            <NavLink to="/" end className="mobile-link" onClick={() => setMobileOpen(false)}>
              Home
            </NavLink>

            <NavLink to="/about" className="mobile-link" onClick={() => setMobileOpen(false)}>
              About Us
            </NavLink>

            {/* Mobile Expandable Services Accordion */}
            <div className="mobile-accordion-group">
              <button
                type="button"
                className="mobile-accordion-toggle mobile-link"
                onClick={() => setMobileServicesOpen(prev => !prev)}
              >
                <span>Services ({megaMenuCategories.length} Categories)</span>
                <ChevronDown size={18} style={{ transform: mobileServicesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {mobileServicesOpen && (
                <div className="mobile-accordion-content">
                  <NavLink to="/services" className="mobile-sub-link" style={{ fontWeight: 700, color: '#ff8c69' }} onClick={() => setMobileOpen(false)}>
                    ✦ Explore All Services Directory →
                  </NavLink>
                  {megaMenuCategories.map(cat => (
                    <div key={cat.id} style={{ marginBottom: '8px' }}>
                      <Link to={`/services/${cat.id}`} className="mobile-sub-cat-title" onClick={() => setMobileOpen(false)}>
                        {cat.name} →
                      </Link>
                      {cat.featured.slice(0, 3).map(item => (
                        <Link key={item.title} to={item.path} className="mobile-sub-link" onClick={() => setMobileOpen(false)}>
                          · {item.title}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/industries" className="mobile-link" onClick={() => setMobileOpen(false)}>
              Industries We Serve
            </NavLink>

            <NavLink to="/pricing" className="mobile-link" onClick={() => setMobileOpen(false)}>
              Pricing & Packages
            </NavLink>

            <NavLink to="/blog" className="mobile-link" onClick={() => setMobileOpen(false)}>
              Blog & Knowledge Centre
            </NavLink>

            <NavLink to="/work" className="mobile-link" onClick={() => setMobileOpen(false)}>
              Case Studies & Portfolio
            </NavLink>

            <NavLink to="/tools" className="mobile-link" onClick={() => setMobileOpen(false)}>
              Business Tools & Calculator
            </NavLink>

            <NavLink to="/admin" className="mobile-link" style={{ opacity: 0.7 }} onClick={() => setMobileOpen(false)}>
              Admin CMS Login
            </NavLink>

            <NavLink to="/contact" className="mobile-link cta-mobile" onClick={() => setMobileOpen(false)}>
              Get Free Consultation →
            </NavLink>
          </nav>
        </div>
      </header>
    </>
  );
}
