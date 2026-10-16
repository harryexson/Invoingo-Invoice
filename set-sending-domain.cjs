const fs=require('node:fs');
const file='.env';
let source=fs.readFileSync(file,'utf8');
const setting='RESEND_FROM=Invoingo <invoices@invoingo.com>';
source=/^RESEND_FROM=.*$/m.test(source)?source.replace(/^RESEND_FROM=.*$/m,setting):source+'\n'+setting+'\n';
fs.writeFileSync(file,source);
console.log('Resend sender set to Invoingo <invoices@invoingo.com>. No email sent.');
