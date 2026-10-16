const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('mobile.js','utf8');
test('client and catalog forms save when a named id control masks form.id',async()=>{
 const begin=source.indexOf("document.addEventListener('submit',async event=>{event.preventDefault();"),end=source.indexOf('M.readEditor=',begin);
 let handler,saved=0,closed=0;
 const M={db:{settings:{industry:''},clients:[],services:[]},id:()=> 'new-record',save:()=>saved++,$:()=>({close:()=>closed++}),render:()=>{},notice:()=>{}};
 vm.runInNewContext(source.slice(begin,end),{document:{addEventListener:(_,fn)=>handler=fn},M,Catalog:require('./catalog'),FormData:class{constructor(form){return Object.entries(form.values);}}});
 const submit=async(formId,values)=>{const submitButton={disabled:false};await handler({preventDefault(){},target:{id:{value:values.id},getAttribute:()=>formId,values,querySelector:selector=>selector==='[type=submit]'?submitButton:{textContent:'',focus(){}}}});assert.equal(submitButton.disabled,false);};
 await submit('client-form',{id:'',name:'Jordan Reed',email:'jordan@example.com',phone:'',address:''});
 assert.equal(M.db.clients[0].name,'Jordan Reed');assert.equal(saved,1);assert.equal(closed,1);
 await submit('client-form',{id:'new-record',name:'Jordan Updated',email:'jordan@example.com',phone:'',address:''});
 assert.equal(M.db.clients.length,1);assert.equal(M.db.clients[0].name,'Jordan Updated');
 await submit('catalog-form',{id:'',name:'Consultation',type:'service',rate:'125',unit:'hour',category:'Consulting',description:'',sku:''});
 assert.equal(M.db.services[0].rate,125);assert.equal(saved,3);
});
