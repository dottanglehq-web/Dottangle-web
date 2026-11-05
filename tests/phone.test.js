import assert from 'node:assert/strict';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { chromium, devices } from '@playwright/test';
import { once } from 'node:events';
import { mkdir, writeFile } from 'node:fs/promises';
import { createApp } from '../server/app.js';
import Inquiry from '../server/models/Inquiry.js';
const mongo=await MongoMemoryServer.create();await mongoose.connect(mongo.getUri());await Inquiry.init();
const env={};const app=createApp({env});app.use(express.static('dist'));app.get('/{*path}',(req,res)=>res.sendFile('index.html',{root:'dist'}));const server=app.listen(0);await once(server,'listening');const base=`http://localhost:${server.address().port}`;env.SITE_ORIGIN=base;
const browser=await chromium.launch();const report=[];
try {
 await mkdir('test-results',{recursive:true});
 for (const label of ['desktop','mobile']) {
  const context=await browser.newContext(label==='mobile'?{...devices['Pixel 5']}:{viewport:{width:1440,height:1000}});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{
   window.activePhoneTimers=new Set();const set=window.setInterval.bind(window),clear=window.clearInterval.bind(window);
   window.setInterval=(fn,ms,...args)=>{const id=set(fn,ms,...args);if(ms===60000)window.activePhoneTimers.add(id);return id;};
   window.clearInterval=id=>{window.activePhoneTimers.delete(id);clear(id);};
  });
  await page.goto(base+'/');const phone=page.locator('.dp-phone');
  await page.waitForFunction(()=>document.querySelector('.dp-phone')?.dataset.active==='false');
  assert.equal(await page.evaluate(()=>activePhoneTimers.size),0,'offscreen clock timer');
  await phone.scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('.dp-phone').dataset.active==='true');
  await phone.getByRole('button',{name:'Power on and unlock'}).click();
  assert.deepEqual(await phone.locator('.dp-app-icon').allTextContents(),['Projects','Contact','Browser','Services','About Us','Portfolio','Settings']);
  assert.equal(await phone.locator('.dp-lock-camera').count(),0);
  const open=async name=>{await phone.getByRole('button',{name,exact:true}).click();await phone.locator('.dp-app-window > header > b').getByText(name,{exact:true}).waitFor();await phone.locator('.dp-app-panel:not([hidden]) > *').first().waitFor();};
  const home=()=>phone.locator('.dp-phone-nav').getByRole('button',{name:'Home',exact:true}).click();
  for(const name of ['Projects','Contact','Browser','Services','About Us','Portfolio','Settings']) {
   await open(name);
   const panel=phone.locator('.dp-app-panel:not([hidden])');
   if(name==='Projects'||name==='Portfolio'){assert.equal(await panel.locator('article').count(),3);assert.ok((await panel.getByRole('link',{name:'View Apex Vouchers'}).getAttribute('href')).startsWith('https://'));}
   if(name==='Contact')await panel.locator('#contactName').fill('Phone draft');
   if(name==='Browser'){await panel.getByPlaceholder('Search or enter website').fill('Dottangle');await panel.getByRole('button',{name:'Go',exact:true}).click();await panel.getByRole('heading',{name:'Search: Dottangle'}).waitFor();}
   if(name==='Services'){await panel.getByRole('button').first().click();await panel.locator('.dp-service-detail').waitFor();}
   if(name==='About Us')await panel.getByText('Real partnership.').waitFor();
   if(name==='Settings'){await panel.getByRole('checkbox').nth(1).check();assert.ok(await phone.evaluate(el=>el.classList.contains('dp-dark')));await panel.getByRole('button',{name:'sunset wallpaper'}).click();}
   await home();
  }
  await open('Contact');assert.equal(await phone.locator('#contactName').inputValue(),'Phone draft');await home();
  await open('Browser');await phone.getByRole('heading',{name:'Search: Dottangle'}).waitFor();await home();
  const cdp=await context.newCDPSession(page);await cdp.send('Performance.enable');await cdp.send('HeapProfiler.collectGarbage');
  const metric=async()=>Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(x=>[x.name,x.value]));
  const before=await metric();await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
  const latencies=[];
  for(let i=0;i<12;i++){
   const ms=await page.evaluate(async()=>{const start=performance.now();document.querySelector('.dp-app-icon').click();await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));return performance.now()-start;});
   latencies.push(ms);await home();
  }
  await cdp.send('Emulation.setCPUThrottlingRate',{rate:1});await cdp.send('HeapProfiler.collectGarbage');const after=await metric();
  assert.equal(await phone.locator('.dp-app-panel').count(),7,'visited app cache must remain bounded');
  const infinite=await phone.evaluate(el=>el.getAnimations({subtree:true}).filter(a=>a.effect.getTiming().iterations===Infinity).length);
  assert.equal(infinite,0,'no infinite phone animations');
  await page.screenshot({path:`test-results/phone-${label}.png`,animations:'disabled'});
  await open('Contact');const panel=phone.locator('.dp-app-panel:not([hidden])');
  for(const [id,value] of Object.entries({contactName:'Phone Browser Test',contactCompany:'QA',contactPhone:'+919876543210',contactEmail:'qa@example.com',contactSubject:'Phone inquiry '+label,contactMessage:'Testing the actual embedded form and durable email jobs.'}))await panel.locator('#'+id).fill(value);
  await panel.locator('#contactService').selectOption('Website Development');
  for(const bad of [{status:502,contentType:'text/html',body:'<html>Bad gateway</html>'},{status:200,contentType:'application/json',body:'not json'},{status:200,contentType:'application/json',body:''}]){
   await page.route('**/api/inquiries',route=>route.fulfill(bad));await panel.locator('#contactSubmitBtn').click();await panel.getByRole('alert').getByText(/temporarily unavailable/).waitFor();assert.ok(page.url().endsWith('/'));assert.equal(await panel.locator('#contactName').inputValue(),'Phone Browser Test');await page.unroute('**/api/inquiries');
  }
  await panel.locator('#contactSubmitBtn').click();await page.waitForURL('**/thank-you');await page.getByText('A confirmation email will be sent to your registered email address.',{exact:true}).waitFor();
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.goto(base+'/');await phone.scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('.dp-phone').dataset.active==='true');
  await page.evaluate(()=>window.scrollTo(0,0));await page.waitForFunction(()=>document.querySelector('.dp-phone').dataset.active==='false');assert.equal(await page.evaluate(()=>activePhoneTimers.size),0);
  await phone.scrollIntoViewIfNeeded();
  const knob=phone.getByRole('button',{name:'Drag to unlock'});const box=await knob.boundingBox();
  await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.mouse.move(box.x+box.width/2+220,box.y+box.height/2,{steps:8});await page.mouse.up();
  await phone.locator('.dp-home').waitFor();
  await page.emulateMedia({reducedMotion:'reduce'});
  assert.equal(await phone.evaluate(el=>el.getAnimations({subtree:true}).filter(a=>a.playState==='running').length),0);
  assert.deepEqual(errors,[]);
  latencies.sort((a,b)=>a-b);const data={device:label,cpuThrottle:4,switchSamples:latencies.length,switchPaintP95Ms:Math.round(latencies[Math.floor(latencies.length*.95)]),heapBeforeBytes:before.JSHeapUsedSize,heapAfterBytes:after.JSHeapUsedSize,infinitePhoneAnimations:infinite,offscreenClockTimers:0};report.push(data);console.log('PASS '+JSON.stringify(data));await context.close();
 }
 assert.equal(await Inquiry.countDocuments(),2);for(const item of await Inquiry.find().lean())assert.deepEqual(Object.keys(item.notifications).sort(),['admin','customer']);
 await writeFile('test-results/phone-performance.json',JSON.stringify(report,null,2));
} finally {await browser.close();await new Promise(r=>server.close(r));await mongoose.disconnect();await mongo.stop();}
