/* Hosted invoice links keep payment credentials and wallet authorization at Stripe. */
(function(root){
 function url(value){
  if(typeof value!=='string'||value.length>2048)throw Error('Paste a Stripe hosted invoice URL.');
  let u;try{u=new URL(value.trim());}catch{throw Error('Enter a valid HTTPS invoice URL.');}
  if(u.protocol!=='https:'||u.hostname!=='invoice.stripe.com'||u.port||u.username||u.password||!/^\/i\/acct_[A-Za-z0-9]+\/[A-Za-z0-9_-]+$/.test(u.pathname))throw Error('Use the hosted invoice link from Stripe, starting with https://invoice.stripe.com/i/.');
  u.hash='';return u.href;
 }
 const api={url};if(typeof module!=='undefined')module.exports=api;else root.Wallet=api;
})(typeof window!=='undefined'?window:globalThis);
