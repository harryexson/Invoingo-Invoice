// Component/render coverage in a minimal DOM harness, not a substitute for a
// real-device browser, permission, store-billing or payment-provider test.
const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const B=require('./domain'),Catalog=require('./catalog'),Core=require('./miobot-core');
function harness(){
 const nodes=new Map(),listeners={};
 const element=()=>({innerHTML:'',textContent:'',value:'',dataset:{},style:{},hidden:false,open:false,scrollTop:0,scrollHeight:20,classList:{add(){},remove(){},toggle(){},contains(){return false;}},setAttribute(){},addEventListener(){},querySelector(){return element();},querySelectorAll(){return [];},insertAdjacentHTML(_,s){this.innerHTML+=s;},showModal(){this.open=true;},close(){this.open=false;},focus(){}});
 const node=s=>{if(!nodes.has(s))nodes.set(s,element());return nodes.get(s);};
 const storage=new Map();const context={console,Intl,Date,Math,URL,URLSearchParams,Uint8Array,structuredClone,Promise,Blob,FormData:class{constructor(f){return Object.entries(f.values||{});}},Business:B,Catalog,MioCore:Core,MioLocal:require('./miobot-local'),MioVoice:require('./miobot-voice'),InvoiceAssistant:require('./invoice-assistant'),InvoingoSubscriptions:{plans:[{id:'plus',name:'Plus',features:[]}],price:()=>'$12.99',native:false},navigator:{language:'en-US'},location:{search:'?mode=live',hash:'#welcome',href:'https://test.example/mobile.html?mode=live#welcome'},sessionStorage:{getItem:()=>null},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},setInterval:()=>0,setTimeout:()=>0,clearTimeout(){},addEventListener(){},fetch:()=>{throw Error('Screen attempted an unconfigured network request');}};
 context.window=context;context.InvoingoStaticPreview=true;context.document={body:element(),hidden:false,querySelector:node,querySelectorAll:()=>[],createElement:element,addEventListener:(name,fn)=>{(listeners[name]||=[]).push(fn);}};
 vm.createContext(context);for(const file of ['reporting.js','mobile.js','miobot-ui.js'])vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
 return {context,node,listeners};
}
test('all 27 QuickSend-equivalent navigation destinations render with real local records',async()=>{
 const h=harness();vm.runInContext('M.db=M.seed();M.demo=false;',h.context);
 const screens=vm.runInContext('M.screens.map(s=>s[0])',h.context);
 const expected=['welcome','setup','home','activity','editor','additem','billto','preview','send','tracking','pay','payment','paid','payment-options','plans','estimates','clients','items','reports','expenses','settings','integrations','miobot','miobot-voice','miobot-nudges','miobot-alerts','miobot-settings'];
 assert.deepEqual(Array.from(screens),expected);
 for(const screen of screens){h.context.location.hash='#'+screen;vm.runInContext('M.render()',h.context);await new Promise(resolve=>setImmediate(resolve));const output=screen.startsWith('miobot')?h.node('#mio-root').innerHTML:h.node('#phone-app').innerHTML;assert.ok(output.length>50,screen+' did not render');if(screen==='miobot')assert.match(output,/aria-label="Speak to MioBot"/);}
});
test('mobile estimates save multiple priced products and convert only once',async()=>{
 const h=harness();vm.runInContext("M.db=M.seed();M.demo=false;M.estimateDraft={id:'estimate-audit',number:null,clientId:'client-maya',date:'2026-10-01',due:'2026-10-30',currency:'USD',items:[{name:'Consulting',qty:2,rate:50,unit:'hour',type:'service'},{name:'Prints',qty:3,rate:10,unit:'copy',type:'product'}],tax:10,discount:10,note:'',status:'Draft',payments:[],activity:[]};",h.context);
 const values={clientId:'client-maya',date:'2026-10-01',due:'2026-10-30',tax:'10',discount:'10',note:'Review estimate','line-name-0':'Consulting','line-qty-0':'2','line-rate-0':'50','line-name-1':'Prints','line-qty-1':'3','line-rate-1':'10'};
 h.node('#estimate-form').values=values;
 const errors={textContent:'',focus(){}},form={id:'estimate-form',values,getAttribute:()=> 'estimate-form',querySelector:s=>s==='[type=submit]'?{disabled:false}:errors};
 for(const handler of h.listeners.submit||[])await handler({target:form,preventDefault(){},stopImmediatePropagation(){}});
 assert.equal(errors.textContent,'');const estimate=vm.runInContext("M.db.estimates.find(e=>e.id==='estimate-audit')",h.context);assert.equal(estimate.items.length,2);assert.equal(estimate.items[1].type,'product');assert.equal(B.totals(estimate).total,132);
 vm.runInContext("M.db.estimates.find(e=>e.id==='estimate-audit').status='Accepted'",h.context);
 const click=async()=>{const button={dataset:{action:'convert-estimate',id:'estimate-audit'},tagName:'BUTTON',closest:()=>null};for(const handler of h.listeners.click||[])await handler({target:{closest:s=>s==='button,a'?button:null}});};
 const before=vm.runInContext('M.db.invoices.length',h.context);await click();await click();assert.equal(vm.runInContext('M.db.invoices.length',h.context),before+1);assert.equal(estimate.status,'Converted');
});
test('mobile backup restore requires confirmation before replacing records',async()=>{
 const h=harness();vm.runInContext('M.db=M.seed();M.demo=false;',h.context);const backup=vm.runInContext('M.emptyDB()',h.context);backup.settings.name='Restored Business';
 const input={id:'mobile-restore',dataset:{},closest:()=>null,files:[{size:100,text:async()=>JSON.stringify(backup)}],value:'chosen'};
 for(const handler of h.listeners.change||[])await handler({target:input});
 assert.equal(vm.runInContext('M.db.settings.name',h.context),'Brightline Studio');assert.match(h.node('#mobile-dialog').innerHTML,/Replace with this backup/);
 const button={dataset:{action:'confirm-mobile-restore'},tagName:'BUTTON',closest:()=>null};for(const handler of h.listeners.click||[])await handler({target:{closest:s=>s==='button,a'?button:null}});
 assert.equal(vm.runInContext('M.db.settings.name',h.context),'Restored Business');assert.equal(vm.runInContext('M.db.invoices.length',h.context),0);
});
