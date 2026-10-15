const fs = require('node:fs');
const path = require('node:path');
const {openBrowser} = require('@remotion/renderer');
(async()=>{
 const root=path.resolve(__dirname,'mobile-recording-v5'); fs.mkdirSync(root,{recursive:true});
 const browser=await openBrowser('chrome');
 try {
 const page=await browser.newPage({context:null,logLevel:'error',indent:false,pageIndex:0,onBrowserLog:null,onLog:()=>{}});
 await page.setViewport({width:390,height:844,deviceScaleFactor:1});
 await page.goto({url:'http://127.0.0.1:4185/mobile.html?canvas=1#miobot',timeout:30000});
 await new Promise(r=>setTimeout(r,1500));
 console.log((await page.evaluate(()=>document.body.innerText)).slice(-3500));
 for(let i=0;i<144;i++){
  if(i===20) await page.evaluate(()=>{const q=document.querySelector('#mio-question');q.value="What's left on Maya Chen's INV-1043?";q.dispatchEvent(new Event('input',{bubbles:true}));});
  if(i===42) await page.evaluate(()=>document.querySelector('#mio-question-form').requestSubmit());
  const shot=await page._client().send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
  fs.writeFileSync(path.join(root,String(i).padStart(4,'0')+'.png'),Buffer.from(shot.value.data,'base64'));
  if(i%24===0) console.log('Captured',i);
 }
 fs.writeFileSync(path.join(root,'actual-response.txt'),await page.evaluate(()=>document.body.innerText));
 } finally {await browser.close({silent:true});}
})();
