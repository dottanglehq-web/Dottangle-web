import { Router } from 'express';
import { platformStore, verifyPassword, hashPassword, createSessionToken, verifySessionToken } from './dataStore.js';

export function createPlatformRouter() {
  const router = Router();

  // Middleware to authenticate Admin
  const requireAdmin = (req, res, next) => {
    const authHeader = req.get('authorization') || '';
    const token = authHeader.replace(/^Bearer\s+/i, '');
    const session = verifySessionToken(token);
    if (!session || session.role !== 'admin') {
      return res.status(401).json({ error: 'Admin authorization required.' });
    }
    req.admin = session;
    next();
  };

  // Middleware to authenticate Customer (or Admin)
  const requireCustomer = (req, res, next) => {
    const authHeader = req.get('authorization') || '';
    const token = authHeader.replace(/^Bearer\s+/i, '');
    const session = verifySessionToken(token);
    if (!session) {
      return res.status(401).json({ error: 'Authentication required.' });
    }
    req.user = session;
    next();
  };

  // ==========================================
  // 1. ADMIN AUTH & MANAGEMENT ENDPOINTS
  // ==========================================
  router.post('/admin/login', async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });

    // Allow default configured admin or customer with admin role
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@dottangle.com';
    const adminPass = process.env.ADMIN_PASSWORD || 'Dottangle@2026!';

    if (email.toLowerCase() === adminEmail.toLowerCase() && password === adminPass) {
      const token = createSessionToken('ADMIN-001', 'admin');
      return res.json({
        success: true,
        token,
        user: { name: 'Dottangle Administrator', email: adminEmail, role: 'admin' }
      });
    }

    const customer = await platformStore.findCustomerByEmail(email);
    if (customer && customer.role === 'admin' && verifyPassword(password, customer.passwordHash)) {
      const token = createSessionToken(customer.customerId, 'admin');
      return res.json({
        success: true,
        token,
        user: { name: customer.name, email: customer.email, role: 'admin' }
      });
    }

    return res.status(401).json({ error: 'Invalid admin credentials.' });
  });

  router.get('/admin/me', requireAdmin, (req, res) => {
    res.json({ success: true, admin: req.admin });
  });

  // CRM / Inquiries
  router.get('/admin/inquiries', requireAdmin, async (req, res) => {
    try {
      const result = await platformStore.getInquiries(req.query);
      res.json(result);
    } catch {
      res.status(500).json({ error: 'Failed to retrieve inquiries.' });
    }
  });

  router.patch('/admin/inquiries/:id', requireAdmin, async (req, res) => {
    try {
      const updated = await platformStore.updateInquiryStatus(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: 'Inquiry not found.' });
      res.json({ success: true, inquiry: updated });
    } catch {
      res.status(500).json({ error: 'Failed to update inquiry.' });
    }
  });

  router.get('/admin/inquiries/export', requireAdmin, async (req, res) => {
    try {
      const { items } = await platformStore.getInquiries({ limit: 1000 });
      const headers = ['Submission ID', 'Date', 'Name', 'Email', 'Phone', 'Company', 'Services', 'Status', 'Assigned To', 'Notes'];
      const rows = items.map(i => [
        `"${i.submissionId || ''}"`,
        `"${new Date(i.createdAt).toISOString()}"`,
        `"${(i.name || '').replace(/"/g, '""')}"`,
        `"${(i.email || '').replace(/"/g, '""')}"`,
        `"${(i.phone || '').replace(/"/g, '""')}"`,
        `"${(i.company || '').replace(/"/g, '""')}"`,
        `"${(Array.isArray(i.services) ? i.services.join('; ') : '').replace(/"/g, '""')}"`,
        `"${i.status || 'New'}"`,
        `"${(i.assignedTo || 'Unassigned').replace(/"/g, '""')}"`,
        `"${(i.notes || '').replace(/"/g, '""')}"`
      ]);
      const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="dottangle-inquiries.csv"');
      res.send(csv);
    } catch {
      res.status(500).json({ error: 'Failed to export CSV.' });
    }
  });

  // Admin Blog CRUD
  router.get('/admin/blogs', requireAdmin, async (req, res) => {
    try {
      const blogs = await platformStore.getBlogs({ includeUnpublished: true });
      res.json(blogs);
    } catch {
      res.status(500).json({ error: 'Failed to retrieve blogs.' });
    }
  });

  router.post('/admin/blogs', requireAdmin, async (req, res) => {
    try {
      const saved = await platformStore.saveBlog(req.body);
      res.status(201).json({ success: true, blog: saved });
    } catch {
      res.status(500).json({ error: 'Failed to save blog.' });
    }
  });

  router.patch('/admin/blogs/:slug', requireAdmin, async (req, res) => {
    try {
      const saved = await platformStore.saveBlog({ ...req.body, slug: req.params.slug });
      res.json({ success: true, blog: saved });
    } catch {
      res.status(500).json({ error: 'Failed to update blog.' });
    }
  });

  router.delete('/admin/blogs/:slug', requireAdmin, async (req, res) => {
    try {
      await platformStore.deleteBlog(req.params.slug);
      res.json({ success: true });
    } catch {
      res.status(500).json({ error: 'Failed to delete blog.' });
    }
  });

  // Admin Settings
  router.get('/admin/settings', requireAdmin, async (req, res) => {
    const settings = await platformStore.getSettings();
    res.json(settings);
  });

  router.put('/admin/settings', requireAdmin, async (req, res) => {
    try {
      const updated = await platformStore.updateSettings(req.body);
      res.json({ success: true, settings: updated });
    } catch {
      res.status(500).json({ error: 'Failed to update settings.' });
    }
  });

  // Admin Portfolio Management
  router.get('/admin/portfolio', requireAdmin, async (req, res) => {
    try {
      const items = await platformStore.getPortfolioProjects({ includeUnpublished: true });
      res.json(items);
    } catch {
      res.status(500).json({ error: 'Failed to load portfolio items.' });
    }
  });

  router.post('/admin/portfolio', requireAdmin, async (req, res) => {
    try {
      const created = await platformStore.createPortfolioProject(req.body);
      res.status(201).json({ success: true, project: created });
    } catch {
      res.status(500).json({ error: 'Failed to create portfolio item.' });
    }
  });

  router.put('/admin/portfolio/:id', requireAdmin, async (req, res) => {
    try {
      const updated = await platformStore.updatePortfolioProject(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: 'Project not found.' });
      res.json({ success: true, project: updated });
    } catch {
      res.status(500).json({ error: 'Failed to update portfolio item.' });
    }
  });

  router.delete('/admin/portfolio/:id', requireAdmin, async (req, res) => {
    try {
      const success = await platformStore.deletePortfolioProject(req.params.id);
      res.json({ success });
    } catch {
      res.status(500).json({ error: 'Failed to delete portfolio item.' });
    }
  });

  // Admin Services & Category Management
  router.get('/admin/services', requireAdmin, async (req, res) => {
    try {
      const items = await platformStore.getServices({ includeArchived: true });
      res.json({ services: items, totalCount: items.length });
    } catch {
      res.status(500).json({ error: 'Failed to load services.' });
    }
  });

  router.post('/admin/services', requireAdmin, async (req, res) => {
    try {
      const created = await platformStore.createService(req.body);
      res.status(201).json({ success: true, service: created });
    } catch {
      res.status(500).json({ error: 'Failed to create service.' });
    }
  });

  router.put('/admin/services/:id', requireAdmin, async (req, res) => {
    try {
      const updated = await platformStore.updateService(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: 'Service category not found.' });
      res.json({ success: true, service: updated });
    } catch {
      res.status(500).json({ error: 'Failed to update service.' });
    }
  });

  // ==========================================
  // 2. CUSTOMER PORTAL ENDPOINTS
  // ==========================================
  router.post('/portal/register', async (req, res) => {
    const { email, password, name, phone, company } = req.body || {};
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }
    const existing = await platformStore.findCustomerByEmail(email);
    if (existing) {
      return res.status(400).json({ error: 'An account with this email already exists. Please log in.' });
    }
    const customer = await platformStore.createCustomer({ email, password, name, phone, company });
    const token = createSessionToken(customer.customerId, 'client');
    res.status(201).json({
      success: true,
      token,
      user: { customerId: customer.customerId, name: customer.name, email: customer.email, company: customer.company }
    });
  });

  router.post('/portal/login', async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });
    const customer = await platformStore.findCustomerByEmail(email);
    if (!customer || !verifyPassword(password, customer.passwordHash)) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    const token = createSessionToken(customer.customerId, customer.role || 'client');
    res.json({
      success: true,
      token,
      user: { customerId: customer.customerId, name: customer.name, email: customer.email, company: customer.company, role: customer.role }
    });
  });

  router.get('/portal/me', requireCustomer, async (req, res) => {
    const customer = await platformStore.customers.find(c => c.customerId === req.user.userId);
    if (!customer) return res.status(404).json({ error: 'Customer not found.' });
    res.json({
      success: true,
      user: { customerId: customer.customerId, name: customer.name, email: customer.email, company: customer.company, phone: customer.phone, role: customer.role }
    });
  });

  router.get('/portal/requests', requireCustomer, async (req, res) => {
    const customer = await platformStore.customers.find(c => c.customerId === req.user.userId);
    const email = customer?.email || req.user.userId;
    const requests = await platformStore.getServiceRequestsForCustomer(email);
    res.json(requests);
  });

  router.post('/portal/requests', requireCustomer, async (req, res) => {
    try {
      const customer = await platformStore.customers.find(c => c.customerId === req.user.userId);
      const data = {
        ...req.body,
        customerId: req.user.userId,
        customerEmail: customer?.email || req.body.customerEmail,
        customerName: customer?.name || req.body.customerName
      };
      const created = await platformStore.createServiceRequest(data);
      res.status(201).json({ success: true, request: created });
    } catch {
      res.status(500).json({ error: 'Failed to create service request.' });
    }
  });

  router.post('/portal/upload', requireCustomer, (req, res) => {
    const { fileName, fileType, fileSize, title } = req.body || {};
    if (!fileName) return res.status(400).json({ error: 'File metadata required.' });
    if (fileSize > 10 * 1024 * 1024) return res.status(400).json({ error: 'File exceeds 10MB limit.' });
    const docId = `DOC-${Math.floor(1000 + Math.random() * 9000)}`;
    res.status(201).json({
      success: true,
      document: {
        docId,
        title: title || fileName,
        fileName,
        fileType: fileType || 'application/pdf',
        fileSize: fileSize || 500000,
        uploadedAt: new Date(),
        status: 'verified',
        downloadUrl: '#'
      }
    });
  });

  // ==========================================
  // 3. PUBLIC BLOG ENDPOINTS
  // ==========================================
  router.get('/blogs', async (req, res) => {
    try {
      const blogs = await platformStore.getBlogs(req.query);
      res.json(blogs);
    } catch {
      res.status(500).json({ error: 'Failed to load blog articles.' });
    }
  });

  router.get('/blogs/:slug', async (req, res) => {
    try {
      const blog = await platformStore.getBlogBySlug(req.params.slug);
      if (!blog) return res.status(404).json({ error: 'Blog post not found.' });
      res.json(blog);
    } catch {
      res.status(500).json({ error: 'Failed to load article.' });
    }
  });

  // ==========================================
  // 3b. PUBLIC PORTFOLIO ENDPOINTS
  // ==========================================
  router.get('/portfolio', async (req, res) => {
    try {
      const items = await platformStore.getPortfolioProjects(req.query);
      res.json(items);
    } catch {
      res.status(500).json({ error: 'Failed to load portfolio projects.' });
    }
  });

  router.get('/portfolio/:slug', async (req, res) => {
    try {
      const item = await platformStore.getPortfolioProjectBySlug(req.params.slug);
      if (!item) return res.status(404).json({ error: 'Portfolio project not found.' });
      res.json(item);
    } catch {
      res.status(500).json({ error: 'Failed to load portfolio project.' });
    }
  });

  router.get('/services', async (req, res) => {
    try {
      const items = await platformStore.getServices({ includeArchived: false });
      res.json({ services: items, totalCount: items.length });
    } catch {
      res.status(500).json({ error: 'Failed to load services.' });
    }
  });

  // ==========================================
  // 4. PUBLIC TOOLS ENDPOINTS
  // ==========================================
  router.post('/tools/calculate', (req, res) => {
    const { services = [] } = req.body || {};
    if (!Array.isArray(services)) return res.status(400).json({ error: 'Invalid service list.' });

    // Standard fee directory for all major services
    const feesMap = {
      'private-limited-company': { pro: 6999, govt: 1500, label: 'Private Limited Company Registration' },
      'llp-registration': { pro: 5999, govt: 1000, label: 'LLP Registration' },
      'opc-registration': { pro: 5499, govt: 1500, label: 'One Person Company Registration' },
      'gst-registration': { pro: 1999, govt: 0, label: 'GST Registration' },
      'gst-return-filing': { pro: 1499, govt: 0, label: 'Monthly GST Return Filing' },
      'trademark-registration': { pro: 2499, govt: 4500, label: 'Trademark Registration (TM-A)' },
      'trademark-search': { pro: 999, govt: 0, label: 'Trademark Search & Class Report' },
      'fssai-registration': { pro: 1499, govt: 100, label: 'FSSAI Food Registration' },
      'fssai-state-licence': { pro: 3999, govt: 2000, label: 'FSSAI State Licence' },
      'import-export-code': { pro: 1999, govt: 500, label: 'Import Export Code (IEC)' },
      'msme-udyam-registration': { pro: 1499, govt: 0, label: 'MSME Udyam Registration' },
      'startup-india-registration': { pro: 4999, govt: 0, label: 'Startup India DPIIT Recognition' },
      'amazon-seller-management': { pro: 14999, govt: 0, label: 'Amazon Seller Account Management' },
      'flipkart-seller-management': { pro: 12999, govt: 0, label: 'Flipkart Seller Hub Management' },
      'shopify-store-development': { pro: 24999, govt: 0, label: 'Custom Shopify Store Development' },
      'ecom-inventory-management': { pro: 9999, govt: 0, label: 'Multi-Channel Inventory Management' },
      'amazon-ppc-management': { pro: 11999, govt: 0, label: 'Amazon PPC Advertising Management' },
      'bookkeeping': { pro: 4999, govt: 0, label: 'Monthly Bookkeeping & Accounting' },
      'web-development': { pro: 29999, govt: 0, label: 'Custom Business Web Engineering' },
      'ai-development': { pro: 49999, govt: 0, label: 'Custom AI Assistant & RAG Implementation' }
    };

    let totalPro = 0;
    let totalGovt = 0;
    const items = [];

    for (const key of services) {
      const match = feesMap[key] || { pro: 3999, govt: 0, label: key };
      totalPro += match.pro;
      totalGovt += match.govt;
      items.push({ serviceId: key, label: match.label, professionalFee: match.pro, govtFee: match.govt });
    }

    // Bundle discount if 3 or more services selected
    const discountRate = services.length >= 4 ? 0.15 : services.length >= 2 ? 0.10 : 0;
    const discountAmount = Math.round(totalPro * discountRate);
    const discountedPro = totalPro - discountAmount;
    const gst18 = Math.round(discountedPro * 0.18);
    const totalEstimate = discountedPro + totalGovt + gst18;

    res.json({
      items,
      count: services.length,
      subtotalProfessional: totalPro,
      bundleDiscount: discountAmount,
      discountRate: `${discountRate * 100}%`,
      professionalCharges: discountedPro,
      governmentCharges: totalGovt,
      applicableGst: gst18,
      totalEstimatedCost: totalEstimate,
      disclaimer: 'Estimates are subject to final document verification and statutory government stamp duty variations across Indian states.'
    });
  });

  router.get('/tools/track/:ref', async (req, res) => {
    const item = await platformStore.getServiceRequestByReference(req.params.ref);
    if (!item) {
      return res.status(404).json({ error: 'No application found with reference number ' + req.params.ref });
    }
    res.json({
      referenceNumber: item.referenceNumber,
      serviceName: item.serviceName,
      status: item.status,
      currentMilestoneIndex: item.currentMilestoneIndex,
      milestones: item.milestones,
      assignedCaseOfficer: item.assignedCaseOfficer,
      updatedAt: item.updatedAt
    });
  });

  // ==========================================
  // 5. PUBLIC SETTINGS ENDPOINT
  // ==========================================
  router.get('/settings', async (req, res) => {
    const settings = await platformStore.getSettings();
    res.json(settings);
  });

  return router;
}

