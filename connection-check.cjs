'use strict';
const fs=require('node:fs');const path=require('node:path');
process.loadEnvFile(path.join(__dirname,'.env'));
const e=process.env;
const present=key=>Boolean(e[key]?.trim());
if(process.argv.includes('--prepare')&&(e.INVOINGO_ADMIN_TOKEN||e.INVOIGO_ADMIN_TOKEN||'').length<32){
  const envPath=path.join(__dirname,'.env');let contents=fs.readFileSync(envPath,'utf8');const token=require('node:crypto').randomBytes(32).toString('hex');
  contents=/^INVOINGO_ADMIN_TOKEN=.*$/m.test(contents)?contents.replace(/^INVOINGO_ADMIN_TOKEN=.*$/m,`INVOINGO_ADMIN_TOKEN=${token}`):contents+`\nINVOINGO_ADMIN_TOKEN=${token}\n`;
  fs.writeFileSync(envPath,contents);e.INVOINGO_ADMIN_TOKEN=token;console.log('Local operator token configured in .env; its value is not printed.');
}
console.log(JSON.stringify({stripeTestKey:/^sk_test_/.test(e.STRIPE_SECRET_KEY||''),stripeWebhook:present('STRIPE_WEBHOOK_SECRET'),resendKey:present('RESEND_API_KEY'),resendWebhook:present('RESEND_WEBHOOK_SECRET'),senderConfigured:present('RESEND_FROM'),senderFormatValid:/[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+/.test(e.RESEND_FROM||''),operatorConfigured:(e.INVOINGO_ADMIN_TOKEN||e.INVOIGO_ADMIN_TOKEN||'').length>=32,publicHttps:/^https:\/\//.test(e.PUBLIC_BASE_URL||'')},null,2));
async function checkProviders(){
  const tasks=[];
  if(/^sk_test_/.test(e.STRIPE_SECRET_KEY||''))tasks.push((async()=>{try{const stripe=new(require('stripe'))(e.STRIPE_SECRET_KEY,{timeout:12000,maxNetworkRetries:0});const balance=await stripe.balance.retrieve();console.log(JSON.stringify({provider:'stripe',authenticated:true,testMode:balance.livemode===false}));}catch(error){console.log(JSON.stringify({provider:'stripe',authenticated:false,errorType:error.type||'connection_error',code:error.code||null}));}})());
  if(present('RESEND_API_KEY'))tasks.push((async()=>{try{const resend=new(require('resend').Resend)(e.RESEND_API_KEY);const result=await resend.domains.list();if(result.error){console.log(JSON.stringify({provider:'resend',domainReadSucceeded:false,errorType:result.error.name||'request_error'}));return;}console.log(JSON.stringify({provider:'resend',domainReadSucceeded:true,domains:(result.data?.data||[]).map(d=>({name:d.name,status:d.status}))}));}catch{console.log(JSON.stringify({provider:'resend',domainReadSucceeded:false,errorType:'connection_error'}));}})());
  await Promise.all(tasks);
}
if(process.argv.includes('--providers'))checkProviders();
