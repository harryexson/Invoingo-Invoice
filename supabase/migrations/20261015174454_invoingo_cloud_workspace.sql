-- One business workspace per authenticated owner. Browser clients may read their own
-- records; all financial writes go through authenticated Edge Functions.
create table public.invoingo_workspaces (
 owner_id uuid primary key references auth.users(id) on delete cascade,
 revision bigint not null default 1 check (revision > 0),
 data jsonb not null check (jsonb_typeof(data) = 'object'),
 updated_at timestamptz not null default now()
);
create table public.invoingo_accounts (
 owner_id uuid primary key references auth.users(id) on delete cascade,
 stripe_account text unique,
 created_at timestamptz not null default now()
);
create table public.invoingo_invoices (
 owner_id uuid not null references auth.users(id) on delete cascade,
 id text not null,
 token text not null unique,
 payload jsonb not null,
 stripe_account text not null,
 session_id text unique,
 checkout_url text,
 payment jsonb,
 collection_hold jsonb,
 email_id text,
 created_at timestamptz not null default now(),
 primary key (owner_id,id)
);
create table public.invoingo_records (
 owner_id uuid not null references auth.users(id) on delete cascade,
 kind text not null,
 id text not null,
 data jsonb not null,
 updated_at timestamptz not null default now(),
 primary key (owner_id,kind,id)
);
create table public.invoingo_events (
 id text primary key,
 owner_id uuid references auth.users(id) on delete cascade,
 type text not null,
 created_at timestamptz not null default now()
);
create table public.invoingo_mail (
 id text primary key,
 owner_id uuid not null references auth.users(id) on delete cascade,
 invoice_id text not null,
 recipient text not null,
 subject text not null,
 body text not null,
 document jsonb,
 status text not null default 'queued' check (status in ('queued','sending','accepted','failed','cancelled','needs-review')),
 first_attempt timestamptz,
 email_id text,
 delivery text,
 attempts integer not null default 0,
 error text,
 created_at timestamptz not null default now()
);
-- Explicit grants are required for newer Supabase Data API defaults.
alter table public.invoingo_workspaces enable row level security;
alter table public.invoingo_accounts enable row level security;
alter table public.invoingo_invoices enable row level security;
alter table public.invoingo_records enable row level security;
alter table public.invoingo_events enable row level security;
alter table public.invoingo_mail enable row level security;
revoke all on public.invoingo_workspaces,public.invoingo_accounts,public.invoingo_invoices,public.invoingo_records,public.invoingo_events,public.invoingo_mail from anon,authenticated;
grant select on public.invoingo_workspaces,public.invoingo_records to authenticated;
grant all on public.invoingo_workspaces,public.invoingo_accounts,public.invoingo_invoices,public.invoingo_records,public.invoingo_events,public.invoingo_mail to service_role;
create policy workspace_read_own on public.invoingo_workspaces for select to authenticated using ((select auth.uid())=owner_id);
create policy records_read_own on public.invoingo_records for select to authenticated using ((select auth.uid())=owner_id);
-- CAS prevents another device from silently overwriting a newer workspace.
create function public.invoingo_save_workspace(p_owner uuid,p_expected bigint,p_data jsonb)
returns bigint language plpgsql security invoker set search_path = '' as $$
declare current_revision bigint;
begin
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_owner::text,0));
 select revision into current_revision from public.invoingo_workspaces where owner_id=p_owner for update;
 if current_revision is null then
  if p_expected <> 0 then raise exception 'workspace_conflict' using errcode='40001'; end if;
  insert into public.invoingo_workspaces(owner_id,data) values(p_owner,p_data); return 1;
 end if;
 if current_revision <> p_expected then raise exception 'workspace_conflict' using errcode='40001'; end if;
 update public.invoingo_workspaces set data=p_data,revision=revision+1,updated_at=now() where owner_id=p_owner;
 return current_revision+1;
end $$;
revoke all on function public.invoingo_save_workspace(uuid,bigint,jsonb) from public,anon,authenticated;
grant execute on function public.invoingo_save_workspace(uuid,bigint,jsonb) to service_role;
-- Provider-verified payment + workspace + notification + receipt outbox in one transaction.
create function public.invoingo_apply_payment(p_event text,p_owner uuid,p_invoice text,p_account text,p_session text,p_payment jsonb)
returns boolean language plpgsql security invoker set search_path = '' as $$
declare inv public.invoingo_invoices; w public.invoingo_workspaces; doc jsonb; docs jsonb; address text; payment_amount text;
begin
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_owner::text,0));
 select * into inv from public.invoingo_invoices where owner_id=p_owner and id=p_invoice for update;
 if inv.id is null or inv.stripe_account <> p_account or inv.session_id <> p_session then raise exception 'payment_identity_mismatch'; end if;
 if inv.collection_hold is not null then return false; end if;
 insert into public.invoingo_events(id,owner_id,type) values(p_event,p_owner,'payment.verified') on conflict do nothing;
 if not found or inv.payment is not null then return false; end if;
 update public.invoingo_invoices set payment=p_payment where owner_id=p_owner and id=p_invoice;
 select * into w from public.invoingo_workspaces where owner_id=p_owner for update;
 select value into doc from jsonb_array_elements(w.data->'invoices') where value->>'id'=p_invoice;
 if doc is null then raise exception 'published_invoice_missing'; end if;
 doc=jsonb_set(doc,'{payments}',coalesce(doc->'payments','[]'::jsonb)||jsonb_build_array(p_payment));
 select jsonb_agg(case when value->>'id'=p_invoice then doc else value end) into docs from jsonb_array_elements(w.data->'invoices');
 update public.invoingo_workspaces set data=jsonb_set(data,'{invoices}',docs),revision=revision+1,updated_at=now() where owner_id=p_owner;
 insert into public.invoingo_records(owner_id,kind,id,data) values(p_owner,'notifications',p_event,jsonb_build_object('id',p_event,'type','payment','invoiceId',p_invoice,'number',inv.payload->'doc'->'number','amount',p_payment->'amount','currency',inv.payload->'business'->>'currency','date',now(),'read',false));
 if coalesce((inv.payload->'business'->>'autoReceipts')::boolean,true) then
  for address in select distinct x from unnest(array[case when coalesce((inv.payload->'business'->>'receiptCustomers')::boolean,true) then inv.payload->'client'->>'email' end,inv.payload->'business'->>'email']) x where x is not null and x like '%@%.%' loop
   insert into public.invoingo_mail(id,owner_id,invoice_id,recipient,subject,body) values('receipt:'||p_owner||':'||p_invoice||':'||(p_payment->>'id')||':'||address,p_owner,p_invoice,address,'Payment receipt · Invoice #'||(inv.payload->'doc'->>'number'),'Payment of '||(p_payment->>'amount')||' '||(inv.payload->'business'->>'currency')||' recorded on '||(p_payment->>'date')||' for invoice #'||(inv.payload->'doc'->>'number')||'. Thank you.') on conflict do nothing;
  end loop;
 end if;
 return true;
end $$;
revoke all on function public.invoingo_apply_payment(text,uuid,text,text,text,jsonb) from public,anon,authenticated;
grant execute on function public.invoingo_apply_payment(text,uuid,text,text,text,jsonb) to service_role;
-- Receipts and logos remain private; owner-prefixed paths prevent cross-user access.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('invoingo-documents','invoingo-documents',false,5242880,array['image/png','image/jpeg','image/webp','application/pdf']) on conflict(id) do nothing;
create policy invoingo_files_select on storage.objects for select to authenticated using(bucket_id='invoingo-documents' and (storage.foldername(name))[1]=(select auth.uid())::text);
create policy invoingo_files_insert on storage.objects for insert to authenticated with check(bucket_id='invoingo-documents' and (storage.foldername(name))[1]=(select auth.uid())::text);
create policy invoingo_files_update on storage.objects for update to authenticated using(bucket_id='invoingo-documents' and (storage.foldername(name))[1]=(select auth.uid())::text) with check(bucket_id='invoingo-documents' and (storage.foldername(name))[1]=(select auth.uid())::text);
create policy invoingo_files_delete on storage.objects for delete to authenticated using(bucket_id='invoingo-documents' and (storage.foldername(name))[1]=(select auth.uid())::text);

create index invoingo_mail_owner_status on public.invoingo_mail(owner_id,status);
create index invoingo_mail_email_id on public.invoingo_mail(email_id) where email_id is not null;
