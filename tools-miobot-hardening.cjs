const fs=require('node:fs');const change=(file,a,b)=>{let s=fs.readFileSync(file,'utf8');if(!s.includes(a))throw Error('Missing '+file);fs.writeFileSync(file,s.replace(a,b));};
change('integrations.js','record={...snapshot,snapshot,token:','record={...snapshot,snapshot,sourceDocument:structuredClone(data.doc),token:');
// A verified publication bridge is the sole source of imported provider payment flags.
change('miobot-server.js',"}else if(d.publicUrl){throw error('Publish through the Invoingo provider gateway before syncing a payment link.',409);}","}else if(d.publicUrl&&!provider?.getRecord?.(d.id)){throw error('Publish through the Invoingo provider gateway before syncing a payment link.',409);}");
change('miobot-server.js',"if(pay.providerVerified&&!old?.payments.some(v=>v.id===pay.id&&v.providerVerified))", "if(pay.providerVerified&&!old?.payments.some(v=>v.id===pay.id&&v.providerVerified)&&provider?.getRecord?.(d.id)?.payment?.id!==pay.id)");
// Re-read after the provider await so notification/payment updates cannot be overwritten.
change('miobot-server.js',"const d=w.db.invoices.find(d=>d.id===r.invoiceId);(d.reminders||=[])","const latest=workspace(p);const d=latest.db.invoices.find(d=>d.id===r.invoiceId);(d.reminders||=[])");
change('miobot-server.js',"store.workspace(p.tenantId,w.db);audit(p,'reminder.sent'","store.workspace(p.tenantId,latest.db);audit(p,'reminder.sent'");
console.log('Publication migration and send reconciliation hardened');
