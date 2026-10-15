'use strict';
const fs=require('node:fs');
const word='<img class="invoingo-wordmark" src="/assets/invoingo-wordmark.png" width="900" height="200" alt="Invoingo">';
const files=['index.html','prototype.html','mobile.html','pay.html','expo.html','landing/index.html','landing/launch.html'];
for(const file of files){let s=fs.readFileSync(file,'utf8');
  s=s.replace(/(<a class="(?:logo|brand|studio-brand)"[^>]*>)(?:<span class="brand-mark"[^>]*>↗<\/span>invoingo(?:<span class="logo-dot">\.<\/span>|\.)|↗ invoingo\.|i↗ invoingo|<span class="brandmark">i<span>↗<\/span><\/span>invoingo<span class="brand-dot">®<\/span>)/g,'$1'+word);
  s=s.replaceAll('<span class="tiny-logo">↗ invoingo.</span>','<span class="tiny-logo">'+word+'</span>');
  s=s.replaceAll('<div class="mobile-logo">↗ invoingo.</div>','<div class="mobile-logo">'+word+'</div>');
  if(!s.includes('href="/brand.css"'))s=s.replace('</head>','<link rel="stylesheet" href="/brand.css"><link rel="apple-touch-icon" href="/assets/invoingo-icon-192.png"></head>');
  s=s.replace(/<link rel="icon" href="data:image\/svg\+xml,[^\"]+">/,'<link rel="icon" type="image/png" href="/assets/invoingo-favicon.png">');
  if(!s.includes('rel="icon"'))s=s.replace('</head>','<link rel="icon" type="image/png" href="/assets/invoingo-favicon.png"></head>');
  if(file==='mobile.html'&&!s.includes('app-brand-strip'))s=s.replace('<div class="phone-app"','<a class="app-brand-strip" href="#home" aria-label="Invoingo home">'+word+'</a><div class="phone-app"');
  fs.writeFileSync(file,s);
}
let mobile=fs.readFileSync('mobile.js','utf8');mobile=mobile.replaceAll('↗ invoingo.',word);fs.writeFileSync('mobile.js',mobile);
console.log('Applied approved wordmark across landing, desktop, mobile, pay and launch pages.');
