const {test}=require('node:test');
const assert=require('node:assert/strict');
const C=require('./catalog');
const B=require('./domain');
const ids=()=>{let n=0;return ()=>`item-${++n}`;};
test('all industries have unique suggestions with unset prices and valid categories',()=>{
  assert.equal(C.industries.length,45);
  assert.equal(new Set(C.industries.map(i=>i.id)).size,C.industries.length);
  const templates=C.industries.flatMap(i=>i.items);
  assert.equal(new Set(templates.map(i=>i.templateId)).size,templates.length);
  for(const i of C.industries){assert.ok(i.items.length>=4);for(const item of i.items){assert.equal(item.rate,null);assert.ok(item.category);assert.doesNotThrow(()=>C.validate(item));}}
});
test('import only selected templates and keep existing user prices on repeat import',()=>{
  const industry=C.get('painters'),wanted=industry.items.slice(0,2).map(i=>i.templateId),next=ids();
  const first=C.importItems([],industry.id,wanted,next);
  assert.equal(first.added,2);first.items[0].rate=450;first.items[0].name='My interior painting package';
  const second=C.importItems(first.items,industry.id,wanted,next);
  assert.equal(second.added,0);assert.equal(second.skipped,2);assert.equal(second.items[0].rate,450);assert.equal(second.items[0].name,'My interior painting package');
});
test('suggestions preserve custom items and avoid duplicate names within item type',()=>{
  const i=C.get('retail').items[0],existing=[{id:'mine',name:'  RETAIL PRODUCT ',type:'product',rate:25,unit:'item'}];
  const imported=C.importItems(existing,'retail',[i.templateId],ids());assert.equal(imported.added,0);assert.equal(imported.items[0],existing[0]);
});
test('product lines snapshot name, price, unit, category, description and SKU',()=>{
  const item={id:'p',name:'Printed book',type:'product',category:'Books',description:'Hardcover',sku:'BOOK-001',rate:19.95,unit:'copy'};
  const line=C.toLine(item);item.rate=29.95;item.name='New edition';
  assert.equal(line.rate,19.95);assert.equal(line.name,'Printed book');assert.equal(line.unit,'copy');assert.equal(line.sku,'BOOK-001');assert.equal(line.category,'Books');
  const d={clientId:'c',date:'2026-10-04',due:'2026-10-18',items:[{...line,qty:3}],tax:0,discount:0,payments:[]};assert.doesNotThrow(()=>B.validate(d));assert.equal(B.totals(d).total,59.85);
});
test('items without prices need a price before document validation',()=>{
  const line=C.toLine(C.get('authors').items[0]);assert.equal(line.rate,null);
  assert.throws(()=>B.validate({clientId:'c',date:'2026-10-04',due:'2026-10-18',items:[line],tax:0,discount:0,payments:[]}));
});
test('catalog searches names, SKUs, descriptions and categories with type filters',()=>{
  const items=[{name:'Print',type:'product',category:'Books',sku:'B001',description:'Hardcover'},{name:'Editing',type:'service',category:'Editorial'}];
  assert.equal(C.search(items,'b001','product').length,1);assert.equal(C.search(items,'hardcover').length,1);assert.equal(C.search(items,'','service','Editorial').length,1);assert.equal(C.search(items,'','service','Books').length,0);
});
test('catalog validation rejects negative/non-finite prices and invalid item types',()=>{
  const item={...C.get('retail').items[0]};
  for(const patch of [{rate:-1},{rate:NaN},{type:'anything'},{unit:''},{category:42},{name:' '}])assert.throws(()=>C.validate({...item,...patch}));
  assert.doesNotThrow(()=>C.validate({...item,rate:0}));
});
test('backup supports legacy services and new unpriced products with industry settings',()=>{
  const settings={name:'Studio',email:'',phone:'',address:'',note:'',instructions:'',currency:'USD',tax:0,terms:14,industry:'authors',industries:['authors','retail'],customIndustry:''};
  const backup={version:1,settings,clients:[],invoices:[],estimates:[],expenses:[],services:[{id:'old',name:'Design',rate:150,unit:'hour'},{...C.get('authors').items.at(-1),id:'book'}],nextInvoice:1001,nextEstimate:101};
  assert.doesNotThrow(()=>B.validateBackup(backup));backup.settings.industry='not-supported';assert.throws(()=>B.validateBackup(backup));
});
