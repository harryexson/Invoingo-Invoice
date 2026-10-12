const fs=require('node:fs');
function edit(file,old,next){let s=fs.readFileSync(file,'utf8');if(!s.includes(old))throw Error('Missing edit anchor: '+file+' '+old.slice(0,40));fs.writeFileSync(file,s.replace(old,next));}
edit('landing/serve.js',"const integrationHandler=require('../integrations').createIntegrationHandler();","const miobotHandler=require('../miobot-server').createMioBotHandler();\nconst integrationHandler=require('../integrations').createIntegrationHandler({miobot:miobotHandler});");
edit('landing/serve.js','  if(integrationHandler(req,res))return;','  if(miobotHandler(req,res)||integrationHandler(req,res))return;');
edit('landing/serve.js',"'pay.html','pay.js','expo.html'","'pay.html','pay.js','expo.html','miobot-core.js','miobot-ui.js','miobot.css'");
edit('landing/serve.js',"'/pay.html','/pay.js','/expo.html'","'/pay.html','/pay.js','/expo.html','/miobot-core.js','/miobot-ui.js','/miobot.css'");
edit('integrations.js',"const authorized=req=>adminToken?.length>=32&&safeEqual(req.headers.authorization,`Bearer ${adminToken}`);","const authorized=req=>!!require('./identity').operatorIdentity(req,env);");
edit('integrations.js',' let queue=Promise.resolve();',` options.miobot?.connect({
  getRecord:id=>store.invoices[id],
  refresh:async id=>{const record=store.invoices[id];if(!record)return null;if(record.sessionId){if(!stripe)throw fail('Stripe verification is unavailable.',503);applyStripe(record,await stripe.checkout.sessions.retrieve(record.sessionId));persist();}return record;},
  sendReminder:async r=>{if(!resend||!env.RESEND_FROM)throw fail('Configure Resend and a verified sender first.',503);if(baseUrl.protocol!=='https:')throw fail('A public HTTPS deployment is required before sending customer reminders.',409);const {data,error}=await resend.emails.send({from:env.RESEND_FROM,to:[r.to],subject:r.subject,text:r.text},{idempotencyKey:r.key});if(error||!data?.id)throw fail('Resend did not accept the reminder.',502);return data;}
 });
 let queue=Promise.resolve();`);
edit('integrations.js','if(record)applyStripe(record,session);','if(record){applyStripe(record,session);options.miobot?.payment(record);}');
edit('integrations.js',"const record=Object.values(store.invoices).find(r=>r.emailId===event.data?.email_id);","options.miobot?.delivery(null,{...event,id:eid});const record=Object.values(store.invoices).find(r=>r.emailId===event.data?.email_id);");
edit('integrations.js','reply(res,200,{id:record.id,url:', 'options.miobot?.publication(record,data);reply(res,200,{id:record.id,url:');
edit('integrations.js','reply(res,200,{payment:record.payment,events:record.events});','options.miobot?.payment(record);reply(res,200,{payment:record.payment,events:record.events});');
edit('mobile.html','<link rel="stylesheet" href="mobile.css">','<link rel="stylesheet" href="mobile.css"><link rel="stylesheet" href="miobot.css">');
edit('mobile.html','<script src="mobile.js"></script>','<script src="mobile.js"></script><script src="miobot-core.js"></script><script src="miobot-ui.js"></script>');
edit('index.html','<link rel="stylesheet" href="enhancements.css">','<link rel="stylesheet" href="enhancements.css"><link rel="stylesheet" href="miobot.css">');
edit('index.html','<script src="enhancements.js"></script>','<script src="enhancements.js"></script><script src="miobot-core.js"></script><script src="miobot-ui.js"></script>');
edit('mobile.js',"['reports','▥','Reports']","['miobot','✦','MioBot']");
// Reports remain available from More; MioBot becomes a primary mobile destination.
edit('mobile.js',"['Expenses & receipts','expenses']","['Expenses & receipts','expenses'],['Business reports','reports'],['MioBot assistant','miobot']");
console.log('MioBot hooks installed');
