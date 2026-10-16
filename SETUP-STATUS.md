# Invoingo integration setup

Intended sending domain: invoingo.com
Sender: Invoingo <invoices@invoingo.com>

## Verified on 2026-10-15

- The latest local Resend key authenticates to a team containing invoingo.com. Its three outbound DNS records are verified.
- A prior domain-create attempt reported invoingo.com belongs to a different Resend team. The owner chose to use that existing Invoingo team rather than transfer the domain.
- Stripe authenticates in test mode. Configured webhook secrets do not prove delivery.
- PUBLIC_BASE_URL is localhost; no public HTTPS backend is configured.

## Remaining steps

1. Resend team and invoingo.com sending DNS verification are complete. Keep the API key in the ignored root .env; never put it in frontend or Expo public variables.
2. Preserve the verified invoingo.com sending records and existing mailbox MX records. No additional email DNS changes are needed.
3. Verify outbound records, restart the app server, and confirm Connections reports invoingo.com ready.
4. Select and prepare backend hosting with persistent storage. The current local gateway uses one operator token and local files/SQLite; it is not ready for a public multi-user production launch.
5. Set PUBLIC_BASE_URL to the HTTPS backend origin. Configure /api/webhooks/stripe and /api/webhooks/resend there; signing secrets must match each provider endpoint and team.
6. Test a fictional invoice, Stripe test payment, receipt PDF, and signed delivery event with an explicitly chosen test recipient. Do not send real customer invoices for setup tests.

The receitra.com records previously created are unrelated to the intended app domain. Their removal remains a separate decision.

## Hosting and messaging choice

The owner selected IONOS hosting and phone messaging apps for invoice texts. The specific IONOS hosting product still needs inspection after login; do not assume domain registration or a site builder provides a persistent Node.js backend. No automatic SMS provider is required for this phase.
