# MioBot implementation and production readiness

## What works in this build

MioBot is part of desktop navigation and the shared iOS/Android mobile web experience. It has a collections snapshot, conversational invoice queries, structured invoice cards, context such as “them” and “first three,” editable reminder drafts, tone options, approval/send, conversation history, activity, in-app payment notifications, collection holds, and reviewable collection-rule drafts. The landing page introduces MioBot and links to both modes. Mobile typography uses a 15 px base, 16 px inputs, larger secondary text, balanced headings and a larger-text preference in Account & settings.

The isolated demo runs the same deterministic invoice calculations against explicitly fictional browser records. It never calls email, Stripe or OpenAI. The connected workspace requires the existing Invoingo operator token. Its protected API imports validated records into SQLite; client-supplied tenant IDs have no authority. This is not proof of a deployed multi-user production system.

## Architecture and files

Created: `miobot-core.js`, `miobot-store.js`, `miobot-server.js`, `miobot-ai.js`, `miobot-ui.js`, `miobot.css`, `identity.js`, three MioBot test files, `migrations/001-miobot.sql`, responsive QA page, audit/readiness documents and integration helper scripts.

Modified: `integrations.js`, `landing/serve.js`, `mobile.js`, `mobile.css`, `mobile.html`, `index.html`, `enhancements.js`, `landing/index.html`, `landing/campaign.css`, `expo-preview/App.tsx`, `package.json`, `.env` and `.env.example`. Existing secrets were preserved. Expo's WebView uses the same mobile page, and its preview-menu typography was enlarged. No native APIs were changed and native-store release is not claimed.

SQLite migration 1 runs automatically when the server starts. `.data/miobot.sqlite` stores a validated mirror of existing workspace IDs and tenant-scoped records for conversations, reminders, activity, preferences, jobs, watches and notifications. It adds no competing invoice numbering or customer IDs. All store calls use a server-resolved tenant. Optimistic workspace revisions reject stale POSTs. SQLite does not offer PostgreSQL RLS; isolation is implemented through scoped prepared queries and authorization tests.

## Required configuration

Reuse `INVOINGO_ADMIN_TOKEN`, Stripe/Resend test credentials, webhook secrets, `RESEND_FROM`, and `PUBLIC_BASE_URL`. `INVOINGO_BUSINESS_ID` optionally names the single configured business; default is `local-business`. Do not change it casually after storing records.

New placeholders:

```dotenv
OPENAI_API_KEY=
MIOBOT_AI_MODEL=
MIOBOT_AI_ENABLED=false
MIOBOT_TIMEZONE=America/New_York
```

Choose a Responses API model available to your OpenAI account, add the key server-side, and enable AI explicitly. Restart the server. The adapter sends the question and at most five previous user questions, not the invoice database, and requests one strict `searchInvoices` function call with `store:false`. Financial results are computed locally; no model-generated financial prose is used. Invalid tool arguments, invented numeric filters, provider failures and timeouts fall back to deterministic tools. No live OpenAI request has been verified without credentials. API design follows [OpenAI function calling](https://developers.openai.com/api/docs/guides/function-calling).

## API and tools

- `GET /api/miobot/state`: authorized collection metrics, history, rules, activity, notifications and workspace revision.
- `POST /api/miobot/workspace`: validated migration/sync of existing records.
- `POST /api/miobot/conversation`, `query`: persistent context and deterministic invoice tools.
- `POST /api/miobot/draft`, `edit`, `send`: current-fact drafting, editing and explicit approval.
- `POST /api/miobot/rules`, `run-rules`: configurable, idempotent draft jobs. No unattended email worker.
- `POST /api/miobot/notifications`: mark a tenant-owned event read.

`MioCore.facts`, `query`, `snapshot`, `reminder` and the provider bridge cover invoice/customer lookup, open/paid/overdue/partial filters, aging, thresholds, payment history, reminder history, balances, payment links and draft generation. The AI has one interpretation tool, `searchInvoices`; it cannot call `send`, execute SQL, modify payments or supply a tenant.

## Payments and reminders

Stripe's existing signature verification and session/currency/amount matching remain authoritative. Verified payment events import one payment, cancel unsent drafts and generate a deduplicated notification. Duplicate provider events do not double count. Browser polling imports verified payment/reversal facts into the app. Signed refund or dispute events place collection holds; a verified full refund reverses the matching payment. Partial refunds/disputes require operator reconciliation and remain held rather than being chased automatically.

Sending rechecks current provider status, recipient, balance, currency, due date and payment-link fingerprint. Paid/void/draft/held invoices cannot be chased. Resend accepts the reviewed plain-text reminder using a stable idempotency key. The log distinguishes accepted, delivered, opened, failed and paid. Open events are approximate; no claim that a person read a message is made. A retry whose outcome remains uncertain beyond the provider deduplication window is blocked for review. Provider setup is required: public HTTPS and a verified `RESEND_FROM` on receitra.com. No actual customer email was sent during testing.

## Permissions and audit

The identity adapter reuses existing Connections authentication; it does not add a MioBot login. Current operator role has all permissions. APIs individually enforce view/query/workspace/draft/send/automation permissions, and cross-tenant tests use distinct authenticated principals. Draft, edit, approval, send, failure, questions, rules and payment-related actions are timestamped. Hidden model reasoning is never stored. This legacy operator gateway still needs replacement by Invoingo account/session/RBAC before public multi-user production.

## Verification

Run `npm run check` and `npm test`. Tests cover calculation and query wording, context, permissions, tenant isolation, forged tenant IDs, conversation ownership, stale drafts, provider flags, idempotent sends, failure logging, payment notifications, refund holds, draft-rule cancellation and OpenAI tool constraints. The integration flow uses a real local HTTP API and cryptographically signed Stripe test events with injected provider responses: query → draft → edit → approve/send → webhook twice → one payment/notification → paid invoice excluded. Provider responses in tests are not proof of live email delivery or a real Stripe payment.

Validation: 42 automated tests passed; application syntax checks passed; Expo lint and TypeScript checks passed. Browser checks cover invoice cards, contextual reminders, review/edit controls, conversation persistence and actual 390/360 px viewports in the QA harness. The composer stays inside the screen and neither viewport overflows horizontally. The assistant itself is native DOM in Invoingo; the iframe QA harness is only a responsive test fixture.

## Remaining production work and deployment checklist

1. Integrate a real Invoingo account/session service, server-resolved tenant memberships and role management; replace the operator identity adapter. Complete browser authentication E2E with real permitted users.
2. Establish one authoritative server invoice service and multi-device editing policy. The current browser-to-server mirror is a compatibility bridge, not full cloud sync.
3. Verify receitra.com in Resend, configure public HTTPS and webhook URLs, then verify accepted/delivered/failure events and a real test payment end to end. Live Stripe payments remain disabled by the existing gateway.
4. Add and verify OpenAI credentials/model, spend limits, consent/retention policy, and production language evals. The built-in parser intentionally handles a bounded set of invoice questions.
5. Operate a job scheduler, queues, backoff, distributed locks and monitoring before unattended collections. Current collection rules create drafts only and run on demand.
6. Finish provider refund/partial-refund/dispute reconciliation UI and expired checkout renewal. Held collection records currently require operator review.
7. Add native push/device delivery and optional business email/SMS notifications only when their infrastructure exists. Current payment notifications are in-app with 15-second foreground polling, not instant push.
8. Define data retention/export/deletion, encrypted backups, database recovery, secrets management, rate limiting at the edge and secure production headers. Node's built-in SQLite is experimental in the installed Node 24 runtime; choose and validate a supported production database/driver before scale-out.
9. Add accessible keyboard/browser/device E2E to CI and test signed native iOS/Android builds. The Expo preview currently shares a WebView.

The full master prompt's production definition of done is not yet met: no deployed multi-user auth, live delivery verification, native push or unattended worker is claimed. The local integrated feature and its protected API are reviewable now.
