import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ContactPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const busy = useRef(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    subject: '',
    services: [],
    website: '',
    message: ''
  });

  // Read URL query params (e.g. ?plan=Signature or ?service=web or ?subject=...)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const plan = params.get('plan');
    const service = params.get('service');
    const subjectParam = params.get('subject');

    if (subjectParam) {
      setFormData(prev => ({ ...prev, subject: subjectParam }));
    } else if (plan) {
      setFormData(prev => ({
        ...prev,
        subject: `Inquiry regarding ${plan} Plan`,
        message: `Hi Dot Tangle team, I would like to explore the ${plan} engagement scope for our company.`
      }));
    } else if (service) {
      setFormData(prev => ({
        ...prev,
        subject: `New Project: ${service}`,
        message: `Hi Dot Tangle team, we are looking for high-performance capabilities in ${service}.`
      }));
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (busy.current) return;
    busy.current = true;
    setError('');
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        signal: AbortSignal.timeout(20000)
      });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.error || 'We could not save your inquiry. Please try again.');
      try { sessionStorage.setItem('contactConfirmation', result.confirmationStatus || 'pending'); } catch { /* Storage can be disabled by browser privacy settings. */ }
      navigate('/thank-you', { replace: true });
    } catch (err) {
      setError(err.name === 'TimeoutError' || err.name === 'TypeError' ? 'Connection interrupted. Please retry; duplicate inquiries are prevented.' : err.message);
    } finally {
      busy.current = false;
      setIsSubmitting(false);
    }
  };

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
              <form aria-busy={isSubmitting} id="contactMessageForm" onSubmit={handleSubmit} className="contact-form-grid">
                
                {/* Row 1: Your Name & Company */}
                <div className="contact-field-group">
                  <label className="contact-field-label" htmlFor="contactName">Your Name</label>
                  <input
                    id="contactName"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={120}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Your Full Name"
                    className="contact-input"
                  />
                </div>

                <div className="contact-field-group">
                  <label className="contact-field-label" htmlFor="contactCompany">Company</label>
                  <input
                    id="contactCompany"
                    name="company"
                    type="text"
                    maxLength={160}
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company"
                    className="contact-input"
                  />
                </div>

                {/* Row 2: Phone & Email */}
                <div className="contact-field-group">
                  <label className="contact-field-label" htmlFor="contactPhone">Phone</label>
                  <input
                    id="contactPhone"
                    name="phone"
                    type="tel"
                    required
                    pattern="[+0-9 ()-]{7,30}"
                    maxLength={30}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter Your Phone Number"
                    className="contact-input"
                  />
                </div>

                <div className="contact-field-group">
                  <label className="contact-field-label" htmlFor="contactEmail">Email</label>
                  <input
                    id="contactEmail"
                    name="email"
                    type="email"
                    required
                    maxLength={254}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Your Email Address"
                    className="contact-input"
                  />
                </div>

                <div className="contact-field-group contact-field-full">
                  <label className="contact-field-label" htmlFor="contactService">Selected Service</label>
                  <select id="contactService" required className="contact-input" value={formData.services[0] || ''}
                    onChange={e => setFormData(prev => ({ ...prev, services: [e.target.value] }))}>
                    <option value="">Select a service</option>
                    {['Website Development', 'Mobile App Development', 'AI & Automation', 'Branding & Design', 'Digital Marketing', 'Cloud & Consulting', 'Other'].map(service => <option key={service}>{service}</option>)}
                  </select>
                </div>
                <div className="contact-honeypot" aria-hidden="true">
                  <label htmlFor="contactWebsite">Leave this field empty</label>
                  <input id="contactWebsite" name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={handleChange} />
                </div>
                {error && <p role="alert" className="contact-field-full" style={{ color: '#f87171' }}>{error}</p>}
                {/* Row 3: Subject (Full Width) */}
                <div className="contact-field-group contact-field-full">
                  <label className="contact-field-label" htmlFor="contactSubject">Subject</label>
                  <input
                    id="contactSubject"
                    name="subject"
                    type="text"
                    required
                    minLength={2}
                    maxLength={200}
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Tell Your Subject"
                    className="contact-input"
                  />
                </div>

                {/* Row 4: Message (Full Width) */}
                <div className="contact-field-group contact-field-full">
                  <label className="contact-field-label" htmlFor="contactMessage">Message</label>
                  <textarea
                    id="contactMessage"
                    name="message"
                    required
                    rows={5}
                    minLength={10}
                    maxLength={4000}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    className="contact-textarea"
                  />
                </div>

                {/* Row 5: Send Message Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="contact-submit-btn"
                  id="contactSubmitBtn"
                >
                  {isSubmitting && <span className="contact-spinner" aria-hidden="true" />}
                  <span aria-live="polite">{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                </button>

              </form>
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
