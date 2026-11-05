import React from 'react';
import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  const socialLinks = [
    {
      name: 'Instagram',
      handle: '@theobligue',
      url: 'https://www.instagram.com/theobligue/',
      iconClass: 'icon-ig',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      name: 'Call Dot Tangle',
      handle: '+91 7973574376',
      url: 'tel:+917973574376',
      iconClass: 'icon-wa',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="contact-page">
      <div className="contact-page-container">
        
        {/* Header matching user reference */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div className="contact-pill-badge">
            SEND US A MESSAGE
          </div>
          <h1 className="contact-main-heading">
            Contact Our Team To Transform<br />Your Digital Presence
          </h1>
          <p className="contact-subheading" style={{ marginBottom: 0 }}>
            Fill in the details below to discuss your project, branding, or growth acceleration. We respond within 24 hours.
          </p>
        </div>

        {/* 2-Column Split: Form (Main centerpiece) + Companion Info & Socials (Side-by-side) */}
        <div className="contact-layout-split">
          
          {/* Main Focus: The Form ("main toh mujhe ye form hi h") */}
          <div className="contact-form-card">
              <ContactForm />
          </div>

          {/* Alongside Column: Companion Info & Socials ("saath saath mei rkh deta... kamm rkh") */}
          <div className="contact-sidebar-col">
            
            {/* Direct Studio Access */}
            <div className="contact-info-glass-card">
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#a78bfa', letterSpacing: '0.08em', marginBottom: '8px' }}>
                DIRECT FOUNDER ACCESS
              </div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main, #ffffff)', marginBottom: '8px' }}>
                Speak directly with founders.
              </h3>
              <p style={{ color: 'var(--text-muted, #94a3b8)', fontSize: '0.86rem', lineHeight: 1.5, marginBottom: '18px' }}>
                No generic sales reps or intake bots. You'll connect directly with our technical lead & brand strategist.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderTop: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))', paddingTop: '16px' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted, #64748b)', fontWeight: 700, textTransform: 'uppercase' }}>Direct Email</div>
                  <a href="mailto:dottanglehq@gmail.com" style={{ color: 'var(--text-main, #ffffff)', fontWeight: 600, fontSize: '0.92rem', textDecoration: 'none', display: 'inline-block', marginTop: '2px' }}>
                    dottanglehq@gmail.com ↗
                  </a>
                </div>

                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted, #64748b)', fontWeight: 700, textTransform: 'uppercase' }}>Call Us</div>
                  <a href="tel:+917973574376" style={{ color: 'var(--text-main, #ffffff)', fontWeight: 600, fontSize: '0.92rem', textDecoration: 'none', display: 'inline-block', marginTop: '2px' }}>+91 7973574376 ↗</a>
                </div>

                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted, #64748b)', fontWeight: 700, textTransform: 'uppercase' }}>Studio Location</div>
                  <div style={{ color: 'var(--text-main, #ffffff)', fontWeight: 600, fontSize: '0.92rem', marginTop: '2px' }}>Ludhiana, Punjab, India</div>
                  <div style={{ color: 'var(--cyan-400, #38bdf8)', fontSize: '0.78rem', marginTop: '2px' }}>Serving Global & Pan-India Brands</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted, #64748b)', fontWeight: 700, textTransform: 'uppercase' }}>Turnaround SLA</div>
                  <div style={{ color: '#10b981', fontWeight: 600, fontSize: '0.86rem', marginTop: '2px' }}>● 24-Hour Founder Response Guaranteed</div>
                </div>
              </div>
            </div>

            {/* Call Dot Tangle Card */}
            <div className="contact-info-glass-card calling-sidebar-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.4rem' }}>💬</span>
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main, #ffffff)', margin: 0 }}>Prefer a call?</h4>
                  <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>Fast response within 30 minutes</span>
                </div>
              </div>
              <p style={{ color: 'var(--text-muted, #94a3b8)', fontSize: '0.84rem', lineHeight: 1.5, marginBottom: '14px' }}>
                Call +91 7973574376 to discuss your project with our team.
              </p>
              <a
                href="tel:+917973574376"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px 18px',
                  borderRadius: '12px',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  color: '#10b981',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  transition: 'all 0.25s ease'
                }}
              >
                <span>Call +91 7973574376</span>
                <span>↗</span>
              </a>
            </div>

            {/* Social Media Channels Grid (Compact) */}
            <div className="contact-info-glass-card">
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--violet-400, #a78bfa)', letterSpacing: '0.08em', marginBottom: '4px' }}>
                SOCIAL CHANNELS
              </div>
              <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main, #ffffff)', marginBottom: '4px' }}>Follow & Connect</h4>
              <p style={{ color: 'var(--text-muted, #94a3b8)', fontSize: '0.82rem', marginBottom: '12px' }}>
                Live product drops, design showcases & updates.
              </p>

              <div className="contact-social-mini-grid">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-mini-pill"
                    aria-label={`Connect on ${item.name}`}
                  >
                    <span style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                    <span>{item.name}</span>
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
