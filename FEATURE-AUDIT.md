# Invoingo feature and production-readiness audit

Audit date: 2026-10-17. **Not yet ready for a public, multi-user production launch.** The website can host a working device-local workspace. A connected production backend, store setup and real-device/provider acceptance tests are still required.

## Reference and limits

Compared with QuickSend/Qbot at https://quicksend-prototype.jasonlee-brands.workers.dev/#BusinessSetup: the previously inspected BusinessSetup and InvoiceEditor screens, its complete 27-destination sidebar, and the owner's screenshots describing the invoice, collections and Qbot flows. The reference identifies itself as a clickable prototype; its appearance does not prove real payments, delivery or store purchases.

The live reference could not be reopened by web retrieval during this audit. Browser automation also remains unavailable because its local tool cannot initialize. Source inspection, component rendering in a minimal DOM harness, unit tests and mocked provider integration tests are the evidence below. They are not real-device visual/permission or live-provider end-to-end tests.

## Screen-by-screen inventory

“Local” means actual records persist in this browser/device. It does not mean cloud sync or a production account. The mobile navigation has all 27 equivalent destinations.

| QuickSend/Qbot destination | Invoingo route | Functional status |
| --- | --- | --- |
| Welcome | welcome | Local onboarding entry and separate sample-business mode |
| Business setup | setup | Local logo, owner/business details, global currency selection and primary industry |
| Invoices | home | Actual saved records, search, outstanding/overdue totals and status filters |
| Activity | activity | Actual local actions; provider delivery/open events need connected webhooks |
| Invoice editor | editor | Client, dates, multiple products/services, tax, discount, notes, typed signature and one photo |
| Add item | additem | Saved catalog items and custom priced lines; full screen rather than a sliding sheet |
| Bill to | billto | Existing/new clients; device Contact Picker only where supported |
| Preview & templates | preview | Document preview, three templates, colors and browser print/save PDF |
| Send | send | Native/browser share and external email/text/WhatsApp drafts; hosted email/payment links blocked on static deployment |
| Invoice tracking | tracking | Local timeline and manual payment balance; live delivery/open/payment verification needs the backend |
| Client pay page | pay | UI exists; real customer checkout is NOT operational on static deployment |
| Record payment | payment | Validated actual manual payments; recording does not charge a card |
| Paid | paid | Shows completed actual local invoices; no invented payment success |
| Payment options | payment-options | Local terms/tax/instructions; Stripe-hosted bank onboarding exists in local test gateway, not static deployment |
| Plans | plans | Proposed pricing, selection and monthly/yearly view; real store purchase/restore not configured |
| Estimates | estimates | Multi-line local editor, saved products/services, preview/share, status records and one-time conversion to invoice |
| Clients | clients | Actual create/edit/search; fixed named-id form save bug |
| Items | items | Actual products/services, prices/SKUs, multiple industry catalog imports and custom entries |
| Reports | reports | Custom date range, presets, cash-basis totals, currency separation and CSV |
| Expenses | expenses | Actual manual entries and receipt-image capture/upload; OCR NOT implemented |
| Account/settings | settings | Local business preferences and backup/export/confirmed restore; cloud account lifecycle absent |
| Qbot chat | miobot | MioBot reads actual local invoices, proposes invoice drafts and prepares reviewable reminder/update drafts |
| Qbot voice | miobot-voice | Visible chat microphone and voice screen; browser speech recognition with editable transcript; keyboard dictation fallback |
| Qbot in-app nudge | miobot-nudges | Local invoice/payment/estimate prompts based on records and preferences |
| Qbot lock-screen alerts | miobot-alerts | Foreground browser permission/preview only; NOT background APNs/FCM push |
| Qbot settings | miobot-settings | Actual saved local voice/nudge preferences; background automation is not enabled |
| Additional connections | integrations | Explicit static-hosting limitations; server operator/provider setup is for the local test gateway |

## Fixes made during this work

- Compact business setup, logo upload tile, readable typography, consistent outline navigation and clearer invoice parties while retaining Invoingo colors.
- Client/catalog forms use the form's DOM attribute rather than an input named `id` masking the form identity.
- Visible microphone beside chat input, listening/cancel state, transcript review and permission/network/unsupported-browser handling. Audio is not stored by Invoingo; browser speech services may process it.
- Actual local MioBot conversations, status queries, invoice creation and reminder drafts work on Vercel without pretending a backend exists. Voice is not needed for typed queries.
- “Send reminders to customers for overdue invoices” and follow-ups for unpaid invoices produce eligible drafts; they never silently send email.
- Local reminder composition rechecks balances, recipient and refund/dispute holds, then opens the user's email app after review. Delivery remains unconfirmed.
- Mobile estimates now support multiple custom/catalog lines, editing, sharing and conversion. Mobile backup restore requires an explicit replacement confirmation.
- Provider payment dates use the same configured business timezone as MioBot. This fixes rejection of a verified payment after UTC midnight but before local midnight.
- Vercel asset aliases avoid making three copies of the media library in the local static build, reducing disk pressure.

## Remaining functional gaps

| Gap | What is needed |
| --- | --- |
| Cloud accounts, password recovery, shared data, authorization | Confirm the Invoingo Supabase project, deploy/review schema and functions, connect frontend Auth and synchronization, verify RLS against the real project |
| Automated Resend email/receipts | Deploy authenticated backend and retry worker; configure provider secrets/webhooks; test with an explicitly chosen test recipient. DNS verification alone is insufficient |
| Stripe payment links, bank onboarding and verified receipts | Deploy tenant-bound Connect endpoints and signed webhook receiver. Test onboarding, successful/failed/async payments, refunds/disputes and receipt delivery before live keys |
| Live OpenAI interpretation/transcription | Keys remain server-side; current static MioBot uses deterministic invoice logic. OpenAI backend interpretation exists locally but is not deployed for users |
| Native microphone coverage | Test supported browsers on real iOS/Android. Embedded WebViews may not expose SpeechRecognition; keyboard dictation is the current fallback. A native speech integration/dev build is still needed for guaranteed in-app native recognition |
| Store subscriptions | Create real Apple/Google products/listings, configure RevenueCat entitlements and verification, signed builds, purchase/restore/cancellation tests and server-side plan enforcement. Proposed web prices are not active subscriptions |
| Background notifications/reminders | APNs/FCM registration, consent, scheduling, delivery and app-state tests. Foreground prompts are not background push |
| Receipt scanning | OCR extraction/confirmation workflow; current receipt capture is an image plus manual entry |
| Signature/photos parity | Current signature is typed, not a drawn or verified e-signature; one photo is supported rather than a multi-photo workflow |
| Estimate acceptance | Status can be manually recorded; no authenticated customer acceptance portal or digital signature workflow |
| PDF/email parity | Web sharing supplies document text or browser print/save PDF. Native wrapper can create/share a PDF. External browser email drafts do not automatically attach a PDF |
| Account portability/deletion | Cloud data export/deletion, retention policy and cross-device restore/sync acceptance tests |
| Security/operations | Replace single-operator local auth for public users; secret management, rate limits, backups/recovery, monitoring, privacy/terms and production access review |
| Full acceptance testing | Browser/real-device navigation, layout, accessibility, permissions, external app handoff and real test-provider flows remain unverified |

## Automated evidence

- `screen-audit.test.js`: all 27 equivalent navigation destinations render with populated records in a component harness; multi-item mobile estimate save/conversion and confirmed backup restore exercise actual event handlers.
- `miobot-local.test.js`: open/unpaid/overdue queries, draft generation, no silent send, review requirement, stale-balance/collection-hold rejection, persistent conversation and idempotent invoice creation.
- `miobot-voice.test.js`: recognition lifecycle, transcript review, cancellation/late-event protection, denied permission and unsupported/HTTP fallback with a simulated recognition service.
- Existing domain/catalog/report/receipt/MioBot/provider tests cover validation, currencies, payment matching, signed events and repeat-operation protection with fake providers.
- The separate cloud migration test uses embedded PostgreSQL to check isolation, stale writes and duplicate verified payments. It does not certify the undeployed Supabase backend.

## Release decision

Suitable for testing device-local workflows and MioBot draft preparation after the new preview is deployed. **Do not market or release it as a fully connected production invoicing platform yet.** The immediate deployment dependency remains the correct Supabase project, followed by cloud integration and acceptance tests above. Keep real bank/identity details on Stripe's hosted onboarding; do not place provider keys or sensitive bank details in browser notes or frontend settings.
