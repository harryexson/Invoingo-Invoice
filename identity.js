'use strict';
const crypto=require('node:crypto');
const permissions=['view','query','draft','send','automation','analytics','workspace','settings'];
function operatorIdentity(req,env=process.env){const token=env.INVOINGO_ADMIN_TOKEN||env.INVOIGO_ADMIN_TOKEN;if(!token||token.length<32)return null;const a=Buffer.from(req.headers.authorization||''),b=Buffer.from('Bearer '+token);if(a.length!==b.length||!crypto.timingSafeEqual(a,b))return null;return {userId:'operator',tenantId:env.INVOINGO_BUSINESS_ID||'local-business',permissions};}
module.exports={operatorIdentity,permissions};
