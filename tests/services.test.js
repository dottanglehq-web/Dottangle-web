import assert from 'node:assert/strict';
import express from 'express';
import { once } from 'node:events';
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { serviceCategories } from '../src/data/servicesCatalog.js';
import { searchServices } from '../src/data/serviceSearch.js';
const expected = new Map([['SEO','SEO Optimization'],['sco','SEO Optimization'],['  SeO  ','SEO Optimization'],['WhatsApp','WhatsApp Integration'],['AI','AI Integration'],['Custom','Custom Software Development'],['Software','Custom Software Development'],['Custom Software Development','Custom Software Development'],['Google Ranking','SEO Optimization'],['LLM','AI Integration'],['Business Messaging','WhatsApp Integration']]);
assert.equal(serviceCategories.length,16);
assert.equal(new Set(serviceCategories.map(c=>c.id)).size,serviceCategories.length);
for (const [query,title] of expected) assert.ok(searchServices(serviceCategories,query).some(s=>s.title===title),`${query}: ${title}`);
for (const cat of serviceCategories) assert.ok(searchServices(serviceCategories,cat.name).length,cat.name);
for (const query of ['SEO','AI','Software']) { const rows=searchServices(serviceCategories,query); assert.equal(rows.length,new Set(rows.map(r=>r.id)).size); }
assert.deepEqual(searchServices(serviceCategories,'nonexistent-zzzz-service'),[]);
assert.equal(searchServices(serviceCategories,'   '),null);
console.log('PASS catalog: 16 unique categories, existing categories searchable, keywords, aliases and deduplicated results');
const app=express();app.use(express.static('dist'));app.get('/{*path}',(req,res)=>res.sendFile('index.html',{root:'dist'}));
const server=app.listen(0);await once(server,'listening');const base=`http://localhost:${server.address().port}`;
const browser=await chromium.launch({headless:true});
try {
 await mkdir('test-results',{recursive:true});
 for(const [label,width,height] of [['desktop',1440,1000],['mobile',390,844]]) {
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/services');
  const input=page.getByRole('textbox',{name:'Search services'});
  await input.evaluate(el=>window.originalSearchInput=el);
  assert.equal(await page.locator('.sp-cat-counter').innerText(),`${serviceCategories.length} Categories`);
  for(const character of 'SEO') {
   await input.pressSequentially(character);
   assert.equal(await input.evaluate(el=>document.activeElement===el && window.originalSearchInput===el),true,'input remounted or lost focus');
  }
  assert.equal(await input.inputValue(),'SEO');
  for(const [query,title] of expected) {
   await input.fill(query);
   await page.locator('.sp-search-results-view .sp-card-title').getByText(title,{exact:true}).waitFor();
   assert.equal(await input.evaluate(el=>window.originalSearchInput===el),true);
  }
  await input.fill('nonexistent-zzzz-service');await page.getByText(/No services found for/).waitFor();
  await page.getByRole('button',{name:'Clear search',exact:true}).click();
  assert.equal(await input.inputValue(),'');assert.equal(await input.evaluate(el=>document.activeElement===el),true);
  assert.equal(await page.locator('.sp-nav-item').count(),serviceCategories.length);
  await input.pressSequentially('sco');
  await page.screenshot({path:`test-results/service-search-${label}.png`,fullPage:false,animations:'disabled'});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'horizontal page overflow');
  await page.locator('.sp-search-results-view .sp-service-card').filter({has:page.getByRole('heading',{name:'SEO Optimization',exact:true})}).click();
  await page.getByRole('dialog').waitFor();await page.getByText('Core Web Vitals optimization',{exact:true}).waitFor();
  await page.getByRole('button',{name:'Close modal'}).click();
  await page.goto(base+'/services/whatsapp-integration');
  await page.getByRole('heading',{name:'WhatsApp Integration',exact:true,level:2}).waitFor();
  await page.locator('.sp-service-card').getByRole('heading',{name:'WhatsApp Integration',exact:true}).click();
  await page.getByText('Contact form notifications',{exact:true}).waitFor();
  await page.keyboard.press('Escape');
  for (const cat of serviceCategories.slice(-4)) {
   await page.goto(base+'/services/'+cat.id);
   await page.locator('.sp-service-card').first().click();
   const dialog = page.getByRole('dialog');
   for (const scope of cat.subServices[0].deliverables) await dialog.getByText(scope, {exact:true}).waitFor();
   await page.keyboard.press('Escape');
  }
  // Existing category and sub-service URLs still resolve.
  await page.goto(base+'/services/ai-development/ai-integration');await page.getByRole('dialog').waitFor();await page.getByRole('dialog').getByRole('heading',{name:'AI Integration',exact:true}).waitFor();
  assert.deepEqual(errors,[]);
  await page.close();console.log(`PASS ${label}: uninterrupted typing, all queries, clear/focus, no results, count, scopes and deep links`);
 }
} finally {await browser.close();await new Promise(resolve=>server.close(resolve));}
