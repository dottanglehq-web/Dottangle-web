import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { SMTPServer } from 'smtp-server';
import { once } from 'node:events';
import { createApp, processNotifications, validateInquiry } from './app.js';
import Inquiry from './models/Inquiry.js';
import { notificationProviders, emailFor } from './notifications.js';
let mongo, server, base;
const data = { name: 'Test Customer', email: 'customer@example.com', phone: '+917973574376', company: 'Test Co', subject: 'Website project', services: ['Website Development'], message: 'Please build our new company website.' };
before(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri()); await Inquiry.init();
  server = createApp({ env: { SITE_ORIGIN: 'http://localhost:3000' } }).listen(0);
  await once(server,'listening'); base = `http://127.0.0.1:${server.address().port}`;
});
after(async () => { await new Promise(r => server?.close(r)); await mongoose.disconnect(); await mongo?.stop(); });
const post = (body, origin) => fetch(`${base}/api/inquiries`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(origin ? { Origin: origin } : {}) }, body: JSON.stringify(body) });
test('validation rejects malformed inputs and honeypot', () => {
  for (const change of [{ email:'bad' },{ phone:'hello' },{ name: {} },{ message:'short' },{ services: [] },{ website:'spam' },{ subject:'bad\r\nHeader' }]) assert.throws(() => validateInquiry({ ...data,...change }));
});
test('HTTP durable acceptance, duplicate protection and no public records', async () => {
  assert.equal((await post(data,'https://evil.example')).status,403);
  const response = await post(data); assert.equal(response.status,201);
  const result = await response.json(); assert.equal(result.success,true); assert.equal(result.confirmationStatus,'pending'); assert.equal(result.inquiry,undefined);
  const duplicate = await post(data); assert.equal(duplicate.status,200); assert.equal((await duplicate.json()).submissionId,result.submissionId);
  assert.equal(await Inquiry.countDocuments(),1);
  assert.equal((await fetch(`${base}/api/inquiries`)).status,404);
});
test('independent outcomes, durable retries, no repeat of accepted sends', async () => {
  const calls = [];
  const send = async (item,channel) => { calls.push(channel); if(channel==='customer') throw Object.assign(new Error(),{code:'EAUTH'}); return {status:'accepted',providerId:'admin-1'}; };
  await processNotifications({send});
  let item = await Inquiry.findOne(); assert.equal(item.notifications.admin.status,'accepted'); assert.equal(item.notifications.customer.status,'retry');
  // Reconnect simulates worker restart: queued state lives in MongoDB.
  const uri = mongo.getUri(); await mongoose.disconnect(); await mongoose.connect(uri);
  await processNotifications({now:new Date(Date.now()+7200000),send:async(i,c)=>{calls.push(c);return {status:'accepted',providerId:c};}});
  item=await Inquiry.findOne(); assert.equal(item.notifications.customer.status,'accepted'); assert.equal(calls.filter(c=>c==='admin').length,1);
});
test('concurrent workers claim each job once and expired claims require reconciliation', async () => {
  await Inquiry.updateMany({},{$set:{'notifications.customer.status':'pending','notifications.customer.nextAttempt':new Date(0)}});
  let calls=0; const send=async()=>{calls++; await new Promise(r=>setTimeout(r,30));return {status:'accepted'};};
  await Promise.all([processNotifications({send}),processNotifications({send})]); assert.equal(calls,1);
  await Inquiry.updateMany({},{$set:{'notifications.admin.status':'sending','notifications.admin.lockedUntil':new Date(0)}});
  await processNotifications({send}); assert.equal((await Inquiry.findOne()).notifications.admin.status,'uncertain'); assert.equal(calls,1);
});
test('templates escape untrusted HTML and include every submitted field', async () => {
  const item=await Inquiry.findOne(); item.name='<img src=x onerror=alert(1)>';
  const mail=emailFor(item,'admin',{}); assert.ok(mail.html.includes('&lt;img')); assert.ok(!mail.html.includes('<img src=x'));
  assert.ok(mail.html.includes('bgcolor="#ffffff"'));
  assert.ok(mail.html.includes('cid:dottangle-logo@dottangle'));
  assert.equal(mail.attachments[0].contentDisposition,'inline');
  assert.ok(mail.html.includes('https://www.instagram.com/dottangle/'));
  assert.ok(mail.text.includes('mobile apps'));
  assert.ok(!mail.html.includes('#0c0e14')); assert.equal(mail.replyTo,data.email);
  for (const text of [data.phone,data.company,data.subject,data.message,item.submissionId,...data.services]) assert.ok(mail.text.includes(text));
  const confirmation = emailFor(item,'customer',{});
  assert.equal(confirmation.subject,'Thank You for Contacting Dot Tangle!');
  assert.equal(confirmation.to,data.email);
  assert.equal(mail.to,'dottanglehq@gmail.com');
});
test('real local SMTP accepts both emails over authenticated STARTTLS', async () => {
  const messages=[];
  const smtp=new SMTPServer({ authOptional:false,onAuth(auth,session,callback){callback(null,{user:auth.username});},onData(stream,session,callback){let value='';stream.on('data',chunk=>value+=chunk);stream.on('end',()=>{messages.push(value);callback();});},logger:false });
  await new Promise(resolve => smtp.listen(0,'127.0.0.1',resolve));
  // Test fixture uses a self-signed certificate. Production always verifies certificates.
  const {default:nodemailer}=await import('nodemailer');
  const transport=nodemailer.createTransport({host:'127.0.0.1',port:smtp.server.address().port,secure:false,requireTLS:true,auth:{user:'test',pass:'fixture'},tls:{rejectUnauthorized:false}});
  try { await transport.verify(); const item=await Inquiry.findOne(); for(const channel of ['admin','customer']){const result=await transport.sendMail(emailFor(item,channel,{})); assert.equal(result.accepted.length,1);} assert.equal(messages.length,2); assert.ok(messages[0].includes('New Contact Form Submission')); assert.ok(messages[0].includes('Content-ID: <dottangle-logo@dottangle>')); assert.ok(messages[1].includes('Content-Type: image/png'));  }
  finally { transport.close();await new Promise(r=>smtp.close(r)); }
});
test('unconfigured providers fail explicitly',async()=>{const item=await Inquiry.findOne();for(const c of ['admin','customer']) await assert.rejects(notificationProviders({})(item,c),{code:'PENDING_CONFIGURATION'});});
test('rate limit returns friendly JSON',async()=>{ let response;for(let i=0;i<5;i++) response=await post(data);assert.equal(response.status,429);assert.ok((await response.json()).error); });
test('storage outage returns failure rather than success',async()=>{const app=createApp({ready:()=>false});const listener=app.listen(0);await once(listener,'listening');try{const response=await fetch(`http://127.0.0.1:${listener.address().port}/api/inquiries`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});assert.equal(response.status,503);assert.equal((await response.json()).success,undefined);}finally{await new Promise(r=>listener.close(r));}});

test('new submissions have exactly two email jobs and unsupported channels are rejected', async () => {
  const item = await Inquiry.findOne();
  assert.deepEqual(Object.keys(item.notifications.toObject()).sort(), ['admin', 'customer']);
  await assert.rejects(notificationProviders({})(item, 'sms'), { code: 'INVALID_CHANNEL' });
});
