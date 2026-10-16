'use strict';
const crypto=require('node:crypto'),B=require('./domain'),{documentPDF}=require('./document-pdf');
const email=s=>typeof s==='string'&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
function createReceipts({store,persist,resend,env,checkSender}){
 store.receipts||={};let flushing=false;
 function queue(data){
  if(env.AUTO_SEND_RECEIPTS==='false'||data.business.autoReceipts===false)return [];
  const d=data.doc,p=d.payments.find(p=>p.id===data.paymentId&&!p.reversed);if(!p||!Number.isFinite(p.amount)||p.amount<=0||!B.validDate(p.date))throw Error('A recorded payment is required for a receipt.');
  const recipients=[data.business.receiptCustomers===false?null:data.client.email,data.business.email||env.RECEIPT_OWNER_EMAIL].filter(email);
  const ids=[];for(const recipient of new Set(recipients)){
   const key=crypto.createHash('sha256').update(`${d.id}:${p.id}:${recipient}`).digest('hex');const fingerprint=JSON.stringify([d.id,p.id,p.amount,p.date,d.currency||data.business.currency,recipient]);
   const previous=store.receipts[key];if(previous&&previous.fingerprint!==fingerprint)throw Error('This receipt identity was already used with different payment details.');
   if(!previous)store.receipts[key]={id:key,invoiceId:d.id,paymentId:p.id,to:recipient,fingerprint,status:'queued',attempts:0,created:new Date().toISOString(),document:{doc:structuredClone(d),client:structuredClone(data.client),business:structuredClone(data.business),receipt:structuredClone(p)}};
   ids.push(key);
  }persist();return ids;
 }
 async function flush(force=false){if(flushing)return;flushing=true;try{for(const job of Object.values(store.receipts)){
   if(['accepted','cancelled','needs-review'].includes(job.status)||!force&&job.attempts>=5||!force&&job.nextAttempt&&Date.parse(job.nextAttempt)>Date.now())continue;
   if(job.firstAttempt&&Date.now()-Date.parse(job.firstAttempt)>23*3600000){job.status='needs-review';job.error='A previous delivery attempt is uncertain. Check Resend before resending outside its idempotency window.';persist();continue;}
   try{
    if(!resend||!env.RESEND_FROM)throw Error('Configure Resend and a verified sending address.');await checkSender();
    const pdf=await documentPDF(job.document),d=job.document.doc,p=job.document.receipt,currency=d.currency||job.document.business.currency;
    job.firstAttempt||=new Date().toISOString();persist();
    const {data,error}=await resend.emails.send({from:env.RESEND_FROM,to:[job.to],subject:`Payment receipt · Invoice #${d.number}`,text:`Payment of ${B.formatMoney(p.amount,currency,'en')} recorded on ${p.date} for invoice #${d.number}. Method: ${p.method}. Your receipt is attached as a PDF.`,attachments:[{filename:`receipt-${d.number}-${p.id.slice(0,12)}.pdf`,content:pdf.toString('base64')}]},{idempotencyKey:`receipt-${job.id}`});
    if(error||!data?.id)throw Error('Resend did not accept the receipt. Check provider configuration.');
    job.status='accepted';job.emailId=data.id;job.accepted=new Date().toISOString();delete job.error;
   }catch(error){job.status='failed';job.error=error.message;job.nextAttempt=new Date(Date.now()+Math.min(3600000,60000*2**job.attempts)).toISOString();}
   job.attempts++;persist();
  }}finally{flushing=false;}}
 return {queue,flush,cancel(invoiceId,reason){for(const job of Object.values(store.receipts))if(job.invoiceId===invoiceId&&job.status!=='accepted'){job.status='cancelled';job.error=reason;}persist();},status:ids=>ids.map(id=>({id,status:store.receipts[id].status,error:store.receipts[id].error})),list:()=>Object.values(store.receipts).map(({document,fingerprint,...job})=>job)};
}
module.exports={createReceipts};
