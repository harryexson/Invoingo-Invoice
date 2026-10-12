const fs=require('node:fs');
const config=JSON.parse(fs.readFileSync('package.json','utf8'));
config.scripts.start='node --use-system-ca server.js';config.scripts.landing='node --use-system-ca landing/serve.js';config.scripts['preview:phone']='node --use-system-ca phone-preview.cjs';config.scripts['check:connections']='node --use-system-ca connection-check.cjs --providers';
fs.writeFileSync('package.json',JSON.stringify(config,null,2)+'\n');
fs.appendFileSync('INTEGRATIONS.md','\nProvider setup can be inspected without printing secret values using `npm run check:connections`. This performs read-only Stripe test-account and Resend domain checks; it sends no emails and creates no payments. Startup scripts use Node’s system CA trust store while keeping TLS certificate verification enabled. Configuration status indicates saved settings; verified webhook delivery still requires an actual signed event.\n');
