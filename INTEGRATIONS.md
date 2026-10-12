# Stripe and Resend setup

The integration is implemented but accounts, provider credentials and a verified sender are not configured. Stripe live keys and live webhook events are deliberately rejected. Resend has no equivalent payment-style test mode: pressing Send email in your real workspace sends a real email after configuration. Demo mode never calls a provider.

1. Install dependencies with `npm install` and start one server with `npm run landing` (port 4185). The desktop workspace is `/app/`, mobile studio is `/mobile.html`, and landing page is `/`.
2. Copy `.env.example` to `.env`. Add your Stripe **test** secret, webhook signing secret, Resend API key, verified sending address, and Resend webhook secret. Keep this file private; Git ignores it.
3. Set `INVOINGO_ADMIN_TOKEN` to a random value at least 32 characters long. Enter only this operator token in Connections. API keys stay on the server. Tokens are kept in the current browser tab's session storage.
4. Restart the server. Use the Connections screen to check configuration.
5. Create and issue a test invoice in your workspace. Choose Create Stripe test checkout. The server calculates and freezes the published amount. Repeated clicks reuse the same checkout instead of creating duplicate charges.
6. For Stripe CLI forwarding, use `stripe listen --forward-to localhost:4185/api/webhooks/stripe`, then configure the signing secret it returns. Listen for `checkout.session.completed` and `checkout.session.async_payment_succeeded`.
7. Resend webhooks go to `/api/webhooks/resend` on your public HTTPS deployment. Enable sent/delivered/opened/bounced/failed events and configure the signing secret. Set `PUBLIC_BASE_URL` to the same deployment before sending emails. Localhost links cannot be emailed to clients by this build.
8. After a Stripe test payment, use Refresh provider status. Only a signed webhook or authenticated Stripe retrieval can produce a verified payment. A checkout return URL never marks an invoice paid. Browser imports are deduplicated by provider payment ID.

Published invoice records, payment references and email events are stored in `.data/integrations.json`, outside the static file allowlist. Back this up separately from browser data. Run only one server against this file at a time. A published invoice is immutable; do not manually record additional payments or void it while its Stripe checkout remains payable. Close the checkout in Stripe first. The current gateway does not implement cancellation/refunds, automatic reminders, multi-tenant accounts, subscriptions, or distributed storage. Add those before a public production launch.

`npm start` uses the same code with the desktop workspace at port 4173 and the landing page at `/landing/`. Set `PUBLIC_BASE_URL` to your chosen server's origin. Different ports have separate browser storage; existing records on 4173 are not lost or automatically copied to 4185.

Provider references: [Stripe Checkout](https://docs.stripe.com/api/checkout/sessions/create), [Stripe webhook verification](https://docs.stripe.com/webhooks/signature), [Resend email API](https://resend.com/docs/api-reference/emails/send-email), [Resend webhook verification](https://resend.com/docs/webhooks/verify-webhooks-requests).

Provider setup can be inspected without printing secret values using `npm run check:connections`. This performs read-only Stripe test-account and Resend domain checks; it sends no emails and creates no payments. Startup scripts use Node’s system CA trust store while keeping TLS certificate verification enabled. Configuration status indicates saved settings; verified webhook delivery still requires an actual signed event.
