(function(root){
  'use strict';
  const plans=[
    {name:'Essentials',monthly:7.99,annual:79.99,description:'20 invoices per month · Estimates, clients, industry items and payment tracking'},
    {name:'Plus',monthly:12.99,annual:129.99,description:'Unlimited invoices · Expenses, reports and MioBot follow-up tools'},
    {name:'Premium',monthly:19.99,annual:199.99,description:'Planned: expanded AI allowance and advanced collections',planned:true}
  ];
  function storeURL(value,platform){try{const u=new URL(value);if(u.protocol!=='https:'||u.username||u.password)return null;if(platform==='ios'&&u.hostname==='apps.apple.com'&&/\/id\d+/.test(u.pathname))return u.href;if(platform==='android'&&u.hostname==='play.google.com'&&u.pathname==='/store/apps/details'&&/^[a-zA-Z][\w]*(\.[\w]+)+$/.test(u.searchParams.get('id')||''))return u.href;}catch{}return null;}
  const api={plans,storeURL,request(action,plan){if(root.ReactNativeWebView){root.ReactNativeWebView.postMessage(JSON.stringify({type:'invoingo.subscription',action,plan}));return;}showStores();}};
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.InvoingoSubscriptions=api;
  if(!root.document)return;
  let links={};
  const money=n=>'$'+n.toFixed(2);
  function stores(){return ['ios','android'].map(p=>{const label=p==='ios'?'App Store':'Google Play';return links[p]?`<a class="store-download" href="${links[p].replace(/&/g,'&amp;')}" target="_blank" rel="noopener">Download on ${label} ↗</a>`:`<span class="store-download unavailable" aria-disabled="true">${label} · Coming soon</span>`;}).join('');}
  function showStores(){let d=document.querySelector('#subscription-stores');if(!d){d=document.createElement('dialog');d.id='subscription-stores';d.innerHTML='<h2>Take Invoingo with you.</h2><p>Download the free app, then choose your subscription inside it. Apple or Google confirms the final price and purchase.</p><div data-store-buttons></div><p class="store-note">Store listings are being prepared. No purchase is available in this web preview.</p><button type="button">Close</button>';d.querySelector('button').onclick=()=>d.close();document.body.append(d);}d.querySelector('[data-store-buttons]').innerHTML=stores();d.showModal();}
  function renderLanding(){document.querySelectorAll('[data-store-buttons]').forEach(el=>el.innerHTML=stores());const mount=document.querySelector('[data-subscription-pricing]');if(!mount)return;const annual=mount.dataset.period==='annual';mount.innerHTML=`<div class="price-switch" role="group" aria-label="Billing period"><button data-period="monthly" aria-pressed="${!annual}">Monthly</button><button data-period="annual" aria-pressed="${annual}">Annual · save about 17%</button></div><div class="pricing-grid">${plans.map(p=>`<article class="pricing-card ${p.name==='Plus'?'recommended':''}"><p class="eyebrow">${p.planned?'COMING LATER':p.name==='Plus'?'OUR RECOMMENDATION':'START STRONG'}</p><h3>${p.name}</h3><p class="price-amount">${money(annual?p.annual:p.monthly)}<small>/${annual?'year':'month'}</small></p><p>${p.description}</p><button data-download>${p.planned?'Explore the preview':'Get the app'} ↗</button></article>`).join('')}</div><p class="store-note">Proposed US launch prices. Final localized prices and renewal terms appear in the store before purchase. Subscriptions are not live yet. Payment-processing fees are separate.</p>`;}
  document.addEventListener('click',e=>{const t=e.target.closest('[data-period],[data-download],[data-subscription-action]');if(!t)return;if(t.dataset.period){const m=document.querySelector('[data-subscription-pricing]');m.dataset.period=t.dataset.period;renderLanding();}else if(t.dataset.subscriptionAction){api.request(t.dataset.subscriptionAction);}else showStores();});
  root.addEventListener('message',e=>{let m;try{m=typeof e.data==='string'?JSON.parse(e.data):e.data;}catch{return;}if(m?.type!=='invoingo.subscription.result')return;const status=document.querySelector('#subscription-status');if(status)status.textContent=m.message;});
  renderLanding();
  fetch('/api/store-links').then(r=>r.ok?r.json():{}).then(data=>{links={ios:storeURL(data.ios,'ios'),android:storeURL(data.android,'android')};renderLanding();}).catch(()=>{});
})(typeof window==='undefined'?globalThis:window);
