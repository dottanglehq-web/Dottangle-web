import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './PortfolioShowcaseSection.css';

/**
 * PortfolioShowcaseSection
 * Inspired by reference website https://follishitechsolutions.org/
 * 
 * Features:
 * - 4 Large interactive showcase cards: Web Development, Digital Marketing, App Development, Custom Branding
 * - Daylight pastel aesthetics (Peach, Lavender, Mint, Sky Blue)
 * - 4-in-a-row spacious desktop grid, responsive 2x2 on tablets, fluid stacked/swipeable on mobile
 * - Dynamic 3D mouse tilt & parallax depth on hover
 * - High-resolution interactive project preview mockups matching reference screenshot
 * - Interactive detail modal dialog with deep-dive specs, deliverables & project outcomes
 * - Smooth scroll-reveal stagger animations
 */
export default function PortfolioShowcaseSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  const portfolioCards = [
    {
      id: 'web-dev',
      category: 'web',
      titleFirst: 'Web',
      titleSecond: 'Development',
      tagline: 'High-Performance Web Architecture',
      badge: '0.4s Fast · 99.8% Speed',
      accentColor: '#F43F5E',
      pastelBg: 'card-peach',
      previewType: 'browser',
      metricLabel: 'Conversion Uplift',
      metricValue: '+340%',
      description: 'Custom React & Next.js architectures, headless CMS & ultra-fast websites engineered to convert visitors into loyal customers.',
      tags: ['React 19', 'Next.js', 'Tailwind', 'SEO Ready'],
      detail: {
        headline: 'Next-Generation Web Platforms for Modern Brands',
        client: 'Luxe Craft & Editorial Studios',
        timeline: '3 Weeks Delivery',
        deliverables: [
          'Sub-second page load speeds globally via Edge CDN',
          'Interactive 3D Three.js & motion animations',
          'Headless CMS integration for effortless content updates',
          'Technical SEO built-in for top Google page-1 rankings'
        ],
        overview: 'We design and develop bespoke digital experiences with meticulous attention to typography, micro-interactions, and conversion psychology. No heavy templates, no code bloat—just pure engineering precision.',
        ctaLink: '/services#web',
        ctaText: 'Start Your Web Project'
      }
    },
    {
      id: 'digital-marketing',
      category: 'marketing',
      titleFirst: 'Digital',
      titleSecond: 'Marketing',
      tagline: 'ROAS-Driven Performance Marketing',
      badge: '5.4x Avg ROAS · Multi-Channel',
      accentColor: '#8B5CF6',
      pastelBg: 'card-lavender',
      previewType: 'marketing-flyer',
      metricLabel: 'Average ROAS',
      metricValue: '5.4x',
      description: 'Full-funnel Meta & Google ads, search engine dominance & viral creative campaigns designed to scale customer acquisition predictably.',
      tags: ['Meta Ads', 'Google Ads', 'SEO Engine', 'Funnel CRO'],
      detail: {
        headline: 'Predictable Growth Engine & High-Converting Campaigns',
        client: 'Miss Pickle Food & Retail Group',
        timeline: 'Ongoing Scaling',
        deliverables: [
          'High-converting ad creative direction & copywriting',
          'Hyper-targeted Meta (Instagram/Facebook) & Google Search campaigns',
          'Automated lead qualification funnels & retargeting matrices',
          'Transparent real-time analytics dashboard & weekly reporting'
        ],
        overview: 'We turn advertising spend into predictable customer revenue. By combining thumb-stopping creative concepts with rigorous data attribution, we consistently scale brands to 5x+ ROAS.',
        ctaLink: '/services#ads',
        ctaText: 'Scale Your Marketing'
      }
    },
    {
      id: 'app-dev',
      category: 'mobile',
      titleFirst: 'App',
      titleSecond: 'Development',
      tagline: 'Native iOS & Android Experiences',
      badge: '120 FPS Native · 4.9★ Rated',
      accentColor: '#10B981',
      pastelBg: 'card-mint',
      previewType: 'mobile-app',
      metricLabel: 'Active Users',
      metricValue: '500K+',
      description: 'Intuitive iOS & Android applications crafted for native speed, tactile haptic feedback, and frictionless user retention.',
      tags: ['React Native', 'iOS & Android', 'Offline Sync', 'Cloud Push'],
      detail: {
        headline: 'Mobile Products That Users Love & Keep Using',
        client: 'Stride Habit & Team Task Suite',
        timeline: '6 Weeks MVP to Launch',
        deliverables: [
          'Cross-platform iOS & Android deployment from a unified codebase',
          'Offline-first synchronization with real-time cloud backup',
          'Biometric authentication, push notifications & in-app purchases',
          'Flawless 120 FPS fluid micro-animations and intuitive gestures'
        ],
        overview: 'From initial concept wireframing to App Store and Google Play launch, we build mobile apps that feel buttery-smooth, load instantly, and turn first-time downloaders into daily active users.',
        ctaLink: '/services#mobile',
        ctaText: 'Build Your Mobile App'
      }
    },
    {
      id: 'custom-branding',
      category: 'branding',
      titleFirst: 'Custom',
      titleSecond: 'Branding',
      tagline: 'Distinctive Visual Identity Systems',
      badge: 'Full Design System · 100% Vector',
      accentColor: '#0284C7',
      pastelBg: 'card-sky',
      previewType: 'branding-poster',
      metricLabel: 'Trademark Ready',
      metricValue: '100%',
      description: 'Iconic brand identities, bespoke logomarks, typography hierarchies, and complete design guidelines that command industry authority.',
      tags: ['Logo Suite', 'Style Guides', 'Packaging', 'Vector Systems'],
      detail: {
        headline: 'Enduring Brand Identities That Demand Attention',
        client: 'Aurora Alpine & Modern Studios',
        timeline: '2 Weeks Identity Sprint',
        deliverables: [
          'Comprehensive brand book: typography, colors, usage rules',
          'Primary, secondary, and responsive favicon/symbol marks',
          'Print-ready collateral, packaging assets & social media design kit',
          'Complete Figma design token library ready for web engineering'
        ],
        overview: 'Your brand is the gut feeling people have about your business. We craft unmistakable visual identities that resonate emotionally, differentiate you from competitors, and scale seamlessly across all touchpoints.',
        ctaLink: '/services#brand',
        ctaText: 'Craft Your Brand Identity'
      }
    }
  ];

  // 3D Card Tilt Effect on Mouse Move
  const handleMouseMove = (e, cardId) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -6; // Max 6 deg
    const rotateY = ((x - centerX) / centerX) * 6;  // Max 6 deg
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <section className="portfolio-showcase-section" id="portfolio">
      {/* Decorative ambient daylight glow elements */}
      <div className="ps-ambient-backdrop" aria-hidden="true">
        <div className="ps-glow-shape ps-glow-peach" />
        <div className="ps-glow-shape ps-glow-lavender" />
        <div className="ps-glow-shape ps-glow-mint" />
        <div className="ps-glow-shape ps-glow-sky" />
      </div>

      <div className="container ps-container">
        {/* Section Header with Daylight Luxury Styling */}
        <div className="ps-header text-center reveal-up">
          <div className="ps-section-badge">
            <span className="ps-badge-dot" />
            <span>PORTFOLIO & CORE DISCIPLINES</span>
          </div>

          <h2 className="ps-main-title">
            Transforming ambitious ideas into <br className="ps-break-desktop" />
            <span className="serif-italic gradient-coral-text">extraordinary digital realities.</span>
          </h2>

          <p className="ps-subhead">
            Explore our four core pillars of expertise—engineered with relentless obsession for craft, speed, visual distinction, and measurable commercial growth.
          </p>
        </div>

        {/* 4 Large Interactive Showcase Cards Grid */}
        <div className="ps-cards-grid">
          {portfolioCards.map((card, index) => (
            <article
              key={card.id}
              className={`ps-card ${card.pastelBg} reveal-up`}
              style={{ '--delay': `${index * 120}ms`, '--accent-color': card.accentColor }}
              onMouseMove={(e) => handleMouseMove(e, card.id)}
              onMouseLeave={handleMouseLeave}
              onClick={() => setSelectedProject(card)}
              tabIndex="0"
              role="button"
              aria-label={`View details for ${card.titleFirst} ${card.titleSecond}`}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedProject(card); }}
            >
              {/* Card Top Header: Title & Interactive Action Arrow */}
              <div className="ps-card-top">
                <h3 className="ps-card-title">
                  <span className="ps-title-regular">{card.titleFirst}</span>{' '}
                  <span className="ps-title-italic serif-italic">{card.titleSecond}</span>
                </h3>

                <button
                  type="button"
                  className="ps-card-arrow-btn"
                  aria-label={`Explore ${card.titleFirst} ${card.titleSecond}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(card);
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </button>
              </div>

              {/* Card Center: High-Quality Interactive Project Preview Mockup */}
              <div className="ps-preview-stage">
                {/* 1. Web Development Browser Showcase Mockup */}
                {card.previewType === 'browser' && (
                  <div className="ps-mockup-browser">
                    <div className="ps-browser-chrome">
                      <div className="ps-chrome-dots">
                        <span className="dot dot-red" />
                        <span className="dot dot-yellow" />
                        <span className="dot dot-green" />
                      </div>
                      <div className="ps-chrome-url">dottangle.com/craft</div>
                    </div>
                    <div className="ps-browser-viewport">
                      <div className="ps-browser-hero">
                        <div className="ps-browser-tagline">FOCUS ON YOUR CRAFT</div>
                        <div className="ps-browser-subtag">LET US TELL YOUR STORY</div>
                      </div>
                      <div className="ps-browser-body">
                        <div className="ps-browser-team-box">
                          <img
                            src="/images/agency-team.jpg"
                            alt="Agency Engineering Team"
                            className="ps-browser-team-img"
                            loading="lazy"
                          />
                        </div>
                        <div className="ps-browser-meta">
                          <span className="ps-browser-pill">Quick intro</span>
                          <p className="ps-browser-p">
                            Bespoke digital architecture built for visionary founders.
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Live Metric Overlay Pill */}
                    <div className="ps-floating-chip chip-web">
                      <span className="ps-chip-pulse" />
                      <span>0.4s Fast · 99.8% Speed</span>
                    </div>
                  </div>
                )}

                {/* 2. Digital Marketing Flyer / Campaign Mockup */}
                {card.previewType === 'marketing-flyer' && (
                  <div className="ps-mockup-flyer">
                    <div className="ps-flyer-waves">
                      <div className="ps-wave wave-1" />
                      <div className="ps-wave wave-2" />
                    </div>
                    <div className="ps-flyer-content">
                      <span className="ps-flyer-kicker">YOU CAN'T GO WRONG WITH OUR</span>
                      <div className="ps-flyer-price-badge">
                        <span className="ps-price-dollar">$15</span>
                        <span className="ps-price-label">LUNCH SPECIALS!</span>
                      </div>
                      <div className="ps-flyer-dish-row">
                        <div className="ps-dish-pill">
                          <span className="ps-dish-icon">🥙</span>
                          <span>FALAFEL</span>
                        </div>
                        <div className="ps-dish-pill">
                          <span className="ps-dish-icon">🥗</span>
                          <span>SALAD</span>
                        </div>
                        <div className="ps-dish-pill">
                          <span className="ps-dish-icon">🥖</span>
                          <span>PITA</span>
                        </div>
                        <div className="ps-dish-pill">
                          <span className="ps-dish-icon">🥤</span>
                          <span>DRINK</span>
                        </div>
                      </div>
                      <div className="ps-flyer-footer">
                        <span className="ps-flyer-stamp">★ VERIFIED ROAS</span>
                        <span className="ps-flyer-url">eatlocal.special.com</span>
                      </div>
                    </div>
                    {/* Live Metric Overlay Pill */}
                    <div className="ps-floating-chip chip-marketing">
                      <span className="ps-chip-pulse" />
                      <span>5.4x ROAS · +340% Sales</span>
                    </div>
                  </div>
                )}

                {/* 3. App Development Smartphone Mockup */}
                {card.previewType === 'mobile-app' && (
                  <div className="ps-mockup-phone">
                    <div className="ps-phone-bezel">
                      <div className="ps-phone-speaker" />
                      <div className="ps-phone-screen">
                        <div className="ps-phone-app-icon">
                          <div className="ps-app-logo-mark" />
                        </div>

                        {/* Floating App Notification Stack */}
                        <div className="ps-app-notifications">
                          <div className="ps-notif-card notif-alerts">
                            <span className="notif-dot" />
                            <span>Alerts · 2 new leads</span>
                          </div>
                          <div className="ps-notif-card notif-msg">
                            <span className="notif-dot dot-green" />
                            <span>Messages · Client approval ready</span>
                          </div>
                          <div className="ps-notif-card notif-tasks is-active">
                            <div className="notif-task-header">
                              <span className="task-badge">Tasks</span>
                              <span className="task-count">3</span>
                            </div>
                            <span className="task-title">Today's Team & Next Sprints</span>
                          </div>
                          <div className="ps-notif-card notif-sub">
                            <span className="notif-dot dot-cyan" />
                            <span>Sprint Onboarding Complete</span>
                          </div>
                        </div>

                        {/* Store Download Action */}
                        <div className="ps-app-cta-box">
                          <button type="button" className="ps-app-dl-btn">
                            Download it now
                          </button>
                          <div className="ps-store-badges">
                            <span className="ps-store-pill">Google Play</span>
                            <span className="ps-store-pill">App Store</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Live Metric Overlay Pill */}
                    <div className="ps-floating-chip chip-app">
                      <span className="ps-chip-pulse" />
                      <span>120 FPS Native · 4.9★</span>
                    </div>
                  </div>
                )}

                {/* 4. Custom Branding Minimalist Design Poster Mockup */}
                {card.previewType === 'branding-poster' && (
                  <div className="ps-mockup-poster">
                    <div className="ps-poster-canvas">
                      <div className="ps-poster-copy">
                        <span className="ps-poster-line-1">we wish you</span>
                        <h4 className="ps-poster-line-2">a merry christmas.</h4>
                      </div>

                      {/* Snowglobe Artistic Vector Graphic */}
                      <div className="ps-poster-graphic">
                        <div className="ps-snowglobe-dome">
                          <div className="ps-globe-snow" />
                          <div className="ps-globe-snowman">
                            <span className="snowman-head" />
                            <span className="snowman-body" />
                          </div>
                        </div>
                        <div className="ps-snowglobe-base" />
                      </div>

                      {/* Brand identity lockup & watermark */}
                      <div className="ps-poster-watermark">
                        <div className="ps-watermark-icon">
                          <span className="wm-bar wm-1" />
                          <span className="wm-bar wm-2" />
                        </div>
                        <span className="ps-watermark-text">dottangle studio · identity system</span>
                      </div>
                    </div>
                    {/* Live Metric Overlay Pill */}
                    <div className="ps-floating-chip chip-branding">
                      <span className="ps-chip-pulse" />
                      <span>Design System · 100% Vector</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Bottom Meta & Interaction */}
              <div className="ps-card-bottom">
                <p className="ps-card-desc">{card.description}</p>

                <div className="ps-tags-row">
                  {card.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="ps-tag-pill">{tag}</span>
                  ))}
                </div>

                <div className="ps-card-action-row">
                  <div className="ps-stat-preview">
                    <span className="ps-stat-num">{card.metricValue}</span>
                    <span className="ps-stat-lbl">{card.metricLabel}</span>
                  </div>

                  <span className="ps-explore-link">
                    <span>Explore Project</span>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="3" y1="8" x2="13" y2="8" />
                      <polyline points="9 4 13 8 9 12" />
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ====================================================================
          Interactive Case Study & Project Detail Modal Dialog
          ==================================================================== */}
      {selectedProject && (
        <div
          className="ps-modal-overlay"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="ps-modal-title"
        >
          <div
            className={`ps-modal-container ${selectedProject.pastelBg}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              className="ps-modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project modal"
            >
              ✕
            </button>

            <div className="ps-modal-body">
              <div className="ps-modal-tag">
                <span className="ps-badge-dot" />
                <span>{selectedProject.tagline}</span>
              </div>

              <h3 id="ps-modal-title" className="ps-modal-title">
                {selectedProject.titleFirst} <span className="serif-italic gradient-coral-text">{selectedProject.titleSecond}</span>
              </h3>

              <p className="ps-modal-lead">{selectedProject.detail.headline}</p>

              <div className="ps-modal-meta-bar">
                <div className="ps-meta-item">
                  <span className="meta-lbl">Client Benchmark</span>
                  <span className="meta-val">{selectedProject.detail.client}</span>
                </div>
                <div className="ps-meta-item">
                  <span className="meta-lbl">Turnaround</span>
                  <span className="meta-val">{selectedProject.detail.timeline}</span>
                </div>
                <div className="ps-meta-item">
                  <span className="meta-lbl">{selectedProject.metricLabel}</span>
                  <span className="meta-val gradient-coral-text">{selectedProject.metricValue}</span>
                </div>
              </div>

              <p className="ps-modal-overview">{selectedProject.detail.overview}</p>

              <div className="ps-deliverables-box">
                <h4 className="ps-deliv-heading">Key Project Deliverables</h4>
                <ul className="ps-deliv-list">
                  {selectedProject.detail.deliverables.map((item, dIdx) => (
                    <li key={dIdx}>
                      <span className="deliv-check">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal Actions */}
              <div className="ps-modal-actions">
                <Link
                  to={selectedProject.detail.ctaLink}
                  className="btn btn-primary magnetic-btn ps-modal-cta"
                  onClick={() => setSelectedProject(null)}
                >
                  <span>{selectedProject.detail.ctaText}</span>
                  <span className="arrow">→</span>
                </Link>

                <Link
                  to="/contact"
                  className="btn btn-glass ps-modal-contact"
                  onClick={() => setSelectedProject(null)}
                >
                  <span>Schedule Strategy Call</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

