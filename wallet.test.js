const {test}=require('node:test');
const assert=require('node:assert/strict');
const Wallet=require('./wallet');
test('accept invoice-specific HTTPS Stripe links',()=>{
 assert.equal(Wallet.url(' https://invoice.stripe.com/i/acct_abc123/test_example?s=em '),'https://invoice.stripe.com/i/acct_abc123/test_example?s=em');
});
test('reject executable, lookalike, generic payment, and credential-bearing URLs',()=>{
 for(const link of ['javascript:alert(1)','https://invoice.stripe.com.evil.test/i/acct_a/test_b','http://invoice.stripe.com/i/acct_a/test_b','https://buy.stripe.com/example','https://invoice.stripe.com/','https://user:pass@invoice.stripe.com/i/acct_a/test_b','https://invoice.stripe.com:8443/i/acct_a/test_b'])assert.throws(()=>Wallet.url(link));
});
