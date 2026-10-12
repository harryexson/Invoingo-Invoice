# Invoingo

A responsive, local-first invoicing workspace. Run `npm start` and open http://127.0.0.1:4173. Run `npm install` once to install the Stripe and Resend SDKs.

## Implemented

- Client and reusable service creation, editing, and deletion.
- Multiple invoice drafts, editable line items, tax, discounts, due dates, notes, duplicate invoices, issuing, voiding, filtering, and search.
- Issued document snapshots preserve the original business/client details.
- Partial and full manual payment recording with balance and date validation.
- Estimates, recorded acceptance/decline, and one-time conversion to invoice drafts.
- Expenses with categories and optional image/PDF receipt attachments (1 MB each).
- Cash-basis monthly reports calculated from payments and expenses, plus CSV exports.
- Print layouts for browser Print / Save as PDF and mail-app email composition.
- Persistent browser storage, validated JSON backup/restore, and cross-tab conflict detection.
- Business profile, currency, tax, terms, payment instructions, and default note settings.

Records start empty. The original sample prototype and its independent draft storage are preserved at `/prototype.html`. Test data lives on a separate test origin, not the main workspace.

## Verification

`npm run check` checks JavaScript syntax. `npm test` runs business-rule tests for totals, rounding, invoice status, payment validation, and document validation.

## Scope and remaining integrations

This is a functioning single-browser local application, not a hosted multi-user service. Local storage is not encrypted, and clearing browser data removes records. Export backups regularly. No real card payments, automated messages, public payment links, authentication, subscriptions, background reminders, cross-device synchronization, OCR, or electronic signatures are connected. Those require backend infrastructure and provider configuration. Compose email creates a mail-app draft; issuing an invoice does not send it. A recorded payment documents money received elsewhere and never moves funds.

Invoice drafts are editable; issued invoices are immutable. Correct an unpaid issued invoice by voiding and duplicating it. Payment-entry corrections preserve the original entry and reason in the audit history. Actual refunds and credit notes remain future work. Currency changes are blocked once financial documents exist. The original DESIGN.md describes the earlier prototype and broader product ambitions.


## Mobile / Tap Pay

For an issued, unpaid invoice, select **Mobile / Tap Pay** and attach the matching Stripe hosted invoice URL (`https://invoice.stripe.com/i/...`). Verify the Stripe invoice's customer, currency, and outstanding amount before saving. A Pay invoice button is included in the invoice view/printout; composed invoice emails include the link. You can also copy the link or compose a text message. Customers pay on Stripe's hosted page with supported payment methods, including Apple Pay / Google Pay when available on their device and account.

This is a hosted-payment-link integration, not an automatic Stripe API integration. It does not create or validate Stripe invoices, synchronize balances, receive webhooks, or move money itself. Verify settlement in Stripe before recording payment here. After manual payments, corrections, or voiding, update the linked Stripe invoice too; removing a link locally does not revoke it. Duplicating an invoice clears the original payment link. Public NFC Tap to Pay acceptance is a different in-person integration and is not included.

Stripe reference: https://docs.stripe.com/invoicing/hosted-invoice-page

## Industries, products & services

Select your primary industry in **Settings** or browse **Products & services**. The catalog includes 45 industry choices covering trades, creative businesses, finance, property, hospitality, retail, professional services, and Other. You can also select additional industries and describe your business in your own words.

Each industry provides editable suggested billable items and categories with appropriate units. Choose which suggestions to add; imports preserve existing items and prices and skip duplicates. Suggested prices start blank so you can enter your own rates. Browse another industry to combine catalogs.

Create custom products or services with a category, description, SKU/item code, unit, and optional price. Search and filter the catalog by type and category, or export it as CSV. Both invoice and estimate editors have a shared picker for adding several products/services at once, plus a quick-add menu and custom line entry. Adjust quantities, prices, categories, and units in each document. Catalog changes do not alter previously saved document lines. Product information survives estimate conversion, duplication, printouts, backup, and restore.

Existing service records and workspace backups remain compatible. Inventory stock tracking is not included; product quantities here describe what is billed.

## Complete mobile preview and launch page

Run `npm run landing` and open http://127.0.0.1:4185/. The landing page links to the desktop workspace at `/app/` and the 23-screen iOS/Android studio at `/mobile.html`. Use All 23 screens for the live phone gallery. The default mobile demo uses fictional records in separate browser storage. Use my workspace opens your real local records.

See [FEATURE-COVERAGE.md](FEATURE-COVERAGE.md) for screenshot coverage and remaining platform work, and [INTEGRATIONS.md](INTEGRATIONS.md) for test-mode Stripe and Resend setup. Native app binaries, subscriptions, OCR and multi-device account sync are not released.

## Updated campaign & Expo Go preview

The landing at port 4185 includes a 20-second original motion film, generated editorial image, animated hero and live iOS/Android workflow screens. Run `npm run preview:phone` for same-Wi-Fi device access (stop the existing 4185 server first), then `npm run preview:expo` in another terminal. Open http://127.0.0.1:4185/expo.html to scan the Expo Go QR. See expo-preview/README.md for scope and device testing instructions.
