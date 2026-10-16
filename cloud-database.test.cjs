const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {PGlite}=require('@electric-sql/pglite');

test('cloud migration isolates owners, rejects stale writes, and applies payments once',async()=>{
 const db=new PGlite();
 try{
 await db.exec(`create role anon;create role authenticated;create role service_role bypassrls;
 create schema auth;create table auth.users(id uuid primary key);
 create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
 grant usage on schema public,auth to authenticated,anon,service_role;grant execute on function auth.uid() to authenticated;
 create schema storage;create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
 create table storage.objects(id uuid,bucket_id text,name text);alter table storage.objects enable row level security;
 create function storage.foldername(text) returns text[] language sql as $$select string_to_array($1,'/')$$;`);
 await db.exec(fs.readFileSync('supabase/migrations/20261015174454_invoingo_cloud_workspace.sql','utf8'));
 const a='00000000-0000-4000-8000-000000000001',b='00000000-0000-4000-8000-000000000002';
 await db.query('insert into auth.users values ($1),($2)',[a,b]);
 await db.exec('set role service_role');
 const save=(owner,revision,data)=>db.query('select public.invoingo_save_workspace($1,$2,$3::jsonb) as revision',[owner,revision,JSON.stringify(data)]);
 const doc={id:'invoice-1',number:'1001',payments:[]};
 assert.equal((await save(a,0,{invoices:[doc]})).rows[0].revision,1);
 await save(b,0,{invoices:[]});
 await assert.rejects(save(a,0,{invoices:[]}),e=>e.code==='40001');
 await db.exec('reset role;set role authenticated');
 await db.query("select set_config('request.jwt.claim.sub',$1,false)",[a]);
 assert.equal((await db.query('select owner_id from public.invoingo_workspaces')).rows.length,1);
 assert.equal((await db.query('select owner_id from public.invoingo_workspaces')).rows[0].owner_id,a);
 await assert.rejects(db.query('select * from public.invoingo_accounts'),e=>e.code==='42501');
 await assert.rejects(save(a,1,{invoices:[]}),e=>e.code==='42501');
 await assert.rejects(db.query('update public.invoingo_workspaces set revision=99'),e=>e.code==='42501');
 await db.exec('reset role;set role service_role');
 const payload={doc,business:{currency:'USD',email:'owner@example.com'},client:{email:'client@example.com'}};
 await db.query('insert into public.invoingo_invoices(owner_id,id,token,payload,stripe_account,session_id) values($1,$2,$3,$4::jsonb,$5,$6)',[a,doc.id,'test-token',JSON.stringify(payload),'acct_test','cs_test']);
 const payment={id:'pi_test',amount:100,date:'2026-10-15',providerVerified:true};
 const apply=(account,event)=>db.query('select public.invoingo_apply_payment($1,$2,$3,$4,$5,$6::jsonb) as applied',[event,a,doc.id,account,'cs_test',JSON.stringify(payment)]);
 await assert.rejects(apply('acct_other','evt_bad'),/payment_identity_mismatch/);
 assert.equal((await apply('acct_test','evt_test')).rows[0].applied,true);
 assert.equal((await apply('acct_test','evt_test')).rows[0].applied,false);
 assert.equal((await apply('acct_test','evt_second')).rows[0].applied,false);
 const w=(await db.query('select data,revision from public.invoingo_workspaces where owner_id=$1',[a])).rows[0];
 assert.equal(w.revision,2);assert.equal(w.data.invoices[0].payments.length,1);
 assert.equal((await db.query('select * from public.invoingo_mail')).rows.length,2);
 assert.equal((await db.query('select * from public.invoingo_records')).rows.length,1);
 }finally{await db.close();}
});
