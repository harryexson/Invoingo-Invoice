# Invoingo subscriptions and store launch

Prepared October 15, 2026. These are proposed US launch prices, not active subscriptions.

| Plan | Monthly | Annual (billed upfront) | Planned positioning |
| --- | ---: | ---: | --- |
| Free | $0 | $0 | 3 invoices/month; establish the invoicing habit |
| Essentials | $7.99 | $79.99 | 20 invoices/month, estimates, clients, industry catalogs, sharing and payment tracking |
| Plus | $12.99 | $129.99 | Unlimited invoices/estimates, expenses, reporting, MioBot queries and reviewable reminder drafts |
| Premium (reserved) | $19.99 | $199.99 | Future expanded AI allowance and advanced collection workflows; do not activate yet |

Annual savings are approximately 16.6% versus twelve monthly charges. No introductory trial is promised; the proposed free plan is the acquisition path. Stripe invoice payment fees are separate from the owner's app subscription. Do not sell the app's digital subscriptions using the invoice-payment Stripe integration.

## Competitive basis

Checked against primary public pricing pages on October 15, 2026:

- [Invoice Simple](https://www.invoicesimple.com/pricing-packages/): $6.99/month or $69.99/year for 3 invoices/month; $14.99 or $149.99 for 10; $21.99 or $219.99 for unlimited. These are published USD prices; an individual app-store storefront may differ.
- [invoicely](https://invoicely.com/pricing): published monthly Basic $9.99 and Professional $19.99. Compare feature limits before making an equivalent-plan claim.
- [Zoho Invoice](https://www.zoho.com/us/invoice/pricing/): a free alternative. Compete on a focused mobile workflow and useful assistant features rather than claiming to be the lowest-cost option.

Essentials costs $1 more than Invoice Simple's entry plan but proposes 20 versus 3 invoices. Plus costs about 13% less than its $14.99 tier and proposes unlimited invoices. Premium is about 9% below its $21.99 tier but should launch only with a defensible feature difference. These are positioning hypotheses, not measured willingness-to-pay research. Review activation, free-to-paid conversion, annual uptake, cancellations and AI cost after launch before changing prices.

At an illustrative 15% commission, $12.99 yields about $11.04 before taxes, refunds, hosting, email and AI; at 30%, about $9.09. These are cost scenarios, not an assertion of eligibility for any store commission program. Give AI usage an explicit measured allowance before offering a higher tier; do not promise unlimited AI.

## Product definitions

`store-assets/subscriptions/product-catalog.json` and `products.csv` contain six copyable definitions. They are specifications, not automatic store import files. The proposed bundle/package ID is `com.receitra.invoingo`; confirm availability and ownership before registering it. Apple product IDs are permanent after creation.

Apple product IDs:

| Tier | Monthly | Annual |
| --- | --- | --- |
| Essentials | `com.receitra.invoingo.essentials.monthly` | `com.receitra.invoingo.essentials.annual` |
| Plus | `com.receitra.invoingo.plus.monthly` | `com.receitra.invoingo.plus.annual` |
| Premium (draft) | `com.receitra.invoingo.premium.monthly` | `com.receitra.invoingo.premium.annual` |

Google subscriptions: `invoingo_essentials`, `invoingo_plus`, and reserved `invoingo_premium`; each has base plans `monthly` (P1M) and `annual` (P1Y). Free is not a store product.

## Apple setup

1. Register the confirmed bundle ID in Apple Developer, create the Invoingo app record in App Store Connect, and add the same ID to `expo-preview/app.json` as `ios.bundleIdentifier`.
2. Complete paid-app agreements, banking and tax requirements in the account.
3. Create one auto-renewable subscription group named **Invoingo Membership**. Create the four Essentials/Plus products with the exact IDs above. Put Plus above Essentials in upgrade ranking; monthly and annual products of the same tier share a level. Reserve Premium; do not submit products selling unimplemented features.
4. Set US base prices, review localized prices and availability, add localized names/descriptions and a real paywall review screenshot. Full-screen splash exports are not subscription review screenshots.
5. Create sandbox testers, test a signed build, then submit the first subscriptions with the app version. Use the 1024-pixel square icon in `store-assets/ios/AppIcon.appiconset` for the build. Splash screens are part of the binary, not an App Store listing upload.

Reference: [Apple subscriptions](https://developer.apple.com/app-store/subscriptions/).

## Google Play setup

1. Create the Invoingo Play Console app. Confirm its permanent package ID before the first signed upload; add it to `expo-preview/app.json` as `android.package`.
2. Complete the payments profile. Upload the Play icon and feature graphic from `store-assets/android` to the listing.
3. Create `invoingo_essentials` and `invoingo_plus` subscriptions. Add and activate auto-renewing `monthly` and `annual` base plans for each, with the proposed USD prices and reviewed regional prices. Keep Premium inactive.
4. Upload a signed Android App Bundle to internal testing and configure license testers. The app must be installed using the test track for end-to-end Play billing checks.

Reference: [Google subscriptions and base plans](https://developer.android.com/google/play/billing/subscriptions).

## RevenueCat mapping and implementation

The project already includes the RevenueCat native SDK. Create a project with Apple and Google apps, connect their store credentials in RevenueCat, and import the store products.

- Entitlements: `essentials`, `plus`, reserved `premium`.
- Offerings: `essentials` and `plus`, matching the native code. Each must contain the standard monthly `$rc_monthly` and annual `$rc_annual` packages. Map each package to its matching Apple product and Google subscription/base-plan combination.
- Plus products grant both `essentials` and `plus`; future Premium products grant all three.
- Put **public platform SDK keys** in the existing ignored `expo-preview/.env` placeholders. Never put private RevenueCat/store credentials in public Expo variables.
- `billing.ts` loads localized prices, purchases the selected period, checks store-verified customer entitlements, restores purchases and opens subscription management. Cancellation/pending purchases do not claim an active plan. Browser checkout buttons show store links when those links are configured; no fictitious store listing URLs are used.

Reference: [RevenueCat entitlements](https://www.revenuecat.com/docs/getting-started/entitlements), [displaying products](https://www.revenuecat.com/docs/getting-started/displaying-products), [making purchases](https://www.revenuecat.com/docs/getting-started/making-purchases).

## Required before enabling paid access

This remains a web preview inside a native shell. There is no production cross-device account system or authoritative server subscription enforcement yet. Invoice limits shown in the UI are proposed release limits, not enforced paid gates. A client-side entitlement or localStorage flag must never be used as server authorization.

Keep `EXPO_PUBLIC_BILLING_RELEASE_READY=false` until account identity, authenticated server entitlements, RevenueCat webhook verification/reconciliation, invoice quota enforcement, deployed privacy policy/terms, and store sandbox checks are complete. Connect RevenueCat identities to authenticated business accounts before promising cross-device access. Validate renewals, expiration, refunds/revocations, cancellation, restore, pending purchases and upgrades/downgrades on signed iOS/Android builds.

Public store links can be added to root `.env` as `APP_STORE_URL` and `GOOGLE_PLAY_URL` once listings exist. This work creates assets and local configuration specifications; it does not create products in Apple, Google or RevenueCat accounts.
