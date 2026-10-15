'use strict';
// Isolated SDK contract checks: no credentials, store calls, or purchases leave this process.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const ts=require('../expo-preview/node_modules/typescript');
const source=fs.readFileSync(require.resolve('../expo-preview/billing.ts'),'utf8');
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
function native({enabled=true,expoGo=false,cancel=false}={}){
  const calls=[];
  const monthly={product:{identifier:'plus-month',priceString:'12,99 €'}},annual={product:{identifier:'plus-year',priceString:'129,99 €'}};
  const info={entitlements:{active:{plus:{}}},managementURL:'https://apps.apple.com/account/subscriptions'};
  const sdk={configure:()=>calls.push('configure'),getOfferings:async()=>({all:{plus:{monthly,annual},essentials:{monthly,annual}}}),getCustomerInfo:async()=>info,restorePurchases:async()=>{calls.push('restore');return info;},purchasePackage:async p=>{calls.push(p.product.identifier);if(cancel)throw {userCancelled:true};return {customerInfo:info};}};
  const module={exports:{}};
  const context={exports:module.exports,module,URL,process:{env:{EXPO_PUBLIC_BILLING_RELEASE_READY:String(enabled),EXPO_PUBLIC_REVENUECAT_IOS_KEY:'public-test-fixture'}},require:name=>{
    if(name==='expo-constants')return {__esModule:true,default:{executionEnvironment:expoGo?'storeClient':'standalone'},ExecutionEnvironment:{StoreClient:'storeClient'}};
    if(name==='react-native')return {Platform:{OS:'ios'},Linking:{openURL:async()=>calls.push('manage')}};
    if(name==='react-native-purchases')return {__esModule:true,default:sdk};
    throw Error('Unexpected dependency '+name);
  }};
  vm.runInNewContext(js,context);return {action:module.exports.subscriptionAction,calls};
}
(async()=>{
  let n=native({enabled:false});assert.equal((await n.action('purchase','Plus','annual')).ready,false);assert.deepEqual(n.calls,[]);
  n=native({expoGo:true});assert.match((await n.action('purchase','Plus')).message,/Expo Go/);assert.deepEqual(n.calls,[]);
  n=native();let result=await n.action('catalog');assert.equal(result.catalog.find(p=>p.plan==='plus'&&p.period==='annual').price,'129,99 €');
  result=await n.action('purchase','Plus','annual');assert.equal(result.activePlan,'plus');assert(n.calls.includes('plus-year'));assert(!n.calls.includes('plus-month'));
  n=native();await n.action('purchase','Premium','monthly');assert(!n.calls.some(c=>c.includes('month')||c.includes('year')));
  n=native({cancel:true});result=await n.action('purchase','Plus');assert.match(result.message,/cancelled/);assert.equal(result.activePlan,undefined);
  n=native();result=await n.action('restore');assert.equal(result.activePlan,'plus');assert(n.calls.includes('restore'));await n.action('manage');assert(n.calls.includes('manage'));
  const messages=[];const window={ReactNativeWebView:{postMessage:s=>messages.push(JSON.parse(s))}};vm.runInNewContext(fs.readFileSync(require.resolve('../subscriptions'),'utf8'),{window,URL});
  window.InvoingoSubscriptions.request('purchase','Plus','annual');assert.equal(messages[0].period,'annual');window.InvoingoSubscriptions.request('purchase','Premium','monthly');assert.equal(messages.length,1);
  console.log('Subscription checks passed: disabled billing, Expo Go, localized prices, annual purchase selection, reserved tier, cancellation, restore, management and bridge period.');
})().catch(e=>{console.error(e);process.exitCode=1;});
