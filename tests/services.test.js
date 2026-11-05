import assert from 'node:assert/strict';
import express from 'express';
import { once } from 'node:events';
import { chromium, expect } from '@playwright/test';
import { mkdir, readFile } from 'node:fs/promises';
import { serviceCategories } from '../src/data/servicesCatalog.js';
import { categoryPageContent } from '../src/data/categoryPageContent.js';
import { subServiceBenefit } from '../src/data/serviceCardContent.js';
import { searchServices } from '../src/data/serviceSearch.js';

assert.equal(serviceCategories.length,16);
assert.equal(new Set(serviceCategories.map(cat=>cat.id)).size,16);
for(const cat of serviceCategories) {
 const content=categoryPageContent[cat.id];
 assert.ok(content.overview && content.audience);
 assert.equal(content.process.length,6);
 assert.ok(content.faqs.length>=4 && content.faqs.length<=6);
 assert.ok(content.tools.length && content.outcomes.length);
 const html=await readFile(`dist/services/${cat.id}/index.html`,'utf8');
 assert.ok(html.includes(`<title>${cat.name.replaceAll('&','&amp;')} | Dottangle</title>`));
 assert.ok(html.includes(`rel="canonical" href="https://dottangle.vercel.app/services/${cat.id}"`));
 for(const sub of cat.subServices) assert.ok(html.includes(sub.title.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll("'",'&#x27;')),`prerender missing ${sub.title}`);
 assert.ok(searchServices(serviceCategories,cat.name).length);
 for(const sub of cat.subServices) assert.ok(subServiceBenefit(sub),`Missing business application: ${sub.id}`);
}
assert.equal(new Set(Object.values(categoryPageContent).map(content=>JSON.stringify(content.faqs))).size,16);
assert.ok((await readFile('dist/sitemap.xml','utf8')).includes('/services/ai-development'));
console.log('PASS catalog, all 16 editorial profiles, prerendered service content, metadata and sitemap');
const app=express();
// Serve the generated pages at their canonical URLs, as well as the SPA fallback.
app.get(['/services',...serviceCategories.map(cat=>`/services/${cat.id}`)],(req,res)=>res.sendFile(`${req.path}/index.html`,{root:'dist'}));
app.use(express.static('dist',{redirect:false}));
app.get('/{*path}',(req,res)=>res.sendFile('index.html',{root:'dist'}));
const server=app.listen(0); await once(server,'listening'); const base=`http://localhost:${server.address().port}`;
const browser=await chromium.launch({headless:true});
try {
 await mkdir('test-results',{recursive:true});
 for(const width of [320,375,390,430,768,1024,1440]) {
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  const errors=[]; page.on('pageerror',error=>errors.push(error.message));
  await page.goto(base+'/services');
  await expect(page.locator('.svc-category-card')).toHaveCount(16);
  await expect(page.locator('h1')).toHaveText('Explore Our Services');
  assert.equal(await page.locator('.svc-sub-card, .sp-content-area, .sp-category-toggle, dialog').count(),0);
  await page.evaluate(()=>window.serviceNavigationMarker='client-side');
  const checkOverflow=async()=>{
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${width}px horizontal page overflow`);
   const overflow=await page.locator('.svc-page').evaluate(root=>[root,...root.querySelectorAll('*')].filter(node=>node.getBoundingClientRect().width && (node.getBoundingClientRect().right>innerWidth+1 || node.scrollWidth>node.clientWidth+1)).map(node=>node.className));
   assert.deepEqual(overflow,[],`${width}px clipped service content`);
  };
  await checkOverflow();
  if(width===390 || width===1440) await page.screenshot({path:`test-results/services-directory-${width}.png`,fullPage:true});
  for(const cat of serviceCategories) {
   await page.locator('.svc-category-card').filter({has:page.getByRole('heading',{name:cat.name,exact:true})}).click();
   await expect(page).toHaveURL(base+'/services/'+cat.id);
   await expect(page.locator('h1')).toHaveText(cat.name);
   await expect(page.locator('.svc-sub-card')).toHaveCount(cat.subServices.length);
   assert.deepEqual(await page.locator('.svc-sub-card h3').allTextContents(),cat.subServices.map(sub=>sub.title));
   assert.equal(await page.locator('.svc-directory-grid').count(),0);
   await page.waitForFunction(()=>scrollY===0);
   assert.equal(await page.evaluate(()=>window.serviceNavigationMarker),'client-side','navigation reloaded document');
   await expect(page).toHaveTitle(`${cat.name} | Dottangle`);
   assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://dottangle.vercel.app/services/'+cat.id);
   assert.equal(await page.locator('script[data-services-schema]').count(),1);
   assert.equal(await page.locator('.svc-faqs details').count(),4);
   assert.equal(await page.locator('.svc-tools li').count(),categoryPageContent[cat.id].tools.length);
   assert.equal(await page.locator('.svc-actions a[href^="/contact"]').count(),4);
   await checkOverflow();
   if(cat.id==='ai-development' && (width===390 || width===1440)) await page.screenshot({path:`test-results/services-ai-${width}.png`,fullPage:true});
   await page.getByRole('link',{name:'Back to All Services',exact:true}).click();
   await expect(page.locator('.svc-category-card')).toHaveCount(16);
  }
  assert.deepEqual(errors,[]);
  await page.close(); console.log(`PASS ${width}px: all 16 category links, exact sub-services, client navigation, scroll reset, metadata and no overflow`);
 }
 const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await page.goto(base+'/services');
 const input=page.getByRole('searchbox',{name:'Search services'});
 for(const query of ['SEO','sco','AI','WhatsApp','Software','Google Ranking']) {
  await input.fill(query);
  await expect(page.locator('.svc-category-card').first()).toBeVisible();
  assert.equal(await page.locator('.svc-sub-card').count(),0);
 }
 await input.fill('nonexistent-zzzz-service');await expect(page.getByRole('status')).toContainText('No services found');
 await page.getByRole('button',{name:'Clear search'}).click();await expect(input).toBeFocused();await expect(page.locator('.svc-category-card')).toHaveCount(16);
 for(const cat of serviceCategories) {
  await page.goto(base+'/services/'+cat.id);await expect(page.locator('h1')).toHaveText(cat.name);
  await page.reload();await expect(page.locator('h1')).toHaveText(cat.name);
  await page.locator('.svc-sub-card .svc-text-link').first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('dialog').getByRole('heading',{name:cat.subServices[0].title,exact:true})).toBeVisible();
  for(const item of cat.subServices[0].deliverables || []) await expect(page.getByRole('dialog').getByText(item,{exact:true})).toBeVisible();
  await page.reload();await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page).toHaveURL(base+'/services/'+cat.id);
 }
 await page.goto(base+'/services/ai-development');
 await page.getByRole('link',{name:'Back to All Services',exact:true}).click();
 await page.goBack();await expect(page.locator('h1')).toHaveText(serviceCategories[0].name);
 await page.goForward();await expect(page.locator('h1')).toHaveText('Explore Our Services');
 await page.goto(base+'/services/website-development');await expect(page).toHaveURL(base+'/services/web-development');
 await page.goto(base+'/services?category=cloud-devops');await expect(page).toHaveURL(base+'/services/cloud-devops');
 for(const path of ['/services/not-a-category','/services/web-development/not-a-service','/services/web-development/not/a/service']) {
  await page.goto(base+path);await expect(page.locator('h1')).toHaveText('We couldn’t find that service.');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, follow');
 }
 await page.goto(base+'/services/web-development');
 await page.getByRole('link',{name:'Start Your Project',exact:true}).click();await expect(page).toHaveURL(/\/contact\?service=/);
 await expect(page.getByRole('heading',{level:1})).toContainText('Contact Our Team');
 console.log('PASS search, direct loads, refresh, every category modal, deliverables, history, aliases, invalid URLs and inquiry navigation');
 await page.close();
 const staticPage=await browser.newPage({javaScriptEnabled:false});
 await staticPage.goto(base+'/services');await expect(staticPage.locator('.svc-category-card')).toHaveCount(16);
 await staticPage.goto(base+'/services/ai-development');await expect(staticPage.locator('h1')).toHaveText(serviceCategories[0].name);await expect(staticPage.locator('.svc-sub-card')).toHaveCount(22);
 await staticPage.close();console.log('PASS directory links and category content readable without JavaScript');
} finally { await browser.close(); await new Promise(resolve=>server.close(resolve)); }
