const fs=require('node:fs');
for(const file of ['mobile.js','enhancements.js']){
 let source=fs.readFileSync(file,'utf8');
 if(file==='mobile.js'){
  source=source.replace("M.connection?.resend?'KEY & SENDER SET':'SETUP NEEDED'","M.connection?.resend?'KEY & SENDER SET':M.connection?.resendKey?'ADD SENDER':'SETUP NEEDED'");
  source=source.replace('Send invoices and receive delivery, bounce and open events.','Send invoices and receive delivery, bounce and open events. ${M.connection?.resendKey&&!M.connection?.senderConfigured?\'Add RESEND_FROM to .env using an address on your verified domain.\':\'\'}');
  source=source.replace("Resend webhook: ${M.connection.resendWebhook?'configured':'pending'}`", "Resend webhook: ${M.connection.resendWebhook?'configured':'pending'} · Signed delivery still needs verification. ${M.connection.publiclyReachable?'':'Set PUBLIC_BASE_URL to your public HTTPS address for client links and webhook delivery.'}`");
 }else{
  source=source.replace("s.resend?'Key & sender configured':'Setup needed'", "s.resend?'Key & sender configured':s.resendKey?'API key configured · Add RESEND_FROM':'Setup needed'");
  source=source.replace('Resend requires a verified sender and public HTTPS invoice links.', 'Resend requires RESEND_FROM on a verified domain and PUBLIC_BASE_URL with a public HTTPS address. Webhook secrets being configured does not confirm signed event delivery.');
 }
 fs.writeFileSync(file,source);
}
