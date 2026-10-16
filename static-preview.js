/* Static hosting supports real device-local work, not provider operations. */
(()=>{
 const original=window.fetch.bind(window);
 window.fetch=async(input,init)=>{
  const u=new URL(typeof input==='string'?input:input.url,location.href);
  if(u.origin===location.origin&&u.pathname.startsWith('/api/')){
   const store=u.pathname==='/api/store-links';
   return new Response(JSON.stringify(store?{ios:null,android:null}:{error:'Cloud services are not connected on this deployment yet. Local invoices, clients, expenses and reports work on this device; email, payments and online MioBot need the backend setup.'}),{status:store?200:503,headers:{'Content-Type':'application/json'}});
  }
  return original(input,init);
 };
 addEventListener('DOMContentLoaded',()=>{
  const notice=document.createElement('div');notice.className='hosting-notice';notice.setAttribute('role','note');notice.textContent='Local workspace preview · Saved on this device · Cloud accounts, email and payments pending';
  notice.style.cssText='padding:9px 16px;background:#e2f6d5;color:#163300;font:12px/1.5 Inter,Arial,sans-serif;text-align:center;border-bottom:1px solid #cbd5c3';
  if(!new URLSearchParams(location.search).has('canvas')&&!new URLSearchParams(location.search).has('embedded'))document.body.prepend(notice);
 });
})();
