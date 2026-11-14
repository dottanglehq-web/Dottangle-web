import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Users, CheckCircle2, ArrowRight, Building2, Globe2, Sparkles, Scale, Cpu, Store } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="about-page" style={{ paddingTop: 'calc(var(--header-height) + 40px)', paddingBottom: '100px' }}>
      <div className="container">
        {/* Hero */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 60px' }}>
          <div className="hb-badge-tag">
            <Building2 size={14} /> Corporate Profile & Mission
          </div>
          <h1 className="blog-title">
            The Growth & Compliance Engine for <br />
            <span className="serif-italic gradient-coral-text">Modern Enterprises.</span>
          </h1>
          <p className="blog-subtitle">
            Dottangel unites business incorporation, statutory legal filings, marketplace eCommerce scaling, bespoke software engineering, and digital growth under a single unified agency standard.
          </p>
        </div>

        {/* Pillars Mosaic */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px', marginBottom: '70px' }}>
          <div className="glass-card" style={{ padding: '36px' }}>
            <div className="hb-card-icon-wrap">
              <Scale size={24} />
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '12px' }}>
              Statutory Excellence
            </h3>
            <p style={{ color: 'var(--text-body)', lineHeight: 1.6, fontSize: '0.95rem' }}>
              We partner with accredited Chartered Accountants, Company Secretaries, and Advocates to ensure rigorous compliance with MCA, GSTN, IP India, and DGFT frameworks without paper delays.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '36px' }}>
            <div className="hb-card-icon-wrap">
              <Store size={24} />
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '12px' }}>
              eCommerce & D2C Growth
            </h3>
            <p style={{ color: 'var(--text-body)', lineHeight: 1.6, fontSize: '0.95rem' }}>
              Inspired by leading benchmark agencies like Datics, we manage end-to-end multi-channel operations across Amazon, Flipkart, Meesho, and custom Shopify platforms to maximize GMV.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '36px' }}>
            <div className="hb-card-icon-wrap">
              <Cpu size={24} />
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '12px' }}>
              Production Engineering
            </h3>
            <p style={{ color: 'var(--text-body)', lineHeight: 1.6, fontSize: '0.95rem' }}>
              Zero off-the-shelf templates. We build custom React web applications, high-performance web systems, cloud backends, and AI workflow automations built for enterprise reliability.
            </p>
          </div>
        </div>

        {/* Trust Stats */}
        <div className="glass-card" style={{ padding: '40px', marginBottom: '70px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--coral-400)', lineHeight: 1 }}>8+</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Years Industry Experience</div>
            </div>
            <div>
              <div style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--coral-400)', lineHeight: 1 }}>100+</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Services Cataloged</div>
            </div>
            <div>
              <div style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--coral-400)', lineHeight: 1 }}>100%</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Paperless Digital Delivery</div>
            </div>
            <div>
              <div style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--coral-400)', lineHeight: 1 }}>24/7</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Client Portal Tracking</div>
            </div>
          </div>
        </div>

        {/* Operational Philosophy */}
        <div style={{ maxWidth: '820px', margin: '0 auto 60px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '20px', textAlign: 'center' }}>
            Our Operating Philosophy
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '24px', borderRadius: '14px', borderLeft: '4px solid var(--coral-500)' }}>
              <strong style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>Radical Fee Transparency</strong>
              <p style={{ margin: '6px 0 0', color: 'var(--text-body)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Government challans, statutory stamp duties, and professional charges are itemized explicitly. We never bill surprise ancillary charges.
              </p>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '24px', borderRadius: '14px', borderLeft: '4px solid #10B981' }}>
              <strong style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>Direct Senior Collaboration</strong>
              <p style={{ margin: '6px 0 0', color: 'var(--text-body)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                You collaborate directly with senior consultants, corporate lawyers, and software architects — not layers of junior support staff.
              </p>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '24px', borderRadius: '14px', borderLeft: '4px solid #38BDF8' }}>
              <strong style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>End-to-End Life Cycle Support</strong>
              <p style={{ margin: '6px 0 0', color: 'var(--text-body)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                From day 1 incorporation to continuous monthly GST, trademark defenses, product cataloging, and acquisition ads, we remain your long-term growth partner.
              </p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="glass-card" style={{ padding: '50px 30px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '14px' }}>
            Ready to Build Your Enterprise with Dottangel?
          </h2>
          <p style={{ color: 'var(--text-body)', maxWidth: '600px', margin: '0 auto 28px' }}>
            Schedule a free 30-minute consultation with our corporate advisors and growth architects.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary">
              <span>Get Free Consultation</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/services" className="btn btn-glass">
              <span>Explore All 100+ Services</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

