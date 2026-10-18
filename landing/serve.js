const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const miobotHandler=require('../miobot-server').createMioBotHandler();
const integrationHandler=require('../integrations').createIntegrationHandler({miobot:miobotHandler});
const appFiles = new Set(['index.html','app.js','domain.js','wallet.js','catalog.js','catalog-ui.js','styles.css','prototype.html','prototype-app.js','prototype-styles.css','enhancements.js','enhancements.css','mobile.html','mobile.js','mobile.css','pay.html','pay.js','expo.html','miobot-core.js','miobot-local.js','miobot-voice.js','miobot-ui.js','miobot.css','miobot-responsive-check.html','subscriptions.js','store-assets.html']);
appFiles.add('mobile-refinement.css');appFiles.add('brand.css');appFiles.add('reporting.js');appFiles.add('documents.js');appFiles.add('invoice-assistant.js');
const pageFiles = new Set(['index.html','styles.css','script.js','campaign.css','campaign.js','launch.html']);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.gif':'image/gif','.mp4':'video/mp4','.ttf':'font/ttf','.vtt':'text/vtt; charset=utf-8'};
types['.zip']='application/zip';
const server=http.createServer((req,res)=>{
  if(req.url==='/api/store-links'&&req.method==='GET'){
    const {storeURL}=require('../subscriptions');res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify({ios:storeURL(process.env.APP_STORE_URL,'ios'),android:storeURL(process.env.GOOGLE_PLAY_URL,'android')}));return;
  }
  if(miobotHandler(req,res)||integrationHandler(req,res))return;
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});res.end();return;}
  let url;try{url=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);res.end();return;}
  if(process.env.INVOIGO_DEFAULT_APP==='true'){
    if(url==='/'||url==='/index.html')url='/app/index.html';
    else if(appFiles.has(url.slice(1)))url='/app'+url;
    else if(url==='/landing'||url==='/landing/'){url='/';}
    else if(/^\/landing\/(styles\.css|script\.js|catalog\.js|campaign\.css|campaign\.js)$/.test(url))url=url.replace('/landing/','/');
  }
  if(url==='/app'){res.writeHead(302,{Location:'/app/'});res.end();return;}
  let file;
  if(['/brand.css','/mobile-refinement.css','/reporting.js','/documents.js','/invoice-assistant.js'].includes(url))file=path.join(__dirname,'..',url.slice(1));
  else if(url.startsWith('/app/landing/assets/')&&/^\/app\/landing\/assets\/[a-zA-Z0-9_-]+\.(ttf|css)$/.test(url))file=path.join(__dirname,'assets',path.basename(url));
  else if(['/mobile.html','/mobile.js','/mobile.css','/domain.js','/pay.html','/pay.js','/expo.html','/miobot-core.js','/miobot-local.js','/miobot-voice.js','/miobot-ui.js','/miobot.css','/miobot-responsive-check.html','/subscriptions.js','/store-assets.html'].includes(url))file=path.join(__dirname,'..',url.slice(1));
  else if(url.startsWith('/landing/assets/')&&/^\/landing\/assets\/[a-zA-Z0-9_-]+\.(ttf|css|png|jpg|gif|mp4)$/.test(url))file=path.join(__dirname,'assets',path.basename(url));
  else if(url.startsWith('/app/')){const name=url.slice(5)||'index.html';if(appFiles.has(name))file=path.join(__dirname,'..',name);}
  else if(url==='/catalog.js')file=path.join(__dirname,'..','catalog.js');
  else if(url.startsWith('/assets/')&&/^\/assets\/[a-zA-Z0-9_-]+\.(png|jpg|gif|mp4|ttf|css|vtt|zip)$/.test(url))file=path.join(__dirname,url.slice(1));
  else{const name=url.slice(1)||'index.html';if(pageFiles.has(name))file=path.join(__dirname,name);}
  if(!file){res.writeHead(404);res.end('Not found');return;}
  fs.stat(file,(error,stat)=>{
    if(error||!stat.isFile()){res.writeHead(404);res.end('Not found');return;}
    const headers={'Content-Type':types[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Cache-Control':'no-cache','Accept-Ranges':'bytes'};
    let start=0,end=stat.size-1,status=200;
    if(req.headers.range){const match=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);if(!match||(!match[1]&&!match[2])){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});res.end();return;}if(!match[1])start=Math.max(0,stat.size-Number(match[2]));else{start=Number(match[1]);if(match[2])end=Math.min(end,Number(match[2]));}if(!Number.isSafeInteger(start)||start>end){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});res.end();return;}status=206;headers['Content-Range']=`bytes ${start}-${end}/${stat.size}`;}
    headers['Content-Length']=end-start+1;res.writeHead(status,headers);if(req.method==='HEAD'){res.end();return;}const stream=fs.createReadStream(file,{start,end});stream.on('error',()=>res.destroy());res.on('close',()=>stream.destroy());stream.pipe(res);
  });
});
server.listen(Number(process.env.LANDING_PORT)||4185,process.env.PREVIEW_HOST||'127.0.0.1',()=>console.log(`Invoingo landing: http://127.0.0.1:${server.address().port}`));
