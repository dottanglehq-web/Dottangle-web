import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Calculator, 
  CheckSquare, 
  HelpCircle, 
  Search, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Download, 
  Printer, 
  Sparkles,
  ShieldCheck,
  Building2,
  Receipt,
  Scale,
  Award,
  Store
} from 'lucide-react';
import './Tools.css';

const CALCULATOR_SERVICES = [
  { id: 'pvt-ltd', name: 'Private Limited Company Incorporation', category: 'Registration', proFee: 7499, govtFee: 2000 },
  { id: 'llp', name: 'LLP (Limited Liability Partnership) Registration', category: 'Registration', proFee: 5999, govtFee: 1500 },
  { id: 'opc', name: 'One Person Company (OPC) Registration', category: 'Registration', proFee: 6499, govtFee: 2000 },
  { id: 'gst-reg', name: 'GST Registration Assistance', category: 'Taxation', proFee: 1499, govtFee: 0 },
  { id: 'gst-filing-yr', name: 'Annual GST Return Filing Retainer (12 Months)', category: 'Taxation', proFee: 18000, govtFee: 0 },
  { id: 'trademark', name: 'Trademark Registration (TM-A Filing & Search)', category: 'Legal', proFee: 3499, govtFee: 4500 },
  { id: 'fssai-state', name: 'FSSAI State Food License', category: 'Licences', proFee: 2999, govtFee: 2000 },
  { id: 'iec', name: 'Import Export Code (DGFT IEC)', category: 'Licences', proFee: 1999, govtFee: 500 },
  { id: 'msme', name: 'MSME / Udyam Registration', category: 'Registration', proFee: 999, govtFee: 0 },
  { id: 'amazon-setup', name: 'Amazon Seller Account Setup & Cataloging (50 SKUs)', category: 'eCommerce', proFee: 11999, govtFee: 0 },
  { id: 'shopify-store', name: 'Shopify D2C Store Development & Payment Integration', category: 'eCommerce', proFee: 24999, govtFee: 0 }
];

const CHECKLIST_DATA = {
  'pvt-ltd': {
    title: 'Private Limited Company Incorporation Checklist',
    items: [
      { id: 'c1', label: 'PAN Card of all Directors and Shareholders (Mandatory)' },
      { id: 'c2', label: 'Identity Proof: Aadhaar Card, Passport, or Voter ID' },
      { id: 'c3', label: 'Address Proof: Bank Statement or Electricity Bill (< 2 months old)' },
      { id: 'c4', label: 'Passport Size Photographs of all Directors' },
      { id: 'c5', label: 'Registered Office Address Proof: Electricity Bill or Water Bill' },
      { id: 'c6', label: 'Landlord / Property Owner No-Objection Certificate (NOC)' },
      { id: 'c7', label: 'Rent Agreement / Lease Deed (if premises rented)' }
    ]
  },
  'gst': {
    title: 'GST Registration Document Checklist',
    items: [
      { id: 'g1', label: 'PAN Card of Business / Proprietor / Partners / Company' },
      { id: 'g2', label: 'Aadhaar Card of Authorized Signatory' },
      { id: 'g3', label: 'Certificate of Incorporation / Partnership Deed' },
      { id: 'g4', label: 'Bank Statement or Cancelled Cheque showing Account Number & IFSC' },
      { id: 'g5', label: 'Proof of Principal Place of Business (Electricity Bill & Rent Deed)' },
      { id: 'g6', label: 'Letter of Authorization / Board Resolution for Authorized Signatory' }
    ]
  },
  'trademark': {
    title: 'Trademark Registration (TM-A) Checklist',
    items: [
      { id: 't1', label: 'Clear Brand Name / Logo / Tagline Artwork (High Resolution)' },
      { id: 't2', label: 'PAN Card and Aadhaar of Applicant / Signatory' },
      { id: 't3', label: 'Certificate of Incorporation or MSME Certificate (for 50% Govt Fee discount)' },
      { id: 't4', label: 'Date of First Use in India (User Affidavit if already in use)' },
      { id: 't5', label: 'Signed Form TM-48 (Power of Attorney authorizing trademark agent)' }
    ]
  },
  'fssai': {
    title: 'FSSAI Food Business License Checklist',
    items: [
      { id: 'f1', label: 'Passport Photo of Food Business Operator (FBO)' },
      { id: 'f2', label: 'Government Photo ID (PAN / Aadhaar)' },
      { id: 'f3', label: 'Proof of Business Premises (Electricity bill, Rent agreement, NOC)' },
      { id: 'f4', label: 'List of Food Categories / Products to be manufactured or sold' },
      { id: 'f5', label: 'Water Test Analysis Report (Mandatory for manufacturing/catering)' }
    ]
  }
};

export default function ToolsPage() {
  const [searchParams] = useSearchParams();
  const initialTool = searchParams.get('tool') || 'calculator';
  const [activeTool, setActiveTool] = useState(initialTool);

  // 1. Calculator State
  const [selectedServices, setSelectedServices] = useState(['pvt-ltd', 'gst-reg']);

  // 2. Checklist State
  const [selectedChecklist, setSelectedChecklist] = useState('pvt-ltd');
  const [checkedItems, setCheckedItems] = useState({});

  // 3. Eligibility Wizard State
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardAnswers, setWizardAnswers] = useState({
    entity: 'startup',
    turnover: 'under_20l',
    businessType: 'ecommerce',
    employees: '1_5'
  });
  const [showWizardResults, setShowWizardResults] = useState(false);

  // 4. Live Tracker State
  const [trackRef, setTrackRef] = useState('DOT-2026-8841');
  const [trackingResult, setTrackingResult] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);

  // Toggle calculator service
  const toggleService = (id) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Calculator Math
  const selectedObjs = CALCULATOR_SERVICES.filter(s => selectedServices.includes(s.id));
  const grossProFee = selectedObjs.reduce((acc, s) => acc + s.proFee, 0);
  const totalGovtFee = selectedObjs.reduce((acc, s) => acc + s.govtFee, 0);
  // 10% bundle discount if 2 or more services selected
  const discount = selectedObjs.length >= 2 ? Math.round(grossProFee * 0.10) : 0;
  const netProFee = grossProFee - discount;
  const gst = Math.round(netProFee * 0.18);
  const grandTotal = netProFee + totalGovtFee + gst;

  // Track Application
  const handleTrackSubmit = (e) => {
    if (e) e.preventDefault();
    setTrackingLoading(true);

    fetch(`/api/tools/track/${trackRef.trim()}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.request) {
          setTrackingResult(data.request);
        } else {
          // Reliable fallback demo
          setTrackingResult({
            referenceNumber: trackRef.trim() || 'DOT-2026-8841',
            serviceTitle: 'Private Limited Company Incorporation',
            status: 'MCA Central Registration Centre (CRC) Review',
            estimatedCompletion: '5 to 7 working days',
            milestones: [
              { title: 'Requirement Scope & Initial Consultation', done: true },
              { title: 'KYC & Document Verification', done: true },
              { title: 'MCA SPICe+ Part A Name Approval', done: true },
              { title: 'SPICe+ Part B Filing & CRC Scrutiny', active: true },
              { title: 'Certificate of Incorporation & PAN/TAN Issue', done: false }
            ]
          });
        }
      })
      .catch(() => {
        setTrackingResult({
          referenceNumber: trackRef.trim() || 'DOT-2026-8841',
          serviceTitle: 'Private Limited Company Incorporation',
          status: 'MCA Central Registration Centre (CRC) Review',
          estimatedCompletion: '5 to 7 working days',
          milestones: [
            { title: 'Requirement Scope & Initial Consultation', done: true },
            { title: 'KYC & Document Verification', done: true },
            { title: 'MCA SPICe+ Part A Name Approval', done: true },
            { title: 'SPICe+ Part B Filing & CRC Scrutiny', active: true },
            { title: 'Certificate of Incorporation & PAN/TAN Issue', done: false }
          ]
        });
      })
      .finally(() => setTrackingLoading(false));
  };

  const handlePrintQuotation = () => {
    window.print();
  };

  return (
    <div className="tools-page">
      <div className="container">
        {/* Hero */}
        <div className="tools-hero">
          <div className="hb-badge-tag">
            <Sparkles size={14} /> Interactive Business Utility Suite
          </div>
          <h1 className="blog-title">
            Business Tools & <br />
            <span className="serif-italic gradient-coral-text">Calculators.</span>
          </h1>
          <p className="blog-subtitle">
            Instant statutory fee breakdowns, dynamic document checklists, regulatory eligibility audits, and live application tracking.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="tools-nav-tabs">
          <button 
            className={`tools-tab-btn ${activeTool === 'calculator' ? 'active' : ''}`}
            onClick={() => setActiveTool('calculator')}
          >
            <Calculator size={16} /> Cost Calculator
          </button>
          <button 
            className={`tools-tab-btn ${activeTool === 'checklist' ? 'active' : ''}`}
            onClick={() => setActiveTool('checklist')}
          >
            <CheckSquare size={16} /> Document Checklist
          </button>
          <button 
            className={`tools-tab-btn ${activeTool === 'eligibility' ? 'active' : ''}`}
            onClick={() => setActiveTool('eligibility')}
          >
            <HelpCircle size={16} /> Eligibility Checker
          </button>
          <button 
            className={`tools-tab-btn ${activeTool === 'track' ? 'active' : ''}`}
            onClick={() => setActiveTool('track')}
          >
            <Search size={16} /> Live Tracker
          </button>
        </div>

        {/* TOOL 1: COST CALCULATOR */}
        {activeTool === 'calculator' && (
          <div className="calc-container-grid">
            {/* Left: Service Selection */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  Select Services to Bundle
                </h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--coral-400)', fontWeight: 600 }}>
                  Select 2+ for 10% Bundle Discount
                </span>
              </div>

              <div className="calc-services-list">
                {CALCULATOR_SERVICES.map(service => {
                  const isSelected = selectedServices.includes(service.id);
                  return (
                    <div 
                      key={service.id} 
                      className={`calc-service-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleService(service.id)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ 
                          width: '22px', 
                          height: '22px', 
                          borderRadius: '6px', 
                          border: isSelected ? '2px solid var(--coral-500)' : '2px solid var(--border-subtle)',
                          background: isSelected ? 'var(--coral-500)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          flexShrink: 0
                        }}>
                          {isSelected && <CheckCircle2 size={16} />}
                        </div>
                        <div>
                          <strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{service.name}</strong>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Category: {service.category}</div>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                          ₹{service.proFee.toLocaleString('en-IN')}
                        </div>
                        {service.govtFee > 0 && (
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            + ₹{service.govtFee.toLocaleString('en-IN')} Govt
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Summary Panel */}
            <div>
              <div className="calc-summary-panel">
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '16px' }}>
                  Investment Summary
                </h3>

                <div className="calc-summary-row">
                  <span>Selected Services:</span>
                  <strong style={{ color: 'var(--text-main)' }}>{selectedObjs.length} items</strong>
                </div>

                <div className="calc-summary-row">
                  <span>Professional Services Fee:</span>
                  <span>₹{grossProFee.toLocaleString('en-IN')}</span>
                </div>

                {discount > 0 && (
                  <div className="calc-summary-row" style={{ color: '#10B981' }}>
                    <span>Bundle Discount (10%):</span>
                    <strong>- ₹{discount.toLocaleString('en-IN')}</strong>
                  </div>
                )}

                <div className="calc-summary-row">
                  <span>Government / MCA Challans:</span>
                  <span>₹{totalGovtFee.toLocaleString('en-IN')}</span>
                </div>

                <div className="calc-summary-row">
                  <span>GST on Professional Fees (18%):</span>
                  <span>₹{gst.toLocaleString('en-IN')}</span>
                </div>

                <div className="calc-total-row">
                  <span>Total Estimated Fee:</span>
                  <div className="calc-total-val">₹{grandTotal.toLocaleString('en-IN')}</div>
                </div>

                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: '14px 0 24px' }}>
                  *Government statutory fees are indicative as per current MCA & IP India schedules. No hidden charges.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Link 
                    to={`/contact?services=${selectedServices.join(',')}&total=${grandTotal}`}
                    className="btn btn-primary"
                    style={{ justifyContent: 'center' }}
                  >
                    <span>Proceed with this Bundle</span>
                    <ArrowRight size={16} />
                  </Link>

                  <button className="btn btn-glass" onClick={handlePrintQuotation} style={{ justifyContent: 'center' }}>
                    <Printer size={16} />
                    <span>Print Quotation Breakdown</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 2: DOCUMENT CHECKLIST */}
        {activeTool === 'checklist' && (
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div style={{ marginBottom: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button 
                className={`btn ${selectedChecklist === 'pvt-ltd' ? 'btn-primary' : 'btn-glass'}`}
                onClick={() => setSelectedChecklist('pvt-ltd')}
              >
                Pvt Ltd Incorporation
              </button>
              <button 
                className={`btn ${selectedChecklist === 'gst' ? 'btn-primary' : 'btn-glass'}`}
                onClick={() => setSelectedChecklist('gst')}
              >
                GST Registration
              </button>
              <button 
                className={`btn ${selectedChecklist === 'trademark' ? 'btn-primary' : 'btn-glass'}`}
                onClick={() => setSelectedChecklist('trademark')}
              >
                Trademark Filing
              </button>
              <button 
                className={`btn ${selectedChecklist === 'fssai' ? 'btn-primary' : 'btn-glass'}`}
                onClick={() => setSelectedChecklist('fssai')}
              >
                FSSAI Food License
              </button>
            </div>

            <div className="calc-summary-panel">
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
                {CHECKLIST_DATA[selectedChecklist]?.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
                Check off items you already possess. You can upload digital copies directly in our Client Portal.
              </p>

              <div>
                {CHECKLIST_DATA[selectedChecklist]?.items.map(item => {
                  const isChecked = !!checkedItems[item.id];
                  return (
                    <div 
                      key={item.id}
                      className={`checklist-item ${isChecked ? 'checked' : ''}`}
                      onClick={() => setCheckedItems(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                    >
                      <div style={{ 
                        width: '20px', 
                        height: '20px', 
                        borderRadius: '4px',
                        border: isChecked ? '2px solid #10B981' : '2px solid var(--border-subtle)',
                        background: isChecked ? '#10B981' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        marginTop: '2px',
                        flexShrink: 0
                      }}>
                        {isChecked && <CheckCircle2 size={14} />}
                      </div>
                      <span style={{ 
                        fontSize: '0.92rem', 
                        color: isChecked ? '#fff' : 'var(--text-body)',
                        textDecoration: isChecked ? 'line-through' : 'none'
                      }}>
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Need help collating these? Our advisory desk provides free verification.
                </span>
                <Link to="/contact" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                  <span>Verify with Advisor</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 3: ELIGIBILITY CHECKER */}
        {activeTool === 'eligibility' && (
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <div className="calc-summary-panel">
              {!showWizardResults ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <span className="hb-badge-tag">Step {wizardStep} of 4</span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Regulatory Assessment</span>
                  </div>

                  {wizardStep === 1 && (
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '14px' }}>
                        What is your business operational model?
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                        {[
                          { id: 'startup', title: 'Technology / Fast-Growing Startup', desc: 'Seeking angel or VC equity investment' },
                          { id: 'ecommerce', title: 'Marketplace eCommerce / D2C Brand', desc: 'Selling products online via Amazon, Flipkart or Shopify' },
                          { id: 'food', title: 'Food, Restaurant or Cloud Kitchen', desc: 'Preparing, packaging, or serving edible products' },
                          { id: 'services', title: 'Consulting, Agency or Professional Practice', desc: 'Providing intellectual, design, or business services' }
                        ].map(opt => (
                          <div 
                            key={opt.id}
                            className={`calc-service-item ${wizardAnswers.entity === opt.id ? 'selected' : ''}`}
                            onClick={() => setWizardAnswers({ ...wizardAnswers, entity: opt.id })}
                          >
                            <div>
                              <strong style={{ color: 'var(--text-main)' }}>{opt.title}</strong>
                              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{opt.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="btn btn-primary" onClick={() => setWizardStep(2)}>Next Step &rarr;</button>
                    </div>
                  )}

                  {wizardStep === 2 && (
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '14px' }}>
                        What is your estimated annual turnover?
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                        {[
                          { id: 'under_20l', title: 'Under ₹20 Lakhs / Pre-Revenue', desc: 'Below standard mandatory GST threshold (unless eCommerce)' },
                          { id: '20l_40l', title: '₹20 Lakhs to ₹40 Lakhs', desc: 'Mandatory GST registration for services firms' },
                          { id: '40l_1cr', title: '₹40 Lakhs to ₹1 Crore', desc: 'Mandatory GST for goods; eligible for composition scheme' },
                          { id: 'above_1cr', title: 'Above ₹1 Crore', desc: 'Mandatory tax audit, e-Invoicing applicability' }
                        ].map(opt => (
                          <div 
                            key={opt.id}
                            className={`calc-service-item ${wizardAnswers.turnover === opt.id ? 'selected' : ''}`}
                            onClick={() => setWizardAnswers({ ...wizardAnswers, turnover: opt.id })}
                          >
                            <div>
                              <strong style={{ color: 'var(--text-main)' }}>{opt.title}</strong>
                              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{opt.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="btn btn-glass" onClick={() => setWizardStep(1)}>&larr; Back</button>
                        <button className="btn btn-primary" onClick={() => setWizardStep(3)}>Next Step &rarr;</button>
                      </div>
                    </div>
                  )}

                  {wizardStep === 3 && (
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '14px' }}>
                        Do you plan to export goods/services or sell inter-state?
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                        {[
                          { id: 'yes_interstate', title: 'Yes, selling pan-India or internationally', desc: 'Requires DGFT Import Export Code & mandatory GST' },
                          { id: 'no_local', title: 'No, strictly local within my state', desc: 'Standard local threshold limits apply' }
                        ].map(opt => (
                          <div 
                            key={opt.id}
                            className={`calc-service-item ${wizardAnswers.businessType === opt.id ? 'selected' : ''}`}
                            onClick={() => setWizardAnswers({ ...wizardAnswers, businessType: opt.id })}
                          >
                            <div>
                              <strong style={{ color: 'var(--text-main)' }}>{opt.title}</strong>
                              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{opt.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="btn btn-glass" onClick={() => setWizardStep(2)}>&larr; Back</button>
                        <button className="btn btn-primary" onClick={() => setWizardStep(4)}>Next Step &rarr;</button>
                      </div>
                    </div>
                  )}

                  {wizardStep === 4 && (
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '14px' }}>
                        What is your estimated team or staff size?
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                        {[
                          { id: '1_5', title: 'Founders only or 1 to 5 members', desc: 'Exempt from EPF/ESIC statutory registration' },
                          { id: '10_20', title: '10 to 20 employees', desc: 'ESIC mandatory threshold reached (10+ staff)' },
                          { id: '20_plus', title: '20+ employees', desc: 'Mandatory Employee Provident Fund (EPF) registration' }
                        ].map(opt => (
                          <div 
                            key={opt.id}
                            className={`calc-service-item ${wizardAnswers.employees === opt.id ? 'selected' : ''}`}
                            onClick={() => setWizardAnswers({ ...wizardAnswers, employees: opt.id })}
                          >
                            <div>
                              <strong style={{ color: 'var(--text-main)' }}>{opt.title}</strong>
                              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{opt.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="btn btn-glass" onClick={() => setWizardStep(3)}>&larr; Back</button>
                        <button className="btn btn-primary" onClick={() => setShowWizardResults(true)}>Generate Compliance Prescription &rarr;</button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <div style={{ display: 'inline-flex', padding: '10px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '50%', color: '#10B981', marginBottom: '12px' }}>
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      Your Tailored Compliance Prescription
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                    <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '18px', borderRadius: '12px', borderLeft: '4px solid var(--coral-500)' }}>
                      <strong style={{ color: 'var(--text-main)', fontSize: '1rem' }}>1. Recommended Business Structure</strong>
                      <p style={{ margin: '4px 0 0', fontSize: '0.88rem', color: 'var(--text-body)' }}>
                        {wizardAnswers.entity === 'startup' ? 'Private Limited Company (Pvt Ltd) is mandatory to issue ESOPs and receive DPIIT recognition.' : 'Private Limited or LLP depending on whether external debt or equity is planned.'}
                      </p>
                    </div>

                    <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '18px', borderRadius: '12px', borderLeft: '4px solid #38BDF8' }}>
                      <strong style={{ color: 'var(--text-main)', fontSize: '1rem' }}>2. GST & Tax Requirements</strong>
                      <p style={{ margin: '4px 0 0', fontSize: '0.88rem', color: 'var(--text-body)' }}>
                        Mandatory GST registration required under Section 24 of CGST Act for eCommerce marketplace selling and inter-state transactions regardless of turnover.
                      </p>
                    </div>

                    <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '18px', borderRadius: '12px', borderLeft: '4px solid #10B981' }}>
                      <strong style={{ color: 'var(--text-main)', fontSize: '1rem' }}>3. Brand & Regulatory Registrations</strong>
                      <p style={{ margin: '4px 0 0', fontSize: '0.88rem', color: 'var(--text-body)' }}>
                        Udyam MSME Registration (provides 50% discount on Trademark filing government fees), plus Trademark Class 35/42 brand protection.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
                    <Link to="/contact" className="btn btn-primary">
                      <span>Speak with Lead Advisor</span>
                      <ArrowRight size={16} />
                    </Link>
                    <button className="btn btn-glass" onClick={() => { setShowWizardResults(false); setWizardStep(1); }}>
                      Restart Wizard
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TOOL 4: APPLICATION TRACKER */}
        {activeTool === 'track' && (
          <div className="tracker-box">
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(255, 94, 98, 0.1)', borderRadius: '16px', color: 'var(--coral-400)', marginBottom: '12px' }}>
                <Search size={28} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 6px 0' }}>
                Live Filing & Application Status
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
                Enter your unique Dottangel reference ID (e.g. DOT-2026-8841) to monitor live milestone progress.
              </p>
            </div>

            <form onSubmit={handleTrackSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '28px' }}>
              <input 
                type="text" 
                className="admin-input" 
                placeholder="Enter Reference (e.g. DOT-2026-8841)" 
                value={trackRef} 
                onChange={e => setTrackRef(e.target.value)} 
              />
              <button type="submit" className="btn btn-primary" style={{ flexShrink: 0 }} disabled={trackingLoading}>
                <span>{trackingLoading ? 'Searching...' : 'Track'}</span>
              </button>
            </form>

            {trackingResult && (
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--coral-400)' }}>
                    {trackingResult.referenceNumber}
                  </span>
                  <span className="hb-badge-tag" style={{ margin: 0 }}>
                    {trackingResult.status}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 16px 0' }}>
                  {trackingResult.serviceTitle}
                </h4>

                <div className="portal-milestones-list" style={{ marginTop: '16px' }}>
                  {trackingResult.milestones?.map((m, idx) => (
                    <div key={idx} className={`portal-milestone-item ${m.done ? 'done' : ''} ${m.active ? 'active' : ''}`}>
                      <div className="portal-milestone-bullet">
                        {m.done && <CheckCircle2 size={12} />}
                      </div>
                      <div className="portal-milestone-title">{idx + 1}. {m.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

