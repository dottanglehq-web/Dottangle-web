import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  HelpCircle, 
  Receipt, 
  MessageSquare, 
  Sparkles, 
  Layers, 
  FileText, 
  Star,
  Check,
  Send,
  Building2
} from 'lucide-react';
import { serviceCategories } from '../data/servicesCatalog';
import { categoryPageContent } from '../data/categoryPageContent';
import './ServiceDetailPage.css';

export default function ServiceDetailPage({ serviceSlugOverride }) {
  const { categorySlug, serviceSlug } = useParams();
  const slug = serviceSlugOverride || serviceSlug || categorySlug;

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [openFaq, setOpenFaq] = useState(0);

  // Search across all categories to locate the target subservice
  let foundCategory = null;
  let foundService = null;

  for (const cat of serviceCategories) {
    const sub = cat.subServices.find(s => s.id === slug);
    if (sub) {
      foundCategory = cat;
      foundService = sub;
      break;
    }
    if (cat.id === slug) {
      foundCategory = cat;
      foundService = cat.subServices[0];
      break;
    }
  }

  // Fallback to primary registration service if not found
  if (!foundService) {
    foundCategory = serviceCategories.find(c => c.id === 'business-registration') || serviceCategories[0];
    foundService = foundCategory.subServices[0];
  }

  const catContent = categoryPageContent[foundCategory.id] || {
    overview: foundCategory.description,
    audience: 'Growing startups, founders, and enterprises looking for compliant execution.',
    process: ['Initial Consultation & Scope', 'Document Collation & Review', 'Regulatory Verification', 'Portal Submission', 'Approval Tracking', 'Handover & Ongoing Support'],
    faqs: [
      ['What is the typical turnaround timeline?', 'Depending on department approvals, most filings complete within 5 to 10 working days.'],
      ['Are government charges included in the quote?', 'Government fees are transparently separated from professional service fees.'],
      ['Is physical presence required?', 'No, our workflows are 100% digital and paperless.'],
      ['Who handles statutory compliance?', 'All work is delivered by qualified consultants, CAs, CSs, and Advocates.']
    ]
  };

  const proFee = foundService.professionalFee || 4999;
  const govtFee = foundService.govtFee || 0;
  const gst = Math.round(proFee * 0.18);
  const total = proFee + govtFee + gst;

  // Documents checklist fallback
  const docsList = foundService.documentsRequired || [
    'PAN Card of all Directors / Partners / Proprietor',
    'Aadhaar Card / Passport / Voter ID for Identity Proof',
    'Bank Statement or Cancelled Cheque for bank verification',
    'Electricity Bill or Utility Bill (not older than 2 months) for registered office proof',
    'Owner No-Objection Certificate (NOC) and rent agreement'
  ];

  // Eligibility fallback
  const eligibilityList = foundService.eligibility || [
    'Applicant must be an Indian citizen or authorized foreign national',
    'Valid active PAN card linked to Aadhaar',
    'Clear business premise title or valid lease deed',
    'Compliance with industry-specific statutory thresholds'
  ];

  // Deliverables fallback
  const deliverablesList = foundService.deliverables || [
    'Statutory Registration Certificate / Government Approval',
    'Official government allotment letter & reference credentials',
    'Complete documentation handover kit in digital format',
    'Complimentary post-approval compliance advisory session'
  ];

  // Specific FAQs for this service (defaulting to catContent FAQs)
  const serviceFaqs = foundService.faqs || catContent.faqs.map(([q, a]) => ({ question: q, answer: a }));

  // Related Services in same or complementary category
  const relatedServices = foundCategory.subServices
    .filter(s => s.id !== foundService.id)
    .slice(0, 4);

  // Form Submission Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || 'Individual',
        subject: `Enquiry: ${foundService.title}`,
        services: [foundService.title],
        message: formData.message || `I am interested in ${foundService.title}. Please provide quotation and process details.`
      };

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit enquiry.');

      setFormSubmitted(true);
    } catch (err) {
      setFormError(err.message || 'Submission failed. Please try again or WhatsApp us.');
    } finally {
      setFormLoading(false);
    }
  };

  const whatsappMessage = encodeURIComponent(`Hi Dottangel, I am interested in ${foundService.title}. Can you share the process and quotation?`);

  return (
    <div className="sd-page">
      <div className="sd-container">
        {/* 1. Breadcrumbs */}
        <nav className="sd-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="sep">/</span>
          <Link to="/services">Services</Link>
          <span className="sep">/</span>
          <Link to={`/services/${foundCategory.id}`}>{foundCategory.shortName}</Link>
          <span className="sep">/</span>
          <span className="current">{foundService.title}</span>
        </nav>

        {/* 2 & 3. Hero Section */}
        <section className="sd-hero-card glass-card spotlight-card">
          <div className="sd-hero-badges">
            <span className="sd-badge-cat">{foundCategory.name}</span>
            <span className="sd-badge-live">
              <span className="status-dot-pulse" style={{ width: 6, height: 6 }} /> Available for Immediate Processing
            </span>
            <span className="sd-badge-cat" style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#94a3b8' }}>
              {foundService.tech || 'Verified MCA / Statutory Portal'}
            </span>
          </div>

          <h1 className="sd-hero-title">{foundService.title}</h1>
          <p className="sd-hero-lead">{foundService.shortDesc}</p>

          <div className="sd-hero-quick-meta">
            <div className="sd-meta-item">
              <span className="sd-meta-label">Turnaround Timeline</span>
              <span className="sd-meta-value">{foundService.timeline || '5–7 Working Days'}</span>
            </div>
            <div className="sd-meta-item">
              <span className="sd-meta-label">Professional Charges</span>
              <span className="sd-meta-value" style={{ color: '#ff8c69' }}>₹{proFee.toLocaleString('en-IN')}</span>
            </div>
            <div className="sd-meta-item">
              <span className="sd-meta-label">Government Fees</span>
              <span className="sd-meta-value">{govtFee > 0 ? `₹${govtFee.toLocaleString('en-IN')}` : 'Statutory Actuals / Zero'}</span>
            </div>
            <div className="sd-meta-item">
              <span className="sd-meta-label">Client Rating</span>
              <span className="sd-meta-value" style={{ color: '#f59e0b', display: 'flex', alignItems: 'center', gap: 4 }}>
                4.9 ★★★★★ <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>(Verified)</span>
              </span>
            </div>
          </div>
        </section>

        {/* Main 2-Column Content Layout */}
        <div className="sd-main-grid">
          {/* Left Column: Comprehensive Details */}
          <div className="sd-content-left">
            {/* 5. Overview */}
            <section className="sd-block">
              <h2 className="sd-block-title">
                <Sparkles size={22} /> Comprehensive Service Overview
              </h2>
              <p className="sd-block-text">
                {foundService.businessBenefit || catContent.overview}
              </p>
              <p className="sd-block-text">
                At Dottangel, we combine dedicated personal consulting with automated digital workflows. Every application is scrutinized against regulatory checklists before portal submission, preventing unnecessary government objections, resubmissions, and compounding penalty fees.
              </p>
            </section>

            {/* 6. Who Needs This Service */}
            <section className="sd-block">
              <h2 className="sd-block-title">
                <Building2 size={22} /> Who Needs This Service?
              </h2>
              <p className="sd-block-text">
                {catContent.audience}
              </p>
              <div className="sd-grid-2col">
                <div className="sd-feature-card">
                  <CheckCircle2 size={18} className="sd-check-icon" />
                  <div>
                    <strong>Early-Stage Startups:</strong> Establish lawful incorporation, protect founders from personal liability, and prepare for investor due diligence.
                  </div>
                </div>
                <div className="sd-feature-card">
                  <CheckCircle2 size={18} className="sd-check-icon" />
                  <div>
                    <strong>D2C & eCommerce Brands:</strong> Sell seamlessly on Amazon, Flipkart, and Shopify with mandatory GST, brand trademarks, and FSSAI licences.
                  </div>
                </div>
                <div className="sd-feature-card">
                  <CheckCircle2 size={18} className="sd-check-icon" />
                  <div>
                    <strong>Growing SMEs & Manufacturers:</strong> Scale into formal credit channels, win corporate tenders, and maintain spotless ROC compliance.
                  </div>
                </div>
                <div className="sd-feature-card">
                  <CheckCircle2 size={18} className="sd-check-icon" />
                  <div>
                    <strong>Practicing Professionals:</strong> Safeguard personal wealth, streamline GST & ITR filings, and automate monthly bookkeeping.
                  </div>
                </div>
              </div>
            </section>

            {/* 7 & 8. What's Included / Deliverables */}
            <section className="sd-block">
              <h2 className="sd-block-title">
                <ShieldCheck size={22} /> What's Included (Key Deliverables)
              </h2>
              <div className="sd-grid-2col">
                {deliverablesList.map((item, idx) => (
                  <div key={idx} className="sd-feature-card">
                    <CheckCircle2 size={18} className="sd-check-icon" />
                    <div>{item}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* 9. Documents Required Checklist */}
            <section className="sd-block">
              <h2 className="sd-block-title">
                <FileText size={22} /> Documents Required Checklist
              </h2>
              <p className="sd-block-text">
                Prepare digital scans or photos of the following documents. All files are encrypted and processed through our private, secure document vault:
              </p>
              <div className="sd-doc-list">
                {docsList.map((doc, idx) => (
                  <div key={idx} className="sd-doc-item">
                    <Check size={18} style={{ color: '#10b981', flexShrink: 0 }} />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 10. Eligibility Requirements */}
            <section className="sd-block">
              <h2 className="sd-block-title">
                <Receipt size={22} /> Statutory Eligibility Criteria
              </h2>
              <div className="sd-doc-list">
                {eligibilityList.map((crit, idx) => (
                  <div key={idx} className="sd-doc-item" style={{ borderLeftColor: '#3b82f6' }}>
                    <span style={{ color: '#60a5fa', fontWeight: 'bold' }}>•</span>
                    <span>{crit}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 11 & 12. Step-by-Step 6-Stage Process */}
            <section className="sd-block">
              <h2 className="sd-block-title">
                <Clock size={22} /> Step-by-Step Processing Timeline
              </h2>
              <div className="sd-timeline">
                {catContent.process.map((step, idx) => (
                  <div key={idx} className="sd-step-item">
                    <div className="sd-step-dot" />
                    <div className="sd-step-title">Stage {idx + 1}: {step}</div>
                    <div className="sd-step-desc">
                      Documented review, data verification, and status updates delivered via your private customer portal.
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 16. FAQs Accordion */}
            <section className="sd-block">
              <h2 className="sd-block-title">
                <HelpCircle size={22} /> Frequently Asked Questions
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {serviceFaqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="glass-card"
                    style={{ padding: '16px 20px', cursor: 'pointer', borderRadius: 12 }}
                    onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#f1f5f9', margin: 0 }}>
                        {faq.question || faq[0]}
                      </h3>
                      <span style={{ fontSize: '1.2rem', color: '#ff6b4a', transform: openFaq === idx ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>
                        +
                      </span>
                    </div>
                    {openFaq === idx && (
                      <div style={{ marginTop: 12, color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6 }}>
                        {faq.answer || faq[1]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* 15. Related Services */}
            {relatedServices.length > 0 && (
              <section className="sd-block">
                <h2 className="sd-block-title">
                  <Layers size={22} /> Complementary & Related Services
                </h2>
                <div className="sd-grid-2col">
                  {relatedServices.map(rel => (
                    <Link key={rel.id} to={`/services/${foundCategory.id}/${rel.id}`} className="sd-feature-card" style={{ textDecoration: 'none' }}>
                      <ArrowRight size={18} style={{ color: '#ff6b4a', flexShrink: 0, marginTop: 4 }} />
                      <div>
                        <strong style={{ color: '#ffffff', display: 'block', marginBottom: 4 }}>{rel.title}</strong>
                        <span style={{ color: '#94a3b8', fontSize: '0.82rem' }}>{rel.shortDesc}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* 11. Statutory Indian Regulatory Disclaimer */}
            <div className="sd-regulatory-disclaimer">
              <strong>Statutory Compliance Disclaimer:</strong> Dottangel is a private business management, eCommerce and technology consulting platform. We are not a government body or affiliated with the Ministry of Corporate Affairs (MCA), Goods and Services Tax Network (GSTN), or Controller General of Patents, Designs and Trademarks. Regulated legal, tax and statutory secretarial filings are executed in collaboration with licensed, independent professionals (Chartered Accountants, Company Secretaries, and Advocates) in accordance with applicable Indian laws.
            </div>
          </div>

          {/* Right Column: Sticky Pricing & Fast Enquiry Card */}
          <aside className="sd-sidebar">
            <div className="sd-pricing-card glass-card">
              <div className="sd-price-header">
                <span className="sd-meta-label">Transparent Pricing Breakdown</span>
                <div className="sd-price-tag">₹{total.toLocaleString('en-IN')}</div>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Total estimated investment incl. taxes</span>
              </div>

              <div className="sd-price-breakdown">
                <div className="sd-price-row">
                  <span>Professional Consulting:</span>
                  <span>₹{proFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="sd-price-row">
                  <span>Statutory Govt Fees:</span>
                  <span>{govtFee > 0 ? `₹${govtFee.toLocaleString('en-IN')}` : '₹0 / Actuals'}</span>
                </div>
                <div className="sd-price-row">
                  <span>Applicable GST (18%):</span>
                  <span>₹{gst.toLocaleString('en-IN')}</span>
                </div>
                <div className="sd-price-row total">
                  <span>Estimated Total:</span>
                  <span style={{ color: '#ff8c69' }}>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Direct WhatsApp CTA */}
              <a
                href={`https://wa.me/917973574376?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="sd-btn-whatsapp"
              >
                <span>💬 Chat on WhatsApp (+91 7973574376)</span>
              </a>

              <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: 12 }}>
                  Request Free Expert Consultation
                </h4>

                {formSubmitted ? (
                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', padding: 16, borderRadius: 12, textAlign: 'center' }}>
                    <CheckCircle2 size={28} style={{ color: '#10b981', margin: '0 auto 8px' }} />
                    <strong style={{ color: '#ffffff', display: 'block' }}>Consultation Scheduled!</strong>
                    <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: '6px 0 0' }}>
                      Our senior compliance officer will call you within 2 working hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {formError && (
                      <div style={{ color: '#f87171', fontSize: '0.82rem', background: 'rgba(239, 68, 68, 0.1)', padding: 8, borderRadius: 6 }}>
                        {formError}
                      </div>
                    )}
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '10px 14px', color: '#ffffff', fontSize: '0.9rem' }}
                    />
                    <input
                      type="email"
                      required
                      placeholder="Work Email Address *"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '10px 14px', color: '#ffffff', fontSize: '0.9rem' }}
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone / WhatsApp Number *"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '10px 14px', color: '#ffffff', fontSize: '0.9rem' }}
                    />
                    <input
                      type="text"
                      placeholder="Company Name (Optional)"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '10px 14px', color: '#ffffff', fontSize: '0.9rem' }}
                    />
                    <button
                      type="submit"
                      disabled={formLoading}
                      className="sd-btn-enquire"
                    >
                      {formLoading ? 'Submitting...' : 'Submit Service Request →'}
                    </button>
                    <span style={{ fontSize: '0.74rem', color: '#64748b', textAlign: 'center' }}>
                      🔒 Zero spam. Confidentiality guaranteed under NDA.
                    </span>
                  </form>
                )}
              </div>
            </div>

            {/* Quick Tools Box */}
            <div className="glass-card" style={{ padding: 20, borderRadius: 16 }}>
              <span className="sd-meta-label" style={{ color: '#ff8c69' }}>Self-Service Tools</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
                <Link to="/tools/cost-calculator" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.88rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Calculate Custom Package</span>
                  <span>→</span>
                </Link>
                <Link to="/tools/document-checklist" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.88rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Download Document Checklist</span>
                  <span>→</span>
                </Link>
                <Link to="/tools/track" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.88rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Track Active Application</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

