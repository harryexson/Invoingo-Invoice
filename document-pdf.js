'use strict';
const PDFDocument=require('pdfkit'),path=require('node:path'),B=require('./domain');
async function documentPDF(data){return new Promise((resolve,reject)=>{
 const doc=new PDFDocument({size:'A4',margin:42,bufferPages:true}),chunks=[];doc.on('data',chunk=>chunks.push(chunk));doc.on('end',()=>resolve(Buffer.concat(chunks)));doc.on('error',reject);
 const font=path.join(__dirname,'landing/assets/inter-400.ttf');doc.font(font).fontSize(10).fillColor('#163300');
 const {doc:d,business,client}=data,currency=d.currency||d.businessSnapshot?.currency||business.currency,t=B.totals({...d,currency});const money=n=>`${currency} ${n.toFixed(B.currencyDigits(currency))}`;
 doc.fontSize(24).text(`${data.receipt?'RECEIPT':data.kind==='estimate'?'ESTIMATE':'INVOICE'} #${d.number||'DRAFT'}`);doc.fontSize(11).moveDown().text(business.name).text(business.email||'').text(business.address||'');
 doc.moveDown().text(`Bill to: ${client.name}`).text(client.email||'').text(`Issued: ${d.date}    Due: ${d.due}`);if(d.status==='Draft')doc.text('DRAFT — NOT ISSUED');
 doc.moveDown();for(const item of d.items){doc.text(item.name).text(`${item.qty} ${item.unit||''} x ${money(item.rate)} = ${money(B.roundCurrency(item.qty*item.rate,currency))}`,{indent:12}).moveDown(.5);}
 doc.moveDown();for(const [label,amount]of [['Subtotal',t.subtotal],['Discount',-t.discount],['Tax',t.tax],['Total',t.total],['Payments recorded',t.paid],['Balance due',t.balance]])doc.text(`${label}: ${money(amount)}`,{align:'right'});
 if(data.receipt)doc.moveDown().text(`Payment received: ${money(data.receipt.amount)} on ${data.receipt.date}`).text(`Method: ${data.receipt.method||'Recorded payment'}`).text(`Reference: ${data.receipt.reference||data.receipt.id||''}`);
 doc.moveDown().text(d.note||'').text(business.instructions||'').moveDown().fontSize(9).fillColor('#56624e').text('Prepared with Invoingo. Keep this document for your records.');doc.end();
 });}
module.exports={documentPDF};
