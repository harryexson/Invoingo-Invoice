'use strict';
// Only account identifiers and readiness flags are persisted. Stripe collects bank/KYC data.
function createConnect({stripe,store,persist,base,enabled}){
 const fail=message=>Object.assign(Error(message),{status:409});
 const configured=()=>{if(!enabled||!stripe)throw fail('Enable Stripe Connect test mode on the server first.');};
 async function status(){configured();if(!store.connectedAccount)return {connected:false,chargesEnabled:false,payoutsEnabled:false};const a=await stripe.accounts.retrieve(store.connectedAccount);return {connected:true,chargesEnabled:!!a.charges_enabled,payoutsEnabled:!!a.payouts_enabled,detailsSubmitted:!!a.details_submitted};}
 async function onboard(data){configured();if(Object.keys(data).some(k=>!['country','email'].includes(k)))throw fail('Bank and identity details must be entered directly on Stripe.');if(!/^[A-Z]{2}$/.test(data.country||''))throw fail('Choose your two-letter business country code.');if(data.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))throw fail('Enter a valid business email.');if(!store.connectedAccount){const a=await stripe.accounts.create({type:'standard',country:data.country,...(data.email?{email:data.email}:{})},{idempotencyKey:'invoingo-onboarding-'+store.connectIdentity});store.connectedAccount=a.id;persist();}const link=await stripe.accountLinks.create({account:store.connectedAccount,type:'account_onboarding',refresh_url:base+'/mobile.html?mode=live#payment-options',return_url:base+'/mobile.html?mode=live#payment-options'});return {url:link.url};}
 async function ready(){const s=await status();if(!s.chargesEnabled||!s.payoutsEnabled)throw fail('Complete Stripe business and payout verification before accepting invoice payments.');return store.connectedAccount;}
 return {status,onboard,ready};
}
module.exports={createConnect};
