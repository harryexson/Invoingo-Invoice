(function(root){
  'use strict';
  const plans=[
    {id:'essentials',name:'Essentials',monthly:7.99,annual:79.99,invoiceLimit:20,description:'For independent businesses getting started.',features:['20 invoices per month','Estimates, clients and saved items','45 industry starter catalogs','PDFs, sharing and payment tracking']},
    {id:'plus',name:'Plus',monthly:12.99,annual:129.99,invoiceLimit:null,description:'Your everyday business toolkit.',features:['Unlimited invoices and estimates','Everything in Essentials','Expenses, reports and CSV exports','MioBot invoice queries and reminder drafts']},
    {id:'premium',name:'Premium',monthly:19.99,annual:199.99,planned:true,description:'Planned for businesses ready for more.',features:['Everything in Plus','Planned: expanded AI allowance','Planned: advanced collection workflows']}
  ];
  const free={name:'Free',monthly:0,invoiceLimit:3,description:'3 invoices per month. Try your workflow before upgrading.'};
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function storeURL(value,platform){try{const u=new URL(value);if(u.protocol!=='https:'||u.username||u.password)return null;if(platform==='ios'&&u.hostname==='apps.apple.com'&&/\/id\d+/.test(u.pathname))return u.href;if(platform==='android'&&u.hostname==='play.google.com'&&u.pathname==='/store/apps/details'&&/^[a-zA-Z][\w]*(\.[\w]+)+$/.test(u.searchParams.get('id')||''))return u.href;}catch{}return null;}
  const api={plans,free,storeURL,catalog:[],ready:false,activePlan:null,native:!!root.ReactNativeWebView,
    request(action,plan,period='monthly'){
      if(!['catalog','purchase','restore','manage'].includes(action))return;
      const selected=plans.find(p=>p.name===plan||p.id===plan);
      if(action==='purchase'&&(!selected||selected.planned))return;
      if(root.ReactNativeWebView){root.ReactNativeWebView.postMessage(JSON.stringify({type:'invoingo.subscription',action,plan:selected?.name,period:period==='annual'?'annual':'monthly'}));return;}
      if(action!=='catalog')showStores();
    },
    price(plan,period){if(api.native){const entry=api.catalog.find(p=>p.plan===plan.id&&p.period===period);return entry?.price||'Store price unavailable';}return '$'+(period==='annual'?plan.annual:plan.monthly).toFixed(2);}
  };
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.InvoingoSubscriptions=api;
  if(!root.document)return;
  let links={};
  function stores(){return ['ios','android'].map(p=>{const label=p==='ios'?'App Store':'Google Play';return links[p]?`<a class="store-download" href="${esc(links[p])}" target="_blank" rel="noopener">Download on ${label} ↗</a>`:`<span class="store-download unavailable" aria-disabled="true">${label} · Coming soon</span>`;}).join('');}
  function showStores(){let d=document.querySelector('#subscription-stores');if(!d){d=document.createElement('dialog');d.id='subscription-stores';d.innerHTML='<h2>Take Invoingo with you.</h2><p>Download the free app, then choose your subscription inside it. Apple or Google confirms the final price and purchase.</p><div data-store-buttons></div><p class="store-note">Store listings are being prepared. No purchase is available in this web preview.</p><button type="button">Close</button>';d.querySelector('button').onclick=()=>d.close();document.body.append(d);}d.querySelector('[data-store-buttons]').innerHTML=stores();d.showModal();}
  function renderLanding(){
    document.querySelectorAll('[data-store-buttons]').forEach(el=>el.innerHTML=stores());const mount=document.querySelector('[data-subscription-pricing]');if(!mount)return;const annual=mount.dataset.period==='annual';
    mount.innerHTML=`<div class="free-plan-banner"><div><strong>Start free. Find your flow.</strong><p>${free.description}</p></div><a href="/mobile.html?mode=demo#welcome">Explore the free preview ↗</a></div><div class="price-switch" role="group" aria-label="Billing period"><button data-period="monthly" aria-pressed="${!annual}">Monthly</button><button data-period="annual" aria-pressed="${annual}">Annual · save about 17%</button></div><div class="pricing-grid">${plans.map(p=>`<article class="pricing-card ${p.id==='plus'?'recommended':''}"><p class="eyebrow">${p.planned?'COMING LATER':p.id==='plus'?'MOST POPULAR':'START STRONG'}</p><h3>${p.name}</h3><p class="price-amount">${api.price(p,annual?'annual':'monthly')}<small>/${annual?'year':'month'}</small></p><p>${p.description}</p><ul>${p.features.map(f=>`<li>${f}</li>`).join('')}</ul><button data-download>${p.planned?'View launch plans':'Get the app'} ↗</button></article>`).join('')}</div><p class="store-note">Proposed US launch prices. Annual plans are billed once per year. Final localized prices and renewal terms appear in the store before purchase. Subscriptions are not live yet; limits are planned for the store release. Payment-processing fees are separate. Premium is not available for purchase.</p>`;
  }
  document.addEventListener('click',e=>{const t=e.target.closest('[data-period],[data-download],[data-subscription-action]');if(!t)return;if(t.dataset.period){const m=document.querySelector('[data-subscription-pricing]');if(m){m.dataset.period=t.dataset.period;renderLanding();}}else if(t.dataset.subscriptionAction)api.request(t.dataset.subscriptionAction,t.dataset.subscriptionPlan,t.dataset.subscriptionPeriod);else showStores();});
  root.addEventListener('message',e=>{let m;try{m=typeof e.data==='string'?JSON.parse(e.data):e.data;}catch{return;}if(m?.type!=='invoingo.subscription.result'||!api.native)return;if(Array.isArray(m.catalog))api.catalog=m.catalog;if(typeof m.ready==='boolean')api.ready=m.ready;if('activePlan' in m)api.activePlan=m.activePlan;const status=document.querySelector('#subscription-status');if(status&&typeof m.message==='string')status.textContent=m.message;root.dispatchEvent(new CustomEvent('invoingo:billing-updated',{detail:{message:m.message}}));});
  renderLanding();fetch('/api/store-links').then(r=>r.ok?r.json():{}).then(data=>{links={ios:storeURL(data.ios,'ios'),android:storeURL(data.android,'android')};renderLanding();}).catch(()=>{});api.request('catalog');
})(typeof window==='undefined'?globalThis:window);
