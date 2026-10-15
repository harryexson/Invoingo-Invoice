const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
function load(crypto){const window={Catalog:{},crypto};vm.runInNewContext(fs.readFileSync(require.resolve('./domain'),'utf8'),{window,Uint8Array,Date,Math});return window.Business;}
test('secure contexts retain native UUID generation',()=>{let calls=0;const B=load({randomUUID(){calls++;return 'native-id';}});assert.equal(B.createId(),'native-id');assert.equal(calls,1);});
test('LAN HTTP without randomUUID creates UUIDs with getRandomValues',()=>{const webcrypto=require('node:crypto').webcrypto;const B=load({getRandomValues:bytes=>webcrypto.getRandomValues(bytes)});const ids=Array.from({length:1000},()=>B.createId());assert(ids.every(id=>uuid.test(id)));assert.equal(new Set(ids).size,ids.length);});
test('older WebViews without crypto still create distinct valid record IDs',()=>{const B=load(undefined);const ids=Array.from({length:1000},()=>B.createId());assert(ids.every(id=>/^[a-zA-Z0-9-]{1,80}$/.test(id)));assert.equal(new Set(ids).size,ids.length);});
test('the mobile new-invoice action succeeds without randomUUID',()=>{
 const webcrypto=require('node:crypto').webcrypto,B=load({getRandomValues:bytes=>webcrypto.getRandomValues(bytes)});
 const source=fs.readFileSync(require.resolve('./mobile'),'utf8');
 const id=source.match(/M\.id=([^;]+);/)[1],begin=source.match(/^M\.begin=([^\n]+)/m)[1];
 const M={db:{clients:[{id:'client'}],settings:{tax:8.5,note:'Thanks'}},date:()=> '2026-10-15',go:screen=>M.screen=screen};
 vm.runInNewContext(`M.id=${id};M.begin=${begin};M.begin();`,{M,Business:B,Date});
 assert(uuid.test(M.edit.id));assert.equal(M.edit.status,'Draft');assert.equal(M.screen,'editor');assert.equal(M.edit.clientId,'client');
});
