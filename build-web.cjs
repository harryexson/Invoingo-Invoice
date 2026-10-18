// Publish an explicit public-file allowlist. Backend code, .env and local records
// must never be copied into the static deployment.
const fs=require('node:fs'),path=require('node:path');
const root=__dirname,out=path.join(root,'dist','web');
if(!out.startsWith(root+path.sep))throw Error('Invalid output path');
fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
function copy(source,target){const file=path.join(root,source),dest=path.join(out,target);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(file,dest);}
const app=['index.html','app.js','domain.js','wallet.js','catalog.js','catalog-ui.js','styles.css','prototype.html','prototype-app.js','prototype-styles.css','enhancements.js','enhancements.css','mobile.html','mobile.js','mobile.css','mobile-refinement.css','pay.html','pay.js','expo.html','miobot-core.js','miobot-local.js','miobot-voice.js','miobot-ui.js','miobot.css','subscriptions.js','store-assets.html','brand.css','reporting.js','documents.js','invoice-assistant.js'];
for(const name of app){copy(name,'app/'+name);if(!['index.html','styles.css','app.js'].includes(name))copy(name,name);}
for(const name of ['index.html','styles.css','script.js','campaign.css','campaign.js','launch.html'])copy('landing/'+name,name);
for(const name of fs.readdirSync(path.join(root,'landing','assets'))){if(!/^[a-zA-Z0-9_-]+\.(png|jpg|jpeg|webp|svg|gif|mp4|mp3|wav|ttf|woff2?|css|vtt|zip)$/.test(name))continue;for(const prefix of ['assets/'])copy('landing/assets/'+name,prefix+name);}
const bootstrap='<script src="/static-preview.js"></script>';
function patch(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())patch(p);else if(entry.name.endsWith('.html')){let text=fs.readFileSync(p,'utf8').replace(/http:\/\/127\.0\.0\.1:4185\//g,'/');text=text.replace('</head>',bootstrap+'</head>');fs.writeFileSync(p,text);}}}
patch(out);copy('static-preview.js','static-preview.js');
console.log('Built public website and local workspace at dist/web. Cloud services are not deployed.');
