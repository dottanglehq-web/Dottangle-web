import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from './app.js';
import { once } from 'node:events';

let server, base;

before(async () => {
  const app = createApp({ env: { SITE_ORIGIN: 'http://localhost:3000' } });
  server = app.listen(0);
  await once(server, 'listening');
  base = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise(r => server?.close(r));
});

test('Public blogs and blog detail API', async () => {
  const res = await fetch(`${base}/api/blogs`);
  assert.equal(res.status, 200);
  const blogs = await res.json();
  assert.ok(Array.isArray(blogs) && blogs.length >= 6);
  assert.ok(blogs.some(b => b.slug.includes('private-limited')));

  const detailRes = await fetch(`${base}/api/blogs/${blogs[0].slug}`);
  assert.equal(detailRes.status, 200);
  const detail = await detailRes.json();
  assert.equal(detail.slug, blogs[0].slug);
  assert.ok(detail.content.length > 50);

  const notFound = await fetch(`${base}/api/blogs/non-existent-slug-xyz`);
  assert.equal(notFound.status, 404);
});

test('Cost Calculator API computes fees, discounts and GST correctly', async () => {
  const res = await fetch(`${base}/api/tools/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      services: ['private-limited-company', 'gst-registration', 'trademark-registration']
    })
  });
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.count, 3);
  assert.ok(data.professionalCharges > 0);
  assert.ok(data.governmentCharges > 0);
  assert.ok(data.applicableGst > 0);
  assert.ok(data.totalEstimatedCost > data.professionalCharges);
  assert.ok(data.bundleDiscount > 0); // 3 services gets bundle discount
});

test('Application tracking API fetches milestone status', async () => {
  const res = await fetch(`${base}/api/tools/track/DOT-2026-1042`);
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.referenceNumber, 'DOT-2026-1042');
  assert.equal(data.status, 'In Progress');
  assert.ok(Array.isArray(data.milestones) && data.milestones.length === 6);

  const badRes = await fetch(`${base}/api/tools/track/INVALID-REF-9999`);
  assert.equal(badRes.status, 404);
});

test('Admin authentication and inquiry management', async () => {
  // Invalid login
  const badLogin = await fetch(`${base}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@dottangle.com', password: 'wrong' })
  });
  assert.equal(badLogin.status, 401);

  // Valid login
  const goodLogin = await fetch(`${base}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@dottangle.com', password: 'Dottangle@2026!' })
  });
  assert.equal(goodLogin.status, 200);
  const { token, user } = await goodLogin.json();
  assert.ok(token);
  assert.equal(user.role, 'admin');

  // Access inquiries with token
  const inqRes = await fetch(`${base}/api/admin/inquiries`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  assert.equal(inqRes.status, 200);
  const inqData = await inqRes.json();
  assert.ok(inqData.items.length >= 2);

  // Update inquiry status
  const updateRes = await fetch(`${base}/api/admin/inquiries/${inqData.items[0].submissionId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ status: 'Contacted', notes: 'Call completed successfully.' })
  });
  assert.equal(updateRes.status, 200);
  const updated = await updateRes.json();
  assert.equal(updated.inquiry.status, 'Contacted');
});

test('Customer registration, login and service request flow', async () => {
  const email = `testuser_${Date.now()}@example.com`;
  const regRes = await fetch(`${base}/api/portal/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Rohan Verma',
      email,
      password: 'SecurePassword123!',
      phone: '+91 98765 00000',
      company: 'Verma Exports'
    })
  });
  assert.equal(regRes.status, 201);
  const regData = await regRes.json();
  assert.ok(regData.token);

  // Submit service request
  const reqRes = await fetch(`${base}/api/portal/requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${regData.token}` },
    body: JSON.stringify({
      serviceId: 'gst-registration',
      serviceName: 'GST Registration Service',
      professionalFee: 1999,
      govtFee: 0,
      customerNotes: 'Need urgent GST for export invoices'
    })
  });
  assert.equal(reqRes.status, 201);
  const reqData = await reqRes.json();
  assert.ok(reqData.request.referenceNumber.startsWith('DOT-2026-'));
  assert.equal(reqData.request.serviceName, 'GST Registration Service');

  // Verify request appears in user requests
  const listRes = await fetch(`${base}/api/portal/requests`, {
    headers: { Authorization: `Bearer ${regData.token}` }
  });
  assert.equal(listRes.status, 200);
  const list = await listRes.json();
  assert.ok(list.some(r => r.referenceNumber === reqData.request.referenceNumber));
});

test('Public Portfolio API and project details', async () => {
  const res = await fetch(`${base}/api/portfolio`);
  assert.equal(res.status, 200);
  const projects = await res.json();
  assert.ok(Array.isArray(projects) && projects.length === 8);

  // Check all 8 projects are present including Apex Vouchers
  const expectedSlugs = [
    'apex-vouchers',
    'eternal-sips',
    'rangrezz-boutique',
    'balaji-nar-singh-herbals',
    'helybely',
    'techverse-ct-university',
    'toscaninis',
    'waadiya'
  ];
  for (const slug of expectedSlugs) {
    assert.ok(projects.some(p => p.slug === slug), `Missing portfolio project ${slug}`);
  }

  // Check Apex Vouchers detail API
  const apexRes = await fetch(`${base}/api/portfolio/apex-vouchers`);
  assert.equal(apexRes.status, 200);
  const apexDetail = await apexRes.json();
  assert.equal(apexDetail.slug, 'apex-vouchers');
  assert.equal(apexDetail.url, 'https://apexvouchers.com/');
  assert.equal(apexDetail.isTopFeatured, true);

  // Check detail API
  const detailRes = await fetch(`${base}/api/portfolio/eternal-sips`);
  assert.equal(detailRes.status, 200);
  const detail = await detailRes.json();
  assert.equal(detail.slug, 'eternal-sips');
  assert.equal(detail.url, 'https://eternalsips.com/');
  assert.equal(detail.logo, '/brands/eternal-sips.png');
  assert.ok(Array.isArray(detail.objectives) && detail.objectives.length > 0);
  assert.ok(Array.isArray(detail.features) && detail.features.length > 0);

  // Filter API
  const ecomRes = await fetch(`${base}/api/portfolio?category=eCommerce`);
  assert.equal(ecomRes.status, 200);
  const ecomList = await ecomRes.json();
  assert.ok(ecomList.some(p => p.slug === 'helybely'));

  // Not found
  const notFound = await fetch(`${base}/api/portfolio/unknown-site-404`);
  assert.equal(notFound.status, 404);
});

