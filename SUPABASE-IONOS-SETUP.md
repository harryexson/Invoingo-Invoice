# Invoingo hosting preparation

Status: backend draft prepared locally; not deployed or connected to the app UI.

## Intended architecture

- IONOS: HTTPS website and mobile web preview at invoingo.com.
- Supabase: authenticated users, private workspace data, private document storage, and backend Edge Functions.
- Stripe Connect: hosted bank onboarding and customer checkout. Bank details go directly to Stripe.
- Resend: invoice emails, reminders, and receipts from invoices@invoingo.com.

The existing Node gateway remains the local development backend. Do not expose its single-operator authentication as a public multi-user service.

## Information needed before deployment

1. Confirm the Invoingo Supabase project URL/reference. Configure its publishable key locally; keep its secret/service role key server-side only.
2. Identify or create the dedicated Invoingo IONOS builder project. The unrelated “Continuing MioBOT GitHub Project” must not be edited or published for Invoingo.
3. Verify that the builder supports importing/deploying the existing code. Included hosting does not itself establish that compatibility. Do not change website DNS until an actual deployment is ready.

## Prepared files and validation

`supabase/migrations/20261015174454_invoingo_cloud_workspace.sql` defines owner-isolated workspaces, provider-owned payment records, receipt jobs, and private storage policies. Workspace saves use revision checks; verified payment application updates the invoice, workspace, notification and receipt jobs atomically.

`supabase/functions/invoingo/index.ts` is an unfinished Edge Function draft. It is not a deployed production backend. Its public webhook routes verify provider signatures; user routes validate Supabase authentication. `verify_jwt=false` supports these mixed routes, so application-level authentication must remain in place and receive endpoint tests before deployment.

`npm run test:cloud` applies the migration to embedded PostgreSQL with stand-in Auth/Storage schemas and checks owner isolation, denied direct writes, stale-save rejection, payment account matching and duplicate event handling. This does not replace testing against the real Supabase project or testing Edge Function HTTP endpoints.

`npm run build:cloud-runtime` regenerates the shared business logic bundle after changes to its source modules.

## Outstanding work

- Connect frontend Supabase authentication, per-user caches and cloud synchronization.
- Complete and test Edge Function request validation, retry processing, refund reconciliation, AI interpretation and Unicode PDF output.
- Configure Supabase Auth email/redirect settings and deployed provider secrets.
- Apply migrations and inspect real RLS/security advisors on the confirmed project.
- Deploy the frontend into the confirmed IONOS project, connect invoingo.com and verify HTTPS.
- Register the deployed Edge Function webhook URLs with Stripe and Resend; test signed events and delivery.
- Verify complete signup, onboarding, invoice, checkout, receipt and reminder flows in Stripe test mode before enabling live payments.

Never copy the root .env, service keys or backend source secrets into a website upload. Public frontend configuration may contain only the Supabase project URL and publishable key.
