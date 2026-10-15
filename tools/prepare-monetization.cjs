'use strict';
const fs=require('node:fs'),path=require('node:path');
const {plans,free}=require('../subscriptions');
const root=path.join(__dirname,'..','store-assets','subscriptions');fs.mkdirSync(root,{recursive:true});
const products=plans.flatMap(p=>['monthly','annual'].map(period=>({
  tier:p.id,displayName:`Invoingo ${p.name} ${period==='annual'?'Annual':'Monthly'}`,
  status:p.planned?'DRAFT_DO_NOT_ACTIVATE':'PREPARED_NOT_CREATED_IN_STORE',currency:'USD',price:p[period],period,
  apple:{productId:`com.receitra.invoingo.${p.id}.${period}`,group:'Invoingo Membership',duration:period==='annual'?'ONE_YEAR':'ONE_MONTH',type:'AUTO_RENEWABLE'},
  google:{productId:`invoingo_${p.id}`,basePlanId:period,billingPeriod:period==='annual'?'P1Y':'P1M',renewalType:'AUTO_RENEWING'},
  revenuecat:{offering:p.id,package:period==='annual'?'$rc_annual':'$rc_monthly',entitlements:p.id==='plus'?['essentials','plus']:p.id==='premium'?['essentials','plus','premium']:['essentials']},
  benefits:p.features
})));
const catalog={schemaVersion:1,reviewedOn:'2026-10-15',proposedBundleId:'com.receitra.invoingo',note:'Copyable configuration specification, not an Apple/Google API import payload. Products have not been created in developer accounts. Confirm app identifiers before creating permanent products.',free,products};
fs.writeFileSync(path.join(root,'product-catalog.json'),JSON.stringify(catalog,null,2)+'\n');
const fields=['tier','period','price_usd','apple_product_id','google_product_id','google_base_plan','revenuecat_offering','revenuecat_package','status'];
const csv=[fields.join(','),...products.map(p=>[p.tier,p.period,p.price,p.apple.productId,p.google.productId,p.google.basePlanId,p.revenuecat.offering,p.revenuecat.package,p.status].join(','))].join('\n');
fs.writeFileSync(path.join(root,'products.csv'),csv+'\n');
console.log(`Prepared ${products.length} product definitions: 4 launch and 2 reserved Premium drafts.`);
