import { chromium } from '@playwright/test';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import { once } from 'node:events';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { createApp } from './app.js';
import Inquiry from './models/Inquiry.js';
const mongo=await MongoMemoryServer.create();
await mongoose.connect(mongo.getUri());await Inquiry.init();
let available=true;
const env={};const app=createApp({env,ready:()=>available});
app.use(express.static('dist'));app.get('/{*path}',(req,res)=>res.sendFile('index.html',{root:'dist'}));
const server=app.listen(0);await once(server,'listening');
const base=`http://localhost:${server.address().port}`;env.SITE_ORIGIN=base;
const browser=await chromium.launch({headless:true});
try {
  await mkdir('test-results',{recursive:true});
  for (const [label,width,height] of [['desktop',1440,1000],['mobile',390,844],['tablet',768,1024]]) {
    const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
    await page.goto(`${base}/contact`);
    assert.ok(await page.locator('a[href="tel:+917973574376"]').first().isVisible());
    await page.locator('#contactName').fill('Browser Test');
    await page.locator('#contactCompany').fill('Dot Tangle QA');
    await page.locator('#contactPhone').fill('+919876543210');
    await page.locator('#contactEmail').fill('qa@example.com');
    await page.locator('#contactService').selectOption('Website Development');
    await page.locator('#contactSubject').fill(`Browser test ${label}`);
    await page.locator('#contactMessage').fill('Please build a responsive company website with booking.');
    if(label==='desktop'){
      available=false;
      await page.locator('#contactSubmitBtn').click();await page.getByRole('alert').waitFor();
      assert.ok(page.url().endsWith('/contact'));assert.equal(await Inquiry.countDocuments(),0);available=true;
    }
    await page.screenshot({path:`test-results/contact-${label}.png`,fullPage:true});
    await page.locator('#contactSubmitBtn').click();
    await page.waitForURL('**/thank-you');
    await page.getByRole('heading',{name:'Thank You for Getting in Touch!'}).waitFor();
    assert.equal(new URL(page.url()).search,'');
    assert.ok(await page.getByText('A confirmation email will be sent to your registered email address.').isVisible());
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth));
    await page.screenshot({path:`test-results/thank-you-${label}.png`,fullPage:true});
    await page.getByRole('link',{name:'Back to Home'}).click();await page.waitForURL(base+'/');
    await page.close();console.log(`PASS ${label}: form, persistence, redirect, confirmation, no overflow, home navigation`);
  }
  assert.equal(await Inquiry.countDocuments(),3);
  for (const item of await Inquiry.find().lean()) assert.deepEqual(Object.keys(item.notifications).sort(), ['admin','customer']);
  console.log('PASS browser failure: 503 retained entered data, showed error, did not redirect');
}finally{await browser.close();await new Promise(r=>server.close(r));await mongoose.disconnect();await mongo.stop();}
