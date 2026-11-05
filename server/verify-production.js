import 'dotenv/config';
import { chromium, devices } from '@playwright/test';
import mongoose from 'mongoose';
import Inquiry from './models/Inquiry.js';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
if(!process.argv.includes('--send')) {console.log('Usage: node server/verify-production.js --send (creates a labeled live inquiry and sends both test email roles to the business inbox)');process.exit(1);}
const base='https://dottangel.vercel.app';const browser=await chromium.launch();
try {
 await mkdir('test-results',{recursive:true});
 const health=await fetch(base+'/api/health');assert.equal(health.status,200);assert.equal((await health.json()).status,'ready');
 const context=await browser.newContext({...devices['Pixel 5']});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/');const phone=page.locator('.dp-phone');await phone.scrollIntoViewIfNeeded();await phone.getByRole('button',{name:'Power on and unlock'}).click();
 assert.deepEqual(await phone.locator('.dp-app-icon').allTextContents(),['Projects','Contact','Browser','Services','About Us','Portfolio','Settings']);
 await phone.getByRole('button',{name:'Contact',exact:true}).click();const panel=phone.locator('.dp-app-panel:not([hidden])');await panel.locator('#contactName').waitFor();
 const subject='Production API verification '+new Date().toISOString();
 for(const[id,value]of Object.entries({contactName:'Dot Tangle Production Test',contactCompany:'Dot Tangle QA',contactPhone:'+917973574376',contactEmail:'dottanglehq@gmail.com',contactSubject:subject,contactMessage:'TEST ONLY: Production phone form, MongoDB persistence and both email notifications. This is not a customer lead.'}))await panel.locator('#'+id).fill(value);
 await panel.locator('#contactService').selectOption('Website Development');
 const responsePromise=page.waitForResponse(r=>r.url()===base+'/api/inquiries'&&r.request().method()==='POST');
 await panel.locator('#contactSubmitBtn').click();const response=await responsePromise;
 assert.equal(response.status(),201);assert.ok(response.headers()['content-type'].includes('application/json'));const result=await response.json();
 await page.waitForURL('**/thank-you');await page.getByRole('heading',{name:'Thank You for Getting in Touch!'}).waitFor();await page.getByText('A confirmation email will be sent to your registered email address.',{exact:true}).waitFor();
 await page.screenshot({path:'test-results/production-thank-you-mobile.png',fullPage:true});assert.deepEqual(errors,[]);
 console.log('Live mobile phone form saved inquiry and redirected to /thank-you: '+result.submissionId);
 const duplicate=await fetch(base+'/api/inquiries',{method:'POST',headers:{'Content-Type':'application/json',Origin:base},body:response.request().postData()});assert.equal(duplicate.status,200);assert.equal((await duplicate.json()).submissionId,result.submissionId);console.log('Live duplicate protection verified.');
 await mongoose.connect(process.env.MONGO_URI||process.env.MONGODB_URI,{serverSelectionTimeoutMS:10000});
 let item;
 for(let i=0;i<20;i++) {
  item=await Inquiry.findOne({submissionId:result.submissionId});
  if(item.notifications.admin.status==='accepted'&&item.notifications.customer.status==='accepted')break;
  await new Promise(r=>setTimeout(r,1500));
 }
 for(const channel of ['admin','customer'])console.log('Production '+channel+' email: '+item.notifications[channel].status);
 assert.equal(item.notifications.admin.status,'accepted');assert.equal(item.notifications.customer.status,'accepted');assert.deepEqual(Object.keys(item.notifications.toObject()).sort(),['admin','customer']);
 await page.getByRole('link',{name:'Back to Home'}).click();await page.waitForURL(base+'/');
 const retry=await fetch(base+'/api/notifications/retry',{headers:{Authorization:'Bearer '+process.env.CRON_SECRET}});assert.equal(retry.status,200);console.log('Protected production retry worker verified.');
 console.log('Gmail SMTP acceptance verified; recipient inbox receipt still requires manual inspection.');
}finally{await browser.close();await mongoose.disconnect();}
