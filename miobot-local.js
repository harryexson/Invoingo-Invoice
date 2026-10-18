(function(root){
 'use strict';
 const Core=typeof module!=='undefined'?require('./miobot-core'):root.MioCore;
 const B=typeof module!=='undefined'?require('./domain'):root.Business;
 function create({getDB,saveDB,storage,key,today,id=()=>B.createId()}){
  let data={conversations:[],reminders:[],activity:[],rules:{enabled:false,days:[0,3,7,14,30]}};
  try{const saved=JSON.parse(storage.getItem(key)||'null');if(saved&&Array.isArray(saved.conversations)&&Array.isArray(saved.reminders)&&Array.isArray(saved.activity))data={...data,...saved};}catch{}
  const persist=()=>{storage.setItem(key,JSON.stringify(data));};
  const log=action=>data.activity.unshift({id:id(),action,date:new Date().toISOString()});
  const conversation=value=>{const c=data.conversations.find(c=>c.id===value);if(!c)throw Error('Start a new conversation.');return c;};
  const reminder=value=>{const r=data.reminders.find(r=>r.id===value);if(!r)throw Error('Create the reminder draft again.');return r;};
  function draft(invoiceId,tone,kind){const r={...(kind==='update'?Core.customerUpdate(getDB(),invoiceId,today()):Core.reminder(getDB(),invoiceId,today(),tone)),id:id(),businessDate:today(),created:new Date().toISOString()};data.reminders.unshift(r);log('reminder.drafted');return r;}
  function current(r){const fresh=r.kind==='update'?Core.customerUpdate(getDB(),r.invoiceId,today()):Core.reminder(getDB(),r.invoiceId,today(),r.tone);if(fresh.fingerprint!==r.fingerprint)throw Error('Invoice facts changed. Create a new reminder and review it before sending.');return fresh;}
  async function request(route,input={}){
   if(route==='state')return structuredClone({...data,workspace:getDB(),snapshot:Core.snapshot(getDB(),today()),businessDate:today(),revision:0,notifications:[],mode:'local',delivery:'email-app'});
   if(route==='conversation'){const c={id:id(),title:'New conversation',messages:[],context:{ids:[]},created:new Date().toISOString()};data.conversations.unshift(c);persist();return structuredClone(c);}
   if(route==='query'){
    const c=conversation(input.conversationId),answer=Core.query(getDB(),input.text,c.context,today());
    if(answer.intent==='draft'){answer.drafts=[];const unavailable=[];for(const invoiceId of answer.ids.slice(0,10)){try{answer.drafts.push(draft(invoiceId,undefined,answer.kind));}catch{unavailable.push(invoiceId);}}if(unavailable.length)answer.text+=` ${unavailable.length} invoice(s) need a valid customer email or collection review first.`;}
    if(answer.intent==='tone'){const last=c.messages.filter(m=>m.answer?.drafts?.length).at(-1)?.answer.drafts.at(-1);if(last)answer.drafts=[draft(last.invoiceId,answer.tone,last.kind)];}
    c.messages.push({id:id(),role:'user',text:String(input.text),date:new Date().toISOString()},{id:id(),role:'assistant',answer,date:new Date().toISOString()});c.messages=c.messages.slice(-100);c.context=answer.context||c.context;c.title=String(input.text).slice(0,70);log('question.submitted');persist();return structuredClone({conversation:c,answer,revision:0});
   }
   if(route==='draft'){const r=draft(input.invoiceId,input.tone,input.kind);persist();return {draft:structuredClone(r)};}
   if(route==='edit'){const r=reminder(input.id);current(r);if(typeof input.text!=='string'||!input.text.trim()||input.text.length>6000||typeof input.subject!=='string'||!input.subject.trim()||input.subject.length>200||/[\r\n]/.test(input.subject))throw Error('Check the subject and message.');Object.assign(r,{text:input.text.trim(),subject:input.subject.trim(),generated:false});persist();return {draft:structuredClone(r)};}
   if(route==='compose'){if(input.approved!==true)throw Error('Review the reminder before opening your email app.');const r=reminder(input.id);current(r);if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.to)||/[\r\n]/.test(r.to))throw Error('Save a valid recipient email.');log('reminder.email-app-opened (delivery unconfirmed)');persist();return {url:`mailto:${encodeURIComponent(r.to)}?subject=${encodeURIComponent(r.subject)}&body=${encodeURIComponent(r.text)}`,delivery:'unconfirmed'};}
   if(route==='create-invoice'){if(input.approved!==true)throw Error('Review the invoice proposal first.');const c=conversation(input.conversationId),m=c.messages.find(m=>m.id===input.messageId&&m.role==='assistant');if(!m?.answer?.proposal)throw Error('Generate the invoice proposal again.');let invoice=getDB().invoices.find(d=>d.id===(m.answer.createdInvoiceId||m.id));if(!invoice){invoice=Core.createInvoice(getDB(),m.answer.proposal,today(),()=>m.id);saveDB();}m.answer.createdInvoiceId=invoice.id;persist();return {invoice:structuredClone(invoice),nextInvoice:getDB().nextInvoice,revision:0};}
   if(route==='rules'){if(!Array.isArray(input.days)||input.days.length>12||input.days.some(d=>!Number.isInteger(d)||d<0||d>90))throw Error('Choose up to 12 day offsets from 0 to 90.');data.rules={enabled:!!input.enabled,days:[...new Set(input.days)],mode:'draft-only'};persist();return structuredClone(data.rules);}
   if(route==='run-rules'){let count=0;if(data.rules.enabled)for(const row of Core.facts(getDB(),today()).filter(r=>r.balance>0&&!['Draft','Void','Paid'].includes(r.status)&&data.rules.days.includes(r.daysOverdue))){if(data.reminders.some(r=>r.invoiceId===row.id&&(r.businessDate||r.created.slice(0,10))===today()))continue;try{draft(row.id);count++;}catch{}}persist();return {draftsCreated:count};}
   throw Error('This action needs a connected backend. Nothing was sent.');
  }
  return {request};
 }
 const api={create};if(typeof module!=='undefined')module.exports=api;else root.MioLocal=api;
})(typeof window==='undefined'?globalThis:window);
