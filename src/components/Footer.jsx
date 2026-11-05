import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

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
              A digital design & development studio based in Ludhiana, Punjab. We craft memorable websites, brand identities, and growth strategies for ambitious businesses.
            </p>
          </div>

          <div className="footer-email-col">
            <span className="footer-inquiries-label">NEW BUSINESS INQUIRIES</span>
            <a href="mailto:dottanglehq@gmail.com" className="footer-email-link">
              dottanglehq@gmail.com ↗
            </a>
            <a href="tel:+917973574376" className="footer-phone-link" aria-label="Call Dottangle at +91 7973574376">
              +91 7973574376 ↗
            </a>
          </div>
        </div>

        {/* 3-Column Links Grid */}
        <div className="footer-links-grid footer-links-grid-3col">
          {/* Navigation Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services & Capabilities</Link></li>
              <li><Link to="/work">Selected Client Work</Link></li>
              <li><Link to="/process">Our Process</Link></li>
              <li><Link to="/contact">Start a Project</Link></li>
            </ul>
          </div>

          {/* Capabilities Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Capabilities</h4>
            <ul className="footer-links">
              <li><Link to="/services#web">Web Engineering</Link></li>
              <li><Link to="/services#brand">Brand Identity & Design</Link></li>
              <li><Link to="/services#seo">SEO & Search Visibility</Link></li>
              <li><Link to="/services#ads">Meta & Google Ads Engine</Link></li>
              <li><Link to="/services#ai">AI WhatsApp Automations</Link></li>
              <li><Link to="/services#retainer">Dedicated Growth Retainer</Link></li>
            </ul>
          </div>

          {/* Direct & Social Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Social & Connect</h4>
            <ul className="footer-links">
              <li>
                <a href="https://www.instagram.com/dottangle/" target="_blank" rel="noopener noreferrer">
                  Instagram (@dottangle) ↗
                </a>
              </li>
              <li>
                <a href="tel:+917973574376">
                  Call +91 7973574376 ↗
                </a>
              </li>
              <li>
                <a href="mailto:dottanglehq@gmail.com">
                  dottanglehq@gmail.com ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Back to Top Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © {new Date().getFullYear()} Dottangle · Crafted in Ludhiana, Punjab. Working with ambitious brands worldwide.
          </div>

          <div className="footer-legal-links">
            <Link to="/contact">Privacy Policy</Link>
            <span style={{ color: 'var(--border-subtle, rgba(255,255,255,0.2))' }}>·</span>
            <Link to="/contact">Terms of Engagement</Link>
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
