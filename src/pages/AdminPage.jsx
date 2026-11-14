import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Users, 
  FileText, 
  Layers, 
  Settings, 
  Download, 
  Plus, 
  LogOut, 
  CheckCircle, 
  Clock, 
  Search, 
  Filter, 
  ChevronRight,
  TrendingUp,
  Save,
  Trash2,
  Globe,
  ExternalLink,
  Eye,
  EyeOff,
  Sparkles,
  Sliders
} from 'lucide-react';
import './Admin.css';

export default function AdminPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem('adminToken') || '');
  // Portfolio state
  const [portfolioProjects, setPortfolioProjects] = useState([]);
  const [portfolioLoading, setPortfolioLoading] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProjForm, setNewProjForm] = useState({
    title: '',
    clientName: '',
    url: '',
    category: 'eCommerce',
    industry: '',
    shortDescription: '',
    logo: '/brands/default.png',
    screenshot: '/portfolio/default.webp',
    inHeroStrip: true,
    published: true
  });

  const [activeTab, setActiveTab] = useState('crm');

  // Services Management State
  const [servicesList, setServicesList] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [serviceActionMsg, setServiceActionMsg] = useState('');
  const [editingService, setEditingService] = useState(null);
  const [showAddService, setShowAddService] = useState(false);
  const [newServiceForm, setNewServiceForm] = useState({
    name: '',
    slug: '',
    category: 'business-services',
    tagline: '',
    description: '',
    iconName: 'Building2',
    badge: 'Popular',
    active: true
  });
  
  // Login form state
  const [email, setEmail] = useState('admin@dottangle.com');
  const [password, setPassword] = useState('Dottangle@2026!');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // CRM state
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [crmFilter, setCrmFilter] = useState('all');
  const [crmLoading, setCrmLoading] = useState(false);

  // Blog CMS state
  const [blogArticles, setBlogArticles] = useState([]);
  const [showNewBlogModal, setShowNewBlogModal] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: '',
    slug: '',
    category: 'Business Registration',
    readTime: '5 min read',
    excerpt: '',
    author: 'Dottangel Advisory Team',
    content: ''
  });

  // Settings state
  const [siteSettings, setSiteSettings] = useState({
    heroHeadline: 'Your Complete Business Growth Partner',
    heroSubheadline: 'From business registration and legal compliance to eCommerce, technology and digital marketing — everything your business needs under one roof.',
    contactPhone: '+91 98765 43210',
    contactEmail: 'contact@dottangle.com',
    announcementBanner: 'Accepting New Client Projects for 2026 · Incorporate in 7 Days'
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // On Login Submit
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }
      setToken(data.token);
      sessionStorage.setItem('adminToken', data.token);
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    sessionStorage.removeItem('adminToken');
  };

  // Fetch inquiries when token changes or crm tab active
  useEffect(() => {
    if (!token) return;
    setCrmLoading(true);
    fetch('/api/admin/inquiries', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.inquiries) {
          setInquiries(data.inquiries);
        }
      })
      .catch(() => {})
      .finally(() => setCrmLoading(false));

    // Fetch blogs
    fetch('/api/blogs')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.articles) setBlogArticles(data.articles);
      })
      .catch(() => {});

    // Fetch portfolio projects
    fetch('/api/admin/portfolio', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (Array.isArray(data)) setPortfolioProjects(data);
      })
      .catch(() => {});

    // Fetch services catalog
    fetch('/api/admin/services', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && Array.isArray(data.services)) setServicesList(data.services);
      })
      .catch(() => {});
  }, [token]);

  // Services Management Actions
  const handleToggleService = async (svc) => {
    const newActive = !svc.active;
    try {
      const res = await fetch(`/api/admin/services/${svc.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ active: newActive })
      });
      if (res.ok) {
        setServicesList(prev => prev.map(s => s.id === svc.id ? { ...s, active: newActive } : s));
        setServiceActionMsg(`Service category "${svc.name}" ${newActive ? 'activated' : 'deactivated / archived'}.`);
        setTimeout(() => setServiceActionMsg(''), 4000);
      }
    } catch {
      alert('Failed to update service status');
    }
  };

  const handleSaveService = async (e) => {
    e.preventDefault();
    if (!editingService) return;
    try {
      const res = await fetch(`/api/admin/services/${editingService.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(editingService)
      });
      if (res.ok) {
        setServicesList(prev => prev.map(s => s.id === editingService.id ? { ...s, ...editingService } : s));
        setEditingService(null);
        setServiceActionMsg('Service updated successfully.');
        setTimeout(() => setServiceActionMsg(''), 4000);
      }
    } catch {
      alert('Failed to save service');
    }
  };

  const handleCreateService = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(newServiceForm)
      });
      if (res.ok) {
        const data = await res.json();
        setServicesList(prev => [...prev, data.service]);
        setShowAddService(false);
        setNewServiceForm({
          name: '',
          slug: '',
          category: 'business-services',
          tagline: '',
          description: '',
          iconName: 'Building2',
          badge: 'Popular',
          active: true
        });
        setServiceActionMsg('New service category created.');
        setTimeout(() => setServiceActionMsg(''), 4000);
      }
    } catch {
      alert('Failed to create service');
    }
  };

  // Update inquiry status
  const handleStatusChange = async (inquiryId, newStatus) => {
    try {
      const res = await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setInquiries(prev => prev.map(inq => inq._id === inquiryId ? { ...inq, status: newStatus } : inq));
        if (selectedInquiry?._id === inquiryId) {
          setSelectedInquiry(prev => ({ ...prev, status: newStatus }));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Update inquiry internal notes
  const handleSaveNotes = async (inquiryId, notes) => {
    try {
      await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ internalNotes: notes })
      });
      alert('Internal notes saved successfully');
    } catch (e) {
      console.error(e);
    }
  };

  // Export CSV
  const exportToCsv = () => {
    if (inquiries.length === 0) return alert('No inquiries to export');
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Status', 'Date', 'Message'];
    const rows = inquiries.map(inq => [
      inq._id,
      `"${inq.name || ''}"`,
      inq.email || '',
      inq.phone || '',
      `"${inq.company || ''}"`,
      `"${inq.service || ''}"`,
      inq.status || 'new',
      inq.createdAt || '',
      `"${(inq.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `dottangel-inquiries-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Create Blog Article
  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newBlog)
      });
      const data = await res.json();
      if (res.ok) {
        setBlogArticles(prev => [data.article, ...prev]);
        setShowNewBlogModal(false);
        setNewBlog({
          title: '',
          slug: '',
          category: 'Business Registration',
          readTime: '5 min read',
          excerpt: '',
          author: 'Dottangel Advisory Team',
          content: ''
        });
        alert('Article published successfully!');
      } else {
        alert(data.error || 'Failed to create article');
      }
    } catch (err) {
      alert(err.message);
    }
  };


  // Toggle featured status
  const handleToggleFeatured = async (proj) => {
    const updated = !proj.featured;
    try {
      const res = await fetch(`/api/admin/portfolio/${proj.id || proj.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ featured: updated, isTopFeatured: updated && proj.slug === 'apex-vouchers' })
      });
      if (res.ok) {
        setPortfolioProjects(prev => prev.map(p => (p.id === proj.id || p.slug === proj.slug) ? { ...p, featured: updated, isTopFeatured: updated && proj.slug === 'apex-vouchers' } : p));
      }
    } catch {
      alert('Failed to update featured status');
    }
  };

  // Toggle hero strip visibility
  const handleToggleHero = async (proj) => {
    const updated = !proj.inHeroStrip;
    try {
      const res = await fetch(`/api/admin/portfolio/${proj.id || proj.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ inHeroStrip: updated })
      });
      if (res.ok) {
        setPortfolioProjects(prev => prev.map(p => (p.id === proj.id || p.slug === proj.slug) ? { ...p, inHeroStrip: updated } : p));
      }
    } catch {
      alert('Failed to update hero strip status');
    }
  };

  // Toggle published status
  const handleTogglePublished = async (proj) => {
    const updated = !proj.published;
    try {
      const res = await fetch(`/api/admin/portfolio/${proj.id || proj.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ published: updated })
      });
      if (res.ok) {
        setPortfolioProjects(prev => prev.map(p => (p.id === proj.id || p.slug === proj.slug) ? { ...p, published: updated } : p));
      }
    } catch {
      alert('Failed to update published status');
    }
  };

  // Save edited project
  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!editingProject) return;
    try {
      const res = await fetch(`/api/admin/portfolio/${editingProject.id || editingProject.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(editingProject)
      });
      if (res.ok) {
        const data = await res.json();
        setPortfolioProjects(prev => prev.map(p => (p.id === editingProject.id || p.slug === editingProject.slug) ? data.project : p));
        setEditingProject(null);
      }
    } catch {
      alert('Failed to save project changes');
    }
  };

  // Create new project
  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(newProjForm)
      });
      if (res.ok) {
        const data = await res.json();
        setPortfolioProjects(prev => [...prev, data.project]);
        setShowAddProject(false);
        setNewProjForm({
          title: '',
          clientName: '',
          url: '',
          category: 'eCommerce',
          industry: '',
          shortDescription: '',
          logo: '/brands/default.png',
          screenshot: '/portfolio/default.webp',
          inHeroStrip: true,
          published: true
        });
      }
    } catch {
      alert('Failed to create project');
    }
  };

  // Delete project
  const handleDeleteProject = async (idOrSlug) => {
    if (!confirm('Are you sure you want to delete this portfolio project?')) return;
    try {
      const res = await fetch(`/api/admin/portfolio/${idOrSlug}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setPortfolioProjects(prev => prev.filter(p => p.id !== idOrSlug && p.slug !== idOrSlug));
      }
    } catch {
      alert('Failed to delete project');
    }
  };

  // Filtered inquiries
  const filteredInquiries = inquiries.filter(inq => {
    if (crmFilter === 'all') return true;
    return inq.status === crmFilter;
  });

  // Not Logged In View
  if (!token) {
    return (
      <div className="admin-page">
        <div className="container">
          <div className="admin-login-wrapper">
            <div className="admin-login-header">
              <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(255, 94, 98, 0.1)', borderRadius: '16px', color: 'var(--coral-400)', marginBottom: '14px' }}>
                <ShieldCheck size={32} />
              </div>
              <h2>Dottangel Admin Portal</h2>
              <p>Sign in to manage CRM inquiries, client service filings, pricing, and content.</p>
            </div>

            {loginError && (
              <div style={{ padding: '12px', background: 'rgba(224, 72, 77, 0.15)', border: '1px solid var(--coral-500)', borderRadius: '8px', color: '#fff', fontSize: '0.88rem', marginBottom: '20px' }}>
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="admin-form-group">
                <label>Admin Email</label>
                <input
                  type="email"
                  className="admin-input"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="admin-input"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
                disabled={loginLoading}
              >
                <span>{loginLoading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Logged In Admin Dashboard
  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-layout">
          {/* Top Bar */}
          <div className="admin-top-bar">
            <div>
              <span className="hb-badge-tag" style={{ marginBottom: '6px' }}>
                <ShieldCheck size={14} /> Master Control Centre
              </span>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                Operations & CRM Dashboard
              </h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div className="admin-tabs-nav">
                <button 
                  className={`admin-tab-btn ${activeTab === 'crm' ? 'active' : ''}`}
                  onClick={() => setActiveTab('crm')}
                >
                  <Users size={16} /> CRM Enquiries
                </button>
                <button 
                  className={`admin-tab-btn ${activeTab === 'blogs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('blogs')}
                >
                  <FileText size={16} /> Knowledge CMS
                </button>

                <button 
                  className={`admin-tab-btn ${activeTab === 'portfolio' ? 'active' : ''}`}
                  onClick={() => setActiveTab('portfolio')}
                >
                  <Globe size={16} /> Portfolio & Brands
                </button>
                <button 
                  className={`admin-tab-btn ${activeTab === 'services' ? 'active' : ''}`}
                  onClick={() => setActiveTab('services')}
                >
                  <Sliders size={16} /> Services ({servicesList.filter(s => s.active !== false).length})
                </button>
                <button 
                  className={`admin-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings size={16} /> Site Settings
                </button>
              </div>

              <button className="btn btn-glass" onClick={handleLogout} title="Sign Out">
                <LogOut size={16} />
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="admin-stats-row">
            <div className="admin-stat-card">
              <div className="admin-stat-title">Total Enquiries</div>
              <div className="admin-stat-val">{inquiries.length}</div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-title">Pending New Inquiries</div>
              <div className="admin-stat-val" style={{ color: 'var(--coral-400)' }}>
                {inquiries.filter(i => i.status === 'new' || !i.status).length}
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-title">Active Service Requests</div>
              <div className="admin-stat-val" style={{ color: '#10B981' }}>12</div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-title">Published Articles</div>
              <div className="admin-stat-val">{blogArticles.length}</div>
            </div>
          </div>

          {/* TAB 1: CRM ENQUIRIES */}
          {activeTab === 'crm' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Filter size={16} color="var(--text-muted)" />
                  <select 
                    className="admin-input" 
                    style={{ width: 'auto', padding: '8px 14px' }}
                    value={crmFilter}
                    onChange={e => setCrmFilter(e.target.value)}
                  >
                    <option value="all">All Statuses ({inquiries.length})</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in_progress">In Progress</option>
                    <option value="qualified">Qualified</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <button className="btn btn-glass" onClick={exportToCsv}>
                  <Download size={16} />
                  <span>Export to CSV</span>
                </button>
              </div>

              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Client Name</th>
                      <th>Contact Info</th>
                      <th>Service Needed</th>
                      <th>Status</th>
                      <th>Received</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInquiries.map(inq => (
                      <tr key={inq._id}>
                        <td>
                          <strong>{inq.name}</strong>
                          {inq.company && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{inq.company}</div>}
                        </td>
                        <td>
                          <div>{inq.email}</div>
                          {inq.phone && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{inq.phone}</div>}
                        </td>
                        <td>
                          <span style={{ fontSize: '0.85rem', color: 'var(--coral-400)' }}>
                            {inq.service || 'General Consultation'}
                          </span>
                        </td>
                        <td>
                          <span className={`admin-badge ${inq.status || 'new'}`}>
                            {inq.status || 'new'}
                          </span>
                        </td>
                        <td style={{ fontSize: '0.82rem' }}>
                          {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : 'Today'}
                        </td>
                        <td>
                          <button 
                            className="btn btn-glass" 
                            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                            onClick={() => setSelectedInquiry(inq)}
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredInquiries.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                          No enquiries found in this view.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Inspect Modal/Panel */}
              {selectedInquiry && (
                <div className="admin-detail-panel">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.25rem' }}>
                      Enquiry Details: {selectedInquiry.name}
                    </h3>
                    <button className="btn btn-glass" onClick={() => setSelectedInquiry(null)}>
                      Close
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Client Email</div>
                      <div style={{ color: 'var(--text-main)' }}>{selectedInquiry.email}</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Phone Number</div>
                      <div style={{ color: 'var(--text-main)' }}>{selectedInquiry.phone || 'Not provided'}</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Service Requested</div>
                      <div style={{ color: 'var(--coral-400)', fontWeight: 600 }}>{selectedInquiry.service || 'General'}</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Current Status</div>
                      <select 
                        className="admin-input"
                        style={{ marginTop: '4px' }}
                        value={selectedInquiry.status || 'new'}
                        onChange={e => handleStatusChange(selectedInquiry._id, e.target.value)}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in_progress">In Progress</option>
                        <option value="qualified">Qualified</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '6px' }}>Project Message</div>
                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', color: 'var(--text-body)', whiteSpace: 'pre-wrap' }}>
                      {selectedInquiry.message || 'No additional message provided.'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: BLOG CMS */}
          {activeTab === 'blogs' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.3rem', color: 'var(--text-main)', margin: 0 }}>
                  Published Knowledge Centre Articles
                </h2>
                <button className="btn btn-primary" onClick={() => setShowNewBlogModal(true)}>
                  <Plus size={16} />
                  <span>New Article</span>
                </button>
              </div>

              {showNewBlogModal && (
                <div className="admin-detail-panel" style={{ marginBottom: '30px' }}>
                  <h3 style={{ color: 'var(--text-main)', marginBottom: '20px' }}>Publish New Guide</h3>
                  <form onSubmit={handleCreateBlog}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '16px' }}>
                      <div>
                        <label className="admin-form-group">Article Title</label>
                        <input
                          type="text"
                          required
                          className="admin-input"
                          placeholder="e.g. Complete GST Registration Guide 2026"
                          value={newBlog.title}
                          onChange={e => setNewBlog({ ...newBlog, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })}
                        />
                      </div>
                      <div>
                        <label className="admin-form-group">URL Slug</label>
                        <input
                          type="text"
                          required
                          className="admin-input"
                          value={newBlog.slug}
                          onChange={e => setNewBlog({ ...newBlog, slug: e.target.value })}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '16px' }}>
                      <div>
                        <label className="admin-form-group">Category</label>
                        <select
                          className="admin-input"
                          value={newBlog.category}
                          onChange={e => setNewBlog({ ...newBlog, category: e.target.value })}
                        >
                          <option value="Business Registration">Business Registration</option>
                          <option value="GST & Taxation">GST & Taxation</option>
                          <option value="Trademark & Legal">Trademark & Legal</option>
                          <option value="eCommerce Management">eCommerce Management</option>
                          <option value="Licences & Certifications">Licences & Certifications</option>
                          <option value="Technology & AI">Technology & AI</option>
                        </select>
                      </div>
                      <div>
                        <label className="admin-form-group">Read Time</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={newBlog.readTime}
                          onChange={e => setNewBlog({ ...newBlog, readTime: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="admin-form-group">
                      <label>Excerpt / Summary</label>
                      <input
                        type="text"
                        required
                        className="admin-input"
                        placeholder="Brief summary for listings..."
                        value={newBlog.excerpt}
                        onChange={e => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>Article Content</label>
                      <textarea
                        rows="6"
                        required
                        className="admin-input"
                        placeholder="Write detailed guide content..."
                        value={newBlog.content}
                        onChange={e => setNewBlog({ ...newBlog, content: e.target.value })}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '14px' }}>
                      <button type="submit" className="btn btn-primary">
                        <span>Publish Article</span>
                      </button>
                      <button type="button" className="btn btn-glass" onClick={() => setShowNewBlogModal(false)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Read Time</th>
                      <th>Slug</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogArticles.map(art => (
                      <tr key={art.slug}>
                        <td><strong>{art.title}</strong></td>
                        <td><span className="blog-cat-badge">{art.category}</span></td>
                        <td>{art.readTime || '5 min'}</td>
                        <td style={{ color: 'var(--text-muted)' }}>/blog/{art.slug}</td>
                        <td>
                          <a 
                            href={`/blog/${art.slug}`} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="btn btn-glass" 
                            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                          >
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          
          {/* TAB: PORTFOLIO & BRANDS */}
          {activeTab === 'portfolio' && (
            <div>
              <div className="admin-stats-row">
                <div className="admin-stat-card">
                  <div className="admin-stat-label">Total Portfolio Projects</div>
                  <div className="admin-stat-val">{portfolioProjects.length}</div>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-label">Active in Hero Logo Strip</div>
                  <div className="admin-stat-val" style={{ color: '#10B981' }}>
                    {portfolioProjects.filter(p => p.inHeroStrip !== false).length}
                  </div>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-label">Published Live</div>
                  <div className="admin-stat-val" style={{ color: '#F43F5E' }}>
                    {portfolioProjects.filter(p => p.published !== false).length}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: 0 }}>
                    Client Websites & Brand Logos
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                    Manage portfolio case studies, live links, and hero logo strip visibility.
                  </p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowAddProject(true)}>
                  <Plus size={16} /> Add Project
                </button>
              </div>

              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Brand Logo</th>
                      <th>Project & Client</th>
                      <th>Category</th>
                      <th>Live Website</th>
                      <th>Featured</th>
                      <th>Hero Strip</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolioProjects.map(proj => (
                      <tr key={proj.id || proj.slug}>
                        <td style={{ width: '80px' }}>
                          <div style={{ width: '56px', height: '36px', background: '#fff', borderRadius: '6px', border: '1px solid rgba(15,23,42,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' }}>
                            <img src={proj.logo} alt={proj.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                          </div>
                        </td>
                        <td>
                          <strong>{proj.title}</strong>
                          {proj.isTopFeatured && (
                            <span style={{ marginLeft: '8px', padding: '2px 8px', borderRadius: '12px', background: 'linear-gradient(135deg, #FF6B4A, #FFA07A)', color: '#fff', fontSize: '0.72rem', fontWeight: 800 }}>
                              ★ #1 TOP FEATURED
                            </span>
                          )}
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{proj.clientName || proj.industry} · Order #{proj.order || 99}</div>
                        </td>
                        <td>
                          <span className="admin-tag-pill" style={{ background: 'rgba(225,29,72,0.08)', color: 'var(--coral-500)', border: '1px solid rgba(225,29,72,0.2)' }}>
                            {proj.category}
                          </span>
                        </td>
                        <td>
                          <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--coral-500)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}>
                            <span>{proj.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
                            <ExternalLink size={12} />
                          </a>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-glass"
                            style={{ padding: '4px 10px', fontSize: '0.78rem', background: proj.featured ? 'rgba(255,107,74,0.12)' : 'rgba(148,163,184,0.08)', color: proj.featured ? '#FF6B4A' : '#94A3B8', border: `1px solid ${proj.featured ? '#FF6B4A' : 'rgba(148,163,184,0.2)'}` }}
                            onClick={() => handleToggleFeatured(proj)}
                          >
                            {proj.featured ? '★ Featured' : 'Standard'}
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-glass"
                            style={{ padding: '4px 10px', fontSize: '0.78rem', background: proj.inHeroStrip ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.08)', color: proj.inHeroStrip ? '#10B981' : '#EF4444', border: `1px solid ${proj.inHeroStrip ? '#10B981' : '#EF4444'}` }}
                            onClick={() => handleToggleHero(proj)}
                          >
                            {proj.inHeroStrip ? '✓ Shown in Hero' : '✗ Hidden in Hero'}
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-glass"
                            style={{ padding: '4px 10px', fontSize: '0.78rem', background: proj.published !== false ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.08)', color: proj.published !== false ? '#10B981' : '#EF4444', border: `1px solid ${proj.published !== false ? '#10B981' : '#EF4444'}` }}
                            onClick={() => handleTogglePublished(proj)}
                          >
                            {proj.published !== false ? 'Published' : 'Draft'}
                          </button>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              className="btn btn-glass"
                              style={{ padding: '5px 10px', fontSize: '0.8rem' }}
                              onClick={() => setEditingProject({ ...proj })}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-glass"
                              style={{ padding: '5px 8px', color: '#EF4444' }}
                              onClick={() => handleDeleteProject(proj.id || proj.slug)}
                              title="Delete Project"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Edit Project Modal */}
              {editingProject && (
                <div className="admin-modal-backdrop">
                  <div className="admin-modal-box" style={{ maxWidth: '640px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <h3 style={{ margin: 0 }}>Edit {editingProject.title}</h3>
                      <button className="btn btn-glass" onClick={() => setEditingProject(null)}>✕</button>
                    </div>
                    <form onSubmit={handleSaveProject}>
                      <div className="admin-form-group">
                        <label>Project Title</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={editingProject.title}
                          onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Client / Brand Name</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={editingProject.clientName || ''}
                          onChange={e => setEditingProject({ ...editingProject, clientName: e.target.value })}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Live Website URL</label>
                        <input
                          type="url"
                          className="admin-input"
                          value={editingProject.url}
                          onChange={e => setEditingProject({ ...editingProject, url: e.target.value })}
                          required
                        />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="admin-form-group">
                          <label>Category</label>
                          <select
                            className="admin-input"
                            value={editingProject.category}
                            onChange={e => setEditingProject({ ...editingProject, category: e.target.value })}
                          >
                            <option value="eCommerce">eCommerce</option>
                            <option value="Fashion & Boutique">Fashion & Boutique</option>
                            <option value="Food & Beverage">Food & Beverage</option>
                            <option value="Health & Herbal Products">Health & Herbal Products</option>
                            <option value="Education & Technology">Education & Technology</option>
                            <option value="Business Websites">Business Websites</option>
                          </select>
                        </div>
                        <div className="admin-form-group">
                          <label>Industry</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={editingProject.industry || ''}
                            onChange={e => setEditingProject({ ...editingProject, industry: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="admin-form-group">
                        <label>Short Description</label>
                        <textarea
                          rows="3"
                          className="admin-input"
                          value={editingProject.shortDescription}
                          onChange={e => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                          required
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '20px', margin: '16px 0' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem' }}>
                          <input
                            type="checkbox"
                            checked={editingProject.inHeroStrip !== false}
                            onChange={e => setEditingProject({ ...editingProject, inHeroStrip: e.target.checked })}
                          />
                          <span>Show Logo in Hero Marquee</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem' }}>
                          <input
                            type="checkbox"
                            checked={editingProject.published !== false}
                            onChange={e => setEditingProject({ ...editingProject, published: e.target.checked })}
                          />
                          <span>Published on Website</span>
                        </label>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                        <button type="button" className="btn btn-glass" onClick={() => setEditingProject(null)}>Cancel</button>
                        <button type="submit" className="btn btn-primary"><Save size={15} /> Save Changes</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Add Project Modal */}
              {showAddProject && (
                <div className="admin-modal-backdrop">
                  <div className="admin-modal-box" style={{ maxWidth: '640px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <h3 style={{ margin: 0 }}>Add New Portfolio Project</h3>
                      <button className="btn btn-glass" onClick={() => setShowAddProject(false)}>✕</button>
                    </div>
                    <form onSubmit={handleCreateProject}>
                      <div className="admin-form-group">
                        <label>Project / Brand Title</label>
                        <input
                          type="text"
                          className="admin-input"
                          placeholder="e.g. Apex Global Organics"
                          value={newProjForm.title}
                          onChange={e => setNewProjForm({ ...newProjForm, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Live Website URL</label>
                        <input
                          type="url"
                          className="admin-input"
                          placeholder="https://example.com"
                          value={newProjForm.url}
                          onChange={e => setNewProjForm({ ...newProjForm, url: e.target.value })}
                          required
                        />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="admin-form-group">
                          <label>Category</label>
                          <select
                            className="admin-input"
                            value={newProjForm.category}
                            onChange={e => setNewProjForm({ ...newProjForm, category: e.target.value })}
                          >
                            <option value="eCommerce">eCommerce</option>
                            <option value="Fashion & Boutique">Fashion & Boutique</option>
                            <option value="Food & Beverage">Food & Beverage</option>
                            <option value="Health & Herbal Products">Health & Herbal Products</option>
                            <option value="Education & Technology">Education & Technology</option>
                            <option value="Business Websites">Business Websites</option>
                          </select>
                        </div>
                        <div className="admin-form-group">
                          <label>Industry</label>
                          <input
                            type="text"
                            className="admin-input"
                            placeholder="e.g. Organic Nutrition"
                            value={newProjForm.industry}
                            onChange={e => setNewProjForm({ ...newProjForm, industry: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="admin-form-group">
                        <label>Short Description</label>
                        <textarea
                          rows="3"
                          className="admin-input"
                          placeholder="Summary of services delivered, technologies used, and business outcome..."
                          value={newProjForm.shortDescription}
                          onChange={e => setNewProjForm({ ...newProjForm, shortDescription: e.target.value })}
                          required
                        />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                        <button type="button" className="btn btn-glass" onClick={() => setShowAddProject(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary"><Plus size={15} /> Create Project</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SERVICES MANAGEMENT */}
          {activeTab === 'services' && (
            <div>
              <div className="admin-stats-row">
                <div className="admin-stat-card">
                  <div className="admin-stat-label">Total Practice Categories</div>
                  <div className="admin-stat-val">{servicesList.length}</div>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-label">Live on Public Website</div>
                  <div className="admin-stat-val" style={{ color: '#10B981' }}>
                    {servicesList.filter(s => s.active !== false).length}
                  </div>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-label">Archived / Deactivated</div>
                  <div className="admin-stat-val" style={{ color: '#64748B' }}>
                    {servicesList.filter(s => s.active === false).length}
                  </div>
                </div>
              </div>

              {serviceActionMsg && (
                <div style={{ padding: '12px 16px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10B981', borderRadius: '8px', color: '#fff', fontSize: '0.88rem', marginBottom: '20px' }}>
                  ✓ {serviceActionMsg}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: 0 }}>
                    Practice Areas & Services Catalog
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                    Enable or disable service categories in real-time. Deactivating archives public navigation while preserving customer records.
                  </p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowAddService(true)}>
                  <Plus size={16} /> Add Category
                </button>
              </div>

              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Icon</th>
                      <th>Category Name & Slug</th>
                      <th>Badge</th>
                      <th>Public Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicesList.map(svc => {
                      const isActive = svc.active !== false;
                      return (
                        <tr key={svc.id}>
                          <td style={{ width: '60px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255, 107, 74, 0.1)', color: '#FF6B4A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                              {svc.name.slice(0, 2).toUpperCase()}
                            </div>
                          </td>
                          <td>
                            <strong>{svc.name}</strong>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                              <code>/services/{svc.slug || svc.id}</code> · {svc.tagline || svc.description?.slice(0, 50)}
                            </div>
                          </td>
                          <td>
                            <span className="admin-tag-pill" style={{ background: 'rgba(225,29,72,0.08)', color: 'var(--coral-500)', border: '1px solid rgba(225,29,72,0.2)' }}>
                              {svc.badge || 'Standard'}
                            </span>
                          </td>
                          <td>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700, background: isActive ? 'rgba(16,185,129,0.1)' : 'rgba(148,163,184,0.12)', color: isActive ? '#10B981' : '#94A3B8', border: `1px solid ${isActive ? '#10B981' : 'rgba(148,163,184,0.3)'}` }}>
                              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isActive ? '#10B981' : '#94A3B8' }} />
                              {isActive ? 'Active Publicly' : 'Archived / Hidden'}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                type="button"
                                className="btn btn-glass"
                                style={{ padding: '4px 10px', fontSize: '0.78rem', color: isActive ? '#EF4444' : '#10B981' }}
                                onClick={() => handleToggleService(svc)}
                              >
                                {isActive ? 'Deactivate' : 'Reactivate'}
                              </button>
                              <button
                                type="button"
                                className="btn btn-glass"
                                style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                                onClick={() => setEditingService({ ...svc })}
                              >
                                Edit
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Edit Service Modal */}
              {editingService && (
                <div className="admin-modal-backdrop">
                  <div className="admin-modal-box" style={{ maxWidth: '580px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <h3 style={{ margin: 0 }}>Edit Category: {editingService.name}</h3>
                      <button className="btn btn-glass" onClick={() => setEditingService(null)}>✕</button>
                    </div>
                    <form onSubmit={handleSaveService}>
                      <div className="admin-form-group">
                        <label>Category Title</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={editingService.name}
                          onChange={e => setEditingService({ ...editingService, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Tagline</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={editingService.tagline || ''}
                          onChange={e => setEditingService({ ...editingService, tagline: e.target.value })}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Description</label>
                        <textarea
                          rows="3"
                          className="admin-input"
                          value={editingService.description || ''}
                          onChange={e => setEditingService({ ...editingService, description: e.target.value })}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Badge</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={editingService.badge || ''}
                          onChange={e => setEditingService({ ...editingService, badge: e.target.value })}
                        />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                        <button type="button" className="btn btn-glass" onClick={() => setEditingService(null)}>Cancel</button>
                        <button type="submit" className="btn btn-primary"><Save size={15} /> Save Changes</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Add Service Modal */}
              {showAddService && (
                <div className="admin-modal-backdrop">
                  <div className="admin-modal-box" style={{ maxWidth: '580px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <h3 style={{ margin: 0 }}>Add New Practice Area</h3>
                      <button className="btn btn-glass" onClick={() => setShowAddService(false)}>✕</button>
                    </div>
                    <form onSubmit={handleCreateService}>
                      <div className="admin-form-group">
                        <label>Category Title</label>
                        <input
                          type="text"
                          className="admin-input"
                          placeholder="e.g. Export-Import Licensing"
                          value={newServiceForm.name}
                          onChange={e => setNewServiceForm({ ...newServiceForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Slug</label>
                        <input
                          type="text"
                          className="admin-input"
                          placeholder="e.g. export-import-licensing"
                          value={newServiceForm.slug}
                          onChange={e => setNewServiceForm({ ...newServiceForm, slug: e.target.value })}
                          required
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Tagline</label>
                        <input
                          type="text"
                          className="admin-input"
                          placeholder="Short 1-line benefit description"
                          value={newServiceForm.tagline}
                          onChange={e => setNewServiceForm({ ...newServiceForm, tagline: e.target.value })}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Description</label>
                        <textarea
                          rows="3"
                          className="admin-input"
                          placeholder="Full practice area description..."
                          value={newServiceForm.description}
                          onChange={e => setNewServiceForm({ ...newServiceForm, description: e.target.value })}
                        />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                        <button type="button" className="btn btn-glass" onClick={() => setShowAddService(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary"><Plus size={15} /> Create Category</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: SITE SETTINGS */}
          {activeTab === 'settings' && (
            <div className="admin-detail-panel" style={{ maxWidth: '760px' }}>
              <h2 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '20px' }}>
                Global Website Settings & Brand Controls
              </h2>

              {settingsSaved && (
                <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10B981', borderRadius: '8px', color: '#fff', fontSize: '0.88rem', marginBottom: '20px' }}>
                  ✓ Settings saved successfully.
                </div>
              )}

              <div className="admin-form-group">
                <label>Homepage Headline</label>
                <input
                  type="text"
                  className="admin-input"
                  value={siteSettings.heroHeadline}
                  onChange={e => setSiteSettings({ ...siteSettings, heroHeadline: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label>Homepage Subheadline</label>
                <textarea
                  rows="3"
                  className="admin-input"
                  value={siteSettings.heroSubheadline}
                  onChange={e => setSiteSettings({ ...siteSettings, heroSubheadline: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label className="admin-form-group">Official Phone / WhatsApp</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={siteSettings.contactPhone}
                    onChange={e => setSiteSettings({ ...siteSettings, contactPhone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="admin-form-group">Official Support Email</label>
                  <input
                    type="email"
                    className="admin-input"
                    value={siteSettings.contactEmail}
                    onChange={e => setSiteSettings({ ...siteSettings, contactEmail: e.target.value })}
                  />
                </div>
              </div>

              <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', margin: '24px 0 12px' }}>
                Hero Logo Strip & Marquee Controls
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    id="marqueeToggle"
                    checked={siteSettings.heroMarqueeEnabled !== false}
                    onChange={e => setSiteSettings({ ...siteSettings, heroMarqueeEnabled: e.target.checked })}
                  />
                  <label htmlFor="marqueeToggle" style={{ cursor: 'pointer', margin: 0 }}>Enable Infinite Scrolling Marquee</label>
                </div>
                <div>
                  <label className="admin-form-group">Animation Cycle Duration (seconds)</label>
                  <input
                    type="number"
                    min="10"
                    max="60"
                    className="admin-input"
                    value={siteSettings.heroMarqueeSpeed || 28}
                    onChange={e => setSiteSettings({ ...siteSettings, heroMarqueeSpeed: Number(e.target.value) })}
                  />
                </div>
              </div>

              <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', margin: '24px 0 12px' }}>
                Official Social Media Channels
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label className="admin-form-group">WhatsApp Link</label>
                  <input
                    type="url"
                    className="admin-input"
                    value={siteSettings.whatsappUrl || 'https://wa.me/919876543210'}
                    onChange={e => setSiteSettings({ ...siteSettings, whatsappUrl: e.target.value })}
                  />
                </div>
                <div>
                  <label className="admin-form-group">Instagram Profile</label>
                  <input
                    type="url"
                    className="admin-input"
                    value={siteSettings.instagramUrl || 'https://instagram.com/dottangle'}
                    onChange={e => setSiteSettings({ ...siteSettings, instagramUrl: e.target.value })}
                  />
                </div>
                <div>
                  <label className="admin-form-group">LinkedIn Company Page</label>
                  <input
                    type="url"
                    className="admin-input"
                    value={siteSettings.linkedinUrl || 'https://linkedin.com/company/dottangle'}
                    onChange={e => setSiteSettings({ ...siteSettings, linkedinUrl: e.target.value })}
                  />
                </div>
                <div>
                  <label className="admin-form-group">Facebook Page</label>
                  <input
                    type="url"
                    className="admin-input"
                    value={siteSettings.facebookUrl || 'https://facebook.com/dottangle'}
                    onChange={e => setSiteSettings({ ...siteSettings, facebookUrl: e.target.value })}
                  />
                </div>
                <div>
                  <label className="admin-form-group">YouTube Channel</label>
                  <input
                    type="url"
                    className="admin-input"
                    value={siteSettings.youtubeUrl || 'https://youtube.com/@dottangle'}
                    onChange={e => setSiteSettings({ ...siteSettings, youtubeUrl: e.target.value })}
                  />
                </div>
              </div>

              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => {
                  setSettingsSaved(true);
                  setTimeout(() => setSettingsSaved(false), 3000);
                }}
              >
                <Save size={16} />
                <span>Save All Settings</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

