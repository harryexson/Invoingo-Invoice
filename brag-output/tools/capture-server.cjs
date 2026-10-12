const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../..');
const allowed=new Set(['mobile.html','mobile.js','mobile.css','catalog.js','domain.js']);
http.createServer((req,res)=>{
 const url=new URL(req.url,'http://localhost').pathname;let file;
 if(allowed.has(url.slice(1)))file=path.join(root,url.slice(1));
 else if(/^\/landing\/assets\/inter-(400|600|700|900)\.ttf$/.test(url))file=path.join(root,url.slice(1));
 if(!file||req.method!=='GET'){res.writeHead(404);res.end();return;}
 const type={'.html':'text/html','.js':'text/javascript','.css':'text/css','.ttf':'font/ttf'}[path.extname(file)];
 fs.readFile(file,(e,data)=>{if(e){res.writeHead(404);res.end();return;}res.writeHead(200,{'Content-Type':type,'Cache-Control':'no-store'});res.end(data);});
}).listen(4186,'127.0.0.1',()=>console.log('Read-only fictional app capture: http://127.0.0.1:4186/mobile.html'));
