import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { ShieldCheck, Scale, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { SocialIcon } from './services/ServiceIcons';

export default function Footer() {
  const { theme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer" id="footer">
      <div className="container">
        {/* Top Highlight Row */}
        <div className="footer-top-row">
          <div className="footer-brand-col">
            <Link to="/" className="brand-logo" aria-label="Dottangle - Home">
              <img
                src="/dottangle-logo-white.png"
                srcSet="/dottangle-logo-mobile-white.png 261w, /dottangle-logo-white.png 800w"
                sizes="(max-width: 600px) 130px, 185px"
                alt="Dottangle"
                className="brand-lockup-img footer-lockup-img dottangle-lockup-img"
                width="170"
                height="46"
              />
            </Link>
            <p className="footer-tagline">
              Your Complete Business Growth Partner. From company registration and legal compliance to complete marketplace eCommerce management, technology and digital growth.
            </p>
          </div>

          <div className="footer-email-col">
            <span className="footer-inquiries-label">NEW BUSINESS & CONSULTATION</span>
            <a href="mailto:dottanglehq@gmail.com" className="footer-email-link">
              dottanglehq@gmail.com ↗
            </a>
            <a href="tel:+917973574376" className="footer-phone-link" aria-label="Call Dottangle at +91 7973574376">
              +91 7973574376 ↗
            </a>
          </div>
        </div>

        {/* 4-Column Links Grid */}
        <div className="footer-links-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', margin: '40px 0' }}>
          {/* Navigation Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Main Platform</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">All Services (100+)</Link></li>
              <li><Link to="/industries">Industries We Serve</Link></li>
              <li><Link to="/pricing">Pricing & Packages</Link></li>
              <li><Link to="/blog">Blog & Knowledge Centre</Link></li>
              <li><Link to="/work">Portfolio & Case Studies</Link></li>
              <li><Link to="/contact">Get Free Consultation</Link></li>
            </ul>
          </div>

          {/* Core Business Services Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Core Services</h4>
            <ul className="footer-links">
              <li><Link to="/services/business-registration">Company Incorporation</Link></li>
              <li><Link to="/services/gst-taxation">GST Registration & Filing</Link></li>
              <li><Link to="/services/accounting-financial">Accounting & Payroll</Link></li>
              <li><Link to="/services/ecommerce-management">eCommerce Management</Link></li>
              <li><Link to="/services/web-development">Web & App Engineering</Link></li>
              <li><Link to="/services/digital-marketing">Digital Marketing & Growth</Link></li>
              <li><Link to="/services/ai-development">AI & Intelligent Automation</Link></li>
            </ul>
          </div>

          {/* Business Tools & Portals */}
          <div className="footer-col">
            <h4 className="footer-col-title">Tools & Client Access</h4>
            <ul className="footer-links">
              <li><Link to="/tools/cost-calculator">Service Cost Calculator</Link></li>
              <li><Link to="/tools/document-checklist">Document Checklist</Link></li>
              <li><Link to="/tools/eligibility-checker">Eligibility Audit Tool</Link></li>
              <li><Link to="/tools/track">Live Application Tracker</Link></li>
              <li><Link to="/portfolio">Featured Portfolio (8)</Link></li>
              <li><Link to="/admin">Admin CMS & CRM</Link></li>
            </ul>
          </div>

          {/* Direct & Social Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Connect & Direct</h4>
            <ul className="footer-links footer-social-links">
              <li>
                <a
                  href="https://wa.me/917973574376"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-pill footer-social-wa"
                  aria-label="Chat on WhatsApp"
                >
                  <SocialIcon platform="whatsapp" size={18} />
                  <span>+91 7973574376</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Statutory Regulatory Disclaimer Box */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '18px 22px',
          margin: '30px 0 20px',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          lineHeight: 1.6
        }}>
          <strong style={{ color: 'var(--text-body)' }}>Regulatory Compliance Notice:</strong> Dottangel (operating under Dottangel Solutions) is a technology-enabled business facilitation and management platform. We are not a law firm. All statutory, legal, accounting, tax filing, and company secretarial services are coordinated with and executed through independent, duly qualified, and certified Chartered Accountants (CAs), Company Secretaries (CSs), and Advocates registered with their respective statutory bodies (ICAI, ICSI, and Bar Council of India).
        </div>

        {/* Bottom Legal & Back to Top Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © {new Date().getFullYear()} Dottangle · Crafted in Ludhiana, Punjab. Empowering ambitious businesses across India and worldwide.
          </div>

          <div className="footer-legal-links">
            <Link to="/privacy">Privacy Policy</Link>
            <span style={{ color: 'var(--border-subtle, rgba(255,255,255,0.2))' }}>·</span>
            <Link to="/terms">Terms of Engagement</Link>
            <span style={{ color: 'var(--border-subtle, rgba(255,255,255,0.2))' }}>·</span>
            <Link to="/refund-policy">Refund Policy</Link>
          </div>

          <button
            type="button"
            className="footer-back-to-top-btn"
            id="backToTopBtn"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <span style={{ fontSize: '0.9rem' }}>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
