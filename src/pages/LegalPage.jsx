import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Scale, FileText, ArrowLeft } from 'lucide-react';

export default function LegalPage({ forcedType }) {
  const location = useLocation();
  const path = location.pathname;

  let type = forcedType;
  if (!type) {
    if (path.includes('privacy')) type = 'privacy';
    else if (path.includes('refund')) type = 'refund';
    else type = 'terms';
  }

  return (
    <div className="legal-page" style={{ paddingTop: 'calc(var(--header-height) + 40px)', paddingBottom: '100px' }}>
      <div className="container" style={{ maxWidth: '860px', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: '24px' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--coral-400)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600 }}>
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <div className="hb-badge-tag">
            <Scale size={14} /> Legal & Compliance
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: '12px' }}>
            {type === 'privacy' && 'Privacy & Data Protection Policy'}
            {type === 'terms' && 'Terms of Service & Engagement'}
            {type === 'refund' && 'Refund & Cancellation Policy'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Last Updated: February 2026 &bull; Compliant with Information Technology Act, 2000 and Consumer Protection Rules
          </p>
        </div>

        {/* Content Card */}
        <div className="glass-card" style={{ padding: '40px 36px', lineHeight: 1.8, color: 'var(--text-body)', fontSize: '0.95rem' }}>
          {type === 'privacy' && (
            <div>
              <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 700, margin: '20px 0 10px' }}>1. Scope & Commitment</h2>
              <p>
                Dottangel (operating under Dottangel Solutions) is committed to safeguarding your corporate and personal information. This Privacy Policy details how we collect, store, process, and protect information submitted through our website, client portal, and advisory interactions.
              </p>

              <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 700, margin: '30px 0 10px' }}>2. Information We Collect</h2>
              <p>
                We collect personal identifiers (Name, Email, Mobile Number), statutory business documents (PAN, Aadhaar, Utility Bills, Certificate of Incorporation), and financial details solely for the purpose of drafting and filing with statutory portals (MCA, GSTN, IP India, DGFT).
              </p>

              <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 700, margin: '30px 0 10px' }}>3. Data Security & Storage</h2>
              <p>
                All documents uploaded to our Client Portal are encrypted using industry-standard 256-bit AES encryption. Access is strictly role-gated and restricted to verified professionals assigned to your filing case. We never sell, rent, or trade your data to third-party marketing brokers.
              </p>

              <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 700, margin: '30px 0 10px' }}>4. Grievance Officer</h2>
              <p>
                In compliance with the Information Technology Act, 2000 and rules made thereunder, questions or grievances concerning data handling may be addressed to: <strong style={{ color: 'var(--text-main)' }}>Grievance Officer, Dottangel Solutions, Email: contact@dottangle.com</strong>.
              </p>
            </div>
          )}

          {type === 'terms' && (
            <div>
              <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 700, margin: '20px 0 10px' }}>1. Acceptance of Terms</h2>
              <p>
                By accessing Dottangel website or retaining our services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you must refrain from using the platform.
              </p>

              <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 700, margin: '30px 0 10px' }}>2. Independent Professional Model & Non-Law-Firm Disclaimer</h2>
              <div style={{ background: 'rgba(255, 94, 98, 0.06)', borderLeft: '4px solid var(--coral-500)', padding: '16px 20px', borderRadius: '0 8px 8px 0', margin: '16px 0' }}>
                <strong style={{ color: 'var(--coral-400)' }}>Important Statutory Notice:</strong> Dottangel is a business facilitation, technology, and management company. We are not a law firm and do not provide direct legal advice. Regulated services (statutory audits, court appearances, trademark oppositions, ROC certifications) are delivered through qualified independent Chartered Accountants, Company Secretaries, and Advocates.
              </div>

              <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 700, margin: '30px 0 10px' }}>3. Client Obligations</h2>
              <p>
                Clients agree to provide accurate, genuine, and unadulterated identification and premise proofs. The client is solely liable for any fraudulent information submitted on government portals.
              </p>

              <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 700, margin: '30px 0 10px' }}>4. Intellectual Property</h2>
              <p>
                Upon receipt of full payment for custom software engineering and digital brand development, complete source code, repository rights, and brand graphics are unconditionally transferred to the client.
              </p>
            </div>
          )}

          {type === 'refund' && (
            <div>
              <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 700, margin: '20px 0 10px' }}>1. Professional Service Refunds</h2>
              <p>
                We stand behind our commitments. If we fail to initiate your filing or allocate an expert advisor within 5 business days of complete document submission, you are entitled to a 100% refund of professional service fees.
              </p>

              <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 700, margin: '30px 0 10px' }}>2. Government Challans & Official Fees</h2>
              <p>
                Statutory fees, government challans, stamp duties, and registry fees paid directly to government authorities (MCA, GSTN, Trademark Registry, DGFT, Food Safety Authority) are completely non-refundable once paid, as government portals do not offer fee refunds.
              </p>

              <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 700, margin: '30px 0 10px' }}>3. Rejection Due to Client Ineligibility</h2>
              <p>
                If an application is rejected due to invalid, expired, or fraudulent client documents, or unresponsiveness beyond 30 calendar days, professional fees cannot be refunded, though we will assist in re-filing where permitted by the department.
              </p>

              <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 700, margin: '30px 0 10px' }}>4. Refund Processing Time</h2>
              <p>
                Approved refunds are processed back to the original payment source within 5 to 7 business days.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

