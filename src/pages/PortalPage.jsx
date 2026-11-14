import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  User, 
  FileCheck2, 
  Upload, 
  Clock, 
  CheckCircle2, 
  Plus, 
  LogOut, 
  AlertCircle, 
  ChevronRight, 
  Building2, 
  Receipt, 
  Store, 
  FileText
} from 'lucide-react';
import './Portal.css';

export default function PortalPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem('clientToken') || '');
  const [clientUser, setClientUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem('clientUser') || 'null');
    } catch {
      return null;
    }
  });

  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [authForm, setAuthForm] = useState({
    name: 'Siddharth Oberoi',
    email: 'client@dottangle.com',
    phone: '+91 98765 00123',
    company: 'Apex Healthtech Pvt Ltd',
    password: 'Password@2026'
  });
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Service requests
  const [requests, setRequests] = useState([
    {
      referenceNumber: 'DOT-2026-8841',
      serviceTitle: 'Private Limited Company Registration',
      category: 'Business Registration',
      currentMilestone: 3,
      status: 'In Progress (MCA Scrutiny)',
      professionalFee: 7499,
      govtFee: 2000,
      gst: 1350,
      totalFee: 10849,
      documentsUploaded: 4,
      createdAt: '2026-02-28',
      milestones: [
        { step: 1, title: 'Requirement Scope & Initial Consultation', desc: 'Scope locked, DSC application initiated', done: true },
        { step: 2, title: 'KYC & Documentation Verification', desc: 'Promoter PAN, Aadhaar & utility bill verified', done: true },
        { step: 3, title: 'MCA SPICe+ Part A Name Approval', desc: 'Name approved by Registrar of Companies (ROC)', done: true },
        { step: 4, title: 'MCA SPICe+ Part B Filing & Scrutiny', desc: 'Incorporation forms under central scrutiny', active: true },
        { step: 5, title: 'Certificate of Incorporation & PAN/TAN', desc: 'Awaiting generation of CIN and official certificate' },
        { step: 6, title: 'Corporate Bank Account & Compliance Dossier', desc: 'Final handover and statutory onboarding' }
      ]
    }
  ]);

  // Documents in vault
  const [vaultDocs, setVaultDocs] = useState([
    { name: 'Promoter 1 PAN Card', status: 'Verified', date: '2026-03-01' },
    { name: 'Promoter 1 Aadhaar Card', status: 'Verified', date: '2026-03-01' },
    { name: 'Registered Office Electricity Bill', status: 'Verified', date: '2026-03-02' },
    { name: 'Owner NOC & Rent Agreement', status: 'Under Review', date: '2026-03-03' },
    { name: 'Director Specimen Signature (INC-9)', status: 'Pending Upload', date: '-' }
  ]);

  // New Request Form
  const [newServiceCategory, setNewServiceCategory] = useState('gst-taxation');
  const [newServiceName, setNewServiceName] = useState('GST Registration');
  const [newServiceNotes, setNewServiceNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Authenticate (Login or Register)
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    const endpoint = authMode === 'login' ? '/api/portal/login' : '/api/portal/register';
    const payload = authMode === 'login' 
      ? { email: authForm.email, password: authForm.password }
      : { 
          name: authForm.name, 
          email: authForm.email, 
          phone: authForm.phone, 
          company: authForm.company, 
          password: authForm.password 
        };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      setToken(data.token);
      setClientUser(data.customer || { name: authForm.name, company: authForm.company, email: authForm.email });
      sessionStorage.setItem('clientToken', data.token);
      sessionStorage.setItem('clientUser', JSON.stringify(data.customer || { name: authForm.name, company: authForm.company, email: authForm.email }));
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    setClientUser(null);
    sessionStorage.removeItem('clientToken');
    sessionStorage.removeItem('clientUser');
  };

  const handleBookService = (e) => {
    e.preventDefault();
    const newRef = `DOT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReq = {
      referenceNumber: newRef,
      serviceTitle: newServiceName,
      category: newServiceCategory,
      currentMilestone: 1,
      status: 'Application Received',
      professionalFee: 2499,
      govtFee: 0,
      gst: 450,
      totalFee: 2949,
      documentsUploaded: 0,
      createdAt: new Date().toISOString().slice(0, 10),
      milestones: [
        { step: 1, title: 'Application Received & Scope Locked', desc: 'Case assigned to dedicated compliance advisor', active: true },
        { step: 2, title: 'KYC & Document Verification', desc: 'Awaiting document upload' },
        { step: 3, title: 'Statutory Portal Filing', desc: 'Filing on government department portal' },
        { step: 4, title: 'Department Scrutiny & Approval', desc: 'Official review and query response' },
        { step: 5, title: 'Certificate Handover', desc: 'Final registration certificate delivery' }
      ]
    };

    setRequests(prev => [newReq, ...prev]);
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 4000);
  };

  const handleSimulateUpload = (docName) => {
    setVaultDocs(prev => prev.map(d => d.name === docName ? { ...d, status: 'Under Review', date: new Date().toISOString().slice(0, 10) } : d));
    alert(`File uploaded successfully for "${docName}". Under review by our compliance team.`);
  };

  // Not Logged In View
  if (!token) {
    return (
      <div className="portal-page">
        <div className="container">
          <div className="portal-auth-card">
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(255, 94, 98, 0.1)', borderRadius: '16px', color: 'var(--coral-400)', marginBottom: '12px' }}>
                <ShieldCheck size={32} />
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 6px 0' }}>
                Dottangel Client Portal
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
                Track your active filings, upload statutory documents, and manage your business accounts.
              </p>
            </div>

            <div className="portal-auth-tabs">
              <button 
                type="button" 
                className={`portal-auth-tab ${authMode === 'login' ? 'active' : ''}`}
                onClick={() => setAuthMode('login')}
              >
                Sign In
              </button>
              <button 
                type="button" 
                className={`portal-auth-tab ${authMode === 'register' ? 'active' : ''}`}
                onClick={() => setAuthMode('register')}
              >
                Create Account
              </button>
            </div>

            {authError && (
              <div style={{ padding: '12px', background: 'rgba(224, 72, 77, 0.15)', border: '1px solid var(--coral-500)', borderRadius: '8px', color: '#fff', fontSize: '0.85rem', marginBottom: '18px' }}>
                {authError}
              </div>
            )}

            <form onSubmit={handleAuthSubmit}>
              {authMode === 'register' && (
                <>
                  <div className="admin-form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      required 
                      className="admin-input" 
                      value={authForm.name} 
                      onChange={e => setAuthForm({ ...authForm, name: e.target.value })} 
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Company / Brand Name</label>
                    <input 
                      type="text" 
                      required 
                      className="admin-input" 
                      value={authForm.company} 
                      onChange={e => setAuthForm({ ...authForm, company: e.target.value })} 
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Mobile Number</label>
                    <input 
                      type="tel" 
                      required 
                      className="admin-input" 
                      value={authForm.phone} 
                      onChange={e => setAuthForm({ ...authForm, phone: e.target.value })} 
                    />
                  </div>
                </>
              )}

              <div className="admin-form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  required 
                  className="admin-input" 
                  value={authForm.email} 
                  onChange={e => setAuthForm({ ...authForm, email: e.target.value })} 
                />
              </div>

              <div className="admin-form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  required 
                  className="admin-input" 
                  value={authForm.password} 
                  onChange={e => setAuthForm({ ...authForm, password: e.target.value })} 
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
                disabled={authLoading}
              >
                <span>{authLoading ? 'Authenticating...' : authMode === 'login' ? 'Sign In to Portal' : 'Register & Access Portal'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Logged-in Customer View
  return (
    <div className="portal-page">
      <div className="container">
        {/* Welcome Header */}
        <div className="portal-welcome-banner">
          <div>
            <span className="hb-badge-tag" style={{ marginBottom: '8px' }}>
              <ShieldCheck size={14} /> Verified Client Portal
            </span>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 6px 0' }}>
              Welcome back, {clientUser?.name || 'Siddharth'}
            </h1>
            <p style={{ color: 'var(--text-body)', margin: 0, fontSize: '0.92rem' }}>
              Organization: <strong style={{ color: '#fff' }}>{clientUser?.company || 'Apex Healthtech Pvt Ltd'}</strong> &bull; Client ID: <span style={{ color: 'var(--coral-400)' }}>CL-2026-904</span>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Link to="/tools/track" className="btn btn-glass" style={{ fontSize: '0.85rem' }}>
              Public Tracker
            </Link>
            <button className="btn btn-glass" onClick={handleLogout} title="Sign Out">
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Layout Grid: Trackers on Left, Vault & New Booking on Right */}
        <div className="portal-section-grid">
          {/* LEFT: Active Service Filings */}
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '20px' }}>
              Active Service Applications ({requests.length})
            </h2>

            {requests.map(req => (
              <div key={req.referenceNumber} className="portal-tracker-card">
                <div className="portal-tracker-header">
                  <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--coral-400)', letterSpacing: '0.05em' }}>
                      {req.referenceNumber} &bull; {req.category}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: '4px 0 0' }}>
                      {req.serviceTitle}
                    </h3>
                  </div>
                  <div>
                    <span className="hb-badge-tag" style={{ margin: 0 }}>
                      <Clock size={12} /> {req.status}
                    </span>
                  </div>
                </div>

                {/* Milestones Flow */}
                <div className="portal-milestones-list">
                  {req.milestones.map((m, idx) => (
                    <div 
                      key={idx} 
                      className={`portal-milestone-item ${m.done ? 'done' : ''} ${m.active ? 'active' : ''}`}
                    >
                      <div className="portal-milestone-bullet">
                        {m.done && <CheckCircle2 size={12} />}
                      </div>
                      <div className="portal-milestone-title">
                        {m.step}. {m.title}
                      </div>
                      <div className="portal-milestone-desc">
                        {m.desc}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Financial Summary */}
                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Professional: ₹{req.professionalFee} &bull; Govt: ₹{req.govtFee} &bull; GST (18%): ₹{req.gst}
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    Total: ₹{req.totalFee}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Document Vault & New Service Form */}
          <div>
            {/* Document Vault */}
            <div className="portal-vault-card" style={{ marginBottom: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
                  Statutory Document Vault
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--coral-400)', fontWeight: 600 }}>
                  256-Bit Encrypted
                </span>
              </div>

              <div>
                {vaultDocs.map((doc, idx) => (
                  <div key={idx} className="portal-doc-item">
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)' }}>{doc.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Updated: {doc.date}</div>
                    </div>
                    <div>
                      {doc.status === 'Verified' && (
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle2 size={14} /> Verified
                        </span>
                      )}
                      {doc.status === 'Under Review' && (
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FBBF24', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={14} /> In Review
                        </span>
                      )}
                      {doc.status === 'Pending Upload' && (
                        <button 
                          className="btn btn-primary" 
                          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                          onClick={() => handleSimulateUpload(doc.name)}
                        >
                          <Upload size={12} /> Upload
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Request Another Service */}
            <div className="portal-vault-card">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '14px' }}>
                Request Another Service
              </h3>

              {bookingSuccess && (
                <div style={{ padding: '10px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10B981', borderRadius: '8px', color: '#fff', fontSize: '0.82rem', marginBottom: '14px' }}>
                  ✓ Application initiated! Track it in your active filings list.
                </div>
              )}

              <form onSubmit={handleBookService}>
                <div className="admin-form-group">
                  <label>Service Category</label>
                  <select 
                    className="admin-input"
                    value={newServiceCategory}
                    onChange={e => setNewServiceCategory(e.target.value)}
                  >
                    <option value="business-registration">Business Registration</option>
                    <option value="gst-taxation">GST & Taxation</option>
                    <option value="trademark-legal">Trademark & Legal</option>
                    <option value="licences-certifications">Licences & Certifications</option>
                    <option value="ecommerce-management">eCommerce Management</option>
                    <option value="accounting-financial">Accounting & Payroll</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label>Service Name</label>
                  <input 
                    type="text"
                    required
                    className="admin-input"
                    value={newServiceName}
                    onChange={e => setNewServiceName(e.target.value)}
                    placeholder="e.g. Trademark Registration Class 35"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Notes / Specific Instructions</label>
                  <textarea 
                    rows="3"
                    className="admin-input"
                    value={newServiceNotes}
                    onChange={e => setNewServiceNotes(e.target.value)}
                    placeholder="Additional details for your assigned specialist..."
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <Plus size={16} />
                  <span>Submit Service Request</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

