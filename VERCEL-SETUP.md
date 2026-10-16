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

## Published local-workspace preview — 2026-10-16

At the owner's request, deployment proceeded without Supabase. GitHub main includes commit 41a6be8. Vercel preview dpl_4J2LT8vtTdkuFd4YqyaZ6xPQX1v5 was inspected and reported Ready.

Website: https://invoingo-md00bajst-boldintelligentsolutions-9587-274be8fa.vercel.app/

Local mobile workspace: https://invoingo-md00bajst-boldintelligentsolutions-9587-274be8fa.vercel.app/mobile.html?mode=live#setup

The earlier first deployment was automatically assigned production by Vercel; no custom domain or DNS was changed. The newer deployment above is explicitly a preview. Git integration is not configured; the source was pushed to GitHub and the deployment submitted separately by CLI.

The static build exposes only the allowlisted public output. /api requests receive an explanatory unavailable response via the frontend until cloud services are connected. Local records, reports, manual payments and document sharing use browser storage; cloud identity, automated emails, checkout and live AI service calls are not operational on this deployment. Export backups before changing browsers or devices.

Mobile updates include compact business setup, logo upload, consistent navigation icons, clearer invoice parties and responsive typography. Fixed the client/catalog form id-name collision and added a regression test. Final full-browser walkthrough was blocked by the browser-control tool failing to initialize; do not treat unit checks as full browser or provider end-to-end verification.

Final checks: all 54 application tests passed; cloud migration isolation test passed; Expo TypeScript and lint checks passed. A local disk-full condition initially interrupted gateway tests. Removing only the generated dist/web output freed about 133 MiB, after which the full suite passed. The generated output was already deployed; no source or local financial data was removed. Local disk space remains low.
