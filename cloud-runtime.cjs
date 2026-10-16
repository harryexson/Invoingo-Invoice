const B=require('./domain'),Core=require('./miobot-core'),Documents=require('./documents');
function reconcileWorkspace(incoming,current,publications,base){
 B.validateBackup(incoming);const db=structuredClone(incoming);
 for(const d of [...db.invoices,...db.estimates]){const old=current?.invoices?.find(x=>x.id===d.id);const record=publications.find(r=>r.id===d.id);if(record){const source=record.payload.doc;const stable=x=>JSON.stringify([x.number,x.clientId,x.date,x.due,x.items,x.tax,x.discount,x.status,x.currency||x.businessSnapshot?.currency]);if(stable({...source,currency:record.payload.business.currency})!==stable({...d,currency:d.currency||db.settings.currency}))throw Error('Published invoice details cannot be changed.');d.payments=structuredClone(source.payments||[]);if(record.payment&&!d.payments.some(p=>p.id===record.payment.id))d.payments.push(record.payment);d.publicUrl=base+'/pay.html?token='+record.token;if(record.collection_hold)d.collectionHold=record.collection_hold;d.reminders=old?.reminders||[];}else{if(d.publicUrl||d.payments.some(p=>p.providerVerified))throw Error('Payment links and provider payments must be verified by the server.');}}
 for(const r of publications)if(!db.invoices.some(d=>d.id===r.id))throw Error('Published invoices cannot be removed through workspace sync.');
 return db;
}
module.exports={B,Core,Documents,reconcileWorkspace};
