import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { once } from 'node:events';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Inquiry from './models/Inquiry.js';
import { createServerlessHandler } from './serverless.js';
import { submitInquiry } from '../src/lib/contactApi.js';
let mongo;
before(async()=>{mongo=await MongoMemoryServer.create();await mongoose.connect(mongo.getUri());await Inquiry.init();});
after(async()=>{await mongoose.disconnect();await mongo.stop();});
test('HTML, empty, malformed and unexpected API responses produce friendly errors',async()=>{
 for(const response of [new Response('<html>Not found</html>',{status:404,headers:{'Content-Type':'text/html'}}),new Response(null,{status:204}),new Response('broken',{headers:{'Content-Type':'application/json'}}),Response.json({success:true}),Response.json({error:'<script>bad</script>'},{status:500})]) {
  await assert.rejects(submitInquiry({}, {fetcher:async()=>response}),error=>!(/JSON|Unexpected token|script|SyntaxError/.test(error.message)));
 }
 assert.equal((await submitInquiry({}, {fetcher:async()=>Response.json({success:true,submissionId:'fixture'})})).submissionId,'fixture');
});
test('serverless API acknowledges persistence before email finishes and scopes jobs to the inquiry',async()=>{
 const other=await Inquiry.create({submissionId:'unrelated',dedupeKey:'unrelated',name:'Unrelated',email:'other@example.com',services:[],message:'Do not dispatch'});
 let release;const gate=new Promise(r=>release=r);const tasks=[];const calls=[];
 const handler=createServerlessHandler({connect:async()=>{},schedule:p=>tasks.push(p),env:{CRON_SECRET:'fixture-only'},send:async(item,channel)=>{calls.push(channel);await gate;return {status:'accepted',providerId:channel};}});
 const server=createServer(handler).listen(0);await once(server,'listening');const base=`http://localhost:${server.address().port}`;
 try {
  const response=await fetch(base+'/api/inquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:'Serverless Test',email:'fixture@example.com',phone:'+919876543210',services:['Website Development'],subject:'Serverless test',message:'Testing queued delivery without blocking the response.'})});
  assert.equal(response.status,201);const {submissionId}=await response.json();assert.ok(submissionId);assert.equal(tasks.length,1);
  assert.equal((await Inquiry.findById(other._id)).notifications.admin.status,'pending');
  release();await Promise.all(tasks);
  const item=await Inquiry.findOne({submissionId});assert.equal(item.notifications.admin.status,'accepted');assert.equal(item.notifications.customer.status,'accepted');assert.deepEqual(calls,['admin','customer']);
  assert.equal((await fetch(base+'/api/notifications/retry')).status,401);
  assert.equal((await fetch(base+'/api/does-not-exist')).status,404);
  assert.equal((await fetch(base+'/api/health')).status,200);
  assert.equal((await fetch(base+'/api/notifications/retry',{headers:{Authorization:'Bearer fixture-only'}})).status,200);
 }finally{release();await new Promise(r=>server.close(r));}
});
test('serverless database outage returns JSON failure',async()=>{
 const handler=createServerlessHandler({connect:async()=>{throw new Error();},schedule:()=>{},send:async()=>{},env:{}});
 const server=createServer(handler).listen(0);await once(server,'listening');try{const r=await fetch(`http://localhost:${server.address().port}/api/health`);assert.equal(r.status,503);assert.equal((await r.json()).status,'storage_unavailable');}finally{await new Promise(r=>server.close(r));}
});
