# MioBot audit and implementation map

## Existing platform (verified from source)

Invoingo uses vanilla JavaScript, HTML and CSS. Desktop routes use hash navigation in `app.js`; the mobile studio uses `M.screens` and hash routes in `mobile.js`. Expo currently wraps the shared mobile web preview. Both clients use the same browser workspace key. `domain.js` calculates totals, balances, payment corrections and statuses. Clients, invoices, estimates, expenses and catalog items are browser records, validated by `Business.validateBackup`.

Authentication is a tab-scoped operator bearer token entered in Connections. There is no user-account service, RBAC or tenant database. The existing Node gateway restricts Stripe to test mode and persists published invoices and provider events in `.data/integrations.json`. Stripe and Resend signatures are verified. Publishing is immutable; Resend invoice sending and Stripe Checkout use idempotency keys. There is no worker, native push, inbound customer email, recurring-invoice service or AI provider. Existing tests use Node's test runner.

## Implementation map

- Reuse invoice/customer IDs, domain calculations, provider SDKs, operator access, local fonts and forest/lime tokens.
- Add `miobot-core.js`: deterministic query tools, conversational references, aging and safe reminder templates. Usable offline in the isolated demo; production financial facts remain server-query results.
- Add SQLite persistence under `.data`: tenant-scoped workspace migration, conversations, drafts, audited actions, preferences and notification events. A server-resolved principal selects the business; client tenant claims have no authority.
- Add an authenticated `/api/miobot/*` gateway and a shared identity adapter for the current operator. The adapter is replaceable by the future Invoingo account system. No separate MioBot login.
- Mirror validated local workspace records into the server using optimistic revisions. Published payments are reconciled from the provider store. Provider events update MioBot notifications and cancel queued collection drafts.
- Add native desktop/mobile chat, structured cards, editable reminder review, collection snapshot/history/activity and persistent launcher. Use a compact design inspired by the supplied screenshot, with Invoingo branding.
- Increase mobile body, controls and secondary text; keep invoice previews distinct from interactive text. Add a comfortable/larger text preference.

## Production boundaries

The existing gateway is single-business and test-mode only. This implementation must not claim a multi-user production launch until Invoingo has an account/session service, production provider credentials, a verified sending domain, public HTTPS, and an operated job worker. Database queries are tenant-scoped and tested with distinct server principals; this does not manufacture an existing multi-user sign-in system. Optional automation starts with reviewable draft jobs; unattended customer sending requires explicit configuration and a deployed worker. No live emails or payments will be performed as part of development testing.
