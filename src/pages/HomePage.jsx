import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import DigitalServicesSection from '../digital/DigitalServicesSection';
import TrustedBrands from '../components/TrustedBrands';
import PortfolioSection from '../components/portfolio/PortfolioSection';
import PortfolioShowcaseSection from '../components/PortfolioShowcaseSection';
import CustomerReviewsSection from '../components/CustomerReviewsSection';
import HomeBusinessSections from '../components/home/HomeBusinessSections';

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "What makes Dottangle different from traditional agencies?",
      a: "Unlike traditional agencies that pass your project through layers of junior account reps, at Dottangle you work directly with senior designers, engineers, and accredited compliance specialists. We provide an integrated one-stop ecosystem covering business registration, legal filings, eCommerce management, software development, and digital marketing."
    },
    {
      q: "How does Dottangle assist with company incorporation and legal compliance?",
      a: "We offer end-to-end digital assistance for Private Limited, LLP, OPC, Section 8, and GST registration. We coordinate with certified Chartered Accountants, Company Secretaries, and Advocates to draft MOA/AOA, obtain DSC/DIN, secure MCA name approval, and complete statutory filings without physical paperwork."
    },
    {
      q: "Can you manage our complete Amazon, Flipkart and Shopify operations?",
      a: "Yes. Inspired by leading eCommerce management benchmarks, we handle marketplace account launch, optimized product cataloging, Enhanced Brand Content (A+ Content), multi-channel inventory sync, PPC advertising, and daily seller health monitoring to scale your monthly GMV."
    },
    {
      q: "How long does a typical project take from start to launch?",
      a: "Statutory company incorporation typically takes 5 to 10 working days. Marketplace store setup and catalog launch take 7 to 14 days. Custom software platforms and web applications typically launch within 3 to 6 weeks with staging demos."
    },
    {
      q: "Do you use WordPress/templates, or is everything custom coded?",
      a: "Everything is custom crafted and custom coded using modern React and clean CSS. We avoid bloated off-the-shelf templates and heavy plugins. The result is a lightning-fast, secure website that loads in under 1 second and ranks effortlessly on Google."
    },
    {
      q: "How do your pricing and government fees work?",
      a: "We maintain 100% transparent pricing. Professional service fees and government statutory fees (MCA, GST, ROC filings) are clearly itemized with zero hidden fees. You can use our interactive Cost Calculator to view full breakdowns before starting."
    },
    {
      q: "How do we stay in touch and track progress during the build?",
      a: "You get access to our live application tracking system with a real-time reference code (DOT-2026-XXXX). Additionally, we establish direct WhatsApp/Slack communication with your dedicated account manager and engineering team."
    }
  ];

  return (
    <div className="home-page">
      {/* 1. Centered Hero Section with Instant Zero-Delay 3D Work Platform Video Background */}
      <HeroSection />

      {/* 2. Trusted Brands Section */}
      <TrustedBrands />

      {/* 3. Authentic Client Portfolio Showcase ("Our Work Speaks for Itself") */}
      <PortfolioSection />

      {/* 4. Premier Disciplines Showcase (Reference: follishitechsolutions.org) */}
      <PortfolioShowcaseSection />

      {/* 3. Fully interactive smartphone services experience */}
      <DigitalServicesSection />

      {/* 4. Comprehensive Business Services, eCommerce (Datics-inspired), Packages & Tools */}
      <HomeBusinessSections />

      {/* 5. Studio Growth & Expertise Overview (Modelled after Reference) */}
      <section className="section studio-growth-section" id="studio-overview">
        <div className="container">
          <div className="studio-growth-grid">
            {/* Left Column: Visual Studio & Team Mosaic (Slides in from Left) */}
            <div className="studio-visual-mosaic reveal-left">
              {/* Left Tall Card: Designer at Desk */}
              <div className="studio-mosaic-card card-tall glass-card">
                <div className="mosaic-img-box">
                  <img 
                    src="./images/agency-designer.jpg" 
                    alt="Creative Strategy & Engineering Desk" 
                    loading="lazy"
                  />
                  <div className="mosaic-pills-overlay">
                    <span className="mosaic-chip">Creative Strategy</span>
                    <span className="mosaic-chip">Performance Optimization</span>
                    <span className="mosaic-chip">Market Insight</span>
                    <span className="mosaic-chip">Content Excellence</span>
                  </div>
                </div>
              </div>

              {/* Right Subcolumn: Team Collaboration + Experience Stat Card */}
              <div className="studio-mosaic-subcol">
                <div className="studio-mosaic-card card-team glass-card">
                  <img 
                    src="./images/agency-team.jpg" 
                    alt="Dottangle Engineering & Growth Team"
                    loading="lazy"
                  />
                </div>

                <div className="studio-stat-card glass-card">
                  <div className="stat-card-badge">
                    <span className="stat-num gradient-coral-text">8+</span>
                    <span className="stat-label">Years of Experience</span>
                  </div>
                  <p className="stat-desc">
                    8+ years of helping ambitious brands succeed and scale online.
                  </p>
                  <div className="stat-card-icon" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H8M17 7V16" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative & Strategic Positioning (Slides in from Right) */}
            <div className="studio-growth-content reveal-right">
              <div className="section-tag studio-tag">
                <span className="status-dot-pulse"></span>
                <span>OUR SERVICES & EXPERTISE</span>
              </div>

              <h2 className="studio-main-heading">
                Driving brand growth in a <br />
                <span className="serif-italic gradient-coral-text">digital-first world.</span>
              </h2>

              <p className="studio-lead-text">
                Dottangle helps brands thrive in today's digital-first world by blending creativity, strategy, and technology. As a trusted premier Digital Marketing & Web Engineering Agency, we craft impactful digital experiences—from branding and UI/UX to web design and marketing solutions—that engage audiences, strengthen brand identity, and drive measurable growth.
              </p>

              <p className="studio-body-text">
                Every project is thoughtfully designed to be visually compelling, lightning-fast, and strategically aligned, helping businesses stand out and succeed online.
              </p>

              {/* Capability bullet points */}
              <div className="studio-highlights-list">
                <div className="studio-highlight-item">
                  <span className="highlight-check">✓</span>
                  <div>
                    <strong>Direct Senior Team:</strong> Zero middleman account managers; you collaborate directly with senior engineers and growth architects.
                  </div>
                </div>
                <div className="studio-highlight-item">
                  <span className="highlight-check">✓</span>
                  <div>
                    <strong>Full-Funnel Alignment:</strong> Seamlessly connecting custom web engineering, Google SEO dominance, and high-ROAS paid media scaling.
                  </div>
                </div>
              </div>

              <div className="studio-cta-row">
                <Link to="/contact" className="btn btn-primary magnetic-btn studio-contact-btn">
                  <span>Got a project in mind?</span>
                  <span className="arrow">→</span>
                </Link>
                <Link to="/services" className="btn btn-glass studio-explore-btn">
                  <span>Explore Capabilities</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Verified Customer Reviews & Testimonials (Google Reviews Architecture) */}
      <CustomerReviewsSection />

      {/* 8. Interactive FAQ Accordion */}
      <section className="section faq-section" id="faq">
        <div className="container">
          <div className="section-header text-center">
            <div className="section-tag">FREQUENTLY ASKED QUESTIONS</div>
            <h2 className="section-title">
              Clear answers before <span className="serif-italic gradient-coral-text">we begin.</span>
            </h2>
          </div>

          <div style={{ maxWidth: '820px', margin: '36px auto 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqs.map((item, idx) => (
              <div
                key={idx}
                className="faq-item glass-card"
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
              >
                <div className="faq-question-row">
                  <h3 className="faq-question-title">{item.q}</h3>
                  <span className="faq-toggle-icon" style={{ transform: openFaq === idx ? 'rotate(45deg)' : 'none' }}>+</span>
                </div>
                {openFaq === idx && (
                  <div className="faq-answer-content">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Final Launch CTA Banner */}
      <section className="section cta-banner-section">
        <div className="container">
          <div className="cta-banner-card glass-card spotlight-card text-center">
            <div className="status-badge mx-auto">
              <span className="status-dot-pulse"></span>
              <span className="status-text">Accepting New Client Projects · Ludhiana & Worldwide</span>
            </div>
            <h2 className="cta-banner-title">
              Have an idea or an existing business?<br />
              <span className="serif-italic gradient-coral-text">Let's build something people remember.</span>
            </h2>
            <p className="cta-banner-sub mx-auto">
              Tell us about your project, timeline, and goals. We'll share honest feedback, practical recommendations, and an actionable roadmap to get you there.
            </p>
            <div className="cta-banner-actions">
              <Link to="/contact" className="btn btn-primary magnetic-btn">
                <span>Start a Project</span>
                <span className="arrow">→</span>
              </Link>
              <Link to="/services" className="btn btn-glass">
                <span>Explore Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
