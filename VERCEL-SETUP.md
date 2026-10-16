# Invoingo on Vercel

Hosting preference updated 2026-10-15: Vercel replaces IONOS as the intended website/app hosting provider. IONOS remains the domain/DNS provider for invoingo.com. Do not alter existing verified Resend or mailbox records.

## Account discovery

Vercel CLI authentication works using Windows system certificate trust (`NODE_USE_SYSTEM_CA=1`). The workspace is now linked to the dedicated `invoingo` Vercel project.

Available teams:

- `boldintelligentsolutions-9587-274be8fa`: existing Pro plan; recommended for commercial Invoingo hosting.
- `boldintelligentsolutions-9587`: Hobby plan, restricted to personal/noncommercial use.

The owner selected the existing Pro team. Created and linked project `invoingo` in `boldintelligentsolutions-9587-274be8fa`. Dashboard: https://vercel.com/boldintelligentsolutions-9587-274be8fa/invoingo . The CLI generated ignored local project configuration and an ignored .env.local authentication file. No plan, deployment, production domain, DNS record or other project was changed. Git integration is not yet configured.

## Deployment architecture

- Vercel: landing page, desktop web app, mobile web preview and customer payment pages.
- Supabase: Auth, PostgreSQL, private files and backend Edge Functions, as currently being prepared.
- Stripe Connect: hosted banking onboarding, checkout and verified payment events.
- Resend: invoice emails, reminders, receipts and delivery events.
- Apple/Google: native app distribution. Vercel serves the web experience and does not replace app-store submission or native builds.

The existing Node server uses a single operator token and local persistent files. Do not deploy it unchanged as a public Vercel backend. Complete per-user Supabase authentication, cloud synchronization and endpoint tests first. Vercel server filesystem writes are not a durable database.

## Next steps

1. Vercel team confirmed and dedicated project linked. Identify the Invoingo Supabase project.
2. Inspect existing Vercel projects/Git integration in that team to reuse the correct Invoingo project where available.
3. Complete cloud authentication and persistence, then create a public-file allowlist build. Never publish the repository root, .env files, local databases or server credentials as static assets.
4. Link the confirmed Vercel project to `harryexson/Invoingo-Invoice` and prepare a preview deployment. Avoid triggering the main production branch during preview preparation.
5. Configure Supabase Auth redirects/CORS for the actual preview and production origins. Keep provider keys and service role keys in backend secrets, not frontend configuration.
6. Test signup, invoice creation, Stripe test checkout, webhook verification, receipts, sharing and MioBot approvals on the preview.
7. Add invoingo.com to the confirmed Vercel project, use the DNS records Vercel actually supplies, and verify HTTPS before switching public payment links. Preserve IONOS MX and Resend TXT/MX records.

The earlier SUPABASE-IONOS-SETUP.md describes backend preparation history; its IONOS deployment steps are superseded by this file. The Supabase migration and Edge Function draft remain undeployed and unfinished.

References: https://vercel.com/docs/plans/hobby and https://vercel.com/kb/guide/how-can-i-use-files-in-serverless-functions
