(function(root){
 'use strict';
 const B=typeof module!=='undefined'?require('./domain'):root.Business;
 const isRequest=text=>/\b(?:create|make|generate|prepare|draft|build)\s+(?:(?:me|a|an|new|the|please)\s+){0,4}(?:invoice|bill)\b/i.test(text)||/^invoice\s+.+\s+for\s+/i.test(text);
 function number(value){const s=String(value).trim();if(/^\d{1,3}(,\d{3})+(\.\d+)?$/.test(s))return Number(s.replaceAll(',',''));if(/^\d+,\d{1,3}$/.test(s))return Number(s.replace(',','.'));return Number(s);}
 function propose(db,text,today,extracted){
  const help=message=>({intent:'invoice-create',text:message,cards:[],context:{ids:[]}}),q=text.toLowerCase();
  const named=extracted?.clientName?.trim().toLowerCase();
  let matches=db.clients.filter(c=>named?c.name.toLowerCase()===named:q.includes(c.name.toLowerCase()));
  if(named&&!matches.length)matches=db.clients.filter(c=>c.name.toLowerCase().includes(named)&&q.includes(named));
  if(matches.length!==1)return help('Please name one saved customer exactly. Add a new customer in Clients first, then ask: “Create an invoice for Maya Chen for 2 logo designs at 150 each”.');
  const client=matches[0];let item=extracted?.itemName,quantity=extracted?.quantity??1,price=extracted?.unitPrice;
  const at=q.indexOf(client.name.toLowerCase());let suffix=text.slice(at>=0?at+client.name.length:0).trim();
  let currency=extracted?.currency||db.settings.currency;
  if(!extracted){
   const codes=suffix.toUpperCase().match(/\b[A-Z]{3}\b/g)||[];currency=codes.find(B.validCurrency)||db.settings.currency;
   const rates=[...suffix.matchAll(/(?:\bat\b|\bfor\b|@|\bprice\b|\brate\b)\s*(?:[A-Z]{3}\s*)?[$€£¥₹₦₵₱₩]?\s*(-?\d[\d,.]*)/gi)];const rate=rates.at(-1);
   if(!rate)return help('What is the item and its unit price? For example: “Create an invoice for '+client.name+' for 2 design sessions at 150 each”.');
   price=number(rate[1]);item=suffix.slice(0,rate.index).replace(/^[\s,:;-]*(?:for\b|to\b)?\s*/i,'').trim();
   const count=item.match(/^(\d+(?:[.,]\d+)?)\s*(?:x\s+|×\s*|\s+)/i);if(count){quantity=number(count[1]);item=item.slice(count[0].length).trim();}
   const symbols={'€':'EUR','£':'GBP','₹':'INR','₦':'NGN','₵':'GHS','₱':'PHP','₩':'KRW'};for(const symbol in symbols)if(suffix.includes(symbol))currency=symbols[symbol];
  }
  if(extracted){const mentioned=(text.match(/-?\d[\d,.]*/g)||[]).map(number);if(!mentioned.includes(price)||quantity!==1&&!mentioned.includes(quantity)||!q.includes(String(item||'').toLowerCase()))return help('I could not verify the item, quantity and price from your request. Please state them explicitly; I will not guess financial details.');}
  if(currency!==db.settings.currency)return help(`This workspace invoices in ${db.settings.currency}. The requested ${currency} is different; I will not convert or relabel your amounts. Choose the business currency before creating financial records.`);
  if(typeof item!=='string'||!item.trim()||item.length>160||!Number.isFinite(price)||price<0||price>10000000||!Number.isFinite(quantity)||quantity<=0||quantity>100000)return help('Please provide a clear item, positive quantity and valid non-negative unit price.');
  const requestedDue=text.match(/\bdue(?:\s+on)?\s+(\d{4}-\d{2}-\d{2})/i)?.[1];const due=requestedDue||new Date(Date.parse(today+'T12:00:00Z')+db.settings.terms*86400000).toISOString().slice(0,10);
  if(!B.validDate(due)||due<today)return help('Please use a valid due date on or after today, in YYYY-MM-DD format.');
  const proposal={clientId:client.id,clientName:client.name,currency,date:today,due,items:[{name:item.trim(),qty:quantity,rate:price,unit:'item',type:'service'}],tax:db.settings.tax,discount:0,note:db.settings.note};
  const totals=B.totals(proposal);return {intent:'invoice-create',title:'Review your invoice draft',text:`Draft for ${client.name}: ${quantity} × ${item.trim()} at ${B.formatMoney(price,currency)} each. Total ${B.formatMoney(totals.total,currency)}, including the workspace tax setting. Review below, then create and edit the draft. Nothing has been issued or emailed.`,proposal,cards:[],context:{ids:[]}};
 }
 function create(db,p,today,id=B.createId){if(!p||!db.clients.some(c=>c.id===p.clientId)||p.currency!==db.settings.currency)throw Error('The customer or business currency changed. Generate the draft again.');const doc={id:id(),number:db.nextInvoice,clientId:p.clientId,currency:p.currency,date:p.date,due:p.due,items:structuredClone(p.items),tax:p.tax,discount:p.discount,note:p.note||'',status:'Draft',payments:[],activity:[{text:'Invoice draft created with MioBot after review',date:today+'T12:00:00Z'}]};B.validate(doc);db.nextInvoice++;db.invoices.push(doc);return doc;}
 const api={isRequest,propose,create,number};if(typeof module!=='undefined')module.exports=api;else root.InvoiceAssistant=api;
})(typeof window!=='undefined'?window:globalThis);
