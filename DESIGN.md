# Invoingo — mobile product design

## Reference lock
Design for independent businesses on iOS and Android. Make the journey from work completed to money received legible, quick, and reassuring.

Primary visual source: https://styles.refero.design/style/367c0c6e-73a7-441c-a8ff-91d139ac60dc
Preserve forest #163300, white canvas, fog #e8ebe6, lime #9fe870, flat surfaces, pill actions, 10px cards, heavy tightly tracked display type. The reference contradicts itself about lime: follow its explicit component guidelines, using lime for primary actions and active states. Inter is the UI font. Wise Sans is specified for display, with the reference's Inter Black fallback; no Wise Sans font binary or license was supplied. The prototype uses the fallback until a licensed font is available.

| Decision | Source | Reason |
|---|---|---|
| Forest balance surface, lime action | Wise reference | A recognizable financial hierarchy |
| Home, invoices, clients, more navigation | User brief and feature inventory | Keep frequent tasks one tap away |
| Compose → review → share → checkout | User's payment requirement | Connect merchant and recipient experiences |
| Invoice timeline | Invoice Simple read receipts | Show whether an invoice needs attention |
| Guest checkout | Invoingo design extension | Recipient need not install an app to pay |
| Native platform adaptation | Android/iOS requirement | Respect safe areas, system sharing, wallets, back behavior |

## Feature coverage and delivery status
Sources reviewed October 4, 2026:
- https://apps.apple.com/us/app/invoice-maker-invoice-simple/id694831622
- https://www.invoicesimple.com/
- https://www.invoicesimple.com/pricing-packages/premium/
- https://help.invoicesimple.com/en/collections/10864996-advanced-features

Publicly documented baseline: invoices, quotes, receipts; logo and company information; saved customers and products; contact import; tax and discounts; photos and signatures; PDF and messaging distribution; online and offline payment recording; QR payments; read and payment notifications; reminders; expenses and reporting. Public pages are not a complete audit of every signed-in feature or regional plan.

| Capability | Designed location | Prototype / production boundary |
|---|---|---|
| Invoice editing, quantities, rates, tax, discounts, due date, notes | Invoice editor | Interactive calculations, validation, local draft save |
| Document preview and PDF/print | Review | Browser print with invoice-only stylesheet; native PDF generation needed |
| Text, email, shareable link | Share sheet | Channel preview and local demonstration link; production delivery needed |
| Pay from text link or app | Recipient checkout | Simulated wallet/card/bank choices and receipt; no funds move |
| Invoice list, filters, status, activity | Home / Invoices | Interactive demo data, draft and payment state |
| Estimates and conversion | More / Estimates | Interactive example conversion |
| Customer directory and reusable items | Clients / More | Sample directory and item library; editing designed for production |
| Expense capture, categories, attachments | More / Expenses | Sample expense list; camera, OCR, upload integration needed |
| Revenue and expense reporting, export | More / Reports | Sample report and CSV export |
| Branding, logo, banking details, document templates | More / Business settings | Design specification; persistent account settings needed |
| Photos, owner signature, customer approval | Editor / estimate approval | Attachment and signature integration specified |
| Deposits, partial payment, scheduled payment | Payment options | Production implementation specified |
| Reminders, push/email alerts, read receipts | Invoice timeline / settings | Demo timeline; background delivery needed |
| QR, WhatsApp, contact import | Share / customer picker | Native/system integrations needed |
| Cash/check recording and receipt | Invoice actions | Production workflow specified |
| Subscription entitlements and support | More / Settings | Production screens and billing needed |
| Cross-device sync, offline drafts, authentication | Application shell | Local prototype only; service layer needed |

## Native interaction specification
iOS: safe-area layout, minimum 44pt controls, SF Symbols in production, native share sheet, contact/photo permission at point of use, Apple Pay when supported. Android: minimum 48dp targets, system back including predictive back, Android Sharesheet, photo picker, Google Pay when supported. Shared content hierarchy and Inter typography; platform-native keyboard, dialogs, pickers, wallet sheets, and accessibility semantics. The prototype's platform selector demonstrates system chrome and wallet naming, not native binaries.

States required for implementation: empty, loading, offline, sync conflict, save failure, invalid form, delivery pending/failed, viewed, overdue, partial, paid, void, expired payment link, payment pending/declined, refund, receipt resend. Preserve edits on recoverable failures; announce errors inline and focus first invalid field. Never mark an invoice paid from a client-side redirect.

## Payment and messaging handoff
Create immutable invoice revisions and scoped, opaque payment tokens server-side. SMS contains merchant name, invoice number, total, due date, and HTTPS checkout URL. Link opens the installed app via universal/app links or a guest web checkout. Text-to-pay here means paying through the secure link received by SMS; it does not mean sending card data in a text message. Card data stays within the payment provider's hosted fields. Select provider and supported markets before implementation. Server-verified idempotent webhooks update the ledger and issue receipts. Support bank settlement pending, duplicate taps, expired links, partial payments, refunds and payment failure. Merchant onboarding, processor fees and settlement timing must reflect the actual provider; no invented guarantees.

Email/SMS delivery uses queued jobs, provider callbacks and retry logic. Obtain channel preferences and record consent where required. Never equate a composed message with confirmed delivery. Production services: authentication, encrypted database, object storage, PDF renderer, payment provider, transactional email, SMS provider, notification service, analytics and audit log.

## Scope
This deliverable is a responsive interactive design prototype and feature handoff, not an App Store/Play Store release or a claim of implemented parity. Demo controls send no external messages and process no real payments. Full parity requires authenticated competitor review plus implementation and validation of the service and native integrations above.
