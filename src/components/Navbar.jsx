import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

export default function Navbar({ onOpenAudit }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent background scroll when mobile drawer is open
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
            <NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Services
            </NavLink>
            <NavLink to="/work" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Work
            </NavLink>
            <NavLink to="/process" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Process
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Contact
            </NavLink>
          </nav>

          {/* Header Action CTAs */}
          <div className="header-actions">
            <Link to="/contact" className="btn-start-project magnetic-btn" id="headerCtaBtn">
              <span className="btn-shine" />
              <span>Start a Project</span>
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
            <NavLink to="/services" className="mobile-link" onClick={() => setMobileOpen(false)}>
              Services
            </NavLink>
            <NavLink to="/work" className="mobile-link" onClick={() => setMobileOpen(false)}>
              Selected Work
            </NavLink>
            <NavLink to="/process" className="mobile-link" onClick={() => setMobileOpen(false)}>
              Our Process
            </NavLink>
            <NavLink to="/contact" className="mobile-link cta-mobile" onClick={() => setMobileOpen(false)}>
              Start a Project →
            </NavLink>

          </nav>
        </div>
      </header>
    </>
  );
}
