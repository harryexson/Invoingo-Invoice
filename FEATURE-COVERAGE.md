# Screenshot-to-build coverage

The supplied QuickSend prototype is the workflow reference; Invoingo keeps its own identity and fictional sample business. The mobile studio contains a live 27-screen phone gallery and linked screens in both iOS and Android frames. These are responsive web previews, not compiled native binaries.

| Screens | Implemented behavior |
|---|---|
| 01 Welcome, 02 Business setup | Onboarding; business name/contact/address/currency/industry; image logo upload |
| 03 Invoices & home, 04 Activity | Outstanding/overdue totals, search and status filters; invoice events; clearly labeled sample activity |
| 05 Invoice editor | Client, dates, line items, tax, fixed discount, balance, notes, typed signature and project image |
| 06 Add item, 07 Bill to | Saved/custom products and services, rates/units/categories; add or choose clients; Contact Picker where supported |
| 08 Preview & templates | Modern, Minimal and Classic templates; five colors; browser print / Save PDF |
| 09 Send | Resend email, mail draft, SMS draft, WhatsApp draft, copy link, QR code, print. Demo mode blocks external sharing |
| 10 Tracking, 11 Client pay | Invoice timeline, signed provider events, public tokenized invoice page, Stripe test checkout |
| 12 Record payment, 13 Paid | Cash/check/bank/external card records; partial/full validation; balance-aware confirmation |
| 14 Payment options, 15 Plans | Payment instructions, tax and terms; proposed tier selection without fake subscriptions or prices |
| 16 Estimates | Create estimates; record sent/accepted/declined; one-time accepted-estimate conversion |
| 17 Clients, 18 Saved items | Client create/edit/search; 45-industry imports; custom products, units, rates and categories |
| 19 Reports | Monthly recorded income, expenses, net income, weekly chart, top clients, proportional tax collected, CSV |
| 20 Expenses | Record expense with image receipt upload or device-camera capture |
| 21 Account & settings | Business links, compact lists, local reminder prompts and JSON backup |
| 22 Connections | Stripe/Resend configuration status, operator token, test-only setup |
| 23 MioBot | Invoice questions, conversation history, collection snapshots, reminder drafts and activity |
| 24 Voice mode | Browser speech recognition for questions and spoken MioBot responses where supported |
| 25 In-app nudges | Current-record prompts for overdue invoices, accepted estimates, opened invoices and unsent drafts |
| 26 Payment alerts | Verified payment activity and optional browser notifications while the workspace is open |
| 27 MioBot settings | Per-event prompts, summaries, voice responses and approval preferences |

Wise-inspired elements: forest #163300, lime #9fe870, mist #e2f6d5 and fog #e8ebe6; local Inter fonts with weight 900 display type; strong uppercase display headings; rounded primary actions; dark green summary cards; one primary action per form. The independent Invoingo landing page includes an AI-generated workshop image, custom 20-second motion film, animated invoice preview and interactive industries.

## Explicit remaining work

- Native iOS/Android packaging, signing, device testing, App Store/Play distribution; current platform switches preview device frames only.
- Provider accounts/keys, verified Resend domain, public HTTPS deployment and provider end-to-end testing.
- Background/lock-screen push delivery; current payment notifications require an open, connected browser session and browser permission.
- Receipt OCR (image capture is implemented), verified e-signatures (typed display signature only), in-person NFC Tap to Pay (hosted wallets are different).
- Subscription prices/billing, scheduled reminders, multi-user authentication and cloud synchronization.
- Direct binary PDF generation; current PDF output uses browser printing. Invoice QR codes are generated locally on the server.
- Production handling of published-invoice cancellation, refunds, and mixed manual/online payments.

No demo toast is treated as proof that an email was delivered or a payment succeeded. The demo uses a separate localStorage key from the real desktop/mobile workspace.

An Expo SDK 57 WebView preview is available in expo-preview. It opens the responsive demo on real devices; it does not replace native packaging or physical device validation. The landing now has five live journey groups and an iOS/Android platform switcher.
